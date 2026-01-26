/**
 * 🕵️ SECURITY AUDIT LOGGING
 * Registers every single view, click, or download attempt for forensic analysis.
 */

export async function logSecurityEvent(userId, eventType, metadata = {}) {
    const event = {
        userId,
        eventType, // 'VIEW_DOC', 'DOWNLOAD_ATTEMPT', 'TERMS_ACCEPTED'
        timestamp: new Date().toISOString(),
        ipAddress: metadata.ip || 'UNKNOWN',
        deviceId: metadata.deviceId || 'UNKNOWN', // FingerprintJS hash usually
        resourceId: metadata.resourceId || 'VOID'
    };

    console.log(`📝 AUDIT LOG [${event.eventType}]: User ${userId} | Device: ${event.deviceId}`);

    // En Producción: Insertar en tabla 'SecurityLogs' de Neon
    // await prisma.securityLog.create({ data: event });

    // Verificación de Bloqueo de Identidad
    if (eventType === 'DOWNLOAD_ATTEMPT') {
        const identityLocked = true; // Simulación DB
        if (identityLocked && metadata.targetName !== metadata.dbName) {
            console.error("🚨 ALERTA CRÍTICA: Intento de spoofing de nombre en PDF.");
            throw new Error("SECURITY_VIOLATION: Identity Mismatch.");
        }
    }

    return true;
}
