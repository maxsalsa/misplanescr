/**
 * MAGISTRADO ENGINE V1.0 (COMPLIANCE OFFICER)
 * "The Guardian of the REA"
 *
 * Capabilities:
 * - Enforces Official Terminology (Syllabus-specific).
 * - Validates Evaluation Logic (Written exams vs Oral).
 * - Enforces Mediation Structures (Scientific Inquiry vs Standard).
 */

export const REA_RULES = {
  EVALUATION_COMPONENTS: {
    ACADEMIC_III_CYCLE: {
      cotidiano: 30,
      tareas: 10,
      pruebas: 40,
      proyecto: 20,
    },
    PRIMARIA_I_CYCLE: {
      cotidiano: 60,
      tareas: 10,
      pruebas: 20,
      concepto: 5,
      asistencia: 5,
    }, // Approx example
    TECHNICAL: { saber: 30, hacer: 60, ser: 10 }, // Competency based
  },
  BANNED_COMBINATIONS: [
    {
      subject: "IDIOMA_CONVERSACIONAL",
      instrument: "PRUEBA_ESCRITA",
      correction: "Use 'Oral Production Rubric' or 'Performance List'.",
    },
    {
      subject: "PREESCOLAR",
      instrument: "EXAMEN",
      correction:
        "Preschool is Qualitative. Use 'Anecdotal Record' or 'Checklist'.",
    },
  ],
};

const SYLLABUS_CONFIG = {
  MATEMATICAS: {
    term_objective: "Habilidad Específica",
    focus: "Resolución de Problemas",
    phases: [
      "Propuesta del Problema",
      "Trabajo Independiente",
      "Discusión Interactiva",
      "Clausura/Cierre",
    ],
  },
  CIENCIAS: {
    term_objective: "Criterio de Evaluación",
    focus: "Indagación Científica",
    phases: ["Focalización", "Exploración", "Contrastación", "Aplicación"], // The 4 Moments
  },
  IDIOMAS: {
    term_objective: "Can-Do Statement (Action-Oriented)",
    focus: "Communicative Competence",
    phases: [
      "Into Phase (Warm-up)",
      "Through Phase (Task Cycle)",
      "Beyond Phase (Application)",
    ],
  },
  ESTUDIOS_SOCIALES: {
    term_objective: "Aprendizaje Esperado",
    focus: "Pensamiento Crítico",
    phases: ["Inicio", "Desarrollo", "Cierre"],
  },
  GENERAL: {
    term_objective: "Aprendizaje Esperado",
    focus: "Mediación Pedagógica",
    phases: ["Inicio", "Desarrollo", "Cierre"],
  },
};

/**
 * Returns the official mediation structure and terminology for a subject.
 */
export function getOfficialSyllabusRequest(subjectKey) {
  return SYLLABUS_CONFIG[subjectKey] || SYLLABUS_CONFIG.GENERAL;
}

/**
 * Validates if the requested evaluation tool is legal for the subject.
 */
export function validateLegalCompliance(subject, toolType) {
  const violation = REA_RULES.BANNED_COMBINATIONS.find(
    (rule) => rule.subject === subject && rule.instrument === toolType,
  );

  if (violation) {
    return {
      valid: false,
      message: `VIOLATION DETECTED: ${violation.correction}`,
    };
  }
  return { valid: true };
}

/**
 * Enforces the "Sacred Binomial" syntax.
 */
export function enforceBinomio(teacherAction, studentAction) {
  return {
    teacher: `La persona docente ${teacherAction}...`,
    student: `La persona estudiante ${studentAction}...`,
  };
}
