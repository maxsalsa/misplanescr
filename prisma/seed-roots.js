const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- CATÁLOGO ANCESTRAL (LECI - LENGUA Y CULTURA) ---
const INDIGENAS = [
    { 
        lengua: "Bribri", 
        territorio: "Talamanca/Salitre", 
        icono: "🍫", // Cacao sagrado
        temas: ["Los Clanes (Ditsö)", "La Casa Cónica (U-suré)", "El Cacao"],
        estrategia: "Círculo de la Palabra (Oralidad)"
    },
    { 
        lengua: "Cabécar", 
        territorio: "Chirripó", 
        icono: "🐆", // Jaguar
        temas: ["Plantas Medicinales", "Cantos de Trabajo (Jala de Piedra)"],
        estrategia: "Aprendizaje Vivencial en el Bosque"
    },
    { 
        lengua: "Maleku", 
        territorio: "Guatuso", 
        icono: "🎭", // Máscaras/Artesanía
        temas: ["Tocu (El Dios)", "Artesanía en Jícaro", "Flora y Fauna"],
        estrategia: "Taller Artesanal"
    },
    { 
        lengua: "Ngäbe", 
        territorio: "Coto Brus", 
        icono: "👗", // Vestido tradicional
        temas: ["La Maternidad", "La Cosecha del Café", "Leyendas"],
        estrategia: "Dramatización Cultural"
    }
];

// --- CATÁLOGO HORIZONTES (IDIOMAS EXPERIMENTALES) ---
const GLOBALES = [
    { idioma: "Italiano", nivel: "A1", icono: "🇮🇹", tema: "La Gastronomia e la Famiglia" },
    { idioma: "Alemán", nivel: "A1", icono: "🇩🇪", tema: "Begrüßungen (Saludos) y Rutina" },
    { idioma: "Portugués", nivel: "A1", icono: "🇧🇷", tema: "Apresentação Pessoal" }
];

async function main() {
    console.log("🌽 SEMBRANDO RAÍCES Y EXPANDIENDO HORIZONTES...");

    // Admin Check
    const admin = await prisma.user.findUnique({ where: { email: "max@misplanescr.com" } });
    if (!admin) { console.log("⚠️ Ejecute primero el script Fénix."); return; }

    // 1. INYECCIÓN INDÍGENA (ENFOQUE COSMOVISIÓN)
    for (const cultura of INDIGENAS) {
        // Asignatura: Lengua y Cultura
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: `Lengua y Cultura ${cultura.lengua}`, educationLevel: "PRIMARIA", modalityType: "ACADEMICA" }},
            update: {},
            create: { name: `Lengua y Cultura ${cultura.lengua}`, code: `LEC-${cultura.lengua.substring(0,3).toUpperCase()}`, educationLevel: "PRIMARIA", modalityType: "ACADEMICA" }
        });

        const uTitle = `Cosmovisión: ${cultura.temas[0]}`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: "General", subjectId: subject.id } });

        // PLAN VIVENCIAL
        await prisma.lessonPlan.create({
            data: {
                title: `Plan de Saberes: ${cultura.temas[0]}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    enfoque: "Pedagogía de la Madre Tierra",
                    icono: cultura.icono,
                    estrategias: {
                        inicio: "Saludo tradicional y permiso a los mayores.",
                        desarrollo: `${cultura.estrategia} sobre el tema ${cultura.temas[0]}.`,
                        cierre: "Reflexión colectiva y compartir alimentos."
                    },
                    adecuaciones: { 
                        acceso: ["Uso de lengua materna"], 
                        cultural: ["Respeto a tiempos ceremoniales"] 
                    },
                    rubrica: [
                        { indicador: "Oralidad", niveles: {1:"Escucha", 2:"Participa", 3:"Narra"} },
                        { indicador: "Valores", niveles: {1:"Conoce", 2:"Respeta", 3:"Practica"} }
                    ]
                }
            }
        });

        // INSTRUMENTO: LISTA DE COTEJO VIVENCIAL
        await prisma.assessment.create({
            data: {
                title: `Observación: Prácticas Culturales ${cultura.icono}`,
                type: "LISTA_COTEJO",
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    ambito: "Socio-Cultural",
                    instruccion: "Observar la participación respetuosa en la actividad."
                },
                rubric: { items: ["Usa la lengua materna", "Respeta el turno de palabra", "Colabora con el grupo"] }
            }
        });
        process.stdout.write("🌽");
    }

    // 2. INYECCIÓN GLOBAL (TERCEROS IDIOMAS)
    for (const global of GLOBALES) {
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: global.idioma, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
            update: {},
            create: { name: global.idioma, code: global.idioma.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
        });

        // PLAN COMUNICATIVO
        await prisma.lessonPlan.create({
            data: {
                title: `Lezione/Lektion: ${global.tema}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: `Unidad 1: ${global.tema}`,
                    enfoque: "Action-Oriented Approach",
                    icono: global.icono,
                    estrategias: {
                        inicio: "Video cultural / Canción típica.",
                        desarrollo: "Roleplay: Simulazione di una situazione reale.",
                        cierre: "Feedback formativo."
                    },
                    rubrica: [{ indicador: "Interacción Oral", niveles: {1:"A1.1", 2:"A1.2", 3:"A1.3"} }]
                }
            }
        });

        // INSTRUMENTO: RUBRICA ORAL
        await prisma.assessment.create({
            data: {
                title: `Oral Assessment: ${global.tema}`,
                type: "RUBRICA",
                userId: admin.id,
                subjectId: subject.id,
                content: { tipo: "Producción Oral", idioma: global.idioma },
                rubric: { criterios: ["Vocabulario", "Pronunciación", "Fluidez"], escala: "MCER A1" }
            }
        });
        process.stdout.write("🌍");
    }

    console.log(`\n\n✅ PROTOCOLO RAÍCES Y HORIZONTES COMPLETADO.`);
    console.log(`   🌽 Se inyectaron Lenguas Indígenas (Bribri, Cabécar, Maleku, Ngäbe).`);
    console.log(`   🌍 Se inyectaron Terceros Idiomas (Italiano, Alemán, Portugués).`);
    console.log(`   🌟 Variedad Total: Cosmovisión y MCER unidos en la BD.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());