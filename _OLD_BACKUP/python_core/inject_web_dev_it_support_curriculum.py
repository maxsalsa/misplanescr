import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [WEB-DEV-IT-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class WebDevITSupportInjector:
    """
    💻 WEB DEV - IT SUPPORT FULL COLLECTION INJECTOR (10th Grade) - PROTOCOL V2.0
    MNC Code: 0613-01-01-4 (Desarrollo web)
    Units: Fundamentals (72h), Safety (36h), Electricity (36h), Logic (80h).
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Desarrollo web - Soporte TI",
            "grade_level": "10",
            "module_id": "WD-IT-10",
            "module_name": "Especialidad Desarrollo Web - Subárea Soporte TI",
            "source": "Sovereign Curriculum Engine V2.0",
            "curriculum_year": 2026,
            "mnc_code": "0613-01-01-4",
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "privacy_standard": "Verified (No PII)",
            "tier_logic": "Hybrid (Free Teaser / Pro Full)"
        }

    def generate_u01_fundamentals(self):
        """U01: Fundamentos de TI (72h) - REVISIÓN DE ALTA FIDELIDAD (KAIZEN)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "CTP Mercedes Norte",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026",
                    "eje_politica_educativa": "Educación para el desarrollo sostenible",
                    "competencia": "Ingeniería en el Aula"
                },
                "unit": "Unidad 1: Fundamentos de Tecnologías de Información",
                "estimated_time": "72 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA 01",
                        "description": "Ejecutar mantenimiento preventivo and correctivo bajo normas de seguridad industrial.",
                        "saberes": ["Mantenimiento Preventivo/Correctivo", "Hardware Surgery", "Descarga Electrostática (ESD)", "Limpieza Técnica"],
                        "indicators": ["Aplica protocolos de mantenimiento preventivo documentando el estado inicial and final del hardware."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente modela el uso de aire comprimido and limpia-contactos mediante una 'Cirugía de Hardware'.",
                                "student_role": "La persona estudiante identifica los puntos críticos de limpieza and riesgos de ESD en la motherboard."
                            },
                            "pro_full": [
                                {
                                    "phase": "Hardware Surgery",
                                    "teacher_role": "La persona docente ejemplifica la importancia de la descarga electrostática (ESD) and el uso de la pulsera antiestática.",
                                    "student_role": "La persona estudiante ejecuta un protocolo real de mantenimiento preventivo, documentando con fotografías para su Portafolio."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "El Consultor de TI",
                                    "description": "El aula se transforma en empresa. Estudiantes resuelven 'tickets de soporte' para ganar monedas de clase (Gamificación)."
                                },
                                {
                                    "type": "Sostenibilidad",
                                    "label": "Laboratorio de E-Waste",
                                    "description": "Separación de componentes útiles de equipos de desecho, fomentando la economía circular tecnológica."
                                }
                            ]
                        }
                    },
                    {
                        "id": "RA 02",
                        "description": "Construir infraestructuras de red locales bajo normas internacionales de conectividad.",
                        "saberes": ["Arquitectura de Redes", "Ponchado Certificado", "Normas T568A/B", "Testeador Digital", "Topologías"],
                        "indicators": ["Construye cables de red funcionales and valida la transferencia de datos sin pérdida de paquetes."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente facilita un taller de 'Ponchado Certificado' and proporciona las normas T568A/B.",
                                "student_role": "La persona estudiante identifica la secuencia de colores de la norma T568B."
                            },
                            "pro_full": [
                                {
                                    "phase": "Conectividad",
                                    "teacher_role": "La persona docente guía la verificación de continuidad mediante un testeador digital en cada cable construido.",
                                    "student_role": "La persona estudiante construye un cable de red funcional and valida su conectividad en un entorno real."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "Data Traffic Control",
                                    "description": "Simulación física de un router. Estudiantes actúan como paquetes de datos que deben ser 'enrutados' según su IP."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Diversidad Cognitiva",
                                "teacher_role": "La persona docente utiliza diagramas de conexión en relieve (3D) and guías de 'Lectura Fácil'.",
                                "student_role": "La persona estudiante logra el ensamble siguiendo guías visuales simplificadas.",
                                "support": "Diagramas 3D and guías Lectura Fácil."
                            }
                        ]
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Conocimiento",
                        "title": "Infografía: Topologías de Red & Costos",
                        "is_premium": False,
                        "description": "Análisis comparativo de Estrella, Bus and Malla con impacto en presupuesto."
                    },
                    {
                        "type": "Desempeño",
                        "title": "Checklist: Auditoría de Hardware Surgery",
                        "is_premium": True,
                        "description": "Observación de la aplicación de medidas de seguridad industrial durante el desmontaje."
                    },
                    {
                        "type": "Producto",
                        "title": "Reporte Técnico: Soporte de Nivel 1",
                        "is_premium": True,
                        "description": "Documento formal de reparación/mantenimiento, incluyendo diagnóstico and solución aplicada."
                    }
                ]
            },
            "mepMetadata": {**self.base_metadata, "unit_id": "WD-IT-10-U01"}
        }

    def generate_u02_safety(self):
        """U02: Seguridad Industrial (36h)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026",
                    "eje_politica_educativa": "Educación para el desarrollo sostenible",
                    "competencia": "Innovación y creatividad"
                },
                "unit": "Unidad 2: Seguridad Industrial y Salud Ocupacional",
                "estimated_time": "36 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA 01",
                        "description": "Mencionar el impacto de las regulaciones nacionales aplicadas en el campo de la Seguridad Industrial.",
                        "saberes": ["Prevención de riesgos", "Salud ocupacional", "Ley 6727", "EPP"],
                        "indicators": ["Evalúa condiciones de seguridad del laboratorio proponiendo mejoras."],
                        "mediation_strategies": {
                            "free_teaser": {"teacher_role": "Docente modela riesgos mediante simulacro.", "student_role": "Estudiante investiga normativa."},
                            "pro_full": [{"phase": "Estrategia", "teacher_role": "Docente facilita simulacro de incidente.", "student_role": "Estudiante evalúa laboratorio actual."}],
                            "variants": [
                                {"type": "Lúdica", "label": "Inspectores de Seguridad", "description": "Auditoría sorpresa con créditos de seguridad."},
                                {"type": "STEAM", "label": "Smart Safety Station", "description": "Prototipo de sensor de temperatura con alarma."}
                            ]
                        }
                    },
                    {
                        "id": "RA 02",
                        "description": "Aplicar normas de seguridad industrial en el desarrollo de actividades técnicas de TI.",
                        "saberes": ["Señalética", "Ergonomía", "Prevención incendios", "Primeros auxilios"],
                        "indicators": ["Diseña planes de ergonomía and evacuación validados."],
                        "mediation_strategies": {
                            "free_teaser": {"teacher_role": "Docente facilita taller ergonómico.", "student_role": "Estudiante diseña plan ergonómico."},
                            "pro_full": [{"phase": "Prevención", "teacher_role": "Docente guía diseño de mapa evacuación.", "student_role": "Estudiante ejecuta rol de brigadista."}],
                            "variants": [{"type": "Inclusión", "label": "Señalética Táctil", "description": "Diseño de guías Braille and táctiles."}]
                        }
                    }
                ],
                "evaluation_instruments": [
                    {"type": "Quiz", "title": "Examen Simulación Riesgos", "is_premium": True},
                    {"type": "Checklist", "title": "Lista Cotejo: Postura Ergonómica", "is_premium": False},
                    {"type": "Product", "title": "Mapa de Riesgos Digital", "is_premium": True}
                ]
            },
            "mepMetadata": {**self.base_metadata, "unit_id": "WD-IT-10-U02"}
        }

    def generate_u03_electricity(self):
        """U03: Electricidad y Electrónica (36h) - REA 2026 (EVOLUCIÓN TOTAL)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026",
                    "eje_politica_educativa": "Educación para el desarrollo sostenible",
                    "competencia": "Innovación y creatividad"
                },
                "unit": "Unidad de Estudio 3: Electricidad y Electrónica",
                "estimated_time": "36 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA 03",
                        "description": "Identificar fundamentos de electricidad y electrónica requeridos en la industria.",
                        "saberes": ["Ley de Ohm", "Magnitudes (V, I, R)", "Multímetro", "Circuitos Serie/Paralelo", "Fuentes de alimentación"],
                        "indicators": ["Mide magnitudes eléctricas básicas siguiendo protocolos técnicos and diagnóstica fallos en fuentes de poder."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente modela el comportamiento de las magnitudes eléctricas y su relación mediante la Ley de Ohm.",
                                "student_role": "La persona estudiante identifica las unidades de medida and su aplicación en componentes básicos."
                            },
                            "pro_full": [
                                {
                                    "phase": "Diagnóstico de Potencia",
                                    "teacher_role": "La persona docente modela la técnica de diagnóstico de fuentes de poder mediante el uso del multímetro and ejemplifica el cálculo de cargas.",
                                    "student_role": "La persona estudiante experimenta con protoboards para construir circuitos and ejecuta mediciones en componentes de hardware real."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "La PC Viva",
                                    "description": "Análisis del consumo eléctrico de una PC en reposo vs. máxima carga, calculando el costo económico and ambiental."
                                },
                                {
                                    "type": "Lúdica",
                                    "label": "El Laberinto de Continuidad",
                                    "description": "Seguimiento de pistas de cobre en una placa madre dañada utilizando el multímetro para hallar rupturas de circuito."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Inclusión Sensorial",
                                "teacher_role": "La persona docente utiliza componentes electrónicos sobredimensionados (XL) and multímetros con salida de voz.",
                                "student_role": "La persona estudiante participa en la medición utilizando herramientas adaptadas con señales visuales de alto contraste.",
                                "support": "Herramientas adaptadas (voz/alto contraste) and componentes XL."
                            }
                        ]
                    },
                    {
                        "id": "RA 04",
                        "description": "Aplicar principios de electrónica digital y microcontroladores en soluciones técnicas.",
                        "saberes": ["Lógica binaria", "Sensores (Luz, Temp, Ultrasónico)", "Actuadores", "Ecosistema Arduino"],
                        "indicators": ["Diseña prototipos de seguridad and sistemas de alerta temprana basados en microcontroladores."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente facilita el entendimiento de la lógica binaria aplicada a sensores básicos.",
                                "student_role": "La persona estudiante diferencia entre señales analógicas and digitales en un entorno simulado."
                            },
                            "pro_full": [
                                {
                                    "phase": "Ingeniería de Control",
                                    "teacher_role": "La persona docente facilita un desafío de automatización básica y guía la integración de sensores para la protección de servidores.",
                                    "student_role": "La persona estudiante diseña un sistema de alerta temprana (luz/sonido) and programa un microcontrolador para responder al entorno."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Alta Dotación",
                                    "label": "IoT Security Monitor",
                                    "description": "Creación de un monitor de temperatura IoT que envíe alertas a un dashboard web, conectando electrónica con desarrollo web."
                                }
                            ]
                        }
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Conocimiento",
                        "title": "Infografía: Anatomía de una Fuente de Poder",
                        "is_premium": False,
                        "description": "Explicación de conversión AC a DC and protección de componentes críticos."
                    },
                    {
                        "type": "Desempeño",
                        "title": "Rúbrica: Laboratorio de Mediciones Reales",
                        "is_premium": True,
                        "description": "Ejecución correcta de mediciones en circuitos serie and paralelo sin riesgo de cortocircuito."
                    },
                    {
                        "type": "Producto",
                        "title": "Prototipo: Sistema de Seguridad Arduino",
                        "is_premium": True,
                        "description": "Dispositivo que detecte apertura de gabinetes o temperaturas críticas, documentado para el portafolio."
                    }
                ]
            },
            "mepMetadata": {**self.base_metadata, "unit_id": "WD-IT-10-U03"}
        }

    def generate_u04_logic(self):
        """U04: Lógica de Programación (80h)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026",
                    "eje_politica_educativa": "Educación para el desarrollo sostenible",
                    "competencia": "Solución"
                },
                "unit": "Unidad 4: Lógica de Programación y Estructuras de Control",
                "estimated_time": "80 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA 01",
                        "description": "Desarrollar algoritmos utilizando estructuras de control.",
                        "saberes": ["Secuenciales", "Selectivas", "Ciclos", "Tipos Datos"],
                        "indicators": ["Resuelve problemas aplicando estructuras coherentes."],
                        "mediation_strategies": {
                            "free_teaser": {"teacher_role": "Docente modela diagramas.", "student_role": "Estudiante identifica símbolos."},
                            "pro_full": [{"phase": "Dev", "teacher_role": "Docente ejemplifica lógica real.", "student_role": "Estudiante construye pseudocódigo."}],
                            "variants": [{"type": "Lúdica", "label": "Programación Desconectada", "description": "Robot laberinto físico."}]
                        }
                    }
                ],
                "evaluation_instruments": [
                    {"type": "Task", "title": "Acertijos Lógicos", "is_premium": False},
                    {"type": "Project", "title": "Inventario Sostenible", "is_premium": True}
                ]
            },
            "mepMetadata": {**self.base_metadata, "unit_id": "WD-IT-10-U04"}
        }

    def run(self):
        units = [
            self.generate_u01_fundamentals(),
            self.generate_u02_safety(),
            self.generate_u03_electricity(),
            self.generate_u04_logic()
        ]

        logger.info(f"🚀 Starting Web Dev IT Support COLLECTION Injection (U01-U04 - HD)...")
        
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []
        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2-COLLECTION"))
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}")

        seed_file = os.path.join(seed_dir, "WEB_DEV_10_IT_SUPPORT_FULL.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Collection Injection Complete.")

if __name__ == "__main__":
    injector = WebDevITSupportInjector()
    injector.run()
