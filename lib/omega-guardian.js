/**
 * OMEGA GUARDIAN V1.0 (ARCHITECT CORE)
 * "The Sentient Audit"
 * 
 * Capabilities:
 * - Bloom Validator (Verb vs Strategy Alignment).
 * - Route Integrity Check.
 * - Data Safety (Masking).
 * - Pedagogical Compliance Audit.
 */

import { maskIdentity } from './security-shield';
import { MODALITIES } from './chameleon-core';

export const OMEGA_RULES = {
    ROUTES: ["/dashboard/plans", "/dashboard/classroom", "/dashboard/settings"],
    BANNED_TERMS: ["Alumno", "Maestro", "Examen (in Preschool)"],
    REQ_COMPONENTS: ["Timer", "ProgressBar", "Watermark"]
};

/**
 * THE OMEGA AUDIT PROTOCOL
 * Run this before returning ANY content to the Frontend.
 */
export function runOmegaAudit(payload, userContext) {
    const auditLog = [];
    let sanitizedPayload = { ...payload };

    // 1. DATA SAFETY
    if (sanitizedPayload.student) {
        sanitizedPayload.student = maskIdentity(sanitizedPayload.student);
        auditLog.push("Student Identity Masked");
    }

    // 2. USER CONTEXT (Watermark)
    if (userContext.tier === "FREE") {
        sanitizedPayload.watermark = true;
        sanitizedPayload.ui_components = [...(sanitizedPayload.ui_components || []), "Watermark"];
        auditLog.push("Watermark Injected (Free Tier)");
    }

    // 3. ROUTE INTEGRITY
    if (sanitizedPayload.links) {
        sanitizedPayload.links = sanitizedPayload.links.filter(link =>
            OMEGA_RULES.ROUTES.some(route => link.href.startsWith(route))
        );
    }

    // 4. PEDAGOGICAL COMPLIANCE (Terminology)
    // Simple string scan (inefficient but effective for now)
    const contentStr = JSON.stringify(sanitizedPayload);
    OMEGA_RULES.BANNED_TERMS.forEach(term => {
        if (contentStr.includes(term)) {
            // Auto-correct or warn? For now, warn.
            console.warn(`[OMEGA WARNING] Banned term detected: ${term}`);
            auditLog.push(`Warning: ${term} detected.`);
        }
    });

    return { sanitizedPayload, auditLog };
}

/**
 * Validates Cognitive Alignment (Bloom's Taxonomy).
 * Ensures High-Order verbs aren't paired with Low-Order strategies.
 */
export function validateCognitiveAlignment(verb, strategyType) {
    const HIGH_ORDER_VERBS = ["Analiza", "Crea", "Evalúa", "Diseña", "Critica"];
    const PASSIVE_STRATEGIES = ["Lectura Silenciosa", "Copia de Texto", "Dictado"];

    if (HIGH_ORDER_VERBS.some(v => verb.includes(v)) && PASSIVE_STRATEGIES.includes(strategyType)) {
        return {
            valid: false,
            warning: `Mismatch: High-Order verb '${verb}' cannot be achieved with passive strategy '${strategyType}'. Suggest: Debate, Project, Lab.`
        };
    }
    return { valid: true };
}
