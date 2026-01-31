const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// --- BANCO DE ESTRATEGIAS ---
const ESTRATEGIAS_VARIADAS = {
    STEAM: {
        enfoque: "STEAM & Maker",
        inicio: "La persona docente presenta un desafío de ingeniería (ej. puente, circuito).",
        desarrollo: "La persona estudiante prototipa una solución física usando materiales reciclados.",
        cierre: "La persona estudiante testea su prototipo y documenta fallos y mejoras.",
        verbo_alumno: "Construye/Prototipa"
    },
    GAMIFICACION: {
        enfoque: "Gamificación (Juego)",
        inicio: "La persona docente introduce la narrativa: Misión Rescate Espacial.",
        desarrollo: "La persona estudiante resuelve retos (niveles) para obtener pistas o insignias.",
        cierre: "La persona estudiante desbloquea el Cofre del Tesoro (Bonus de nota).",
        verbo_alumno: "Compite/Resuelve"
    },
    AULA_INVERTIDA: {
        enfoque: "Flipped Classroom",
        inicio: "La persona estudiante trae analizado un video visto en casa (previo).",
        desarrollo: "La persona docente facilita un taller práctico para aplicar la teoría del video.",
        cierre: "La persona estudiante crea un mapa mental síntesis de la aplicación.",
        verbo_alumno: "Aplica/Analiza"
    },
    SOCIAL: {
        enfoque: "Socio-Constructivista",
        inicio: "La persona docente lanza una pregunta polémica (Debate Socrático).",
        desarrollo: "La persona estudiante investiga argumentos y defiende su postura en mesa redonda.",
        cierre: "La persona estudiante redacta un manifiesto de consenso grupal.",
        verbo_alumno: "Argumenta/Debate"
    },
    TECNOLOGICO: {
        enfoque: "Tech & AI",
        inicio: "La persona docente muestra una simulación digital o IA.",
        desarrollo: "La persona estudiante interactúa con el software para manipular variables.",
        cierre: "La persona estudiante genera un reporte digital con capturas de pantalla.",
        verbo_alumno: "Simula/Programa"
    }
};

const TAREAS_VARIADAS = [
    { tipo: "Podcast", titulo: "Episodio de Radio", instruccion: "Grabar un audio de 3 min explicando el tema." },
    { tipo: "Infografía", titulo: "Poster Digital", instruccion: "Diseñar un visual en Canva/Papel sobre conceptos clave." },
    { tipo: "Ensayo", titulo: "Artículo de Opinión", instruccion: "Redactar 300 palabras defendiendo una tesis." },
    { tipo: "Maqueta", titulo: "Modelo 3D", instruccion: "Construir una representación física del concepto." }
];

async function main() {
    console.log("🌌 REINICIANDO GENERACIÓN DE MULTIVERSO PEDAGÓGICO...");
    
    // Simulación robusta si no hay archivos
    let files = [];
    if (fs.existsSync(GOLD_DIR)) {
        files = fs.readdirSync(GOLD_DIR).filter(f => f.endsWith(".json"));
    } else {
        console.log("⚠️ Modo Simulación activado (Sin archivos locales).");
        files = ["Matematica_Ejemplo.json", "Ciencias_Ejemplo.json", "Estudios_Sociales.json"];
    }

    const admin = await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: {},
        create: { email: "max@misplanescr.com", name: "Max Salazar", role: "SUPER_ADMIN", subscriptionStatus: "GOD_TIER" }
    });

    for (const file of files) {
        let materia = file.split("_")[0] || "General";
        let unidades = [{ titulo: `Unidad: Fundamentos de ${materia}`, aprendizajes: [`Concepto A de ${materia}`, `Concepto B de ${materia}`] }];

        // Crear Asignatura
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: materia, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
            update: {},
            create: { name: materia, code: materia.substring(0,3).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
        });

        for (const u of unidades) {
            const unitDB = await prisma.studyUnit.create({ data: { title: u.titulo, grade: "General", subjectId: subject.id } });

            // 1. GENERAR 3 VARIANTES DE PLAN (A, B, C)
            const variantes = ["STEAM", "GAMIFICACION", "SOCIAL"];
            
            for (const v of variantes) {
                const est = ESTRATEGIAS_VARIADAS[v];
                await prisma.lessonPlan.create({
                    data: {
                        title: `Plan ${est.enfoque}: ${u.titulo}`,
                        userId: admin.id,
                        status: "PUBLISHED",
                        content: {
                            unidad: u.titulo,
                            estilo: est.enfoque,
                            estrategias: {
                                inicio: est.inicio,
                                desarrollo: est.desarrollo,
                                pausa_activa: { actividad: "Gimnasia Cerebral", duracion: "5 min" },
                                cierre: est.cierre
                            },
                            adecuaciones: {
                                acceso: ["Material visual ampliado"],
                                no_significativa: ["Tiempo flexible"],
                                alta_dotacion: ["Liderazgo en equipos de trabajo"]
                            },
                            rubrica: [1,2,3,4,5,6].map(i => ({ 
                                indicador: `Indicador ${i} de ${materia}`, 
                                niveles: { 1: "Inicial", 2: "Intermedio", 3: "Avanzado" } 
                            }))
                        }
                    }
                });
            }

            // 2. INYECTAR BANCO DE TAREAS
            for (const tarea of TAREAS_VARIADAS) {
                await prisma.assessment.create({
                    data: {
                        title: `Tarea (${tarea.tipo}): ${materia}`,
                        type: "TAREA",
                        userId: admin.id,
                        subjectId: subject.id,
                        content: { instruccion: tarea.instruccion },
                        rubric: { criterios: [{ nombre: "Creatividad", val: "5pts" }, { nombre: "Contenido", val: "10pts" }] }
                    }
                });
            }

            // 3. INSTRUMENTOS DE EVALUACIÓN OFICIAL
            await prisma.assessment.create({
                data: {
                    title: `Examen Parcial: ${u.titulo}`,
                    type: "EXAMEN",
                    userId: admin.id,
                    subjectId: subject.id,
                    specsTable: { puntos: 40, detalle: "Tabla Oficial MEP" },
                    content: { partes: ["Selección", "Pareo", "Desarrollo"] }
                }
            });

            // CORRECCIÓN AQUÍ: SE AGREGA 'CONTENT' A LA LISTA DE COTEJO
            await prisma.assessment.create({
                data: {
                    title: `Lista de Cotejo: Desempeño en Clase`,
                    type: "LISTA_COTEJO",
                    userId: admin.id,
                    subjectId: subject.id,
                    rubric: { items: ["Sigue instrucciones", "Trabaja en equipo", "Limpia su área"] },
                    content: { instruccion: "Marque con X si se cumple la conducta.", ambito: "Actitudinal" } // <-- CAMPO AGREGADO
                }
            });

            // Diagnóstico
            await prisma.assessment.create({
                data: {
                    title: `Diagnóstico Gamificado: ${u.titulo}`,
                    type: "DIAGNOSTICO",
                    userId: admin.id,
                    subjectId: subject.id,
                    content: { formato: "Kahoot / Quizizz", preguntas: 10 }
                }
            });
        }
        process.stdout.write("✨");
    }
    
    console.log("\n✅ PROTOCOLO INFINITO COMPLETADO SIN ERRORES.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());