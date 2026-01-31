/**
 * APEX ASSEMBLER V1.0 (THE MASTER ORCHESTRATOR)
 * "The Full Service Engine"
 * 
 * Capabilities:
 * - Orchestrates Zenith (Retrieval), Magistrado (Compliance), and Multiverse (Content).
 * - Delivers the "Whole Product": Mediation + Evidence + Admin + UI.
 * - Enforces "Wow" factors: Gamification, Active Learning, Admin Reminders.
 */

import { handleZenithRequest } from './zenith-librarian';
import { generateRichDetails } from './sme-engine';
import { infuseLifeSkills } from './da-vinci-engine'; // For Cross-curricular
import { REA_RULES } from './magistrado-engine';

/**
 * THE APEX GENERATOR
 * Generates the "Full Suite" response (Premium).
 */
export async function generateApexSuite(request, userContext, dbClient) {
    // 1. ZENITH CHECK (Retrieval First)
    const zenithResult = await handleZenithRequest(request.query, userContext, dbClient);

    // If exact match found in DB, wrap it in Apex Suite and return
    if (zenithResult.source.includes("DATABASE")) {
        return wrapInApexSuite(zenithResult, "Retrieval Successful");
    }

    // 2. MAGISTRADO & DA VINCI (Compliance & Life Skills)
    const officialConfig = generateRichDetails(request.domain, request.topic);
    const lifeSkills = infuseLifeSkills(request.subjectType, request.topic);

    // 3. MULTIVERSE GENERATION (The "Meat")
    // We construct a premium plan structure here
    const plan = {
        title: `Experiencia de Aprendizaje: ${request.topic}`,
        strategy_flavor: "Gamified / Active Learning",
        phases: {
            inicio: `Desafío Inicial: ${lifeSkills.real_world_scenario}. (Activación)`,
            desarrollo: "Estaciones de Aprendizaje: Rotación por 3 centros (Investigación, Práctica, Creación).",
            cierre: "Tiquete de Salida: Metacognición con Emojis (¿Qué aprendí hoy?)."
        },
        evidence_product: "Lapbook Interactivo o Podcast Grupal",
        materials: officialConfig.suggested_materials,
        evaluation: {
            ...officialConfig.evaluation,
            admin_note: "Recuerde llenar la Boleta de Asistencia y revisar Adecuaciones (IEP)."
        }
    };

    // 4. UI ENHANCEMENT
    const uiPayload = {
        icon: getSubjectIcon(request.subjectType),
        color_theme: getSubjectColor(request.subjectType),
        components: ["KanbanBoard", "Timer", "EvidenceGallery"]
    };

    return {
        source: "APEX GENERATOR (PREMIUM)",
        suite: {
            plan_mediation: plan,
            admin_bundle: ["Lista de Asistencia", "Adecuación Curricular"],
            life_competency: lifeSkills,
            ui: uiPayload
        }
    };
}

/**
 * Helper to wrap DB results in the Premium structure.
 */
function wrapInApexSuite(data, message) {
    return {
        source: "APEX (DB RETRIEVAL)",
        message,
        suite: {
            core_resource: data,
            admin_reminder: "Don't forget the Attendance Log.",
            ui: { icon: "Database", components: ["DataViewer"] }
        }
    };
}

function getSubjectIcon(subject) {
    if (subject.includes("MATH")) return "Calculator";
    if (subject.includes("SCIENCE")) return "FlaskConical";
    return "BookOpen";
}

function getSubjectColor(subject) {
    if (subject.includes("MATH")) return "bg-blue-50";
    if (subject.includes("SCIENCE")) return "bg-emerald-50";
    return "bg-slate-50";
}
