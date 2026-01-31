const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("\n📊 REPORTE DE COBERTURA NACIONAL (NEON DB)\n");

  // 1. VERIFICACIÓN DE PREESCOLAR
  const pre = await prisma.subject.findMany({ where: { educationLevel: "PREESCOLAR" } });
  printStatus("PREESCOLAR", pre.length > 0, `${pre.length} Dimensiones cargadas.`);

  // 2. VERIFICACIÓN DE PRIMARIA
  const pri = await prisma.subject.findMany({ where: { educationLevel: "PRIMARIA" } });
  printStatus("PRIMARIA (I y II CICLO)", pri.length > 0, `${pri.length} Asignaturas base cargadas.`);

  // 3. VERIFICACIÓN DE SECUNDARIA ACADÉMICA
  const secAcad = await prisma.subject.findMany({ where: { educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" } });
  printStatus("SECUNDARIA ACADÉMICA", secAcad.length > 0, `${secAcad.length} Materias (Mate, Esp, Cie, Soc...)`);

  // 4. VERIFICACIÓN DE SECUNDARIA TÉCNICA (CTP)
  const secTec = await prisma.subject.findMany({ where: { modalityType: "TECNICA" } });
  // Sub-auditoría de niveles técnicos
  const hasExploratory = await prisma.studyUnit.findFirst({ where: { grade: "7°", subject: { modalityType: "TECNICA" } } });
  const hasSpecialty = await prisma.studyUnit.findFirst({ where: { grade: "12°", subject: { modalityType: "TECNICA" } } });
  
  printStatus("SECUNDARIA TÉCNICA (TOTAL)", secTec.length > 0, `${secTec.length} Sub-áreas/Talleres.`);
  printStatus("   ↳ TALLERES EXPLORATORIOS (7-9)", !!hasExploratory, "Detectados.");
  printStatus("   ↳ ESPECIALIDAD TÉCNICA (10-12)", !!hasSpecialty, "Detectados.");

  // 5. VERIFICACIÓN DE ADULTOS (CINDEA/IPEC)
  const adults = await prisma.subject.findMany({ where: { educationLevel: "ADULTOS" } });
  const hasModules = await prisma.studyUnit.findFirst({ where: { title: { contains: "Módulo" } } });
  
  printStatus("ADULTOS (CINDEA/IPEC)", adults.length > 0, `${adults.length} Áreas cargadas.`);
  printStatus("   ↳ ESTRUCTURA MODULAR", !!hasModules, "Sistema de Módulos validado.");

  // 6. VERIFICACIÓN DE RURAL
  const rural = await prisma.subject.findMany({ where: { modalityType: "RURAL" } });
  printStatus("LICEOS RURALES", rural.length > 0, `${rural.length} Talleres adaptados.`);

  console.log("\n==============================================");
  console.log("🏁 ESTADO DEL ALMA DEL PROYECTO: " + (pre.length && pri.length && secTec.length && adults.length ? "OPERATIVO" : "INCOMPLETO"));
}

function printStatus(sector, isOk, details) {
  const icon = isOk ? "✅" : "❌";
  console.log(`${icon} [${sector}]: ${details}`);
  if (!isOk) console.log(`   ⚠️ ALERTA: Faltan datos críticos en este sector.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());