import { prisma } from "./db";

/**
 * SERVICIO DE AUDITORÍA CENTRALIZADO (ANTIGRAVITY LOGGER)
 * =======================================================
 * Este módulo gestiona el registro de eventos del sistema.
 * * NIVELES DE LOG:
 * - INFO: Acciones normales (Login, Creación de Plan).
 * - WARN: Eventos inesperados pero no críticos (Reintentos de API).
 * - ERROR: Fallos que requieren atención (API caída, Error 500).
 * - CRITICAL: Fallos sistémicos (DB desconectada).
 */

const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  CRITICAL: "CRITICAL"
};

/**
 * Registra un evento en la base de datos y consola.
 * * @param {string} action - Código corto de la acción (ej: "PLAN_CREADO").
 * @param {string} message - Descripción humana del evento.
 * @param {string} level - Nivel de severidad (Default: INFO).
 * @param {string} userEmail - Usuario responsable (Default: SISTEMA).
 * @param {object} meta - Objeto JSON con detalles técnicos para debugging.
 */
export async function registrarAuditoria(action, message, level = "INFO", userEmail = "SISTEMA", meta = {}) {
  // 1. Salida visual inmediata para el desarrollador
  const timestamp = new Date().toLocaleTimeString();
  const icon = level === "ERROR" ? "❌" : level === "WARN" ? "⚠️" : "✅";
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${timestamp}] ${icon} [${action}] ${message}`);
  }

  // 2. Persistencia en la Nube (Neon DB)
  try {
    await prisma.systemLog.create({
      data: {
        level,
        action,
        message,
        user: userEmail,
        metadata: meta ? JSON.parse(JSON.stringify(meta)) : {} 
      }
    });
  } catch (error) {
    // Failsafe: Si falla el log, no detenemos la app, solo avisamos en consola.
    console.error("💀 FALLO CRÍTICO EN SISTEMA DE LOGS:", error.message);
  }
}

// Exportamos métodos rápidos para uso en toda la app
export const logger = {
  info: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.INFO, user, meta),
  warn: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.WARN, user, meta),
  error: (action, msg, user, meta) => registrarAuditoria(action, msg, LOG_LEVELS.ERROR, user, meta),
};
