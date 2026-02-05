const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // 1. Encriptamos "admin"
  const pass = await hash("admin", 10);
  console.log("   -> Inyectando credenciales...");
  
  // 2. Forzamos la actualización
  await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: { 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP",
        mustChangePassword: false 
    },
    create: { 
        email: "max@aulaplan.com", 
        name: "Lic. Max Salazar", 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP",
        mustChangePassword: false 
    }
  });
  console.log("   -> ✅ LISTO. Usuario: max@aulaplan.com / Clave: admin");
}
main().finally(() => prisma.$disconnect());