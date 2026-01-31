/**
 * MOSAIC ENGINE V1.0 (NICHE EXPERT)
 * "The Specialist for Sensitive & Technical Areas"
 * 
 * Capabilities:
 * - ERE: Ecumenical/Values logic.
 * - Affectivity: Scientific/Respectful tone.
 * - Technical: Hard Skills vocabulary (Accounting/Software).
 * - Preschool: Qualitative enforcement.
 */

export const MOSAIC_DOMAINS = {
    ERE: "EDUCACION_RELIGIOSA",
    AFFECTIVITY: "AFECTIVIDAD_SEXUALIDAD",
    PRESCHOOL: "PREESCOLAR",
    TECH_ACCOUNTING: "CONTABILIDAD",
    TECH_SOFTWARE: "DESARROLLO_SOFTWARE",
    TECH_EXECUTIVE: "SECRETARIADO_EJECUTIVO"
};

/**
 * Returns specialized logic for Mosaic Domains.
 * @param {string} domainKey 
 */
export function getMosaicConfig(domainKey) {
    switch (domainKey) {
        case MOSAIC_DOMAINS.ERE:
            return {
                focus: "Ecumenical & Universal Values (No Dogma)",
                strategies: ["Proyecto de Vida", "Diario de Valores", "Análisis de Parábolas (Ético)"],
                evaluation: {
                    type: "Qualitative/Project",
                    instrument: "Rúbrica de Vivencia de Valores",
                    banned: ["Dogmatic Exams", "Memorization of Doctrine"]
                }
            };
        case MOSAIC_DOMAINS.AFFECTIVITY:
            return {
                focus: "Integral Health & Rights (Scientific Tone)",
                strategies: ["Círculo de Diálogo", "Análisis de Casos", "Buzón de Dudas Anónimas"],
                evaluation: {
                    type: "Formative",
                    instrument: "Lista de Cotejo de Participación Respetuosa",
                    banned: ["Moral Judgment", "Public Disclosure"]
                }
            };
        case MOSAIC_DOMAINS.PRESCHOOL:
            return {
                focus: "Developmental Areas (Ámbitos)",
                strategies: ["Juego Trabajo", "Rincón de Lectura", "Experiencias Sensoriales"],
                evaluation: {
                    type: "STRICTLY QUALITATIVE",
                    instrument: "Informe Descriptivo / Registro Anecdótico",
                    banned: ["Exams", "Numeric Grades (1-100)"]
                }
            };
        // TECHNICAL SPECIALTIES
        case MOSAIC_DOMAINS.TECH_ACCOUNTING:
            return {
                focus: "Normas Internacionales (NIIF) & Precision",
                vocabulary: ["Asientos de Diario", "Balance de Comprobación", "Mayorización", "Activos/Pasivos"],
                strategies: ["Simulación de Ciclo Contable", "Estudio de Casos Financieros"]
            };
        case MOSAIC_DOMAINS.TECH_SOFTWARE:
            return {
                focus: "Industry Standards & Best Practices",
                vocabulary: ["Scrum", "Git/GitHub", "Frontend/Backend", "API REST", "Debugging"],
                strategies: ["Coding Bootcamp", "Hackathon", "Pair Programming"]
            };
        case MOSAIC_DOMAINS.TECH_EXECUTIVE:
            return {
                focus: "Soft Skills & Protocol",
                vocabulary: ["Protocolo de Servicio", "Gestión de Archivo", "Redacción Comercial", "Etiqueta"],
                strategies: ["Roleplay de Atención al Cliente", "Simulación de Oficina"]
            };
        default:
            return null;
    }
}

/**
 * Validates Content against Niche Rules.
 */
export function validateMosaicContent(domain, content) {
    const config = getMosaicConfig(domain);
    if (!config) return { valid: true };

    if (config.evaluation && config.evaluation.banned) {
        const hasBanned = config.evaluation.banned.some(term =>
            JSON.stringify(content).toLowerCase().includes(term.toLowerCase())
        );
        if (hasBanned) {
            return {
                valid: false,
                warning: `Mosaic Violation in ${domain}: Content contains banned elements (${config.evaluation.banned.join(", ")}).`
            };
        }
    }
    return { valid: true };
}
