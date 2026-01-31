const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. CONTAR
  const subCount = await prisma.subject.count();
  const unitCount = await prisma.studyUnit.count();
  const loCount = await prisma.learningOutcome.count();

  console.log("\n📊 ESTADÍSTICAS GLOBALES:");
  console.log(`   - Asignaturas/Sub-áreas: ${subCount}`);
  console.log(`   - Unidades/Módulos:      ${unitCount}`);
  console.log(`   - Resultados de Aprend.: ${loCount}`);

  // 2. DESGLOSE TÉCNICO
  console.log("\n🏭 DETALLE DE ESPECIALIDADES TÉCNICAS CARGADAS:");
  const techSubjects = await prisma.subject.findMany({
    where: { modalityType: "TECNICA" },
    include: { units: true }
  });

  techSubjects.forEach(sub => {
    console.log(`   ➤ [${sub.code}] ${sub.name}`);
    // Agrupamos por grado para visualizar mejor
    const grades = [...new Set(sub.units.map(u => u.grade))].sort();
    grades.forEach(g => {
       const mods = sub.units.filter(u => u.grade === g).length;
       console.log(`       • ${g}: ${mods} Módulos cargados.`);
    });
  });
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());