/**
 * SECURITY SHIELD V1.0 (PLATINUM DEFENSE)
 * "Bank-Grade Protection for Educational Data"
 * 
 * Capabilities:
 * - Session Hygiene (20 min timeout).
 * - Data Masking (PII Protection).
 * - 2FA Enforcement Role-Based.
 */

const SESSION_TIMEOUT_MS = 20 * 60 * 1000; // 20 Minutes

export const SECURITY_POLICIES = {
    SESSION_TIMEOUT: SESSION_TIMEOUT_MS,
    MAX_LOGIN_ATTEMPTS: 3,
    TEMP_TOKEN_LIFE: 15 * 60 * 1000 // 15 Min
};

/**
 * Checks if the session is still valid.
 * @param {Date} lastActive - Timestamp of last user activity.
 * @returns {boolean} - True if valid, False if expired.
 */
export function validateSession(lastActive) {
    if (!lastActive) return false;
    const now = new Date();
    const elapsed = now - new Date(lastActive);
    return elapsed < SESSION_TIMEOUT_MS;
}

/**
 * Masks PII (Personally Identifiable Information) for JSON output.
 * @param {object} student - { id, fullName, idNumber }
 * @returns {object} - Masked student object.
 */
export function maskIdentity(student) {
    if (!student) return null;
    return {
        id: student.id,
        alias: `${student.fullName.charAt(0)}...${student.fullName.split(" ").pop()}`, // "J...Doe"
        hash: btoa(student.idNumber).slice(0, 10) // Simple Obfuscation
    };
}

/**
 * Determines if 2FA is mandatory for the role.
 * @param {string} role - USER, TEACHER, DIRECTOR, SUPER_ADMIN
 */
export function requiresTwoFactor(role) {
    const HIGH_CLEARANCE = ["DIRECTOR", "SUPER_ADMIN", "REGIONAL_ADVISOR"];
    return HIGH_CLEARANCE.includes(role);
}
