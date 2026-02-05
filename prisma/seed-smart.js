const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("   🔄 Verificando usuarios...");
  
  // 1. USUARIO ADMIN (UPSERT: Crea o Actualiza)
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
  console.log("   ✅ Usuario Maestro Confirmado:", user.email);

  // 2. DATOS DE EJEMPLO (Solo si está vacío para no duplicar)
  const count = await prisma.syllabus.count();
  if (count === 0) {
      console.log("   📥 Inyectando datos base...");
      await prisma.syllabus.createMany({
        data: [
            { modalidad: "TECNICA", level: "Décimo", subject: "Ciberseguridad", unit: "Introducción", topic: "Seguridad de Redes", period: "I Periodo" },
            { modalidad: "ACADEMICA", level: "Sétimo", subject: "Ciencias", unit: "La Célula", topic: "Estructura Celular", period: "I Periodo" }
        ]
      });
  } else {
      console.log(`   📚 Base de datos saludable (${count} registros existentes).`);
  }
}

main()
  .catch(e => {
      console.error("❌ Error Fatal:", e);
      process.exit(1);
  })
  .finally(() => prisma.$disconnect());