const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// BANCO DE INDICADORES DE ALTA PRECISIÓN
const INDICATORS_DB = {
  MATH: ["Resuelve problemas aplicando algoritmos", "Interpreta datos cuantitativos", "Justifica el razonamiento lógico"],
  LANG: ["Redacta con ortografía correcta", "Analiza la estructura del texto", "Expresa ideas con fluidez oral"],
  SCI:  ["Formula hipótesis basadas en evidencia", "Registra datos experimentales", "Contrasta teoría con práctica"],
  TECH: ["Aplica normas de seguridad industrial", "Manipula herramientas con precisión", "Diagnostica fallas técnicas"],
  ART:  ["Demuestra creatividad en la composición", "Aplica técnicas de color/forma", "Expresa sensibilidad estética"],
  GENERIC: ["Participa activamente", "Cumple con las fases del trabajo", "Demuestra pensamiento crítico"]
};

// BANCO DE TAREAS CORTAS ESPECÍFICAS
const TASKS_DB = {
  MATH: "Resolución de problemario (5 ejercicios clave).",
  LANG: "Redacción de un párrafo argumentativo.",
  SCI:  "Diagrama de flujo del experimento.",
  TECH: "Lista de verificación de herramientas.",
  ART:  "Boceto rápido a mano alzada."
};

async function main() {
  // 1. TRAER TODOS LOS PLANES
  const plans = await prisma.lessonPlan.findMany();
  console.log(`💎 ANALIZANDO ${plans.length} PLANES PARA PERFECCIONAMIENTO...`);
  
  let updatedCount = 0;

  for (const plan of plans) {
    // Detectar el "ADN" del plan por su materia
    let type = "GENERIC";
    const sub = plan.subject.toUpperCase();
    
    if (sub.includes("MAT") || sub.includes("FISICA") || sub.includes("QUIMICA")) type = "MATH";
    else if (sub.includes("ESP") || sub.includes("ING") || sub.includes("FRA")) type = "LANG";
    else if (sub.includes("CIE") || sub.includes("BIO")) type = "SCI";
    else if (sub.includes("MEC") || sub.includes("CIBER") || sub.includes("DIS")) type = "TECH";
    else if (sub.includes("ART") || sub.includes("MUS")) type = "ART";

    // Modificar el JSON (Deep Merge)
    let content = plan.content;
    
    // Si no tiene indicadores específicos, se los ponemos
    if (!content.planning_module.evaluation_indicators || content.planning_module.evaluation_indicators.length === 0) {
        
        const indicators = INDICATORS_DB[type];
        content.planning_module.evaluation_indicators = indicators.map(ind => ({
            indicator: ind,
            technique: "Observación",
            instrument: "Rúbrica Analítica"
        }));

        // Actualizar Tarea Corta para que sea específica
        if (content.planning_module.evaluation_system?.short_task) {
             content.planning_module.evaluation_system.short_task.description = TASKS_DB[type];
        }

        // GUARDAR CAMBIOS
        await prisma.lessonPlan.update({
            where: { id: plan.id },
            data: { content: content }
        });
        updatedCount++;
        if (updatedCount % 50 === 0) process.stdout.write("♦");
    }
  }

  console.log(`\n✅ KALEIDOSCOPIO FINALIZADO. ${updatedCount} PLANES FUERON PULIDOS.`);
  console.log("   -> Ahora cada asignatura tiene indicadores y tareas únicas.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());