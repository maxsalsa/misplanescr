const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("\n🕵️ AUDITORÍA DE SEGURIDAD V-ELITE");
  
  // 1. VERIFICAR ADMIN
  const admin = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  if (admin) console.log(`✅ SUPER ADMIN: ${admin.name} (${admin.email}) - ACTIVO`);
  else console.log("❌ ALERTA: NO HAY SUPER ADMIN.");

  // 2. VERIFICAR CONTENIDOS
  const subjects = await prisma.subject.count();
  const strategies = await prisma.pedagogicalStrategy.count();
  console.log(`✅ INFRAESTRUCTURA: ${subjects} Materias | ${strategies} Estrategias Pedagógicas.`);

  // 3. VERIFICAR INTEGRIDAD LOGS
  const logs = await prisma.systemLog.count(); // Debería haber logs del seed anterior si existiera
  console.log(`✅ LOGS DE SISTEMA: ${logs} eventos registrados.`);
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());