const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando Inyección de Datos...");

  // 1. MAX SALAZAR (CEO - ULTRA)
  await prisma.user.upsert({
    where: { email: "max@misplanescr.com" },
    update: { role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" },
    create: {
      email: "max@misplanescr.com",
      name: "Max Salazar (CEO)",
      role: "SUPER_ADMIN",
      subscriptionStatus: "ULTRA"
    },
  });
  console.log("✅ [USUARIO] Max Salazar (Ultra): LISTO");

  // 2. PROFE PRUEBA (FREE)
  await prisma.user.upsert({
    where: { email: "profe@prueba.com" },
    update: { role: "TEACHER", subscriptionStatus: "FREE" },
    create: {
      email: "profe@prueba.com",
      name: "Profesor Prueba (Gratuito)",
      role: "TEACHER",
      subscriptionStatus: "FREE"
    },
  });
  console.log("✅ [USUARIO] Profe Free: LISTO");

  // 3. ESTUDIANTES (SECCIÓN 10-2)
  const students = [
    { name: "VARGAS CALVO ANA SOFÍA", id: "10-001" },
    { name: "MÉNDEZ ROJAS CARLOS", id: "10-002" },
    { name: "GUZMÁN SOTO VALERIA", id: "10-003" }
  ];

  // Buscamos el ID de Max para asignarle los alumnos
  const maxUser = await prisma.user.findUnique({ where: { email: "max@misplanescr.com" }});

  for (const s of students) {
    await prisma.student.upsert({
      where: { idNumber: s.id },
      update: {},
      create: {
        fullName: s.name,
        idNumber: s.id,
        section: "10-2",
        guardianId: maxUser.id,
        grades: { cotidiano: 95, tarea1: 88 } // Datos JSON reales
      }
    });
  }
  console.log("✅ [ESTUDIANTES] Sección 10-2 Matriculada.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });