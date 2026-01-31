import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [CIVICS-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class CivicsInjector:
    """
    ⚖️ CIVICS INJECTOR (11th Grade) - PROTOCOL V2.0
    Injects Unit: Las instituciones democráticas costarricenses: retos y perspectivas.
    Features: Critical Thinking, 18h Time Precision, Teaser/Pro tiers, and Diverse Inclusion.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Educación Cívica",
            "grade_level": "11",
            "module_id": "CIV-11",
            "module_name": "Ética, Estética y Ciudadanía - Cívica",
            "source": "Sovereign Curriculum Engine V2.0",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "privacy_standard": "Verified (No PII)",
            "tier_logic": "Hybrid (Free Teaser / Pro Full)"
        }

    def generate_unit_data(self):
        """Generates payload for Civics Unit: Democratic Institutions"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Las instituciones democráticas costarricenses: retos y perspectivas",
                "estimated_time": "18 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Evaluar la importancia de la división de poderes y el papel de las instituciones en la democracia.",
                        "saberes": [
                            "Constitución Política", 
                            "Poderes del Estado (Ejecutivo, Legislativo, Judicial)", 
                            "Tribunal Supremo de Elecciones"
                        ],
                        "indicators": [
                            "Explica el funcionamiento de la estructura estatal y su relevancia para la convivencia democrática."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente modela el proceso de creación de una ley y ejemplifica el sistema de pesos y contrapesos.",
                                "student_role": "La persona estudiante identifica los tres poderes y sus funciones principales en un mapa mental."
                            },
                            "pro_full": [
                                {
                                    "phase": "Simulación Democrática",
                                    "teacher_role": "La persona docente facilita una sesión de debate parlamentario y guía el proceso de votación de mociones.",
                                    "student_role": "La persona estudiante simula una sesión legislativa donde defiende un proyecto de ley enfocado en necesidades juveniles."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "Cazadores de Fake News",
                                    "description": "Estudiantes actúan como periodistas de investigación. Deben verificar noticias sobre instituciones públicas usando sitios oficiales para ganar 'puntos de credibilidad'."
                                },
                                {
                                    "type": "STEAM",
                                    "label": "E-Government Design",
                                    "description": "La persona docente y la persona estudiante diseñan el prototipo de una aplicación móvil que facilite a los ciudadanos reportar problemas en sus cantones."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Diversidad / TEA",
                                "teacher_role": "La persona docente utiliza una agenda visual clara con las 'Reglas de Debate'.",
                                "student_role": "La persona estudiante utiliza guiones sociales para facilitar la expresión de ideas sin ansiedad social profesional.",
                                "support": "Agendas visuales y cronogramas de intervención estructurados."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone un análisis comparativo entre el sistema costarricense y otros modelos internacionales.",
                                "student_role": "La persona estudiante evalúa índices de libertad y transparencia (Transparency International) y redacta un ensayo crítico.",
                                "enrichment": "Análisis de índices globales de gobernanza."
                            }
                        ],
                        "evidence": "Acta de la sesión legislativa simulada y esquema de funciones institucionales."
                    },
                    {
                        "id": "RA-02",
                        "description": "Analizar los retos actuales de la democracia costarricense frente a la corrupción y la participación ciudadana.",
                        "saberes": [
                            "Transparencia", 
                            "Rendición de cuentas", 
                            "Cultura de paz", 
                            "Mecanismos de participación (Referéndum, Cabildos)"
                        ],
                        "indicators": [
                            "Propone soluciones ante los desafíos democráticos mediante el uso de mecanismos de participación ciudadana legalmente establecidos."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente facilita el análisis de casos de transparencia básica.",
                                "student_role": "La persona estudiante identifica mecanismos de participación ciudadana en su comunidad."
                            },
                            "pro_full": [
                                {
                                    "phase": "Acción Ciudadana",
                                    "teacher_role": "La persona docente facilita el acceso a herramientas digitales de información pública (Dato Abierto).",
                                    "student_role": "La persona estudiante investiga un mecanismo de participación y diseña una campaña para promover el voto informado."
                                }
                            ]
                        },
                        "evidence": "Infografía sobre participación ciudadana y reporte de análisis de transparencia."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Trabajo Cotidiano: Ciudadanía y Debate",
                        "is_premium": True,
                        "criteria": [
                            {
                                "name": "Argumentación Respetuosa",
                                "levels": {
                                    "inicial": "Expresa ideas sin sustento en fuentes legales.",
                                    "intermedio": "Argumenta usando la Constitución con apoyo del docente.",
                                    "avanzado": "Defiende posturas críticas fundamentadas en fuentes oficiales y legales."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea: Entrevista Comunitaria",
                        "is_premium": False,
                        "challenge": "Entrevistar a un miembro de la Asociación de Desarrollo sobre los retos de su gestión ciudadana."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto: Mi Propuesta de Ley",
                        "is_premium": True,
                        "description": "Documento formal donde el estudiante identifica un problema nacional y redacta una solución con estructura de ley."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "CIV-11-U01"
            },
            "logicRules": {
                "sequence": ["RA-01", "RA-02"],
                "prerequisites": ["Cívica 10°"],
                "steam_focus": "Ingeniería Social & Procesos Democráticos"
            },
            "classificationTags": ["Educación Cívica", "Democracia", "Instituciones", "Participación", "Transparencia"]
        }

    def run(self):
        unit_data = self.generate_unit_data()

        logger.info(f"🚀 Starting Civics V2.0 Injection...")
        
        # Ensure seed directory exists
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        unit_id = unit_data["mepMetadata"]["unit_id"]
        unit_name = unit_data["jsonbData"]["unit"]
        
        # Generate Deterministic Semantic Hash
        semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2.0-CIV"))
        
        logger.info(f"   Injecting {unit_id}: {unit_name}...")
        
        # Try DB Injection
        success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
        
        if success:
            logger.info(f"   ✅ Success: {unit_id}")
        else:
            logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}. Saving to local seed.")

        # Save to File
        seed_file = os.path.join(seed_dir, "CIVICS_11_UNIT1_V2_PROTO.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump([unit_data], f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Civics V2.0 Injection Complete.")

if __name__ == "__main__":
    injector = CivicsInjector()
    injector.run()
