const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.syllabus.count();
  console.log(`   📊 ESTADO DB: Se encontraron ${count} registros curriculares.`);
  if (count === 0) console.log("   ⚠️ ALERTA: La base de datos está vacía. Necesita correr el SEED.");
  else console.log("   ✅ DATA OK: La información está ahí, el problema es el Frontend.");
}
main().finally(() => prisma.$disconnect());