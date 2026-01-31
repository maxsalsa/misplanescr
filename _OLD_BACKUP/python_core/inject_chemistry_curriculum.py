import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [CHEM-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class ChemistryInjector:
    """
    🧪 CHEMISTRY INJECTOR (10th Grade)
    Injects:
    - Unit 1: El lenguaje de la Química y la estructura del átomo
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Química",
            "grade_level": "10",
            "module_id": "CHEM-10",
            "module_name": "Ciencias Exactas y Naturales - Química",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"]
        }

    def generate_unit_1_data(self):
        """Generates payload for Chemistry Unit 1"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 1: El lenguaje de la Química y la estructura del átomo",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Representar la estructura del átomo (partículas subatómicas) según los modelos científicos actuales.",
                        "saberes": [
                            "Átomo", "Protones", "Neutrones", "Electrones", 
                            "Número atómico (Z)", "Masa atómica (A)", "Isótopos"
                        ],
                        "indicators": [
                            "Calcula correctamente las partículas subatómicas."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Desarrollo",
                                "context": "Standard",
                                "teacher_role": "La persona docente modela la distribución de cargas en el núcleo y la periferia mediante el uso de simuladores virtuales de construcción de átomos.",
                                "student_role": "La persona estudiante construye modelos atómicos tridimensionales (físicos o digitales) que representen elementos específicos de la tabla periódica."
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Baja Visión / Ceguera",
                                "teacher_role": "La persona docente facilita modelos de átomos con texturas diferenciadas (ej. lana para electrones, lija para protones).",
                                "student_role": "La persona estudiante identifica por tacto la ubicación de las partículas y describe la estructura orbital percibida.",
                                "support_materials": "Material háptico y tablas periódicas en relieve/Braille."
                            },
                            {
                                "population": "TDAH / TDA",
                                "teacher_role": "La persona docente descompone la construcción del átomo en una secuencia de 'misiones' de 10 minutos.",
                                "student_role": "La persona estudiante completa cada misión y marca su avance en un tablero de logros visuales.",
                                "adjustments": "Uso de 'fidgets' permitidos y pausas activas programadas."
                            }
                        ],
                        "modality_adjustments": [
                             {
                                "modality": "IPEC / CINDEA / Nocturno",
                                "teacher_role": "La persona docente vincula la química con materiales de uso cotidiano en el trabajo (ej. metales, gases industriales).",
                                "student_role": "La persona estudiante analiza las fichas de seguridad de productos químicos que utiliza en su entorno laboral actual.",
                                "time_constraint": "Actividades segmentadas para completarse en bloques de 40 min sin tareas de casa."
                             }
                        ],
                        "evidence": "Modelo atómico funcional y tabla de partículas subatómicas completada."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica de Desempeño (Estructura Atómica)",
                        "criteria": [
                            {
                                "name": "Cálculo de Partículas",
                                "levels": {
                                    "inicial": "Identifica el número atómico (Z) pero confunde la relación entre masa atómica y neutrones.",
                                    "intermedio": "Calcula correctamente las partículas pero tiene dificultad para representar los isótopos en el modelo.",
                                    "avanzado": "Determina con precisión Z, A, p+, n0 y e- para cualquier elemento, incluyendo sus variantes isotópicas."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Tracking",
                        "title": "Registro de Avance para Adecuación Significativa",
                         "criteria": [
                            {
                                "indicator_name": "Distinción de partes átomo",
                                "description": "Distingue las partes principales de un átomo (núcleo y nube) con apoyo visual.",
                                "technique": "Observación del desempeño y uso de software de arrastrar y soltar."
                            }
                        ]
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "CHEM-10-U01"
            },
            "logicRules": {
                "sequence": ["RA-01"],
                "prerequisites": ["Ciencias 9no Año"],
                "steam_focus": "Modelado Científico"
            },
            "classificationTags": ["Química", "Átomo", "Modelos Atómicos", "Ciencias", "10mo"]
        }

    def generate_unit_2_data(self):
        """Generates payload for Chemistry Unit 2: Properties & Periodic Table"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 2: Propiedades de la materia y Tabla Periódica",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Relacionar la periodicidad química con la configuración electrónica y las propiedades de los elementos.",
                        "saberes": [
                            "Tabla Periódica", "Radio atómico", "Energía de ionización", 
                            "Electronegatividad", "Familia química", "Periodo"
                        ],
                        "indicators": [
                            "Ubica elementos e identifica propiedades generales con pocos errores.",
                            "Utiliza la tabla periódica para predecir comportamientos químicos con precisión."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Desarrollo",
                                "context": "Aula Regular",
                                "teacher_role": "La persona docente modela la organización de los elementos mediante un 'Muro de Tendencias' visual y explica el radio atómico.",
                                "student_role": "La persona estudiante organiza tarjetas de elementos físicos por sus propiedades y deduce el comportamiento de una familia química.",
                                "combobox_variants": [
                                    {
                                        "label": "Juego de Roles (Kinestésico)",
                                        "description": "Los estudiantes actúan como elementos buscando su 'familia' según su valencia."
                                    },
                                    {
                                        "label": "Laboratorio Virtual (TIC)",
                                        "description": "Uso de app de Realidad Aumentada para ver tendencias periódicas en 3D."
                                    }
                                ]
                            },
                            {
                                "phase": "Aplicación",
                                "context": "Laboratorio",
                                "teacher_role": "La persona docente ejemplifica la transferencia de electrones mediante simulaciones o modelos.",
                                "student_role": "La persona estudiante construye estructuras de Lewis utilizando materiales concretos y resuelve la formación de compuestos.",
                                "combobox_variants": [
                                    {
                                        "label": "Laboratorio Express",
                                        "description": "Prueba de conductividad eléctrica en sustancias cotidianas para identificar enlaces."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Baja Visión",
                                "teacher_role": "La persona docente facilita una tabla periódica en relieve y describe la textura de diferentes materiales puros.",
                                "student_role": "La persona estudiante identifica elementos por densidad y peso relativo mediante balanzas táctiles.",
                                "support_materials": "Material háptico y audiodescripción de reacciones."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone el análisis de la configuración electrónica de elementos de transición interna.",
                                "student_role": "La persona estudiante investiga la aplicación de tierras raras en la tecnología de semiconductores.",
                                "enrichment": "Retos de investigación en sitios verificados (IUPAC/Royal Society)."
                            }
                        ],
                        "modality_adjustments": [
                             {
                                "modality": "CINDEA / Nocturno",
                                "teacher_role": "La persona docente vincula la tabla periódica con la toxicidad de materiales en entornos industriales/agrícolas.",
                                "student_role": "La persona estudiante clasifica sustancias peligrosas de su entorno laboral según su reactividad química.",
                                "relevance": "Enfoque en seguridad laboral y química ambiental inmediata."
                             }
                        ],
                        "evidence": "Cuaderno de bitácora y ejercicios de ubicación."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "A. Trabajo Cotidiano (Rúbrica Analítica)",
                        "criteria": [
                            {
                                "name": "Uso de Tabla Periódica",
                                "levels": {
                                    "inicial": "Localiza elementos pero confunde el grupo con el periodo.",
                                    "intermedio": "Ubica elementos e identifica propiedades generales con pocos errores.",
                                    "avanzado": "Utiliza la tabla periódica para predecir comportamientos químicos con precisión."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "B. Tarea Corta (Individual/Refuerzo)",
                        "challenge": "Crear una infografía digital o física sobre un elemento 'misterioso' asignado, detallando sus usos en la industria costarricense."
                    },
                    {
                        "type": "Project",
                        "title": "C. Proyecto de Unidad (Integrador)",
                        "name": "'Mi Elemento, Mi Planeta'",
                        "description": "Co-creación de una campaña publicitaria para 'vender' un elemento químico, explicando su importancia para la vida y su impacto ambiental."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "CHEM-10-U02"
            },
            "logicRules": {
                "sequence": ["RA-01"],
                "prerequisites": ["CHEM-10-U01"],
                "steam_focus": "Tecnología de Materiales"
            },
            "classificationTags": ["Química", "Tabla Periódica", "Enlaces", "Propiedades de la Materia"]
        }

    def run(self):
        units = [self.generate_unit_1_data(), self.generate_unit_2_data()]

        logger.info(f"🚀 Starting Chemistry Injection...")
        
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
        seed_file = os.path.join(seed_dir, "CHEM10_FULL_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Chemistry Injection/Preservation Complete.")

if __name__ == "__main__":
    injector = ChemistryInjector()
    injector.run()
