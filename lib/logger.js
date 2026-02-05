// Sistema de Logs para Auditoría Interna
const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  AUDIT: "AUDIT", // Para acciones críticas (Borrar, Pagar)
};

export const logger = {
  info: (msg, data = {}) => log(LOG_LEVELS.INFO, msg, data),
  warn: (msg, data = {}) => log(LOG_LEVELS.WARN, msg, data),
  error: (msg, error = {}) =>
    log(LOG_LEVELS.ERROR, msg, { error: error.message || error }),
  audit: (userId, action, details) =>
    log(LOG_LEVELS.AUDIT, action, { userId, details }),
};

function log(level, message, data) {
  // En desarrollo, se ve bonito en consola
  if (process.env.NODE_ENV !== "production") {
    const timestamp = new Date().toLocaleTimeString();
    const color =
      level === "ERROR"
        ? "\x1b[31m"
        : level === "AUDIT"
          ? "\x1b[35m"
          : "\x1b[36m";
    console.log(`${color}[${level}] ${timestamp}\x1b[0m ${message}`, data);
  } else {
    // En producción, aquí se enviaría a un servicio como Sentry o Datadog
    // Por ahora, JSON estructurado para que el servidor lo guarde
    console.log(
      JSON.stringify({ level, timestamp: new Date(), message, ...data }),
    );
  }
}
