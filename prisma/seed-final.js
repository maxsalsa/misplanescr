const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // USUARIO ADMIN
  const pass = await hash("admin", 10);
  await prisma.user.create({
    data: { 
        email: "max@aulaplan.com", 
        name: "Lic. Max Salazar", 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP" 
    }
  });
  console.log("   👤 ADMIN CREADO: max@aulaplan.com");

  // DATOS MÍNIMOS PARA QUE EL DASHBOARD CARGUE ALGO
  await prisma.syllabus.createMany({
    data: [
        { modalidad: "TECNICA", level: "Décimo", subject: "Ciberseguridad", unit: "Fundamentos", topic: "Hacking Ético", period: "I Periodo" },
        { modalidad: "ACADEMICA", level: "Undécimo", subject: "Matemáticas", unit: "Funciones", topic: "Logaritmos", period: "I Periodo" },
        { modalidad: "PREESCOLAR", level: "Materno", subject: "Psicomotriz", unit: "Esquema Corporal", topic: "Movimiento", period: "I Periodo" }
    ]
  });
  console.log("   📚 DATOS BASE CARGADOS.");
}
main().finally(() => prisma.$disconnect());