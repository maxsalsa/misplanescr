const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const SUPERNOVA_DATA = [
    // 1. ARTES PLÁSTICAS (CREATIVIDAD)
    {
        materia: "Artes Plásticas",
        nivel: "Secundaria",
        icono: "🎨",
        recursos: [
            { t: "Guía de Esgrafiado", tipo: "TALLER", desc: "Técnica de raspado con crayolas y tinta china." },
            { t: "Historia del Arte Costarricense", tipo: "VIDEO_SEGURO", desc: "Video curado sobre Teodorico Quirós y Amighetti." },
            { t: "Rúbrica de Creatividad", tipo: "RUBRICA", desc: "Evalúa: Originalidad, Técnica y Limpieza." }
        ]
    },
    // 2. EDUCACIÓN FÍSICA (SALUD)
    {
        materia: "Educación Física",
        nivel: "General",
        icono: "🏃",
        recursos: [
            { t: "Test de Cooper (Resistencia)", tipo: "EXAMEN", desc: "Tabla de valoración física según edad y género." },
            { t: "Circuito Neuromotor", tipo: "PRACTICA", desc: "Estaciones: Salto, Equilibrio, Reptar." },
            { t: "Plan de Hidratación", tipo: "OTRO", desc: "Infografía sobre consumo de agua en el deporte." }
        ]
    },
    // 3. ORIENTACIÓN (VOCACIONAL)
    {
        materia: "Orientación Vocacional",
        nivel: "9° y 11°",
        icono: "🧭",
        recursos: [
            { t: "Test de Intereses (FODA)", tipo: "DIAGNOSTICO", desc: "Matriz de Fortalezas y Oportunidades personales." },
            { t: "Proyecto de Vida", tipo: "RUBRICA", desc: "Evaluación del portafolio de metas a corto/largo plazo." },
            { t: "Manejo de Ansiedad", tipo: "VIDEO_SEGURO", desc: "Técnicas de respiración para exámenes." }
        ]
    },
    // 4. ADECUACIONES (LEY 7600 - CRÍTICO)
    {
        materia: "Apoyo Educativo (Adecuaciones)",
        nivel: "Transversal",
        icono: "♿",
        recursos: [
            { t: "Plantilla de Adecuación Significativa", tipo: "ADMIN_TOOL", desc: "Formato oficial para cambiar objetivos del programa." },
            { t: "Prueba Específica (Letra Ampliada)", tipo: "EXAMEN", desc: "Modelo de examen para baja visión (Arial 14+)." },
            { t: "Carta a Padres (Consentimiento)", tipo: "ADMIN_TOOL", desc: "Autorización para aplicar adecuaciones." }
        ]
    },
    // 5. MÚSICA (CULTURA)
    {
        materia: "Educación Musical",
        nivel: "Primaria",
        icono: "🎵",
        recursos: [
            { t: "Musicograma: Himno a la Alegría", tipo: "PRACTICA", desc: "Lectura rítmica visual para niños." },
            { t: "Flauta Dulce: Notas Básicas", tipo: "VIDEO_SEGURO", desc: "Tutorial digitación mano izquierda." }
        ]
    }
];

async function main() {
    console.log("🌟 SUPERNOVA: LLENANDO LOS ESPACIOS VACÍOS...");
    
    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } }); // O "GOD_TIER" si actualizamos antes
    
    // Si no encuentra admin, busca cualquiera o crea uno dummy en memoria para no fallar el script
    const userId = admin ? admin.id : (await prisma.user.findFirst()).id;

    for (const area of SUPERNOVA_DATA) {
        // 1. Asegurar Asignatura
        const sub = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: area.materia, educationLevel: area.nivel, modalityType: "ACADEMICA" }},
            update: {},
            create: { name: area.materia, code: area.materia.substring(0,3).toUpperCase(), educationLevel: area.nivel, modalityType: "ACADEMICA" }
        });

        // 2. Inyectar Recursos
        for (const res of area.recursos) {
            await prisma.assessment.create({
                data: {
                    title: res.t,
                    type: res.tipo,
                    userId: userId,
                    subjectId: sub.id,
                    content: {
                        descripcion: res.desc,
                        origen: "Protocolo Supernova",
                        validado_mep: true
                    }
                }
            });
        }
        process.stdout.write(area.icono + " ");
    }

    console.log("\n\n✅ SUPERNOVA COMPLETADO.");
    console.log("   🌟 Se agregaron Artes, Música, Ed. Física y Orientación.");
    console.log("   🌟 Se incluyeron herramientas de LEY 7600 (Adecuaciones).");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());