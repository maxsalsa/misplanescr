import { prisma } from "./db";

/**
 * SERVICIO DE AUDITORÍA CENTRALIZADO (ANTIGRAVITY LOGGER)
 * -------------------------------------------------------
 * Este servicio se encarga de registrar eventos críticos en la base de datos Neon
 * y en la consola del servidor para depuración inmediata.
 */

const LOG_LEVELS = {
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
    CRITICAL: "CRITICAL"
};

/**
 * Registra un evento en el sistema.
 * @param {string} action - Nombre corto de la acción (Ej: "LOGIN_EXITOSO").
 * @param {string} message - Descripción detallada en español.
 * @param {string} level - Nivel de severidad (INFO, WARN, ERROR).
 * @param {string|null} userEmail - Correo del usuario implicado.
 * @param {object|null} meta - Objeto JSON con detalles técnicos.
 */
export async function registrarAuditoria(action, message, level = "INFO", userEmail = "SISTEMA", meta = {}) {
    // 1. Salida en Consola (Inmediata)
    const timestamp = new Date().toLocaleTimeString();
    const icon = level === "ERROR" ? "❌" : level === "WARN" ? "⚠️" : "✅";
    console.log(`[${timestamp}] ${icon} [${action}] ${message}`);

    // 2. Registro Persistente en Neon DB (Asíncrono para no frenar la app)
    try {
        await prisma.systemLog.create({
            data: {
                level,
                action,
                message,
                user: userEmail,
                metadata: meta ? JSON.parse(JSON.stringify(meta)) : {} // Asegurar JSON válido
            }
        });
    } catch (error) {
        console.error("💀 ERROR CRÍTICO: Falló el sistema de logs (Neon DB no responde).", error);
    }
}

export const logger = {
    info: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.INFO, user, meta),
    warn: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.WARN, user, meta),
    error: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.ERROR, user, meta),
};
