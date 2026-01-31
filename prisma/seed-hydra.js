const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. BANCOS DE OPCIONES POR FAMILIA (EL MENÚ)
const OPTIONS_DB = {
  // --- FAMILIA ACADÉMICA (Español, Sociales, Religión) ---
  ACADEMIC: {
    connection: [
      { id: "opt1", title: "Visual", desc: "Proyectar imagen controversial/meme sobre el tema.", icon: "Image" },
      { id: "opt2", title: "Social", desc: "Pregunta detonante en parejas (Think-Pair-Share).", icon: "Users" },
      { id: "opt3", title: "Lúdico", desc: "Juego rápido de 'Ahorcado' con palabras clave.", icon: "Gamepad2" }
    ],
    construction: [
      { id: "opt1", title: "Investigación", desc: "Búsqueda en fuentes confiables y creación de Resumen.", evidence: "Resumen Ejecutivo" },
      { id: "opt2", title: "Debate", desc: "Mesa redonda con roles asignados (A favor/En contra).", evidence: "Rúbrica de Argumentación" },
      { id: "opt3", title: "Creativo", desc: "Creación de una historieta o cómic sobre el tema.", evidence: "Historieta Física/Digital" }
    ],
    evaluation: [
      { id: "opt1", type: "Rúbrica", title: "Ensayo Crítico" },
      { id: "opt2", type: "Lista Cotejo", title: "Mapa Conceptual" },
      { id: "opt3", type: "Escala", title: "Exposición Oral" }
    ]
  },
  
  // --- FAMILIA TÉCNICA (Ciber, Software, IA) ---
  HARD_TECH: {
    connection: [
      { id: "opt1", title: "Reto Flash", desc: "Descifrar un código erróneo en la pizarra.", icon: "Terminal" },
      { id: "opt2", title: "Caso Real", desc: "Análisis de una noticia tecnológica de ayer.", icon: "Newspaper" },
      { id: "opt3", title: "Demo", desc: "El docente hace una demostración 'Wow' en vivo.", icon: "Zap" }
    ],
    construction: [
      { id: "opt1", title: "Laboratorio", desc: "Práctica guiada paso a paso en el IDE.", evidence: "Código Fuente" },
      { id: "opt2", title: "Reto Pair", desc: "Programación en Parejas (Driver/Navigator).", evidence: "Commit en Repo" },
      { id: "opt3", title: "Bug Hunting", desc: "Encontrar y arreglar errores en un proyecto base.", evidence: "Informe de Bugs" }
    ],
    evaluation: [
      { id: "opt1", type: "Rúbrica", title: "Producto de Software" },
      { id: "opt2", type: "Lista Cotejo", title: "Configuración de Entorno" },
      { id: "opt3", type: "Escala", title: "Buenas Prácticas de Código" }
    ]
  },

  // --- FAMILIA FÍSICA/ARTÍSTICA (Deportes, Música, Agro) ---
  INDUSTRIAL_ARTS: {
    connection: [
      { id: "opt1", title: "Sensorial", desc: "Escuchar audio o tocar texturas relacionadas.", icon: "Hand" },
      { id: "opt2", title: "Movimiento", desc: "Dinámica de activación física o estiramiento.", icon: "Activity" },
      { id: "opt3", title: "Video", desc: "Ver a un experto ejecutando la técnica.", icon: "Play" }
    ],
    construction: [
      { id: "opt1", title: "Práctica", desc: "Ejecución técnica individual supervisada.", evidence: "Lista de Cotejo" },
      { id: "opt2", title: "Circuito", desc: "Rotación por estaciones de trabajo.", evidence: "Hoja de Registro" },
      { id: "opt3", title: "Proyecto", desc: "Creación de un producto/obra en subgrupos.", evidence: "Obra Final" }
    ],
    evaluation: [
      { id: "opt1", type: "Lista Cotejo", title: "Seguridad y Técnica" },
      { id: "opt2", type: "Rúbrica", title: "Expresión Artística/Corporal" },
      { id: "opt3", type: "Escala", title: "Desempeño Procesual" }
    ]
  }
};

// 2. GENERADOR DE MATRIZ DE OPCIONES
function generateMatrixPlan(subject, level, familyKey) {
  // Seleccionamos el banco correcto o default a ACADEMIC
  const bank = OPTIONS_DB[familyKey] || OPTIONS_DB.ACADEMIC;

  return {
    status: "success",
    meta: { family: familyKey, mode: "HYDRA_MATRIX" },
    // AQUÍ ESTÁ LA MAGIA: NO GUARDAMOS UNA ACTIVIDAD, GUARDAMOS ARRAY DE OPCIONES
    planning_matrix: {
      topic: `Unidad Integral de ${subject}`,
      connection_options: bank.connection,
      collaboration_options: [
        { id: "c1", title: "Parejas", desc: "Trabajo en duplas." },
        { id: "c2", title: "Grupos Base", desc: "Equipos de 4 roles definidos." },
        { id: "c3", title: "Plenaria", desc: "Discusión de toda la clase." }
      ],
      construction_options: bank.construction,
      clarification_options: [
        { id: "cl1", title: "Metacognición", desc: "Ticket de salida: ¿Qué aprendí?" },
        { id: "cl2", title: "Quiz Rápido", desc: "Sondeo de 3 preguntas." },
        { id: "cl3", title: "Resumen", desc: "Mapa mental de cierre en pizarra." }
      ],
      evaluation_options: bank.evaluation
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  
  // LISTA MUESTRAL DE MATERIAS PARA APLICAR HYDRA (Se puede expandir a todo el catálogo)
  const SUBJECTS = [
    { n: "Ciencias", l: "8vo", f: "ACADEMIC" },
    { n: "Desarrollo Web", l: "12mo", f: "HARD_TECH" },
    { n: "Educación Física", l: "10mo", f: "INDUSTRIAL_ARTS" },
    { n: "Español", l: "7mo", f: "ACADEMIC" },
    { n: "Música", l: "9no", f: "INDUSTRIAL_ARTS" },
    { n: "Ciberseguridad", l: "11mo", f: "HARD_TECH" }
  ];

  console.log("🐲 HYDRA: GENERANDO MATRICES DE OPCIONES MÚLTIPLES...");

  for (const sub of SUBJECTS) {
    const title = `MEP HYDRA: ${sub.n} - ${sub.l} (Matriz Seleccionable)`;
    const matrix = generateMatrixPlan(sub.n, sub.l, sub.f);

    await prisma.lessonPlan.create({
        data: {
            title, 
            subject: sub.n, 
            level: sub.l, 
            status: "PUBLISHED", 
            userId: admin.id,
            content: matrix
        }
    });
    console.log(`   ✨ Matriz creada: ${sub.n} [${sub.f}] -> 81 Combinaciones posibles.`);
  }

  console.log("✅ INYECCIÓN HYDRA COMPLETADA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());