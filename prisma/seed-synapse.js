const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// DICCIONARIO DE ALTA PRECISIÓN PEDAGÓGICA
const EVAL_MATRIX = {
  MATH: {
    indicators: ["Resuelve problemas aplicando el algoritmo", "Identifica los datos relevantes", "Argumenta la validez del resultado"],
    task: { title: "Problemario Individual", desc: "Resolver 3 problemas de contexto real." },
    project: { title: "Feria Matemática", phases: ["Investigación", "Modelado", "Exposición"] }
  },
  LANG: { // ESPAÑOL / IDIOMAS
    indicators: ["Produce textos coherentes", "Aplica normas gramaticales", "Expresa ideas con fluidez oral"],
    task: { title: "Redacción Creativa", desc: "Escribir un ensayo de 200 palabras." },
    project: { title: "Podcast Literario", phases: ["Guion", "Grabación", "Edición"] }
  },
  SCI: { // CIENCIAS
    indicators: ["Formula hipótesis sustentadas", "Registra datos con precisión", "Analiza resultados experimentales"],
    task: { title: "Reporte de Laboratorio", desc: "Completar la V de Gowin." },
    project: { title: "Feria Científica", phases: ["Pregunta", "Experimentación", "Conclusión"] }
  },
  TECH: { // TÉCNICAS / CTP
    indicators: ["Ejecuta procedimientos técnicos", "Cumple normas de salud ocupacional", "Manipula herramientas correctamente"],
    task: { title: "Lista de Verificación", desc: "Chequeo pre-operacional de equipo." },
    project: { title: "Prototipo Funcional", phases: ["Diseño", "Construcción", "Pruebas"] }
  },
  ART: {
    indicators: ["Aplica técnicas de composición", "Demuestra sensibilidad estética", "Comunica emociones a través de la obra"],
    task: { title: "Boceto Rápido", desc: "Estudio de forma y color." },
    project: { title: "Galería de Arte", phases: ["Boceto", "Obra Final", "Montaje"] }
  },
  REL: {
    indicators: ["Reflexiona sobre valores éticos", "Respeta la diversidad de creencias", "Relaciona el tema con su vida"],
    task: { title: "Diario Reflexivo", desc: "Análisis personal del tema." },
    project: { title: "Acción Social", phases: ["Diagnóstico", "Plan", "Acción"] }
  }
};

async function main() {
  const plans = await prisma.lessonPlan.findMany();
  console.log(`🧠 OPTIMIZANDO ${plans.length} PLANES CON SYNAPSE...`);
  
  let count = 0;

  for (const plan of plans) {
    let type = "TECH"; // Default seguro
    const s = plan.subject.toUpperCase();
    
    // DETECCIÓN INTELIGENTE DE MATERIA
    if (s.includes("MAT") || s.includes("FISICA")) type = "MATH";
    else if (s.includes("ESP") || s.includes("ING") || s.includes("FRA")) type = "LANG";
    else if (s.includes("CIE") || s.includes("BIO") || s.includes("QUIM")) type = "SCI";
    else if (s.includes("ART") || s.includes("MUS")) type = "ART";
    else if (s.includes("REL") || s.includes("SOC") || s.includes("CIV")) type = "REL";

    const config = EVAL_MATRIX[type];
    
    // RECONSTRUIR EL OBJETO DE EVALUACIÓN
    const newEval = {
        daily_work: {
            title: "Trabajo Cotidiano (Rúbrica Analítica)",
            rubric: config.indicators.map(ind => ({
                indicator: ind,
                levels: { high: "Logrado (3)", mid: "En Proceso (2)", low: "Inicio (1)" }
            }))
        },
        short_task: {
            title: config.task.title,
            description: config.task.desc,
            value: "10%"
        },
        project: {
            title: config.project.title,
            phases: config.project.phases,
            value: "35%"
        }
    };

    // ACTUALIZAR BASE DE DATOS
    const newContent = { ...plan.content };
    
    // Aseguramos que exista la estructura
    if (!newContent.planning_module) newContent.planning_module = {};
    newContent.planning_module.evaluation_system = newEval;

    await prisma.lessonPlan.update({
        where: { id: plan.id },
        data: { content: newContent }
    });
    count++;
    if (count % 50 === 0) process.stdout.write("⚡");
  }

  console.log(`\n\n✅ SYNAPSE FINALIZADO. ${count} PLANES TIENEN COHERENCIA TOTAL.`);
  console.log("   -> Rúbricas alineadas a la asignatura.");
  console.log("   -> Tareas coherentes con el indicador.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());