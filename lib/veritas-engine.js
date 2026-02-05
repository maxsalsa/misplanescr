/**
 * VERITAS ENGINE V1.0 (QUALITY ASSURANCE)
 * "Trust, but Verify"
 *
 * Capabilities:
 * - Enforces "Trusted Sources" in search queries.
 * - Appends "Solucionarios" (Answer Keys) to assessments.
 * - Generates Tracking Tools (Semáforo, Tickets).
 * - Adds Safety Net Disclaimers.
 */

export const TRUSTED_SOURCES = {
  COSTA_RICA: [
    "site:mep.go.cr",
    "site:uned.ac.cr",
    "site:colypro.com",
    "site:ucr.ac.cr",
    "site:tec.ac.cr",
  ],
  GLOBAL: [
    "site:khanacademy.org",
    "site:nationalgeographic.com",
    "site:ted.com",
    "site:unesco.org",
  ],
};

/**
 * Generates a "Smart Search Query" optimized for trusted results.
 * @param {string} topic - The topic to search for.
 * @param {string} scope - "CR" or "GLOBAL".
 */
export function generateSmartQuery(topic, scope = "CR") {
  const sources =
    scope === "GLOBAL" ? TRUSTED_SOURCES.GLOBAL : TRUSTED_SOURCES.COSTA_RICA;
  // Construct a query like: "Fotosíntesis (site:mep.go.cr OR site:uned.ac.cr)"
  const sourceString = sources.join(" OR ");
  return `${topic} (${sourceString})`;
}

/**
 * WRAPS an Assessment with its Solucionario.
 * @param {object} assessment - The assessment object (Quiz, Trivia).
 */
export function attachSolucionario(assessment) {
  if (!assessment.questions) return assessment;

  const answerKey = assessment.questions.map((q, i) => ({
    item: i + 1,
    correct_answer: q.correct,
    concept: q.concept || "General Knowledge",
    explanation: q.explanation || "Ver material de clase.",
  }));

  return {
    ...assessment,
    solucionario: {
      title: `Guía de Calificación (Docente): ${assessment.title}`,
      keys: answerKey,
      note: "Para uso exclusivo del docente. No distribuir a estudiantes antes de la prueba.",
    },
  };
}

/**
 * GENERATES TRACKING TOOLS (Seguimiento).
 * @param {string} type - "TRAFFIC_LIGHT", "LOG", "EXIT_TICKET".
 */
export function generateTrackingTool(type) {
  switch (type) {
    case "TRAFFIC_LIGHT":
      return {
        title: "Semáforo de Aprendizaje",
        instruction:
          "Estudiantes: Coloquen su post-it en el color correspondiente.",
        levels: [
          { color: "Rojo", meaning: "Alto. Necesito ayuda inmediata." },
          { color: "Amarillo", meaning: "Tengo dudas, pero puedo avanzar." },
          { color: "Verde", meaning: "Listo. Entendí todo." },
        ],
      };
    case "LOG":
      return {
        title: "Bitácora de Proceso (Metacognición)",
        questions: [
          "¿Qué desafío enfrenté?",
          "¿Cómo lo resolví?",
          "¿Qué herramienta fue más útil?",
        ],
      };
    case "EXIT_TICKET":
    default:
      return {
        title: "Tiquete de Salida",
        questions: [
          "1 idea nueva que aprendí hoy.",
          "1 duda que todavía tengo.",
        ],
        format: "Papel o Digital (Form)",
      };
  }
}

/**
 * Adds a Safety Disclaimer if needed.
 */
export function addSafetyDisclaimer(content) {
  return {
    ...content,
    safety_net:
      "⚠️ Docente: Se sugiere revisar el contenido antes de proyectarlo para asegurar adecuación al contexto específico del grupo.",
  };
}
