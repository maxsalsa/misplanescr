import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [BIO-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class BiologyInjector:
    """
    🌿 BIOLOGY INJECTOR (10th Grade) - REA 2026
    Injects:
    - Unit 1: Adaptaciones ante el cambio climático.
    - Unit 2: Herencia y Genética Humana (High Density).
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Biología",
            "grade_level": "10",
            "module_id": "BIO-10",
            "module_name": "Ciencias Exactas y Naturales - Biología",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"]
        }

    def generate_unit_1_data(self):
        """Generates payload for Biology Unit 1: Climate Change & Genetics"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 1: Adaptaciones de las poblaciones ante el cambio climático",
                "estimated_time": "12 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Analizar la variabilidad genética y su relación con la adaptación de las especies al cambio climático.",
                        "saberes": [
                            "Genes, Alelos, Fenotipo, Genotipo",
                            "Mutaciones y Selección Natural",
                            "Deriva Genética"
                        ],
                        "indicators": [
                            "Explica cómo la variabilidad genética permite la supervivencia y adaptación de las poblaciones ante presiones ambientales."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Científico Guía / Exploración",
                                "topic": "Adaptación y Variabilidad",
                                "teacher_role": "La persona docente facilita un estudio de caso sobre el Sapo Dorado y modela el flujo de alelos.",
                                "student_role": "La persona estudiante investiga frecuencias genéticas y propone hipótesis de adaptación.",
                                "combobox_variants": [
                                    {
                                        "label": "STEAM: Eco-Simulación",
                                        "description": "Simulación de selección natural en un entorno digital cambiante."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "General",
                                "teacher_role": "Uso de diagramas visuales y modelos físicos de poblaciones.",
                                "student_role": "Participa en juegos de roles evolutivos.",
                                "materials": "Fichas de colores, Mapas de biodiversidad."
                            }
                        ],
                        "evidence": "Informe de laboratorio: Simulación de deriva genética."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica: Análisis Evolutivo",
                        "criteria": ["Rigor científico", "Uso de datos", "Claridad argumentativa"]
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "BIO-10-U01-HD"
            },
            "logicRules": {
                "sequence": ["RA-01"],
                "prerequisites": ["Ciencias 9no"],
                "steam_focus": "Ecology & Climate"
            },
            "classificationTags": ["Biología", "Evolución", "Cambio Climático", "10mo"]
        }

    def generate_u02_genetics_hd(self):
        """Generates payload for Biology Unit: Herencia y Genética Humana (REA 2026)"""
        return {
            "jsonbData": {
                "unit": "Unidad: Herencia y Genética Humana",
                "estimated_time": "18 Horas",
                "competencia": "Pensamiento Crítico",
                "eje_transversal": "Ciudadanía Global",
                "learning_outcomes": [
                    {
                        "id": "RA-GEN-01",
                        "description": "Resolver problemas de cruces genéticos monohíbridos aplicando las leyes de Mendel.",
                        "saberes": [
                            "Leyes de Mendel (Segregación y Distribución Independiente)",
                            "Conceptos: Genotipo, Fenotipo, Alelos (Dominante/Recesivo)",
                            "Cuadros de Punnett",
                            "Probabilidad genética básica"
                        ],
                        "indicators": [
                            "Distingue entre rasgos heredables y variaciones ambientales.",
                            "Resuelve cruces monohíbridos con precisión en la predicción de genotipos.",
                            "Analiza la probabilidad de aparición de rasgos recesivos en descendencias simuladas."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Científico Guía / Laboratorio",
                                "topic": "Mecanismos de Herencia",
                                "teacher_role": "La persona docente (Científico Guía) modela la construcción de cuadros de Punnett y ejemplifica herencia con rasgos reales.",
                                "student_role": "La persona estudiante (Genetista Investigador) resuelve desafíos de cruces genéticos y predice probabilidades.",
                                "combobox_variants": [
                                    {
                                        "label": "STEAM: Genética Digital",
                                        "description": "Uso de simuladores web para observar múltiples generaciones en segundos (Aceleración del tiempo biológico)."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Diversidad Visual / Cognitiva",
                                "teacher_role": "Usa bloques de colores o manipulativos para representar alelos dominantes y recesivos.",
                                "student_role": "Construye cruces genéticos físicos antes de pasarlos al papel.",
                                "materials": "Legos de colores, Calculadoras de probabilidad visual."
                            }
                        ],
                        "evidence": "Criptograma Genético: Resolución de problemas de herencia para revelar 'perfiles biológicos'."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Performance",
                        "title": "Laboratorio de Cruces: Rúbrica de Análisis",
                        "criteria": [
                            "Exactitud en el cuadro de Punnett",
                            "Interpretación de porcentajes fenotípicos",
                            "Uso correcto de terminología técnica"
                        ]
                    },
                    {
                        "type": "Product",
                        "title": "Árbol Genealógico Genético",
                        "description": "Rastreo de un rasgo fenotípico a través de 3 generaciones aplicando lógica mendeliana."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "BIO-10-U02-HD"
            },
            "logicRules": {
                "sequence": ["RA-GEN-01"],
                "prerequisites": ["Genética básica 9no"],
                "industrial_standard": "Bioinformática Básica"
            },
            "classificationTags": ["Biología", "Genética", "Mendel", "Herencia", "10mo"]
        }

    def run(self):
        units = [self.generate_unit_1_data(), self.generate_u02_genetics_hd()]

        logger.info(f"🚀 Starting Biology (Genetics & Ecology) Injection...")
        
        # Ensure seed directory exists
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []

        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            # Generate Deterministic Semantic Hash
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2026"))
            
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            # Try DB Injection
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}. Saving to local seed.")

        # Save to File
        seed_file = os.path.join(seed_dir, "BIO10_FULL_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Biology Injection/Preservation Complete.")

if __name__ == "__main__":
    injector = BiologyInjector()
    injector.run()
