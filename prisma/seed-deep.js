const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const JSON_PATH = path.join(process.cwd(), "prisma", "mep_deep_data.json");

async function main() {
  // A. ASEGURAR USUARIO ADMIN
  const pass = await hash("admin", 10);
  await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: {},
    create: { email: "max@aulaplan.com", name: "Lic. Max Salazar", password: pass, role: "ADMIN", subscriptionStatus: "VIP" }
  });

  // B. CARGAR LOS DATOS LEÍDOS POR PYTHON
  if (fs.existsSync(JSON_PATH)) {
      const rawData = fs.readFileSync(JSON_PATH, "utf-8");
      const mepData = JSON.parse(rawData);
      
      console.log(`      📥 Inyectando ${mepData.length} programas de estudio...`);
      
      // Limpiar datos viejos para evitar mezclas
      await prisma.syllabus.deleteMany({});
      
      // Inserción controlada
      let count = 0;
      for (const item of mepData) {
          await prisma.syllabus.create({ data: item });
          // Barra de progreso simple
          if (count % 10 === 0) process.stdout.write(`\r      ✅ Procesando: ${count}/${mepData.length}`);
          count++;
      }
      console.log("\n      🏆 ¡CARGA COMPLETA! El sistema ahora es experto en el MEP.");
  } else {
      console.error("      ❌ ERROR: No encuentro el archivo 'mep_deep_data.json'.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());