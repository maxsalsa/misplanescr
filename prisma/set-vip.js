const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: "max@aulaplan.com" },
    data: { 
        subscriptionStatus: "VIP", // CAMBIAR A "FREE" PARA PROBAR EL BLOQUEO
        role: "ADMIN"
    }
  });
  console.log("✅ Max Salazar configurado como VIP (Ve todo).");
}
main().finally(() => prisma.$disconnect());