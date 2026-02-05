/**
 * DIAGNOSTIC ENGINE (RADAR MODE)
 * Reference: Evaluación Diagnóstica 2011 - MEP
 *
 * Capabilities:
 * 1. Dimension Analysis (Cognitive, Socio-affective, Psychomotor).
 * 2. Decision Matrix (Remedial vs Enrichment).
 * 3. Instrument Factory Logic.
 */

// --- 1. THE 3 DIMENSIONS ---
export const DIAGNOSTIC_DIMENSIONS = {
  COGNITIVE: "Cognitiva (Pre-requisites)",
  SOCIO_AFFECTIVE: "Socio-afectiva (Interests/Attitudes)",
  PSYCHOMOTOR: "Psicomotriz (Coordination)",
};

// --- 2. INSTRUMENT TYPES ---
export const INSTRUMENT_TYPES = {
  CHECKLIST: "Lista de Cotejo (Sì/No)",
  RATING_SCALE: "Escala de Calificación (1-5)",
  ANECDOTAL: "Registro Anecdótico (Qualitative)",
  PORTFOLIO: "Portafolio de Evidencias",
  // NEW DIAGNOSTIC DEPTH
  RRPCC: "R.R.P.C.C. (Recordar/Resumir/Preguntar)",
  SELF_ASSESSMENT: "Autoasesoría (Actitudes)",
  CHARACTERS: "Perfiles de Personajes (Socio-afectivo)",
  // OMNIVERSE SPECIFIC
  GRAPHIC_SCALE: "Escala Gráfica (Caritas - Primaria)",
  WORKSHOP_CHECKLIST: "Lista de Cotejo Taller (Seguridad - Técnica)",
  // POLYGLOT INSTRUMENTS
  ORAL_RUBRIC: "Rúbrica de Producción Oral (CEFR)",
  PRODUCT_RUBRIC: "Rúbrica de Producto Terminado (Taller)",
  SAFETY_CHECK: "Lista de Verificación de Seguridad (EPP)",
  // INTERCULTURAL INSTRUMENTS
  DIALOGUE_CIRCLE: "Círculo de Diálogo (Oralidad)",
  COMMUNITY_OBSERVATION: "Observación Vivencial Comunitario",
};

/**
 * DECISION MATRIX (MEP Evidence-Based Decision Making)
 *
 * @param {object} results - { score: number, total: number, observations: string }
 * @returns {object} - { recommendation: string, actionPlan: string, cite: string }
 */
export function analyzeDiagnosticState(results) {
  const percentage = (results.score / results.total) * 100;

  if (percentage < 60) {
    return {
      status: "REQUIERE NIVELACIÓN",
      actionPlan: "Plan de Nivelación (Remedial)",
      strategies: [
        "Tutoría entre pares",
        "Material concreto",
        "Refuerzo extra-clase",
      ],
      cite: "MEP 2011: La toma de decisiones debe orientarse a subsanar vacíos (p. 23).",
    };
  } else if (percentage > 90) {
    return {
      status: "ALTA DOTACIÓN / AVANZADO",
      actionPlan: "Enriquecimiento Curricular",
      strategies: [
        "Proyectos de investigación",
        "Roles de liderazgo (Monitor)",
        "Actividades de mayor complejidad",
      ],
      cite: "MEP 2011: Potenciar las habilidades detectadas (p. 25).",
    };
  } else {
    return {
      status: "NIVEL ESPERADO",
      actionPlan: "Continuidad del Planeamiento",
      strategies: ["Mediación estándar con DUA"],
      cite: "MEP 2011: Continuar con la programación establecida.",
    };
  }
}

/**
 * GENERATE INSTRUMENT STRUCTURE
 * Helper to structure data for the PDF Factory.
 */
export function createInstrumentStructure(dimension, type, content) {
  return {
    header: {
      title: `Instrumento Diagnóstico: ${dimension}`,
      type: type,
      instruction: getInstructionByDimension(dimension),
    },
    body: content, // Array of items
  };
}

function getInstructionByDimension(dim) {
  switch (dim) {
    case DIAGNOSTIC_DIMENSIONS.COGNITIVE:
      return "Marque el nivel de conocimiento previo que posee el estudiante sobre los siguientes temas.";
    case DIAGNOSTIC_DIMENSIONS.SOCIO_AFFECTIVE:
      return "Observe y registre las actitudes del estudiante durante el trabajo grupal.";
    case DIAGNOSTIC_DIMENSIONS.PSYCHOMOTOR:
      return "Evalúe la coordinación y destreza motora en la ejecución de las actividades.";
    default:
      return "Complete el instrumento según lo observado.";
  }
}
