# -*- coding: utf-8 -*-
"""
ANTIGRAVITY OMNI ENGINE v10.0
Motor Omni-Generativo para Sincronización Masiva (170 Programas)
"""
import psycopg2
from psycopg2.extras import Json
from biblioteca_industrial import BibliotecaIndustrial
import os

NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityOmniEngine:
    """
    Motor de Generación Universal para los 170 Programas.
    Sincronización masiva con Neon DB.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        self.estandar = "DIAMANTE-V10"

    def procesar_universo(self, lista_mep):
        """
        Procesa la lista completa de programas asegurando jerarquía y calidad.
        """
        total = len(lista_mep)
        exitos = 0
        print(f"🌌 Iniciando Omni-Procesamiento v10.0 ({total} Programas)...")

        for i, programa in enumerate(lista_mep):
            try:
                # 1. Normalización de Identidad
                # ID Único: ESPECIALIDAD_NIVEL_MATERIA_UNIDAD
                esp = programa.get('especialidad', 'GEN').replace(" ", "")[:4].upper()
                niv = str(programa.get('nivel', '0')).replace("mo", "")
                mat = programa.get('materia', 'MAT').replace(" ", "")[:4].upper()
                uid = programa.get('unidad_id', f'U{i+1}')
                
                identificador = f"{esp}_{niv}_{mat}_{uid}".upper()
                
                print(f"[{i+1}/{total}] Cristalizando: {identificador}...")
                
                # 2. Generación de Mediación Ultra
                json_ultra = self._transmutar_a_json_ultra(programa, identificador)
                
                # 3. Sincronización con Neon
                if self._guardar_en_neon(identificador, json_ultra, programa.get('materia')):
                    exitos += 1
            except Exception as e:
                print(f"❌ Error en {programa.get('materia')}: {e}")

        print(f"\n🌌 OMNI-SINCRONIZACIÓN FINALIZADA: {exitos}/{total}")

    def _transmutar_a_json_ultra(self, p, id_unico):
        # Transmutación Omni-Generativa
        ras_procesados = []
        for ra in p.get('ras', []):
            ras_procesados.append(self._redactar_binomio_y_rutas(ra, p.get('materia'), p.get('bloque')))

        return {
            "memoria_oficial": {
                "id": id_unico,
                "metadata": {
                    "admin": self.super_user, 
                    "version": self.estandar,
                    "engine": "Omni-V10"
                },
                "encabezado": p.get('datos_generales', {}),
                "cuerpo": ras_procesados
            }
        }

    def _redactar_binomio_y_rutas(self, ra, materia, bloque):
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
            "mediacion_ultra": {
                "binomio_docente": binomio_docente,
                "binomio_estudiante": binomio_estudiante,
                "rutas_variedad": [r['tipo'] for r in rutas],
                "detalles_rutas": rutas, # Full objects
                "ajustes_inclusion": {
                    "mnc": "Alineado al Marco Nacional de Cualificaciones (Nivel 3/4)",
                    "universal": [r.get('ajuste_inclusion') for r in rutas]
                }
            }
        }

    def _guardar_en_neon(self, id_unico, json_ultra, nombre_prog):
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
                    """, (id_unico, nombre_prog, self.super_user, Json(json_ultra), self.estandar))
            return True
        except Exception as e:
            print(f"❌ Fallo Neon DB: {e}")
            return False
