// 📏 ESTÁNDARES DE MEDICIÓN MEP (REA)
// Define la estructura legal de los instrumentos de evaluación.

export const INSTRUMENT_TYPES = {
  RUBRIC: {
    id: "RUBRICA",
    name: "Rúbrica Analítica (Matriz)",
    description: "Para evaluar niveles de desempeño progresivo (Inicial, Intermedio, Avanzado). Obligatorio para Procesos.",
    defaultScales: ["Inicial (1 pt)", "Intermedio (2-3 pts)", "Avanzado (4-5 pts)"]
  },
  CHECKLIST: {
    id: "LISTA_COTEJO",
    name: "Lista de Cotejo",
    description: "Verificación dicotómica (Sí/No). Ideal para seguridad, procedimientos y producto terminado.",
    defaultScales: ["Cumple", "No Cumple"]
  },
  SCALE: {
    id: "ESCALA",
    name: "Escala de Calificación",
    description: "Frecuencia o grado de una conducta (Siempre, A veces, Nunca).",
    defaultScales: ["Siempre", "Frecuentemente", "A veces", "Nunca"]
  },
  PORTFOLIO: {
    id: "PORTAFOLIO",
    name: "Evaluación de Portafolio",
    description: "Instrumento integrador para verificar la colección de evidencias del periodo.",
    defaultCriteria: ["Organización y Limpieza", "Completitud de Evidencias", "Reflexión Metacognitiva"]
  }
};

// VALIDADOR LEGAL (EL ESCUDO)
export function validateInstrument(instrument) {
  if (!instrument.criteria || instrument.criteria.length === 0) {
    return { valid: false, error: "❌ ILEGAL: El instrumento no tiene indicadores." };
  }
  if (!instrument.totalPoints || instrument.totalPoints <= 0) {
    return { valid: false, error: "❌ ERROR: El puntaje total debe ser mayor a 0." };
  }
  return { valid: true };
}