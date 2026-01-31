const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Conectando a Neon DB...");
  const email = "max.salazar.sanchez@mep.go.cr";
  const passwordRaw = "admin123";

  // 1. INTENTAR BORRAR EL USUARIO VIEJO (SI EXISTE)
  try {
    await prisma.user.delete({ where: { email } });
    console.log("🗑️ Usuario anterior eliminado (Limpieza).");
  } catch (e) {
    console.log("INFO: El usuario no existía o ya estaba limpio.");
  }

  // 2. GENERAR NUEVO HASH BLINDADO
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordRaw, salt);

  // 3. CREAR EL SUPER ADMIN (CON TÍTULO DE LICENCIADO)
  const user = await prisma.user.create({
    data: {
      email: email,
      name: "Lic. Max Salazar Sánchez",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      subscriptionStatus: "ACTIVE",
      subscriptionPlan: "ULTRA"
    },
  });

  console.log(`✅ ÉXITO TOTAL: Usuario creado.`);
  console.log(`👤 Nombre: ${user.name}`);
  console.log(`📧 Correo: ${user.email}`);
  console.log(`🔑 Clave: ${passwordRaw}`);
  console.log(`🛡️ Nivel: ${user.role} (Plan ${user.subscriptionPlan})`);
}

main()
  .catch((e) => {
    console.error("❌ ERROR CRÍTICO:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
