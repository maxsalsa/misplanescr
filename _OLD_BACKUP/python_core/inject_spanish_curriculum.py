import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [ESP-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class SpanishInjector:
    """
    📚 SPANISH INJECTOR (10th Grade)
    Injects:
    - Unit 1: La argumentación y la comprensión lectora (RA 01, RA 02)
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Español",
            "grade_level": "10",
            "module_id": "ESP-10",
            "module_name": "Español - Comunicación y Literatura",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026
        }

    def generate_unit_1_data(self):
        """Generates payload for Spanish Unit 1: Argumentation"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 1: La argumentación y la comprensión lectora en contextos literarios y no literarios",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Analizar textos literarios y no literarios mediante la identificación de estructuras argumentativas y figuras retóricas.",
                        "saberes": [
                            "Géneros literarios (Ensayo, Novela, Poesía)",
                            "Figuras de construcción y dicción",
                            "Falacias argumentativas",
                            "Contexto sociocultural"
                        ],
                        "indicators": [
                            "Identifica con precisión las ideas principales, secundarias y la estructura argumentativa en diversos tipos de textos."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Deconstrucción Crítica (TED/Debates)",
                                "description": "Análisis de discursos para identificar intención comunicativa."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Cacería de Recursos Literarios (Digital)",
                                "description": "Investigación de figuras retóricas en música y publicidad."
                            },
                            {
                                "phase": "Desarrollo",
                                "activity": "Diagramación Lógica",
                                "description": "Sistematización de tesis, premisas y conclusiones."
                            }
                        ],
                        "evidence": "Cuadro comparativo de estructuras textuales y análisis crítico."
                    },
                    {
                        "id": "RA-02",
                        "description": "Producir textos argumentativos coherentes y cohesionados utilizando las normas del idioma y herramientas tecnológicas.",
                        "saberes": [
                            "Ortografía y Sintaxis",
                            "Conectores lógicos",
                            "Estructura del Párrafo",
                            "Referencias Bibliográficas (APA)"
                        ],
                        "indicators": [
                            "Redacta textos argumentativos que cumplen con las normas gramaticales, ortográficas y de coherencia textual."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Conexión",
                                "activity": "Foro Académico",
                                "description": "Debate sobre tema de interés nacional con toma de posición."
                            },
                            {
                                "phase": "Clarificación",
                                "activity": "Edición Colaborativa",
                                "description": "Uso de procesadores de texto para mejorar cohesión y coherencia."
                            },
                            {
                                "phase": "Producción",
                                "activity": "Escritura Procesual (Ensayo)",
                                "description": "Redacción de ensayo sobre impacto tecnológico (Planificación-Borrador-Revisión)."
                            }
                        ],
                        "evidence": "Ensayo argumentativo finalizado con revisión de pares."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Comprensión Lectora)",
                        "criteria": [
                            {
                                "name": "Análisis de Textos",
                                "levels": {
                                    "inicial": "Localiza información explícita, sin inferencias.",
                                    "intermedio": "Identifica tesis pero confunde figuras retóricas.",
                                    "avanzado": "Análisis profundo de estructura y estética con juicio crítico."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea Corta / Portafolio (Corrección Idiomática)",
                        "challenge": "Corrección de vicios del lenguaje (queísmo, cosismo) en un texto.",
                        "evaluation_focus": "Rigor ortográfico."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Trimestral (STEAM): El Podcast de la Palabra",
                        "description": "Serie de audios argumentativos sobre problemas comunales (Guion + Edición)."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "ESP-10-U01"
            },
            "logicRules": {
                "sequence": ["RA-01", "RA-02"],
                "prerequisites": ["Reading Comprehension 9th"],
                "steam_focus": "Communication & Technology"
            },
            "classificationTags": ["Spanish", "Literature", "Argumentation", "Writing", "Critical Thinking"]
        }

    def run(self):
        units = [self.generate_unit_1_data()]

        logger.info(f"🚀 Starting Spanish Injection...")
        
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
        seed_file = os.path.join(seed_dir, "ESP10_FULL_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Spanish Injection/Preservation Complete.")

if __name__ == "__main__":
    injector = SpanishInjector()
    injector.run()
