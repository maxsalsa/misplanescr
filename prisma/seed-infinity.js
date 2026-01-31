const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL BANCO DE "SABORES" PEDAGÓGICOS (VARIEDAD TOTAL)
const FLAVORS = {
  GAMIFICATION: {
    conn: ["Trivia Rápida en Kahoot/Quizizz", "Adivina la Palabra (Ahorcado Digital)", "Bingo de Conceptos Clave", "Lluvia de meteoritos (Preguntas veloces)"],
    const: ["Escape Room Educativo (Genially)", "Búsqueda del Tesoro QR", "Jeopardy de la Unidad", "Torneo de Preguntas por Equipos"],
    eval: ["Podio de Ganadores", "Insignias Digitales", "Nivel Desbloqueado"]
  },
  CREATIVE: {
    conn: ["Meme Challenge: Explica el tema con un meme", "Improvisación Teatral corta", "Cadáver Exquisito (Historia colectiva)", "Dibuja tu idea (Pictionary)"],
    const: ["Creación de Podcast (3 min)", "Diseño de Infografía en Canva", "TikTok Educativo (Video corto)", "Mural Colaborativo en Padlet"],
    eval: ["Galería de Arte Virtual", "Festival de Cortometrajes", "Rúbrica de Creatividad"]
  },
  ANALYTICAL: {
    conn: ["Titular de Noticia Falsa (Fake News)", "Dilema Ético (¿Qué harías?)", "Gráfico Mudo (Interpretar datos)", "Pregunta detonante polémica"],
    const: ["Debate Socrático (Pecera)", "Estudio de Caso Real", "Juicio Simulado", "Ensayo de una página"],
    eval: ["Ensayo Crítico", "Mapa Mental Jerárquico", "V de Gowin"]
  },
  TECHNICAL: {
    conn: ["Desafío de Código en Pizarra", "Análisis de Objeto Tecnológico", "Video: 'Cómo se hace'", "Unboxing de Herramienta"],
    const: ["Taller de Reparación/Armado", "Laboratorio de Simulación", "Programación en Pares", "Diseño de Prototipo Físico"],
    eval: ["Lista de Cotejo de Seguridad", "Producto Terminado", "Reporte Técnico"]
  },
  ACTIVE: {
    conn: ["Dinámica: El Nudo Humano", "Simón Dice (Conceptos)", "Caminata de Observación", "Estiramiento Neuronal"],
    const: ["Circuito de Estaciones", "Roleplay (Dramatización)", "Entrevista a Expertos (Simulada)", "Feria Científica Mini"],
    eval: ["Bitácora de Campo", "Autoevaluación Corporal", "Demostración Práctica"]
  }
};

// 2. BANCO DE TAREAS CORTAS Y PRUEBAS (VARIEDAD)
const TASKS = [
  "Investigación: '5 Curiosidades del tema'",
  "Entrevista a un familiar sobre el tema",
  "Collage de recortes sobre conceptos",
  "Mapa Conceptual a mano",
  "Resolución de crucigrama temático",
  "Creación de un glosario ilustrado",
  "Resumen ejecutivo de 10 líneas",
  "Grabación de audio explicando el tema"
];

// 3. GENERADOR DE CAOS CONTROLADO
function generateVarietyPlan(subject, level) {
  // Elegimos un "Sabor" aleatorio para la clase
  const flavorKeys = Object.keys(FLAVORS);
  const randomKey = flavorKeys[Math.floor(Math.random() * flavorKeys.length)];
  const flavor = FLAVORS[randomKey];

  // Elegimos actividades aleatorias de ese sabor
  const c1 = flavor.conn[Math.floor(Math.random() * flavor.conn.length)];
  const c2 = flavor.const[Math.floor(Math.random() * flavor.const.length)];
  const ev = flavor.eval[Math.floor(Math.random() * flavor.eval.length)];
  const task = TASKS[Math.floor(Math.random() * TASKS.length)];

  return {
    status: "success",
    meta: { flavor: randomKey, variety_mode: "INFINITY_ENGINE" },
    planning_module: {
      learning_outcome: `Dominio versátil de ${subject}`,
      mediation: [
        { moment: "1. CONEXIÓN", activity: c1, dua_variant: "Visual/Auditivo" },
        { moment: "2. COLABORACIÓN", activity: "Formación de equipos aleatorios.", technique: "Azar" },
        { moment: "3. CONSTRUCCIÓN", activity: c2, evidence_type: "Producto Creativo", ui_render_hint: "GamificationCard" },
        { moment: "4. CLARIFICACIÓN", activity: `Cierre con ${ev}.`, technique: "Feedback 360" }
      ],
      evaluation_system: {
        short_task: {
           title: "Tarea Corta Dinámica",
           description: task,
           value: "5%"
        },
        daily_work: {
           title: "Trabajo en Clase",
           rubric: [{ indicator: "Participación en la dinámica", levels: { high: "Activo/Líder", mid: "Participante", low: "Pasivo" } }]
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  
  // LISTA DE MATERIAS PARA INYECTAR VARIEDAD
  const TARGETS = [
    { s: "Historia", l: "9no" }, { s: "Matemáticas", l: "7mo" }, 
    { s: "Inglés", l: "10mo" }, { s: "Ciencias", l: "6to" },
    { s: "Cívica", l: "11mo" }, { s: "Informática", l: "12mo" },
    { s: "Artes", l: "8vo" }, { s: "Física", l: "10mo" }
  ];

  console.log("🎲 MOTOR INFINITY: GENERANDO VARIANTES ÚNICAS...");

  for (const t of TARGETS) {
    // Generamos 3 variantes diferentes para la misma materia (A, B, C)
    for (let i = 1; i <= 3; i++) {
        const payload = generateVarietyPlan(t.s, t.l);
        const flavorName = payload.meta.flavor;
        const title = `MEP VARIETY: ${t.s} - ${t.l} (Estilo ${flavorName} ${i})`;

        await prisma.lessonPlan.create({
            data: {
                title: title,
                subject: t.s,
                level: t.l,
                status: "PUBLISHED",
                userId: admin.id,
                content: payload
            }
        });
        console.log(`   ✨ Variante creada: ${t.s} [${flavorName}] -> ${payload.planning_module.mediation[2].activity}`);
    }
  }
  console.log("✅ INYECCIÓN DE VARIEDAD COMPLETADA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());