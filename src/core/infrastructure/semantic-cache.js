import crypto from 'crypto';

/**
 * 💰 CACHÉ SEMÁNTICA GLOBAL (FINOPS & SOSTENIBILIDAD)
 * RQ-103: Latencia < 1.5s para consultas recurrentes.
 * 
 * Almacena respuestas generadas basándose en una "Huella Digital Pedagógica".
 * Si "Escuela A" y "Escuela B" piden lo mismo, el sistema responde instantáneo.
 */

// Simulación in-memory para Vercel Serverless (Idealmente Redis)
const GLOBAL_MEMORY_CACHE = new Map();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 Días de vida útil

class SemanticCache {
    constructor() {
        this.hits = 0;
        this.misses = 0;
    }

    /**
     * Genera un Key único basado en los parámetros curriculares.
     */
    generateKey(params) {
        // Normalizamos para que "Ciencias 7mo" sea igual a "ciencias 7mo"
        const canonical = {
            subject: (params.sub_area || '').toLowerCase().trim(),
            level: (params.nivel || '').toLowerCase().trim(),
            unit: (params.unidad || '').toLowerCase().trim(),
            modality: (params.modalidad || '').toLowerCase().trim(),
            // Ignoramos grupo y periodo porque el contenido es el mismo
        };

        const fingerprint = JSON.stringify(canonical);
        return crypto.createHash('sha256').update(fingerprint).digest('hex');
    }

    async get(params) {
        const key = this.generateKey(params);
        if (GLOBAL_MEMORY_CACHE.has(key)) {
            const entry = GLOBAL_MEMORY_CACHE.get(key);

            // Verificar TTL
            if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
                GLOBAL_MEMORY_CACHE.delete(key);
                return null;
            }

            console.log(`[FINOPS] 💰 AHORRO DETECTADO: Cache Hit para ${params.sub_area}`);
            this.hits++;
            return entry.data;
        }

        console.log(`[FINOPS] Cache Miss para ${params.sub_area}. Consultando IA...`);
        this.misses++;
        return null;
    }

    async set(params, data) {
        if (!data || data.length < 50) return; // No cachear errores o vacíos

        const key = this.generateKey(params);
        GLOBAL_MEMORY_CACHE.set(key, {
            data: data,
            timestamp: Date.now(),
            metadata: {
                modality: params.modalidad,
                created: new Date().toISOString()
            }
        });
        console.log(`[FINOPS] 🌱 Nuevo Conocimiento Indexado: ${key.substring(0, 8)}`);
    }

    getStats() {
        return {
            hits: this.hits,
            misses: this.misses,
            size: GLOBAL_MEMORY_CACHE.size,
            savings: `${((this.hits / (this.hits + this.misses || 1)) * 100).toFixed(1)}%`
        };
    }
}

// Singleton Global
const semanticCache = global.semanticCache || new SemanticCache();
if (process.env.NODE_ENV !== 'production') global.semanticCache = semanticCache;

export default semanticCache;
