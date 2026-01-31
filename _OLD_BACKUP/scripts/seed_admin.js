const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Sembrando SuperAdmin en Neon DB...");
  
  const email = "max.salazar.sanchez@mep.go.cr"; // TU CORREO REAL
  const passwordRaw = "admin123"; // TU CONTRASEÑA

  // Encriptar contraseña (Grado Industrial)
  const hashedPassword = await bcrypt.hash(passwordRaw, 10);

  const user = await prisma.user.upsert({
    where: { email: email },
    update: { 
        role: "SUPER_ADMIN", 
        subscriptionStatus: "ACTIVE",
        subscriptionPlan: "ULTRA",
        password: hashedPassword 
    },
    create: {
      email: email,
      name: "Max Salazar Sánchez",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      subscriptionStatus: "ACTIVE",
      subscriptionPlan: "ULTRA"
    },
  });

  console.log(`✅ SUPER_ADMIN Creado: ${user.name} (${user.email})`);
  console.log(`🔑 Contraseña: ${passwordRaw}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
