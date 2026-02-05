/**
 * TITAN ENGINE V1.0 (DEVELOPMENTAL PSYCHOLOGY)
 * "The Cognitive Architect"
 *
 * Capabilities:
 * - Adapts Pedagogical Tone and Strategy to the Student's Cycle (Preschool -> Diversified).
 * - Enforces "Graduality Rule" (Forbidden items per cycle).
 * - Injects "Steroids" (Cognitive Hooks & Integrated Projects).
 */

export const CYCLES = {
  PRESCHOOL: {
    grades: ["Materno", "Transición"],
    focus: "Neurodevelopment & Socialization",
    strategy: "Juego Trabajo / Rincones",
    evaluation: "Qualitative Only (Informe Descriptivo)",
    forbidden: ["Exams", "Numeric Grades", "Abstract Math"],
    tone: "Sweet, visual, and guiding.",
  },
  PRIMARIA_I: {
    grades: ["1", "2", "3"],
    focus: "Literacy & Concrete Math",
    strategy: "Material Concreto / Método Silábico",
    evaluation: "Scales & Basic Checklists",
    forbidden: ["Complex Abstract Logic"],
    tone: "Encouraging and structured.",
  },
  PRIMARIA_II: {
    grades: ["4", "5", "6"],
    focus: "Reading Comprehension & Inquiry",
    strategy: "ABP (Proyectos) / Investigación",
    evaluation: "Written Exams start to weigh more",
    forbidden: ["Overly childish tone"],
    tone: "Challenging but supportive.",
  },
  SECUNDARIA_III: {
    grades: ["7", "8", "9"],
    focus: "Adolescence Identity & Civics",
    strategy: "Debates / Technology / Active Learning",
    evaluation: "Mix of Project & Exams",
    forbidden: ["Passive lectures"],
    tone: "Respectful, relevant, and engaging.",
  },
  DIVERSIFICADA: {
    grades: ["10", "11", "12"],
    focus: "Pre-University & Career",
    strategy: "Labs / Essays / Professional Simulation",
    evaluation: "High Rigor (Simulacros)",
    forbidden: ["Low expectations"],
    tone: "Academic and professional.",
  },
};

/**
 * Returns the configuration for a specific grade.
 */
export function getCycleConfig(grade) {
  if (CYCLES.PRESCHOOL.grades.some((g) => grade.includes(g)))
    return CYCLES.PRESCHOOL;
  if (["1", "2", "3"].some((g) => grade.includes(g))) return CYCLES.PRIMARIA_I;
  if (["4", "5", "6"].some((g) => grade.includes(g))) return CYCLES.PRIMARIA_II;
  if (["7", "8", "9"].some((g) => grade.includes(g)))
    return CYCLES.SECUNDARIA_III;
  return CYCLES.DIVERSIFICADA;
}

/**
 * INJECTS "STEROIDS" (High Impact Resources)
 * @param {string} topic
 * @param {string} cycleName
 */
export function generateSteroids(topic, cycleName) {
  // Basic logic for now, could be expanded with AI
  let hook = "Pregunta Generadora General";
  let project = "Proyecto General";

  if (cycleName === "PRESCHOOL") {
    hook = `Caja Misteriosa: ¿Qué hay dentro relacionado con ${topic}?`;
    project = `Mural Colectivo de ${topic}`;
  } else if (cycleName === "DIVERSIFICADA") {
    hook = `Caso Real: Análisis de una noticia sobre ${topic}`;
    project = `Propuesta de Solución Profesional a problema de ${topic}`;
  } else {
    hook = `Reto Gamificado: Escape Room de ${topic}`;
    project = `Campaña de Concientización o Maqueta sobre ${topic}`;
  }

  return {
    cognitive_hook: hook,
    integrated_project: project,
  };
}
