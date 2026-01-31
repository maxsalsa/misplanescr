const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// V1500: TALLERES EXPLORATORIOS Y BILINGÜISMO (7-9 TÉCNICO)

const TECHNICAL_FOUNDATIONS_DATA = [
    {
        // TALLER EXPLORATORIO: TURISMO (Rotativo)
        name: "Taller Exploratorio: Turismo",
        code: "EXP-TUR",
        educationLevel: "SECUNDARIA",
        modalityType: "TECNICA",
        icon: "Palmtree",
        modules: [
            {
                title: "Taller 1: Cultura Turística y Atención",
                grade: "7°",
                semester: 1,
                outcome: "Reconocer el potencial turístico de la comunidad local.",
                indicator: "Identifica atractivos turísticos locales mediante recorridos de campo." // V1500 PRACTICAL
            },
            {
                title: "Taller 2: Ecoturismo y Sostenibilidad",
                grade: "8°",
                semester: 1,
                outcome: "Aplicar principios de sostenibilidad en actividades recreativas.",
                indicator: "Participa en simulaciones de guiado turístico respetando normas ambientales."
            }
        ]
    },
    {
        // TALLER EXPLORATORIO: MADERAS (Vocacional)
        name: "Taller Exploratorio: Maderas",
        code: "EXP-MAD",
        educationLevel: "SECUNDARIA",
        modalityType: "TECNICA",
        icon: "Hammer",
        modules: [
            {
                title: "Taller 1: Herramientas Manuales y Seguridad",
                grade: "7°",
                semester: 1,
                outcome: "Utilizar herramientas de carpintería básica con seguridad.",
                indicator: "Construye piezas simples de madera aplicando normas de seguridad industrial (EPP)." // V1400 SAFETY
            }
        ]
    },
    {
        // INGLÉS CONVERSACIONAL (100% ORAL)
        name: "Inglés Conversacional",
        code: "ING-CONV",
        educationLevel: "SECUNDARIA",
        modalityType: "TECNICA",
        icon: "MessageCircle",
        modules: [
            {
                title: "Listening & Speaking: Self & Family",
                grade: "7°",
                semester: 1,
                outcome: "Exchange personal information in oral contexts (A1).", // V1500 ENGLISH
                indicator: "Introduces oneself and family members using basic greetings and phrases in a role-play."
            },
            {
                title: "Listening & Speaking: Daily Routine",
                grade: "8°",
                semester: 1,
                outcome: "Describe daily activities and habits orally (A1+).",
                indicator: "Oral presentation of a daily schedule using frequency adverbs correctly."
            },
            {
                title: "Listening & Speaking: Future Plans",
                grade: "9°",
                semester: 1,
                outcome: "Discuss future plans and predictions (A2).",
                indicator: "Debates about future career choices expressing opinions clearly." // V1500 ORAL MEDIATION
            }
        ]
    }
];

async function main() {
    console.log("🚀 INICIANDO INYECCIÓN V1500 (EXPLORATORIOS + BILINGÜISMO)...");

    for (const subjectData of TECHNICAL_FOUNDATIONS_DATA) {
        console.log(`\n🔧 Procesando: ${subjectData.name}`);

        // 1. Upsert Subject
        const subject = await prisma.subject.upsert({
            where: {
                name_educationLevel_modalityType: {
                    name: subjectData.name,
                    educationLevel: subjectData.educationLevel,
                    modalityType: subjectData.modalityType
                }
            },
            update: {
                code: subjectData.code,
                // icon: subjectData.icon // Removed to match schema
            },
            create: {
                name: subjectData.name,
                code: subjectData.code,
                educationLevel: subjectData.educationLevel,
                modalityType: subjectData.modalityType
                // icon: subjectData.icon
            }
        });

        // 2. Inject Units/Modules
        for (const mod of subjectData.modules) {
            let unit = await prisma.studyUnit.findFirst({
                where: {
                    title: mod.title,
                    subjectId: subject.id
                }
            });

            if (!unit) {
                unit = await prisma.studyUnit.create({
                    data: {
                        title: mod.title,
                        grade: mod.grade,
                        semester: mod.semester,
                        subjectId: subject.id
                    }
                });
                console.log(`   + Creado: ${mod.title} (${mod.grade})`);
            } else {
                console.log(`   . Existente: ${mod.title}`);
            }

            // 3. Inject Outcomes (Competencies)
            const outcomeExists = await prisma.learningOutcome.findFirst({ where: { unitId: unit.id } });

            if (!outcomeExists) {
                await prisma.learningOutcome.create({
                    data: {
                        description: mod.outcome,
                        unitId: unit.id,
                        indicators: {
                            create: [
                                { description: mod.indicator }
                            ]
                        }
                    }
                });
            }
        }
    }

    console.log("\n✨ PROTOCOLO V1500 COMPLETADO.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
