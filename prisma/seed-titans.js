const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- LA ESCALERA DEL CONOCIMIENTO (CONFIGURACIÓN FULL) ---
const ESCALERA = [
    // --- 👶 PREESCOLAR ---
    { 
        grado: "Materno Infantil", 
        ciclo: "PREESCOLAR",
        materia: "Interacción Social",
        tema: "El Autocontrol y mis Emociones",
        recurso: "El Semáforo de las Emociones (Juego)",
        eval: "Registro Anecdótico (Observación)"
    },
    { 
        grado: "Transición", 
        ciclo: "PREESCOLAR",
        materia: "Pensamiento Matemático",
        tema: "Nociones Espaciales (Arriba/Abajo)",
        recurso: "Circuito Motor con Obstáculos",
        eval: "Escala de Logro (Logrado/En Proceso)"
    },

    // --- 🧒 PRIMARIA I CICLO (1-3) ---
    { 
        grado: "1° Grado", 
        ciclo: "PRIMARIA",
        materia: "Español (Lectoescritura)",
        tema: "Conciencia Fonológica",
        recurso: "Bingo de Sílabas y Sonidos",
        eval: "Lista de Cotejo de Lectura Oral"
    },
    { 
        grado: "2° Grado", 
        ciclo: "PRIMARIA",
        materia: "Matemáticas",
        tema: "Suma y Resta con llevadas",
        recurso: "La Tiendita Escolar (Dinero didáctico)",
        eval: "Práctica de Resolución de Problemas"
    },
    { 
        grado: "3° Grado", 
        ciclo: "PRIMARIA",
        materia: "Ciencias",
        tema: "El Ciclo del Agua",
        recurso: "Experimento: La Lluvia en una Bolsa",
        eval: "Reporte Gráfico del Experimento"
    },

    // --- 👦 PRIMARIA II CICLO (4-6) ---
    { 
        grado: "4° Grado", 
        ciclo: "PRIMARIA",
        materia: "Estudios Sociales",
        tema: "Formas de Relieve de Costa Rica",
        recurso: "Maqueta de Relieve con Plasticina",
        eval: "Rúbrica de Maqueta"
    },
    { 
        grado: "5° Grado", 
        ciclo: "PRIMARIA",
        materia: "Español",
        tema: "Comprensión Lectora (Inferencial)",
        recurso: "Círculo de Lectura: Leyendas Ticas",
        eval: "Prueba Escrita de Comprensión"
    },
    { 
        grado: "6° Grado", 
        ciclo: "PRIMARIA",
        materia: "Matemáticas",
        tema: "Fracciones y Decimales",
        recurso: "Juego de Dominó de Fracciones",
        eval: "Prueba Escrita (Preparación Transición)"
    },

    // --- 👱 TERCER CICLO (7-9) ---
    { 
        grado: "7° Año", 
        ciclo: "SECUNDARIA",
        materia: "Ciencias (Biología)",
        tema: "La Célula y sus Organelas",
        recurso: "Laboratorio: Uso del Microscopio",
        eval: "V de Gowin (Informe Científico)"
    },
    { 
        grado: "8° Año", 
        ciclo: "SECUNDARIA",
        materia: "Educación Cívica",
        tema: "Sistemas Políticos",
        recurso: "Debate: Democracia vs Dictadura",
        eval: "Rúbrica de Debate y Argumentación"
    },
    { 
        grado: "9° Año", 
        ciclo: "SECUNDARIA",
        materia: "Física-Mate",
        tema: "Álgebra y Ecuaciones",
        recurso: "Escape Room Algebraico",
        eval: "Examen Parcial Estandarizado"
    },

    // --- 🧑‍🎓 DIVERSIFICADA (10-12) ---
    { 
        grado: "10° Año", 
        ciclo: "SECUNDARIA",
        materia: "Química",
        tema: "Estequiometría y Balanceo",
        recurso: "Resolución de Casos Industriales",
        eval: "Prueba de Ejecución (Tabla Periódica)"
    },
    { 
        grado: "11° Año", 
        ciclo: "SECUNDARIA",
        materia: "Español (Bachillerato)",
        tema: "Análisis Literario (Novelas Oficiales)",
        recurso: "Ensayo Crítico Comparativo",
        eval: "Simulacro de Prueba Nacional"
    },
    { 
        grado: "12° Año (Técnico)", 
        ciclo: "TECNICA",
        materia: "Gestión Empresarial",
        tema: "Plan de Negocios Real",
        recurso: "Feria de Emprendimiento (Shark Tank)",
        eval: "Rúbrica de Pitch de Negocios"
    }
];

