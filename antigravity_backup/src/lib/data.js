// Datos oficiales del Programa de Estudio MEP - Desarrollo Web
// Aprobado por el Consejo Superior de Educación, sesión 36-2020, acuerdo 02-36-2020 del 02/07/2020

export const ESPECIALIDAD = {
  nombre: "Desarrollo Web",
  modalidad: "Comercial y Servicios",
  campoDetallado: "0613-01-01-4 Desarrollo Web",
  niveles: ["Décimo", "Undécimo", "Duodécimo"],
}

export const COMPETENCIAS_DESARROLLO_HUMANO = [
  "Autoaprendizaje",
  "Compromiso ético",
  "Discernimiento y responsabilidad",
  "Innovación y creatividad",
  "Capacidad de negociación",
  "Orientación de servicio al cliente",
  "Comunicación oral y escrita",
  "Solución de problemas",
  "Liderazgo democrático",
  "Trabajo en equipo",
]

export const EJES_POLITICA_EDUCATIVA = [
  "La ciudadanía digital con equidad social",
  "Educación para el desarrollo sostenible",
  "Fortalecimiento de una ciudadanía planetaria con identidad",
]

// ==================== DÉCIMO ====================
export const DECIMO = {
  nivel: "Décimo",
  subareas: [
    // SUBÁREA 1: TECNOLOGÍAS DE LA INFORMACIÓN (TI)
    {
      id: "ti_10",
      nombre: "Tecnologías de la Información (TI)",
      descripcion:
        "Utilizar herramientas y tecnologías digitales mediante la aplicación de software de código abierto y licenciado, la automatización y el análisis de datos y su transmisión a través del internet; así como la evaluación de alternativas para la protección e integridad de los datos mediante el uso de tecnologías.",
      horasTotal: 160,
      unidades: [
        {
          id: "ti_10_u1",
          nombre: "Herramientas para la producción de documentos",
          horas: 68,
          competenciaDesarrolloHumano: "Autoaprendizaje",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ti_10_u1_ra1",
              descripcion: "Aplicar las funciones básicas de procesador de textos en la elaboración de documentos.",
              saberesEsenciales: [
                "Generalidades: Teclado básico, Funciones disponibles, Ventanas de trabajo, Barras de menús y herramientas, Ayuda",
                "Trabajo con documentos: Creación, Edición y modificación, Guardar, Impresión",
                "Formato de documentos: Márgenes, Tabulaciones, Párrafos, Páginas",
                "Manejo de bloques: Copiar, Mover, Borrar",
                "Tablas y gráficos en un documento",
              ],
              indicadoresLogro: [
                "Identifica las funciones disponibles para la creación, apertura, edición e impresión de documentos",
                "Distingue los procedimientos para el manejo, construcción de tablas y gráficos en procesador de textos",
                "Elabora documentos aplicando las funciones del procesador de texto",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Creación de documentos técnicos",
                  actividadesDocente:
                    "Demuestra funciones del procesador de textos. Presenta ejemplos de documentos técnicos. Supervisa práctica. Evalúa productos finales.",
                  actividadesEstudiante:
                    "Explora el entorno del procesador. Crea documento con formato profesional. Inserta tablas y gráficos. Aplica estilos y formato.",
                  recursos: [
                    "Computadora",
                    "Procesador de textos (LibreOffice Writer/MS Word)",
                    "Guía de práctica",
                    "Plantillas",
                  ],
                  tiempoMinutos: 240,
                },
                {
                  id: "ti_10_u1_ra1_a2",
                  perfil: "lúdica",
                  nombre: "Competencia de formateo express",
                  actividadesDocente:
                    "Organiza competencia por equipos. Presenta documento sin formato. Cronometra y evalúa resultados. Premia mejores trabajos.",
                  actividadesEstudiante:
                    "Compite en equipos para formatear documento. Aplica estilos rápidamente. Colabora con compañeros. Presenta resultado final.",
                  recursos: ["Computadoras", "Documento base sin formato", "Cronómetro", "Rúbrica de evaluación"],
                  tiempoMinutos: 120,
                },
                {
                  id: "ti_10_u1_ra1_a3",
                  perfil: "dua",
                  nombre: "Documentos con apoyo multimedia",
                  actividadesDocente:
                    "Proporciona videos tutoriales con subtítulos. Ofrece guías paso a paso ilustradas. Permite ritmo individual. Brinda retroalimentación personalizada.",
                  actividadesEstudiante:
                    "Sigue tutoriales a su ritmo. Practica con ejercicios graduados. Solicita apoyo cuando necesita. Documenta su progreso.",
                  recursos: [
                    "Videos tutoriales subtitulados",
                    "Guías ilustradas",
                    "Ejercicios adaptados",
                    "Lista de cotejo personal",
                  ],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ti_10_u1_ra2",
              descripcion:
                "Utilizar las herramientas que presenta la hoja electrónica para la elaboración de documentos.",
              saberesEsenciales: [
                "Características de la hoja electrónica: Generalidades, Funciones disponibles, Ventana de trabajo, Barras de menús y herramientas",
                "Creación de una hoja de cálculo: Definición, Partes, Ingreso y modificación de datos, Trabajo con celdas, Fórmulas",
                "Recuperación y edición: Rangos, Eliminar, Mover, Copiar, Seleccionar",
                "Utilización de fórmulas, Formatos, Creación de gráficos, Tablas dinámicas",
                "Impresión de una hoja cálculo",
              ],
              indicadoresLogro: [
                "Identifica las operaciones básicas que se ejecutan en la hoja de cálculo",
                "Elabora hojas de cálculo utilizando las herramientas que contiene el software",
                "Aplica las funciones y herramientas disponibles en la creación de documentos electrónicos",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Control de inventario empresarial",
                  actividadesDocente:
                    "Presenta caso de empresa ficticia. Enseña fórmulas y funciones. Supervisa desarrollo. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Diseña hoja de inventario. Aplica fórmulas SUMA, PROMEDIO, SI. Crea gráficos de análisis. Genera reportes.",
                  recursos: ["Computadora", "Hoja de cálculo", "Datos de inventario", "Rúbrica"],
                  tiempoMinutos: 300,
                },
                {
                  id: "ti_10_u1_ra2_a2",
                  perfil: "lúdica",
                  nombre: "Excel Olympics",
                  actividadesDocente:
                    "Organiza olimpiadas de Excel. Presenta retos por niveles. Evalúa precisión y velocidad. Premia ganadores.",
                  actividadesEstudiante:
                    "Resuelve retos de fórmulas. Compite por mejor tiempo. Colabora en pruebas por equipos. Celebra logros.",
                  recursos: ["Computadoras", "Retos graduados", "Tabla de puntuación", "Premios"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u1_ra3",
              descripcion:
                "Generar presentaciones con los elementos básicos del editor, para la presentación de documentos de forma dinámica.",
              saberesEsenciales: [
                "Creación de una presentación nueva, Uso de asistentes",
                "Elementos de la diapositiva: Características y propiedades, Combinaciones de colores",
                "Ajuste de la diapositiva, Impresión de diapositivas",
                "Objetos: Características, Propiedades, Inserción de objetos",
                "Efectos de transición, Ocultar diapositiva, Efectos para los dibujos y objetos",
                "Elaboración de presentaciones profesionales",
              ],
              indicadoresLogro: [
                "Describe los pasos para la creación de presentaciones",
                "Explica el funcionamiento de las herramientas disponibles en la administración y asignación de objetos para las presentaciones",
                "Utiliza las funciones disponibles para el manejo del entorno del software para la presentación de documentos en forma dinámica",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Presentación de proyecto técnico",
                  actividadesDocente:
                    "Explica principios de diseño de presentaciones. Muestra ejemplos profesionales. Guía desarrollo. Organiza exposiciones.",
                  actividadesEstudiante:
                    "Investiga tema técnico. Diseña presentación profesional. Aplica transiciones y animaciones. Expone ante la clase.",
                  recursos: ["Computadora", "Software de presentaciones", "Proyector", "Rúbrica de exposición"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_10_u1_ra4",
              descripcion: "Describir los elementos que integran el entorno web.",
              saberesEsenciales: [
                "Entorno Web: Correo electrónico, Redes sociales, Videoconferencia",
                "Realidad aumentada, Inteligencia artificial, Simuladores",
                "Industria 4.0: Concepto, Ventajas, Importancia",
              ],
              indicadoresLogro: [
                "Identifica las herramientas que proporciona el entorno web para la comunicación, mensajería instantánea y visualización de imágenes",
                "Explica la importancia del uso del entorno web como parte de las labores propias de su área de formación",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra4_a1",
                  perfil: "normal",
                  nombre: "Exploración del entorno web moderno",
                  actividadesDocente:
                    "Presenta herramientas web actuales. Demuestra uso profesional. Asigna investigación. Evalúa reportes.",
                  actividadesEstudiante:
                    "Explora herramientas web. Investiga Industria 4.0. Prueba realidad aumentada. Presenta hallazgos.",
                  recursos: ["Computadora con internet", "Aplicaciones de RA", "Guía de investigación"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u1_ra5",
              descripcion: "Aplicar herramientas colaborativas para la elaboración de documentos en la nube.",
              saberesEsenciales: [
                "Aplicaciones y servicios en la nube: Procesador de texto, Hoja electrónica, Presentaciones multimedia",
                "Herramientas para la web, Formularios en línea, Almacenamiento",
              ],
              indicadoresLogro: [
                "Reconoce las herramientas de trabajo para el procesamiento y almacenamiento de la información",
                "Interpreta la usabilidad de las herramientas de trabajo colaborativo",
                "Utiliza los componentes del software para entorno web en el procesamiento de la información",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra5_a1",
                  perfil: "normal",
                  nombre: "Proyecto colaborativo en la nube",
                  actividadesDocente:
                    "Presenta Google Workspace/Office 365. Organiza equipos. Asigna proyecto colaborativo. Monitorea participación.",
                  actividadesEstudiante:
                    "Trabaja en equipo en documento compartido. Usa comentarios y sugerencias. Crea formulario de encuesta. Presenta resultados.",
                  recursos: ["Cuentas Google/Microsoft", "Internet", "Guía de colaboración"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_10_u1_ra6",
              descripcion:
                "Implementar procesos de autoaprendizaje que propicien el uso herramientas ofimáticas mediante software de código abierto y licenciado.",
              saberesEsenciales: [
                "Autoaprendizaje: Concepto de aprendizaje, ¿Qué significa aprender?, Utilidad del autoaprendizaje",
                "Motivación para aplicar el autoaprendizaje",
                "Aplicaciones de código abierto y licenciadas",
              ],
              indicadoresLogro: [
                "Identifica las herramientas disponibles para la elaboración de documentos propios de su área de formación",
                "Diferencia el uso y aplicabilidad de las herramientas disponibles",
                "Desarrolla procesos de autoaprendizaje de manera individual y colaborativa",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra6_a1",
                  perfil: "normal",
                  nombre: "Aprendizaje autónomo de herramientas",
                  actividadesDocente:
                    "Presenta recursos de autoaprendizaje. Asigna herramienta nueva a explorar. Guía proceso de investigación. Evalúa tutorial creado.",
                  actividadesEstudiante:
                    "Selecciona herramienta nueva. Investiga de forma autónoma. Crea tutorial para compañeros. Comparte conocimiento.",
                  recursos: ["Internet", "Plataformas de cursos (YouTube, Coursera)", "Formato de tutorial"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ti_10_u1_ra7",
              descripcion:
                "Utilizar las tecnologías como recurso, profundizando y dinamizando el aprendizaje, en respuesta a situaciones de la vida cotidiana.",
              saberesEsenciales: [
                "Tecnologías digitales: Uso, Importancia en el proceso de aprendizaje, Impacto económico y social",
              ],
              indicadoresLogro: [
                "Diferencia las tecnologías digitales para la creación de documentos, tomando en consideración el proceso de aprendizaje",
                "Valora el impacto económico y social de las tecnologías digitales",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u1_ra7_a1",
                  perfil: "normal",
                  nombre: "Análisis de impacto tecnológico",
                  actividadesDocente:
                    "Presenta casos de estudio. Guía análisis crítico. Organiza debate. Evalúa argumentación.",
                  actividadesEstudiante:
                    "Investiga impacto de tecnología específica. Analiza ventajas y desventajas. Participa en debate. Redacta ensayo reflexivo.",
                  recursos: ["Artículos de análisis", "Videos documentales", "Formato de ensayo"],
                  tiempoMinutos: 180,
                },
              ],
            },
          ],
        },
        {
          id: "ti_10_u2",
          nombre: "Herramientas para la gestión y análisis de la información",
          horas: 40,
          competenciaDesarrolloHumano: "Compromiso ético",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ti_10_u2_ra1",
              descripcion: "Examinar las características de los datos, usos, tipos y su relación con bases de datos.",
              saberesEsenciales: [
                "Datos: Valor de los datos, Datos y datos masivos, Datos abiertos y privados",
                "Datos estructurados y no estructurados, Datos almacenados y en movimiento",
                "Administración de datos masivos, Evolución hacia los datos masivos",
                "Tecnologías de administración básica de datos",
                "Bases de datos: Concepto, Características, Usos y aplicaciones, Aportes al trabajo cotidiano",
                "Aspectos básicos del análisis de datos: Definición, Uso de datos masivos, Tipos de análisis de datos",
                "Ciclo de vida del análisis de datos, Fuente y preparación de los datos",
              ],
              indicadoresLogro: [
                "Identifica los tipos de datos y su relación con bases de datos",
                "Diferencia los tipos de datos mediante la manipulación y análisis de la información",
                "Distingue los usos y aplicaciones de las bases de datos y su aporte al quehacer cotidiano",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Exploración de tipos de datos",
                  actividadesDocente:
                    "Explica conceptos de datos y bases de datos. Presenta ejemplos reales. Asigna investigación. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Investiga tipos de datos. Identifica ejemplos en vida cotidiana. Clasifica datos según características. Presenta informe.",
                  recursos: ["Material didáctico", "Ejemplos de bases de datos", "Guía de investigación"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u2_ra2",
              descripcion:
                "Elaborar bases de datos mediante la ejecución de operaciones de manipulación de la información.",
              saberesEsenciales: [
                "Elementos de las Bases de Datos: Campos, Registros, Llaves, Relaciones, Tablas",
                "Formularios, Consultas e Informes",
                "Entorno: Menús, Funciones, Herramientas, Ventanas de trabajo",
                "Trabajo con: Tablas, Formularios, Consultas, Impresión",
                "Operaciones básicas: Agregar, Actualizar, Eliminar, Funciones, Gráficos",
                "Exportar e importar datos, Combinación de Tablas, registros",
                "Asistentes, Formularios o auto formularios, Búsquedas, Consultas",
              ],
              indicadoresLogro: [
                "Distingue los elementos de la base de datos",
                "Utiliza las herramientas del software para el manejo de tablas, formularios, consultas",
                "Diseña bases de datos utilizando herramientas licenciadas y de código abierto",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Base de datos de biblioteca escolar",
                  actividadesDocente:
                    "Presenta caso de biblioteca. Enseña diseño de BD. Guía creación de tablas y relaciones. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Diseña estructura de BD. Crea tablas relacionadas. Desarrolla formularios de entrada. Genera consultas e informes.",
                  recursos: ["LibreOffice Base/MS Access", "Caso de estudio", "Datos de prueba", "Rúbrica"],
                  tiempoMinutos: 360,
                },
                {
                  id: "ti_10_u2_ra2_a2",
                  perfil: "lúdica",
                  nombre: "Diseña tu tienda virtual",
                  actividadesDocente:
                    "Presenta reto de crear BD para tienda. Organiza competencia por equipos. Evalúa creatividad y funcionalidad.",
                  actividadesEstudiante:
                    "Diseña BD para tienda de su interés. Crea catálogo de productos. Simula ventas con consultas. Presenta proyecto.",
                  recursos: ["Software de BD", "Plantillas", "Imágenes de productos"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ti_10_u2_ra3",
              descripcion:
                "Aplicar herramientas de automatización para la presentación, visualización y análisis de bases de datos necesarios, en la toma de decisiones propias de su área de formación.",
              saberesEsenciales: [
                "Análisis de datos: Estadístico, Características, Estadísticas descriptivas, De correlación",
                "Aprendizaje automatizado de los datos: Predictivo, Aprendizaje automático, Regresión",
                "Evaluación del modelo, Validez y fiabilidad, Error de análisis",
                "Narración con datos: Creación de una historia de datos, El poder de la visualización",
                "Arquitectura para datos masivos e ingeniería de datos",
              ],
              indicadoresLogro: [
                "Identifica tipos de análisis de datos",
                "Compara mediante estadísticas información relevante para la toma de decisiones propia de su área de formación",
                "Aplica herramientas y metodologías disponibles para la presentación, visualización y análisis de bases de datos",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u2_ra3_a1",
                  perfil: "normal",
                  nombre: "Dashboard de análisis de datos",
                  actividadesDocente:
                    "Presenta herramientas de visualización. Enseña estadísticas descriptivas. Guía creación de dashboard. Evalúa análisis.",
                  actividadesEstudiante:
                    "Analiza conjunto de datos. Calcula estadísticas básicas. Crea gráficos de visualización. Presenta insights encontrados.",
                  recursos: ["Excel/Google Sheets", "Datos de muestra", "Guía de visualización"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_10_u2_ra4",
              descripcion:
                "Aplicar principios éticos y legales en el acceso, uso y análisis de la información obtenida a partir de grandes volúmenes de datos.",
              saberesEsenciales: [
                "Ética: Concepto",
                "Principios y valores: Respeto, Probidad, Anticorrupción, Compromiso",
                "Legislación vigente relacionada con el tratamiento de los datos",
              ],
              indicadoresLogro: [
                "Reconoce la importancia de la protección de los datos personales según normativa vigente",
                "Discute implicaciones económicas, socioculturales y éticas en el uso de la información proporcionada a partir del análisis de datos",
                "Determina las implicaciones legales del uso incorrecto de los datos según la legislación vigente",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u2_ra4_a1",
                  perfil: "normal",
                  nombre: "Análisis de casos de ética en datos",
                  actividadesDocente:
                    "Presenta casos reales de mal uso de datos. Guía discusión ética. Explica legislación. Evalúa reflexión crítica.",
                  actividadesEstudiante:
                    "Analiza casos de Cambridge Analytica, filtraciones de datos. Investiga Ley de Protección de Datos CR. Debate en grupos. Redacta código de ética personal.",
                  recursos: ["Casos de estudio", "Ley 8968 Costa Rica", "Formato de debate"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u2_ra5",
              descripcion:
                "Desarrollar capacidades para el acceso a la información de forma eficiente haciendo un uso preciso, responsable, creativo y crítico de la misma.",
              saberesEsenciales: [
                "Tecnologías de la información: Concepto, Importancia, Aplicabilidad en el quehacer del área de formación técnica",
                "Perspectivas: Académicas, Comerciales, Laborales y Éticas",
              ],
              indicadoresLogro: [
                "Describe recursos digitales disponibles para la presentación y organización de la información",
                "Discute estrategias para la búsqueda de información en medios digitales",
                "Interpreta la información que proporciona el análisis de grandes volúmenes de datos",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u2_ra5_a1",
                  perfil: "normal",
                  nombre: "Investigación digital efectiva",
                  actividadesDocente:
                    "Enseña técnicas de búsqueda avanzada. Presenta criterios de evaluación de fuentes. Asigna investigación. Evalúa proceso.",
                  actividadesEstudiante:
                    "Aplica operadores de búsqueda. Evalúa confiabilidad de fuentes. Organiza información encontrada. Presenta síntesis.",
                  recursos: ["Motores de búsqueda", "Bases de datos académicas", "Guía de evaluación de fuentes"],
                  tiempoMinutos: 180,
                },
              ],
            },
          ],
        },
        {
          id: "ti_10_u3",
          nombre: "Internet de todo y seguridad de los datos",
          horas: 52,
          competenciaDesarrolloHumano: "Discernimiento y responsabilidad",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ti_10_u3_ra1",
              descripcion:
                "Evaluar la importancia del internet en cada aspecto cotidiano de la vida y como se interconectan los objetos.",
              saberesEsenciales: [
                "Internet de todo: Internet, Transición a Internet de Todo (IdT), El valor de IdT, Conectados globalmente",
                "Pilares del IdT: Los objetos, Los datos, Las personas, Los procesos",
                "Conectar lo que no está conectado: Conexión de objetos, Configuración de objetos, Programación",
              ],
              indicadoresLogro: [
                "Explica el valor del internet de todo y cómo se da la conexión globalmente",
                "Describe los pilares del internet de todo y cómo se interrelacionan",
                "Justifica la forma de conexión y configuración de los objetos en proceso de comunicación a través del internet",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra1_a1",
                  perfil: "normal",
                  nombre: "Exploración del Internet de las Cosas",
                  actividadesDocente:
                    "Presenta concepto de IoT. Muestra dispositivos conectados. Guía investigación. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Investiga dispositivos IoT. Identifica ejemplos en el hogar. Analiza pilares del IoT. Presenta mapa conceptual.",
                  recursos: ["Videos de IoT", "Dispositivos de demostración", "Guía de investigación"],
                  tiempoMinutos: 180,
                },
                {
                  id: "ti_10_u3_ra1_a2",
                  perfil: "lúdica",
                  nombre: "Casa inteligente simulada",
                  actividadesDocente:
                    "Presenta simulador de casa inteligente. Asigna retos de automatización. Evalúa soluciones creativas.",
                  actividadesEstudiante:
                    "Diseña sistema de casa inteligente. Programa automatizaciones. Presenta solución ante la clase. Recibe retroalimentación.",
                  recursos: ["Simulador IoT", "Tinkercad/Arduino Simulator", "Guía de proyecto"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_10_u3_ra2",
              descripcion:
                "Formular propuestas de transmisión de internet de todo, unificando objetos, personas, datos y procesos.",
              saberesEsenciales: [
                "Transición a IdT: Las conexiones de IdT, Tecnología de la información (TI) y Tecnología Operativa (TO) en IdT",
                "Conexiones Máquina a Máquina (M2M), Conexiones Máquina a Persona (M2P), Conexiones de redes entre pares (P2P)",
                "Implementación de una solución de IdT, Seguridad e IdT",
                "Unificación de todo: Creación de modelos de una solución IdT, Interacciones de IdT en un modelo",
                "Creación de un prototipo para sus ideas, Recursos para la creación de prototipos",
              ],
              indicadoresLogro: [
                "Identifica las formas de transmisión de las tecnologías",
                "Describe la implementación de solución de internet de todo en el entorno de trabajo",
                "Diseña propuestas para la aplicación del internet de todo mediante prototipos propios de su área de formación técnica",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra2_a1",
                  perfil: "normal",
                  nombre: "Prototipo IoT con Arduino/ESP32",
                  actividadesDocente:
                    "Presenta plataformas de prototipado. Demuestra conexión de sensores. Guía desarrollo de proyecto. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Diseña solución IoT para problema real. Programa microcontrolador. Conecta sensores y actuadores. Presenta prototipo funcionando.",
                  recursos: [
                    "Arduino/ESP32",
                    "Sensores y actuadores",
                    "IDE de programación",
                    "Componentes electrónicos",
                  ],
                  tiempoMinutos: 480,
                },
              ],
            },
            {
              id: "ti_10_u3_ra3",
              descripcion:
                "Explicar la importancia de la protección de la información que se maneja en el ciber mundo y los tipos de ataques que pueden presentarse.",
              saberesEsenciales: [
                "La necesidad de la ciberseguridad, Datos personales, Datos de una organización",
                "Los atacantes y profesionales de la ciberseguridad",
                "Panorama actual y tendencias, Ataques, conceptos y técnicas",
                "Características y funcionamiento de un ciberataque",
                "Panorama de las ciberamenazas, Ingeniería social",
              ],
              indicadoresLogro: [
                "Describe el impacto de la violación de seguridad",
                "Determina las características y el valor de los datos personales y de la organización",
                "Explica las características y el propósito de las guerras cibernéticas, los ataques y su funcionamiento",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra3_a1",
                  perfil: "normal",
                  nombre: "Análisis de ciberataques famosos",
                  actividadesDocente:
                    "Presenta casos de ciberataques reales. Explica tipos de ataques. Guía análisis. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Investiga caso de ciberataque asignado. Analiza vector de ataque. Identifica vulnerabilidades explotadas. Presenta informe.",
                  recursos: ["Casos de estudio (WannaCry, Equifax)", "Videos documentales", "Formato de análisis"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u3_ra4",
              descripcion:
                "Evaluar alternativas para la protección de los dispositivos informáticos, la red y la organización.",
              saberesEsenciales: [
                "Protección de sus datos y su privacidad",
                "Protección de los datos, Protección de seguridad en línea",
                "Protección de la organización, Firewalls",
                "Comportamiento a seguir en la ciberseguridad",
              ],
              indicadoresLogro: [
                "Determinar procedimientos para la protección de los dispositivos y su red contra amenazas",
                "Describir los procedimientos seguros para el mantenimiento de datos",
                "Explicar los métodos de autenticación fuerte y comportamientos seguros en línea para la protección de la privacidad de la organización",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra4_a1",
                  perfil: "normal",
                  nombre: "Configuración de seguridad personal",
                  actividadesDocente:
                    "Enseña buenas prácticas de seguridad. Demuestra configuración de firewall. Guía implementación. Evalúa configuración.",
                  actividadesEstudiante:
                    "Configura autenticación de dos factores. Instala y configura firewall. Crea contraseñas seguras. Documenta configuración.",
                  recursos: ["Computadora", "Software de seguridad", "Guía de configuración", "Lista de cotejo"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "ti_10_u3_ra5",
              descripcion:
                "Distingue las características del ámbito de la ciberseguridad, sus principios y las medidas de seguridad cibernética.",
              saberesEsenciales: [
                "Ciberseguridad: Pilares de la Seguridad informática: Confidencialidad, Integridad, Disponibilidad de los datos",
                "El mundo de la Ciberseguridad: Criminales cibernéticos, Amenazas, Estados de datos",
                "Contramedidas de ciberseguridad, Marco de gestión de seguridad de Tecnologías de Información",
                "Amenazas de Ciberseguridad, Vulnerabilidades y Ataques",
                "Malware y código malicioso, Astucia, Los ataques",
              ],
              indicadoresLogro: [
                "Describe las características y principios del mundo de la ciberseguridad",
                "Compara cómo las amenazas de ciberseguridad afectan a individuos, empresas y organizaciones",
                "Diferencia los tipos de malware y código malicioso",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra5_a1",
                  perfil: "normal",
                  nombre: "Laboratorio de identificación de malware",
                  actividadesDocente:
                    "Presenta tipos de malware en ambiente controlado. Enseña herramientas de detección. Guía análisis. Evalúa identificación.",
                  actividadesEstudiante:
                    "Analiza muestras de malware en sandbox. Identifica comportamientos sospechosos. Clasifica tipos de amenazas. Documenta hallazgos.",
                  recursos: [
                    "Máquina virtual aislada",
                    "Muestras de malware (controladas)",
                    "Herramientas de análisis",
                  ],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_10_u3_ra6",
              descripcion:
                "Ilustrar los procedimientos para la protección e integridad de los datos mediante el uso de tecnologías.",
              saberesEsenciales: [
                "El arte de proteger los secretos: Criptografía, Técnicas de encriptación",
                "Controles de acceso, Integridad de los datos, Tipos de controles",
                "Firmas digitales, Certificados",
              ],
              indicadoresLogro: [
                "Describe las técnicas de control de acceso a la confidencialidad",
                "Explica las técnicas de encriptación y los tipos de controles de integridad de datos",
                "Utiliza procedimientos para la integralidad de los datos mediante la verificación de técnicas criptográficas",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_10_u3_ra6_a1",
                  perfil: "normal",
                  nombre: "Taller de criptografía práctica",
                  actividadesDocente:
                    "Explica conceptos de criptografía. Demuestra encriptación simétrica y asimétrica. Guía práctica. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Practica cifrado César y Vigenère. Usa herramientas de encriptación modernas. Genera par de llaves GPG. Intercambia mensajes cifrados.",
                  recursos: ["Herramientas de encriptación", "GPG", "Guía de criptografía", "Ejercicios prácticos"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 2: PROGRAMACIÓN PARA WEB (DÉCIMO)
    {
      id: "pw_10",
      nombre: "Programación para Web",
      descripcion:
        "Programar componentes de software en el entorno del servidor, según requerimientos técnicos del cliente. Implementando aplicaciones web en entornos internet, intranet y extranet, según normativas vigentes.",
      horasTotal: 200,
      unidades: [
        {
          id: "pw_10_u1",
          nombre: "Lenguajes de marcado",
          horas: 56,
          competenciaDesarrolloHumano: "Autoaprendizaje",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_10_u1_ra1",
              descripcion:
                "Identificar el proceso de creación de sitios web aplicando los principios de usabilidad y accesibilidad.",
              saberesEsenciales: [
                "Conceptos web: Definición, Estándares W3C, Navegadores y servidores",
                "Usabilidad: Principios, Heurísticas de Nielsen",
                "Accesibilidad: WCAG, Diseño inclusivo",
              ],
              indicadoresLogro: [
                "Reconoce los estándares web y su importancia",
                "Aplica principios de usabilidad en el diseño",
                "Implementa criterios de accesibilidad básicos",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de usabilidad web",
                  actividadesDocente:
                    "Presenta principios de usabilidad. Muestra ejemplos buenos y malos. Asigna análisis de sitios. Evalúa reportes.",
                  actividadesEstudiante:
                    "Analiza sitios web reales. Identifica problemas de usabilidad. Propone mejoras. Presenta informe de auditoría.",
                  recursos: ["Sitios web de ejemplo", "Checklist de usabilidad", "Formato de reporte"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "pw_10_u1_ra2",
              descripcion: "Desarrollar sitios web semánticos utilizando etiquetas HTML5 según estándares W3C.",
              saberesEsenciales: [
                "Estructura HTML5: DOCTYPE, html, head, body",
                "Etiquetas semánticas: header, nav, main, section, article, aside, footer",
                "Elementos de contenido: headings, párrafos, listas, enlaces, imágenes",
                "Formularios: input types, validación HTML5, elementos de formulario",
                "Multimedia: audio, video, canvas, SVG",
              ],
              indicadoresLogro: [
                "Construye estructura HTML5 válida y semántica",
                "Utiliza etiquetas apropiadas según el contenido",
                "Implementa formularios con validación nativa",
                "Integra elementos multimedia correctamente",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Sitio web de portafolio personal",
                  actividadesDocente:
                    "Enseña estructura HTML5 semántica. Demuestra validación W3C. Supervisa desarrollo. Evalúa código y resultado.",
                  actividadesEstudiante:
                    "Planifica estructura del sitio. Desarrolla páginas con HTML5 semántico. Valida código. Publica en GitHub Pages.",
                  recursos: ["VS Code", "W3C Validator", "GitHub", "Guía de proyecto"],
                  tiempoMinutos: 480,
                },
                {
                  id: "pw_10_u1_ra2_a2",
                  perfil: "lúdica",
                  nombre: "HTML Battle - Réplica de diseños",
                  actividadesDocente:
                    "Organiza competencia de replicación. Presenta diseños objetivo. Evalúa precisión y semántica. Premia ganadores.",
                  actividadesEstudiante:
                    "Replica diseños usando solo HTML. Compite por mayor precisión. Aprende de soluciones de otros.",
                  recursos: ["Diseños de referencia", "VS Code", "Sistema de puntuación"],
                  tiempoMinutos: 180,
                },
                {
                  id: "pw_10_u1_ra2_a3",
                  perfil: "dua",
                  nombre: "HTML con apoyo visual y auditivo",
                  actividadesDocente:
                    "Proporciona videos con subtítulos y audio descripción. Ofrece guías visuales paso a paso. Permite ritmo personalizado.",
                  actividadesEstudiante:
                    "Aprende con recursos multimedia adaptados. Practica con ejercicios graduados. Recibe retroalimentación frecuente.",
                  recursos: [
                    "Videos accesibles",
                    "Guías ilustradas",
                    "Ejercicios adaptados",
                    "Retroalimentación personalizada",
                  ],
                  tiempoMinutos: 600,
                },
              ],
            },
            {
              id: "pw_10_u1_ra3",
              descripcion: "Aplicar hojas de estilo en cascada CSS3 para el diseño visual de sitios web responsivos.",
              saberesEsenciales: [
                "Fundamentos CSS: Selectores, propiedades, valores, especificidad",
                "Box model: margin, padding, border, content",
                "Layout: Display, Position, Float",
                "Flexbox: Contenedor flex, items flex, alineación",
                "CSS Grid: Definición de grid, áreas, colocación de items",
                "Diseño responsivo: Media queries, mobile-first, breakpoints",
                "Animaciones y transiciones CSS",
              ],
              indicadoresLogro: [
                "Aplica selectores y propiedades CSS correctamente",
                "Implementa layouts con Flexbox y Grid",
                "Crea diseños responsivos mobile-first",
                "Utiliza animaciones y transiciones apropiadamente",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Landing page responsiva completa",
                  actividadesDocente:
                    "Enseña CSS moderno y responsivo. Demuestra Flexbox y Grid. Supervisa desarrollo. Evalúa en múltiples dispositivos.",
                  actividadesEstudiante:
                    "Diseña landing page. Implementa con CSS puro. Aplica animaciones. Prueba en dispositivos reales.",
                  recursos: ["VS Code", "Chrome DevTools", "Diseño en Figma", "Dispositivos de prueba"],
                  tiempoMinutos: 480,
                },
                {
                  id: "pw_10_u1_ra3_a2",
                  perfil: "lúdica",
                  nombre: "CSS Games Marathon",
                  actividadesDocente:
                    "Presenta juegos de CSS. Asigna metas por niveles. Rastrea progreso. Celebra completaciones.",
                  actividadesEstudiante:
                    "Completa Flexbox Froggy. Avanza en Grid Garden. Domina CSS Diner. Comparte logros.",
                  recursos: ["Flexbox Froggy", "Grid Garden", "CSS Diner", "CSS Battle"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
        {
          id: "pw_10_u2",
          nombre: "Programación interpretada",
          horas: 72,
          competenciaDesarrolloHumano: "Solución de problemas",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_10_u2_ra1",
              descripcion:
                "Desarrollar scripts del lado del cliente utilizando JavaScript para agregar interactividad a sitios web.",
              saberesEsenciales: [
                "Fundamentos JavaScript: Variables (let, const, var), tipos de datos, operadores",
                "Estructuras de control: Condicionales (if, switch), ciclos (for, while)",
                "Funciones: Declaración, expresión, arrow functions, parámetros, retorno",
                "Arrays y objetos: Métodos de arrays, manipulación de objetos",
                "DOM: Selección de elementos, manipulación, eventos",
                "Eventos: Event listeners, event object, propagación",
              ],
              indicadoresLogro: [
                "Implementa lógica de programación con JavaScript",
                "Manipula el DOM dinámicamente",
                "Responde a eventos del usuario",
                "Valida formularios con JavaScript",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Aplicación web interactiva",
                  actividadesDocente:
                    "Enseña fundamentos de JavaScript. Demuestra manipulación del DOM. Asigna proyecto. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Aprende sintaxis JavaScript. Practica con ejercicios. Desarrolla app interactiva (TODO list, calculadora). Presenta proyecto.",
                  recursos: ["VS Code", "Chrome DevTools", "MDN Web Docs", "Ejercicios graduados"],
                  tiempoMinutos: 600,
                },
                {
                  id: "pw_10_u2_ra1_a2",
                  perfil: "lúdica",
                  nombre: "Desarrollo de minijuego web",
                  actividadesDocente:
                    "Presenta ejemplos de juegos simples. Guía desarrollo paso a paso. Organiza competencia de juegos. Evalúa creatividad.",
                  actividadesEstudiante:
                    "Diseña concepto de juego. Programa lógica del juego. Implementa gráficos y sonidos. Presenta y comparte juego.",
                  recursos: ["Ejemplos de juegos", "Canvas API", "Sprites gratuitos", "Sounds gratuitos"],
                  tiempoMinutos: 480,
                },
                {
                  id: "pw_10_u2_ra1_a3",
                  perfil: "alta dotación",
                  nombre: "API REST y JavaScript asíncrono",
                  actividadesDocente:
                    "Presenta conceptos avanzados. Proporciona recursos de profundización. Ofrece mentoría. Evalúa proyecto complejo.",
                  actividadesEstudiante:
                    "Aprende fetch API y promesas. Consume APIs públicas. Desarrolla dashboard de datos en tiempo real. Documenta código.",
                  recursos: ["APIs públicas", "Documentación MDN", "Guía de async/await"],
                  tiempoMinutos: 600,
                },
              ],
            },
            {
              id: "pw_10_u2_ra2",
              descripcion: "Aplicar técnicas de depuración y buenas prácticas de programación.",
              saberesEsenciales: [
                "Debugging: Console, breakpoints, DevTools",
                "Manejo de errores: try-catch, throw",
                "Buenas prácticas: Naming conventions, comentarios, código limpio",
              ],
              indicadoresLogro: [
                "Utiliza herramientas de depuración efectivamente",
                "Implementa manejo de errores apropiado",
                "Escribe código limpio y documentado",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Taller de debugging y código limpio",
                  actividadesDocente:
                    "Enseña técnicas de debugging. Presenta código con errores. Guía proceso de corrección. Evalúa soluciones.",
                  actividadesEstudiante:
                    "Aprende uso de DevTools. Encuentra y corrige errores en código. Refactoriza código desordenado. Documenta proceso.",
                  recursos: ["Chrome DevTools", "Código con bugs", "Guía de clean code"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
        {
          id: "pw_10_u3",
          nombre: "Técnicas para el desarrollo de sitios web",
          horas: 72,
          competenciaDesarrolloHumano: "Trabajo en equipo",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_10_u3_ra1",
              descripcion: "Implementar control de versiones utilizando Git y GitHub para el trabajo colaborativo.",
              saberesEsenciales: [
                "Git: Inicialización, staging, commits, branches",
                "GitHub: Repositorios, push, pull, fork, clone",
                "Flujo de trabajo: Feature branches, merge, pull requests",
                "Colaboración: Issues, code review, documentación",
              ],
              indicadoresLogro: [
                "Utiliza comandos básicos de Git",
                "Gestiona repositorios en GitHub",
                "Colabora usando pull requests",
                "Resuelve conflictos de merge",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u3_ra1_a1",
                  perfil: "normal",
                  nombre: "Proyecto colaborativo con Git",
                  actividadesDocente:
                    "Enseña flujo de trabajo Git. Organiza equipos. Supervisa colaboración. Evalúa uso de herramientas.",
                  actividadesEstudiante:
                    "Aprende comandos Git. Crea repositorio de equipo. Trabaja con branches. Realiza pull requests.",
                  recursos: ["Git", "GitHub", "VS Code Git extension", "Guía de Git Flow"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "pw_10_u3_ra2",
              descripcion: "Utilizar frameworks CSS para acelerar el desarrollo de interfaces responsivas.",
              saberesEsenciales: [
                "Bootstrap: Grid system, componentes, utilidades",
                "Tailwind CSS: Utility-first, configuración, responsive design",
                "Personalización de frameworks",
              ],
              indicadoresLogro: [
                "Implementa grid system de Bootstrap",
                "Utiliza componentes prediseñados",
                "Personaliza frameworks según necesidades",
                "Decide cuándo usar framework vs CSS puro",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_10_u3_ra2_a1",
                  perfil: "normal",
                  nombre: "Dashboard con Bootstrap/Tailwind",
                  actividadesDocente:
                    "Presenta frameworks CSS. Compara características. Guía desarrollo de dashboard. Evalúa resultado.",
                  actividadesEstudiante:
                    "Explora documentación de framework. Desarrolla dashboard administrativo. Personaliza estilos. Optimiza para móviles.",
                  recursos: ["Bootstrap/Tailwind docs", "Plantillas de ejemplo", "Figma diseño"],
                  tiempoMinutos: 360,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 3: DISEÑO DE SOFTWARE (DÉCIMO)
    {
      id: "ds_10",
      nombre: "Diseño de Software",
      descripcion:
        "Proporciona una guía en el diseño del software acorde a las especificaciones del cliente, para cada componente web y de almacenamiento de datos solicitado.",
      horasTotal: 100,
      unidades: [
        {
          id: "ds_10_u1",
          nombre: "Fundamentos de diseño de software",
          horas: 52,
          competenciaDesarrolloHumano: "Solución de problemas",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_10_u1_ra1",
              descripcion: "Identificar los elementos y principios del diseño de software aplicados al desarrollo web.",
              saberesEsenciales: [
                "Ciclo de vida del software: Modelos (cascada, iterativo, ágil)",
                "Análisis de requerimientos: Funcionales y no funcionales",
                "Documentación técnica: Especificaciones, diagramas",
                "Principios de diseño: SOLID, DRY, KISS",
              ],
              indicadoresLogro: [
                "Identifica fases del ciclo de vida del software",
                "Documenta requerimientos de software",
                "Aplica principios básicos de diseño",
                "Genera documentación técnica básica",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_10_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de requerimientos de proyecto",
                  actividadesDocente:
                    "Presenta caso de estudio. Enseña técnicas de levantamiento de requerimientos. Guía documentación. Evalúa entregables.",
                  actividadesEstudiante:
                    "Entrevista cliente ficticio. Documenta requerimientos. Clasifica en funcionales y no funcionales. Presenta especificación.",
                  recursos: ["Caso de estudio", "Plantillas de documentación", "Formato de especificación"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ds_10_u1_ra2",
              descripcion: "Elaborar diagramas UML básicos para el modelado de sistemas web.",
              saberesEsenciales: [
                "UML: Introducción, tipos de diagramas",
                "Diagrama de casos de uso: Actores, casos, relaciones",
                "Diagrama de clases: Clases, atributos, métodos, relaciones",
                "Diagrama de secuencia: Objetos, mensajes, tiempo",
              ],
              indicadoresLogro: [
                "Crea diagramas de casos de uso",
                "Modela clases con atributos y métodos",
                "Representa secuencias de interacción",
                "Utiliza herramientas de modelado",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_10_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Modelado UML de sistema web",
                  actividadesDocente:
                    "Enseña notación UML. Demuestra herramientas de modelado. Asigna sistema a modelar. Evalúa diagramas.",
                  actividadesEstudiante:
                    "Aprende notación UML. Crea diagrama de casos de uso. Modela clases del sistema. Dibuja secuencias principales.",
                  recursos: ["Lucidchart/Draw.io", "Plantillas UML", "Caso de sistema web"],
                  tiempoMinutos: 360,
                },
              ],
            },
          ],
        },
        {
          id: "ds_10_u2",
          nombre: "Diseño de interfaces de usuario",
          horas: 48,
          competenciaDesarrolloHumano: "Innovación y creatividad",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_10_u2_ra1",
              descripcion: "Diseñar interfaces de usuario aplicando principios de UX/UI para sitios web.",
              saberesEsenciales: [
                "UX Design: Investigación de usuarios, personas, user journey",
                "UI Design: Principios visuales, jerarquía, color, tipografía",
                "Wireframing: Baja y alta fidelidad, herramientas",
                "Prototipado: Interactivo, testing de usuarios",
              ],
              indicadoresLogro: [
                "Crea personas y user journeys",
                "Diseña wireframes de baja y alta fidelidad",
                "Desarrolla prototipos interactivos",
                "Realiza pruebas de usabilidad básicas",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_10_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Diseño UX/UI de aplicación web",
                  actividadesDocente:
                    "Enseña proceso de diseño UX/UI. Demuestra Figma. Guía diseño iterativo. Evalúa diseño final.",
                  actividadesEstudiante:
                    "Investiga usuarios objetivo. Crea wireframes. Desarrolla mockups en Figma. Crea prototipo interactivo. Realiza test con compañeros.",
                  recursos: ["Figma", "Plantillas UI", "Guía de UX", "Formato de testing"],
                  tiempoMinutos: 480,
                },
                {
                  id: "ds_10_u2_ra1_a2",
                  perfil: "lúdica",
                  nombre: "Design Sprint Challenge",
                  actividadesDocente:
                    "Organiza sprint de diseño acelerado. Presenta reto de diseño. Facilita proceso. Evalúa soluciones.",
                  actividadesEstudiante:
                    "Participa en sprint de diseño. Genera ideas rápidamente. Prototipa solución. Presenta pitch de diseño.",
                  recursos: ["Material de Design Thinking", "Timer", "Formato de pitch"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 4: SOPORTE TI (DÉCIMO)
    {
      id: "sti_10",
      nombre: "Soporte TI",
      descripcion:
        "Brindar soporte técnico a usuarios y equipos de cómputo, aplicando metodologías de diagnóstico y resolución de problemas.",
      horasTotal: 184,
      unidades: [
        {
          id: "sti_10_u1",
          nombre: "Fundamentos de tecnologías de la información",
          horas: 96,
          competenciaDesarrolloHumano: "Solución de problemas",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "sti_10_u1_ra1",
              descripcion:
                "Emplear bajo criterios técnicos los componentes apropiados para la construcción, reparación o actualización de computadoras personales.",
              saberesEsenciales: [
                "Componentes de hardware: CPU, RAM, almacenamiento, GPU, fuente de poder, tarjeta madre",
                "Especificaciones técnicas: Compatibilidad, rendimiento, consumo",
                "Herramientas de ensamblaje: Destornilladores, pulsera antiestática, pasta térmica",
                "Procedimientos de ensamblaje: Orden, precauciones, verificación",
              ],
              indicadoresLogro: [
                "Identifica componentes de hardware y sus funciones",
                "Selecciona componentes compatibles según especificaciones",
                "Ensambla equipos siguiendo procedimientos técnicos",
                "Documenta configuraciones de hardware",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Laboratorio de ensamblaje de PCs",
                  actividadesDocente:
                    "Demuestra componentes y ensamblaje. Supervisa práctica. Evalúa proceso y resultado. Retroalimenta errores.",
                  actividadesEstudiante:
                    "Identifica componentes reales. Ensambla PC completa. Verifica funcionamiento. Documenta con fotos y reporte.",
                  recursos: ["Componentes de PC", "Herramientas", "Guía de ensamblaje", "Formato de reporte"],
                  tiempoMinutos: 480,
                },
                {
                  id: "sti_10_u1_ra1_a2",
                  perfil: "lúdica",
                  nombre: "PC Building Simulator Challenge",
                  actividadesDocente:
                    "Configura simulador. Establece retos de configuración. Organiza competencia. Premia mejores builds.",
                  actividadesEstudiante:
                    "Ensambla PC virtual. Optimiza precio/rendimiento. Compite con compañeros. Justifica decisiones.",
                  recursos: ["PC Building Simulator", "Tabla de precios actualizados", "Rúbrica de evaluación"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "sti_10_u1_ra2",
              descripcion:
                "Instalar los componentes para la actualización de computadoras realizando la configuración según necesidades del usuario.",
              saberesEsenciales: [
                "Actualización de hardware: RAM, almacenamiento, GPU",
                "Configuración BIOS/UEFI: Orden de arranque, XMP, virtualización",
                "Drivers y actualizaciones: Identificación, instalación, verificación",
              ],
              indicadoresLogro: [
                "Diagnostica necesidades de actualización",
                "Instala componentes de actualización",
                "Configura BIOS según requerimientos",
                "Verifica funcionamiento post-actualización",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Proyecto de actualización de equipo",
                  actividadesDocente:
                    "Presenta caso de equipo obsoleto. Guía análisis de necesidades. Supervisa actualización. Evalúa mejora.",
                  actividadesEstudiante:
                    "Analiza equipo existente. Propone actualización con presupuesto. Ejecuta actualización. Documenta mejora de rendimiento.",
                  recursos: ["Equipo a actualizar", "Componentes", "Benchmark tools", "Formato de propuesta"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "sti_10_u1_ra3",
              descripcion:
                "Determinar el mecanismo o procedimiento mediante el cual las computadoras se comunican en la red.",
              saberesEsenciales: [
                "Fundamentos de redes: Modelo OSI, TCP/IP",
                "Direccionamiento IP: IPv4, subredes, DHCP",
                "Dispositivos de red: Router, switch, access point",
                "Configuración básica de red: IP estática, DNS, gateway",
              ],
              indicadoresLogro: [
                "Explica el modelo OSI y TCP/IP",
                "Configura direccionamiento IP",
                "Conecta dispositivos en red local",
                "Diagnostica problemas de conectividad",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Configuración de red local",
                  actividadesDocente:
                    "Explica fundamentos de redes. Demuestra configuración. Supervisa práctica. Evalúa conectividad.",
                  actividadesEstudiante:
                    "Configura IP estática. Conecta equipos en red. Comparte recursos. Documenta configuración.",
                  recursos: ["Switch", "Cables de red", "Computadoras", "Guía de configuración"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "sti_10_u1_ra4",
              descripcion:
                "Explicar mecanismos para la solución de problemas en equipos portátiles y otros dispositivos.",
              saberesEsenciales: [
                "Diagnóstico de laptops: Pantalla, batería, teclado, touchpad",
                "Dispositivos móviles: Tablets, smartphones",
                "Periféricos: Impresoras, scanners, proyectores",
              ],
              indicadoresLogro: [
                "Diagnostica fallas comunes en laptops",
                "Soluciona problemas de dispositivos móviles",
                "Configura y soluciona problemas de periféricos",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra4_a1",
                  perfil: "normal",
                  nombre: "Clínica de diagnóstico de dispositivos",
                  actividadesDocente:
                    "Prepara dispositivos con fallas. Guía metodología de diagnóstico. Evalúa proceso y solución.",
                  actividadesEstudiante:
                    "Recibe dispositivo con falla. Aplica metodología de diagnóstico. Propone y ejecuta solución. Documenta caso.",
                  recursos: ["Dispositivos con fallas", "Herramientas de diagnóstico", "Formato de caso"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "sti_10_u1_ra5",
              descripcion: "Instalar sistemas operativos licenciados y de código abierto.",
              saberesEsenciales: [
                "Sistemas operativos: Windows, Linux (Ubuntu, Fedora)",
                "Preparación de instalación: Medios de instalación, particiones",
                "Proceso de instalación: Configuración, personalización",
                "Post-instalación: Drivers, actualizaciones, software esencial",
              ],
              indicadoresLogro: [
                "Crea medios de instalación booteable",
                "Instala Windows y Linux correctamente",
                "Configura particiones apropiadamente",
                "Instala drivers y software necesario",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra5_a1",
                  perfil: "normal",
                  nombre: "Instalación dual boot Windows/Linux",
                  actividadesDocente:
                    "Demuestra proceso de instalación. Supervisa práctica. Verifica configuraciones. Evalúa resultado.",
                  actividadesEstudiante:
                    "Crea USB booteable. Particiona disco duro. Instala Windows y Ubuntu en dual boot. Documenta proceso.",
                  recursos: ["VirtualBox o PC de práctica", "ISOs oficiales", "USB 8GB+", "Guía de instalación"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "sti_10_u1_ra6",
              descripcion:
                "Implementar mecanismos de seguridad en equipos, datos y red considerando características y funciones del profesional en TI.",
              saberesEsenciales: [
                "Seguridad de equipos: Antivirus, firewall, actualizaciones",
                "Seguridad de datos: Respaldos, encriptación",
                "Seguridad de red: Contraseñas seguras, WPA3, VPN",
              ],
              indicadoresLogro: [
                "Configura software de seguridad",
                "Implementa políticas de respaldo",
                "Configura seguridad de red wireless",
                "Educa usuarios en seguridad básica",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u1_ra6_a1",
                  perfil: "normal",
                  nombre: "Implementación de plan de seguridad",
                  actividadesDocente:
                    "Presenta amenazas comunes. Enseña medidas de seguridad. Guía implementación. Evalúa plan.",
                  actividadesEstudiante:
                    "Analiza vulnerabilidades de sistema. Implementa antivirus y firewall. Configura respaldos automáticos. Documenta plan de seguridad.",
                  recursos: ["Software de seguridad", "Herramientas de respaldo", "Formato de plan"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
        {
          id: "sti_10_u2",
          nombre: "Seguridad industrial",
          horas: 36,
          competenciaDesarrolloHumano: "Discernimiento y responsabilidad",
          ejePoliticaEducativa: "Educación para el desarrollo sostenible",
          resultadosAprendizaje: [
            {
              id: "sti_10_u2_ra1",
              descripcion:
                "Mencionar el impacto de las regulaciones nacionales aplicadas en el campo de la Seguridad Industrial.",
              saberesEsenciales: [
                "Normativa costarricense: Ley de Riesgos del Trabajo, reglamentos",
                "Organismos reguladores: INS, Ministerio de Trabajo",
                "Responsabilidades: Empleador, trabajador",
              ],
              indicadoresLogro: [
                "Identifica normativa de seguridad laboral",
                "Reconoce derechos y responsabilidades",
                "Aplica reglamentos en contexto de TI",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de normativa de seguridad",
                  actividadesDocente:
                    "Presenta normativa vigente. Asigna investigación. Guía análisis de casos. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Investiga normativa aplicable. Analiza casos de incumplimiento. Presenta informe de hallazgos.",
                  recursos: ["Documentos legales", "Casos de estudio", "Formato de informe"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "sti_10_u2_ra2",
              descripcion:
                "Explicar los procesos mediante los cuales se realiza el aseguramiento de infraestructuras física.",
              saberesEsenciales: [
                "Seguridad física: Control de acceso, CCTV, alarmas",
                "Protección de equipos: UPS, supresores de picos",
                "Data centers: Climatización, redundancia, acceso controlado",
              ],
              indicadoresLogro: [
                "Describe medidas de seguridad física",
                "Identifica equipos de protección",
                "Propone mejoras de seguridad física",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Auditoría de seguridad física",
                  actividadesDocente:
                    "Presenta conceptos de seguridad física. Guía auditoría del laboratorio. Evalúa reporte.",
                  actividadesEstudiante:
                    "Audita seguridad física del laboratorio. Identifica vulnerabilidades. Propone mejoras. Presenta informe.",
                  recursos: ["Checklist de auditoría", "Cámara para documentar", "Formato de reporte"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "sti_10_u2_ra3",
              descripcion:
                "Aplicar las estrategias de prevención contra riesgos considerando la normativa, protocolos, insumos, equipos y herramientas que se utilizan en las actividades instrumentales.",
              saberesEsenciales: [
                "Ergonomía: Postura, iluminación, descansos",
                "EPP en TI: Pulsera antiestática, lentes de seguridad",
                "Manejo de químicos: Pasta térmica, alcohol isopropílico",
                "Primeros auxilios básicos",
              ],
              indicadoresLogro: [
                "Aplica principios ergonómicos",
                "Utiliza EPP apropiadamente",
                "Maneja químicos de forma segura",
                "Responde a emergencias básicas",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u2_ra3_a1",
                  perfil: "normal",
                  nombre: "Taller de prevención de riesgos",
                  actividadesDocente:
                    "Demuestra uso correcto de EPP. Enseña ergonomía. Simula emergencias. Evalúa aplicación.",
                  actividadesEstudiante:
                    "Practica uso de EPP. Configura estación ergonómica. Participa en simulacro. Documenta aprendizajes.",
                  recursos: ["EPP de TI", "Materiales de ergonomía", "Guía de primeros auxilios"],
                  tiempoMinutos: 180,
                },
              ],
            },
          ],
        },
        {
          id: "sti_10_u3",
          nombre: "Electricidad y electrónica",
          horas: 52,
          competenciaDesarrolloHumano: "Autoaprendizaje",
          ejePoliticaEducativa: "Educación para el desarrollo sostenible",
          resultadosAprendizaje: [
            {
              id: "sti_10_u3_ra1",
              descripcion: "Identificar fundamentos de electricidad y electrónica requeridos en la industria.",
              saberesEsenciales: [
                "Electricidad básica: Voltaje, corriente, resistencia, Ley de Ohm",
                "Circuitos: Serie, paralelo, mixtos",
                "Componentes electrónicos: Resistencias, capacitores, diodos, transistores",
                "Instrumentos de medición: Multímetro, uso y lectura",
              ],
              indicadoresLogro: [
                "Explica conceptos eléctricos básicos",
                "Calcula valores usando Ley de Ohm",
                "Identifica componentes electrónicos",
                "Utiliza multímetro correctamente",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u3_ra1_a1",
                  perfil: "normal",
                  nombre: "Laboratorio de electricidad básica",
                  actividadesDocente:
                    "Explica fundamentos eléctricos. Demuestra uso de multímetro. Supervisa mediciones. Evalúa precisión.",
                  actividadesEstudiante:
                    "Practica cálculos de Ley de Ohm. Identifica componentes. Mide voltaje, corriente y resistencia. Documenta mediciones.",
                  recursos: ["Multímetro", "Componentes electrónicos", "Protoboard", "Guía de práctica"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "sti_10_u3_ra2",
              descripcion: "Distinguir los fundamentos de la electricidad aplicados a situaciones de la vida diaria.",
              saberesEsenciales: [
                "Corriente alterna vs continua",
                "Instalaciones eléctricas residenciales básicas",
                "Seguridad eléctrica: Riesgos, precauciones",
                "Consumo eléctrico: Cálculo, ahorro energético",
              ],
              indicadoresLogro: [
                "Diferencia corriente alterna y continua",
                "Identifica elementos de instalación eléctrica",
                "Aplica medidas de seguridad eléctrica",
                "Calcula consumo eléctrico",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u3_ra2_a1",
                  perfil: "normal",
                  nombre: "Análisis de consumo eléctrico del hogar",
                  actividadesDocente:
                    "Explica conceptos de consumo. Asigna análisis de recibo eléctrico. Guía cálculos. Evalúa propuestas de ahorro.",
                  actividadesEstudiante:
                    "Analiza recibo eléctrico del hogar. Identifica electrodomésticos de mayor consumo. Calcula costos. Propone plan de ahorro.",
                  recursos: ["Recibos eléctricos", "Calculadora", "Guía de análisis"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "sti_10_u3_ra3",
              descripcion: "Aplicar los principios de la electrónica en la resolución de situaciones diarias.",
              saberesEsenciales: [
                "Electrónica digital básica: Compuertas lógicas, tablas de verdad",
                "Fuentes de poder: Funcionamiento, tipos, especificaciones",
                "Solución de problemas electrónicos básicos",
              ],
              indicadoresLogro: [
                "Comprende lógica digital básica",
                "Diagnostica fuentes de poder",
                "Resuelve problemas electrónicos simples",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_10_u3_ra3_a1",
                  perfil: "normal",
                  nombre: "Diagnóstico de fuentes de poder",
                  actividadesDocente:
                    "Explica funcionamiento de fuentes. Demuestra diagnóstico con multímetro. Supervisa práctica. Evalúa precisión.",
                  actividadesEstudiante:
                    "Identifica conectores de fuente ATX. Mide voltajes de salida. Diagnostica fuente funcional vs defectuosa. Documenta resultados.",
                  recursos: ["Fuentes ATX (buenas y malas)", "Multímetro", "Diagrama de pines ATX"],
                  tiempoMinutos: 180,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// ==================== UNDÉCIMO ====================
export const UNDECIMO = {
  nivel: "Undécimo",
  subareas: [
    // SUBÁREA 1: EMPRENDIMIENTO E INNOVACIÓN
    {
      id: "ei_11",
      nombre: "Emprendimiento e Innovación",
      descripcion:
        "Desarrollar capacidades en los ámbitos del emprendimiento y la empresarialidad mediante la identificación de oportunidades de negocios, la aplicación de metodologías para la construcción de modelos de negocios; la creación de empresas de práctica y la creación de su proyecto de vida.",
      horasTotal: 160,
      unidades: [
        {
          id: "ei_11_u1",
          nombre: "Oportunidades de negocios",
          horas: 40,
          competenciaDesarrolloHumano: "Innovación y creatividad",
          ejePoliticaEducativa: "Educación para el desarrollo sostenible",
          resultadosAprendizaje: [
            {
              id: "ei_11_u1_ra1",
              descripcion:
                "Explicar las características esenciales e importancia del emprendimiento haciendo un uso productivo de las tecnologías.",
              saberesEsenciales: [
                "Emprendimiento: Definición, características e importancia del fomento del espíritu emprendedor",
                "Características de la cultura emprendedora",
                "Habilidades y responsabilidades de un emprendedor",
                "Importancia de ser emprendedor en su proyecto de vida",
                "Elementos a tomar en cuenta al emprender un proyecto: Justificación, Estudio del mercado, Trámites administrativos y legales, Fuentes de financiamiento, Análisis integral",
                "Uso productivo de las tecnologías en los negocios",
              ],
              indicadoresLogro: [
                "Identifica habilidades y responsabilidades de la persona emprendedora",
                "Discrimina los elementos a tomar en cuenta al emprender un proyecto",
                "Explica el uso productivo de las tecnologías en la generación de ideas de negocios",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Perfil del emprendedor exitoso",
                  actividadesDocente:
                    "Presenta casos de emprendedores exitosos. Guía análisis de características. Facilita autoevaluación. Evalúa reflexión.",
                  actividadesEstudiante:
                    "Investiga emprendedores costarricenses. Analiza características comunes. Realiza autoevaluación de habilidades emprendedoras. Presenta plan de desarrollo personal.",
                  recursos: [
                    "Casos de emprendedores",
                    "Test de habilidades emprendedoras",
                    "Formato de plan de desarrollo",
                  ],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ei_11_u1_ra2",
              descripcion:
                "Examinar el mercado y su entorno, aplicando herramientas de recolección de información para la identificación de oportunidades de negocio, según las nuevas tendencias.",
              saberesEsenciales: [
                "Mercado: Concepto, Funcionamiento del mercado y tendencias innovadoras",
                "Análisis del entorno, Oportunidades de negocios, Necesidades sociales, Problemáticas",
                "Herramientas para detectar necesidades",
                "Detección del mercado y clientes potenciales",
                "El cliente como elemento clave",
              ],
              indicadoresLogro: [
                "Caracteriza el funcionamiento del mercado y su dinámica",
                "Identifica las oportunidades del mercado según las nuevas tendencias",
                "Utiliza herramientas para la recolección de información que permita la detección de oportunidades de negocio",
                "Interpreta los resultados obtenidos en función del mercado y los clientes potenciales",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Investigación de mercado",
                  actividadesDocente:
                    "Enseña técnicas de investigación de mercado. Guía diseño de encuestas. Supervisa recolección de datos. Evalúa análisis.",
                  actividadesEstudiante:
                    "Identifica problema o necesidad. Diseña encuesta/entrevista. Recolecta datos. Analiza resultados. Presenta oportunidad de negocio.",
                  recursos: ["Google Forms", "Plantilla de encuesta", "Guía de análisis de mercado"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "ei_11_u1_ra3",
              descripcion:
                "Utilizar técnicas creativas que permitan la generación de ideas de negocio innovadoras, brindando soluciones a las necesidades detectadas en los clientes potenciales.",
              saberesEsenciales: [
                "Generación de ideas empresariales: Concepto, Fuentes, Propósito, Necesidad de una idea",
                "Respuesta a las necesidades del mercado",
                "Cambios en la moda y los requisitos",
                "Mantenerse a la cabeza de la competencia",
                "Tecnología",
                "Técnicas para generar ideas empresariales: Características, utilidad y beneficios",
                "Herramientas que apoyan el proceso de selección del mejor producto",
                "Diseño de una idea de negocio innovadora",
              ],
              indicadoresLogro: [
                "Determina fuentes de generación de ideas empresariales",
                "Selecciona ideas empresariales usando distintas técnicas",
                "Aplica techniques creativas que brinden soluciones a las necesidades detectadas en los clientes potenciales",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Taller de ideación creativa",
                  actividadesDocente:
                    "Presenta técnicas de creatividad (brainstorming, SCAMPER, Design Thinking). Facilita sesiones de ideación. Guía selección de ideas. Evalúa proceso.",
                  actividadesEstudiante:
                    "Aplica técnicas de creatividad. Genera múltiples ideas. Evalúa ideas con matriz de selección. Desarrolla idea ganadora.",
                  recursos: ["Material de Design Thinking", "Plantillas de ideación", "Matriz de evaluación de ideas"],
                  tiempoMinutos: 300,
                },
                {
                  id: "ei_11_u1_ra3_a2",
                  perfil: "lúdica",
                  nombre: "Shark Tank del aula",
                  actividadesDocente:
                    "Organiza competencia estilo Shark Tank. Establece criterios de evaluación. Facilita presentaciones. Retroalimenta propuestas.",
                  actividadesEstudiante:
                    "Desarrolla pitch de idea. Prepara presentación persuasiva. Presenta ante 'inversionistas'. Responde preguntas.",
                  recursos: ["Formato de pitch", "Rúbrica de presentación", "Premios simbólicos"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ei_11_u1_ra4",
              descripcion: "Proponer soluciones creativas e innovadoras a necesidades y oportunidades del mercado.",
              saberesEsenciales: [
                "Creatividad e Innovación: Concepto, Importancia",
                "El proceso de la creatividad y la habilidad de pensar creativamente",
                "Innovación y su proceso",
                "Tipos de innovación y cómo diferenciarlos",
              ],
              indicadoresLogro: [
                "Identifica la importancia de la creatividad e innovación en los aspectos cotidianos de su quehacer",
                "Fomenta en el entorno una actitud creativa e innovadora en el desarrollo de emprendimientos",
                "Formula soluciones para las necesidades y oportunidades del mercado o mejora las existentes",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u1_ra4_a1",
                  perfil: "normal",
                  nombre: "Propuesta de solución innovadora",
                  actividadesDocente:
                    "Presenta tipos de innovación. Guía desarrollo de propuesta. Evalúa nivel de innovación. Retroalimenta.",
                  actividadesEstudiante:
                    "Identifica oportunidad de innovación. Desarrolla propuesta detallada. Crea prototipo básico. Presenta solución.",
                  recursos: ["Guía de innovación", "Material para prototipos", "Formato de propuesta"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ei_11_u1_ra5",
              descripcion:
                "Valorar el impacto social, económico y ambiental que generan las propuestas de proyectos de negocios sostenibles.",
              saberesEsenciales: [
                "Desarrollo sostenible: Concepto, Importancia",
                "Elementos: Social, Económico, Ambiental",
                "Emprendimientos sostenibles",
              ],
              indicadoresLogro: [
                "Describe los elementos del desarrollo sostenible y su importancia",
                "Discrimina el impacto al ambiente y a la salud producto del desarrollo de nuevos negocios",
                "Propone acciones creativas que mitiguen los daños al ambiente como parte del desarrollo de emprendimientos sostenibles",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u1_ra5_a1",
                  perfil: "normal",
                  nombre: "Análisis de impacto de emprendimiento",
                  actividadesDocente:
                    "Presenta ODS y desarrollo sostenible. Guía análisis de impacto. Evalúa propuestas de mitigación.",
                  actividadesEstudiante:
                    "Analiza impacto de su idea de negocio en triple línea (social, económico, ambiental). Propone medidas de sostenibilidad. Presenta plan de negocio sostenible.",
                  recursos: ["ODS de ONU", "Matriz de impacto", "Guía de negocios sostenibles"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
        {
          id: "ei_11_u2",
          nombre: "Modelo de negocios",
          horas: 32,
          competenciaDesarrolloHumano: "Capacidad de negociación",
          ejePoliticaEducativa: "Fortalecimiento de una ciudadanía planetaria con identidad",
          resultadosAprendizaje: [
            {
              id: "ei_11_u2_ra1",
              descripcion:
                "Construir un modelo de negocio a partir de una idea innovadora con una propuesta de valor diferenciador, utilizando las herramientas y metodologías vigentes.",
              saberesEsenciales: [
                "Modelos de negocios: Concepto",
                "Aspectos a considerar: Clientes, Canales, Relación con los clientes, Actividades importantes, Recursos, Aliados, Estructura económica y financiera",
                "Tipos de herramientas vigentes y su aplicabilidad",
                "Pensamiento de diseño (Design Thinking): Características",
                "Otras herramientas vigentes",
              ],
              indicadoresLogro: [
                "Distingue los aspectos que se consideran en la construcción de un modelo de negocio",
                "Compara las herramientas y metodologías vigentes en la construcción de modelos de negocios",
                "Utiliza herramientas y metodologías vigentes en la construcción de modelos de negocios",
                "Diseña ideas de negocio con mayor oportunidad de éxito a partir de la aplicación de herramientas y metodologías vigentes",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Business Model Canvas",
                  actividadesDocente:
                    "Presenta modelo Canvas. Guía completado de cada bloque. Supervisa desarrollo. Evalúa coherencia del modelo.",
                  actividadesEstudiante:
                    "Completa Canvas de su idea de negocio. Define propuesta de valor. Identifica segmentos de clientes. Presenta modelo completo.",
                  recursos: ["Plantilla Business Model Canvas", "Guía de llenado", "Ejemplos de Canvas"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "ei_11_u2_ra2",
              descripcion:
                "Validar el modelo de negocio, mediante el diseño de un producto mínimo viable aplicando metodologías vigentes.",
              saberesEsenciales: [
                "Producto mínimo viable (PMV): Concepto",
                "Pasos de la metodología por ejemplo Lean Startup",
                "Diseño del producto mínimo viable aplicando los pasos de las metodologías vigentes",
                "Validación del modelo de negocio",
              ],
              indicadoresLogro: [
                "Identifica concepto de producto mínimo viable",
                "Explica los pasos para la construcción del producto mínimo viable según las metodologías vigentes",
                "Diseña el producto mínimo viable aplicando los pasos de las metodologías vigentes",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Desarrollo de MVP",
                  actividadesDocente:
                    "Presenta metodología Lean Startup. Guía desarrollo de MVP. Facilita pruebas con usuarios. Evalúa aprendizajes.",
                  actividadesEstudiante:
                    "Define hipótesis de valor. Diseña MVP mínimo. Prueba con usuarios reales. Itera según feedback. Documenta aprendizajes.",
                  recursos: ["Guía Lean Startup", "Plantilla de hipótesis", "Formato de pruebas de usuario"],
                  tiempoMinutos: 480,
                },
              ],
            },
            {
              id: "ei_11_u2_ra3",
              descripcion: "Desarrollar el plan de puesta en marcha del modelo de negocio y lanzamiento del producto.",
              saberesEsenciales: [
                "Plan de implementación: Inversión inicial, Gestión de las finanzas, Identificación de fuentes de financiamiento",
                "Aspectos de formalización, Diseño de marca",
                "Plan de mercadeo y ventas",
                "Impactos: social, ambiental y la salud integral",
              ],
              indicadoresLogro: [
                "Identifica los aspectos que deben considerarse en la puesta en marcha del modelo de negocios",
                "Distingue las características de los aspectos que deben considerarse para la implementación del plan de puesta en marcha del modelo de negocio",
                "Construye el plan de puesta en marcha del modelo de negocios, tomando en cuenta las estrategias de mitigación de impacto",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u2_ra3_a1",
                  perfil: "normal",
                  nombre: "Plan de lanzamiento",
                  actividadesDocente:
                    "Presenta componentes del plan de lanzamiento. Guía desarrollo. Evalúa viabilidad del plan.",
                  actividadesEstudiante:
                    "Calcula inversión inicial. Identifica fuentes de financiamiento. Diseña plan de mercadeo. Presenta plan de lanzamiento completo.",
                  recursos: ["Plantilla de plan de lanzamiento", "Calculadora financiera", "Guía de marketing"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "ei_11_u2_ra4",
              descripcion: "Aplicar estrategias de negociación en el proceso de validación de propuestas de negocios.",
              saberesEsenciales: [
                "Capacidad de negociación: Concepto",
                "Estrategias para la negociación",
                "Acuerdos para la validación de propuestas de negocios",
              ],
              indicadoresLogro: [
                "Explica la importancia del desarrollo de habilidades de negociación durante el proceso de validación de propuestas de negocios",
                "Selecciona estrategias de negociación que propicien acuerdos exitosos durante el proceso de validación de propuestas de negocios",
                "Negocia la ejecución de propuestas viables de emprendimiento",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u2_ra4_a1",
                  perfil: "normal",
                  nombre: "Simulación de negociación",
                  actividadesDocente:
                    "Presenta técnicas de negociación. Organiza simulaciones. Retroalimenta desempeño. Evalúa habilidades.",
                  actividadesEstudiante:
                    "Aprende técnicas de negociación. Participa en simulaciones. Negocia acuerdos ficticios. Reflexiona sobre desempeño.",
                  recursos: ["Casos de negociación", "Roles para simulación", "Rúbrica de negociación"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ei_11_u2_ra5",
              descripcion:
                "Validar propuestas de negocios tomando en consideración el compromiso con la sociedad local y global.",
              saberesEsenciales: [
                "Derechos económicos, sociales, culturales y valores éticos universales",
                "Valores éticos universales: Respeto, Equidad, Justicia, Honestidad",
                "Economía social solidaria: Concepto, Características, Tipos de formas jurídicas asociativas",
                "Asociaciones Solidaristas, Cooperativas: Modelo, Beneficios, Requisitos, Legislación vigente",
              ],
              indicadoresLogro: [
                "Expone propuestas de negocios considerando los derechos económicos, sociales, culturales y valores éticos universales de la economía social solidaria",
                "Organiza propuestas de negocios considerando los derechos económicos, sociales, culturales y valores éticos universales",
                "Propone soluciones a problemas reales de la comunidad considerando los tipos de formas jurídicas asociativas de la economía social solidaria",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u2_ra5_a1",
                  perfil: "normal",
                  nombre: "Emprendimiento social",
                  actividadesDocente:
                    "Presenta economía social solidaria. Guía identificación de problemas comunitarios. Evalúa propuesta de impacto social.",
                  actividadesEstudiante:
                    "Identifica problema de su comunidad. Diseña emprendimiento con impacto social. Considera figura jurídica apropiada. Presenta propuesta.",
                  recursos: ["Guía de economía solidaria", "Casos de cooperativas", "Formato de propuesta social"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
        {
          id: "ei_11_u3",
          nombre: "Creación de empresas",
          horas: 68,
          competenciaDesarrolloHumano: "Orientación de servicio al cliente",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ei_11_u3_ra1",
              descripcion: "Describir los tipos de empresas con los cuales se puede desarrollar un negocio.",
              saberesEsenciales: [
                "Tipos de empresas: Concepto, características, ventajas y desventajas",
                "Según el ámbito de actividad",
                "Según el destino de sus beneficios",
                "Según la forma jurídica",
                "Según origen o procedencia de capital",
                "Según el tamaño",
                "Según su actividad desde el punto de vista de la materia que utiliza",
              ],
              indicadoresLogro: [
                "Compara los tipos de empresas que interactúan en el sistema financiero y económico nacional",
                "Selecciona el tipo de empresa para el desarrollo de su modelo de negocio",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u3_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de tipos de empresas",
                  actividadesDocente:
                    "Presenta clasificación de empresas. Asigna investigación de empresas reales. Guía comparación. Evalúa análisis.",
                  actividadesEstudiante:
                    "Investiga ejemplos de cada tipo de empresa. Compara ventajas y desventajas. Selecciona tipo para su emprendimiento. Justifica elección.",
                  recursos: ["Guía de tipos de empresas", "Casos de empresas CR", "Formato de análisis comparativo"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ei_11_u3_ra2",
              descripcion: "Estructurar el negocio con el enfoque orientado al cliente a través del plan de negocio.",
              saberesEsenciales: [
                "Plan de negocios: Objetivos, Metas, Modelo de negocios",
                "Estudios: mercado, mercadeo, técnico, económico y financiero",
                "Estructuración del negocio: Constitución legal, Modalidades de contratación según la legislación costarricense",
                "Permisos de funcionamiento y/o patentes, Permisos de salud",
                "Inscripción en Hacienda y Caja Costarricense de Seguro Social como patrono",
                "Catálogo de productos, Estructura organizativa de la empresa utilizando cadena de valor orientada al cliente",
                "Unidades y departamentos de la empresa, Procesos y procedimientos del negocio",
                "Asociatividad, encadenamientos y clúster",
              ],
              indicadoresLogro: [
                "Identifica los elementos que conforman el plan de negocios",
                "Diseña el plan de negocios, considerando todos sus elementos",
                "Elabora la estructura organizativa, procesos y procedimientos de la empresa, basándose en el plan de negocios y utilizando el enfoque orientado al cliente",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u3_ra2_a1",
                  perfil: "normal",
                  nombre: "Desarrollo de plan de negocios",
                  actividadesDocente:
                    "Presenta estructura de plan de negocios. Guía desarrollo de cada sección. Supervisa avance. Evalúa documento final.",
                  actividadesEstudiante:
                    "Desarrolla plan de negocios completo. Realiza estudios de mercado y técnico. Diseña estructura organizativa. Presenta plan.",
                  recursos: ["Plantilla de plan de negocios", "Guía de estudios", "Ejemplos de planes"],
                  tiempoMinutos: 720,
                },
              ],
            },
            {
              id: "ei_11_u3_ra3",
              descripcion:
                "Realizar labores en las áreas funcionales que conforman la empresa de práctica propuesta aplicando los principios de la administración y lo establecido en el plan de negocios.",
              saberesEsenciales: [
                "Principios de la administración",
                "Uso de la tecnología como aliado estratégico para la operación de la empresa",
                "Roles de trabajo por áreas funcionales",
                "Puesta en operación del negocio",
                "Transacciones comerciales, Centro de Operaciones",
                "Registro de las empresas, Transacciones bancarias",
              ],
              indicadoresLogro: [
                "Identifica las áreas funcionales y labores que se ejecutan para la puesta en marcha del negocio",
                "Utiliza la tecnología en las operaciones de la empresa",
                "Ejecuta labores en las áreas funcionales aplicando los principios de la administración",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u3_ra3_a1",
                  perfil: "normal",
                  nombre: "Empresa de práctica",
                  actividadesDocente:
                    "Organiza empresa de práctica. Asigna roles. Supervisa operaciones. Evalúa desempeño en áreas.",
                  actividadesEstudiante:
                    "Asume rol en empresa de práctica. Ejecuta funciones del área asignada. Usa tecnología para operaciones. Rota por diferentes áreas.",
                  recursos: ["Simulador de empresa", "Formatos de operaciones", "Herramientas digitales"],
                  tiempoMinutos: 600,
                },
              ],
            },
          ],
        },
        {
          id: "ei_11_u4",
          nombre: "Plan de vida",
          horas: 20,
          competenciaDesarrolloHumano: "Autoaprendizaje",
          ejePoliticaEducativa: "Educación para el desarrollo sostenible",
          resultadosAprendizaje: [
            {
              id: "ei_11_u4_ra1",
              descripcion:
                "Diseñar su proyecto de vida considerando las habilidades y competencias emprendedoras desarrolladas durante su proceso formativo.",
              saberesEsenciales: [
                "Proyecto de vida: Concepto, Importancia",
                "Visión y misión personal",
                "Metas a corto, mediano y largo plazo",
                "Competencias desarrolladas durante la formación",
              ],
              indicadoresLogro: [
                "Reflexiona sobre sus habilidades y competencias",
                "Define visión y misión personal",
                "Establece metas realistas con plazos definidos",
                "Vincula formación técnica con proyecto de vida",
              ],
              actividadesSugeridas: [
                {
                  id: "ei_11_u4_ra1_a1",
                  perfil: "normal",
                  nombre: "Mi proyecto de vida",
                  actividadesDocente:
                    "Guía reflexión personal. Facilita definición de metas. Acompaña proceso de autoconocimiento. Evalúa coherencia del plan.",
                  actividadesEstudiante:
                    "Realiza autodiagnóstico de competencias. Define visión y misión personal. Establece metas SMART. Presenta proyecto de vida.",
                  recursos: ["Formato de proyecto de vida", "Test de autoconocimiento", "Plantilla de metas SMART"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 2: PROGRAMACIÓN PARA WEB (UNDÉCIMO)
    {
      id: "pw_11",
      nombre: "Programación para Web",
      descripcion:
        "Programar componentes de software en el entorno del servidor, según requerimientos técnicos del cliente. Implementando aplicaciones web en entornos internet, intranet y extranet, según normativas vigentes.",
      horasTotal: 200,
      unidades: [
        {
          id: "pw_11_u1",
          nombre: "Programación interpretada multiparadigma",
          horas: 100,
          competenciaDesarrolloHumano: "Solución de problemas",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_11_u1_ra1",
              descripcion: "Desarrollar aplicaciones web del lado del servidor utilizando PHP.",
              saberesEsenciales: [
                "PHP: Sintaxis, variables, tipos de datos, operadores",
                "Estructuras de control: Condicionales, ciclos",
                "Funciones: Definición, parámetros, retorno",
                "Arrays y manejo de strings",
                "Formularios: GET, POST, validación",
                "Sesiones y cookies",
                "Conexión a bases de datos: MySQL, PDO",
              ],
              indicadoresLogro: [
                "Implementa scripts PHP con estructuras de control",
                "Procesa formularios del lado del servidor",
                "Gestiona sesiones de usuario",
                "Conecta y manipula bases de datos",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_11_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Sistema CRUD con PHP y MySQL",
                  actividadesDocente:
                    "Enseña fundamentos de PHP. Demuestra conexión a BD. Guía desarrollo de CRUD. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Aprende sintaxis PHP. Crea formularios con validación. Implementa CRUD completo. Aplica sesiones para login.",
                  recursos: ["XAMPP", "VS Code", "phpMyAdmin", "Documentación PHP"],
                  tiempoMinutos: 720,
                },
                {
                  id: "pw_11_u1_ra1_a2",
                  perfil: "alta dotación",
                  nombre: "API REST con PHP",
                  actividadesDocente:
                    "Presenta arquitectura REST. Proporciona recursos avanzados. Ofrece mentoría. Evalúa API completa.",
                  actividadesEstudiante:
                    "Diseña API REST. Implementa endpoints CRUD. Agrega autenticación JWT. Documenta con Swagger.",
                  recursos: ["Postman", "Documentación REST", "Librerías JWT"],
                  tiempoMinutos: 600,
                },
              ],
            },
            {
              id: "pw_11_u1_ra2",
              descripcion: "Implementar bases de datos relacionales con MySQL para aplicaciones web.",
              saberesEsenciales: [
                "MySQL: Instalación, configuración, herramientas",
                "SQL: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE, SELECT)",
                "Diseño de bases de datos: Normalización, relaciones",
                "Consultas avanzadas: JOIN, subconsultas, funciones agregadas",
                "Índices y optimización básica",
              ],
              indicadoresLogro: [
                "Diseña bases de datos normalizadas",
                "Implementa operaciones CRUD con SQL",
                "Realiza consultas con múltiples tablas",
                "Optimiza consultas básicas",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_11_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Base de datos para sistema web",
                  actividadesDocente:
                    "Enseña diseño de BD relacional. Demuestra SQL. Supervisa implementación. Evalúa normalización y consultas.",
                  actividadesEstudiante:
                    "Diseña modelo E-R. Crea base de datos normalizada. Implementa consultas complejas. Integra con aplicación PHP.",
                  recursos: ["MySQL Workbench", "phpMyAdmin", "Guía de SQL"],
                  tiempoMinutos: 480,
                },
              ],
            },
          ],
        },
        {
          id: "pw_11_u2",
          nombre: "POO y programación híbrida",
          horas: 100,
          competenciaDesarrolloHumano: "Trabajo en equipo",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_11_u2_ra1",
              descripcion:
                "Aplicar principios de Programación Orientada a Objetos en el desarrollo de aplicaciones web.",
              saberesEsenciales: [
                "POO: Clases, objetos, atributos, métodos",
                "Encapsulamiento: Visibilidad, getters, setters",
                "Herencia: Clases padre e hijo, override",
                "Polimorfismo: Interfaces, clases abstractas",
                "Patrones de diseño básicos: MVC, Singleton",
              ],
              indicadoresLogro: [
                "Crea clases con encapsulamiento apropiado",
                "Implementa herencia y polimorfismo",
                "Aplica patrón MVC en aplicaciones web",
                "Organiza código de forma modular",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_11_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Aplicación MVC con PHP",
                  actividadesDocente:
                    "Enseña principios POO. Presenta patrón MVC. Guía refactorización de código. Evalúa arquitectura.",
                  actividadesEstudiante:
                    "Aprende POO con PHP. Refactoriza aplicación a MVC. Crea modelos, vistas y controladores. Documenta arquitectura.",
                  recursos: ["Framework MVC simple", "Guía de POO PHP", "Ejemplos de patrones"],
                  tiempoMinutos: 600,
                },
              ],
            },
            {
              id: "pw_11_u2_ra2",
              descripcion: "Desarrollar aplicaciones web utilizando frameworks modernos.",
              saberesEsenciales: [
                "Frameworks PHP: Laravel o CodeIgniter",
                "Estructura de proyectos",
                "Routing, controladores, modelos",
                "Vistas y templates",
                "ORM y migraciones",
              ],
              indicadoresLogro: [
                "Configura proyecto con framework",
                "Implementa rutas y controladores",
                "Usa ORM para operaciones de BD",
                "Desarrolla aplicación completa con framework",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_11_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Proyecto con Laravel/CodeIgniter",
                  actividadesDocente:
                    "Presenta framework elegido. Demuestra funcionalidades principales. Guía desarrollo de proyecto. Evalúa uso del framework.",
                  actividadesEstudiante:
                    "Instala y configura framework. Desarrolla aplicación CRUD. Usa autenticación del framework. Despliega en servidor.",
                  recursos: ["Documentación del framework", "Composer", "Servidor de desarrollo"],
                  tiempoMinutos: 720,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 3: DISEÑO DE SOFTWARE (UNDÉCIMO)
    {
      id: "ds_11",
      nombre: "Diseño de Software",
      descripcion:
        "Proporciona una guía en el diseño del software acorde a las especificaciones del cliente, para cada componente web y de almacenamiento de datos solicitado.",
      horasTotal: 100,
      unidades: [
        {
          id: "ds_11_u1",
          nombre: "Gestión de calidad de software",
          horas: 52,
          competenciaDesarrolloHumano: "Liderazgo democrático",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_11_u1_ra1",
              descripcion: "Aplicar técnicas de aseguramiento de calidad en el desarrollo de software.",
              saberesEsenciales: [
                "Calidad de software: Concepto, importancia, métricas",
                "Testing: Tipos de pruebas, casos de prueba",
                "Revisiones de código: Code review, pair programming",
                "Documentación: Técnica, de usuario",
              ],
              indicadoresLogro: [
                "Define criterios de calidad de software",
                "Diseña y ejecuta casos de prueba",
                "Realiza revisiones de código",
                "Genera documentación técnica",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_11_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Plan de calidad y testing",
                  actividadesDocente:
                    "Presenta conceptos de QA. Enseña diseño de pruebas. Guía ejecución. Evalúa cobertura.",
                  actividadesEstudiante:
                    "Define criterios de calidad para proyecto. Diseña casos de prueba. Ejecuta pruebas funcionales. Documenta resultados y bugs.",
                  recursos: ["Plantilla de casos de prueba", "Herramientas de testing", "Formato de reporte de bugs"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "ds_11_u1_ra2",
              descripcion: "Explicar las técnicas y métricas utilizadas en las revisiones de software.",
              saberesEsenciales: [
                "Métricas de software: Complejidad ciclomática, líneas de código, cobertura",
                "Herramientas de análisis estático",
                "Estándares de codificación",
              ],
              indicadoresLogro: [
                "Calcula métricas básicas de software",
                "Usa herramientas de análisis de código",
                "Aplica estándares de codificación",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_11_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Análisis de calidad de código",
                  actividadesDocente:
                    "Presenta métricas y herramientas. Demuestra análisis de código. Guía mejoras. Evalúa resultado.",
                  actividadesEstudiante:
                    "Analiza código propio con herramientas. Identifica code smells. Refactoriza según estándares. Documenta mejoras.",
                  recursos: ["SonarQube/ESLint", "Guía de clean code", "Código a analizar"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
        {
          id: "ds_11_u2",
          nombre: "Metodologías ágiles",
          horas: 48,
          competenciaDesarrolloHumano: "Trabajo en equipo",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_11_u2_ra1",
              descripcion: "Aplicar metodologías ágiles en el desarrollo de proyectos de software.",
              saberesEsenciales: [
                "Manifiesto ágil: Valores y principios",
                "Scrum: Roles, eventos, artefactos",
                "Kanban: Tablero, flujo, límites WIP",
                "Herramientas: Trello, Jira, GitHub Projects",
              ],
              indicadoresLogro: [
                "Comprende principios del manifiesto ágil",
                "Participa en eventos Scrum",
                "Gestiona tareas con tablero Kanban",
                "Colabora efectivamente en equipo ágil",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_11_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Proyecto Scrum",
                  actividadesDocente:
                    "Presenta Scrum y sus elementos. Organiza equipos. Facilita eventos. Evalúa participación y entregables.",
                  actividadesEstudiante:
                    "Asume rol en equipo Scrum. Participa en sprints de 2 semanas. Colabora en daily standups. Presenta incremento al final del sprint.",
                  recursos: ["Trello/Jira", "Guía de Scrum", "Plantilla de user stories"],
                  tiempoMinutos: 600,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 4: SOPORTE TI (UNDÉCIMO)
    {
      id: "sti_11",
      nombre: "Soporte TI",
      descripcion:
        "Brindar soporte técnico a usuarios y equipos de cómputo, aplicando metodologías de diagnóstico y resolución de problemas.",
      horasTotal: 160,
      unidades: [
        {
          id: "sti_11_u1",
          nombre: "Introducción a las redes",
          horas: 72,
          competenciaDesarrolloHumano: "Trabajo en equipo",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "sti_11_u1_ra1",
              descripcion:
                "Explicar las características, formas de comunicación y tendencias en redes que afectarán el uso de éstas en las pequeñas y medianas empresas.",
              saberesEsenciales: [
                "Redes de datos: Concepto, tipos, topologías",
                "Modelos de referencia: OSI, TCP/IP",
                "Tendencias: Cloud, IoT, virtualización de redes",
              ],
              indicadoresLogro: [
                "Explica tipos y topologías de red",
                "Describe capas del modelo OSI y TCP/IP",
                "Identifica tendencias en redes empresariales",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de arquitectura de red empresarial",
                  actividadesDocente:
                    "Presenta conceptos de redes empresariales. Muestra casos de estudio. Guía diseño. Evalúa propuesta.",
                  actividadesEstudiante:
                    "Analiza red de empresa ficticia. Identifica componentes y topología. Propone mejoras. Documenta análisis.",
                  recursos: ["Casos de estudio de redes", "Herramientas de diagramación", "Guía de análisis"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "sti_11_u1_ra2",
              descripcion:
                "Configurar los ajustes iniciales en un dispositivo de red utilizando los parámetros de la dirección IP para proporcionar conectividad de extremo a extremo en una red de pequeñas y medianas empresas.",
              saberesEsenciales: [
                "Direccionamiento IP: IPv4, IPv6, subnetting",
                "DHCP: Funcionamiento, configuración",
                "Configuración de switches y routers básica",
                "Cisco IOS: Comandos básicos",
              ],
              indicadoresLogro: [
                "Calcula y asigna direcciones IP",
                "Configura DHCP",
                "Realiza configuración básica de dispositivos Cisco",
                "Verifica conectividad con herramientas de diagnóstico",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Laboratorio de configuración de red",
                  actividadesDocente:
                    "Presenta direccionamiento IP. Demuestra en Packet Tracer. Supervisa práctica. Evalúa configuración.",
                  actividadesEstudiante:
                    "Calcula direcciones para red. Configura router y switches en Packet Tracer. Verifica conectividad. Documenta configuración.",
                  recursos: ["Cisco Packet Tracer", "Guía de comandos IOS", "Ejercicios de subnetting"],
                  tiempoMinutos: 480,
                },
              ],
            },
          ],
        },
        {
          id: "sti_11_u2",
          nombre: "Sistemas operativos",
          horas: 36,
          competenciaDesarrolloHumano: "Autoaprendizaje",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "sti_11_u2_ra1",
              descripcion:
                "Identificar la importancia del trabajo de sistemas operativos de código abierto y licenciados junto con sus procesos de compatibilidad.",
              saberesEsenciales: [
                "Sistemas operativos: Licenciados vs código abierto",
                "Compatibilidad de software y hardware",
                "Selección de SO según requerimientos",
              ],
              indicadoresLogro: [
                "Compara características de SOs",
                "Evalúa compatibilidad de software",
                "Recomienda SO según necesidades",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Comparativa de sistemas operativos",
                  actividadesDocente: "Presenta diferentes SOs. Asigna análisis comparativo. Evalúa recomendaciones.",
                  actividadesEstudiante:
                    "Instala y prueba diferentes SOs. Compara características, rendimiento, compatibilidad. Presenta recomendación fundamentada.",
                  recursos: ["VirtualBox", "ISOs de diferentes SOs", "Formato de comparación"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "sti_11_u2_ra2",
              descripcion:
                "Ilustrar por medio de procesos virtuales los procesos de instalación, configuración y operaciones con sistemas operativos de código abierto y licenciado.",
              saberesEsenciales: [
                "Virtualización: Concepto, ventajas, herramientas",
                "Instalación de SOs en VM",
                "Configuración avanzada de SOs",
              ],
              indicadoresLogro: [
                "Crea y gestiona máquinas virtuales",
                "Instala SOs en entornos virtuales",
                "Configura SOs para diferentes propósitos",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Laboratorio de virtualización",
                  actividadesDocente:
                    "Presenta conceptos de virtualización. Demuestra creación de VMs. Supervisa práctica. Evalúa configuración.",
                  actividadesEstudiante:
                    "Crea VMs con diferentes SOs. Configura red entre VMs. Comparte recursos entre host y guest. Documenta proceso.",
                  recursos: ["VirtualBox/VMware", "ISOs", "Guía de virtualización"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
        {
          id: "sti_11_u3",
          nombre: "Fundamentos de ciberseguridad",
          horas: 52,
          competenciaDesarrolloHumano: "Compromiso ético",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "sti_11_u3_ra1",
              descripcion:
                "Describir los mecanismos de control de acceso a la información, planes de defensa y contingencia ante posibles ataques cibernéticos.",
              saberesEsenciales: [
                "Control de acceso: AAA, RBAC, políticas",
                "Planes de defensa: Firewall, IDS/IPS, antimalware",
                "Planes de contingencia: Backup, DRP, BCP",
              ],
              indicadoresLogro: [
                "Implementa controles de acceso",
                "Configura sistemas de defensa",
                "Diseña plan de contingencia básico",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u3_ra1_a1",
                  perfil: "normal",
                  nombre: "Plan de seguridad empresarial",
                  actividadesDocente:
                    "Presenta componentes de seguridad empresarial. Asigna caso de estudio. Guía desarrollo de plan. Evalúa completitud.",
                  actividadesEstudiante:
                    "Analiza caso de empresa. Identifica activos y riesgos. Diseña controles de acceso. Propone plan de contingencia.",
                  recursos: ["Caso de estudio", "Plantilla de plan de seguridad", "Marco de referencia (NIST)"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "sti_11_u3_ra2",
              descripcion:
                "Explicar la forma de autentificar la identidad de usuarios, proteger el sigilo de comunicaciones personales, transacciones comerciales y bancarias protegiendo la integridad de la información que circula en la red por medio de técnicas criptográficas.",
              saberesEsenciales: [
                "Autenticación: Factores, MFA, biometría",
                "Criptografía aplicada: SSL/TLS, HTTPS, certificados",
                "Protección de transacciones: Firmas digitales, blockchain básico",
              ],
              indicadoresLogro: [
                "Implementa autenticación multifactor",
                "Configura HTTPS en servidor web",
                "Comprende funcionamiento de certificados digitales",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_11_u3_ra2_a1",
                  perfil: "normal",
                  nombre: "Implementación de HTTPS",
                  actividadesDocente:
                    "Explica SSL/TLS y certificados. Demuestra configuración. Supervisa práctica. Evalúa implementación.",
                  actividadesEstudiante:
                    "Genera certificado SSL (Let's Encrypt o self-signed). Configura HTTPS en servidor Apache/Nginx. Verifica funcionamiento. Documenta proceso.",
                  recursos: ["Servidor web", "Certbot/OpenSSL", "Guía de configuración HTTPS"],
                  tiempoMinutos: 240,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// ==================== DUODÉCIMO ====================
export const DUODECIMO = {
  nivel: "Duodécimo",
  subareas: [
    // SUBÁREA 1: TECNOLOGÍAS DE INFORMACIÓN
    {
      id: "ti_12",
      nombre: "Tecnologías de la Información",
      descripcion:
        "Utilizar herramientas y tecnologías digitales emergentes en el contexto de la transformación digital.",
      horasTotal: 52,
      unidades: [
        {
          id: "ti_12_u1",
          nombre: "Tecnologías digitales",
          horas: 52,
          competenciaDesarrolloHumano: "Capacidad de negociación",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ti_12_u1_ra1",
              descripcion:
                "Identificar tecnologías emergentes mundiales y sus puntos de impacto en las organizaciones acorde a los modelos de negocio y mercado local.",
              saberesEsenciales: [
                "Tecnologías visionarias: Era del post digital: inteligencia artificial, realidad extendida, tecnologías de registro distribuido, computación cuántica",
                "Demografía digital: interacciones entre los consumidores digitales",
                "Trabajadores digitales: Cambio de ámbitos laborales por impacto de TI",
                "Ecosistemas seguros: Interconexiones seguras, riesgos de seguridad, servicios y productos",
                "Mercado individual: Satisfacer demandas masivas de consumidores en tiempo real",
              ],
              indicadoresLogro: ["Reconoce las cinco tendencias tecnológicas visionarias del siglo presente"],
              actividadesSugeridas: [
                {
                  id: "ti_12_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Investigación de tecnologías emergentes",
                  actividadesDocente:
                    "Presenta panorama de tecnologías emergentes. Asigna investigación. Organiza presentaciones. Evalúa análisis.",
                  actividadesEstudiante:
                    "Investiga tecnología emergente asignada (IA, blockchain, etc.). Analiza impacto en CR. Presenta hallazgos. Debate con compañeros.",
                  recursos: ["Artículos actualizados", "Reportes de Gartner/McKinsey", "Formato de presentación"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "ti_12_u1_ra2",
              descripcion:
                "Comparar tendencias de tecnologías digitales modernas que permitan la optimización de recursos, mediante la robótica.",
              saberesEsenciales: [
                "Macrotecnologías: Nube y herramientas analíticas, tecnologías de información y operacionales",
                "Experiencia digital, Analíticas, Nube, Realidad digital, El negocio en las tecnologías",
                "Organizaciones alimentarias por las tecnologías de IA",
                "Sin operaciones en un mundo sin servidores (computación en la nube)",
                "Redes avanzadas (conectividad)",
                "Robótica y las interfaces inteligentes: Máquinas, Humanos, Robótica",
              ],
              indicadoresLogro: [
                "Identifica conceptos relacionados con las tendencias tecnológicas como macro tecnologías, nube, interfaces inteligentes entre otros",
                "Describe sistemas de cómputo en los que se aplica las nuevas tendencias tecnológicas",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_12_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Proyecto de automatización con IA",
                  actividadesDocente:
                    "Presenta herramientas de IA accesibles. Guía implementación de proyecto. Evalúa aplicación práctica.",
                  actividadesEstudiante:
                    "Explora herramientas de IA (ChatGPT API, Teachable Machine). Desarrolla proyecto que integre IA. Presenta solución.",
                  recursos: ["APIs de IA", "Teachable Machine", "Guía de implementación"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "ti_12_u1_ra3",
              descripcion:
                "Aplicar tendencias actuales para el aprendizaje automatizado y la asistencia de la robótica en el hogar, aplicando los principios de seguridad cibernética.",
              saberesEsenciales: [
                "Tendencias de hoy: Criptomonedas: sistemas protegidos",
                "Tecnologías utilizadas para propagación de malware",
                "Aprendizaje automatizado (machine learning)",
                "Reglamentos mundiales de protección de datos",
                "Privacidad recargada: Impacto de las TI en los negocios",
                "Robótica: Asistentes de voz en el hogar",
              ],
              indicadoresLogro: [
                "Señala formas de seguridad informática",
                "Explica reglas de Ciberseguridad aplicadas al campo del aprendizaje automatizado",
                "Utiliza tendencias de herramientas digitales de hoy aplicando el reglamento de protección de datos mundiales",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_12_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Asistente de voz con privacidad",
                  actividadesDocente:
                    "Presenta asistentes de voz y privacidad. Guía configuración segura. Evalúa implementación.",
                  actividadesEstudiante:
                    "Explora asistentes de voz (Alexa, Google). Configura privacidad. Analiza datos recolectados. Propone configuración segura.",
                  recursos: [
                    "Dispositivos de asistente (simulados)",
                    "Guías de privacidad",
                    "Checklist de configuración",
                  ],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_12_u1_ra4",
              descripcion: "Aplicar estrategias de negociación que propicien acuerdos exitosos.",
              saberesEsenciales: [
                "Capacidad de negociación: Concepto",
                "Elementos del proceso de una negociación exitosa",
                "Habilidades para la negociación",
                "Estrategias para la negociación",
              ],
              indicadoresLogro: [
                "Reconoce el concepto de capacidad de negociación",
                "Explica las habilidades de una persona negociadora",
                "Determina los elementos de una negociación exitosa",
                "Negocia la ejecución de propuestas de acuerdos viables en el contexto de su área de formación técnica",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_12_u1_ra4_a1",
                  perfil: "normal",
                  nombre: "Negociación de proyecto TI",
                  actividadesDocente:
                    "Presenta escenarios de negociación TI. Organiza simulaciones. Evalúa habilidades de negociación.",
                  actividadesEstudiante:
                    "Participa en simulación de negociación de proyecto. Negocia alcance, tiempo, presupuesto. Reflexiona sobre estrategias usadas.",
                  recursos: ["Casos de negociación TI", "Roles para simulación", "Rúbrica de negociación"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ti_12_u1_ra5",
              descripcion: "Utilizar la red mundial aplicando los principios de responsabilidad social y profesional.",
              saberesEsenciales: [
                "Responsabilidad en la red: Desenvolverse con autonomía",
                "Responsabilidad al usar la red en la vida social y profesional",
                "Beneficios educativos al usar servicios de internet",
              ],
              indicadoresLogro: [
                "Explica responsabilidad y autonomía",
                "Describe formas de desenvolverse con autonomía cuando se usa la red",
                "Integra en su vida social y profesional los beneficios que aporta el uso del internet con responsabilidad",
              ],
              actividadesSugeridas: [
                {
                  id: "ti_12_u1_ra5_a1",
                  perfil: "normal",
                  nombre: "Marca personal profesional",
                  actividadesDocente:
                    "Presenta importancia de marca personal digital. Guía creación de perfiles profesionales. Evalúa presencia en línea.",
                  actividadesEstudiante:
                    "Audita su presencia en línea actual. Crea/optimiza perfil de LinkedIn. Desarrolla portafolio digital. Planifica estrategia de marca personal.",
                  recursos: ["Guía de LinkedIn", "Plantillas de portafolio", "Checklist de marca personal"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 2: PROGRAMACIÓN PARA WEB (DUODÉCIMO)
    {
      id: "pw_12",
      nombre: "Programación para Web",
      descripcion:
        "Programar componentes de software en el entorno del servidor, aplicando lenguajes .net y bases de datos masivas.",
      horasTotal: 200,
      unidades: [
        {
          id: "pw_12_u1",
          nombre: "Programación .net",
          horas: 104,
          competenciaDesarrolloHumano: "Comunicación oral y escrita",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_12_u1_ra1",
              descripcion:
                "Identificar el proceso de construcción de algoritmos, diagramas de flujo y pseudocódigos aplicando los principios de la lógica computacional.",
              saberesEsenciales: [
                "Lógica computacional para .net: Lógica computacional, Algoritmos, Clasificación de algoritmos, Variables, Operadores, Diagramas de flujo",
                "Pseudocódigo en .net: Pseudocódigos, Diagrama de estructuras de decisión, Decisiones simples y compuestas, Ciclos, Arreglos, Matrices",
              ],
              indicadoresLogro: ["Reconoce las secuencias de comandos para algoritmos, diagramas y pseudocódigos"],
              actividadesSugeridas: [
                {
                  id: "pw_12_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Lógica de programación .NET",
                  actividadesDocente:
                    "Presenta fundamentos de lógica para .NET. Guía desarrollo de algoritmos. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Desarrolla algoritmos en pseudocódigo. Crea diagramas de flujo. Traduce a código C#. Documenta proceso.",
                  recursos: ["PSeInt", "Visual Studio", "Guía de algoritmos"],
                  tiempoMinutos: 300,
                },
              ],
            },
            {
              id: "pw_12_u1_ra2",
              descripcion: "Distinguir entornos de desarrollo .net con sentencias de control y ciclos.",
              saberesEsenciales: [
                "Entornos de desarrollo .net con sentencias de control y ciclos: Entorno de desarrollo (IDE), Instalación de programas .net, Entorno de programación",
                "Consulta y buffer de entrada, Palabras reservadas, Literales, Variables, Tipos de datos, Operadores, Constantes, Numeraciones",
                "Sentencias de control: Sentencia if, Sentencia Swith",
                "Ciclos: Ciclo While, Ciclo For",
                "Sentencias de control break continue",
              ],
              indicadoresLogro: [
                "Localiza elementos que componen el entorno de desarrollo .net",
                "Describe elementos que conforman programas usando declaraciones de sentencias de control y ciclos",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Fundamentos de C# y Visual Studio",
                  actividadesDocente:
                    "Presenta entorno Visual Studio. Enseña sintaxis C#. Supervisa ejercicios. Evalúa programas.",
                  actividadesEstudiante:
                    "Instala Visual Studio. Aprende sintaxis C#. Desarrolla programas con control de flujo. Practica con ejercicios graduados.",
                  recursos: ["Visual Studio Community", "Documentación C#", "Ejercicios de programación"],
                  tiempoMinutos: 480,
                },
              ],
            },
            {
              id: "pw_12_u1_ra3",
              descripcion:
                "Desarrollar aplicaciones de las matrices, arreglos y colecciones de objetos utilizando lenguajes de .net.",
              saberesEsenciales: [
                "Métodos, arreglos y colecciones: Métodos y argumentos, Creación de clases, Herencia, Cálculos, Arreglos (Listas, Pilas, Colas), Colecciones, Matrices, Excepciones, Archivos, Interfaces",
                "Ventana de propiedades, Ventana de eventos, Interfaz gráfica, Controles, Botones",
                "Polimorfismo",
              ],
              indicadoresLogro: [
                "Señala elementos relacionados con matrices, arreglos y colecciones",
                "Controla resultados de aplicaciones mediante el uso de excepciones",
                "Elabora aplicaciones que se ejecutan en entornos gráficos, aplicando las estructuras de .net",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u1_ra3_a1",
                  perfil: "normal",
                  nombre: "Aplicación Windows Forms con C#",
                  actividadesDocente:
                    "Presenta Windows Forms. Enseña POO en C#. Guía desarrollo de aplicación. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Desarrolla aplicación con interfaz gráfica. Implementa clases y herencia. Usa colecciones y archivos. Maneja excepciones.",
                  recursos: ["Visual Studio", "Documentación Windows Forms", "Proyecto guiado"],
                  tiempoMinutos: 600,
                },
              ],
            },
            {
              id: "pw_12_u1_ra4",
              descripcion: "Aplicar técnicas de comunicación oral y escrita según su contexto.",
              saberesEsenciales: [
                "Comunicación oral y escrita: Concepto de comunicación oral y comunicación escrita, Lenguaje oral y escrito",
                "Redacción y sus requisitos: Claridad, Precisión, Sencillez y naturalidad, Concisión, Originalidad",
                "Técnicas de expresión oral",
              ],
              indicadoresLogro: [
                "Identifica los elementos de la comunicación oral y escrita",
                "Diferencia características del lenguaje oral y escrito",
                "Genera informes escritos relacionados con el área de formación técnica",
                "Emplea técnicas de expresión oral",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u1_ra4_a1",
                  perfil: "normal",
                  nombre: "Documentación técnica y presentación",
                  actividadesDocente:
                    "Presenta estándares de documentación técnica. Enseña técnicas de presentación. Evalúa comunicación.",
                  actividadesEstudiante:
                    "Redacta documentación técnica de proyecto. Prepara presentación profesional. Expone ante la clase. Recibe retroalimentación.",
                  recursos: ["Plantillas de documentación", "Guía de presentaciones", "Rúbrica de comunicación"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "pw_12_u1_ra5",
              descripcion:
                "Evaluar situaciones de riesgo en el consumo de la red aplicando principios de prevención cibernética contra el ciberbullying, grooming y sexting.",
              saberesEsenciales: [
                "Consumo responsable y moderado de los recursos del internet",
                "Peligros y medidas preventivas en la red: Ciberbullying, Grooming (acoso y abuso sexual), Sexting (fotos, video, mensajes sexuales)",
              ],
              indicadoresLogro: [
                "Comprende cuales peligros se encuentran en la web",
                "Clasifica medidas preventivas contra situaciones de riesgo cibernético que atrae a la juventud",
                "Utiliza la web aplicando los principios de consumo responsable y moderado",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u1_ra5_a1",
                  perfil: "normal",
                  nombre: "Campaña de prevención cibernética",
                  actividadesDocente:
                    "Presenta riesgos cibernéticos para jóvenes. Guía desarrollo de campaña. Evalúa impacto de materiales.",
                  actividadesEstudiante:
                    "Investiga riesgos cibernéticos. Desarrolla materiales de prevención. Crea campaña para redes sociales. Presenta a la comunidad educativa.",
                  recursos: ["Estadísticas de riesgos", "Herramientas de diseño", "Guía de campañas"],
                  tiempoMinutos: 300,
                },
              ],
            },
          ],
        },
        {
          id: "pw_12_u2",
          nombre: "Bases de datos masivas",
          horas: 96,
          competenciaDesarrolloHumano: "Compromiso ético",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "pw_12_u2_ra1",
              descripcion:
                "Identificar las tendencias relacionada con las bases de datos masivas, aplicando principios de seguridad cibernética.",
              saberesEsenciales: [
                "Tendencias de las bases de datos masivas: Concepto Big Data, Importancia, Necesidades masivas, Nuevos dispositivos, Requerimientos Big Data",
                "Evolución del Big Analytics, Nuevas metodologías masivas Powerdata, Sistemas de código abierto (Hadoop)",
                "Mega tendencias: Movilidad, Nube, Social media, Analytics",
                "Análisis en tiempo real",
              ],
              indicadoresLogro: ["Identifica bases de datos masivas (big data) y su impacto actual en la sociedad"],
              actividadesSugeridas: [
                {
                  id: "pw_12_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Introducción a Big Data",
                  actividadesDocente:
                    "Presenta conceptos de Big Data. Muestra casos de uso. Guía investigación. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Investiga aplicaciones de Big Data. Analiza caso de empresa que usa BD masivas. Presenta hallazgos.",
                  recursos: ["Casos de Big Data", "Artículos actualizados", "Formato de análisis"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "pw_12_u2_ra2",
              descripcion:
                "Explicar modelos de análisis de datos en los que se apliquen modelos matemáticos con inteligencia para el procesamiento de información masiva.",
              saberesEsenciales: [
                "Bases de datos masivas (Big Data): Análisis de datos, Minería de datos, Grafos y redes, Recuperación de datos, Almacenamiento de datos",
              ],
              indicadoresLogro: [
                "Reconoce bases de datos masivas",
                "Describe los procesos relacionados con el análisis de datos masivos",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u2_ra2_a1",
                  perfil: "normal",
                  nombre: "Análisis de datos con herramientas modernas",
                  actividadesDocente:
                    "Presenta herramientas de análisis de datos. Demuestra proceso de análisis. Guía práctica. Evalúa resultados.",
                  actividadesEstudiante:
                    "Explora herramientas de análisis (Power BI, Tableau Public). Analiza conjunto de datos real. Crea visualizaciones. Presenta insights.",
                  recursos: ["Power BI/Tableau Public", "Datasets públicos", "Guía de análisis"],
                  tiempoMinutos: 360,
                },
              ],
            },
            {
              id: "pw_12_u2_ra3",
              descripcion:
                "Programar bases de datos aplicando el modelo entidad relación, bases de datos basados en objetos y las pautas para almacenamiento de la información.",
              saberesEsenciales: [
                "Bases de datos: Modelo relacional",
                "Diseño de las bases de datos: Modelo entidad relación, Diagramado, Lenguajes de modelado unificado UML, Interfaces de usuario, Interfaces para web para bases de datos",
                "Bases de datos orientadas a objetos y XML: Estructura, Herencia, Arreglos, Identidad de objetos",
                "Almacenamiento de datos: Indexación, Asociaciones, Estructura de archivos",
                "Transacciones, Consultas, Vistas, Operaciones, Funciones, Frameworks (bibliotecas de archivos)",
              ],
              indicadoresLogro: [
                "Describe sistemas de bases, características generales y usuarios finales que interactúan en las comunicaciones",
                "Explica el modelo relacional de datos y las reglas de integridad",
                "Desarrolla procesos de diseño de bases de datos aplicando el modelo entidad-relación",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u2_ra3_a1",
                  perfil: "normal",
                  nombre: "Sistema de base de datos empresarial",
                  actividadesDocente:
                    "Presenta diseño avanzado de BD. Enseña múltiples motores (MySQL, PostgreSQL, SQL Server). Guía proyecto. Evalúa implementación.",
                  actividadesEstudiante:
                    "Diseña BD empresarial completa. Implementa en al menos 2 motores diferentes. Crea procedimientos almacenados. Conecta con aplicación web.",
                  recursos: ["MySQL, PostgreSQL, SQL Server", "Herramientas de modelado", "Caso empresarial"],
                  tiempoMinutos: 720,
                },
              ],
            },
            {
              id: "pw_12_u2_ra4",
              descripcion:
                "Demostrar conductas que reflejen compromiso ético aplicando principios y valores en las situaciones de aprendizaje que vivencia en el área técnica y en las normas de convivencia con los que le rodean.",
              saberesEsenciales: [
                "Compromiso ético: Concepto",
                "Principios y valores: Respeto, Probidad, Anticorrupción, Compromiso",
              ],
              indicadoresLogro: [
                "Reconoce la importancia del compromiso ético en el desempeño de las situaciones de aprendizaje propias de su área de formación técnica y en la convivencia con otras personas",
                "Discrimina acciones que dan origen a conductas que reflejan falta de compromiso ético",
                "Efectúa con empeño las obligaciones o responsabilidades que se asignan superando los obstáculos que se presentan para el logro de los objetivos trazados",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u2_ra4_a1",
                  perfil: "normal",
                  nombre: "Ética en el desarrollo de software",
                  actividadesDocente: "Presenta dilemas éticos en TI. Facilita debate. Evalúa reflexión crítica.",
                  actividadesEstudiante:
                    "Analiza casos de dilemas éticos (privacidad de datos, IA, etc.). Participa en debate. Redacta código de ética personal para su carrera.",
                  recursos: ["Casos de estudio éticos", "Formato de debate", "Plantilla de código de ética"],
                  tiempoMinutos: 180,
                },
              ],
            },
            {
              id: "pw_12_u2_ra5",
              descripcion: "Aplica normas de convivencia en la red, integrando valores éticos y morales.",
              saberesEsenciales: [
                "Normas de convivencia en la red: Protección de contraseñas de acceso, Consecuencias del uso de internet sin responsabilidad",
                "Respecto a los valores y normas de convivencia requeridos en el uso del internet",
              ],
              indicadoresLogro: [
                "Describe normas de convivencia en la red",
                "Explica formas de protección de acceso a la red",
                "Utiliza principios de seguridad en el uso del internet con normas de convivencia",
              ],
              actividadesSugeridas: [
                {
                  id: "pw_12_u2_ra5_a1",
                  perfil: "normal",
                  nombre: "Netiqueta y convivencia digital",
                  actividadesDocente:
                    "Presenta normas de netiqueta. Analiza casos de mala conducta en línea. Guía reflexión. Evalúa propuestas.",
                  actividadesEstudiante:
                    "Investiga casos de mala conducta en línea. Analiza consecuencias. Propone guía de convivencia digital para la institución.",
                  recursos: ["Casos de estudio", "Guías de netiqueta", "Formato de propuesta"],
                  tiempoMinutos: 180,
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 3: DISEÑO DE SOFTWARE (DUODÉCIMO)
    {
      id: "ds_12",
      nombre: "Diseño de Software",
      descripcion:
        "Enseña todos los procesos relacionados con la gestión y administración de proyectos orientados bajo las tendencias del software, así como herramientas de diseño gráfico requeridas para el modelado de la interfaz gráfica.",
      horasTotal: 100,
      unidades: [
        {
          id: "ds_12_u1",
          nombre: "Administración de proyectos de software",
          horas: 52,
          competenciaDesarrolloHumano: "Solución de problemas",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_12_u1_ra1",
              descripcion:
                "Identificar la importancia del uso de los espectros administrativos en la gestión de proyectos de software.",
              saberesEsenciales: [
                "Espectros administrativos de proyectos de software:",
                "Personal: Participantes, Líderes de equipo, Equipo de software, Equipos ágiles, Conflictos de coordinación y comunicación",
                "El producto: Ámbito del software, Descomposición del problema",
                "El proceso: Fusión de producto y proceso, Descomposición del proceso",
                "El proyecto: Principio WHH de Barry Boehm, Herramientas de software para administradores de proyectos",
              ],
              indicadoresLogro: ["Reconoce los espectros requeridos en la administración de proyectos de software"],
              actividadesSugeridas: [
                {
                  id: "ds_12_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Análisis de gestión de proyectos",
                  actividadesDocente:
                    "Presenta los 4 P's de la gestión de proyectos. Asigna caso de estudio. Guía análisis. Evalúa comprensión.",
                  actividadesEstudiante:
                    "Analiza proyecto de software real. Identifica personal, producto, proceso, proyecto. Propone mejoras de gestión.",
                  recursos: ["Caso de proyecto de software", "Guía de gestión de proyectos", "Formato de análisis"],
                  tiempoMinutos: 240,
                },
              ],
            },
            {
              id: "ds_12_u1_ra2",
              descripcion:
                "Explicar los procesos relacionadas con la planificación de proyectos, aplicando las métricas, actividades y estimaciones de software.",
              saberesEsenciales: [
                "Métricas de proceso y de proyectos: Métricas en el dominio de procesos y proyectos, Medición de software, Métricas para la calidad del software, Integración de métricas en los procesos de software",
                "Actividades en la planificación de proyectos: Estimación, Calendarización, Análisis de riesgos, Planificación de gestión de la calidad, Planificación de gestión de cambio",
                "Estimación para proyectos de software: Procesos de planificación, Ámbito y factibilidad de software, Recursos (Humanos, Reutilizables, Ambientales)",
                "Estimación de proyectos de software, Técnicas de descomposición, Modelos de estimación, Árboles de decisión",
              ],
              indicadoresLogro: [
                "Identifica los pasos para la realización de métricas en los procesos de software",
                "Describe el ámbito del problema y lo organiza mediante las actividades de planificación de proyectos",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_12_u1_ra2_a1",
                  perfil: "normal",
                  nombre: "Plan de proyecto de software",
                  actividadesDocente:
                    "Presenta técnicas de estimación y planificación. Guía desarrollo de plan. Evalúa completitud y realismo.",
                  actividadesEstudiante:
                    "Estima esfuerzo con técnicas de puntos de función. Desarrolla cronograma con dependencias. Identifica y analiza riesgos. Presenta plan de proyecto.",
                  recursos: [
                    "Herramientas de gestión (MS Project, GanttProject)",
                    "Plantillas de estimación",
                    "Formato de plan",
                  ],
                  tiempoMinutos: 360,
                },
              ],
            },
          ],
        },
        {
          id: "ds_12_u2",
          nombre: "Herramientas para diseño web",
          horas: 48,
          competenciaDesarrolloHumano: "Innovación y creatividad",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "ds_12_u2_ra1",
              descripcion: "Utilizar herramientas de diseño gráfico para la creación de interfaces web profesionales.",
              saberesEsenciales: [
                "Herramientas de diseño: Figma, Adobe XD, Sketch",
                "Diseño de interfaces: Sistemas de diseño, componentes reutilizables",
                "Prototipado avanzado: Interacciones complejas, animaciones",
                "Colaboración: Handoff a desarrolladores, especificaciones",
              ],
              indicadoresLogro: [
                "Domina herramientas de diseño profesionales",
                "Crea sistemas de diseño reutilizables",
                "Desarrolla prototipos con interacciones avanzadas",
                "Genera especificaciones para desarrollo",
              ],
              actividadesSugeridas: [
                {
                  id: "ds_12_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Sistema de diseño completo",
                  actividadesDocente:
                    "Presenta sistemas de diseño. Demuestra Figma avanzado. Guía desarrollo. Evalúa calidad y reutilización.",
                  actividadesEstudiante:
                    "Crea sistema de diseño en Figma. Desarrolla librería de componentes. Diseña aplicación completa usando el sistema. Genera especificaciones para desarrollo.",
                  recursos: ["Figma", "Ejemplos de design systems", "Guía de componentes"],
                  tiempoMinutos: 480,
                },
                {
                  id: "ds_12_u2_ra2",
                  descripcion: "Aplicar técnicas de optimización de imágenes y gráficos para web.",
                  saberesEsenciales: [
                    "Formatos de imagen: JPEG, PNG, WebP, SVG",
                    "Optimización: Compresión, responsive images",
                    "Herramientas: Photoshop, GIMP, herramientas en línea",
                    "Gráficos vectoriales: Creación y optimización de SVG",
                  ],
                  indicadoresLogro: [
                    "Selecciona formato de imagen apropiado",
                    "Optimiza imágenes para web",
                    "Crea y edita gráficos vectoriales",
                    "Implementa imágenes responsivas",
                  ],
                  actividadesSugeridas: [
                    {
                      id: "ds_12_u2_ra2_a1",
                      perfil: "normal",
                      nombre: "Optimización de assets para web",
                      actividadesDocente:
                        "Presenta técnicas de optimización. Demuestra herramientas. Supervisa práctica. Evalúa resultados.",
                      actividadesEstudiante:
                        "Optimiza imágenes de proyecto. Crea iconos en SVG. Implementa responsive images. Mide mejora en rendimiento.",
                      recursos: ["Herramientas de optimización", "Editor de imágenes", "Guía de formatos"],
                      tiempoMinutos: 240,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // SUBÁREA 4: SOPORTE TI (DUODÉCIMO)
    {
      id: "sti_12",
      nombre: "Soporte TI",
      descripcion: "Brindar soporte técnico avanzado y servicios de infraestructura en entornos empresariales.",
      horasTotal: 160,
      unidades: [
        {
          id: "sti_12_u1",
          nombre: "Servicios de red empresarial",
          horas: 80,
          competenciaDesarrolloHumano: "Trabajo en equipo",
          ejePoliticaEducativa: "La ciudadanía digital con equidad social",
          resultadosAprendizaje: [
            {
              id: "sti_12_u1_ra1",
              descripcion: "Configurar servicios de red para entornos empresariales.",
              saberesEsenciales: [
                "Servicios de red: DNS, DHCP, Active Directory",
                "Servidores web: Apache, Nginx, IIS",
                "Servicios de correo: Conceptos, configuración básica",
                "Virtualización de servidores: VMware, Hyper-V, Proxmox",
              ],
              indicadoresLogro: [
                "Configura servicios DNS y DHCP",
                "Administra Active Directory básico",
                "Instala y configura servidores web",
                "Gestiona servidores virtualizados",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_12_u1_ra1_a1",
                  perfil: "normal",
                  nombre: "Infraestructura de servidor Windows/Linux",
                  actividadesDocente:
                    "Presenta servicios de red empresariales. Demuestra configuración. Supervisa práctica. Evalúa funcionalidad.",
                  actividadesEstudiante:
                    "Configura AD con DNS y DHCP. Instala servidor web. Une clientes al dominio. Documenta configuración.",
                  recursos: ["Windows Server/Ubuntu Server", "VMs", "Guía de configuración"],
                  tiempoMinutos: 720,
                },
              ],
            },
          ],
        },
        {
          id: "sti_12_u2",
          nombre: "Eficiencia energética y sostenibilidad TI",
          horas: 80,
          competenciaDesarrolloHumano: "Discernimiento y responsabilidad",
          ejePoliticaEducativa: "Educación para el desarrollo sostenible",
          resultadosAprendizaje: [
            {
              id: "sti_12_u2_ra1",
              descripcion: "Aplicar medidas de eficiencia energética en infraestructura TI.",
              saberesEsenciales: [
                "Eficiencia energética en TI: Green IT, métricas PUE",
                "Gestión de energía: Power management, virtualización para ahorro",
                "Disposición responsable: E-waste, reciclaje de equipos",
                "Legislación ambiental relacionada con TI",
              ],
              indicadoresLogro: [
                "Calcula consumo energético de infraestructura",
                "Implementa medidas de ahorro energético",
                "Gestiona disposición responsable de equipos",
                "Conoce legislación ambiental aplicable",
              ],
              actividadesSugeridas: [
                {
                  id: "sti_12_u2_ra1_a1",
                  perfil: "normal",
                  nombre: "Plan de TI verde",
                  actividadesDocente:
                    "Presenta conceptos de Green IT. Guía auditoría energética. Evalúa plan de mejora.",
                  actividadesEstudiante:
                    "Audita consumo energético del laboratorio. Identifica oportunidades de ahorro. Propone plan de TI verde. Calcula retorno de inversión.",
                  recursos: ["Medidores de consumo", "Guía de Green IT", "Formato de plan"],
                  tiempoMinutos: 360,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

// ==================== HELPERS ====================
export function getSubareasByLevel(level) {
  switch (level) {
    case "10":
    case "decimo":
      return DECIMO.subareas
    case "11":
    case "undecimo":
      return UNDECIMO.subareas
    case "12":
    case "duodecimo":
      return DUODECIMO.subareas
    default:
      return []
  }
}

export function getUnidadesBySubarea(level, subareaId) {
  const subareas = getSubareasByLevel(level)
  const subarea = subareas.find((s) => s.id === subareaId)
  return subarea ? subarea.unidades : []
}

export function getResultadosByUnidad(level, subareaId, unidadId) {
  const unidades = getUnidadesBySubarea(level, subareaId)
  const unidad = unidades.find((u) => u.id === unidadId)
  return unidad ? unidad.resultadosAprendizaje : []
}

export function getAllData() {
  return {
    especialidad: ESPECIALIDAD,
    competenciasDesarrolloHumano: COMPETENCIAS_DESARROLLO_HUMANO,
    ejesPoliticaEducativa: EJES_POLITICA_EDUCATIVA,
    decimo: DECIMO,
    undecimo: UNDECIMO,
    duodecimo: DUODECIMO,
  }
}

function transformSubareasForGenerator(subareas) {
  return subareas.map((subarea) => ({
    id: subarea.id,
    name: subarea.nombre,
    totalHours: subarea.horasTotal,
    units: subarea.unidades.map((unidad) => ({
      id: unidad.id,
      name: unidad.nombre,
      hours: unidad.horas,
      results: unidad.resultadosAprendizaje.map((ra) => ({
        id: ra.id,
        description: ra.descripcion,
        saberes: ra.saberesEsenciales,
        indicators: ra.indicadoresLogro, // Changed from ra.indicadores to ra.indicadoresLogro
        hours: ra.horas, // Assuming this should be hours per result, if not, it needs clarification.
        activities:
          ra.actividadesSugeridas?.map((act) => ({
            id: act.id,
            name: act.nombre,
            hours: (act.tiempo || 60) / 60,
            profile: act.perfil || "normal",
            teacherActivities: act.actividadesDocente, // Changed from act.docente to act.actividadesDocente
            studentActivities: act.actividadesEstudiante, // Changed from act.estudiante to act.actividadesEstudiante
            resources: act.recursos,
            // The following line `saberes: ra.saberesEsenciales` is redundant if it's already available in the parent scope.
            // It's kept here as it was in the original update, but consider removing if not strictly needed.
            saberes: ra.saberesEsenciales,
            evidencias: act.evidencias || {
              conocimiento: "Prueba escrita",
              desempeno: "Observacion del proceso",
              producto: "Proyecto o producto final",
            },
          })) || [],
      })),
    })),
  }))
}

// Mapa de subareas por nivel para compatibilidad con paginas existentes
export const DESARROLLO_WEB_SUBAREAS = {
  10: transformSubareasForGenerator(DECIMO.subareas),
  11: transformSubareasForGenerator(UNDECIMO.subareas),
  12: transformSubareasForGenerator(DUODECIMO.subareas),
  decimo: transformSubareasForGenerator(DECIMO.subareas),
  undecimo: transformSubareasForGenerator(UNDECIMO.subareas),
  duodecimo: transformSubareasForGenerator(DUODECIMO.subareas),
}

// Mapa de niveles para navegacion
export const gradeLevels = {
  decimo: {
    nombre: "Décimo",
    subareas: DECIMO.subareas.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      horas: s.horasTotal,
    })),
  },
  undecimo: {
    nombre: "Undécimo",
    subareas: UNDECIMO.subareas.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      horas: s.horasTotal,
    })),
  },
  duodecimo: {
    nombre: "Duodécimo",
    subareas: DUODECIMO.subareas.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      horas: s.horasTotal,
    })),
  },
}

// Estudiantes de ejemplo para pruebas
export const SAMPLE_STUDENTS = [
  // Grupo 10-1 Desarrollo Web
  {
    id: "est1",
    nombre: "María José González Solano",
    cedula: "1-2345-6789",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "maria.gonzalez@estudiante.cr",
  },
  {
    id: "est2",
    nombre: "José Daniel Rodríguez Mora",
    cedula: "2-3456-7890",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "jose.rodriguez@estudiante.cr",
  },
  {
    id: "est3",
    nombre: "Ana Lucía Jiménez Vargas",
    cedula: "3-4567-8901",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "ana.jimenez@estudiante.cr",
  },
  {
    id: "est4",
    nombre: "Kevin Andrés Pérez Castro",
    cedula: "3-5678-9012",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "kevin.perez@estudiante.cr",
  },
  {
    id: "est5",
    nombre: "Daniela María Mora Rojas",
    cedula: "4-6789-0123",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: "Alta dotación",
    email: "daniela.mora@estudiante.cr",
  },
  {
    id: "est6",
    nombre: "Luis Fernando Araya Solís",
    cedula: "1-7890-1234",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "luis.araya@estudiante.cr",
  },
  {
    id: "est7",
    nombre: "Valeria Nicole Hernández López",
    cedula: "2-8901-2345",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "valeria.hernandez@estudiante.cr",
  },
  {
    id: "est8",
    nombre: "Sebastián Alonso Quesada Ureña",
    cedula: "3-9012-3456",
    seccion: "10-1",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "sebastian.quesada@estudiante.cr",
  },

  // Grupo 10-2 Desarrollo Web
  {
    id: "est9",
    nombre: "Carlos Alberto Hernández Solís",
    cedula: "4-5678-9012",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: "Alta dotación",
    email: "carlos.hernandez@estudiante.cr",
  },
  {
    id: "est10",
    nombre: "Laura Pamela Mora Castillo",
    cedula: "5-6789-0123",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "laura.mora@estudiante.cr",
  },
  {
    id: "est11",
    nombre: "Gabriel Alejandro Vindas Chacón",
    cedula: "1-0123-4567",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "gabriel.vindas@estudiante.cr",
  },
  {
    id: "est12",
    nombre: "Isabella Sofía Calderón Núñez",
    cedula: "2-1234-5678",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "isabella.calderon@estudiante.cr",
  },
  {
    id: "est13",
    nombre: "Matías Eduardo Ramírez Zúñiga",
    cedula: "3-2345-6789",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "matias.ramirez@estudiante.cr",
  },
  {
    id: "est14",
    nombre: "Camila Andrea Brenes Varela",
    cedula: "4-3456-7890",
    seccion: "10-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "camila.brenes@estudiante.cr",
  },

  // Grupo 11-1 Desarrollo Web
  {
    id: "est15",
    nombre: "Diego Andrés Vargas Núñez",
    cedula: "6-7890-1234",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "diego.vargas@estudiante.cr",
  },
  {
    id: "est16",
    nombre: "Sofía Valentina Castro Méndez",
    cedula: "7-8901-2345",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "sofia.castro@estudiante.cr",
  },
  {
    id: "est17",
    nombre: "Emmanuel José Fallas Cordero",
    cedula: "1-4567-8901",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "emmanuel.fallas@estudiante.cr",
  },
  {
    id: "est18",
    nombre: "Natalia Fernanda Rojas Soto",
    cedula: "2-5678-9012",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: "Alta dotación",
    email: "natalia.rojas@estudiante.cr",
  },
  {
    id: "est19",
    nombre: "Josué David Sandoval Arce",
    cedula: "3-6789-0123",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "josue.sandoval@estudiante.cr",
  },
  {
    id: "est20",
    nombre: "Paola María Villalobos Quirós",
    cedula: "4-7890-1234",
    seccion: "11-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "paola.villalobos@estudiante.cr",
  },

  // Grupo 11-2 Desarrollo Web
  {
    id: "est21",
    nombre: "Andrés Felipe Sánchez López",
    cedula: "8-9012-3456",
    seccion: "11-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "andres.sanchez@estudiante.cr",
  },
  {
    id: "est22",
    nombre: "María Fernanda Arias Benavides",
    cedula: "1-8901-2345",
    seccion: "11-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "mariaf.arias@estudiante.cr",
  },
  {
    id: "est23",
    nombre: "Bryan Steven Corrales Madrigal",
    cedula: "2-9012-3456",
    seccion: "11-2",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "bryan.corrales@estudiante.cr",
  },
  {
    id: "est24",
    nombre: "Katherine Nicole Agüero Porras",
    cedula: "3-0123-4567",
    seccion: "11-2",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "katherine.aguero@estudiante.cr",
  },

  // Grupo 12-1 Desarrollo Web
  {
    id: "est25",
    nombre: "Valentina Marcela Rojas Araya",
    cedula: "9-0123-4567",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "valentina.rojas@estudiante.cr",
  },
  {
    id: "est26",
    nombre: "Mateo Alejandro Fernández Ureña",
    cedula: "1-1234-5678",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: "Alta dotación",
    email: "mateo.fernandez@estudiante.cr",
  },
  {
    id: "est27",
    nombre: "Fabiana Nicole Monge Salazar",
    cedula: "2-2345-6789",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "fabiana.monge@estudiante.cr",
  },
  {
    id: "est28",
    nombre: "Esteban José Montero Alfaro",
    cedula: "3-3456-7890",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "esteban.montero@estudiante.cr",
  },
  {
    id: "est29",
    nombre: "Mariana Isabel Vega Guzmán",
    cedula: "4-4567-8901",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: "DUA",
    email: "mariana.vega@estudiante.cr",
  },
  {
    id: "est30",
    nombre: "Jonathan David Bonilla Salas",
    cedula: "5-5678-9012",
    seccion: "12-1",
    especialidad: "Desarrollo Web",
    adecuacion: null,
    email: "jonathan.bonilla@estudiante.cr",
  },

  // Grupo 10-1 Contabilidad
  {
    id: "est31",
    nombre: "Andrea Melissa Soto Campos",
    cedula: "1-6789-0123",
    seccion: "10-1",
    especialidad: "Contabilidad",
    adecuacion: null,
    email: "andrea.soto@estudiante.cr",
  },
  {
    id: "est32",
    nombre: "Roberto Carlos Chaves Méndez",
    cedula: "2-7890-1234",
    seccion: "10-1",
    especialidad: "Contabilidad",
    adecuacion: null,
    email: "roberto.chaves@estudiante.cr",
  },
  {
    id: "est33",
    nombre: "Stephanie Nicole Porras Villegas",
    cedula: "3-8901-2345",
    seccion: "10-1",
    especialidad: "Contabilidad",
    adecuacion: "DUA",
    email: "stephanie.porras@estudiante.cr",
  },

  // Grupo 10-1 Electrónica
  {
    id: "est34",
    nombre: "Jason Andrés Martínez Solano",
    cedula: "4-9012-3456",
    seccion: "10-1",
    especialidad: "Electrónica",
    adecuacion: null,
    email: "jason.martinez@estudiante.cr",
  },
  {
    id: "est35",
    nombre: "Karla Daniela Ureña Castro",
    cedula: "5-0123-4567",
    seccion: "10-1",
    especialidad: "Electrónica",
    adecuacion: "Alta dotación",
    email: "karla.urena@estudiante.cr",
  },
]

export const SAMPLE_GROUPS = [
  // Desarrollo Web
  {
    id: "g1",
    nombre: "10-1",
    nivel: "decimo",
    especialidad: "Desarrollo Web",
    cantidadEstudiantes: 8,
    turno: "Diurno",
    aula: "Lab 1",
  },
  {
    id: "g2",
    nombre: "10-2",
    nivel: "decimo",
    especialidad: "Desarrollo Web",
    cantidadEstudiantes: 6,
    turno: "Diurno",
    aula: "Lab 2",
  },
  {
    id: "g3",
    nombre: "11-1",
    nivel: "undecimo",
    especialidad: "Desarrollo Web",
    cantidadEstudiantes: 6,
    turno: "Diurno",
    aula: "Lab 1",
  },
  {
    id: "g4",
    nombre: "11-2",
    nivel: "undecimo",
    especialidad: "Desarrollo Web",
    cantidadEstudiantes: 4,
    turno: "Diurno",
    aula: "Lab 2",
  },
  {
    id: "g5",
    nombre: "12-1",
    nivel: "duodecimo",
    especialidad: "Desarrollo Web",
    cantidadEstudiantes: 6,
    turno: "Diurno",
    aula: "Lab 1",
  },
  // Contabilidad
  {
    id: "g6",
    nombre: "10-1",
    nivel: "decimo",
    especialidad: "Contabilidad",
    cantidadEstudiantes: 3,
    turno: "Diurno",
    aula: "Aula 5",
  },
  {
    id: "g7",
    nombre: "11-1",
    nivel: "undecimo",
    especialidad: "Contabilidad",
    cantidadEstudiantes: 25,
    turno: "Diurno",
    aula: "Aula 6",
  },
  // Electrónica
  {
    id: "g8",
    nombre: "10-1",
    nivel: "decimo",
    especialidad: "Electrónica",
    cantidadEstudiantes: 2,
    turno: "Vespertino",
    aula: "Taller 1",
  },
  {
    id: "g9",
    nombre: "11-1",
    nivel: "undecimo",
    especialidad: "Electrónica",
    cantidadEstudiantes: 18,
    turno: "Vespertino",
    aula: "Taller 1",
  },
  // Secretariado
  {
    id: "g10",
    nombre: "10-1",
    nivel: "decimo",
    especialidad: "Secretariado Ejecutivo",
    cantidadEstudiantes: 22,
    turno: "Diurno",
    aula: "Aula 8",
  },
]

// Instituciones de ejemplo
export const INSTITUCIONES = [
  // San José
  { nombre: "CTP José Figueres Ferrer", canton: "Desamparados", provincia: "San José" },
  { nombre: "CTP de Gravilias", canton: "Desamparados", provincia: "San José" },
  { nombre: "CTP de Dos Cercas", canton: "Desamparados", provincia: "San José" },
  { nombre: "CTP Monseñor Sanabria", canton: "Desamparados", provincia: "San José" },
  { nombre: "CTP de Aserrí", canton: "Aserrí", provincia: "San José" },
  { nombre: "CTP de Acosta", canton: "Acosta", provincia: "San José" },
  { nombre: "CTP de Puriscal", canton: "Puriscal", provincia: "San José" },
  { nombre: "CTP Don Bosco", canton: "San José", provincia: "San José" },
  // Alajuela
  { nombre: "CTP de Alajuela", canton: "Alajuela", provincia: "Alajuela" },
  { nombre: "CTP de San Carlos", canton: "San Carlos", provincia: "Alajuela" },
  { nombre: "CTP de Grecia", canton: "Grecia", provincia: "Alajuela" },
  { nombre: "CTP de Naranjo", canton: "Naranjo", provincia: "Alajuela" },
  { nombre: "CTP de Palmares", canton: "Palmares", provincia: "Alajuela" },
  { nombre: "CTP de San Ramón", canton: "San Ramón", provincia: "Alajuela" },
  { nombre: "CTP de Upala", canton: "Upala", provincia: "Alajuela" },
  { nombre: "CTP de Los Chiles", canton: "Los Chiles", provincia: "Alajuela" },
  // Cartago
  { nombre: "CTP de Cartago", canton: "Cartago", provincia: "Cartago" },
  { nombre: "CTP de Pacayas", canton: "Alvarado", provincia: "Cartago" },
  { nombre: "CTP de Turrialba", canton: "Turrialba", provincia: "Cartago" },
  { nombre: "CTP de Paraíso", canton: "Paraíso", provincia: "Cartago" },
  { nombre: "CTP Carlos Manuel Vicente Castro", canton: "La Unión", provincia: "Cartago" },
  // Heredia
  { nombre: "CTP de Heredia", canton: "Heredia", provincia: "Heredia" },
  { nombre: "CTP de Belén", canton: "Belén", provincia: "Heredia" },
  { nombre: "CTP de Sarapiquí", canton: "Sarapiquí", provincia: "Heredia" },
  { nombre: "CTP de Flores", canton: "Flores", provincia: "Heredia" },
  // Guanacaste
  { nombre: "CTP de Nicoya", canton: "Nicoya", provincia: "Guanacaste" },
  { nombre: "CTP de Santa Cruz", canton: "Santa Cruz", provincia: "Guanacaste" },
  { nombre: "CTP de Liberia", canton: "Liberia", provincia: "Guanacaste" },
  { nombre: "CTP de Cañas", canton: "Cañas", provincia: "Guanacaste" },
  { nombre: "CTP de La Cruz", canton: "La Cruz", provincia: "Guanacaste" },
  // Puntarenas
  { nombre: "CTP de Puntarenas", canton: "Puntarenas", provincia: "Puntarenas" },
  { nombre: "CTP de Esparza", canton: "Esparza", provincia: "Puntarenas" },
  { nombre: "CTP de Buenos Aires", canton: "Buenos Aires", provincia: "Puntarenas" },
  { nombre: "CTP de Quepos", canton: "Aguirre", provincia: "Puntarenas" },
  { nombre: "CTP de Osa", canton: "Osa", provincia: "Puntarenas" },
  { nombre: "CTP de Golfito", canton: "Golfito", provincia: "Puntarenas" },
  // Limón
  { nombre: "CTP de Limón", canton: "Limón", provincia: "Limón" },
  { nombre: "CTP de Pococí", canton: "Pococí", provincia: "Limón" },
  { nombre: "CTP de Siquirres", canton: "Siquirres", provincia: "Limón" },
  { nombre: "CTP de Guácimo", canton: "Guácimo", provincia: "Limón" },
  { nombre: "CTP de Talamanca", canton: "Talamanca", provincia: "Limón" },
]

// </CHANGE> Especialidades de Educacion Tecnica del MEP
export const ESPECIALIDADES_TECNICAS = [
  { id: "desarrollo-web", nombre: "Desarrollo Web", area: "Tecnologías de Información" },
  { id: "redes-informaticas", nombre: "Redes Informáticas", area: "Tecnologías de Información" },
  { id: "programacion", nombre: "Programación", area: "Tecnologías de Información" },
  { id: "diseño-grafico", nombre: "Diseño Gráfico", area: "Tecnologías de Información" },
  { id: "contabilidad", nombre: "Contabilidad", area: "Comercial y Servicios" },
  { id: "secretariado", nombre: "Secretariado Ejecutivo", area: "Comercial y Servicios" },
  { id: "turismo", nombre: "Turismo", area: "Comercial y Servicios" },
  { id: "banca-finanzas", nombre: "Banca y Finanzas", area: "Comercial y Servicios" },
  { id: "ejecutivo-centros-servicio", nombre: "Ejecutivo para Centros de Servicio", area: "Comercial y Servicios" },
  { id: "electronica", nombre: "Electrónica", area: "Industrial" },
  { id: "electrotecnia", nombre: "Electrotecnia", area: "Industrial" },
  { id: "mecanica-precision", nombre: "Mecánica de Precisión", area: "Industrial" },
  { id: "dibujo-arquitectonico", nombre: "Dibujo Arquitectónico", area: "Industrial" },
  { id: "refrigeracion", nombre: "Refrigeración y Aire Acondicionado", area: "Industrial" },
  { id: "automotriz", nombre: "Automotriz", area: "Industrial" },
  { id: "agropecuario", nombre: "Agropecuario", area: "Agropecuaria" },
  { id: "agroindustria", nombre: "Agroindustria Alimentaria", area: "Agropecuaria" },
  { id: "agroecologia", nombre: "Agroecología", area: "Agropecuaria" },
  { id: "salud-ocupacional", nombre: "Salud Ocupacional", area: "Comercial y Servicios" },
  { id: "gastronomia", nombre: "Gastronomía", area: "Comercial y Servicios" },
]

export const NIVELES_EDUCATIVOS = [
  { id: "preescolar", nombre: "Preescolar", grados: ["Interactivo I", "Interactivo II", "Transición"] },
  { id: "primaria", nombre: "Primaria", grados: ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"] },
  {
    id: "secundaria-academica",
    nombre: "Secundaria Académica",
    grados: ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"],
  },
  { id: "secundaria-tecnica", nombre: "Secundaria Técnica", grados: ["Décimo", "Undécimo", "Duodécimo"] },
]

// Componentes de evaluación según normativa MEP para Educación Técnica
export const MEP_EVALUATION_COMPONENTS = {
  trabajo_cotidiano: {
    nombre: "Trabajo Cotidiano",
    porcentaje: 40,
    descripcion: "Trabajos en clase, prácticas, ejercicios, participación",
  },
  trabajo_extraclase: {
    nombre: "Trabajo Extraclase",
    porcentaje: 10,
    descripcion: "Tareas, investigaciones, proyectos asignados para el hogar",
  },
  pruebas: {
    nombre: "Pruebas",
    porcentaje: 35,
    descripcion: "Pruebas escritas, orales, prácticas o de ejecución",
  },
  proyecto: {
    nombre: "Proyecto",
    porcentaje: 10,
    descripcion: "Proyectos integradores de la subárea",
  },
  asistencia: {
    nombre: "Asistencia",
    porcentaje: 5,
    descripcion: "Asistencia y puntualidad a lecciones",
  },
}
