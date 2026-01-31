const fs = require('fs');

// 🛡️ ANTIGRAVITY COGNITIVE-ETL ENGINE v2.0
// "The brain that reads the Matrix"

const OUTPUT_FILE = 'MEP-Core-v2.json';

// --- KNOWLEDGE BASE: BLOOM DIGITAL ---
const TAXONOMY_MAP = {
    "Conocer": "Categorizar",
    "Comprender": "Interpretar",
    "Aplicar": "Implementar",
    "Analizar": "Deconstruir",
    "Evaluar": "Juzgar",
    "Crear": "Diseñar",
    "Configurar": "Implementar", // Technical mapping
    "Identificar": "Diagnosticar"
};

// --- LOGIC ENGINE ---

function estimateComplexity(knowledgeItems) {
    if (knowledgeItems.length > 5) return "HIGH";
    if (knowledgeItems.length > 3) return "MEDIUM";
    return "LOW";
}

function calculateHours(complexity) {
    switch (complexity) {
        case "HIGH": return 12; // Crono-Data: High load
        case "MEDIUM": return 8;
        default: return 4;
    }
}

function generateDuaMatrix(topic, complexity) {
    // Cognitive DUA Generation based on Complexity
    if (complexity === "HIGH") {
        return {
            visual: `Diagrama de flujo interactivo sobre ${topic}`,
            auditory: `Podcast técnico: "Errores comunes en ${topic}"`,
            kinesthetic: `Laboratorio: Configuración real en entorno sandboxed`
        };
    }
    return {
        visual: `Infografía paso a paso: ${topic}`,
        auditory: `Lectura guiada con preguntas clave`,
        kinesthetic: `Juego de roles: "El técnico vs el Usuario"`
    };
}

function normalizeVerb(description) {
    const firstWord = description.split(' ')[0];
    return TAXONOMY_MAP[firstWord] || firstWord.toUpperCase(); // Fallback to UPPER
}

// 1. RAW DATA (Simulated "Paper" input)
const rawModules = [
    {
        id: "CIBER_11_U3",
        specialty: "Ciberseguridad",
        level: 11,
        ui_family: "HARD_TECH",
        unit_title: "Seguridad en Redes",
        learning_outcomes: [
            {
                code: "RA1",
                description: "Identificar vulnerabilidades en capas de red.",
                essential_knowledge: ["Modelo OSI", "Vectores de Ataque", "Sniffing"],
                performance_indicators: ["Diferencia entre amenaza y vulnerabilidad."],
                evaluation_type: "CHECKLIST"
            },
            {
                code: "RA2",
                description: "Configurar firewalls perimetrales.",
                essential_knowledge: ["Reglas de entrada/salida", "DMZ", "NAT", "IPS/IDS", "Logs", "VPN Site-to-Site"], // High complexity
                performance_indicators: ["Implementa políticas zero-trust."],
                evaluation_type: "RUBRIC"
            }
        ]
    }
];

// 2. COGNITIVE PROCESSING (The "Smart" part)
function processModules(modules) {
    return modules.map(mod => {
        // Family Fuzzy Logic
        let tags = ["Technical"];
        if (mod.ui_family === "HARD_TECH") tags.push("Lab-Intensive");

        // Process RAs
        const processedRAs = mod.learning_outcomes.map((ra, index) => {
            const complexity = estimateComplexity(ra.essential_knowledge);
            const hours = calculateHours(complexity);
            const actionVerb = normalizeVerb(ra.description);
            const topic = ra.essential_knowledge[0] || "Tema General";

            // Dependency Logic: RA2 likely depends on RA1
            const dependsOn = index > 0 ? [mod.learning_outcomes[index - 1].code] : [];

            return {
                code: ra.code,
                action_verb: actionVerb,
                description: ra.description,
                complexity: complexity,
                estimated_hours: hours,
                depends_on: dependsOn, // Logic Relational
                essential_knowledge: ra.essential_knowledge,
                performance_indicators: ra.performance_indicators,
                dua_options: generateDuaMatrix(topic, complexity), // matrix
                evaluation_strategy: {
                    type: ra.evaluation_type,
                    criteria_count: complexity === "HIGH" ? 5 : 3 // Auto-calculated
                }
            };
        });

        return {
            id: mod.id,
            specialty: mod.specialty,
            level: mod.level,
            ui_family: mod.ui_family,
            tags: tags,
            learning_outcomes: processedRAs
        };
    });
}

// 3. EXECUTION
console.log("🧠 INIT ANTIGRAVITY COGNITIVE-ETL v2.0...");
const enrichedModules = processModules(rawModules);

const output = {
    "curriculum_version": "2026-MEP-V2-GOLD",
    "metadata": {
        "generated_by": "Antigravity_ETL_v2.0",
        "total_modules": enrichedModules.length,
        "processing_timestamp": new Date().toISOString()
    },
    "modules": enrichedModules
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`✅ MEP-Core-v2.json GENERATED.`);
console.log(`   - Taxonomy: NORMALIZED (Bloom Digital)`);
console.log(`   - DUA Matrix: GENERATED (3-way)`);
console.log(`   - Crono-Data: CALCULATED`);
