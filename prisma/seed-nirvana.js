const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🕉️ INICIANDO CARGA DE DATOS: NIVEL NIRVANA...");

  // A. USUARIOS Y ESCUELAS (JERARQUÍA)
  const school = await prisma.school.upsert({
    where: { id: "esc-001" }, // ID Fijo para consistencia
    update: {},
    create: { name: "Liceo Modelo de Costa Rica", code: "LMR-2026", region: "San José" }
  });

  const superAdmin = await prisma.user.upsert({
    where: { email: "max@misplanescr.com" },
    update: { role: "SUPER_ADMIN", subscriptionStatus: "ULTRA", schoolId: school.id },
    create: { email: "max@misplanescr.com", name: "Max Salazar", role: "SUPER_ADMIN", subscriptionStatus: "ULTRA", schoolId: school.id }
  });
  console.log("✅ Jerarquía Institucional: ESTABLECIDA.");

  // B. ESTRATEGIAS PEDAGÓGICAS (BINOMIO + DUA + RÚBRICAS)
  const strategies = [
    {
      title: "Aprendizaje Basado en Retos (Universal)", category: "COTIDIANO", adaptationTag: "UNIVERSAL",
      content: "La persona docente plantea un desafío del contexto real. La persona estudiante investiga y propone soluciones creativas."
    },
    {
      title: "Apoyos Visuales Estructurados (TEA)", category: "COTIDIANO", adaptationTag: "TEA",
      content: "La persona docente presenta la agenda mediante pictogramas. La persona estudiante sigue la secuencia visual paso a paso."
    },
    {
      title: "Ensayo Argumentativo (Tarea)", category: "TAREA", adaptationTag: "UNIVERSAL",
      content: "La persona docente facilita la tesis inicial. La persona estudiante redacta argumentos a favor y en contra.",
      rubricModel: JSON.stringify({ inicial: "Lista argumentos sin conexión.", intermedio: "Redacta argumentos con coherencia parcial.", avanzado: "Defiende su postura con evidencia sólida." })
    }
  ];

  for (const s of strategies) {
    // Evitar duplicados simples
    const exists = await prisma.pedagogicalStrategy.findFirst({ where: { title: s.title } });
    if (!exists) await prisma.pedagogicalStrategy.create({ data: s });
  }
  console.log("✅ Cerebro Pedagógico: CARGADO.");

  // C. CONTENIDOS CURRICULARES (MUESTRA OMNI-MODAL)
  
  // 1. CINDEA (MODULAR)
  await injectSubject("Área de Español", "ESP-ADUL", "ADULTOS", "CINDEA", [
     { grade: "I Nivel", title: "Módulo 22: Comunicación", outcomes: ["Aplicar normas gramaticales."] }
  ]);
  
  // 2. TÉCNICA (COMPETENCIAS)
  await injectSubject("Turismo Ecológico", "TEC-TOUR", "SECUNDARIA", "TECNICA", [
     { grade: "10°", title: "Geografía Turística", outcomes: ["Identificar zonas protegidas."] },
     { grade: "12°", title: "Guíado de Grupos", outcomes: ["Aplicar protocolos de seguridad."] }
  ]);

  // 3. ACADÉMICA (ESTÁNDAR)
  await injectSubject("Estudios Sociales", "SOC-SEC", "SECUNDARIA", "ACADEMICA", [
     { grade: "9°", title: "Edad Media", outcomes: ["Analizar el feudalismo."] }
  ]);

  console.log("🏁 ESTADO NIRVANA ALCANZADO: TODO LISTO.");
}

async function injectSubject(name, code, level, modType, units) {
  const subject = await prisma.subject.upsert({
    where: { name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modType } },
    update: { code }, // Aseguramos que el código se actualice
    create: { name, code, educationLevel: level, modalityType: modType }
  });
  
  for (const u of units) {
    const unitDB = await prisma.studyUnit.create({ data: { title: u.title, grade: u.grade, semester: 1, subjectId: subject.id } });
    for (const out of u.outcomes) {
       const lo = await prisma.learningOutcome.create({ data: { description: out, unitId: unitDB.id } });
       await prisma.indicator.create({ data: { description: `Indicador: ${out}`, outcomeId: lo.id } });
    }
  }
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});