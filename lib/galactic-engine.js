/**
 * GALACTIC ENGINE V1.0 (ASSESSMENT ENGINEER)
 * "The Psychometric Expert"
 *
 * Capabilities:
 * - Generates "Tabla de Especificaciones" (Points Calculation & Distribution).
 * - Generates Real Test Items (Conocimiento, Aplicación, Razonamiento).
 * - Generates Attendance Matrices.
 */

export const COGNITIVE_LEVELS = {
  CONOCIMIENTO: {
    name: "Conocimiento",
    weight: 1,
    verbs: ["Identifica", "Define", "Menciona"],
  },
  APLICACION: {
    name: "Aplicación",
    weight: 2,
    verbs: ["Resuelve", "Calcula", "Aplica"],
  },
  RAZONAMIENTO: {
    name: "Razonamiento",
    weight: 3,
    verbs: ["Analiza", "Concluye", "Justifica"],
  },
};

/**
 * Calculates the Table of Specifications.
 * Formula: Points = (Lessons / Total Lessons) * Total Points
 */
export function calculateSpecsTable(objectives, totalPoints = 100) {
  const totalLessons = objectives.reduce((acc, obj) => acc + obj.lessons, 0);

  return objectives.map((obj) => {
    const rawPoints = (obj.lessons / totalLessons) * totalPoints;
    const points = Math.round(rawPoints); // Rounding for simplicity

    // Distribution Logic (Simple heuristic)
    // 40% Knowledge, 40% Application, 20% Reasoning
    const pKnow = Math.floor(points * 0.4);
    const pApp = Math.floor(points * 0.4);
    const pReason = points - pKnow - pApp;

    return {
      objective: obj.title,
      lessons: obj.lessons,
      total_points: points,
      distribution: {
        conocimiento: pKnow,
        aplicacion: pApp,
        razonamiento: pReason,
      },
    };
  });
}

/**
 * Generates a specific Test Item.
 */
export function generateTestItem(topic, level, type = "SELECCION_UNICA") {
  // In a real system, this would call an LLM with strict prompting.
  // Here we simulate the structure.

  let content = {};
  if (type === "SELECCION_UNICA") {
    content = {
      question: `Pregunta sobre ${topic} (Nivel: ${level})`,
      options: [
        "Opción A (Incorrecta)",
        "Opción B (Correcta)",
        "Opción C (Incorrecta)",
      ],
      correct: "B",
      points: 1,
    };
  } else if (type === "DESARROLLO") {
    content = {
      prompt: `Explique detalladamente cómo ${topic}... (Nivel: ${level})`,
      rubric: "3 pts: Explicación completa. 2 pts: Parcial. 1 pt: Mínima.",
      points: 3,
    };
  }

  return {
    type,
    cognitive_level: level,
    content,
  };
}

/**
 * Generates Attendance Matrix Structure.
 */
export function generateAttendanceMatrix(studentNames, periodStart, periodEnd) {
  // Logic to generate dates between start and end would go here
  return {
    title: "Registro de Desempeño y Asistencia",
    columns: ["Estudiante", "Estado", "L", "K", "M", "J", "V", "Observaciones"],
    rows: studentNames.map((name) => ({
      name,
      status: "ACTIVO",
      attendance: {}, // Placeholders
      notes: "",
    })),
  };
}
