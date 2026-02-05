const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const pass = await hash("admin", 10);
  console.log("   -> Actualizando usuario Max...");
  
  await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: { 
        password: pass, 
        role: "ADMIN", 
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
  console.log("   -> ✅ CREDENCIALES ESTABLECIDAS.");
}
main().finally(() => prisma.$disconnect());