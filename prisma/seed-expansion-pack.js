const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- CATÁLOGO DE TALLERES EXPLORATORIOS (MEP III CICLO) ---
const TALLERES = [
    // INDUSTRIALES
    { nombre: "Taller de Maderas", area: "Industrial", icono: "🪚", enfoque: "Carpintería Básica" },
    { nombre: "Taller de Metales", area: "Industrial", icono: "🔩", enfoque: "Soldadura y Ajuste" },
    { nombre: "Taller de Electricidad", area: "Industrial", icono: "⚡", enfoque: "Circuitos Básicos" },
    { nombre: "Taller de Mecánica de Precisión", area: "Industrial", icono: "⚙️", enfoque: "Torneado Básico" },
    
    // COMERCIAL Y SERVICIOS
    { nombre: "Taller de Turismo Ecológico", area: "Comercial", icono: "🌿", enfoque: "Guíado Local" },
    { nombre: "Taller de Gestión Cooperativa", area: "Comercial", icono: "🤝", enfoque: "Emprendedurismo" },
    { nombre: "Taller de Ciber-Robótica", area: "Comercial", icono: "🤖", enfoque: "Programación Básica" },
    { nombre: "Taller de Secretariado Ejecutivo", area: "Comercial", icono: "💼", enfoque: "Atención al Cliente" },

    // AGROPECUARIA
    { nombre: "Taller de Agroecología", area: "Agro", icono: "🌱", enfoque: "Huertas Sostenibles" },
    { nombre: "Taller de Industrias Alimentarias", area: "Agro", icono: "🧀", enfoque: "Inocuidad de Alimentos" }
];

// --- CATÁLOGO DE IDIOMAS (MEP BILINGÜE) ---
const IDIOMAS = [
    { nombre: "Inglés Conversacional (7°)", nivel: "Band A1", icono: "🇺🇸", enfoque: "Daily Routine & Greetings" },
    { nombre: "Inglés Conversacional (9°)", nivel: "Band A2", icono: "🇺🇸", enfoque: "Past Events & Future Plans" },
    { nombre: "Inglés Conversacional (11°)", nivel: "Band B1", icono: "🇺🇸", enfoque: "Debate & Social Issues" },
    { nombre: "Francés (Tercer Ciclo)", nivel: "A1", icono: "🇫🇷", enfoque: "La Vie Quotidienne" },
    { nombre: "Italiano (Experimental)", nivel: "A1", icono: "🇮🇹", enfoque: "Cultura e Gastronomia" }
];

async function main() {
    console.log("🌍 DESPLEGANDO MÓDULO DE ESPECIALIDADES...");

    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    // 1. INYECCIÓN DE TALLERES (ENFOQUE PRÁCTICO)
    for (const taller of TALLERES) {
        // Crear Asignatura
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: taller.nombre, educationLevel: "SECUNDARIA", modalityType: "TECNICA" }},
            update: {},
            create: { name: taller.nombre, code: taller.nombre.substring(0,4).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: "TECNICA" }
        });

        // Crear Proyecto (Unidad)
        const uTitle = `Proyecto Taller: ${taller.enfoque}`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: "III Ciclo", subjectId: subject.id } });

        // PLAN MAESTRO (PROYECTO)
        await prisma.lessonPlan.create({
            data: {
                title: `Guía de Proyecto: ${taller.enfoque}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    icono: taller.icono,
                    enfoque: "Aprender Haciendo (Learning by Doing)",
                    estrategias: {
                        inicio: "Charla de Seguridad (5 min) y Asignación de Roles.",
                        desarrollo: "Ejecución práctica en taller con supervisión docente.",
                        pausa_activa: { actividad: "Estiramiento de espalda/manos", duracion: "5 min" },
                        cierre: "Limpieza de área (5S) y revisión de avances."
                    },
                    rubrica: [1,2,3].map(i => ({ indicador: `Destreza Práctica ${i}`, niveles: {1:"Necesita Ayuda", 2:"Lo hace solo", 3:"Experto/Enseña"} }))
                }
            }
        });

        // INSTRUMENTO CLAVE: LISTA DE SEGURIDAD
        await prisma.assessment.create({
            data: {
                title: `Lista de Cotejo: Seguridad y Orden ${taller.icono}`,
                type: "LISTA_COTEJO",
                userId: admin.id,
                subjectId: subject.id,
                rubric: { items: ["Usa anteojos/guantes de seguridad", "Mantiene el área limpia", "Usa herramientas correctamente"] },
                content: { ambito: "Seguridad Ocupacional", ui_color: "orange" }
            }
        });

        // INSTRUMENTO: RÚBRICA DE PRODUCTO
        await prisma.assessment.create({
            data: {
                title: `Rúbrica de Producto: ${taller.enfoque}`,
                type: "OTRO",
                userId: admin.id,
                subjectId: subject.id,
                rubric: { criterios: ["Acabado", "Funcionalidad", "Creatividad"], escala: "1-100 pts" },
                content: { tipo_recurso: "Rúbrica Sumativa" }
            }
        });

        process.stdout.write("🔧");
    }

    // 2. INYECCIÓN DE IDIOMAS (ENFOQUE COMUNICATIVO)
    for (const idioma of IDIOMAS) {
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: idioma.nombre, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
            update: {},
            create: { name: idioma.nombre, code: "LANG", educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
        });

        const uTitle = `Communicative Task: ${idioma.enfoque}`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: idioma.nivel, subjectId: subject.id } });

        // PLAN CONVERSACIONAL
        await prisma.lessonPlan.create({
            data: {
                title: `Lesson Plan: ${idioma.enfoque}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    icono: idioma.icono,
                    enfoque: "Action-Oriented Approach",
                    estrategias: {
                        inicio: "Warm-up: Tongue Twisters / Song.",
                        desarrollo: "Roleplay: Students simulate a real-life scenario in pairs.",
                        pausa_activa: { actividad: "Simon Says / Commands", duracion: "5 min" },
                        cierre: "Cool-down: Peer Feedback loop."
                    },
                    rubrica: [1,2,3].map(i => ({ indicador: `Oral Skill ${i}`, niveles: {1:"A1 (Basic)", 2:"A2 (Developing)", 3:"B1 (Independent)"} }))
                }
            }
        });

        // INSTRUMENTO: RUBRICA ORAL
        await prisma.assessment.create({
            data: {
                title: `Oral Rubric: ${idioma.enfoque}`,
                type: "OTRO",
                userId: admin.id,
                subjectId: subject.id,
                rubric: { criterios: ["Pronunciation", "Fluency", "Grammar Accuracy", "Interaction"], escala: "MCER Bands" },
                content: { tipo_recurso: "Rúbrica Oral", ui_color: "indigo" }
            }
        });

        process.stdout.write("🗣️");
    }

    console.log(`\n\n✅ PAQUETE DE EXPANSIÓN COMPLETADO.`);
    console.log(`   🌟 Talleres Exploratorios (Maderas, Turismo, Robótica).`);
    console.log(`   🌟 Inglés Conversacional (Bandas A1-B1).`);
    console.log(`   🌟 Instrumentos Específicos (Seguridad, Oralidad).`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());