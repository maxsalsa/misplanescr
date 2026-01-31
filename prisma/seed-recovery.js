const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🧬 INYECTANDO SUERO DE RECUPERACIÓN...");

  // A. SUPER ADMIN
  await prisma.user.upsert({
    where: { email: "max@misplanescr.com" },
    update: { role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" },
    create: { 
        email: "max@misplanescr.com", 
        name: "Max Salazar", 
        role: "SUPER_ADMIN", 
        subscriptionStatus: "ULTRA", 
        passwordHash: "secure" 
    }
  });

  // B. MATERIAS (EL COMBOBOX QUE FALLÓ)
  // Secundaria Académica
  await injectSubject("Español", "ESP-SEC", "SECUNDARIA", "ACADEMICA", [
      { grade: "7°", title: "Cuento y Novela", outcomes: ["Analizar textos literarios."] }
  ]);
  // Técnica (CTP)
  await injectSubject("Desarrollo de Software", "TEC-SOFT", "SECUNDARIA", "TECNICA", [
      { grade: "10°", title: "Lógica de Programación", outcomes: ["Diseñar algoritmos."] },
      { grade: "12°", title: "Desarrollo Web", outcomes: ["Crear APIs."] }
  ]);
  // CINDEA
  await injectSubject("Matemáticas", "MAT-ADUL", "ADULTOS", "CINDEA", [
      { grade: "I Nivel", title: "Módulo 1: Números", outcomes: ["Operaciones básicas."] }
  ]);

  // C. ESTRATEGIAS (EL CEREBRO)
  const strategies = [
    { title: "Lluvia de Ideas", category: "COTIDIANO", adaptationTag: "UNIVERSAL", content: "Docente pregunta, estudiante responde..." },
    { title: "Ensayo (Tarea)", category: "TAREA", adaptationTag: "UNIVERSAL", content: "Docente asigna tema...", rubricModel: JSON.stringify({inicial:"Mal", intermedio:"Regular", avanzado:"Bien"}) }
  ];
  for (const s of strategies) {
    const exists = await prisma.pedagogicalStrategy.findFirst({ where: { title: s.title } });
    if (!exists) await prisma.pedagogicalStrategy.create({ data: s });
  }

  console.log("🏁 SISTEMA RECUPERADO Y ONLINE.");
}

async function injectSubject(name, code, level, modType, units) {
  const subject = await prisma.subject.upsert({
    where: { name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modType } },
    update: { code },
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