/**
 * @fileoverview MEP Official Educational Data Structure
 * Contains the hierarchical curriculum data for all educational modalities in Costa Rica.
 * Structured to support dynamic loading in the Generator.
 * 
 * @module lib/mep-data
 * @author MEP Pedagogical Advisor (Simulated)
 * @version 2.1.0 - Technical Education Refinement
 */

/**
 * @typedef {Object} LearningItem
 * @property {string} id - Unique identifier for the learning outcome.
 * @property {string} aprendizaje - The core learning outcome (Aprendizaje Esperado).
 * @property {string[]} saberes - List of essential knowledge topics (Saberes Esenciales).
 * @property {string[]} indicadores - List of performance indicators.
 * @property {string[]} sugerencias - Pedagogical suggestions for mediation.
 */

export const MEP_DATA = {
    // -------------------------------------------------------------------------
    // 1. EDUCACIÓN PREESCOLAR
    // Niveles: Ciclo Materno Infantil, Ciclo de Transición
    // -------------------------------------------------------------------------
    "Educación Preescolar": {
        "Ciclo Materno Infantil (0-4 años)": {
            "I Periodo": {
                "Conocimiento de sí mismo": [
                    {
                        id: "pre_mi_1",
                        aprendizaje: "Explora cada parte de su cuerpo y entorno mediante habilidades sensoriomotrices.",
                        saberes: ["Mi cuerpo", "Mis sentidos", "Mis movimientos"],
                        indicadores: ["Reacciona ante estímulos visuales y auditivos.", "Explora su cuerpo con curiosidad."],
                        sugerencias: ["Juegos de espejos.", "Masajes con diferentes texturas."]
                    }
                ],
                "Interacción Social": [],
                "Comunicación": []
            }
        },
        "Ciclo de Transición (5-6 años)": {
            "I Periodo": {
                "Identidad y Autonomía": [
                    {
                        id: "pre_trans_1",
                        aprendizaje: "Construcción de la identidad personal y autonomía.",
                        saberes: ["Autoestima", "Emociones", "Cuidado personal"],
                        indicadores: ["Expresa sus gustos y disgustos.", "Practica hábitos de higiene personal."],
                        sugerencias: ["Elaborar un 'Libro de Mí Mismo'.", "Role-play de rutinas diarias."]
                    }
                ],
                "Convivencia": [],
                "Descubrimiento del Medio": []
            }
        }
    },

    // -------------------------------------------------------------------------
    // 2. EDUCACIÓN PRIMARIA
    // Niveles: 1°, 2°, 3°, 4°, 5°, 6°
    // Materias Base: Español, Matemáticas, Ciencias, Estudios Sociales, Inglés
    // -------------------------------------------------------------------------
    "Educación Primaria (I y II Ciclos)": {
        "1": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "2": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "3": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "4": {
            "I Periodo": {
                "Estudios Sociales": [
                    {
                        id: "soc_4_1",
                        aprendizaje: "Reconocer las sociedades antiguas de Costa Rica (Cacicazgos).",
                        saberes: ["Modo de vida", "Organización social", "Legado cultural", "Cosmovisión"],
                        indicadores: [
                            "Describe la organización social de los cacicazgos.",
                            "Identifica el legado artístico (esferas, oro, jade).",
                            "Valora el aporte indígena a la identidad actual."
                        ],
                        sugerencias: [
                            "Visita virtual al Museo del Jade.",
                            "Creación de una maqueta de un asentamiento cacical.",
                            "Investigación etnográfica sobre alimentos de origen indígena."
                        ]
                    }
                ],
                "Español": [], "Matemáticas": [], "Ciencias": [], "Inglés": []
            }
        },
        "5": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "6": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } }
    },

    // -------------------------------------------------------------------------
    // 3. SECUNDARIA ACADÉMICA
    // Niveles: 7°, 8°, 9° (III Ciclo), 10°, 11° (Educ. Diversificada)
    // -------------------------------------------------------------------------
    "Secundaria Académica (III Ciclo y Div.)": {
        "7": {
            "I Periodo": {
                "Español": [
                    {
                        id: "esp_7_1",
                        aprendizaje: "Analizar textos literarios del género cuento.",
                        saberes: ["Género literario: Cuento", "Tipos de narrador", "Secuencia narrativa", "Código apreciativo"],
                        indicadores: [
                            "Identifica las características del género cuento.",
                            "Reconoce los tipos de narrador (omnisciente, protagonista, testigo).",
                            "Infiere el código apreciativo del texto."
                        ],
                        sugerencias: [
                            "Lectura de cuentos de 'Cuentos de Angustias y Paisajes'.",
                            "Debate sobre la temática del cuento.",
                            "Producción textual: Reescribir el final."
                        ]
                    }
                ],
                "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": []
            }
        },
        "8": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "9": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [], "Estudios Sociales": [], "Inglés": [] } },
        "10": {
            "I Periodo": {
                "Matemáticas": [
                    {
                        id: "mat_10_1",
                        aprendizaje: "Identificar y representar circunferencias en un sistema de coordenadas.",
                        saberes: ["Circunferencia", "Centro", "Radio", "Ecuación algebraica"],
                        indicadores: [
                            "Reconoce la ecuación de la circunferencia algebraicamente.",
                            "Representa gráficamente la circunferencia dado su centro y radio."
                        ],
                        sugerencias: [
                            "Uso de GeoGebra para visualizar parámetros.",
                            "Problemas contextualizados (alcance de señales)."
                        ]
                    }
                ],
                "Español": [], "Biología": [], "Física": [], "Química": [], "Estudios Sociales": [], "Inglés": []
            }
        },
        "11": { "I Periodo": { "Español": [], "Matemáticas": [], "Biología": [], "Física": [], "Química": [], "Filosofía": [] } }
    },

    // -------------------------------------------------------------------------
    // 4. SECUNDARIA TÉCNICA PROFESIONAL
    // Niveles: Décimo, Undécimo, Duodécimo
    // Especialidades: Desarrollo Web, Contabilidad, Ejecutivo, etc.
    // -------------------------------------------------------------------------
    "Secundaria Técnica Profesional": {
        "Décimo (10°)": {
            "I Periodo": {
                "Desarrollo Web": {
                    "Tecnologías de Información": [
                        {
                            id: "dw_10_ti_u1_1",
                            unit: "Unidad 1: Fundamentos de TI",
                            aprendizaje: "Reconocer los componentes básicos de un sistema de cómputo.",
                            saberes: ["Conceptos de TI", "Hardware y software", "Sistemas operativos", "Uso responsable"],
                            indicadores: ["Identifica correctamente los componentes de hardware y software.", "Describe la función de cada componente.", "Utiliza el equipo respetando normas básicas."],
                            sugerencias: ["Desmontaje guiado de PC.", "Elaboración de inventario de hardware."]
                        },
                        {
                            id: "dw_10_ti_u1_2",
                            unit: "Unidad 1: Fundamentos de TI",
                            aprendizaje: "Identificar el uso de las TI en diferentes contextos educativos y laborales.",
                            saberes: ["Contextos de uso", "Transformación digital"],
                            indicadores: ["Describe aplicaciones de TI en la industria.", "Reconoce el impacto de las TI en la educación."],
                            sugerencias: ["Investigación sobre Industria 4.0."]
                        },
                        {
                            id: "dw_10_ti_u2_1",
                            unit: "Unidad 2: Seguridad e Higiene",
                            aprendizaje: "Aplicar normas de seguridad en el laboratorio de informática.",
                            saberes: ["Riesgos eléctricos", "Ergonomía", "Normas de laboratorio", "Prevención de accidentes"],
                            indicadores: ["Aplica normas de seguridad en el uso del equipo.", "Demuestra posturas correctas de trabajo.", "Previene riesgos en el entorno de cómputo."],
                            sugerencias: ["Simulacro de evacuación.", "Taller de ergonomía frente al PC."]
                        },
                        {
                            id: "dw_10_ti_u3_1",
                            unit: "Unidad 3: Electricidad Básica",
                            aprendizaje: "Reconocer principios básicos de electricidad aplicados al equipo de cómputo.",
                            saberes: ["Corriente, voltaje, resistencia", "Componentes electrónicos", "Medidas de seguridad"],
                            indicadores: ["Identifica conceptos de voltaje, corriente y resistencia.", "Reconoce componentes electrónicos básicos.", "Aplica medidas de seguridad eléctrica."],
                            sugerencias: ["Medición de voltaje en fuentes de poder.", "Identificación de componentes en placa madre."]
                        }
                    ],
                    "Diseño de Software": [
                        {
                            id: "dw_10_ds_u1_1",
                            unit: "Unidad 1: Fundamentos del Diseño",
                            aprendizaje: "Comprender el proceso general de desarrollo de software.",
                            saberes: ["Ciclo de vida del software", "Concepto de sistema", "Tipos de software"],
                            indicadores: ["Describe las etapas del ciclo de vida del software.", "Identifica tipos de software según su uso.", "Explica la importancia del diseño en un proyecto."],
                            sugerencias: ["Análisis de casos de fracaso en software.", "Línea de tiempo del ciclo de vida."]
                        },
                        {
                            id: "dw_10_ds_u2_1",
                            unit: "Unidad 2: Modelado de Sistemas",
                            aprendizaje: "Representar sistemas mediante diagramas básicos.",
                            saberes: ["Diagramas de flujo", "Casos de uso", "UML básico"],
                            indicadores: ["Elabora diagramas de flujo correctamente.", "Representa procesos sencillos mediante diagramas.", "Interpreta esquemas básicos de sistemas."],
                            sugerencias: ["Diagramar el proceso de inscripción del colegio.", "Uso de herramientas como Draw.io."]
                        },
                        {
                            id: "dw_10_ds_u3_1",
                            unit: "Unidad 3: Documentación Técnica",
                            aprendizaje: "Elaborar documentación básica de proyectos.",
                            saberes: ["Manuales", "Reportes", "Especificaciones técnicas"],
                            indicadores: ["Redacta documentos técnicos sencillos.", "Organiza información técnica de forma clara.", "Presenta reportes con formato adecuado."],
                            sugerencias: ["Redacción de un manual de usuario para una app ficticia."]
                        }
                    ],
                    "Programación Web": [
                        {
                            id: "dw_10_pw_u1_1",
                            unit: "Unidad 1: Lógica de Programación",
                            aprendizaje: "Aplicar estructuras lógicas en la resolución de problemas.",
                            saberes: ["Algoritmos", "Pseudocódigo", "Diagramas de flujo", "Estructuras lógicas"],
                            indicadores: ["Construye algoritmos sencillos.", "Utiliza estructuras secuenciales, condicionales y repetitivas.", "Representa soluciones mediante pseudocódigo."],
                            sugerencias: ["Resolver problemas lógica con PSeInt.", "Juegos de lógica (Lightbot)."]
                        },
                        {
                            id: "dw_10_pw_u2_1",
                            unit: "Unidad 2: HTML y Estructura",
                            aprendizaje: "Construir páginas web utilizando HTML.",
                            saberes: ["Estructura HTML", "Etiquetas básicas", "Enlaces, listas, imágenes"],
                            indicadores: ["Utiliza correctamente etiquetas básicas de HTML.", "Estructura páginas web funcionales.", "Integra textos, imágenes y enlaces."],
                            sugerencias: ["Crear su primera página 'Hola Mundo'.", "Portafolio personal básico."]
                        },
                        {
                            id: "dw_10_pw_u3_1",
                            unit: "Unidad 3: Introducción a CSS",
                            aprendizaje: "Aplicar estilos básicos a páginas web.",
                            saberes: ["Selectores", "Colores", "Tipografías", "Diseño básico"],
                            indicadores: ["Utiliza selectores básicos.", "Aplica colores y tipografías.", "Mejora la presentación visual de un sitio."],
                            sugerencias: ["Estilizar el portafolio personal.", "Clonar estilos de un sitio simple."]
                        }
                    ]
                }
            }
        },
        "Undécimo (11°)": {
            "I Periodo": {
                "Desarrollo Web": {
                    "Programación Web Avanzada": [
                        {
                            id: "dw_11_pw_u1",
                            unit: "Unidad 1: JavaScript del Lado del Cliente",
                            aprendizaje: "Programar interactividad en sitios web usando JavaScript.",
                            saberes: ["Variables y Tipos", "Funciones", "DOM Manipulation", "Eventos"],
                            indicadores: ["Declara y utiliza variables correctamente.", "Manipula el DOM para cambiar contenido dinámicamente.", "Gestiona eventos de usuario."],
                            sugerencias: ["Crear una calculadora básica.", "Validación de formularios."]
                        }
                    ],
                    "Bases de Datos": [
                        {
                            id: "dw_11_bd_u1",
                            unit: "Unidad 1: Fundamentos de Bases de Datos",
                            aprendizaje: "Diseñar bases de datos relacionales normalizadas.",
                            saberes: ["Modelo Entidad-Relación", "Normalización", "SQL Básico", "Motores de BD"],
                            indicadores: ["Diseña diagramas E-R correctos.", "Aplica reglas de normalización.", "Escribe consultas SQL básicas (SELECT, INSERT)."],
                            sugerencias: ["Diseñar la BD de una biblioteca.", "Consultas en MySQL Workbench."]
                        }
                    ],
                    "Diseño de Software": [
                        {
                            id: "dw_11_ds_u1",
                            unit: "Unidad 1: Metodologías Ágiles",
                            aprendizaje: "Aplicar metodologías ágiles en el desarrollo de software.",
                            saberes: ["Scrum", "Kanban", "Roles en equipos ágiles", "Historias de Usuario"],
                            indicadores: ["Participa en simulaciones de Scrum.", "Redacta historias de usuario claras.", "Utiliza tableros Kanban."],
                            sugerencias: ["Proyecto grupal con Trello.", "Simulación de Daily Standup."]
                        }
                    ]
                }
            }
        },
        "Duodécimo (12°)": {
            "I Periodo": {
                "Desarrollo Web": {
                    "Implementación de Proyectos": [
                        {
                            id: "dw_12_ip_u1",
                            unit: "Unidad 1: Planificación del Proyecto",
                            aprendizaje: "Planificar la ejecución de un proyecto de software.",
                            saberes: ["Cronogramas", "Recursos", "Alcance", "Presupuesto"],
                            indicadores: ["Define el alcance del proyecto.", "Elabora cronogramas realistas."],
                            sugerencias: ["Definición de propuesta de proyecto final."]
                        },
                        {
                            id: "dw_12_ip_u2",
                            unit: "Unidad 2: Desarrollo y Ejecución",
                            aprendizaje: "Desarrollar el producto de software según especificaciones.",
                            saberes: ["Codificación", "Control de versiones (Git)", "Integración"],
                            indicadores: ["Escribe código limpio y documentado.", "Mantiene un repositorio de código actualizado."],
                            sugerencias: ["Desarrollo iterativo del proyecto."]
                        },
                        {
                            id: "dw_12_ip_u3",
                            unit: "Unidad 3: Pruebas y Despliegue",
                            aprendizaje: "Validar y desplegar la solución de software.",
                            saberes: ["Tipos de pruebas", "Hosting / Despliegue", "Documentación final"],
                            indicadores: ["Ejecuta pruebas funcionales.", "Despliega la aplicación en un servidor.", "Entrega manuales técnicos y de usuario."],
                            sugerencias: ["Demo day.", "Publicación en Vercel/Netlify."]
                        }
                    ]
                }
            }
        }
    },

    // -------------------------------------------------------------------------
    // 5. SECUNDARIA NOCTURNA
    // Niveles: Nivel 1, Nivel 2, Nivel 3
    // -------------------------------------------------------------------------
    "Secundaria Nocturna": {
        "Nivel 1": { "I Periodo": { "Español": [], "Matemáticas": [], "Estudios Sociales": [], "Ciencias": [] } },
        "Nivel 2": { "I Periodo": { "Español": [], "Matemáticas": [], "Biología": [], "Química": [] } },
        "Nivel 3": { "I Periodo": { "Español": [], "Matemáticas": [], "Biología": [], "Física": [] } }
    },

    // -------------------------------------------------------------------------
    // 6. IPEC (Institutos Profesionales de Educación Comunitaria)
    // -------------------------------------------------------------------------
    "IPEC": {
        "Cursos Libres": { "I Periodo": { "Manipulación de Alimentos": [], "Inglés Básico": [] } },
        "Técnico Medio": { "I Periodo": { "Secretariado": [], "Contabilidad": [] } }
    },

    // -------------------------------------------------------------------------
    // 7. CINDEA (Centros Integrados de Educación de Adultos)
    // Niveles: I Nivel (I y II Ciclo), II Nivel (III Ciclo), III Nivel (Diversificada)
    // -------------------------------------------------------------------------
    "CINDEA": {
        "I Nivel (Primaria)": { "I Periodo": { "Formación Básica": [] } },
        "II Nivel (7°-9°)": { "I Periodo": { "Español": [], "Matemáticas": [], "Ciencias": [] } },
        "III Nivel (10°-11°)": { "I Periodo": { "Español": [], "Matemáticas": [], "Biología": [] } }
    }
};
