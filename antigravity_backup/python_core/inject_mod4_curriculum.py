import os
import json
import logging
import uuid
from datetime import datetime
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [MOD4-INJECTOR] - %(message)s')
logger = logging.getLogger(__name__)

class Module4Injector:
    """
    💉 MODULE 4 INJECTOR (11th Grade Technical Education)
    Injects:
    - Unit 2: Persistence & Connectivity (RA 03, RA 04)
    - Unit 3: Frontend Web Development (RA 05, RA 06)
    - Unit 4: Interaction & Client Logic (RA 07, RA 08)
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "specialty": "Desarrollo Web",
            "grade_level": "11",
            "module_id": "MOD-04-11",
            "module_name": "Programación de Software",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026
        }

    def generate_unit_2_data(self):
        """Generates payload for Unit 2: Connectivity & Persistence"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 2: Persistencia de Datos y Conectividad con Bases de Datos",
                "learning_outcomes": [
                    {
                        "id": "RA-03",
                        "description": "Establecer la conexión entre aplicaciones de software y sistemas de gestión de bases de datos.",
                        "saberes": [
                            "Drivers de conexión (JDBC/ODBC/ORM)",
                            "Cadenas de conexión (Connection Strings)",
                            "Seguridad de credenciales",
                            "CRUD básico"
                        ],
                        "indicators": [
                            "Implementa la conectividad funcional entre el lenguaje de programación y el motor de base de datos siguiendo estándares de seguridad."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Analogía memoria corto plazo vs persistencia",
                                "description": "Análisis de pérdida de datos al cerrar programa sin persistencia."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Estaciones de comparación técnica",
                                "description": "Investigación de diferencias entre bases de datos relacionales y no relacionales."
                            },
                            {
                                "phase": "Desarrollo",
                                "activity": "Live coding y configuración de drivers",
                                "description": "Configuración del puente de comunicación código-BD."
                            },
                            {
                                "phase": "Aplicación",
                                "activity": "Reto de Seguridad (Login)",
                                "description": "Desarrollo de módulo de inicio de sesión validando contra tabla real."
                            }
                        ],
                        "evidence": "Código fuente con la clase de conexión funcional y reporte de ejecución exitosa."
                    },
                    {
                        "id": "RA-04",
                        "description": "Ejecutar operaciones de manipulación de datos (CRUD) desde la interfaz de usuario.",
                        "saberes": [
                            "Sentencias SQL (Select, Insert, Update, Delete)",
                            "Manejo de resultados (ResultSets)",
                            "Inyección SQL (Prevención)"
                        ],
                        "indicators": [
                            "Desarrolla módulos de persistencia que permiten la gestión completa de información en bases de datos desde la aplicación."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Conexión",
                                "activity": "Roleplay 'El Administrador de Datos'",
                                "description": "Debate sobre integridad de datos transaccionales."
                            },
                            {
                                "phase": "Clarificación",
                                "activity": "Demostración técnica y andamiaje",
                                "description": "Modelado de creación de métodos para insertar y consultar registros."
                            },
                            {
                                "phase": "Producción",
                                "activity": "Co-creación dirigida (Gestor de Inventarios)",
                                "description": "Construcción de gestor de inventarios pequeño con CRUD completo."
                            }
                        ],
                        "evidence": "Aplicación funcional con CRUD completo y validación de persistencia de datos."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Persistencia de Datos)",
                        "criteria": [
                            {
                                "name": "Gestión de Conexiones",
                                "levels": {
                                    "inicial": "No logra establecer conexión o deja credenciales expuestas.",
                                    "intermedio": "Conecta pero no cierra conexiones (saturación).",
                                    "avanzado": "Conexión segura, variables de entorno y ciclo de vida eficiente."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea Corta / Portafolio (Seguridad de Datos)",
                        "challenge": "Identificar vulnerabilidad SQL Injection y solucionar con Prepared Statements.",
                        "evaluation_focus": "Precisión técnica y enfoque preventivo."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Trimestral (STEAM): Bases de Datos para el Desarrollo Sostenible",
                        "description": "App para registro y análisis de consumo de agua del CTP con reportes mensuales."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MOD-04-U02"
            },
            "logicRules": {
                "sequence": ["RA-03", "RA-04"],
                "prerequisites": ["Basic Programming Logic"],
                "steam_focus": "Data Engineering & Security"
            },
            "classificationTags": ["Backend", "SQL", "Database", "Security"]
        }

    def generate_unit_3_data(self):
        """Generates payload for Unit 3: Frontend Web Development"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 3: Desarrollo de Aplicaciones Web Frontend",
                "learning_outcomes": [
                    {
                        "id": "RA-05",
                        "description": "Estructurar contenido web semántico utilizando estándares modernos de maquetación.",
                        "saberes": [
                            "Etiquetas semánticas HTML5",
                            "Formularios y validación",
                            "Multimedia",
                            "Atributos de accesibilidad (WAI-ARIA)"
                        ],
                        "indicators": [
                            "Crea estructuras web semánticas y accesibles siguiendo los estándares internacionales."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Inspección de código (Arqueología Web)",
                                "description": "Análisis de webs antiguas vs modernas."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Navegación asistida (A11y)",
                                "description": "Investigación con lectores de pantalla para entender la accesibilidad."
                            },
                            {
                                "phase": "Desarrollo",
                                "activity": "Maquetación guiada",
                                "description": "Construcción de esqueleto de sitio corporativo validado por W3C."
                            },
                            {
                                "phase": "Aplicación",
                                "activity": "Reto Ingenieria/Arte",
                                "description": "Desarrollo de formulario de contacto complejo con validaciones nativas."
                            }
                        ],
                        "evidence": "Código fuente HTML5 validado y prototipo estructural."
                    },
                    {
                        "id": "RA-06",
                        "description": "Aplicar estilos avanzados y diseño responsivo para optimizar la experiencia de usuario.",
                        "saberes": [
                            "CSS Grid & Flexbox",
                            "Box Model",
                            "Media Queries (Mobile-First)",
                            "Frameworks (Tailwind)"
                        ],
                        "indicators": [
                            "Implementa diseños web responsivos y atractivos que se adaptan a diferentes resoluciones."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Conexión",
                                "activity": "Debate Estética vs Funcionalidad",
                                "description": "Análisis de interfaces de clase mundial."
                            },
                            {
                                "phase": "Clarificación",
                                "activity": "Demostración técnica (Flex/Grid)",
                                "description": "Modelado de layouts adaptables paso a paso."
                            },
                            {
                                "phase": "Producción",
                                "activity": "Práctica supervisada (Responsive)",
                                "description": "Transformación de maqueta estática a sitio Mobile-First."
                            }
                        ],
                        "evidence": "Archivos CSS estructurados y despliegue adaptable."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Desarrollo Frontend)",
                        "criteria": [
                            {
                                "name": "Maquetación Responsiva",
                                "levels": {
                                    "inicial": "Solo funciona en una resolución.",
                                    "intermedio": "Usa Media Queries pero rompe en resoluciones intermedias.",
                                    "avanzado": "Interfaz fluida Mobile-First, UX óptima en todo dispositivo."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Task",
                        "title": "Tarea Corta / Portafolio (Reto de Accesibilidad)",
                        "challenge": "Auditar sitio existente y proponer 5 mejoras semánticas inmediatas.",
                        "evaluation_focus": "Criterio técnico e inclusión."
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto de Cierre (STEAM): Plataforma Web para el Emprendimiento Local",
                        "description": "Co-creación de sitio web para una PYME real de la comunidad."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MOD-04-U03"
            },
            "logicRules": {
                "sequence": ["RA-05", "RA-06"],
                "prerequisites": ["None"],
                "steam_focus": "Design & Engineering"
            },
            "classificationTags": ["Frontend", "HTML5", "CSS3", "Design", "Accessibility"]
        }

    def generate_unit_4_data(self):
        """Generates payload for Unit 4: Interaction & Logic"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 4: Interactividad y Lógica de Cliente con JavaScript",
                "learning_outcomes": [
                    {
                        "id": "RA-07",
                        "description": "Manipular el Modelo de Objetos del Documento (DOM) para crear interfaces dinámicas.",
                        "saberes": [
                            "Nodos del DOM y Selectores",
                            "Eventos (Click, Submit, Input)",
                            "Manipulación de clases y estilos"
                        ],
                        "indicators": [
                            "Modifica dinámicamente la estructura y apariencia de una página web en respuesta a acciones del usuario."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Ingeniería inversa (Like button)",
                                "description": "Análisis de cambio de estado sin recarga en redes sociales."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Inspección de objetos",
                                "description": "Investigación de jerarquía de nodos en consola del navegador."
                            },
                            {
                                "phase": "Desarrollo",
                                "activity": "Live Coding (Dark Mode)",
                                "description": "Construcción de sistema de modo oscuro y menús desplegables."
                            }
                        ],
                        "evidence": "Script funcional de manipulación del DOM y prototipo interactivo."
                    },
                    {
                        "id": "RA-08",
                        "description": "Implementar lógica de programación asíncrona para el consumo de servicios externos.",
                        "saberes": [
                            "JSON & Fetch API",
                            "Promesas y Async/Await",
                            "Manejo de errores"
                        ],
                        "indicators": [
                            "Consume y procesa datos de servicios externos (APIs) de forma asíncrona."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Conexión",
                                "activity": "Análisis de flujo externo",
                                "description": "Debate sobre obtención de datos (clima/divisas) en apps reales."
                            },
                            {
                                "phase": "Clarificación",
                                "activity": "Andamiaje y depuración",
                                "description": "Modelado de petición a API pública y renderizado en pantalla."
                            },
                            {
                                "phase": "Producción",
                                "activity": "Reto Tecnológico (Buscador)",
                                "description": "Desarrollo de buscador de películas/personajes consumiendo API real."
                            }
                        ],
                        "evidence": "App web funcional que consume datos y gestiona estados."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Lógica JavaScript)",
                        "criteria": [
                            {
                                "name": "Gestión de Eventos",
                                "levels": {
                                    "inicial": "No vincula eventos correctamente.",
                                    "intermedio": "Vincula pero con errores de lógica o validación.",
                                    "avanzado": "Gestión robusta, validaciones completas y respuesta inmediata."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Tracking",
                        "title": "Registro de Avance Individual",
                        "indicators": [
                            "Diferencia var/let/const.",
                            "Estructura JSON complejos.",
                            "Resuelve conflictos de asincronía."
                        ]
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Final 11mo (Integración): Dashboard Smart-City",
                        "description": "Integración de HTML/CSS/JS/BD para panel de datos en tiempo real (consumo, tráfico, clima)."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MOD-04-U04"
            },
            "logicRules": {
                "sequence": ["RA-07", "RA-08"],
                "prerequisites": ["HTML/CSS", "Logic"],
                "steam_focus": "Development & Logic"
            },
            "classificationTags": ["Frontend", "JavaScript", "Logic", "Async"]
        }

    def generate_unit_5_data(self):
        """Generates payload for Unit 5: Mobile Application Development"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 5: Introducción al Desarrollo de Aplicaciones Móviles",
                "learning_outcomes": [
                    {
                        "id": "RA-09",
                        "description": "Diseñar interfaces de usuario para dispositivos móviles (UI/UX) considerando las limitaciones de pantalla y hardware.",
                        "saberes": [
                            "Principios de diseño móvil (Material Design / Human Interface)",
                            "Componentes nativos y navegación",
                            "Layouts responsivos",
                            "Prototipado (Figma/Adobe XD)"
                        ],
                        "indicators": [
                            "Diseña interfaces móviles intuitivas y funcionales aplicando estándares de experiencia de usuario y diseño visual."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Focalización",
                                "activity": "Auditoría de Usabilidad",
                                "description": "Análisis de patrones de éxito en apps populares."
                            },
                            {
                                "phase": "Exploración",
                                "activity": "Estaciones de Comparación Visual",
                                "description": "Investigación de guías Android (Material) vs iOS (HIG)."
                            },
                            {
                                "phase": "Desarrollo",
                                "activity": "Diseño Colaborativo (Wireframing)",
                                "description": "Creación de wireframe de alta fidelidad con crítica constructiva."
                            }
                        ],
                        "evidence": "Prototipo interactivo de la aplicación móvil (UI/UX)."
                    },
                    {
                        "id": "RA-10",
                        "description": "Construir aplicaciones móviles funcionales que interactúen con los sensores y recursos del dispositivo.",
                        "saberes": [
                            "Entornos de desarrollo móvil",
                            "Ciclo de vida de una App",
                            "Uso de sensores (GPS, Cámara, Acelerómetro)",
                            "Publicación básica"
                        ],
                        "indicators": [
                            "Desarrolla aplicaciones móviles funcionales que aprovechan los recursos de hardware del dispositivo para resolver problemas."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Conexión",
                                "activity": "Recolección de datos ambientales",
                                "description": "Exploración del potencial de sensores móviles en el campus."
                            },
                            {
                                "phase": "Clarificación",
                                "activity": "Live Coding (Permisos y Sensores)",
                                "description": "Modelado de acceso a ubicación o cámara y manejo de permisos."
                            },
                            {
                                "phase": "Producción",
                                "activity": "ABP: App de Registro",
                                "description": "Desarrollo de app funcional para necesidad específica (ej. QR)."
                            }
                        ],
                        "evidence": "Código fuente y APK funcional de la aplicación."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "Rubric",
                        "title": "Rúbrica para Trabajo Cotidiano (Desarrollo Móvil)",
                        "criteria": [
                            {
                                "name": "Implementación de Funciones",
                                "levels": {
                                    "inicial": "Cierres inesperados al acceder a hardware.",
                                    "intermedio": "Funciona pero navegación confusa o diseño rígido.",
                                    "avanzado": "App robusta, navegación fluida y uso eficiente de sensores."
                                }
                            }
                        ]
                    },
                    {
                        "type": "Tracking",
                        "title": "Registro de Avance Individual (Cierre 11mo)",
                        "indicators": [
                            "Integra servicios backend (APIs).",
                            "Gestiona ciclo de vida (Batería/Memoria).",
                            "Aplica seguridad en permisos."
                        ]
                    },
                    {
                        "type": "Project",
                        "title": "Proyecto Final de Especialidad: App de Gestión Comunal 2026",
                        "description": "App móvil conectada a BD de 10° año, cerrando el ciclo de la especialidad."
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MOD-04-U05"
            },
            "logicRules": {
                "sequence": ["RA-09", "RA-10"],
                "prerequisites": ["Frontend", "Logic", "Backend"],
                "steam_focus": "Mobile Engineering"
            },
            "classificationTags": ["Mobile", "Android", "iOS", "Sensors", "UI/UX"]
        }

    def run(self):
        units = [
            self.generate_unit_2_data(),
            self.generate_unit_3_data(),
            self.generate_unit_4_data(),
            self.generate_unit_5_data()
        ]

        logger.info(f"🚀 Starting Injection for {len(units)} Units...")
        
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
        seed_file = os.path.join(seed_dir, "MOD4_FULL_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Module 4 Injection/Preservation Complete.")

if __name__ == "__main__":
    injector = Module4Injector()
    injector.run()
