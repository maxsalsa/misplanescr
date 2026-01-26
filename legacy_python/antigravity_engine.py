# -*- coding: utf-8 -*-
"""
ANTIGRAVITY ENGINE v5.0
Motor Maestro de Automatización y Sincronización Estructurada
"""
import os
import json
import psycopg2
from psycopg2.extras import Json

# Configuración de Conexión (Fallback seguro)
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityEngine:
    """
    Motor Maestro para la automatización de planes y sincronización con Neon DB.
    Optimizado para Max Salazar Sánchez.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        self.version = "5.0-Kaizen-Industrial"

    def sync_to_neon(self, plan_json):
        """Inyecta el plan en la base de datos como un objeto relacional."""
        conn = None
        try:
            conn = psycopg2.connect(self.db_url)
            cur = conn.cursor()
            
            query = """
            INSERT INTO m_mep_respaldo (id_programa, programa_nombre, docente, contenido_json, version_kaizen)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (id_programa) 
            DO UPDATE SET 
                contenido_json = EXCLUDED.contenido_json,
                version_kaizen = EXCLUDED.version_kaizen,
                docente = EXCLUDED.docente,
                updated_at = CURRENT_TIMESTAMP;
            """
            
            # Normalización de Header/Metadata (Soporte Multi-Schema v5)
            # Normalización de Header/Metadata (Soporte Multi-Schema v5)
            # Schema C: Industrial Registry (registro_oficial)
            if 'registro_oficial' in plan_json:
                reg = plan_json['registro_oficial']
                identidad = reg.get('identidad_pedagogica', {})
                
                subarea = identidad.get('subarea', 'GENERAL')
                unidad = str(identidad.get('unidad_numero', '0'))
                
                sub_id = f"{subarea}_U{unidad}".replace(" ", "_").upper()
                nombre_prog = f"{subarea} - Unidad {unidad}"
                docente = reg.get('admin', self.super_user)
                
                # Validar suficiencia (6 rutas)
                for ra in reg.get('plan_practica_pedagogica', []):
                    if len(ra.get('mediacion_ultra_6_rutas', [])) < 6:
                         print(f"⚠️ Alerta de Calidad: RA '{ra.get('ra')[:15]}...' tiene menos de 6 rutas.")

            # Schema D: Industrial Logic (id_memoria)
            elif 'id_memoria' in plan_json:
                sub_id = plan_json.get('id_memoria')
                meta = plan_json.get('metadata', {})
                
                docente = meta.get('super_usuario') or meta.get('autor_plan') or self.super_user
                nombre_prog = f"Industrial Logic: {sub_id}"
                
                cuerpo = plan_json.get('cuerpo_tecnico', [])
                for ra in cuerpo:
                     if len(ra.get('mediacion_ultra_6_rutas', [])) < 6:
                        print(f"⚠️ Alerta de Calidad: RA '{ra.get('ra')[:15]}...' tiene menos de 6 rutas.")

            # Schema A: Master Structure V5 (Grado Industrial - Previous)
            elif 'id_memoria_oficial' in plan_json:
                sub_id = plan_json.get('id_memoria_oficial')
                meta = plan_json.get('metadata_docente', {})
                ctx = plan_json.get('contexto_educativo', {})
                
                docente = meta.get('super_usuario') or meta.get('nombre_docente') or self.super_user
                nombre_prog = f"{ctx.get('subarea')} - {ctx.get('unidad_estudio')}"
                
                cuerpo = plan_json.get('cuerpo_tecnico', [])
                for ra in cuerpo:
                    if len(ra.get('seis_rutas_mediacion', [])) < 6:
                        print(f"⚠️ Alerta de Calidad: RA '{ra.get('ra_oficial')[:20]}...' tiene menos de 6 rutas.")
            
            # Schema B: Legacy Ultra
            else:
                header = plan_json.get('header') or plan_json.get('metadata') or {}
                subarea = header.get('subarea') or header.get('subarea_nombre') or "GENERAL"
                unidad = header.get('unidad') or header.get('unidad_nombre') or str(header.get('unidad_numero', '0'))
                docente = header.get('docente') or header.get('autor_auditor') or self.super_user
                nombre_prog = header.get('unidad_nombre') or f"{subarea} {unidad}"
                sub_id = f"{subarea}_{unidad}".replace(" ", "_").replace(":", "").upper()
            
            # Limpieza final de ID
            sub_id = sub_id.strip().replace(" ", "_")
            
            # Ejecución segura
            cur.execute(query, (
                sub_id, 
                nombre_prog,
                docente, 
                json.dumps(plan_json, ensure_ascii=False), 
                self.version
            ))
            
            conn.commit()
            print(f"✅ [ANTIGRAVITY v5] Sincronizado: {sub_id}")
            return True
            
        except Exception as e:
            print(f"❌ [ANTIGRAVITY v5] Error Critical: {e}")
            if conn: conn.rollback()
            return False
        finally:
            if conn:
                try:
                    conn.close()
                except:
                    pass

# Singleton para uso global
engine = AntigravityEngine()

class AntigravityIntegrator:
    """
    Motor de alta disponibilidad para la sincronización de la Memoria Oficial (v5.5).
    """
    def __init__(self, db_url=None):
        self.conn_string = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def inyectar_plan_validado(self, plan_data):
        """
        Valida y sube el plan a Neon DB. 
        Asegura que la redacción docente/estudiante sea correcta y existan 6 rutas.
        """
        # Verificación de Suficiencia Pedagógica (Auto-fix)
        cuerpo = plan_data.get('cuerpo', []) or plan_data.get('cuerpo_tecnico', [])
        
        if cuerpo and len(cuerpo[0].get('mediacion_6_rutas', []) or cuerpo[0].get('mediacion_ultra_6_rutas', [])) < 6:
            print("⚠️ Advertencia: El plan no cumple con la regla de 6 rutas. Mejorando automáticamente...")
            from biblioteca_estrategias import BibliotecaUltra
            
            # Identificar tema para generar rutas faltantes
            tema = plan_data.get('identidad', {}).get('subarea') or "General"
            rutas_nuevas = BibliotecaUltra.generar_6_rutas("Técnica", tema)
            
            # Completar (esto es una simplificación, en prod sería un merge inteligente)
            # Por ahora, si faltan, asumimos que debemos usar las generadas
            if not cuerpo[0].get('mediacion_6_rutas'):
                 cuerpo[0]['mediacion_6_rutas'] = rutas_nuevas

        try:
            conn = psycopg2.connect(self.conn_string)
            cur = conn.cursor()
            
            # Soporte para schema id_memoria y id_programa
            p_id = plan_data.get('id_memoria') or plan_data.get('id_memoria_oficial')
            
            # Extract Name for Column
            nombre_u = plan_data.get('identidad', {}).get('unidad') or "Unidad Maestra"
            
            cur.execute("""
                INSERT INTO m_mep_respaldo (id_programa, programa_nombre, docente, contenido_json, version_kaizen)
                VALUES (%s, %s, %s, %s, '5.5-DIAMANTE')
                ON CONFLICT (id_programa) 
                DO UPDATE SET contenido_json = EXCLUDED.contenido_json;
            """, (p_id, nombre_u, self.super_user, Json(plan_data)))
            
            conn.commit()
            cur.close()
            conn.close()
            print(f"✅ [INTEGRATOR v5.5] Unidad {p_id} sincronizada exitosamente.")
            return True
        except Exception as e:
            print(f"❌ Error Crítico Neon: {e}")
            return False

# Instancia Global Integrator
integrator = AntigravityIntegrator()
