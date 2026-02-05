/**
 * OMNI PLANNER ENGINE V1.0 (STRATEGIC PLANNER)
 * "The Macro & Micro Architect"
 *
 * Capabilities:
 * - Macro Planning: Generates Annual Distributions (Feb-Nov).
 * - Micro Planning: Offers 3 Variants (ABP, Gamification, Flipped).
 * - Competency Injection: Enforces explicit MEP Competencies.
 */

export const MEP_COMPETENCIES = {
  CITIZENSHIP: "Ciudadanía (Derechos, Deberes, Participación)",
  DIGITAL: "Ciudadanía Digital (Tecnología Responsable)",
  LIFE: "Vida y Carrera (Autocuidado, Finanzas)",
  THINKING: "Pensamiento Crítico (Resolución de Problemas)",
};

/**
 * MACRO: Generates Annual Plan Distribution.
 * @param {string} subject
 * @param {string} level
 */
export function generateAnnualPlan(subject, level) {
  return {
    type: "PLAN_ANUAL (MACRO)",
    title: `Distribución Anual: ${subject} - ${level}`,
    timeline: [
      {
        month: "Febrero",
        unit: "Diagnóstico y Nivelación",
        focus: "Adaptación",
      },
      {
        month: "Marzo-Abril",
        unit: "I Periodo: Fundamentos",
        focus: "Conceptos Base",
      },
      {
        month: "Mayo-Junio",
        unit: "II Periodo: Desarrollo",
        focus: "Aplicación Práctica",
      },
      { month: "Julio", unit: "Vacaciones / Repaso", focus: "Descanso" },
      {
        month: "Agosto-Setiembre",
        unit: "II Periodo (Cont.)",
        focus: "Proyectos Integrados",
      },
      {
        month: "Octubre-Noviembre",
        unit: "III Periodo: Cierre",
        focus: "Evaluación Final",
      },
    ],
    competency_focus: MEP_COMPETENCIES.LIFE,
  };
}

/**
 * MICRO: Generates Pedagogical Variants.
 * @param {string} topic
 */
export function generateMicroVariants(topic) {
  return {
    type: "PLAN_PRACTICA (MICRO)",
    topic: topic,
    variants: [
      {
        style: "ABP (Aprendizaje Basado en Proyectos)",
        description: "Los estudiantes resuelven un reto real.",
        hook: `Proyecto: Solución a un problema de ${topic}`,
      },
      {
        style: "Gamificación",
        description: "Uso de dinámicas de juego (misiones, puntos).",
        hook: `Misión: Escapar del Laberinto de ${topic}`,
      },
      {
        style: "Flipped Classroom (Aula Invertida)",
        description: "Teoría en casa (video), Práctica en clase.",
        hook: `Video Interactivo previo sobre ${topic}`,
      },
    ],
    prompt: "Docente, ¿cuál enfoque prefiere para esta clase?",
  };
}

/**
 * INJECTS COMPETENCY (Helper).
 */
export function injectCompetency(plan, competencyKey = "THINKING") {
  return {
    ...plan,
    mep_competency: `⚡ Competencia Seleccionada: ${MEP_COMPETENCIES[competencyKey]}`,
  };
}
