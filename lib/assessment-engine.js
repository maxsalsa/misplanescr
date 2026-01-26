/**
 * ASSESSMENT ENGINE (KAIZEN 70.0 - SOVEREIGN UPDATE)
 * Implements the official MEP VF-2023 & ETP Guidelines.
 * 
 * Formula: (Puntos Totales / Tiempo Total) * Tiempo del Indicador
 */

// 1. FORMULA MAESTRA 2024
export const calculateTableSpecs = (topics, totalPoints = 100, totalTimeOverride = null) => {
    // topics: [{ id, name, lessons, minutes }]
    // "Lecciones" is the standard proxy (40 min), but ETP uses "Hours" (60 min).
    // We normalize to "minutes" for absolute precision if provided, else use lessons logic.

    let totalTime = totalTimeOverride;

    // Calculate Total Time if not provided
    if (!totalTime) {
        totalTime = topics.reduce((sum, t) => sum + (t.minutes || ((t.lessons || 1) * 40)), 0);
    }

    const pointsPerMinute = totalPoints / totalTime;

    return topics.map(topic => {
        const topicTime = topic.minutes || ((topic.lessons || 1) * 40);
        const rawPoints = topicTime * pointsPerMinute;
        const finalPoints = Math.round(rawPoints);

        // Cognitive Distribution (Default 50/30/20 per general rule, but adjusted by user preference)
        const selectionPoints = Math.floor(finalPoints * 0.5);
        const shortAnswerPoints = Math.floor(finalPoints * 0.3);
        const productionPoints = finalPoints - selectionPoints - shortAnswerPoints;

        return {
            topic: topic.name,
            timeMinutes: topicTime,
            calculatedPoints: finalPoints,
            details: {
                selection: selectionPoints,
                shortAnswer: shortAnswerPoints,
                production: productionPoints
            }
        };
    });
};

// 2. VALIDACIÓN ETP (Ingeniería de Datos)
export const validateETPStructure = (planJson) => {
    const errors = [];

    // Check for "Time" column
    if (!planJson.columns?.some(c => c.key === 'time' || c.label.includes('Tiempo'))) {
        errors.push("CRITICAL: ETP Plans MUST include 'Tiempo Estimado' column (Orientaciones ETP).");
    }

    // Check for "Resultados de Aprendizaje" (RA)
    if (!planJson.sections?.some(s => s.type === 'RA' || s.title.includes('Resultado'))) {
        errors.push("CRITICAL: ETP Plans MUST utilize 'Resultados de Aprendizaje' instead of just 'Objetivos'.");
    }

    return {
        valid: errors.length === 0,
        errors
    };
};

export const getTechnicalWeights = (specialty, level) => {
    // Simulates fetching from NormativaETP or SOVEREIGN_DATA
    if (specialty && (specialty.includes("Web") || specialty.includes("Informática"))) {
        return { daily: 40, exams: 30, project: 30 };
    }
    return { daily: 60, exams: 20, tasks: 10, attendance: 10 };
};
