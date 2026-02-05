/**
 * RUBRIC GENERATOR ENGINE (V3000)
 * "Factoría de Valoración Automática"
 *
 * Logic:
 * 1. Receives an Indicator (e.g., "Identifica las causas...")
 * 2. Extracts the Verb (Identifica) and Content (las causas...).
 * 3. Generates the 3 Levels (Inicial, Intermedio, Avanzado) based on MEP taxonomy.
 */

export function generateRubric(indicator) {
  if (!indicator) return null;

  // Simple heuristic for verb separation (in a real system, use NLP or database mapping)
  const words = indicator.split(" ");
  const verb = words[0]; // e.g., "Identifica"
  const content = words.slice(1).join(" "); // e.g., "las partes de la planta"

  // Base Text Templates (MEP Standard)
  let rubric = {
    indicator: indicator,
    levels: {
      inicial: "",
      intermedio: "",
      avanzado: "",
    },
  };

  // 1. INICIAL (Isolated / Partial)
  // Pattern: [Verb] + [Content] + "de forma aislada" or "cita"
  rubric.levels.inicial = `Cita ${content} de forma general o aislada.`;

  // 2. INTERMEDIO (Characterization / Brief Details)
  // Pattern: [Verb] + [Content] + "brindando detalles básicos"
  rubric.levels.intermedio = `Caracteriza ${content} puntualizando aspectos relevantes.`;

  // 3. AVANZADO (Correct Context / Full Identification)
  // Pattern: [Verb] + [Content] + "vinculándolo a su contexto" or "correctamente"
  rubric.levels.avanzado = `${verb} ${content} de manera correcta, estableciendo relaciones con el entorno.`;

  return rubric;
}

/**
 * TECHNICAL RUBRIC ADAPTER
 * For "Criterios de Desempeño" (CTP)
 */
export function generateTechnicalCriteria(competency) {
  // Technical education uses "Criterios de Desempeño" usually 1-5 scale or Yes/No checklist
  // Here we generate a standard checklist
  return [
    `Ejecuta el procedimiento de ${competency} cumpliendo normas de seguridad.`,
    `Selecciona las herramientas adecuadas para ${competency}.`,
    `Entrega el producto final con los estándares de calidad requeridos.`,
  ];
}
