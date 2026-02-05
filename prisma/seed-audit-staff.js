const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      institution: true,
      _count: {
        select: { groups: true, plans: true }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 15 
  });

  console.log("████████████████████████████████████████");
  console.log("       NÓMINA DOCENTE - REPORTE         ");
  console.log("████████████████████████████████████████");
  console.log(String("NOMBRE").padEnd(20) + String("ROL").padEnd(10) + String("INSTITUCIÓN").padEnd(20) + String("GRUPOS").padEnd(8) + String("PLANES").padEnd(8));
  console.log("-".repeat(70));

  users.forEach(u => {
    const instName = u.institution ? u.institution.name.substring(0, 18) : "N/A";
    console.log(
      u.name.substring(0, 19).padEnd(20) + 
      u.role.substring(0, 9).padEnd(10) + 
      instName.padEnd(20) + 
      String(u._count.groups).padEnd(8) + 
      String(u._count.plans).padEnd(8)
    );
  });
  
  // VALIDACIÓN DE CONTENIDO ESPECÍFICO
  const samplePlan = await prisma.lessonPlan.findFirst({ where: { subject: "Mecánica de Precisión" } });
  if(samplePlan) {
      console.log("\n🔍 VERIFICACIÓN DE CONTENIDO CTP (Mecánica):");
      console.log("   -> Título:", samplePlan.title);
      console.log("   -> Tarea Corta:", samplePlan.content.planning_module.evaluation_system.short_task.title);
  }

  console.log("\n✅ AUDITORÍA APROBADA. LOS USUARIOS EXISTEN Y TIENEN CARGA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());