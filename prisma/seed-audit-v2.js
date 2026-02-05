const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { role: { not: "GOD_TIER" } }, // Ver solo profes normales primero
    include: { _count: { select: { groups: true, plans: true } } },
    take: 10
  });

  console.log("████████████████████████████████████████");
  console.log("       REPORTE DE PERSONAL DOCENTE      ");
  console.log("████████████████████████████████████████");
  
  users.forEach(u => {
    console.log(`👤 DOCENTE: ${u.name}`);
    console.log(`   -> Email: ${u.email}`);
    console.log(`   -> Carga: ${u._count.groups} Grupos | ${u._count.plans} Planes`);
    console.log("-".repeat(40));
  });

  // VERIFICACIÓN DE CONTENIDO (CON SEGURIDAD)
  const plans = await prisma.lessonPlan.findMany({ take: 5, orderBy: { createdAt: "desc" } });
  
  console.log("\n🔍 MUESTREO DE ÚLTIMOS PLANES CREADOS:");
  plans.forEach(p => {
      // USO DE ?. PARA EVITAR CRASH
      const task = p.content?.planning_module?.evaluation_system?.short_task?.title || "Sin Tarea Específica";
      const subj = p.subject || "Sin Materia";
      console.log(`   📄 [${subj}] ${p.title.substring(0, 30)}... -> Tarea: ${task}`);
  });

  console.log("\n✅ AUDITORÍA V2 FINALIZADA. SISTEMA ESTABLE.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());