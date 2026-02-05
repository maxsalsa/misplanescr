export const PEDAGOGY_RULES = {
  standard: {
    steps: ["Focalización", "Exploración", "Contrastación", "Aplicación"],
    eval: "Rúbrica Analítica",
  },
  technical: {
    steps: ["Planificación", "Ejecución", "Evaluación"],
    eval: "Lista de Cotejo",
  },
};

export function getContextData(modality) {
  return PEDAGOGY_RULES[modality] || PEDAGOGY_RULES.standard;
}
