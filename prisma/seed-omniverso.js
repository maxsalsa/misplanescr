const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL BANCO DE ESTRATEGIAS (NIVEL EXPERTO)
const MEDIATION_BANK = {
  LUDICA: [
    "Gamificación: Misión Imposible (Resolver retos contrarreloj).",
    "Juego de Roles: 'El Juicio Histórico' (Defensa y acusación).",
    "Escape Room Educativo: 'El Laboratorio del Científico Loco'.",
    "Simulación: 'Mercado de Valores' (Para Mate/Finanzas).",
    "Teatro Foro: Representación de conflictos y soluciones."
  ],
  TECNOLOGICA: [
    "Creación de Podcast: 'Voces del Futuro' (Entrevistas ficticias).",
    "Video-Blogging: 'Youtuber por un día' explicando el tema.",
    "Diseño 3D: Modelado de estructuras/células en Tinkercad.",
    "Realidad Aumentada: Caza de conceptos con códigos QR.",
    "Programación: Diseño de un algoritmo que resuelva el problema."
  ],
  ANALITICA: [
    "Estudio de Caso Harvard: Análisis de una situación real compleja.",
    "Debate Socrático: Preguntas y contra-preguntas profundas.",
    "Aprendizaje Basado en Problemas (ABP): Solución a un reto comunal.",
    "Investigación Acción: Diagnóstico y propuesta de mejora.",
    "V de Gowin: Deconstrucción científica de un experimento."
  ],
  CREATIVA: [
    "Design Thinking: Empatizar, Definir, Idear, Prototipar, Testear.",
    "Visual Thinking: Mapa mental gigante en mural colaborativo.",
    "Escritura Creativa: 'Diario de un átomo/personaje'.",
    "Feria de Prototipos: Construcción con material de desecho.",
    "Collage Artístico: Interpretación visual de conceptos abstractos."
  ],
  ANDRAGOGICA: [ // Para Nocturnos/CINDEA
    "Aprendizaje Basado en Experiencia: Conectar tema con trabajo actual.",
    "Estudio de Caso Laboral: Resolución de conflictos reales.",
    "Conversatorio: Intercambio de saberes previos.",
    "Taller Práctico: 'Aprender haciendo' con utilidad inmediata."
  ]
};

// 2. BANCO DE EVIDENCIAS Y TAREAS (VARIEDAD)
const EVIDENCE_BANK = [
  { type: "Digital", items: ["Infografía Interactiva", "Video-Ensayo", "Podcast", "Blog Temático"] },
  { type: "Físico", items: ["Maqueta Funcional", "Lapbook", "Diorama", "Bitácora de Campo"] },
  { type: "Oral", items: ["Discurso Persuasivo", "Panel de Expertos", "Defensa de Proyecto", "Entrevista"] },
  { type: "Escrito", items: ["Ensayo Argumentativo", "Informe Técnico", "Artículo de Opinión", "Resumen Ejecutivo"] }
];

// 3. MATRIZ DE ASIGNATURAS Y NIVELES (EXPANDIDA)
const TARGETS = [
  // CIENTÍFICAS
  { s: "Física", levels: ["10mo", "11mo"], type: "ANALITICA" },
  { s: "Química", levels: ["10mo", "11mo"], type: "INQUIRY" },
  { s: "Biología", levels: ["10mo", "11mo"], type: "INQUIRY" },
  // TÉCNICAS (SOLO ALGUNAS DE MUESTRA MASIVA)
  { s: "Turismo", levels: ["10mo", "11mo", "12mo"], type: "LUDICA" },
  { s: "Contabilidad", levels: ["10mo", "11mo", "12mo"], type: "ANALITICA" },
  { s: "Informática", levels: ["10mo", "11mo", "12mo"], type: "TECNOLOGICA" },
  { s: "Electrónica", levels: ["10mo", "11mo", "12mo"], type: "TECNOLOGICA" },
  // ACADÉMICAS
  { s: "Estudios Sociales", levels: ["7mo", "8vo", "9no", "10mo", "11mo"], type: "ANALITICA" },
  { s: "Español", levels: ["7mo", "8vo", "9no", "10mo", "11mo"], type: "CREATIVA" },
  { s: "Matemáticas", levels: ["7mo", "8vo", "9no", "10mo", "11mo", "12mo"], type: "LUDICA" },
  // COMPLEMENTARIAS
  { s: "Artes Industriales", levels: ["7mo", "8vo", "9no"], type: "CREATIVA" },
  { s: "Educación para el Hogar", levels: ["7mo", "8vo", "9no"], type: "CREATIVA" },
  { s: "Educación Musical", levels: ["7mo", "8vo", "9no"], type: "LUDICA" },
  // NOCTURNAS
  { s: "Matemáticas (Nocturno)", levels: ["I Nivel", "II Nivel"], type: "ANDRAGOGICA" },
  { s: "Español (Nocturno)", levels: ["I Nivel", "II Nivel"], type: "ANDRAGOGICA" }
];

