const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const email = "max@misplanescr.com";
  console.log("   🔍 Buscando usuario maestro:", email);

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    console.log("   ✅ EL USUARIO EXISTE. ID:", user.id);
    console.log("   ✅ ROL:", user.role);
    // Opcional: Resetear password por seguridad si lo pide
    // const hash = await bcrypt.hash("Admin123!", 10);
    // await prisma.user.update({ where: { email }, data: { password: hash } });
  } else {
    console.log("   ⚠️ USUARIO NO ENCONTRADO. CREANDO AHORA MISMO...");
    const password = await bcrypt.hash("Admin123!", 10);
    await prisma.user.create({
      data: {
        email,
        name: "Max Salazar (God Tier)",
        password,
        role: "GOD_TIER",
        schoolId: "CTP_MN_SR"
      }
    });
    console.log("   ✅ USUARIO CREADO EXITOSAMENTE.");
  }
}

main()
  .catch(e => { console.error("   ❌ ERROR DB:", e.message); process.exit(1); })
  .finally(async () => await prisma.$disconnect());