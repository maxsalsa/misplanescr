/**
 * Clasifica texto por categorías de riesgo.
 * Importante: Esto NO acusa ni determina hechos. Solo sugiere protocolo.
 */
const KEYWORDS = {
    violencia: ["amenaza", "matar", "golpear", "agredir"],
    armas: ["arma", "navaja", "pistola", "cuchillo"],
    acoso: ["bullying", "hostigar", "humillar", "extorsión"],
    sexual: ["abuso", "tocó", "forzó", "violación"], // manejar con extremo cuidado
}

export function clasificarRiesgo(texto = "") {
    if (!texto) return { nivel: "BAJO", categoriaPrincipal: null, hits: [] };
    const t = texto.toLowerCase()
    const hits = []

    for (const [cat, words] of Object.entries(KEYWORDS)) {
        for (const w of words) {
            if (t.includes(w)) hits.push({ categoria: cat, palabra: w })
        }
    }

    const categoriaPrincipal = hits[0]?.categoria || null
    const nivel =
        categoriaPrincipal === "armas" || categoriaPrincipal === "sexual"
            ? "ALTO"
            : hits.length
                ? "MEDIO"
                : "BAJO"

    return { nivel, categoriaPrincipal, hits }
}
