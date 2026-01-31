const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. OBTENER AL SUPER ADMIN (Para asignarle el grupo)
  const teacher = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" }
  });

  if (!teacher) {
    console.error("❌ ERROR: Ejecute primero el script de Super Admin.");
    return;
  }

  console.log(`👨‍🏫 Asignando carga académica a: ${teacher.name}`);

  // 2. CREAR ESTUDIANTES (DATA REALISTA TICA)
  const studentsData = [
    { name: "SÓLIS VARGAS MARÍA JOSÉ", id: "1-1111-1111" },
    { name: "MORA ROJAS SEBASTIÁN", id: "1-2222-2222" },
    { name: "JIMÉNEZ CASTRO VALENTINA", id: "1-3333-3333" },
    { name: "VARGAS ARAYA DIEGO", id: "1-4444-4444" },
    { name: "HERRERA SALAS CAMILA", id: "1-5555-5555" },
    { name: "RODRÍGUEZ SÁNCHEZ MATEO", id: "1-6666-6666" },
    { name: "CASTILLO UREÑA SOFÍA", id: "1-7777-7777" },
    { name: "UREÑA PORRAS SANTIAGO", id: "1-8888-8888" },
    { name: "MONGE CORDERO LUCÍA", id: "1-9999-9999" },
    { name: "ARAYA MOLINA GABRIEL", id: "2-0000-0000" }
  ];

  for (const stu of studentsData) {
    // Upsert: Si existe no lo crea, si no existe lo crea
    await prisma.student.upsert({
      where: { idNumber: stu.id },
      update: {},
      create: {
        fullName: stu.name,
        idNumber: stu.id,
        section: "8-1",
        guardianId: teacher.id // Temporalmente asignamos al profe como tutor para pruebas
      }
    });
  }

  console.log(`✅ Matriculados 10 estudiantes en la 8-1.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });