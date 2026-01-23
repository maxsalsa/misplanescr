import OpenAI from 'openai';

// Singleton instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
    dangerouslyAllowBrowser: true // ONLY for demo/client-side rapid prototyping. Move to API route in Prod.
});

/**
 * ADAPTADOR DE DOMINIO UNIVERSAL
 * Define los estilos estéticos y pedagógicos para cada materia.
 */
const ESTILOS_VISUALES = {
    'ANATOMIA': "Medical illustration style, white background, realistic but clear, labeled major parts, high contrast.",
    'ELECTRONICA': "Technical schematic style, standard ANSI symbols, clean circuit lines, white background, blueprints.",
    'INFORMATICA': "Modern flat vector art, flowchart style, technological abstraction, clean UI elements, blue and indigo palette.",
    'EDUCACION_FISICA': "Biomechanical diagram, muscle highlighting, stick-figure motion guide, clear directional arrows.",
    'MATEMATICA': "Clean geometric shapes, graph paper background, high contrast lines, color-coded angles.",
    'ESTANDAR': "Educational textbook illustration, clean, minimal distractions, white background."
};

/**
 * Genera una descripción de imagen optimizada (Prompt Engineering) basada en el tema y dominio.
 */
function construirPromptImagen(tema, dominio, dificultad) {
    const estilo = ESTILOS_VISUALES[dominio] || ESTILOS_VISUALES['ESTANDAR'];
    const complejidad = dificultad === 'avanzado' ? "detailed, complex structures" : "simplified, fundamental shapes";

    return `Create an educational illustration for a student about: '${tema}'. 
    Style: ${estilo}. 
    Complexity: ${complejidad}. 
    No text inside the image unless standard symbols. High quality, 4k.`;
}

/**
 * Servicio de Generación de Medios Educativos
 */
export const MediaService = {
    /**
     * Genera una URL de imagen para explicar un concepto.
     * @param {string} tema - El concepto a ilustrar (ej: "Ciclo de Krebs")
     * @param {string} dominio - Área académica (ANATOMIA, ELECTRONICA, etc.)
     * @returns {Promise<string>} URL de la imagen generada
     */
    async generarIlustracion(tema, dominio = 'ESTANDAR') {
        console.log(`[MEDIA ACADEMY] Generando arte para: ${tema} (${dominio})`);

        // MODO DEMO / PROTECCIÓN (Si no hay llave real)
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
            console.warn("⚠️ MODO SIMULACIÓN: Usando imágenes de stock para ahorrar tokens.");
            return simularImagen(dominio);
        }

        try {
            const prompt = construirPromptImagen(tema, dominio, 'intermedio');
            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                quality: "standard",
            });
            return response.data[0].url;
        } catch (error) {
            console.error("Error generando imagen:", error);
            // Fallback elegante
            return simularImagen(dominio);
        }
    }
};

/**
 * Retorna imágenes placeholder de alta calidad según el tema si falla la IA.
 */
function simularImagen(dominio) {
    const placeholders = {
        'ANATOMIA': "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000", // Human cells
        'ELECTRONICA': "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000", // Chip/Circuit
        'INFORMATICA': "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", // Code
        'EDUCACION_FISICA': "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000", // Athlete
        'MATEMATICA': "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1000" // Math
    };
    return placeholders[dominio] || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000"; // Education generic
}
