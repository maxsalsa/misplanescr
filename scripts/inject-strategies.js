const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// V-ULTRA: NANO-PARTICLES (ESTRATEGIAS PRE-DISEÑADAS)
// BINOMIO SAGRADO: "La persona docente [verbo]... mientras que la persona estudiante [verbo]..."

const STRATEGIES = [
    // --- TRABAJO COTIDIANO (FOCALIZACIÓN) ---
    {
        title: "Lluvia de Ideas Estructurada",
        category: "COTIDIANO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente facilita una pregunta generadora sobre el tema en la pizarra, mientras que la persona estudiante construye respuestas breves en 'post-its' y las categoriza en plenaria."
    },
    {
        title: "Video-Foro Introductorio",
        category: "COTIDIANO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente presenta un recurso audiovisual corto sobre la temática, mientras que la persona estudiante analiza los puntos clave mediante una guía de observación."
    },
    // --- TRABAJO COTIDIANO (EXPLORACIÓN / CONTRASTACIÓN) ---
    {
        title: "Debate Socrático",
        category: "COTIDIANO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente cuestiona las premisas del grupo mediante preguntas abiertas, mientras que la persona estudiante debate sus argumentos basándose en evidencia teórica."
    },
    {
        title: "Estaciones de Aprendizaje",
        category: "COTIDIANO",
        educationLevel: "PRIMARIA",
        description: "La persona docente modela las instrucciones de cada estación, mientras que la persona estudiante resuelve retos prácticos rotando en grupos colaborativos."
    },
    {
        title: "Laboratorio Experimental",
        category: "COTIDIANO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente facilita los materiales y el protocolo de seguridad, mientras que la persona estudiante ejecuta el procedimiento científico registrando datos empíricos."
    },
    // --- TAREAS (REFUERZO) ---
    {
        title: "Investigación Bibliográfica",
        category: "TAREA",
        educationLevel: "SECUNDARIA",
        description: "La persona docente asigna temas específicos de indagación, mientras que la persona estudiante investiga fuentes confiables y sintetiza la información en un mapa conceptual."
    },
    {
        title: "Resolución de Problemas (Casa)",
        category: "TAREA",
        educationLevel: "SECUNDARIA",
        description: "La persona docente provee una batería de ejercicios prácticos, mientras que la persona estudiante resuelve los problemas aplicando las fórmulas vistas en clase."
    },
    // --- PROYECTOS (PROCESOS) ---
    {
        title: "ABP: Solución Comunal",
        category: "PROYECTO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente guía la identificación de una necesidad local, mientras que la persona estudiante diseña y prototipa una solución viable para su comunidad."
    },
    {
        title: "Feria Científica / Técnica",
        category: "PROYECTO",
        educationLevel: "SECUNDARIA",
        description: "La persona docente asesora metodológicamente las etapas del método científico, mientras que la persona estudiante construye su exhibición y defiende sus hallazgos ante un jurado."
    },
    // --- INGLES CONVERSACIONAL (V1500) ---
    {
        title: "Role-Play: Customer Service",
        category: "COTIDIANO",
        educationLevel: "SECUNDARIA", // Especialmente Tecnica
        description: "The teacher demonstrates standard customer service phrases, while the student performs a role-play scenario solving a client's request."
    }
];

async function main() {
    console.log("🚀 INICIANDO CARGA DE 'NANO-PARTICULAS' (ESTRATEGIAS V-ULTRA)...");

    for (const strat of STRATEGIES) {
        // Upsert para no duplicar si se corre varias veces
        // Usamos title como "unico" logico aqui aunque schema no lo tenga (buscamos primero)

        const existing = await prisma.pedagogicalStrategy.findFirst({
            where: { title: strat.title }
        });

        if (!existing) {
            await prisma.pedagogicalStrategy.create({
                data: {
                    title: strat.title,
                    description: strat.description,
                    category: strat.category,
                    educationLevel: strat.educationLevel
                }
            });
            console.log(`   + Inyectada: [${strat.category}] ${strat.title}`);
        } else {
            console.log(`   . Existente: [${strat.category}] ${strat.title}`);
        }
    }

    console.log("\n✨ BASE DE DATOS COGNITIVA ACTUALIZADA.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());
