const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando Protocolo AEGIS (Inclusión)...");

  // ==========================================
  // 1. ESTRATEGIAS DE INCLUSIÓN (NEURODIVERSIDAD)
  // ==========================================
  
  // TDAH (Déficit de Atención)
  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Segmentación y Pausas Activas (TDAH)",
      category: "COTIDIANO",
      adaptationTag: "TDAH",
      content: "La persona docente fracciona la instrucción en pasos cortos y visibles (Checklist). La persona estudiante ejecuta una micro-tarea, marca su progreso y realiza una pausa activa de 2 minutos antes de continuar."
    }
  });

  // TEA (Autismo)
  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Agenda Visual y Estructuración (TEA)",
      category: "COTIDIANO",
      adaptationTag: "TEA",
      content: "La persona docente presenta la secuencia de la clase mediante pictogramas o agenda escrita. La persona estudiante anticipa las transiciones y utiliza apoyos visuales para comprender conceptos abstractos."
    }
  });

  // ALTA DOTACIÓN (Talento)
  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Reto de Profundización (Alta Dotación)",
      category: "PROYECTO",
      adaptationTag: "ALTA_DOTACION",
      content: "La persona docente propone un problema abierto complejo vinculado al tema. La persona estudiante asume un rol de investigador senior, indagando fuentes académicas avanzadas y proponiendo soluciones innovadoras."
    }
  });

  // ==========================================
  // 2. EDUCACIÓN FÍSICA Y MOVILIDAD
  // ==========================================
  
  // Inyectar Materia EF
  const efSub = await prisma.subject.upsert({
    where: { name_educationLevel_modalityType: { name: "Educación Física", educationLevel: "PRIMARIA", modalityType: "ACADEMICA" } },
    update: {}, create: { name: "Educación Física", code: "EFI-PRI", educationLevel: "PRIMARIA", modalityType: "ACADEMICA" }
  });

  // Estrategia EF Inclusiva
  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Circuito Motor Inclusivo",
      category: "COTIDIANO",
      adaptationTag: "FISICA",
      subjectId: efSub.id,
      content: "La persona docente organiza estaciones de destreza motora con opciones de acceso (ej: lanzamientos desde posición sentada). La persona estudiante recorre el circuito adaptando la ejecución a sus posibilidades funcionales."
    }
  });

  // ==========================================
  // 3. TAREAS CORTAS CON RÚBRICA INTEGRADA
  // ==========================================
  
  const rubricMap = JSON.stringify({
    inicial: "Cita elementos básicos sin detallar.",
    intermedio: "Describe los elementos con cierta precisión.",
    avanzado: "Explica detalladamente las relaciones entre los elementos."
  });

  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Tarea: Mapa Conceptual Jerárquico",
      category: "TAREA",
      adaptationTag: "UNIVERSAL",
      content: "La persona docente asigna los conceptos clave del tema. La persona estudiante construye un mapa conceptual jerarquizando ideas principales y secundarias, utilizando conectores lógicos.",
      rubricModel: rubricMap
    }
  });

  await prisma.pedagogicalStrategy.create({
    data: {
      title: "Tarea: Bitácora de Observación",
      category: "TAREA",
      adaptationTag: "UNIVERSAL",
      content: "La persona docente provee una guía de observación del entorno (hogar/comunidad). La persona estudiante registra datos cualitativos durante 3 días y redacta conclusiones basadas en la evidencia.",
      rubricModel: JSON.stringify({
        inicial: "Registra datos incompletos o dispersos.",
        intermedio: "Registra datos ordenados siguiendo la guía.",
        avanzado: "Registra datos exhaustivos y genera conclusiones propias."
      })
    }
  });

  console.log("🏁 RECURSOS DE INCLUSIÓN Y EVALUACIÓN CARGADOS.");
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});