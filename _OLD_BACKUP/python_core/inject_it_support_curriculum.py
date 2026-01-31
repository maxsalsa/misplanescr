import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [IT-SUPPORT-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class ITSupportInjector:
    """
    💻 IT SUPPORT INJECTOR (10th Grade) - PROTOCOL V2.0
    Injects Unit: Herramientas y Equipos de Medición.
    Features: Free/Pro segmentation, STEAM/Lúdica variants, and Privacy compliance.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Soporte TI",
            "grade_level": "10",
            "module_id": "IT-SUP-10",
            "module_name": "Tecnologías de la Información - Soporte",
            "source": "Sovereign Curriculum Engine V2.0",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "privacy_standard": "Verified (No PII)",
            "tier_logic": "Hybrid (Free Teaser / Pro Full)"
        }

    def generate_unit_data(self):
        """Generates payload for IT Support Unit: Tools & Measurement"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Herramientas y Equipos de Medición",
                "estimated_time": "24 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA-02",
                        "description": "Utilizar equipos de medición eléctrica y herramientas de precisión de acuerdo con el mantenimiento requerido.",
                        "saberes": [
                            "Multímetro (Voltaje, Continuidad)", 
                            "Probador de cables (UTP)", 
                            "Herramientas de mano", 
                            "Medidas de seguridad eléctrica"
                        ],
                        "indicators": [
                            "Emplea el multímetro y probadores de red siguiendo las especificaciones técnicas del fabricante."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente explica los rangos de medición en el multímetro y demuestra cómo medir la salida de una fuente de poder.",
                                "student_role": "La persona estudiante ejecuta pruebas de continuidad en cables de red y registra los valores."
                            },
                            "pro_full": [
                                {
                                    "phase": "Desarrollo Técnico",
                                    "teacher_role": "La persona docente modela el uso de herramientas de precisión y medidas de seguridad en el taller.",
                                    "student_role": "La persona estudiante registra los valores de voltaje de una batería CMOS y diagnostica fallas en fuentes ATX."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "Misión Voltaje",
                                    "description": "El aula se divide en equipos de 'Rescatistas de Hardware'. Deben encontrar el componente fallido midiendo voltajes en placas base de desecho para ganar puntos y insignias."
                                },
                                {
                                    "type": "STEAM",
                                    "label": "Construcción de un Tester Casero",
                                    "description": "Los estudiantes usan un LED y una batería para crear un probador de continuidad básico, entendiendo la física detrás de la herramienta."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Baja Visión / Ceguera",
                                "teacher_role": "La persona docente facilita multímetros con síntesis de voz o marcas táctiles en el dial.",
                                "student_role": "La persona estudiante identifica el estado del cable por señales auditivas del probador.",
                                "support": "Equipos con feedback auditivo / braille."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone retos de calibración y análisis de precisión en herramientas digitales vs analógicas.",
                                "student_role": "La persona estudiante investiga la tolerancia de componentes y el impacto de la temperatura en las mediciones.",
                                "enrichment": "Análisis de hojas de datos de fabricantes (Fluke/Extech)."
                            }
                        ],
                        "modality_adjustments": [
                             {
                                "modality": "Nocturna / IPEC",
                                "teacher_role": "La persona docente enfoca la práctica en herramientas que el estudiante ya usa en su trabajo técnico o doméstico.",
                                "student_role": "La persona estudiante clasifica sustancias peligrosas y mide voltajes en entornos laborales reales.",
                                "reduction": "Teoría extensa reducida a manuales gráficos rápidos."
                             }
                        ],
                        "evidence": "Bitácora de mediciones técnicas y diagnóstico de cables."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Trabajo Cotidiano: Uso Seguro de Herramientas",
                        "is_premium": True,
                        "criteria": [
                            {
                                "name": "Seguridad Eléctrica",
                                "levels": {
                                    "inicial": "Ignora medidas de seguridad básicas.",
                                    "intermedio": "Sigue protocolos con supervisión constante.",
                                    "avanzado": "Aplica medidas de seguridad de forma autónoma y profesional."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea Corta: Comparativa de Multímetros",
                        "is_premium": False,
                        "challenge": "Crear un cuadro comparativo entre un multímetro analógico y uno digital (ventajas/desventajas)."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto: Manual de Herramientas Esenciales",
                        "is_premium": True,
                        "description": "Co-creación de un catálogo visual de herramientas con sus normas de uso."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "IT-SUP-10-U02"
            },
            "logicRules": {
                "sequence": ["RA-02"],
                "prerequisites": ["IT-SUP-10-U01"],
                "steam_focus": "Electrónica y Mantenimiento"
            },
            "classificationTags": ["Soporte TI", "Medición", "Multímetro", "Mantenimiento", "Seguridad"]
        }

    def generate_unit_hardware_data(self):
        """Generates HIGH-DENSITY payload for Hardware Architecture & Assembly"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Arquitectura de Hardware y Ensamblaje Avanzado",
                "estimated_time": "32 Horas",
                "specialty_code": "TIC-SOT-N3-01",
                "learning_outcomes": [
                    {
                        "id": "RA-03",
                        "description": "Diferenciar las arquitecturas de procesadores y memorias según su rendimiento y compatibilidad.",
                        "saberes": ["Familias de CPU (Intel/AMD)", "Zócalos", "Chipsets", "Tecnologías RAM (DDR4/DDR5)", "Canales (Dual Channel)"],
                        "indicators": ["Distingue entre tipos de procesadores y memorias según sus especificaciones técnicas y compatibilidad con el sistema."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente compara las hojas técnicas de diferentes procesadores y explica el concepto de cuello de botella.",
                                "student_role": "La persona estudiante analiza manuales de placas base y identifica zócalos compatibles."
                            },
                            "pro_full": [
                                {
                                    "phase": "Análisis Técnico",
                                    "teacher_role": "La persona docente modela la selección de componentes para arquitecturas específicas (Gaming, Workstation, Server).",
                                    "student_role": "La persona estudiante selecciona los módulos de memoria compatibles y justifica la elección técnica por rendimiento."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "El Arquitecto de Silicio",
                                    "description": "Simulación de una tienda de componentes. Deben 'vender' la mejor configuración a un cliente con presupuesto limitado."
                                }
                            ]
                        },
                        "evidence": "Cuadro comparativo de arquitecturas y selección técnica de hardware."
                    },
                    {
                        "id": "RA-04",
                        "description": "Instalar dispositivos de almacenamiento masivo y tarjetas de expansión siguiendo protocolos técnicos.",
                        "saberes": ["Unidades SSD (SATA/NVMe)", "HDD", "Tarjetas de video (GPU)", "Tarjetas de red", "Interfases PCIe"],
                        "indicators": ["Instala dispositivos de almacenamiento y expansión cumpliendo con las normas de seguridad electrostática y técnica."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente demuestra la instalación física de una unidad M.2.",
                                "student_role": "La persona estudiante observa y registra los pasos de conexión física."
                            },
                            "pro_full": [
                                {
                                    "phase": "Taller Práctico",
                                    "teacher_role": "La persona docente ejemplifica la configuración en la BIOS/UEFI para el reconocimiento de discos NVMe.",
                                    "student_role": "La persona estudiante instala físicamente los dispositivos y configura el orden de arranque."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "Microscopía de Hardware",
                                    "description": "Uso de lupas para observar pistas de cobre y soldaduras, entendiendo la ingeniería física."
                                }
                            ]
                        },
                        "evidence": "Lista de verificación de instalación y reporte de configuración de BIOS."
                    },
                    {
                        "id": "RA-05",
                        "description": "Configurar el sistema básico de entrada/salida (BIOS/UEFI) para optimizar el arranque del hardware.",
                        "saberes": ["Interfaz UEFI vs BIOS Legacy", "Secure Boot", "Perfiles XMP/DOCP", "Actualización de Firmware"],
                        "indicators": ["Configura las opciones de arranque y seguridad en la BIOS/UEFI de acuerdo con los requerimientos del sistema operativo."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente explica la diferencia entre BIOS y UEFI.",
                                "student_role": "La persona estudiante navega por el entorno de configuración sin realizar cambios."
                            },
                            "pro_full": [
                                {
                                    "phase": "Configuración Crítica",
                                    "teacher_role": "La persona docente modela el ajuste de parámetros de seguridad (Secure Boot) y energía.",
                                    "student_role": "La persona estudiante configura el arranque seguro y monitorea las temperaturas de operación."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Baja Visión",
                                "teacher_role": "La persona docente utiliza componentes con relieves marcados (muescas físicas).",
                                "student_role": "La persona estudiante realiza el ensamblaje guiándose por 'clics' táctiles y guías sonoras."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone el análisis de Overclocking seguro y arquitecturas RISC-V.",
                                "student_role": "La persona estudiante investiga y compila un reporte sobre el futuro del hardware post-Ley de Moore."
                            }
                        ],
                        "evidence": "Capturas de pantalla de la configuración UEFI y registro de temperaturas estables."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Matriz de Observación: Ensamblaje Avanzado",
                        "is_premium": True,
                        "criteria": [{"name": "Precisión Técnica", "levels": {"inicial": "Reconoce piezas", "intermedio": "Ensambla con ayuda", "avanzado": "Optimiza y configura solo"}}]
                    },
                    {
                        "type": "Task",
                        "title": "Investigación: Ley de Moore",
                        "is_premium": False,
                        "challenge": "Investigar la evolución y el límite físico de la microelectrónica actual."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto de Unidad: Ensamblaje y Optimización",
                        "is_premium": True,
                        "description": "Proyecto grupal donde cada estudiante asume un rol técnico (Arquitecto, Ensamblador, Tester)."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "IT-SUP-10-U03"
            },
            "logicRules": {
                "sequence": ["RA-03", "RA-04", "RA-05"],
                "prerequisites": ["IT-SUP-10-U02"],
                "steam_focus": "Arquitectura de Computadoras"
            },
            "classificationTags": ["Soporte TI", "Hardware", "Ensamblaje", "BIOS", "UEFI", "CPU", "RAM"]
        }

    def run(self):
        units = [self.generate_unit_data(), self.generate_unit_hardware_data()]

        logger.info(f"🚀 Starting IT Support V2.0 Injection (High Density)...")
        
        # Ensure seed directory exists
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []

        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            # Generate Deterministic Semantic Hash
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2.0-HD"))
            
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            # Try DB Injection
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}. Saving to local seed.")

        # Save to File
        seed_file = os.path.join(seed_dir, "SOPORTE_TI_10_HIGH_DENSITY.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 IT Support High-Density Injection Complete.")


if __name__ == "__main__":
    injector = ITSupportInjector()
    injector.run()
