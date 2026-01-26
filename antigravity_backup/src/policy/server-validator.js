/**
 * ANTIGRAVITY POLICY ENGINE (SERVER SIDE)
 * Enforces MEP Normative 2024/2025.
 */

export 

export function validateMEPCompliance(planData) {

    // 1. REGLA asignar nota global sin instrumento
    // We inspect the 'evaluacion' section of the plan.
    if (planData.evaluacion) {
        const hasInstrument = planData.evaluacion.instrumentos && planData.evaluacion.instrumentos.length > 0;
        const assignsGrade = planData.evaluacion.asignarNota === true;

        if (assignsGrade && !hasInstrument) {
            return {
                valid: false,
                code: 'MEP_001',
                reason: "INTENTO DE FRAUDE ACADÉMICO sistema ha detectado asignación de nota sin instrumento de evaluación (Rúbrica/Lista de Cotejo). Artículo 18 REA."
            };
        }
    }

    // 2. REGLA Curricular (Saberes vs Aprendizajes)
    // If there are 'contents' but no 'learning_outcomes/habilidades', it's invalid.
    if (planData.saberes && planData.saberes.length > 0 && (!planData.aprendizajes || planData.aprendizajes.length === 0)) {
        return {
            valid: false,
            code: 'MEP_002',
            reason: "INCOHERENCIA PEDAGÓGICA se pueden enseñar contenidos sin un Resultado de Aprendizaje base."
        };
    }

    return { valid: true };
}
