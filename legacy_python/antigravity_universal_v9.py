# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UNIVERSAL ENGINE v9.0
Motor Definitivo para la Ingesta de los 170 Programas MEP
"""
import psycopg2
from psycopg2.extras import Json
from biblioteca_industrial import BibliotecaIndustrial
from antigravity_super_admin import super_admin # Reusing connection logic if needed or reimplementing

# Fallback URL
import os
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityUniversalEngine:
    """
    Motor definitivo para la ingesta de los 170 programas del MEP.
    Cubre: Técnica, Académica, Idiomas y Exploratoria.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        self.version = "9.0-Omni"

    def procesar_universo_mep(self, lista_programas_crudos):
        """
        Itera sobre todos los programas y los convierte en Memoria Oficial.
        """
        exitos = 0
        print(f"🌌 Iniciando Procesamiento Universal v9.0 ({len(lista_programas_crudos)} Unidades)...")
        
        for programa in lista_programas_crudos:
            try:
                # 1. Normalización de Identidad
                # Format: ESPECIALIDAD_MATERIA_NIVEL_UNIDADID (Simplificado para consistencia)
                esp_tag = programa.get('especialidad', 'GENERAL').replace(" ", "")[:4].upper()
                mat_tag = programa.get('materia', 'MAT').replace(" ", "")[:4].upper()
                niv_tag = str(programa.get('nivel', '0')).replace("mo", "")
                
                identificador = f"{esp_tag}_{mat_tag}_{niv_tag}_{programa.get('unidad_id', 'UID')}".upper()
                
                print(f"⚙️ Transmutando: {programa['materia']} ({identificador})...")

                # 2. Generación de Mediación Ultra (Binomio + 6 Rutas)
                plan_json = self._transmutar_a_json_ultra(programa, identificador)
                
                # 3. Sincronización con Neon DB
                if self._inyectar_neon(identificador, plan_json, programa.get('materia')):
                    exitos += 1
            except Exception as e:
                print(f"❌ Error procesando {programa.get('materia')}: {e}")

        print(f"\n🌌 UNIVERSO SINCRONIZADO: {exitos}/{len(lista_programas_crudos)}")

    def _transmutar_a_json_ultra(self, p, id_unico):
        # Aquí sucede la magia: Antigravity redacta las 6 opciones
        ras_procesados = [self._redactar_binomio_y_rutas(ra, p.get('materia', ''), p.get('bloque', '')) for ra in p.get('ras', [])]
        
        return {
            "memoria_oficial": {
                "admin": self.super_user,
                "version": self.version,
                "ingesta_data": {
                    "id_unico": id_unico,
                    "encabezado": p.get('datos_generales', {}),
                    "cuerpo": ras_procesados
                }
            }
        }

    def _redactar_binomio_y_rutas(self, ra, materia, bloque):
        # Obtener rutas de la biblioteca industrial
        tema = ra.get('tema') or materia
        rutas = BibliotecaIndustrial.get_rutas_ultra(materia, tema)
        
        # Binomio Sagrado
        binomio_docente = "El docente facilita..."
        binomio_estudiante = "El estudiante construye..."
        if rutas:
            binomio_docente = rutas[0]['docente']
            binomio_estudiante = rutas[0]['estudiante']

        return {
            "ra": ra.get('texto'),
            "saberes": ra.get('saberes', []),
            "indicador": ra.get('indicador'),
            "mediacion_ultra": {
                "binomio_docente": binomio_docente,
                "binomio_estudiante": binomio_estudiante,
                "rutas_variedad": [r['tipo'] for r in rutas],
                "detalles_rutas": rutas,
                "ajustes_inclusion": {
                    "general": "Adaptaciones universales aplicadas.",
                    "especificos": [r.get('ajuste_inclusion') for r in rutas]
                }
            }
        }

    def _inyectar_neon(self, id_unico, data, nombre_prog):
        # Conexión persistente y Upsert masivo
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO m_mep_respaldo (id_programa, programa_nombre, docente, contenido_json, version_kaizen)
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT (id_programa) 
                        DO UPDATE SET 
                            contenido_json = EXCLUDED.contenido_json,
                            version_kaizen = EXCLUDED.version_kaizen,
                            updated_at = CURRENT_TIMESTAMP;
                    """, (id_unico, nombre_prog, self.super_user, Json(data), self.version))
            return True
        except Exception as e:
            print(f"❌ Fallo Neon DB: {e}")
            return False
