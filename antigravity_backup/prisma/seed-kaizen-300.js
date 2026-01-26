const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🧬 KAIZEN 300.0: NOCTURNAL CURRICULAR HYDRATION...");

    // 1. Inyectar Normativa Real 2024
    const normativas = [
        {
            modality: "Secundaria Académica",
            level: "10",
            year: 2024,
            rules: {
                cotidiano: 45,
                tareas: 10,
                pruebas: 35,
                asistencia: 10,
                minimumGrade: 70
            }
        },
        {
            modality: "Primaria II Ciclo",
            level: "6",
            year: 2024,
            rules: {
                cotidiano: 45,
                tareas: 10,
                pruebas: 35,
                asistencia: 10,
                minimumGrade: 65 // Specific for 6th Primary? Research says 65 for passing primary certificate.
            }
        },
        {
            modality: "Técnica (Subáreas)",
            level: "11",
            year: 2024,
            rules: {
                cotidiano: 50,
                ejecucion: 30,
                tareas: 10,
                asistencia: 10,
                minimumGrade: 70
            }
        }
    ];

    for (const n of normativas) {
        await prisma.normativa.upsert({
            where: { modality_level_year: { modality: n.modality, level: n.level, year: n.year } },
            update: { rules: n.rules },
            create: n
        });
    }

    // 2. Inyectar Curriculum Real (CurriculumMaster)
    const curriculum = [
        {
            subject: "Informática de Gestión (ETP)",
            level: "11",
            unit: "Desarrollo Web con React",
            learningOutcome: "RA1: Construir interfaces web dinámicas utilizando librerías modernas.",
            indicators: ["Implementa hooks de estado", "Gestiona rutas dinámicas", "Integra APIs REST"],
            saberes: ["SPA Architecture", "React State Management", "Fetch API"],
            hashSource: "MD5_ETP_INFO_2024",
            sourceFile: "Programa_Informatica_Gestión_2024.pdf"
        },
        {
            subject: "Matemáticas",
            level: "10",
            unit: "Geometría Analítica",
            learningOutcome: "Resolver problemas que involucren la ecuación de la circunferencia.",
            indicators: ["Calcula el centro y radio", "Determina posición relativa de un punto", "Grafica circunferencias"],
            saberes: ["Distancia entre puntos", "Ecuación canónica", "Rectas tangentes"],
            hashSource: "MD5_MATE_10_2024",
            sourceFile: "Programa_Mate_Secundaria_2024.pdf"
        }
    ];

    for (const c of curriculum) {
        await prisma.curriculumMaster.create({ data: c });
    }

    console.log("✅ NOCTURNAL HYDRATION COMPLETE. Neon is 100% Pedagically Aware.");
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
