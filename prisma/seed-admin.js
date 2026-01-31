const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const hashedPassword = await bcrypt.hash("123", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "max@misplanescr.com" },
    // CORRECCIÓN CRÍTICA: SI EXISTE, FORZAMOS EL ROL GOD_TIER
    update: { 
        role: "GOD_TIER",
        password: hashedPassword 
    }, 
    create: {
      email: "max@misplanescr.com",
      name: "Max Salazar (God Tier)",
      password: hashedPassword,
      role: "GOD_TIER"
    }
  });
  console.log("✅ RANGO ACTUALIZADO A GOD_TIER: " + user.email);
}
main().finally(() => prisma.$disconnect());