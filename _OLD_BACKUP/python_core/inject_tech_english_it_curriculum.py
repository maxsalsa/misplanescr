import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [TECH-ENGLISH-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class TechEnglishITInjector:
    """
    🌐 TECHNICAL ENGLISH FOR IT INJECTOR - REA 2026
    Focus: English for Specific Purposes (ESP) - Hardware Troubleshooting.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Inglés Técnico",
            "grade_level": "10",
            "module_id": "ENG-IT-10-U01",
            "module_name": "Technical Support & Hardware Troubleshooting",
            "specialty": "Desarrollo Web",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "language_style": "Professional / Technical ESP"
        }

    def generate_u01_hardware_troubleshooting(self):
        """Generates payload for Technical English Unit: Hardware Troubleshooting"""
        return {
            "jsonbData": {
                "unit": "Technical Support & Hardware Troubleshooting",
                "estimated_time": "18 Horas",
                "competencia": "Comunicación Asertiva",
                "eje_transversal": "Ciudadanía Global",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Comunicar diagnósticos técnicos de hardware utilizando vocabulario especializado en idioma inglés.",
                        "saberes": [
                            "Technical Vocabulary (CPU, Motherboard, RAM, PSU)",
                            "Troubleshooting verbs (Plug, boot, replace, fix, test)",
                            "Description of components and failure patterns",
                            "Polite requests and professional greetings"
                        ],
                        "indicators": [
                            "Uses technical vocabulary accurately during hardware identification.",
                            "Formulates clear diagnostic questions in English for end-users.",
                            "Describes hardware problems and solutions using appropriate verbs and structures."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Language in Action / Help Desk",
                                "topic": "Technical Support Interaction",
                                "teacher_role": "La persona docente (Language Coach) modela una llamada de soporte técnico y ejemplifica estructuras de pregunta/respuesta.",
                                "student_role": "La persona estudiante (Global IT Technician) interactúa en un role-play describiendo fallas a un cliente angloparlante.",
                                "combobox_variants": [
                                    {
                                        "label": "Lúdica: Tech Taboo",
                                        "description": "Describen componentes sin usar 'palabras prohibidas', mejorando la fluidez y el uso de sinónimos técnicos."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Diversidad en Escritura / Dislexia",
                                "teacher_role": "Proporciona herramientas de dictado por voz (Speech-to-text).",
                                "student_role": "Practica la pronunciación y gramática mediante el dictado automatizado.",
                                "materials": "Software de dictado, Google Docs (Voice Typing)."
                            }
                        ],
                        "evidence": "Audio/Video de Soporte Técnico: Grabación de interacción resolviendo un problema de hardware."
                    },
                    {
                        "id": "RA-02",
                        "description": "Interpretar manuales técnicos y hojas de datos (Data-sheets) en inglés para la configuración de equipos.",
                        "saberes": [
                            "Reading strategies (Skimming and Scanning)",
                            "Technical manuals structure",
                            "Imperative sentences for technical instructions",
                            "Specifications (Voltages, compatibility, sockets)"
                        ],
                        "indicators": [
                            "Extracts specific technical data from manufacturer manuals.",
                            "Follows multi-step technical instructions written in English.",
                            "Identifies technical requirements and constraints in specifications."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Technical Literacy / Lab",
                                "topic": "Manual Analysis & Configuration",
                                "teacher_role": "La persona docente facilita manuales originales (Dell, HP) y guía la extracción de información crítica.",
                                "student_role": "La persona estudiante analiza el manual de una placa base y ejecuta la configuración de la BIOS siguiendo instrucciones en inglés.",
                                "combobox_variants": [
                                    {
                                        "label": "STEAM: The International Assembly",
                                        "description": "Graban un video tipo 'Unboxing' o 'Tutorial de Ensamble' narrado totalmente en inglés."
                                    },
                                    {
                                        "label": "Eje Sostenible: Global E-Waste Debate",
                                        "description": "Argumentan en inglés sobre políticas de reciclaje tecnológico internacionales."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Diversidad Visual",
                                "teacher_role": "Utiliza tarjetas de vocabulario visual (Flashcards con imagen + palabra en alto contraste).",
                                "student_role": "Relaciona conceptos técnicos mediante el apoyo visual robusto.",
                                "materials": "Flashcards técnicas, Software Lupa."
                            }
                        ],
                        "evidence": "Guía Rápida de Usuario (Quick Start Guide): Folleto en inglés para configurar dispositivos de red."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Knowledge",
                        "title": "Glosario Técnico Ilustrado (Pictionary)",
                        "description": "Diccionario personal con los 50 términos más usados en Soporte TI y sus definiciones en inglés."
                    },
                    {
                        "type": "Performance",
                        "title": "Rúbrica de Interacción Help Desk",
                        "criteria": [
                            "Accuracy of technical terms",
                            "Fluency and pronunciation",
                            "Professional tone and customer service"
                        ]
                    },
                    {
                        "type": "Product",
                        "title": "Manual de Usuario Simplificado",
                        "description": "Creación de una guía funcional en inglés para usuarios finales."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "ENG-IT-10-U01-HD"
            },
            "logicRules": {
                "sequence": ["RA-01", "RA-02"],
                "prerequisites": ["Nivel A2 (MCER) recomendado"],
                "esp_focus": "IT Support / Web Dev Hardware"
            },
            "classificationTags": ["Inglés Técnico", "ESP", "IT Support", "Hardware", "10mo"]
        }

    def run(self):
        units = [self.generate_u01_hardware_troubleshooting()]

        logger.info(f"🚀 Starting Technical English for IT Injection...")
        
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []

        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2026"))
            
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail: {unit_id}. Saving to local seed.")

        seed_file = os.path.join(seed_dir, "ENG_IT_10_SUPPORT_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Technical English Injection Complete.")

if __name__ == "__main__":
    injector = TechEnglishITInjector()
    injector.run()
