const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NORMATIVA_2024 = [
    {
        modality: "Primaria",
        level: "I Ciclo",
        year: 2025,
        rules: {
            components: {
                "trabajo_cotidiano": 50,
                "tareas": 10,
                "pruebas": 20,
                "proyectos": 20
            },
            exceptions: [
                { type: "PrimerAño", period: "I", rule: "NO_WRITTEN_TEST", replaceWith: "SUMMATIVE_INSTRUMENT" }
            ]
        }
    },
    {
        modality: "Secundaria Académica",
        level: "7",
        year: 2025,
        rules: {
            components: {
                "trabajo_cotidiano": 45,
                "tareas": 10,
                "pruebas": 25,
                "asistencia": 10, // Example
                "proyecto": 10
            }
        }
    },
    {
        modality: "Secundaria Técnica",
        level: "10-12",
        year: 2025,
        rules: {
            components: {
                "trabajo_cotidiano": 40,
                "pruebas": 30,
                "proyecto": 30
            },
            practice: {
                hours: 320,
                forms: ["IEPP-01", "IEPP-02"],
                minGrade: 70
            }
        }
    }
];

const PEDAGOGICAL_RESOURCES = [
    // --- COTIDIANO (30 Items) ---
    ...Array(10).fill(0).map((_, i) => ({
        title: `Técnica de la Pregunta Exploratoria ${i + 1}`,
        type: "ACTIVIDAD_MEDIACION",
        contentJson: { instructions: "Dividir en grupos, lanzar preguntas detonadoras sobre el tema.", differentiation: ["Oral para baja visión", "Visual para sordos"] },
        tags: ["Cotidiano", "Primaria", "Secundaria"],
        subject: "General"
    })),
    ...Array(10).fill(0).map((_, i) => ({
        title: `Estudio de Caso: Resolución de Conflictos ${i + 1}`,
        type: "ACTIVIDAD_MEDIACION",
        contentJson: { instructions: "Presentar el caso X. Pedir análisis FODA.", differentiation: ["Audiolibro del caso"] },
        tags: ["Cotidiano", "Cívica", "Adultos"],
        subject: "General"
    })),
    // --- TAREAS (10 items) ---
    {
        title: "Mapa Mental Conceptual",
        type: "TAREA_CORTA",
        contentJson: { instructions: "Elaborar mapa mental en papel o digital. Evaluar jerarquía de conceptos." },
        tags: ["Tarea", "Visual", "DUA"],
        subject: "General"
    },
    // --- PRUEBAS (Templates) ---
    {
        title: "Plantilla Prueba Escrita (MEP 2024)",
        type: "EXAMEN",
        contentJson: { structure: ["Selección Única", "Correspondencia", "Respuesta Corta"], specificationTable: true },
        tags: ["Evaluación", "Sumativa"],
        subject: "General",
        isTemplate: true
    },
    // --- PROYECTOS (ABP) ---
    {
        title: "ABP: Soluciones Sostenibles",
        type: "PLAN_UNIDAD", // Using closest type
        contentJson: { phases: ["Investigación", "Prototipado", "Presentación"], rubric: "Rubrica_ABP_General" },
        tags: ["Proyecto", "Ciencias", "Estudios Sociales"],
        subject: "Ciencias",
        isTemplate: true
    }
];


async function main() {
    console.log(`🚀 KAIZEN 50.0: INJECTING SOVEREIGN KNOWLEDGE...`);

    // 1. CLEAR & SEED NORMATIVA
    console.log(`Step 1: Normativa Rules...`);
    // await prisma.normativa.deleteMany({}); // Dangerous in prod, safe in dev seed
    for (const rule of NORMATIVA_2024) {
        await prisma.normativa.upsert({
            where: { modality_level_year: { modality: rule.modality, level: rule.level, year: rule.year } },
            update: { rules: rule.rules },
            create: rule
        });
    }

    // 2. SEED PEDAGOGICAL RESOURCES
    console.log(`Step 2: Pedagogical Library (${PEDAGOGICAL_RESOURCES.length} items)...`);
    // We need a dummy user to be the author
    const superAdmin = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
    if (!superAdmin) {
        console.warn("⚠️ No SuperAdmin found. Skipping Resource Seed. Run basic seed first.");
    } else {
        for (const res of PEDAGOGICAL_RESOURCES) {
            await prisma.pedagogicalResource.create({
                data: {
                    title: res.title,
                    type: res.type,
                    contentJson: res.contentJson,
                    tags: { set: res.tags }, // Prisma specific for arrays if supported or just pass as is if string[]
                    subject: res.subject,
                    level: "General",
                    authorId: superAdmin.id,
                    isTemplate: res.isTemplate || false
                }
            });
        }
    }

    console.log(`✅ KAIZEN 50.0 COMPLETE. SYSTEM IS SOVEREIGN.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
