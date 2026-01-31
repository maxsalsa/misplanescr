const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- BANCO DE RECURSOS DEL MULTIVERSO ---

const TIPOS_RECURSO = [
    { tipo: "ESQUEMA", titulo: "Mapa Mental Resumen", detalle: "Visualizar conceptos clave" },
    { tipo: "DIAGRAMA", titulo: "Diagrama de Flujo", detalle: "Paso a paso del proceso" },
    { tipo: "RESUMEN", titulo: "Ficha de Estudio", detalle: "Puntos esenciales para examen" },
    { tipo: "INFOGRAFIA", titulo: "Infografía Digital", detalle: "Datos curiosos y estadísticas" }
];

const ACTIVIDADES_LUDICAS = [
    "Trivia Explosiva (Kahoot)", "Muro de Padlet Colaborativo", 
    "Escape Room Digital", "Bingo de Conceptos", "Quién quiere ser Millonario"
];

// --- GENERADOR DE GTA (GUÍA DE TRABAJO AUTÓNOMO) ---
function generarGTA(tema) {
    return {
        secciones: [
            { fase: "Me preparo", actividad: "Busco un lugar silencioso y mis materiales." },
            { fase: "Voy a recordar", actividad: `Lluvia de ideas sobre ${tema}.` },
            { fase: "Pongo en práctica", actividad: `Resolución de casos prácticos sobre ${tema}.` },
            { fase: "Autorregulación", actividad: "Reviso mi trabajo con la matriz." }
        ]
    };
}

// --- GENERADOR DE NIVELES (RÚBRICA) ---
function generarRubrica(tema) {
    return [1,2,3,4].map(i => ({
        indicador: `Indicador ${i} sobre ${tema}`,
        niveles: { inicial: "Cita", intermedio: "Caracteriza", avanzado: "Vincula/Aplica" }
    }));
}

// --- MAPA DEL UNIVERSO EDUCATIVO (MATERIAS + NIVELES) ---
const UNIVERSO = [
    // PREESCOLAR
    { mundo: "PREESCOLAR", materias: ["Autonomía", "Convivencia"], niveles: ["Materno", "Transición"] },
    // PRIMARIA
    { mundo: "PRIMARIA", materias: ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"], niveles: ["I Ciclo", "II Ciclo"] },
    // SECUNDARIA
    { mundo: "SECUNDARIA", materias: ["Matemáticas", "Español", "Ciencias", "Cívica", "Inglés", "Biología", "Física", "Química"], niveles: ["7°", "8°", "9°", "10°", "11°"] },
    // TÉCNICA
    { mundo: "TECNICA", materias: ["Turismo", "Contabilidad", "Secretariado", "Informática Redes", "Desarrollo Software", "Diseño", "Mecánica"], niveles: ["10°", "11°", "12°"] }
];

async function main() {
    console.log("🌌 CREANDO ECOSISTEMA DE SUPERVIVENCIA DOCENTE...");

    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    let totalRecursos = 0;

    for (const bloque of UNIVERSO) {
        console.log(`   🌍 Colonizando Mundo: ${bloque.mundo}`);
        
        for (const materiaName of bloque.materias) {
            const modalidad = bloque.mundo === "TECNICA" ? "TECNICA" : (bloque.mundo === "PREESCOLAR" ? "PREESCOLAR" : "ACADEMICA");
            
            // 1. Asignatura
            const subject = await prisma.subject.upsert({
                where: { name_educationLevel_modalityType: { name: materiaName, educationLevel: "SECUNDARIA", modalityType: modalidad }},
                update: {},
                create: { name: materiaName, code: materiaName.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: modalidad }
            });

            // Para cada nivel, generamos una Unidad Maestra llena de cosas
            for (const nivel of bloque.niveles) {
                const uTitle = `Unidad Integral: ${materiaName} (${nivel})`;
                const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: nivel, subjectId: subject.id } });

                // --- A. EL PLAN DE MEDIACIÓN (EL CORAZÓN) ---
                // Generamos 2 variantes: Una Estándar y una Innovadora
                await prisma.lessonPlan.create({
                    data: {
                        title: `Plan Maestro: ${materiaName} ${nivel}`,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            unidad: uTitle,
                            enfoque: "STEAM + Neuroeducación",
                            estrategias: {
                                inicio: "Activación de conocimientos previos con video detonador.",
                                desarrollo: "Trabajo colaborativo y construcción de producto.",
                                pausa_activa: { actividad: "Respiración 4-7-8", duracion: "3 min" },
                                cierre: "Socialización y retroalimentación entre pares."
                            },
                            adecuaciones: { acceso: ["Visual"], no_significativa: ["Tiempo"], alta_dotacion: ["Reto de Investigación"] },
                            rubrica: generarRubrica(materiaName)
                        }
                    }
                });

                // --- B. LA GTA (GUÍA DE TRABAJO AUTÓNOMO) ---
                await prisma.assessment.create({
                    data: {
                        title: `GTA: Guía Autónoma ${nivel}`,
                        type: "OTRO", // Usamos OTRO para GTA por ahora
                        userId: admin.id,
                        subjectId: subject.id,
                        content: { 
                            tipo_recurso: "GTA",
                            estructura: generarGTA(materiaName),
                            instruccion: "Para estudiantes con educación a distancia o refuerzo."
                        }
                    }
                });

                // --- C. RECURSOS VISUALES (RESÚMENES/ESQUEMAS) ---
                // Elegimos uno al azar para variar
                const recursoVisual = TIPOS_RECURSO[Math.floor(Math.random() * TIPOS_RECURSO.length)];
                await prisma.assessment.create({
                    data: {
                        title: `${recursoVisual.titulo}: ${materiaName}`,
                        type: "OTRO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: {
                            tipo_recurso: recursoVisual.tipo,
                            descripcion: recursoVisual.detalle,
                            formato: "PDF / Imagen Digital"
                        }
                    }
                });

                // --- D. ACTIVIDAD LÚDICA (TRIVIA/JUEGO) ---
                const juego = ACTIVIDADES_LUDICAS[Math.floor(Math.random() * ACTIVIDADES_LUDICAS.length)];
                await prisma.assessment.create({
                    data: {
                        title: `${juego}: Repaso ${nivel}`,
                        type: "DIAGNOSTICO",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: {
                            formato: "Gamificación",
                            preguntas: 10,
                            objetivo: "Repaso divertido antes del examen."
                        }
                    }
                });

                // --- E. ADAPTACIÓN CURRICULAR (NIVELACIÓN) ---
                await prisma.lessonPlan.create({
                    data: {
                        title: `Plan de Nivelación: Refuerzo ${materiaName}`,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            contexto: "Para estudiantes con diagnóstico bajo.",
                            estrategias: {
                                enfoque: "Enseñanza Explícita y Material Concreto",
                                actividad: "Práctica guiada paso a paso con andamiaje."
                            },
                            rubrica: generarRubrica(materiaName)
                        }
                    }
                });

                totalRecursos += 5;
                process.stdout.write("✨");
            }
        }
    }

    console.log(`\n\n✅ PROTOCOLO OMNI-GÉNESIS COMPLETADO.`);
    console.log(`   🌟 Total Recursos: ${totalRecursos}`);
    console.log(`   🌟 Variedad: GTA, Esquemas, Trivias, Planes Nivelatorios.`);
    console.log(`   🌟 Cobertura: Desde Preescolar hasta Técnica.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());