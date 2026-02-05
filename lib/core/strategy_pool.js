// 🎲 POOL DE ESTRATEGIAS CALEIDOSCOPIO (VARIEDAD DUA 3.0)

export const STRATEGY_BANK = {
  // --- TECNOLOGÍA Y CÓDIGO ---
  HARD_TECH: {
    connection: [
      "Análisis de 'Fallo Épico' (CrowdStrike/SolarWinds).",
      "Reto Flash: Desencriptar mensaje en pizarra.",
      "Debate: Ética del Hacking (White Hat vs Black Hat).",
      "Video: 'Un día en la vida de un DevOps'.",
    ],
    construction: [
      {
        activity: "Laboratorio CTF (Capture The Flag)",
        evidence: "Bandera Digital",
      },
      {
        activity: "Pair Programming (Conductor/Navegante)",
        evidence: "Commit en GitHub",
      },
      {
        activity: "Despliegue de Container (Docker)",
        evidence: "Screenshot de Terminal",
      },
      {
        activity: "Auditoría de Seguridad de Red",
        evidence: "Informe de Vulnerabilidades",
      },
    ],
    tasks: [
      "Investigación CVE Recientes",
      "Diagrama de Topología",
      "Script de Automatización",
    ],
  },

  // --- CIENCIAS EXACTAS ---
  SCIENCE: {
    connection: [
      "Experimento Discrepante (Magia vs Ciencia).",
      "Noticia Científica: Impacto del Cambio Climático local.",
      "Pregunta Retadora: '¿Por qué el cielo es azul?'",
      "Observación de muestra incógnita al microscopio.",
    ],
    construction: [
      { activity: "Laboratorio de Indagación Abierta", evidence: "V de Gowin" },
      {
        activity: "Simulación PHET (Laboratorio Virtual)",
        evidence: "Hoja de Datos",
      },
      {
        activity: "Recolección de muestras biológicas en campo",
        evidence: "Muestrario Físico",
      },
      { activity: "Diseño de Terrario/Ecosistema", evidence: "Prototipo" },
    ],
    tasks: [
      "Reporte de Laboratorio",
      "Infografía de Especie Nativa",
      "Cálculo Estequiométrico",
    ],
  },

  // --- SERVICIOS Y TURISMO ---
  SERVICE: {
    connection: [
      "Video reacción: 'El cliente imposible'.",
      "Roleplay: La llamada de queja.",
      "Análisis de Tripadvisor (Reviews reales).",
      "Dinámica: El Teléfono Chocho Corporativo.",
    ],
    construction: [
      {
        activity: "Simulación de Check-In/Check-Out",
        evidence: "Lista de Cotejo",
      },
      {
        activity: "Diseño de Itinerario Turístico",
        evidence: "Brochure Digital",
      },
      {
        activity: "Montaje de Mesa (Etiqueta y Protocolo)",
        evidence: "Video Evidencia",
      },
      { activity: "Guion de Atención de Crisis", evidence: "Documento PDF" },
    ],
    tasks: [
      "Glosario Técnico Bilingüe",
      "Mapa de Ruta Turística",
      "Ensayo de Servicio al Cliente",
    ],
  },

  // --- ARTES Y DEPORTES (NUEVO) ---
  INDUSTRIAL: {
    // Usamos INDUSTRIAL como catch-all para destrezas físicas
    connection: [
      "Calentamiento lúdico con música.",
      "Análisis de video: Técnica de atletas olímpicos.",
      "Apreciación Artística: '¿Qué sientes con esta obra?'",
      "Historia del Deporte/Arte.",
    ],
    construction: [
      {
        activity: "Circuito de habilidades motrices",
        evidence: "Registro de Tiempos",
      },
      {
        activity: "Taller de composición artística (Boceto)",
        evidence: "Obra final",
      },
      {
        activity: "Ejecución de instrumento musical",
        evidence: "Grabación de Audio",
      },
      {
        activity: "Partido/Torneo con roles rotativos",
        evidence: "Planilla de Juego",
      },
    ],
    tasks: [
      "Plan de Entrenamiento Personal",
      "Reseña Artística",
      "Bitácora de Progreso",
    ],
  },

  // --- HUMANIDADES E IDIOMAS (ACADEMIC) ---
  ACADEMIC: {
    connection: [
      "Lluvia de ideas en Mentimeter.",
      "Lectura de titular polémico.",
      "Canción en idioma meta (Gap Fill).",
      "Dilema Moral (Filosofía/Cívica).",
    ],
    construction: [
      {
        activity: "Debate Socrático (Mesa Redonda)",
        evidence: "Rúbrica de Argumentación",
      },
      { activity: "Ensayo Argumentativo", evidence: "Documento Texto" },
      {
        activity: "Roleplay de Conversación (Idiomas)",
        evidence: "Audio en Vocaroo",
      },
      { activity: "Línea del Tiempo Histórica", evidence: "Mural Digital" },
    ],
    tasks: ["Ensayo Crítico", "Vocabulario Contextual", "Resumen Ejecutivo"],
  },
};

export function getRandomStrategy(type, moment) {
  // Fallback inteligente
  const pool = STRATEGY_BANK[type] || STRATEGY_BANK.ACADEMIC;

  // Selección según momento
  let options = [];
  if (moment.includes("CONEXIÓN") || moment.includes("1"))
    options = pool.connection;
  else if (moment.includes("CONSTRUCCIÓN") || moment.includes("3"))
    options = pool.construction;
  else return "Actividad de mediación docente adaptada."; // Fallback seguro

  const selected = options[Math.floor(Math.random() * options.length)];
  return selected; // Puede ser string u objeto
}
