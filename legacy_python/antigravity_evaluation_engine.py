# -*- coding: utf-8 -*-
"""
ANTIGRAVITY EVALUATION ENGINE
Generador de Rúbricas e Instrumentos de Evaluación (MEP Compliance)
"""
import psycopg2
import os
import json
from psycopg2.extras import RealDictCursor

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityEvaluationEngine:
    """
    Motor de Evaluación: Genera Instrumentos Oficiales desde el Currículo.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def generar_herramienta_evaluacion(self, plan_id):
        """
        Extrae indicadores del plan en Neon y construye la rúbrica oficial.
        """
        print(f"📝 Generando Rúbrica para Plan: {plan_id}...")
        
        # 1. Obtener Indicadores Reales de Neon DB
        indicadores = self._obtener_indicadores_de_neon(plan_id)
        
        if not indicadores:
            # Fallback Mock para demostración si no hay DB
            indicadores = [
                "Identifica los componentes del hardware según manual.",
                "Ensambla los componentes siguiendo normas de seguridad."
            ]

        # 2. Construcción de la Rúbrica Oficial (MEP Standard)
        rubrica_oficial = {
            "meta_data": {
                "plan_vinculado": plan_id,
                "generado_por": self.super_user,
                "tipo_instrumento": "Rúbrica Analítica de Desempeño"
            },
            "escala_calificacion": {
                 "3": {"nivel": "Avanzado", "criterio": "Realiza la acción sin errores y de forma autónoma."},
                 "2": {"nivel": "Intermedio", "criterio": "Realiza la acción con algunos errores o requiere ayuda."},
                 "1": {"nivel": "Inicial", "criterio": "Intenta la acción pero comete errores significativos."}
            },
            "indicadores_evaluables": []
        }
        
        for idx, ind in enumerate(indicadores):
            rubrica_oficial["indicadores_evaluables"].append({
                "id": f"IND-{idx+1:02d}",
                "descripcion": ind,
                "puntos_posibles": 3 # Por defecto 3 niveles
            })
            
        return rubrica_oficial

    def _obtener_indicadores_de_neon(self, plan_id):
        """
        Consulta la tabla m_mep_respaldo para extraer los 'saberes' o 'indicadores'.
        """
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT contenido_json FROM m_mep_respaldo WHERE id_programa = %s", (plan_id,))
                    res = cur.fetchone()
                    
                    if res:
                        # Navegar la estructura JSON compleja V10
                        contenido = res['contenido_json']
                        root = contenido.get('memoria_oficial', contenido)
                        cuerpo = root.get('cuerpo', [])
                        
                        indicadores = []
                        # Extraer de todos los RAs
                        if isinstance(cuerpo, list):
                            for item in cuerpo:
                                # A veces indicador está explícito, a veces implícito en 'ra'
                                if 'indicador' in item:
                                    indicadores.append(item['indicador'])
                                elif 'saberes' in item:
                                    indicadores.extend(item['saberes'])
                        
                        return indicadores
        except Exception as e:
            print(f"⚠️ Error extrayendo indicadores: {e}")
        return []

    def estructurar_registro_estudiante(self, estudiante_id, plan_id, datos_evaluacion):
        """
        Genera el JSON final de registro de nota para Neon DB.
        """
        return {
            "registro_evaluacion": {
                "super_usuario": self.super_user,
                "id_estudiante": estudiante_id,
                "id_plan_vinculado": plan_id,
                "periodo_lectivo": datos_evaluacion.get('periodo', '2026-ACTUAL'),
                "cuadro_notas": {
                    "trabajo_cotidiano": {
                        "indicadores_evaluados": datos_evaluacion.get('rubrica_rellena', []),
                        "subtotal_puntos": datos_evaluacion.get('puntos_cotidiano', 0),
                        "nota_porcentual": datos_evaluacion.get('nota_cotidiano', 0)
                    },
                    "tareas": datos_evaluacion.get('tareas', []),
                    "pruebas": datos_evaluacion.get('pruebas', []),
                    "asistencia": {
                        "lecciones_totales": datos_evaluacion.get('lecciones_totales', 0),
                        "ausencias_injustificadas": datos_evaluacion.get('ausencias_ai', 0),
                        "nota_asistencia": datos_evaluacion.get('nota_asistencia', 100)
                    },
                    "nota_final_periodo": datos_evaluacion.get('nota_final', 0)
                }
            }
        }

# Test Drive
if __name__ == "__main__":
    engine = AntigravityEvaluationEngine()
    
    # 1. Probar Generación de Rúbrica
    # Usamos un ID conocido de la inyección anterior (Priority Batch)
    test_id = "INFO_PROG_10_U1" 
    
    rubrica = engine.generar_herramienta_evaluacion(test_id)
    print("\n📝 RÚBRICA GENERADA (Muestra):")
    print(json.dumps(rubrica, indent=2, ensure_ascii=False))
    
    # 2. Probar Estructura de Registro
    mock_eval = {
        "periodo": "I_Semestre_2026",
        "puntos_cotidiano": 25,
        "nota_cotidiano": 41.5,
        "tareas": [{"id": "T-01", "nota": 100}],
        "nota_final": 89.4
    }
    registro = engine.estructurar_registro_estudiante("EST-MOCK-001", test_id, mock_eval)
    print("\n💾 JSON REGISTRO (Muestra):")
    print(json.dumps(registro, indent=2, ensure_ascii=False))
