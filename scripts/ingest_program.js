const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CONFIG
const STAGING_DIR = path.join(__dirname, '../data_staging');
const TARGET_FILE = 'biologia.json'; // Test Subject

// UTILS: BINOMIO SAGRADO ENGINE
function transformToBinomial(activdadRaw, tema) {
    // This function mimics the AI transformation rule
    // Input: "Debate sobre ecosistemas"
    // Output: "La persona docente organiza... La persona estudiante..."

    // Simple heuristic for the demo (Real production uses LLM)
    return `La persona docente facilita una experiencia de aprendizaje sobre '${tema}', mediando a través de ${activdadRaw.toLowerCase()}. La persona estudiante construye su conocimiento participando activamente en la actividad, demostrando comprensión del tema.`;
}

async function ingestProgram() {
    console.log(`🚀 ANTIGRAVITY INGESTION PROTOCOL: ${TARGET_FILE}`);

    try {
        const rawData = fs.readFileSync(path.join(STAGING_DIR, TARGET_FILE), 'utf-8');
        const json = JSON.parse(rawData);

        // 1. DECODIFICACIÓN (Parsing)
        const { subject, level, units } = json;
        console.log(`   DNA Detected: ${subject.toUpperCase()} | Level: ${level}`);

        if (!subject || !units) throw new Error("CORRUPT JSON: Missing Vital Fields");

        // 2. DB PREP & INJECTION
        // Create or Update Program
        const program = await prisma.studyProgram.upsert({
            where: {
                subject_level: {
                    subject: subject,
                    level: level || "General"
                }
            },
            update: { jsonContent: json },
            create: {
                subject: subject,
                level: level || "General",
                jsonContent: json
            }
        });
        console.log(`   ✅ StudyProgram Synced: ${program.id}`);

        // 3. ATOMIZATION (Learning Outcomes)
        let outcomesCount = 0;

        for (const unit of units) {
            if (!unit.outcomes) continue;

            for (const outcome of unit.outcomes) {
                // Determine Text
                const outcomeText = outcome.description || "Aprendizaje General";

                // Indicators Mapping
                const indicators = outcome.indicators
                    ? outcome.indicators.map(i => i.description).filter(d => d && d.length > 5 && !d.includes("Programa de Estudio")) // Noise Filter
                    : [];

                if (indicators.length === 0) continue; // Skip empty/noise

                // BINOMIO SAGRADO GENERATION
                const strategy = transformToBinomial("análisis e indagación", outcomeText);

                await prisma.learningOutcome.create({
                    data: {
                        programId: program.id,
                        text: outcomeText,
                        binomialStrategy: strategy,
                        indicators: indicators,
                        criteria: ["Logrado", "En Proceso", "No Logrado"] // Default
                    }
                });
                outcomesCount++;
            }
        }

        console.log(`   ✅ Atoms Injected: ${outcomesCount} Learning Outcomes.`);
        console.log("   🛡️  PROTOCOL COMPLETE. READY FOR DEPLOYMENT.");

    } catch (e) {
        console.error("   ❌ CRITICAL FAILURE:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

ingestProgram();
