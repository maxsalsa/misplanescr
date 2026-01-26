# -*- coding: utf-8 -*-
"""
ANTIGRAVITY EXPORTER v3: Multi-Grupo + Gamificación + Inteligencia Semántica
Sincroniza planes con metadata semántica y auditoría de carga
"""
import psycopg2
import json
from services.intelligence import SemanticAnalyzer, AdministrativeLoadAuditor

# URL de Neon (Conexión Real desde .env)
NEON_URL = "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

def inyectar_plan_a_neon(datos):
    """
    Inyecta plan pedagógico con soporte multi-grupo y retos
    
    Args:
        datos: {
            'tema': str,
            'contenido': str,
            'nivel': str,
            'modalidad': str,
            'grupos': list (opcional) - ['10-1', '10-2', '10-3'],
            'retos': list (opcional) - [{'tipo': 'Bronce', 'descripcion': '...'}]
        }
    """
    conn = None
    try:
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        # STEP 1: Extraer Metadata Semántica (NUEVO)
        print(f"🧠 Analizando contenido semánticamente...")
        
        contenido_texto = datos.get('contenido', '')
        tipo_asignatura = datos.get('metadata', {}).get('tipo_asignatura', 'Técnica')
        duracion = datos.get('metadata', {}).get('duracion', 80)
        grupos = datos.get('metadata', {}).get('grupos', [])
        
        analyzer = SemanticAnalyzer()
        keywords = analyzer.extraer_keywords(contenido_texto, tipo_asignatura)
        complejidad = analyzer.calcular_complejidad(contenido_texto, duracion)
        tiempo_estimado = analyzer.calcular_tiempo_estimado(contenido_texto)
        vector_resumen = f"{tipo_asignatura}|{','.join(keywords[:3])}|nivel_{complejidad}"
        
        # STEP 2: Auditoría de Carga Administrativa (NUEVO)
        auditor = AdministrativeLoadAuditor()
        auditoria = auditor.auditar_carga(contenido_texto, len(grupos) if grupos else 1)
        
        print(f"   Keywords: {keywords[:5]}")
        print(f"   Complejidad: {complejidad}/10")
        print(f"   Tiempo Total: {tiempo_estimado} min")
        print(f"   Carga Docente: {auditoria['carga_total_min']} min ({auditoria['nivel_alerta']})")
        
        # STEP 3: Inyectar Plan Maestro con Metadata
        tema = datos.get('tema', 'UNKNOWN_ID').strip()
        id_prog = tema.lower().replace(" ", "_")[:50]
        
        payload = {
            "tema": tema,
            "contenido": datos.get('contenido', ''),
            "metadata": {
                "nivel": datos.get('nivel'),
                "modalidad": datos.get('modalidad'),
                "duracion": datos.get('duracion'),
                "grupos": datos.get('grupos', []),
                "retos": datos.get('retos', []),
                "timestamp": "NOW"
            }
        }
        
        query_ultra = """
        INSERT INTO m_mep_respaldo (
            id_programa, 
            programa_nombre, 
            contenido_json, 
            version_kaizen,
            keywords,
            complejidad_nivel,
            tiempo_estimado_min,
            vector_resumen,
            tipo_asignatura
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) 
        ON CONFLICT (id_programa) 
        DO UPDATE SET 
            contenido_json = EXCLUDED.contenido_json,
            updated_at = CURRENT_TIMESTAMP;
        """
        
        # Detectar si payload es el objeto rico nuevo o texto plano legacy
        try:
            contenido_obj = datos.get('contenido', {})
            if isinstance(contenido_obj, dict):
                # Es el nuevo formato JSON
                if "metadata" in contenido_obj: # Validación extra
                    json_dump = json.dumps(contenido_obj, ensure_ascii=False)
                else: 
                     # Fallback si es un dict simple
                     json_dump = json.dumps(contenido_obj, ensure_ascii=False)
            else:
                # Es legacy texto, lo envolvemos
                json_dump = json.dumps({"raw_text": str(contenido_obj)}, ensure_ascii=False)
        except Exception as e:
            print(f"⚠️ Error serializando JSON: {e}")
            json_dump = json.dumps({"error": "serialization_failed", "raw": str(datos.get('contenido',''))})

        cur.execute(query_ultra, (
            id_prog, 
            tema, 
            json_dump, 
            "Ultra-JSON-Structured",
            keywords,
            complejidad,
            tiempo_estimado,
            vector_resumen,
            tipo_asignatura
        ))
        
        # STEP 2: Sincronizar Grupos y Retos (Si existen)
        grupos = datos.get('grupos', [])
        if grupos:
            # Crear tabla si no existe (failsafe)
            cur.execute("""
            CREATE TABLE IF NOT EXISTS seguimiento_grupos (
                id SERIAL PRIMARY KEY,
                grupo_id TEXT NOT NULL,
                id_programa TEXT NOT NULL,
                retos_activos JSONB,
                estado TEXT DEFAULT 'Pendiente',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(grupo_id, id_programa)
            );
            """)
            
            for grupo in grupos:
                query_retos = """
                INSERT INTO seguimiento_grupos (
                    grupo_id, 
                    id_programa, 
                    retos_activos, 
                    estado
                )
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (grupo_id, id_programa) 
                DO UPDATE SET 
                    retos_activos = EXCLUDED.retos_activos,
                    updated_at = CURRENT_TIMESTAMP;
                """
                cur.execute(query_retos, (
                    grupo, 
                    id_prog, 
                    json.dumps(datos.get('retos', []), ensure_ascii=False),
                    'En Progreso'
                ))
        
        # Tabla 6: Suscripciones y Licencias (Gestión de Identidad)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS suscripciones (
            id SERIAL PRIMARY KEY,
            usuario_email TEXT UNIQUE NOT NULL,
            nombre_completo TEXT NOT NULL,
            rol TEXT DEFAULT 'DOCENTE' CHECK (rol IN ('DOCENTE', 'AUDITOR', 'SUPER_ADMIN')),
            estado_licencia TEXT DEFAULT 'ACTIVA' CHECK (estado_licencia IN ('ACTIVA', 'VENCIDA', 'PRUEBA')),
            instituciones_json JSONB DEFAULT '[]',
            ultimo_pago TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        
        # Índices para identidad rápida
        cur.execute("CREATE INDEX IF NOT EXISTS idx_usuario_email ON suscripciones (usuario_email);")
        
        conn.commit()
        print("✅ Esquema de Base de Datos actualizado (v4.0 - Identidad & Licencias).")
        
    except Exception as e:
        print(f"Error Neon: {e}")
    finally:
        if conn: 
            conn.close()

