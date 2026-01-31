/**
 * NEBULA ENGINE V1.1 (INNOVATION & STEAM)
 * "The Maker's Lab"
 * 
 * Capabilities:
 * - Generates STEAM/Maker Projects (Fair Science, Arts, Engineering).
 * - Enforces Official MEP Rubric Scale (1-3: Inicial, Intermedio, Avanzado).
 * - Methodology: Design Thinking (Empatizar -> Testear).
 * - Inventory: Maker, Roleplay, Culture, Business.
 */

export const NEBULA_INVENTORY = {
    ENGINEERING: { title: "Brazo Hidráulico", focus: "Pascal's Principle", type: "MAKER" },
    TOURISM: { title: "Roleplay: Tour Guiding", focus: "Oral Fluency", type: "ROLEPLAY" },
    CULTURE: { title: "Mascaradas Tradicionales", focus: "Art & Heritage", type: "ART" },
    BUSINESS: { title: "Business Model Canvas", focus: "Entrepreneurship", type: "BUSINESS" },
    SCIENCE: { title: "Feria Científica: Prototipo", focus: "Scientific Method", type: "STEAM" }
};

/**
 * Generates a Nebula Project (STEAM/Maker).
 */
export function generateNebulaProject(categoryKey) {
    const project = NEBULA_INVENTORY[categoryKey] || NEBULA_INVENTORY.SCIENCE;

    return {
        type: "PROYECTO_NEBULA",
        title: project.title,
        methodology: "STEAM / Maker / Learning by Doing",
        phases: [
            "Empatizar: Comprender el problema.",
            "Idear: Lluvia de ideas de soluciones.",
            "Prototipar: Construcción física (Manos a la obra).",
            "Testear: Pruebas de funcionamiento."
        ],
        rubric_scale: "OFFICIAL_MEP_1_3"
    };
}

/**
 * Enforces the Official MEP Rubric Scale (1-3).
 * Banned: 1-5, 1-10 (unless strictly technical/summative).
 */
export function getOfficialRubricScale() {
    return {
        name: "Escala de Desempeño MEP (REA)",
        levels: [
            { score: 1, label: "Inicial", desc: "Muestra avances incipientes." },
            { score: 2, label: "Intermedio", desc: "Muestra avances significativos pero requiere apoyo." },
            { score: 3, label: "Avanzado", desc: "Logra el indicador de manera autónoma." }
        ],
        warning: "⚠️ PROHIBIDO usar escalas 1-5 o 1-10 para desempeño formativo/sumativo en guías de trabajo."
    };
}

/**
 * Validates if an external scale is compliant.
 */
export function validateScaleCompliance(maxScore) {
    if (maxScore === 3) return { valid: true };
    return {
        valid: false,
        correction: "La escala debe ser 1 (Inicial) a 3 (Avanzado). Ajuste inmediatamente."
    };
}
