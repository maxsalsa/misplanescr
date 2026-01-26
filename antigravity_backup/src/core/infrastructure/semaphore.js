/**
 * 🚦 SEMÁFORO DE CONEXIONES (QUEUE MANAGER)
 * 
 * Implementación del patrón "Token Bucket" / Semáforo para controlar la concurrencia
 * hacia la API de OpenAI/Gemini.
 * 
 * Objetivo: Evitar error 429 (Too Many Requests) durante picos de tráfico (ej. Domingos).
 * Límite SRE: 5 peticiones concurrentes máximas.
 */

const MAX_CONCURRENT_REQUESTS = 5;
const QUEUE_TIMEOUT_MS = 30000; // 30s de espera máxima antes de timeout

class Semaphore {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency;
        this.activeRequests = 0;
        this.queue = [];
    }

    /**
     * Solicita permiso para ejecutar una tarea.
     * Si hay cupo, resuelve inmediatamente.
     * Si no, entra a la cola.
     * @returns {Promise<Function>} Una función 'release' que debe llamarse al terminar.
     */
    async acquire() {
        if (this.activeRequests < this.maxConcurrency) {
            this.activeRequests++;
            return () => this.release();
        }

        // Si estamos llenos, crear una promesa y ponerla en la cola
        return new Promise((resolve, reject) => {
            const queueItem = {
                resolve,
                timestamp: Date.now()
            };

            // Timeout de seguridad: Si espera mucho, falla gracefuly
            setTimeout(() => {
                const index = this.queue.indexOf(queueItem);
                if (index !== -1) {
                    this.queue.splice(index, 1);
                    reject(new Error("🚦 Tráfico Alto: Tiempo de espera en fila agotado. Por favor intenta en 1 minuto."));
                }
            }, QUEUE_TIMEOUT_MS);

            this.queue.push(queueItem);
            // Feedback de consola para SRE
            console.log(`🚦 Cola SRE: Usuario encolado. Posición: ${this.queue.length}`);
        });
    }

    release() {
        this.activeRequests--;
        if (this.queue.length > 0) {
            this.activeRequests++; // Tomamos el cupo para el siguiente
            const nextItem = this.queue.shift();
            // Le pasamos la función release al siguiente
            nextItem.resolve(() => this.release());
            console.log(`🚦 Cola SRE: Usuario liberado. Restantes: ${this.queue.length}`);
        }
    }

    getStatus() {
        return {
            active: this.activeRequests,
            queued: this.queue.length,
            isFull: this.activeRequests >= this.maxConcurrency
        };
    }
}

// Instancia Singleton Global
// En Next.js (Serverless), esto se reseteará por lambda, pero ayuda en "Cold Starts" concurrentes 
// o si se despliega en un servidor Node.js persistente (recomendado).
const globalSemaphore = global.aiSemaphore || new Semaphore(MAX_CONCURRENT_REQUESTS);

if (process.env.NODE_ENV !== 'production') {
    global.aiSemaphore = globalSemaphore;
}

export default globalSemaphore;
