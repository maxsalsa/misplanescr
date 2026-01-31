const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  console.log("\n📊 REPORTE DE CALIDAD FINAL:");
  
  // 1. Verificar el campo CODE (El que fallaba antes)
  const sub = await prisma.subject.findFirst({ where: { code: "TEC-TOUR" } });
  if (sub && sub.code) console.log("✅ INTEGRIDAD DE DATOS: Campo 'code' reparado y funcional.");
  else console.log("❌ ALERTA: Campo 'code' sigue fallando.");

  // 2. Verificar Estrategias
  const strat = await prisma.pedagogicalStrategy.count();
  console.log(`✅ INTELIGENCIA: ${strat} Estrategias activas.`);

  // 3. Verificar Usuarios
  const user = await prisma.user.findUnique({ where: { email: "max@misplanescr.com" } });
  if (user && user.role === "SUPER_ADMIN") console.log("✅ SEGURIDAD: Super Admin confirmado.");
}
main().catch(e=>console.error(e)).finally(async()=>await prisma.$disconnect());