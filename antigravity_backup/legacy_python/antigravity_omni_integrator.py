# -*- coding: utf-8 -*-
"""
ANTIGRAVITY OMNI-INTEGRATOR
Puente de Integración Frontend-Backend (API Wrapper)
"""
import psycopg2
import os
import json
from psycopg2.extras import RealDictCursor

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityOmniIntegrator:
    """
    Antigravity Omni-Integrator: Garantiza coherencia absoluta entre Frontend y Backend.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL

    def obtener_plan_para_frontend(self, id_programa):
        """
        Formatea el JSON de Neon para que el Frontend lo renderice de inmediato.
        """
        plan_crudo = self._consultar_neon(id_programa)
        
        if not plan_crudo:
            return {"error": "Programa no encontrado", "status": 404}

        contenido = plan_crudo.get('contenido_json', {})
        
        # Procesamiento de Capa de Inclusión (Intelligence Layer)
        inclusion_layer = self._extract_inclusion_layer(contenido)

        return {
            "meta": {
                "id": id_programa,
                "version_kaizen": plan_crudo.get('version_kaizen'),
                "admin": plan_crudo.get('docente'),
                "last_update": str(plan_crudo.get('updated_at'))
            },
            "visual_config": {
                "primary_color": "#0047AB", # Azul Antigravity
                "secondary_color": "#FFD700", # Dorado Premium
                "icon_map": {
                    "ludica": "gamepad",
                    "steam": "robot",
                    "cientifica": "microscope",
                    "taller": "tools",
                    "social": "users",
                    "analitica": "chart-bar",
                    "simulacion": "headset"
                }
            },
            "content": contenido,
            "inclusion_layer": inclusion_layer,
            "print_ready": True, # Habilita CSS de impresión MEP oficial
            "access_level": "subscriber_read_only" if plan_crudo.get('docente') == "Max Salazar Sánchez" else "editable" 
        }

    def _consultar_neon(self, id_programa):
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT * FROM m_mep_respaldo WHERE id_programa = %s", (id_programa,))
                    return cur.fetchone()
        except Exception as e:
            print(f"❌ Error Omni-Link: {e}")
            return None

    def _extract_inclusion_layer(self, content):
        """
        Extrae y normaliza las adaptaciones para mostrarlas en Tooltips/Modales en el UI.
        """
        layer = {
            "universal": "Diseño Universal para el Aprendizaje (DUA) aplicado.",
            "especificos": []
        }
        
        try:
            # Lógica recursiva simple para encontrar 'ajuste_inclusion' en V9/V10/Diamante
            # Buscamos en el cuerpo o en mediacion_ultra directas
            root = content.get('memoria_oficial', content)
            
            cuerpo = root.get('cuerpo', [])
            if isinstance(cuerpo, list):
                for item in cuerpo:
                    if 'mediacion_ultra' in item:
                        adjs = item['mediacion_ultra'].get('ajuste_inclusion', {})
                        if adjs:
                            layer['especificos'].append(adjs)
            elif 'ingesta_data' in root:
                 # V7 / V8 structure
                 data = root['ingesta_data']
                 if 'mediacion_ultra' in data:
                     layer['especificos'].append(data['mediacion_ultra'].get('ajustes_inclusion', {}))
                     
        except Exception as e:
            print(f"⚠️ Warning extraction inclusion: {e}")
            
        return layer

# Test Drive (Self-Verification)
if __name__ == "__main__":
    integrator = AntigravityOmniIntegrator()
    # Probamos con una unidad conocida de la inyección final
    test_id = "ACAD_11_ACAD_FILO_ETICA_IA" # Probar ID generado en Wave Final
    # O buscamos uno real si ese no existe exacto (la generacion de IDs a veces varia espacio/guion)
    # Probemos con uno seguro de Wave 2: IDIO_7_INGL_ING_CONV_U1 o Wave Final ACAD_11_FILO_FILO_11_U1 (Generado por loop)
    
    # Vamos a buscar cualquier ID diamante primero para probar
    try:
        with psycopg2.connect(NEON_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id_programa FROM m_mep_respaldo WHERE version_kaizen LIKE '%Omni%' OR version_kaizen LIKE '%DIAMANTE%' LIMIT 1")
                res = cur.fetchone()
                if res:
                    test_id = res[0]
                    print(f"🔍 Probando integración con: {test_id}")
                    payload = integrator.obtener_plan_para_frontend(test_id)
                    print(json.dumps(payload, indent=2, ensure_ascii=False))
                else:
                    print("⚠️ No se encontraron unidades Diamante para probar.")
    except Exception as e:
        print(f"❌ Error Test: {e}")
