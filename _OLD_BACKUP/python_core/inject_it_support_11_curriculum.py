import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [IT-SUPPORT-11-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class ITSupport11Injector:
    """
    💻 IT SUPPORT INJECTOR (11th Grade) - PROTOCOL V2.0 (MNC N3)
    Injects Unit: Mantenimiento Correctivo de Hardware y Software.
    Features: Free/Pro segmentation, STEAM/Lúdica variants, TEA inclusion.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Soporte TI",
            "grade_level": "11",
            "module_id": "IT-SUP-11",
            "module_name": "Tecnologías de la Información - Soporte",
            "source": "Sovereign Curriculum Engine V2.0",
            "curriculum_year": 2026,
            "mnc_level": 3,
            "mnc_code": "TIC-SOT-N3-01",
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "privacy_standard": "Verified (No PII)",
            "tier_logic": "Hybrid (Free Teaser / Pro Full)"
        }

    def generate_corrective_unit_data(self):
        """Generates payload for 11th Grade Corrective Maintenance (40 Hours)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Mantenimiento Correctivo de Hardware y Software",
                "estimated_time": "40 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA 01",
                        "description": "Reparar fallas físicas en equipos de cómputo mediante la sustitución o reparación de componentes internos.",
                        "saberes": [
                            "Micro-soldadura básica", 
                            "Sustitución de pantallas (Laptops)", 
                            "Reemplazo de periféricos internos", 
                            "Gestión de repuestos"
                        ],
                        "indicators": [
                            "Restaura la funcionalidad del hardware dañado aplicando técnicas de reparación profesional y normas de seguridad."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente demuestra la técnica de apertura de dispositivos móviles/portátiles.",
                                "student_role": "La persona estudiante observa el flujo de desmontaje y identifica componentes internos."
                            },
                            "pro_full": [
                                {
                                    "phase": "Reparación de Hardware",
                                    "teacher_role": "La persona docente ejemplifica el cambio de un componente soldado de baja complejidad y el uso de la estación de calor.",
                                    "student_role": "La persona estudiante ejecuta la sustitución de un componente defectuoso siguiendo la guía de servicio y verifica el funcionamiento post-reparación."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "Speed Repair Challenge",
                                    "description": "En parejas, los estudiantes reciben un equipo con 3 fallas ocultas. Deben diagnosticarlas y repararlas en el menor tiempo posible para ganar el 'Badge de Técnico Senior'."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Diversidad / TEA",
                                "teacher_role": "La persona docente proporciona organizadores de tornillos magnéticos con etiquetas visuales.",
                                "student_role": "La persona estudiante utiliza una guía de pasos con fotos reales (sin texto excesivo) para reducir la carga cognitiva.",
                                "support": "Organizadores visuales y guías fotográficas step-by-step."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone la investigación de técnicas de reballing.",
                                "student_role": "La persona estudiante realiza un análisis de fallas a nivel de esquemáticos eléctricos (diagramas de circuitos).",
                                "enrichment": "Análisis de diagramas de placa base (Boardviews)."
                            }
                        ],
                        "evidence": "Informe técnico de reparación final y lista de piezas sustituidas."
                    },
                    {
                        "id": "RA 02",
                        "description": "Resolver conflictos críticos de software y pérdida de datos utilizando herramientas de recuperación avanzada.",
                        "saberes": [
                            "Recuperación de particiones", 
                            "Boot Repair", 
                            "Eliminación de Malware persistente", 
                            "Backup forense de datos"
                        ],
                        "indicators": [
                            "Soluciona fallas críticas de software asegurando la integridad de la información del usuario."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente ilustra el uso de herramientas de recuperación de datos en vivo (Live USB).",
                                "student_role": "La persona estudiante visualiza la estructura de particiones dañadas en un entorno controlado."
                            },
                            "pro_full": [
                                {
                                    "phase": "Recuperación de Datos",
                                    "teacher_role": "La persona docente facilita el proceso de reconstrucción del sector de arranque y eliminación de rootkits.",
                                    "student_role": "La persona estudiante recupera archivos borrados accidentalmente en una unidad de prueba y repara un sistema operativo que no inicia."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "Ingeniería Inversa",
                                    "description": "La persona docente y la persona estudiante desarman un componente dañado (ej. una fuente de poder) para mapear su circuito y entender por qué falló, uniendo física y electrónica."
                                }
                            ]
                        },
                        "evidence": "Reporte de recuperación de datos y sistema operativo funcionando correctamente."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Trabajo Cotidiano: Destreza en el Taller",
                        "is_premium": True,
                        "criteria": [
                            {
                                "name": "Habilidad Manual y Orden",
                                "levels": {
                                    "inicial": "Desorden en el puesto de trabajo, manejo descuidado de herramientas.",
                                    "intermedio": "Mantiene el orden bajo supervisión, usa herramientas correctamente la mayor parte del tiempo.",
                                    "avanzado": "Ejecuta reparaciones limpias, usa químicos/herramientas con precisión profesional."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea: Presupuesto Técnico Profesional",
                        "is_premium": False,
                        "challenge": "Elaboración de un presupuesto técnico que incluya costo de repuestos y mano de obra para un caso real de reparación de laptop."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto: Clínica de Reparación Institucional",
                        "is_premium": True,
                        "description": "Un periodo donde los estudiantes atienden casos reales de la institución (maestros, oficina, otros alumnos) bajo supervisión docente."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "IT-SUP-11-U03"
            },
            "logicRules": {
                "sequence": ["RA 01", "RA 02"],
                "prerequisites": ["Soporte TI 10mo"],
                "steam_focus": "Electrónica Aplicada & Análisis Forense"
            },
            "classificationTags": ["Soporte TI", "Mantenimiento Correctivo", "Reparación Hardware", "Recuperación Software", "MNC N3"]
        }

    def run(self):
        unit_data = self.generate_corrective_unit_data()

        logger.info(f"🚀 Starting IT Support 11th Grade V2.0 Injection...")
        
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        unit_id = unit_data["mepMetadata"]["unit_id"]
        unit_name = unit_data["jsonbData"]["unit"]
        
        semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2-HD-40H"))
        logger.info(f"   Injecting {unit_id}: {unit_name}...")
        
        success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
        
        if success:
            logger.info(f"   ✅ Success: {unit_id}")
        else:
            logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}")

        seed_file = os.path.join(seed_dir, "SOPORTE_TI_11_CORRECTIVE_HD.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump([unit_data], f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 IT Support 11th Grade Injection Complete.")

if __name__ == "__main__":
    injector = ITSupport11Injector()
    injector.run()
