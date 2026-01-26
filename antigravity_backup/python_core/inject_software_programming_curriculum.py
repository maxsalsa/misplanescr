import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SOFTWARE-PROG-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class SoftwareProgrammingInjector:
    """
    💻 SOFTWARE PROGRAMMING INJECTOR (12th Grade) - PROTOCOL V2.0 (MNC N4)
    Injects Unit: Arquitectura de Aplicaciones Web y Servicios (Backend).
    Features: High density (80h), Tiered logic, Industrial standards (OWASP, MVC).
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Programación de Software",
            "grade_level": "12",
            "module_id": "SW-PROG-12",
            "module_name": "Tecnologías de la Información - Programación",
            "source": "Sovereign Curriculum Engine V2.0",
            "curriculum_year": 2026,
            "mnc_level": 4,
            "mnc_code": "TIC-DSO-N4-01",
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "privacy_standard": "Verified (No PII)",
            "tier_logic": "Hybrid (Free Teaser / Pro Full)"
        }

    def generate_backend_unit_data(self):
        """Generates HIGH-DENSITY payload for Backend Architecture (80 Hours)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Arquitectura de Aplicaciones Web y Servicios (Backend)",
                "estimated_time": "80 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Desarrollar arquitecturas de backend robustas utilizando patrones de diseño y marcos de trabajo (Frameworks).",
                        "saberes": [
                            "Patrón MVC (Modelo-Vista-Controlador)", 
                            "Inyección de dependencias", 
                            "Servidores de aplicaciones (Node.js/Express o .NET)", 
                            "Middleware"
                        ],
                        "indicators": [
                            "Construye la lógica de servidor de una aplicación web aplicando patrones de diseño para asegurar la escalabilidad."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente modela la creación de una API RESTful y ejemplifica el flujo de una petición (Request/Response).",
                                "student_role": "La persona estudiante observa el flujo y modifica rutas básicas en el servidor."
                            },
                            "pro_full": [
                                {
                                    "phase": "Arquitectura de Capas",
                                    "teacher_role": "La persona docente explica la inyección de dependencias y la separación de responsabilidades en el controlador.",
                                    "student_role": "La persona estudiante estructura el backend de una aplicación y desarrolla los controladores para gestionar la lógica de negocio."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "El Hacker Blanco (White Hat)",
                                    "description": "Los estudiantes intentan encontrar fallos de seguridad en las APIs de sus compañeros (Cross-Site Scripting, Inyección) para ganar puntos."
                                }
                            ]
                        },
                        "evidence": "Estructura de carpetas del proyecto y archivos de configuración del servidor."
                    },
                    {
                        "id": "RA-02",
                        "description": "Implementar servicios de persistencia de datos mediante el uso de ORM y bases de datos relacionales/no relacionales.",
                        "saberes": [
                            "ORM (Prisma/Sequelize/Entity Framework)", 
                            "Migraciones", 
                            "Relaciones (1:1, 1:N, N:N)", 
                            "Seguridad de conexión (SSL/TLS)"
                        ],
                        "indicators": [
                            "Gestiona la persistencia de datos en aplicaciones web utilizando herramientas de mapeo objeto-relacional."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente ilustra el mapeo objeto-relacional básico.",
                                "student_role": "La persona estudiante visualiza modelos de datos en un ORM."
                            },
                            "pro_full": [
                                {
                                    "phase": "Persistencia Avanzada",
                                    "teacher_role": "La persona docente proporciona mejores prácticas para la protección de cadenas de conexión y SSL.",
                                    "student_role": "La persona estudiante diseña el esquema de la base de datos y ejecuta las migraciones para sincronizar el modelo."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "Data Viz Art",
                                    "description": "La persona docente y la persona estudiante crean visualizaciones artísticas de cómo fluyen los datos en la red."
                                }
                            ]
                        },
                        "evidence": "Esquema de base de datos visual y código fuente de los modelos de datos."
                    },
                    {
                        "id": "RA-03",
                        "description": "Asegurar los puntos de acceso (Endpoints) mediante protocolos de autenticación y autorización.",
                        "saberes": [
                            "JWT (JSON Web Tokens)", 
                            "OAuth 2.0", 
                            "Hashing de contraseñas (Bcrypt)", 
                            "Manejo de CORS y variables de entorno"
                        ],
                        "indicators": [
                            "Implementa mecanismos de seguridad en el backend para proteger la integridad y privacidad de la información."
                        ],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente demuestra el hashing de contraseñas.",
                                "student_role": "La persona estudiante registra usuarios aplicando librerías de encriptación básicas."
                            },
                            "pro_full": [
                                {
                                    "phase": "Seguridad en Capas",
                                    "teacher_role": "La persona docente demuestra la implementación de JWT y explica la diferencia entre autenticación y autorización.",
                                    "student_role": "La persona estudiante integra middleware de seguridad en las rutas y valida tokens de acceso."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "Baja Visión / Diversidad",
                                "teacher_role": "La persona docente utiliza temas de alto contraste y facilita lectores de código (Voice-Over).",
                                "student_role": "La persona estudiante navega la estructura del proyecto usando el lector y marcando puntos críticos en el código."
                            },
                            {
                                "population": "Alta Dotación / Potencial",
                                "teacher_role": "La persona docente propone el despliegue en la nube usando contenedores.",
                                "student_role": "La persona estudiante orquesta microservicios y despliega la aplicación de backend en AWS/Azure/GCP."
                            }
                        ],
                        "evidence": "Módulo de autenticación funcional y pruebas de Postman."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica Técnica: Calidad y Seguridad del Código",
                        "is_premium": True,
                        "criteria": [
                            {
                                "name": "Arquitectura Backend",
                                "levels": {
                                    "inicial": "El código funciona pero no usa patrones MVC.",
                                    "intermedio": "Aplica MVC pero con lógica de negocio en controladores.",
                                    "avanzado": "Implementa inyección de dependencias y servicios desacoplados."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea: Análisis de Vulnerabilidades OWASP",
                        "is_premium": False,
                        "challenge": "Analizar las vulnerabilidades OWASP Top 10 y proponer mitigaciones para el proyecto actual."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Final: Plataforma de E-commerce Segura",
                        "is_premium": True,
                        "description": "Backend completo con base de datos, autenticación JWT y documentación técnica con Swagger."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "SW-PROG-12-U01"
            },
            "logicRules": {
                "sequence": ["RA-01", "RA-02", "RA-03"],
                "prerequisites": ["Desarrollo de Aplicaciones 11vo"],
                "steam_focus": "Arquitectura de Software & Ciberseguridad"
            },
            "classificationTags": ["Desarrollo de Software", "Backend", "Node.js", "Express", "Prisma", "JWT", "MNC N4"]
        }

    def generate_agile_unit_data(self):
        """Generates payload for Agile Project Management (40 Hours)"""
        return {
            "jsonbData": {
                "header": {
                    "docente": "[Nombre del Docente]",
                    "institucion": "[Institución]",
                    "logo": "[Logo Institucional]",
                    "periodo": "2026"
                },
                "unit": "Unidad de Estudio: Gestión de Proyectos de Software y Metodologías Ágiles",
                "estimated_time": "40 Horas",
                "learning_outcomes": [
                    {
                        "id": "RA-06",
                        "description": "Aplicar metodologías ágiles (Scrum/Kanban) en el ciclo de vida del desarrollo de software para optimizar la entrega de valor.",
                        "saberes": ["Manifiesto Ágil", "Roles (Product Owner, Scrum Master, Team)", "Eventos (Sprints, Dailies, Retros)", "Tableros Kanban"],
                        "indicators": ["Gestiona proyectos de software utilizando marcos de trabajo ágiles para asegurar la calidad y el cumplimiento de plazos."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente modela una reunión de 'Sprint Planning'.",
                                "student_role": "La persona estudiante identifica los roles de Scrum en un equipo de trabajo."
                            },
                            "pro_full": [
                                {
                                    "phase": "Ejecución Ágil",
                                    "teacher_role": "La persona docente guía la redacción de Historias de Usuario con criterios de aceptación.",
                                    "student_role": "La persona estudiante organiza un equipo, construye su Backlog de producto y ejecuta un Sprint de una semana utilizando un tablero digital."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "Lúdica",
                                    "label": "Lego Scrum",
                                    "description": "Construcción de una 'ciudad' de Lego siguiendo los ritos de Scrum. Se mide la velocidad del equipo y la calidad de los incrementos."
                                }
                            ]
                        },
                        "evidence": "Tablero Kanban actualizado y repositorio de Historias de Usuario documentadas."
                    },
                    {
                        "id": "RA-07",
                        "description": "Utilizar sistemas de control de versiones distribuidores para la gestión colaborativa del código fuente.",
                        "saberes": ["Git (Init, Clone, Push, Pull)", "Gestión de ramas (Branches)", "Merge", "Pull Requests", "Resolución de conflictos"],
                        "indicators": ["Administra el código fuente de forma colaborativa mediante el uso de herramientas de control de versiones."],
                        "mediation_strategies": {
                            "free_teaser": {
                                "teacher_role": "La persona docente demuestra el clonado de un repositorio y el flujo básico de commits.",
                                "student_role": "La persona estudiante realiza su primer push a un repositorio individual."
                            },
                            "pro_full": [
                                {
                                    "phase": "Colaboración Profesional",
                                    "teacher_role": "La persona docente demuestra el flujo de trabajo de Git-Flow y la resolución de conflictos en vivo.",
                                    "student_role": "La persona estudiante colabora con sus pares mediante el envío y revisión de Pull Requests en un entorno de co-creación."
                                }
                            ],
                            "variants": [
                                {
                                    "type": "STEAM",
                                    "label": "Algoritmos de Productividad",
                                    "description": "Análisis estadístico de los gráficos de Burndown Chart para predecir la entrega del proyecto."
                                }
                            ]
                        },
                        "dua_strategies": [
                            {
                                "population": "TDAH / Diversidad",
                                "teacher_role": "La persona docente utiliza tarjetas físicas de colores y temporizadores visuales.",
                                "student_role": "La persona estudiante participa en Dailies estructuradas de máximo 5 minutos.",
                                "support": "Temporizadores visuales y tableros físicos complementarios."
                            },
                            {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone la implementación de flujos CI/CD.",
                                "student_role": "La persona estudiante automatiza las pruebas mediante GitHub Actions o GitLab CI.",
                                "enrichment": "Integración Continua y Despliegue Continuo avanzado."
                            }
                        ],
                        "evidence": "Repositorio remoto con historial de commits y registro de Pull Requests aprobados."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Matriz de Desempeño: Ceremonias Ágiles y Git",
                        "is_premium": True,
                        "criteria": [{"name": "Calidad de Colaboración", "levels": {"inicial": "Comunica poco", "intermedio": "Aporta en ritos", "avanzado": "Lidera ritos y gestiona ramas sin errores"}}]
                    },
                    {
                        "type": "Task",
                        "title": "Análisis: Cascada vs Scrum",
                        "is_premium": False,
                        "challenge": "Realizar un cuadro comparativo entre metodologías tradicionales y ágiles."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Final: Startup Escolar",
                        "is_premium": True,
                        "description": "Entrega de un Producto Mínimo Viable (MVP) gestionado al 100% con Git y Scrum."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "SW-PROG-12-U03"
            },
            "logicRules": {
                "sequence": ["RA-06", "RA-07"],
                "prerequisites": ["SW-PROG-12-U01"],
                "steam_focus": "Gestión de Datos & Productividad"
            },
            "classificationTags": ["Agile", "Scrum", "Git", "Proyectos", "DevOps", "MNC N4"]
        }

    def run(self):
        units = [self.generate_backend_unit_data(), self.generate_agile_unit_data()]

        logger.info(f"🚀 Starting Software Programming V2.0 Injection (Multi-Unit HD)...")
        
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []
        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}-V2-HD"))
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}")

        seed_file = os.path.join(seed_dir, "SW_PROG_12_FULL_COLLECTION.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Software Programming Collection Injection Complete.")

if __name__ == "__main__":
    injector = SoftwareProgrammingInjector()
    injector.run()
