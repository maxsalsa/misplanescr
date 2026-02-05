const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("   🔄 Verificando cuenta administrativa...");
  
  // USAMOS UPSERT: "Si existe, actualiza. Si no, crea". CERO ERRORES.
  const pass = await hash("admin", 10);
  const user = await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: { 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP" 
    },
    create: {
        email: "max@aulaplan.com",
        name: "Lic. Max Salazar",
        password: pass,
        role: "ADMIN",
        subscriptionStatus: "VIP",
        planGenerationCount: 0
    }
  });
  console.log(`   ✅ Usuario Maestro Confirmado: ${user.email}`);

  // Datos de ejemplo (solo si está vacío)
  const count = await prisma.syllabus.count();
  if (count === 0) {
     await prisma.syllabus.create({
        data: { modalidad: "TECNICA", level: "Duodécimo", subject: "Desarrollo de Software", unit: "Backend", topic: "Bases de Datos", period: "I Periodo" }
     });
     console.log("   📚 Datos de prueba inyectados.");
  } else {
     console.log(`   📚 La base de datos ya tiene ${count} registros.`);
  }
}

main()
  .catch(e => {
      console.error("❌ Error inesperado:", e);
      process.exit(1);
  })
  .finally(() => prisma.$disconnect());