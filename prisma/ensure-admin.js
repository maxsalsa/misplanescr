const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const pass = await hash("admin", 10);

  // FORZAMOS LA EXISTENCIA DEL SUPER ADMIN
  const user = await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: { 
        role: "ADMIN", 
        subscriptionStatus: "VIP",
        name: "Lic. Max Salazar (CEO)",
        password: pass // Reseteamos la clave a 'admin' por si acaso
    },
    create: { 
        email: "max@aulaplan.com", 
        name: "Lic. Max Salazar (CEO)", 
        password: pass, 
        role: "ADMIN", 
        subscriptionStatus: "VIP"
    }
  });

  console.log("\n✅ SUPER ADMIN CONFIRMADO EN BASE DE DATOS:");
  console.log("   -------------------------------------------");
  console.log("   📧 Usuario:   max@aulaplan.com");
  console.log("   🔑 Clave:     admin");
  console.log("   👑 ROL:       ADMIN (Dios)");
  console.log("   -------------------------------------------");
  console.log("   Puede ingresar ahora mismo.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());