def actualizar_core_neon(datos_ultra):
    """
    Sincroniza el alma de Antigravity con Neon DB bajo el estándar Max Salazar.
    Version: DIAMANTE-V2
    """
    conn = None
    try:
        # Validación de Identidad
        datos_ultra['autor'] = "Max Salazar Sánchez"
        
        # Conexión y Upsert
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        query = """
            INSERT INTO m_mep_respaldo (
                id_programa, 
                programa_nombre, 
                contenido_json, 
                version_kaizen,
                keywords,
                complejidad_nivel,
                tipo_asignatura
            )
            VALUES (%s, %s, %s, 'DIAMANTE-V2', %s, %s, %s)
            ON CONFLICT (id_programa) 
            DO UPDATE SET 
                contenido_json = EXCLUDED.contenido_json,
                version_kaizen = 'DIAMANTE-V2',
                updated_at = CURRENT_TIMESTAMP;
        """
        
        # Metadata extraction for columns
        meta = datos_ultra.get('metadata', {})
        keywords = meta.get('keywords', [])
        complejidad = meta.get('complejidad_nivel', 5)
        tipo = meta.get('especialidad', 'Técnica')
        
        cur.execute(query, (
            datos_ultra['id_programa'], 
            datos_ultra['metadata']['unidad_nombre'], 
            json.dumps(datos_ultra, ensure_ascii=False),
            keywords,
            complejidad,
            tipo
        ))
        
        conn.commit()
        cur.close()
        return "✅ Sincronización Exitosa: Neon DB Actualizada (Estándar Max Salazar)."
        
    except Exception as e:
        return f"❌ Error de Integración: {e}"
    finally:
        if conn:
            conn.close()


def sincronizar_lista_clase(grupo_id: str, lista_estudiantes: list) -> bool:
    """
    Guarda la nómina oficial en Neon para uso recurrente
    
    Args:
        grupo_id: Identificador del grupo (ej: "10-1")
        lista_estudiantes: Lista de estudiantes con cédulas y correos
    
    Returns:
        bool: True si se sincronizó exitosamente
    """
    conn = None
    try:
        conn = psycopg2.connect(NEON_URL)
        cur = conn.cursor()
        
        # Crear tabla de nóminas si no existe
        cur.execute("""
        CREATE TABLE IF NOT EXISTS nomina_oficial (
            id SERIAL PRIMARY KEY,
            grupo_id TEXT UNIQUE NOT NULL,
            total_estudiantes INTEGER,
            estudiantes_json JSONB,
            correos_oficiales TEXT[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        
        # Extraer correos para array
        correos = [est.get('correo_oficial', '') for est in lista_estudiantes]
        
        query = """
        INSERT INTO nomina_oficial (
            grupo_id, 
            total_estudiantes,
            estudiantes_json,
            correos_oficiales
        )
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (grupo_id) 
        DO UPDATE SET 
            estudiantes_json = EXCLUDED.estudiantes_json,
            correos_oficiales = EXCLUDED.correos_oficiales,
            total_estudiantes = EXCLUDED.total_estudiantes,
            updated_at = CURRENT_TIMESTAMP;
        """
        
        cur.execute(query, (
            grupo_id,
            len(lista_estudiantes),
            json.dumps(lista_estudiantes, ensure_ascii=False),
            correos
        ))
        
        conn.commit()
        cur.close()
        
        print(f"💾 [NEON] Nómina del grupo {grupo_id} blindada en la nube ({len(lista_estudiantes)} estudiantes)")
        return True
        
    except Exception as e:
        print(f"❌ Error sincronizando nómina: {e}")
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":

    # Test con multi-grupo
    test_data = {
        "tema": "Redes de Computadoras 10mo",
        "contenido": "Plan de prueba...",
        "nivel": "10mo",
        "modalidad": "Técnica CTP",
        "grupos": ["10-1", "10-2", "10-3"],
        "retos": [
            {"tipo": "Bronce", "descripcion": "Configurar IP estática"},
            {"tipo": "Plata", "descripcion": "Simulación de red LAN"},
            {"tipo": "Oro", "descripcion": "Proyecto: Red empresarial"}
        ]
    }
    inyectar_plan_a_neon(test_data)
