const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- BANCOS DE INGREDIENTES PEDAGÓGICOS ---

const ROLES = [
    "Detectives Históricos", "Ingenieros de la NASA", "Periodistas de Investigación", 
    "Críticos de Arte", "Auditores Financieros", "Científicos Forenses", 
    "Guías Turísticos", "Desarrolladores de Software", "Jueces de Debate"
];

const PRODUCTOS = [
    "Podcast Narrativo", "Infografía Interactiva", "Maqueta 3D", 
    "Video Tipo TikTok Educativo", "Mural Colaborativo", "Programa de Radio", 
    "Cómic Digital", "Simulación Teatral", "Informe Técnico Ejecutivo"
];

const HERRAMIENTAS_DIGITALES = [
    "Canva", "Kahoot", "Padlet", "Genially", "Scratch", "Minecraft Education", "Google Earth"
];

const EVALUACIONES = [
    { tipo: "Rúbrica", titulo: "Rúbrica Analítica de Desempeño", enfoque: "Proceso" },
    { tipo: "Lista", titulo: "Lista de Cotejo de Producto Final", enfoque: "Resultado" },
    { tipo: "Escala", titulo: "Escala de Apreciación Actitudinal", enfoque: "Socioafectivo" },
    { tipo: "Diario", titulo: "Bitácora de Aprendizaje", enfoque: "Metacognición" }
];

// --- MATERIAS Y NIVELES (EL MAPA COMPLETO) ---
const MAPA_EDUCATIVO = [
    { nivel: "Preescolar", materias: ["Identidad y Autonomía", "Convivencia", "Medio Natural"] },
    { nivel: "Primaria (I Ciclo)", materias: ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"] },
    { nivel: "Primaria (II Ciclo)", materias: ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"] },
    { nivel: "Secundaria (7-9)", materias: ["Matemáticas", "Español", "Ciencias", "Cívica", "Inglés", "Francés", "Música", "Hogar", "Artes Industriales"] },
    { nivel: "Diversificada (10-11)", materias: ["Física", "Química", "Biología", "Psicología", "Filosofía"] },
    { nivel: "Técnica (10-12)", materias: ["Contabilidad", "Turismo", "Desarrollo Software", "Redes", "Electrónica", "Mecánica", "Diseño", "Agropecuaria"] }
];

// FUNCIÓN DE AZAR (LA MAGIA)
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function main() {
    console.log("🎨 MEZCLANDO INGREDIENTES PARA CREAR PLANES ÚNICOS...");

    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    // CORRECCIÓN: Variable unificada
    let totalItems = 0;

    for (const bloque of MAPA_EDUCATIVO) {
        console.log(`   🌍 Explorando Nivel: ${bloque.nivel}`);
        
        for (const materiaName of bloque.materias) {
            // Configurar Modalidad
            const isTecnico = bloque.nivel.includes("Técnica");
            const isPreescolar = bloque.nivel.includes("Preescolar");
            const modalidad = isTecnico ? "TECNICA" : (isPreescolar ? "PREESCOLAR" : "ACADEMICA");

            // Crear Asignatura
            const subject = await prisma.subject.upsert({
                where: { name_educationLevel_modalityType: { name: materiaName, educationLevel: isPreescolar ? "PREESCOLAR" : "SECUNDARIA", modalityType: modalidad }},
                update: {},
                create: { name: materiaName, code: materiaName.substring(0,4).toUpperCase(), educationLevel: isPreescolar ? "PREESCOLAR" : "SECUNDARIA", modalityType: modalidad }
            });

            // Crear Unidad Genérica
            const uTitle = `Unidad Creativa: ${materiaName} en Contexto`;
            const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: bloque.nivel, subjectId: subject.id } });

            // --- GENERAR 3 PLANES COMPLETAMENTE DIFERENTES ---
            for (let i = 1; i <= 3; i++) {
                const rol = pick(ROLES);
                const producto = pick(PRODUCTOS);
                const herramienta = pick(HERRAMIENTAS_DIGITALES);
                
                const tituloPlan = isPreescolar 
                    ? `Experiencia Lúdica ${i}: Explorando con ${producto}` 
                    : `Plan Innovador #${i}: ${rol} creando ${producto}`;

                await prisma.lessonPlan.create({
                    data: {
                        title: tituloPlan,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            unidad: uTitle,
                            enfoque: `Aprendizaje Basado en ${producto}`,
                            estrategias: {
                                inicio: `Activación: Los estudiantes asumen el rol de ${rol} y reciben una 'misión confidencial'.`,
                                desarrollo: `Taller Práctico: Utilizando ${herramienta}, los equipos construyen un ${producto} sobre el tema.`,
                                pausa_activa: { actividad: "Dinámica de Movimiento", duracion: "5 min" },
                                cierre: "Socialización: Feria de museo donde exponen sus creaciones."
                            },
                            adecuaciones: {
                                acceso: ["Uso de tabletas", "Instrucciones en audio"],
                                no_significativa: ["Reducción de cantidad"],
                                alta_dotacion: ["Mentores del grupo"]
                            },
                            rubrica: [1,2,3,4,5].map(x => ({ indicador: `Criterio ${x}`, niveles: {1:"Inicial", 2:"Intermedio", 3:"Avanzado"} }))
                        }
                    }
                });
            }

            // --- GENERAR BATERÍA DE EVALUACIÓN VARIADA ---
            
            // 1. Prueba Escrita (Variada)
            await prisma.assessment.create({
                data: {
                    title: `Prueba Reto: ${materiaName}`,
                    type: "EXAMEN",
                    userId: admin.id,
                    subjectId: subject.id,
                    content: { 
                        partes: ["Selección (Análisis de Casos)", "Pareo (Conceptos vs Ejemplos)", "Ensayo Corto"],
                        nota: "Enfoque en aplicación, no memoria."
                    }
                }
            });

            // 2. Instrumento Alternativo (Azar)
            const instrumento = pick(EVALUACIONES);
            await prisma.assessment.create({
                data: {
                    title: `${instrumento.titulo}: ${materiaName}`,
                    type: instrumento.tipo === "Lista" ? "LISTA_COTEJO" : "OTRO", // Mapeo simple
                    userId: admin.id,
                    subjectId: subject.id,
                    rubric: { criterios: ["Creatividad", "Investigación", "Presentación"], escala: "1-10" },
                    content: { enfoque: instrumento.enfoque, instruccion: "Utilizar al finalizar el proyecto." }
                }
            });

            // 3. Trivia Gamificada
            await prisma.assessment.create({
                data: {
                    title: `Trivia ${pick(["Explosiva", "Misteriosa", "Galáctica"])}: ${materiaName}`,
                    type: "DIAGNOSTICO",
                    userId: admin.id,
                    subjectId: subject.id,
                    content: { formato: "Gamificación Digital", preguntas: 10, plataforma: pick(HERRAMIENTAS_DIGITALES) }
                }
            });

            // Ahora sí, la variable existe
            totalItems += 6; 
            process.stdout.write("🎨");
        }
    }

    console.log(`\n\n✅ PROTOCOLO KALEIDOSCOPIO COMPLETADO.`);
    console.log(`   🌟 Se han generado combinaciones únicas para ${totalItems} recursos.`);
    console.log(`   🌟 Cobertura: Desde Materno hasta Duodécimo año.`);
    console.log(`   🌟 Variedad: Roles, Productos Digitales y Físicos mezclados.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());