/**
 * 🔑 LICENSE MANAGER (B2B)
 * Handles activation of Group Licenses via Token.
 */

// Mock DB wrapper - Replace with real Prisma calls in production
const dbIndex = {
    institutions: [
        { id: "inst-ctp-01", name: "CTP de Inteligencia Artificial", masterToken: "CTP-IA-2026", slots: 50, used: 12 },
        { id: "inst-lic-02", name: "Liceo Académico Nocturno", masterToken: "LIC-NOC-2026", slots: 30, used: 30 }
    ]
};

export async function activateGroupLicense(userId, token, userDetails = {}, ipAddress = '127.0.0.1') {
    console.log(`🔑 Intento de Activación: User ${userId} | Token ${token} | IP ${ipAddress}`);

    // 1. Simulación de Geo-Bloqueo
    if (!ipAddress.startsWith("196.") && !ipAddress.startsWith("10.") && !ipAddress.startsWith("127.")) {
        // Rangos comunes de CR (Simulación)
        console.warn(`⚠️ ALERTA DE SEGURIDAD: Activación desde IP extranjera (${ipAddress}). Bloqueando.`);
        throw new Error("GEO_BLOCK: Esta licencia solo puede activarse desde Costa Rica.");
    }

    // 2. Validar Token y Obtener Datos de Modalidad
    const institution = dbIndex.institutions.find(i => i.masterToken === token);

    if (!institution) {
        throw new Error("❌ Token Inválido: Código no encontrado en el Ministerio.");
    }

    // 3. Validar Estructura Educativa (Specialty Binding)
    // NOTE: This logic assumes 'educationalLevel' and 'schedule' properties exist on the institution object.
    // The current mock `dbIndex` does not contain these properties.
    // In a real scenario, these would be fetched from the database.
    if (institution.educationalLevel === 'CTP' && !userDetails.specialty) {
        throw new Error("⚠️ Requisito Faltante: Debe indicar su Especialidad Técnica para unirse a un CTP.");
    }

    // 4. Verificar Cupos
    if (institution.used >= institution.slots) {
        throw new Error("⛔ Cupos Agotados: Contacte al Director para ampliar la licencia.");
    }

    // 5. Vincular Usuario (Simulación de Transacción Atómica)
    // await prisma.$transaction(...)
    institution.used += 1; // Optimistic update

    console.log(`✅ ¡Éxito! Docente ${userId} vinculado a ${institution.name} (${institution.schedule}).`);

    return {
        success: true,
        institutionName: institution.name,
        modality: institution.educationalLevel,
        newPlan: "ENTERPRISE",
        message: "Licencia Institucional Activada. Perfil Pedagógico Sincronizado."
    };
}

export async function revokeLicense(adminId, targetUserId) {
    // Solo el Director (adminId) puede revocar
    console.log(`🚫 Revocando licencia de ${targetUserId} por orden de ${adminId}`);
    return { success: true, message: "Cupo liberado." };
}
