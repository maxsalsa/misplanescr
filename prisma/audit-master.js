const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("\n📊 REPORTE DE ESTADO DEL SISTEMA (STATUS CHECK)\n");
  let score = 100;

  // 1. VERIFICAR ESCUELAS Y DIRECTORES
  const schools = await prisma.school.count();
  const directors = await prisma.user.count({ where: { role: "DIRECTOR" } });
  
  if (schools === 0 || directors === 0) {
      console.log("❌ [INSTITUCIONAL] Faltan Escuelas/Directores. -> AUTO-CORRIGIENDO...");
      await prisma.school.create({
          data: {
              name: "Liceo Experimental Bilingüe",
              code: "LEB-001",
              users: {
                  create: {
                      email: "director@mep.go.cr",
                      name: "Director General",
                      role: "DIRECTOR",
                      passwordHash: "secure",
                      subscriptionStatus: "PRO"
                  }
              }
          }
      });
      console.log("   ✅ Corrección aplicada: Escuela y Director creados.");
  } else {
      console.log(`✅ [INSTITUCIONAL] Sistema operativo: ${schools} Escuelas, ${directors} Directores.`);
  }

  // 2. VERIFICAR FAMILIAS (PADRES)
  const families = await prisma.user.count({ where: { role: "FAMILY" } });
  if (families === 0) {
      console.log("❌ [FAMILIAS] No hay cuentas de padres. -> AUTO-CORRIGIENDO...");
      const parent = await prisma.user.create({
          data: {
              email: "mama@familia.com",
              name: "María Pérez (Mamá)",
              role: "FAMILY",
              students: {
                  create: {
                      fullName: "Pedrito Estudiante",
                      idNumber: "1-1234-5678",
                      section: "7-1",
                      level: "SECUNDARIA",
                      modality: "ACADEMICA"
                  }
              }
          }
      });
      console.log("   ✅ Corrección aplicada: Cuenta Familiar creada.");
  } else {
      console.log("✅ [FAMILIAS] Módulo familiar activo.");
  }

  // 3. VERIFICAR CURRÍCULO (AUDITORÍA DE HUECOS)
  const subjects = await prisma.subject.count();
  const strategies = await prisma.pedagogicalStrategy.count();
  
  if (subjects < 5 || strategies < 3) {
     console.log("❌ [CURRÍCULO] Base de datos anémica. -> REQUIRIENDO GOD SEED.");
     score -= 50;
     process.exit(1); // Forzamos al script de PowerShell a correr el God Seed
  } else {
     console.log(`✅ [CURRÍCULO] Robusto: ${subjects} Materias, ${strategies} Estrategias.`);
  }

  // 4. VERIFICAR SEGURIDAD (SUPER ADMIN)
  const admin = await prisma.user.findUnique({ where: { email: "max@misplanescr.com" } });
  if (!admin || admin.role !== "SUPER_ADMIN") {
     console.log("❌ [SEGURIDAD] Max Salazar no es Super Admin. -> AUTO-CORRIGIENDO...");
     await prisma.user.upsert({
        where: { email: "max@misplanescr.com" },
        update: { role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" },
        create: { email: "max@misplanescr.com", role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" }
     });
     console.log("   ✅ Corrección aplicada: Acceso Root restaurado.");
  } else {
     console.log("✅ [SEGURIDAD] Acceso Root verificado.");
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async() => await prisma.$disconnect());