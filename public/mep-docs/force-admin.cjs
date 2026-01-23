const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🔓 INICIANDO PROTOCOLO DE ACCESO TOTAL (V6 - COMPATIBILIDAD)...");

  const emailAdmin = "admin@aulaplanea.com";
  const passwordPlana = "MaxAdmin2026!";
  
  // Usamos el método directo hashSync para evitar problemas de argumentos
  console.log("⏳ Generando Hash de seguridad...");
  const hash = bcrypt.hashSync(passwordPlana, 10);

  console.log("🚀 Sincronizando con Neon DB...");

  const admin = await prisma.user.upsert({
    where: { email: emailAdmin },
    update: {
      passwordHash: hash,
      role: 'SUPER_ADMIN',
      name: 'Lic. Max Salazar Sánchez',
    },
    create: {
      email: emailAdmin,
      passwordHash: hash,
      name: 'Lic. Max Salazar Sánchez',
      role: 'SUPER_ADMIN',
    },
  });

  console.log("\n✅ ¡SISTEMA RESTAURADO CON ÉXITO!");
  console.log("=========================================");
  console.log(`📧 USUARIO: ${admin.email}`);
  console.log(`🔑 PASSWORD: ${passwordPlana}`);
  console.log("=========================================");
  console.log("👉 PASO SIGUIENTE: Abre la web e intenta loguearte.");
}

main()
  .catch((e) => {
    console.error("❌ ERROR EN LA OPERACIÓN:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });