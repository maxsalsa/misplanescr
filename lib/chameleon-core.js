/**
 * CHAMELEON CORE V1.0 (MODALITY ADAPTER)
 * "The Universal Translator"
 *
 * Capabilities:
 * - Adapts specific terminology for Preescolar, Primaria, Secundaria, Técnica.
 * - Enforces specific Evaluation/Diagnostic rules per modality.
 */

export const MODALITIES = {
  PREESCOLAR: "PREESCOLAR",
  PRIMARIA: "PRIMARIA",
  SECUNDARIA: "SECUNDARIA_ACADEMICA",
  TECNICA: "SECUNDARIA_TECNICA",
  CINDEA: "CINDEA",
};

export const VOCABULARY = {
  [MODALITIES.PREESCOLAR]: {
    outcome: "Conducta Observable / Experiencia",
    indicator: "Indicador (Cualitativo)",
    diagnosis: "Lista de Cotejo Psicomotora",
    evaluation_scale: "Logrado / En Proceso / No Logrado",
    tone: "Lúdico y Vivencial",
  },
  [MODALITIES.PRIMARIA]: {
    outcome: "Habilidad",
    indicator: "Indicador de Aprendizaje",
    diagnosis: "Escala Gráfica (Caritas)",
    evaluation_scale: "1 (Inicial) - 3 (Avanzado)",
    tone: "Visual y Estructurado",
  },
  [MODALITIES.SECUNDARIA]: {
    outcome: "Aprendizaje Esperado",
    indicator: "Criterio de Evaluación",
    diagnosis: "Autoasesoría / Prueba",
    evaluation_scale: "1 (Inicial) - 3 (Avanzado)",
    tone: "Académico y Crítico",
  },
  [MODALITIES.TECNICA]: {
    outcome: "Resultado de Aprendizaje (RA)",
    indicator: "Criterio de Desempeño",
    diagnosis: "Lista de Cotejo de Taller (Seguridad)",
    evaluation_scale: "Competente / Aún No Competente",
    tone: "Profesional y Técnico",
  },
  [MODALITIES.CINDEA]: {
    outcome: "Aprendizaje del Módulo",
    indicator: "Indicador del Módulo",
    diagnosis: "Diagnóstico Andragógico",
    evaluation_scale: "1-100 (Sumativa)",
    tone: "Respetuoso y Práctico",
  },
  // NEW MODES
  TALLER: {
    outcome: "Habilidad / Destreza",
    indicator: "Criterio de Seguridad / Producto",
    diagnosis: "Lista de Cotejo de Seguridad",
    evaluation_scale: "Competente (Seguro) / No Competente (Riesgo)",
    tone: "Industrial y Preventivo",
  },
  IDIOMA: {
    outcome: "Linguistic Competence (CEFR)",
    indicator: "Oral/Listening Criterion",
    diagnosis: "Interview / Oral Check",
    evaluation_scale: "Band A1-C1",
    tone: "Communicative (Target Language)",
  },
  // INTERCULTURAL
  LECI: {
    outcome: "Saber Ancestral / Vivencia",
    indicator: "Rasgo Cultural / Participación",
    diagnosis: "Círculo de Diálogo (Oral)",
    evaluation_scale: "Vivenciado / En Integración",
    tone: "Respetuoso y Comunitario (Cosmovisión)",
  },
};

/**
 * Returns the vocabulary set for a specific modality.
 */
export function getChameleonConfig(modality) {
  return VOCABULARY[modality] || VOCABULARY[MODALITIES.SECUNDARIA];
}

/**
 * Validates if a diagnostic tool is appropriate.
 */
export function validateDiagnosis(modality, instrumentType) {
  const config = getChameleonConfig(modality);
  // Simple logic: warn if using 'Written Test' for Preschool
  if (
    modality === MODALITIES.PREESCOLAR &&
    instrumentType.includes("Prueba Escrita")
  ) {
    return {
      valid: false,
      warning: "Preschool should not use Written Tests. Use Observation.",
    };
  }
  return { valid: true };
}
