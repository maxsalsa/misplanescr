const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // 1. CREAR ADMIN
  const password = await hash("admin", 10);
  const admin = await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: {},
    create: {
      email: "max@aulaplan.com",
      name: "Lic. Max Salazar",
      password: password,
      role: "ADMIN",
      subscriptionStatus: "VIP",
      planGenerationCount: 0
    },
  });
  console.log("   👤 USUARIO CREADO: max@aulaplan.com / admin");

  // 2. DATOS MÍNIMOS PARA QUE EL DASHBOARD NO SE VEA VACÍO
  await prisma.syllabus.createMany({
    data: [
      { modalidad: "ACADEMICA", level: "Décimo", subject: "Matemáticas", unit: "Geometría", topic: "Círculos", period: "I Periodo" },
      { modalidad: "TECNICA", level: "Duodécimo", subject: "Desarrollo de Software", unit: "Backend", topic: "Bases de Datos", period: "I Periodo" },
      { modalidad: "PREESCOLAR", level: "Materno Infantil", subject: "Socio-Afectiva", unit: "Identidad", topic: "El Yo", period: "I Periodo" }
    ]
  });
  console.log("   📚 DATOS DE PRUEBA CARGADOS.");
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());