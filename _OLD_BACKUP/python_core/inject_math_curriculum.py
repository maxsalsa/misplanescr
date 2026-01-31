import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [MATH-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class MathInjector:
    """
    📐 MATH INJECTOR (10th Grade)
    Injects:
    - Unit 1: Números Reales y Relaciones Algebraicas (RA 01)
    - INCLUDES: DUA Protocol & Inclusion Strategies (TDAH, TEA, Adecuación).
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Matemáticas",
            "grade_level": "10",
            "module_id": "MAT-10",
            "module_name": "Matemáticas - Números y Álgebra",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "dua_compliant": True  # Flag for Inclusion Protocol
        }

    def generate_unit_1_data(self):
        """Generates payload for Math Unit 1: Real Numbers with DUA"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 1: Números Reales y Relaciones Algebraicas",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Identificar números reales (Racionales e Irracionales) en diversos contextos.",
                        "saberes": [
                            "Números racionales e irracionales",
                            "Representaciones decimales (finitos, periódicos)",
                            "Radicales",
                            "Constantes matemáticas (Pi, e)"
                        ],
                        "indicators": [
                            "Identifica y clasifica números reales según su naturaleza y representación en problemas cotidianos."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Medición Circular (El Mundo de Pi)",
                                "description": "Exploración de Pi en naturaleza e ingeniería midiendo objetos."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Estaciones de Cálculo",
                                "description": "Investigación de diferencia entre decimales finitos y no periódicos."
                            }
                        ],
                        # 🧩 EXCLUSIVE INCLUSION LAYER (DUA)
                        "inclusion_strategies": {
                            "tdah_focus": {
                                "strategy": "Micro-retos & Segmentación",
                                "description": "Fragmentar explicación en bloques de 10 min. Uso de cronómetros visuales."
                            },
                            "tea_support": {
                                "strategy": "Estructura Predictiva & Guiones",
                                "description": "Agenda visual clara y organizadores gráficos de color para clasificación."
                            },
                            "significant_needs": {
                                "strategy": "Material Concreto",
                                "description": "Uso de fichas numéricas y calculadoras simplificadas para radicales."
                            },
                            "high_ability": {
                                "strategy": "Profundización Lógica",
                                "description": "Demostración de la irracionalidad de raíz de 2. Uso de GeoGebra."
                            }
                        },
                        "evidence": "Clasificación de números reales (Mapa/Ensayo/Maqueta)."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Diferenciada)",
                        "criteria": [
                            {
                                "name": "Clasificación Numérica",
                                "levels": {
                                    "inicial": "Reconoce con apoyo constante y guías visuales (Adecuación).",
                                    "intermedio": "Clasifica mayoría con errores menores en irracionales.",
                                    "avanzado": "Clasifica y justifica con precisión absoluta."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea Multimodal: Mapa del Tesoro de los Números",
                        "options": [
                            "Opción A (Escrita): Ensayo sobre historia de Pi.",
                            "Opción B (Visual/Manual): Maqueta clasificando conjuntos (TEA/Visual)."
                        ]
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MAT-10-U01"
            },
            "logicRules": {
                "sequence": ["RA-01"],
                "prerequisites": ["Numbers 9th"],
                "steam_focus": "Engineering & logic"
            },
            "classificationTags": ["Mathematics", "Algebra", "Numbers", "DUA", "Inclusion"]
        }

    def run(self):
        units = [self.generate_unit_1_data()]

        logger.info(f"🚀 Starting Math Injection (Universal Design)...")
        
        # Ensure seed directory exists
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []

        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            # Generate Deterministic Semantic Hash
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}"))
            
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            # Try DB Injection
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}. Saving to local seed.")

        # Save to File
        seed_file = os.path.join(seed_dir, "MAT10_DUA_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Math Injection/Preservation Complete.")

if __name__ == "__main__":
    injector = MathInjector()
    injector.run()
