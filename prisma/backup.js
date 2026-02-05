const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("   📦 Iniciando exportación de seguridad...");
  
  // 1. EXTRAER TODO
  const users = await prisma.user.findMany();
  const syllabus = await prisma.syllabus.findMany();
  const plans = await prisma.lessonPlan.findMany();
  const licenses = await prisma.license.findMany();

  const backupData = {
    timestamp: new Date().toISOString(),
    stats: {
        users: users.length,
        syllabus: syllabus.length,
        plans: plans.length
    },
    data: { users, syllabus, plans, licenses }
  };

  // 2. GENERAR NOMBRE DE ARCHIVO CON FECHA
  const date = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `aulaplan_backup_${date}.json`;
  const filePath = path.join(process.cwd(), "backups", fileName);

  // 3. GUARDAR
  fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));

  console.log(`   ✅ RESPALDO COMPLETADO EXITOSAMENTE.`);
  console.log(`   📂 Archivo: backups/${fileName}`);
  console.log(`   📊 Datos guardados: ${syllabus.length} registros académicos.`);
}

main()
  .catch(e => console.error("❌ Error en respaldo:", e))
  .finally(() => prisma.$disconnect());