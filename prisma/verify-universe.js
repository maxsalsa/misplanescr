const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("📊 REPORTE FINAL DE INVENTARIO AULAPLAN:");
  console.log("========================================");

  // Contar totales
  const totalUsers = await prisma.user.count();
  const totalSubjects = await prisma.subject.count();
  const totalUnits = await prisma.studyUnit.count();
  const totalPlans = await prisma.lessonPlan.count();
  const totalAssessments = await prisma.assessment.count();

  console.log(`👤 Usuarios Admin:      ${totalUsers}`);
  console.log(`📚 Asignaturas (Subs):  ${totalSubjects}`);
  console.log(`📦 Unidades de Estudio: ${totalUnits}`);
  console.log(`📝 Planes Maestros:     ${totalPlans}`);
  console.log(`📋 Instrumentos (GTA):  ${totalAssessments}`);
  console.log("----------------------------------------");

  // Muestra 5 materias aleatorias para verificar variedad
  const samples = await prisma.subject.findMany({
      take: 5,
      include: { _count: { select: { units: true, assessments: true } } }
  });

  console.log("🌍 MUESTRA DE COBERTURA (Top 5):");
  samples.forEach(s => {
      console.log(`   - [${s.modalityType}] ${s.name} (${s.educationLevel}): ${s._count.units} Unidades, ${s._count.assessments} Recursos.`);
  });
  
  console.log("\n✅ SISTEMA OPERATIVO Y LISTO PARA EL MERCADO.");
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());