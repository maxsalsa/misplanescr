const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// V1700: MATERIAS COMPLEMENTARIAS Y BIENESTAR

const HUMANISTIC_DATA = [
    {
        name: "Orientación",
        code: "ORI-GEN",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA", // Transversal
        units: [
            {
                title: "Unidad 1: Conocimiento de sí mismo",
                grade: "7°",
                semester: 1,
                outcome: "Fortalecer la identidad personal mediante el autoconocimiento.",
                indicator: "Reflexiona sobre sus cualidades personales y áreas de mejora."
            },
            {
                title: "Unidad 2: Proyecto de Vida",
                grade: "9°",
                semester: 2,
                outcome: "Construir metas a corto y mediano plazo para el proyecto de vida.",
                indicator: "Valora diferentes opciones vocacionales según sus intereses."
            },
            {
                title: "Unidad Exit: Transición a la Vida Adulta",
                grade: "11°",
                semester: 2,
                outcome: "Analizar los retos de la inserción socio-laboral.",
                indicator: "Construye un plan de acción para la etapa post-secundaria."
            }
        ]
    },
    {
        name: "Psicología",
        code: "PSI-DIV",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA",
        units: [
            {
                title: "Unidad 1: Procesos Psicológicos Básicos",
                grade: "10°",
                semester: 1,
                outcome: "Comprender los fundamentos de la conducta humana.",
                indicator: "Analiza la influencia de la percepción y memoria en el comportamiento."
            },
            {
                title: "Unidad 2: Salud Mental y Bienestar",
                grade: "11°",
                semester: 1,
                outcome: "Promover estilos de vida saludables desde la psicología.",
                indicator: "Identifica factores protectores ante situaciones de estrés y ansiedad."
            }
        ]
    },
    {
        name: "Francés",
        code: "FR-MCER",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA",
        units: [
            {
                title: "Unité 1: Salutations et Présentations (A1)",
                grade: "7°",
                semester: 1,
                outcome: "Interactuar de forma sencilla en situaciones cotidianas.",
                indicator: "Présente soi-même et sa famille en utilisant des phrases simples."
            },
            {
                title: "Unité 3: Environnement et Voyages (A2)",
                grade: "10°",
                semester: 1,
                outcome: "Décrire des expériences passées et des projets futurs.",
                indicator: "Raconte un voyage passé en utilisant le passé composé."
            }
        ]
    },
    {
        name: "Afectividad y Sexualidad",
        code: "AFEC-SEX",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA", // Transversal
        units: [
            {
                title: "Taller: Relaciones Afectivas Sanas",
                grade: "8°",
                semester: 1,
                outcome: "Fomentar relaciones interpersonales basadas en el respeto.",
                indicator: "Analiza situaciones de riesgo en el noviazgo adolescente."
            },
            {
                title: "Taller: Derechos Sexuales y Reproductivos",
                grade: "10°",
                semester: 2,
                outcome: "Reconocer la importancia de la toma de decisiones informada.",
                indicator: "Valora la responsabilidad compartida en la salud sexual."
            }
        ]
    },
    {
        name: "Artes Industriales",
        code: "ART-IND",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA", // General for 7-9
        units: [
            {
                title: "Proyecto: Diseño y Materiales",
                grade: "8°",
                semester: 1,
                outcome: "Aplicar técnicas básicas de diseño y manipulación de materiales.",
                indicator: "Construye prototipos sencillos utilizando herramientas básicas."
            }
        ]
    },
    {
        name: "Educación para el Hogar",
        code: "EDU-HOG",
        educationLevel: "SECUNDARIA",
        modalityType: "ACADEMICA", // General for 7-9
        units: [
            {
                title: "Módulo: Nutrición y Gastronomía",
                grade: "7°",
                semester: 1,
                outcome: "Aplicar principios de nutrición en la preparación de alimentos.",
                indicator: "Prepara recetas sencillas considerando el valor nutricional."
            }
        ]
    }
];

async function main() {
    console.log("🚀 INICIANDO INYECCIÓN V1700 (HUMANÍSTICA)...");

    for (const subjectData of HUMANISTIC_DATA) {
        console.log(`\n🧡 Procesando: ${subjectData.name}`);

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
                code: subjectData.code
            },
            create: {
                name: subjectData.name,
                code: subjectData.code,
                educationLevel: subjectData.educationLevel,
                modalityType: subjectData.modalityType
            }
        });

        // 2. Inject Units
        for (const unitData of subjectData.units) {
            let unit = await prisma.studyUnit.findFirst({
                where: {
                    title: unitData.title,
                    subjectId: subject.id
                }
            });

            if (!unit) {
                unit = await prisma.studyUnit.create({
                    data: {
                        title: unitData.title,
                        grade: unitData.grade,
                        semester: unitData.semester,
                        subjectId: subject.id
                    }
                });
                console.log(`   + Creado: ${unitData.title} (${unitData.grade})`);
            } else {
                console.log(`   . Existente: ${unitData.title}`);
            }

            // 3. Inject Outcome & Indicator
            const outcomeExists = await prisma.learningOutcome.findFirst({ where: { unitId: unit.id } });

            if (!outcomeExists) {
                await prisma.learningOutcome.create({
                    data: {
                        description: unitData.outcome,
                        unitId: unit.id,
                        indicators: {
                            create: [
                                { description: unitData.indicator }
                            ]
                        }
                    }
                });
            }
        }
    }

    console.log("\n✨ PROTOCOLO V1700 HUMANÍSTICO COMPLETADO.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
