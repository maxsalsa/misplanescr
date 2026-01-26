/**
 * INTELLIGENCE ENGINE (KAIZEN 110.0 & 120.0)
 * The "Neuro-Link" between Curriculum and Mediation.
 */

// Keyword mapping for Strategy Suggestion
const STRATEGY_MAP = {
    "analizar": ["Seis Sombreros", "Debate Socrático", "Estudio de Caso"],
    "identificar": ["Mapa Mental", "Lluvia de Ideas", "Galería"],
    "construir": ["ABP (Prototipo)", "Maqueta", "Roleplay"],
    "resolver": ["Resolución de Problemas", "Gamificación", "Taller"],
    "default": ["Técnica de la Pregunta", "Trabajo Cooperativo", "Bitácora"]
};

export const suggestStrategies = async (db, indicatorText) => {
    // 1. Analyze Indicator Verb (Heuristic)
    const lowerText = indicatorText.toLowerCase();
    let bestMatchKey = "default";

    for (const key of Object.keys(STRATEGY_MAP)) {
        if (lowerText.includes(key)) {
            bestMatchKey = key;
            break;
        }
    }

    const suggestedNames = STRATEGY_MAP[bestMatchKey];

    // 2. Query Neon "BancoMediacion" (Simulated Prism call)
    // const strategies = await db.bancoMediacion.findMany({ where: { nombre: { in: suggestedNames } } });

    // Returning simulated intelligent selection
    return suggestedNames.map(name => ({
        name,
        reason: `Recomendado porque el indicador requiere '${bestMatchKey}'.`,
        duaCheck: "Visual/Auditivo",
        estimatedMinutes: 40 // Default standard lesson
    }));
};

// KAIZEN 120.0: MOTOR DE TIEMPOS (UNIT GOVERNOR)
export const calculateTimeBudget = (unitTotalHours, selectedActivities) => {
    // unitTotalHours: number (e.g., 40)
    // selectedActivities: array of objects { minutes: 40, ... }

    const totalAvailableMinutes = unitTotalHours * 60;
    const currentUsedMinutes = selectedActivities.reduce((sum, act) => sum + (act.minutes || 40), 0);

    const remaining = totalAvailableMinutes - currentUsedMinutes;

    // "Alerta Técnica Proactiva" logic
    return {
        totalAvailableMinutes,
        currentUsedMinutes,
        remaining,
        status: remaining < 0 ? "OVERFLOW" : (remaining === 0 ? "PERFECT" : "UNDER_BUDGET"),
        message: remaining < 0
            ? `¡ALERTA TÉCNICA! Excede el tiempo de la unidad por ${(Math.abs(remaining) / 60).toFixed(1)} horas. Ajuste la mediación.`
            : `Tiempo disponible: ${(remaining / 60).toFixed(1)} horas para cierre o refuerzo.`
    };
};

export const verifySinpeAuth = (userId, superAdminOverride = false) => {
    // KAIZEN 110: Financial Sovereignty
    if (superAdminOverride) return true;
    // Check Subscription DB...
    return false; // Strict by default
};

export const encryptPersonalData = (data) => {
    // KAIZEN 110: GDPR/Ley 8968 Compliance
    const encrypted = `ENC[${Buffer.from(JSON.stringify(data)).toString('base64')}]`; // Simulatd
    return encrypted;
};
