const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  console.log("?? INICIANDO PROTOCOLO DE ACCESO TOTAL...");
  const passwordPlana = "MaxAdmin2026!";
  const salt = await bcrypt.genSalt(12);
  const passwordHasheada = await bcrypt.hash(passwordPlana, salt);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aulaplanea.com' },
    update: { password: passwordHasheada, role: 'SUPER_ADMIN' },
    create: { email: 'admin@aulaplanea.com', password: passwordHasheada, nombreCompleto: 'Lic. Max Salazar', role: 'SUPER_ADMIN' }
  });
  console.log("\n? ACCESO RESTAURADO PARA EL CREADOR");
  console.log("?? EMAIL: admin@aulaplanea.com");
  console.log("?? PASSWORD: MaxAdmin2026!");
}
main().catch(e => { console.error(e); process.exit(1); }).finally(=> prisma.$disconnect());
