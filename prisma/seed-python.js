const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();
const JSON_PATH = path.join(process.cwd(), "prisma", "mep_data.json");

async function main() {
  // A. USUARIO ADMIN (Siempre asegurado)
  const pass = await hash("admin", 10);
  await prisma.user.upsert({
    where: { email: "max@aulaplan.com" },
    update: {},
    create: { email: "max@aulaplan.com", name: "Lic. Max Salazar", password: pass, role: "ADMIN", subscriptionStatus: "VIP" }
  });

  // B. CARGA MASIVA DE DATOS
  if (fs.existsSync(JSON_PATH)) {
      const rawData = fs.readFileSync(JSON_PATH, "utf-8");
      const mepData = JSON.parse(rawData);
      
      console.log(`      📥 Leyendo ${mepData.length} asignaturas desde el escáner...`);
      
      // Borrón y cuenta nueva para los datos académicos (limpieza total)
      await prisma.syllabus.deleteMany({});
      
      // Insertar por lotes para mayor velocidad
      await prisma.syllabus.createMany({
        data: mepData
      });
      console.log("      ✅ Base de datos actualizada con la estructura real de carpetas.");
  } else {
      console.error("      ❌ Error: No se generó el archivo JSON de Python.");
  }
}

main().finally(() => prisma.$disconnect());