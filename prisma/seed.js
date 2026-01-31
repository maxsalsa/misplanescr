const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("      -> Limpiando zona de aterrizaje...");
  // Borramos en orden para evitar errores de llaves foráneas
  try { await prisma.student.deleteMany(); } catch(e) {}
  try { await prisma.group.deleteMany(); } catch(e) {}
  try { await prisma.lessonPlan.deleteMany(); } catch(e) {}
  try { await prisma.user.deleteMany(); } catch(e) {}

  const password = await bcrypt.hash("Admin123!", 10);

  // 1. CREAR A MAX SALAZAR (GOD TIER)
  console.log("      -> Creando a Max Salazar...");
  const max = await prisma.user.create({
    data: {
      email: "max@misplanescr.com",
      name: "Max Salazar (Dueño)",
      password: password,
      role: "GOD_TIER",
      schoolId: "CTP_GLOBAL"
    }
  });

  // 2. CREAR GRUPOS EJEMPLO
  console.log("      -> Creando Grupos...");
  const grupo71 = await prisma.group.create({
    data: {
      name: "7-1 Matemáticas",
      grade: "7mo",
      shift: "Diurno",
      userId: max.id
    }
  });

  // 3. CREAR ESTUDIANTES
  console.log("      -> Matriculando Estudiantes...");
  await prisma.student.createMany({
    data: [
      { name: "Santiago Martínez", groupId: grupo71.id },
      { name: "Valentina Solís", groupId: grupo71.id }
    ]
  });
  
  console.log("   ✅ GÉNESIS COMPLETADO.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());