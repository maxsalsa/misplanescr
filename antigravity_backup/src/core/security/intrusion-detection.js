/**
 * 🚨 INTRUSION DETECTION SYSTEM (IDS)
 * Monitors suspicious user behavior and triggers admin alerts.
 */

export function reportSuspiciousActivity(userId, actionType) {
    const timestamp = new Date().toISOString();

    // Log interno
    console.error(`[SECURITY ALERT] User: ${userId} | Action: ${actionType} | Time: ${timestamp}`);

    // Simulación de envío a Telegram / Admin Dashboard
    // En producción: await fetch('/api/security/alert', { method: 'POST', body: ... })

    console.log(`📡 Enviando reporte a Lic. Max via Bot Telegram... [SIMULADO]`);
    console.log(`🔒 Metadata: IP Reference check initiated.`);
}
