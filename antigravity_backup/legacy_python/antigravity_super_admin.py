# -*- coding: utf-8 -*-
"""
ANTIGRAVITY SUPER ADMIN v6.0
Motor de Nivel Industrial para Orden Absoluto en Neon DB
"""
import os
import json
import psycopg2
from psycopg2.extras import Json

# fallback url if env var is missing
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravitySuperAdmin:
    """
    Motor de nivel industrial para alimentar Neon DB con orden absoluto.
    Optimizado para el Super Usuario Max Salazar Sánchez.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.admin = "Max Salazar Sánchez"

    def inyectar_bloque_validado(self, unidad_json):
        """
        Verifica Jerarquía: Especialidad -> Nivel -> Unidad antes de inyectar.
        Injects into m_mep_respaldo mapping the V6 fields to existing columns.
        """
        # Validación de integridad de rutas de mediación
        rutas = unidad_json.get("mediacion_6_rutas", [])
        if len(rutas) < 6:
            # Intentar autocorregir usando la biblioteca si faltan
            print(f"⚠️ Detectada unidad con {len(rutas)} rutas. Intentando enriquecer...")
            try:
                from biblioteca_estrategias import BibliotecaUltra
                tema = unidad_json.get('identidad', {}).get('subarea') or "Tema General"
                rutas_extra = BibliotecaUltra.generar_6_rutas("Técnica", tema)
                # Completar hasta 6
                faltantes = 6 - len(rutas)
                unidad_json["mediacion_6_rutas"].extend(rutas_extra[:faltantes])
            except:
                pass
            
            # Re-validar
            if len(unidad_json["mediacion_6_rutas"]) < 6:
                 raise ValueError(f"Error: El plan {unidad_json.get('unidad_id')} no cumple con la suficiencia de 6 rutas ni pudo ser corregido.")

        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    # El ID se construye con la jerarquía estricta para evitar desorden
                    # Format: ESPECIALIDAD_NIVEL_UNIDADID
                    esp = unidad_json.get('especialidad', 'GENERAL').replace(" ", "_").upper()
                    niv = str(unidad_json.get('nivel', '0')).replace(" ", "_").upper()
                    uid = str(unidad_json.get('unidad_id', 'UID')).replace(" ", "_").upper()
                    
                    id_neon = f"{esp}_{niv}_{uid}"
                    
                    # Mapping V6 params to existing table m_mep_respaldo
                    # id_unico -> id_programa
                    # docente_admin -> docente
                    # data_json -> contenido_json
                    # version -> version_kaizen
                    
                    # Also saving programa_nombre for verifying
                    prog_nom = f"{unidad_json.get('especialidad')} - {unidad_json.get('subarea', '')} ({unidad_json.get('unidad_id')})"

                    cur.execute("""
                        INSERT INTO m_mep_respaldo (id_programa, programa_nombre, docente, contenido_json, version_kaizen)
                        VALUES (%s, %s, %s, %s, 'DIAMANTE-V6')
                        ON CONFLICT (id_programa) 
                        DO UPDATE SET 
                            contenido_json = EXCLUDED.contenido_json,
                            version_kaizen = EXCLUDED.version_kaizen,
                            updated_at = CURRENT_TIMESTAMP;
                    """, (id_neon, prog_nom, self.admin, Json(unidad_json)))
            
            print(f"✅ [SUPER ADMIN v6] {id_neon} Sincronizado en Neon.")
            return True
        except Exception as e:
            print(f"❌ [SUPER ADMIN v6] Fallo en Inyección: {e}")
            return False

# Instance
super_admin = AntigravitySuperAdmin()
