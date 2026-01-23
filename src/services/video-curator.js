
/**
 * Video Curator Service (Guardian Protocol)
 * Provides safe, curated YouTube content for MEP subjects.
 * 
 * STRATEGY:
 * 1. "Safe List": A hardcoded database of verified educational channels/videos.
 * 2. "Smart Search": Generates safe search queries for external links.
 */

const SAFE_CHANNELS = [
    { name: "MEP Costa Rica", id: "MEPCostaRica" },
    { name: "Profe en c@sa", id: "ProfeEnCasa" },
    { name: "Matemáticas Profe Alex", id: "MatematicasProfeAlex" }, // Very popular in LatAm
    { name: "Historia de Costa Rica", id: "HistoriaCR" }
];

const CURATED_DB = {
    "matematicas": [
        { title: "Funciones - Introducción", id: "Ll7xfe3HoZE", channel: "Matemáticas Profe Alex" },
        { title: "Geometría analítica", id: "o-xQ52kX22k", channel: "Profe en c@sa" }
    ],
    "ciencias": [
        { title: "La Célula - Estructura", id: "uruBGjvP-xQ", channel: "Biología Desde Cero" },
        { title: "Fotosíntesis", id: "ru6rZNQg3eM", channel: "Happylearning" }
    ],
    "estudios_sociales": [
        { title: "Campaña Nacional 1856", id: "3j2dsk3k", channel: "Museo Histórico" }, // Mock ID
        { title: "Historia de Costa Rica", id: "mock_id_2", channel: "MEP Oficial" }
    ],
    "español": [
        { title: "Análisis Literario", id: "mock_id_3", channel: "Lenguaje y Literatura" }
    ]
};

export const VideoCurator = {
    /**
     * Returns a list of curated videos for a subject/topic.
     * @param {string} subject 
     * @param {string} query 
     */
    curate: async (subject, query) => {
        // 1. Check verified DB
        const subjectKey = subject?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let results = [];

        // Fuzzy match subject
        for (const key in CURATED_DB) {
            if (subjectKey.includes(key)) {
                results = [...results, ...CURATED_DB[key]];
            }
        }

        // If no direct hits, return general useful links
        if (results.length === 0) {
            return [
                {
                    title: `Explorar "${query}" en YouTube Edu`,
                    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " educación costa rica")}`,
                    isExternal: true
                }
            ];
        }

        return results;
    },

    getSafeChannels: () => SAFE_CHANNELS
};
