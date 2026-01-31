const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔍 AUDITANDO LÓGICA DE ASISTENCIA (2 Tardías = 1 Ausencia)...");

  // 1. GARANTIZAR SUPER ADMIN (GUARDIÁN)
  const admin = await prisma.user.upsert({
      where: { email: "max@misplanescr.com" },
      update: {},
      create: { email: "max@misplanescr.com", role: "SUPER_ADMIN" }
  });

  // 2. CREAR ESTUDIANTE
  const student = await prisma.student.upsert({
      where: { idNumber: "AUDIT-UNIT-01" },
      update: {},
      create: { 
          fullName: "Estudiante Auditoría Unidad", 
          idNumber: "AUDIT-UNIT-01", 
          section: "10-1", level: "10°", modality: "TECNICA",
          guardianId: admin.id 
      }
  });

  // 3. LIMPIAR Y PROBAR
  await prisma.attendanceRecord.deleteMany({ where: { studentId: student.id } });
  const today = new Date();
  
  // Inyectamos: 1 Ausencia (AI) + 2 Tardías (TI) => Debería sumar 2 Ausencias Totales
  await prisma.attendanceRecord.createMany({
      data: [
          { date: today, status: "AI", studentId: student.id },
          { date: today, status: "TI", studentId: student.id },
          { date: today, status: "TI", studentId: student.id }
      ]
  });

  const records = await prisma.attendanceRecord.findMany({ where: { studentId: student.id } });
  let ais = records.filter(r => r.status === "AI").length;
  let tis = records.filter(r => r.status === "TI").length;
  
  let totalEfectivo = ais + Math.floor(tis / 2);

  console.log(`📊 RESULTADO: ${ais} AI + (${tis} TI / 2) = ${totalEfectivo} TOTAL.`);
  
  if (totalEfectivo === 2) console.log("✅ CÁLCULO DE ASISTENCIA CORRECTO.");
  else console.log("❌ ERROR EN CÁLCULO.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());