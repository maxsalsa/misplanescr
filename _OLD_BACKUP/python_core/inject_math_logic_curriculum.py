import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [MATH-LOGIC-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class MathLogicInjector:
    """
    🧮 APPLIED MATHEMATICS INJECTOR - REA 2026
    Focus: The Math of the Bit - Binary Systems and Propositional Logic.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Matemáticas Aplicadas",
            "grade_level": "10",
            "module_id": "MATH-IT-10-U01",
            "module_name": "Sistemas de Numeración y Lógica Proposicional",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "language_style": "Scientific / Applied Computing"
        }

    def generate_u01_binary_logic(self):
        """Generates payload for Applied Math Unit: Binary & Logic"""
        return {
            "jsonbData": {
                "unit": "Unidad: Sistemas de Numeración y Lógica Proposicional",
                "estimated_time": "24 Horas",
                "competencia": "Solución de Problemas",
                "eje_transversal": "Ciudadanía Digital",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Realizar conversiones entre sistemas numéricos (Binario, Decimal, Hexadecimal) para la interpretación de datos.",
                        "saberes": [
                            "Sistemas posicionales y bases numéricas",
                            "Base 2 (Binario) y Base 10 (Decimal)",
                            "Base 16 (Hexadecimal)",
                            "Aplicaciones: Direccionamiento MAC, Direccionalidad IP, Colores Web (Hex)"
                        ],
                        "indicators": [
                            "Convierte números entre bases 2, 10 y 16 con precisión algorítmica.",
                            "Identifica la relación entre el sistema binario y el almacenamiento de datos.",
                            "Traduce códigos hexadecimales a sus componentes RGB equivalentes."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "La Matemática del Bit / Sistemas",
                                "topic": "Conversión de Bases",
                                "teacher_role": "La persona docente (Criptógrafo / Facilitador) modela la conversión mediante 'La Balanza de Potencias'.",
                                "student_role": "La persona estudiante (Analista / Programador) resuelve acertijos de conversión para descifrar mensajes ocultos.",
                                "combobox_variants": [
                                    {
                                        "label": "STEAM: The Human Computer",
                                        "description": "Los estudiantes actúan como celdas de memoria; se ponen de pie o sientan para representar un número binario dictado."
                                    },
                                    {
                                        "label": "Lúdica: Binary Code Breaker",
                                        "description": "Se comunican usando linternas (On=1, Off=0) para transmitir nombres en binario."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Diversidad Cognitiva",
                                "teacher_role": "Utiliza bloques lógicos físicos o representaciones visuales concretas de las potencias de 2.",
                                "student_role": "Manipula materiales físicos para internalizar el valor posicional de los bits.",
                                "materials": "Bloques multibase, Cartas de potencias."
                            }
                        ],
                        "evidence": "Criptograma Binario: Resolución de serie de conversiones para revelar código técnico."
                    },
                    {
                        "id": "RA-02",
                        "description": "Resolver problemas lógicos mediante tablas de verdad y compuertas lógicas en contextos técnicos.",
                        "saberes": [
                            "Proposiciones simples y compuestas",
                            "Conectores lógicos (AND/y, OR/o, NOT/no)",
                            "Tablas de verdad y tautologías",
                            "Compuertas lógicas básicas (Hardware Logic)"
                        ],
                        "indicators": [
                            "Construye tablas de verdad para proposiciones técnicas complejas.",
                            "Diseña circuitos lógicos básicos que resuelven problemas de decisión.",
                            "Evalúa la validez de sentencias lógicas aplicadas a la ciberseguridad."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Circuitos de Verdad / Lógica",
                                "topic": "Tablas de Verdad y Compuertas",
                                "teacher_role": "La persona docente facilita un desafío de 'Circuitos de Verdad' y guía la construcción de sentencias lógicas.",
                                "student_role": "La persona estudiante diseña una tabla de verdad para un sistema de alarma institucional y valida la lógica.",
                                "combobox_variants": [
                                    {
                                        "label": "Eje Sostenible: Data Efficiency",
                                        "description": "Analizan el ahorro de bits mediante sistemas de compresión, reduciendo la necesidad de hardware físico."
                                    }
                                ]
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Baja Visión / Ceguera",
                                "teacher_role": "Proporciona calculadoras de base numérica con voz y diagramas de compuertas lógicas en relieve.",
                                "student_role": "Valida la lógica mediante el tacto y el audio.",
                                "materials": "Diagramas táctiles, Calculadoras parlantes."
                            }
                        ],
                        "evidence": "Calculadora de Color Hex: Proyecto web/Excel que traduce colores Hex a su valor binario y RGB."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Product",
                        "title": "Criptograma Binario (Cyber-Decryption)",
                        "description": "Reto de descifrado masivo integrando binario y hexadecimal."
                    },
                    {
                        "type": "Performance",
                        "title": "Rúbrica: Laboratorio de Lógica y Seguridad",
                        "criteria": [
                            "Construcción correcta de la tabla de verdad",
                            "Simplificación de proposiciones lógicas",
                            "Diseño del diagrama de compuertas"
                        ]
                    },
                    {
                        "type": "Knowledge",
                        "title": "Examen: La Arquitectura del Bit",
                        "description": "Evaluación teórica sobre sistemas posicionales y conectores lógicos."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MATH-IT-10-U01-HD"
            },
            "logicRules": {
                "sequence": ["RA-01", "RA-02"],
                "prerequisites": ["Aritmética básica"],
                "steam_focus": "Formal Logic & Binary Foundations"
            },
            "classificationTags": ["Matemáticas", "Lógica", "Binario", "Computing", "10mo"]
        }

    def run(self):
        units = [self.generate_u01_binary_logic()]

        logger.info(f"🚀 Starting Applied Math for IT Injection...")
        
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

        seed_file = os.path.join(seed_dir, "MATH_IT_10_LOGIC_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Applied Math Injection Complete.")

if __name__ == "__main__":
    injector = MathLogicInjector()
    injector.run()
