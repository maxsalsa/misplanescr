const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();
async function main() {
  const email = "max@aulaplan.com";
  const pass = await hash("admin", 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", subscriptionStatus: "VIP" },
    create: { email, name: "Lic. Max Salazar (CEO)", password: pass, role: "ADMIN", subscriptionStatus: "VIP" }
  });
  await prisma.license.create({ data: { userId: user.id, subject: "TODAS", expiresAt: new Date("2099-12-31"), isActive: true } });
}
main().finally(() => prisma.$disconnect());