async function main() {
    console.log("🏛️ TITANES: INYECTANDO ESTEROIDES EDUCATIVOS POR NIVEL...");
    const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
    if (!admin) { console.log("⚠️ Sin Admin."); return; }

    for (const item of ESCALERA) {
        
        // 1. Crear Asignatura Específica
        let modalidad = item.ciclo === "TECNICA" ? "TECNICA" : (item.ciclo === "PREESCOLAR" ? "PREESCOLAR" : "ACADEMICA");
        
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: item.materia, educationLevel: item.ciclo, modalityType: modalidad }},
            update: {},
            create: { name: item.materia, code: item.materia.substring(0,4).toUpperCase(), educationLevel: item.ciclo, modalityType: modalidad }
        });

        // 2. UNIDAD DE ALTO IMPACTO
        const uTitle = `Unidad Titán: ${item.tema}`;
        const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: item.grado, subjectId: subject.id } });

        // 3. PLAN DE MEDIACIÓN (ESTEROIDES)
        await prisma.lessonPlan.create({
            data: {
                title: `Plan Maestro ${item.grado}: ${item.tema}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: uTitle,
                    enfoque: "Excelencia Académica y Neuroeducación",
                    detonante: `Pregunta Retadora para ${item.grado}: ¿Cómo afecta esto mi vida?`,
                    estrategias: {
                        inicio: "Gancho Cognitivo (Video/Dinámica).",
                        desarrollo: item.recurso,
                        cierre: "Metacognición y Transferencia."
                    },
                    rubrica: [
                        { indicador: "Dominio Cognitivo", niveles: {1:"Bajo", 2:"Medio", 3:"Alto"} }
                    ]
                }
            }
        });

        // 4. INSTRUMENTO DE EVALUACIÓN "A LA MEDIDA"
        await prisma.assessment.create({
            data: {
                title: `Instrumento Clave: ${item.eval}`,
                type: item.ciclo === "PREESCOLAR" ? "LISTA_COTEJO" : "RUBRICA",
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    objetivo: `Evaluar ${item.tema} en ${item.grado}`,
                    instruccion: "Aplicar según reglamento MEP.",
                    formato: "Digital / Impreso"
                },
                rubric: { criterios: ["Criterio 1", "Criterio 2"], escala: "Oficial" }
            }
        });

        // 5. RECURSO EXTRA (TAREA/PRÁCTICA)
        await prisma.assessment.create({
            data: {
                title: `Material de Refuerzo: ${item.grado}`,
                type: "COTIDIANO", // O Tarea
                userId: admin.id,
                subjectId: subject.id,
                content: {
                    actividad: "Práctica Extraclase para reforzar.",
                    detalle: `Ejercicios graduados de ${item.tema}.`
                }
            }
        });

        process.stdout.write("🏛️");
    }

    console.log(`\n\n✅ PROTOCOLO TITANES FINALIZADO.`);
    console.log(`   🌟 Se cubrieron TODOS los ciclos (Materno -> 12°).`);
    console.log(`   🌟 Enfoque diferenciado: Juego en Preescolar vs Simulacros en Diversificada.`);
    console.log(`   🌟 Base de Datos cargada con esteroides pedagógicos.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());