// 4. GENERADOR DE "SABORES" PEDAGÓGICOS (LA MAGIA)
function generateOmniContent(target, level, flavor) {
  // Seleccionamos estrategias del banco según el "sabor" (flavor)
  const strategies = MEDIATION_BANK[flavor] || MEDIATION_BANK.ANALITICA;
  const randomStrat = strategies[Math.floor(Math.random() * strategies.length)];
  
  // Seleccionamos evidencia
  const evCat = EVIDENCE_BANK[Math.floor(Math.random() * EVIDENCE_BANK.length)];
  const randomEv = evCat.items[Math.floor(Math.random() * evCat.items.length)];

  // Definimos contexto según sabor
  let dua = "Visual/Auditivo";
  if (flavor === "LUDICA") dua = "Kinestésico/Juego";
  if (flavor === "TECNOLOGICA") dua = "Accesibilidad Digital";

  return {
    status: "success",
    meta: { mode: "OMNIVERSO_FRACTAL", style: flavor, complexity: "High" },
    administrative: {
      asignatura: target.s,
      nivel: level,
      modalidad: target.s.includes("Nocturno") ? "CINDEA/IPEC" : "Académica/Técnica",
      eje_transversal: "Desarrollo Sostenible y Ciudadanía Planetaria"
    },
    planning_module: {
      learning_outcome: `Competencia: Dominio integral de ${target.s} mediante enfoque ${flavor}.`,
      mediation_strategies: [
        { moment: "1. CONEXIÓN", activity: "Activación de conocimientos previos mediante pregunta generadora contextualizada.", dua_variant: dua },
        { moment: "2. COLABORACIÓN", activity: `Desarrollo de la estrategia: ${randomStrat}`, technique: flavor },
        { moment: "3. CONSTRUCCIÓN", activity: `Creación de ${randomEv} demostrando los aprendizajes.`, evidence_type: randomEv, ui_render_hint: "Checklist" },
        { moment: "4. CLARIFICACIÓN", activity: "Socialización y co-evaluación de los productos.", technique: "Rúbrica de Pares" }
      ],
      evaluation_system: {
        short_task: {
           title: "Tarea de Desempeño",
           description: `Elaboración de un ${randomEv} preliminar.`,
           value: "10%"
        },
        project: {
           title: "Proyecto Trimestral",
           phases: ["Investigación", "Prototipado", "Presentación Final"],
           value: "30%"
        },
        daily_work: {
           title: "Trabajo Cotidiano",
           rubric: [
              { indicator: "Calidad de la evidencia", levels: { high: "Excelente", mid: "Bueno", low: "Regular" } },
              { indicator: "Trabajo colaborativo", levels: { high: "Liderazgo", mid: "Participación", low: "Pasivo" } }
           ]
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("🔥 DETONANDO OMNIVERSO: INYECCIÓN MASIVA DE ALTA CALIDAD...");
  let count = 0;

  // RECORREMOS MATERIAS
  for (const t of TARGETS) {
    // RECORREMOS NIVELES
    for (const lvl of t.levels) {
        // GENERAMOS 3 VARIANTES POR CADA NIVEL (PARA QUE HAYA OPCIONES)
        // Variante 1: El estilo principal de la materia (ej: Física -> Analítica)
        // Variante 2: Un estilo alternativo (ej: Física -> Lúdica/Gamificada)
        // Variante 3: Un estilo Tecnológico (ej: Física -> Simuladores)
        
        const flavors = [t.type, "TECNOLOGICA", "LUDICA"]; // Mix de sabores

        for (const f of flavors) {
            // Saltamos combinaciones raras (ej: Andragogía Lúdica a veces no aplica igual)
            if (t.type === "ANDRAGOGICA" && f === "LUDICA") continue; 

            const title = `MEP OMNIVERSO: ${t.s} - ${lvl} [Estilo ${f}]`;
            
            const exists = await prisma.lessonPlan.findFirst({ where: { title } });
            
            if (!exists) {
                await prisma.lessonPlan.create({
                    data: {
                        title,
                        subject: t.s,
                        level: lvl,
                        status: "PUBLISHED",
                        userId: admin.id,
                        content: generateOmniContent(t, lvl, f)
                    }
                });
                count++;
                if (count % 10 === 0) process.stdout.write("✨"); 
            }
        }
    }
  }

  console.log(`\n✅ OMNIVERSO FINALIZADO. ${count} NUEVOS PLANES MAESTROS.`);
  console.log("   -> Incluye variantes Lúdicas, Tecnológicas, Analíticas y Andragógicas.");
  console.log("   -> Cobertura: Académica, Técnica, Nocturna y Complementaria.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());