/**
 * SUBJECT MATTER EXPERT (SME) ENGINE V1.0 (DIAMOND PROTOCOL)
 * "The Omniscient Pedagogical Engine"
 * 
 * Capabilities:
 * - Domain-Specific Strategies (Sciences, Languages, Technical, CINDEA).
 * - Terminology Enforcement (MEP Compliance).
 * - Rich JSON Output (Materials, Timing, Metacognition).
 */

import { POLYGLOT_CONFIG } from './polyglot-engine';
import { MODALITIES } from './chameleon-core';

export const DOMAINS = {
    SCIENCES: "CIENCIAS_NATURALES",
    LANGUAGES: "IDIOMAS_EXTRANJEROS",
    TECHNICAL: "EDUCACION_TECNICA",
    CINDEA: "EDUCACION_DE_ADULTOS",
    PRESCHOOL: "EDUCACION_PREESCOLAR"
};

const DOMAIN_LOGIC = {
    [DOMAINS.SCIENCES]: {
        focus: "Indagación Científica & Pensamiento Crítico",
        resources: ["Laboratorio Virtual (PhET)", "Reporte de Experimento", "V de Gowin"],
        evaluation: {
            instrument: "Rúbrica de Laboratorio",
            criteria: ["Planteamiento del Problema", "Registro de Datos", "Análisis de Resultados"]
        },
        materials_example: ["Mechero Bunsen", "Probeta Graduada", "Reactivos Específicos"]
    },
    [DOMAINS.LANGUAGES]: {
        focus: POLYGLOT_CONFIG.ENGLISH.focus,
        resources: ["Roleplay Scenarios", "Information Gap Activities", "Real-world Interviews"],
        evaluation: {
            instrument: "Oral Production Rubric (CEFR)",
            criteria: ["Fluidez", "Pronunciación", "Interacción (Turn-taking)"]
        },
        materials_example: ["Flashcards", "Audio Speakers", "Authentic Texts (Menus/Maps)"]
    },
    [DOMAINS.TECHNICAL]: {
        focus: POLYGLOT_CONFIG.WORKSHOP.focus,
        resources: ["Manuales de Fabricante", "Normas ISO/NIIF", "Simuladores Industriales"],
        evaluation: {
            instrument: "Lista de Cotejo de Seguridad Ocupacional",
            criteria: ["Uso de EPP", "Orden y Limpieza", "Seguimiento de Protocolo"]
        },
        materials_example: ["Equipo de Protección Personal (Casco/Lentes)", "Herramientas de Precisión"]
    },
    [DOMAINS.CINDEA]: {
        focus: "Andragogía (Aprendizaje Adulto)",
        resources: ["Módulos Auto-contenidos", "Casos de Vida Real", "Debates Estructurados"],
        evaluation: {
            instrument: "Rúbrica de Desempeño Andragógico",
            criteria: ["Aplicación Práctica", "Respeto a Opiniones", "Gestión del Tiempo"]
        },
        materials_example: ["Guías de Estudio", "Recursos Digitales Móviles"]
    }
};

/**
 * Retrieves the specific pedagogical configuration for a subject domain.
 * @param {string} domainKey - One of DOMAINS values.
 */
export function getDomainConfig(domainKey) {
    return DOMAIN_LOGIC[domainKey] || {
        focus: "Mediación General",
        resources: ["Libro de Texto", "Presentación Multimedia"],
        evaluation: { instrument: "Rúbrica Estándar", criteria: ["Comprensión", "Aplicación"] }
    };
}

/**
 * Enforces MEP Terminology based on Modality/Domain.
 * @param {string} modality - From chameleon-core.
 * @param {string} domain 
 */
export function enforceMepTerminology(modality, domain) {
    if (modality === MODALITIES.PREESCOLAR) return "Conductas Observables";
    if (modality === MODALITIES.TECNICA) return "Resultados de Aprendizaje (RA)";
    if (domain === DOMAINS.LANGUAGES) return "Linguistic Competences (CEFR)";
    return "Aprendizajes Esperados (AE)";
}

/**
 * Generates Rich Detail Object for a Plan.
 */
export function generateRichDetails(domainKey, topic) {
    const config = getDomainConfig(domainKey);
    return {
        topic,
        domain_focus: config.focus,
        suggested_materials: config.materials_example,
        timing_breakdown: {
            introduction: "15 min (Activación)",
            development: "50 min (Práctica Deliberada)",
            closure: "15 min (Metacognición)"
        },
        metacognitive_prompt: domainKey === DOMAINS.SCIENCES
            ? "¿Cómo cambió mi hipótesis inicial tras el experimento?"
            : "¿Qué estrategia usé para resolver el problema?"
    };
}
