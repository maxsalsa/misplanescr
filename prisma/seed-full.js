const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("      -> 🧹 Limpiando base de datos (Clean Slate)...");
  await prisma.license.deleteMany();
  await prisma.syllabus.deleteMany();
  await prisma.lessonPlan.deleteMany();
  await prisma.user.deleteMany();

  // --- A. CREAR SUPER ADMIN (USTED) ---
  const pass = await hash("admin", 10);
  await prisma.user.create({
    data: {
      email: "max@aulaplan.com",
      name: "Lic. Max Salazar (Director)",
      password: pass,
      role: "ADMIN",
      subscriptionStatus: "ANUAL" // Ilimitado
    }
  });
  console.log("      -> 👑 Usuario Admin creado: max@aulaplan.com");

  // --- B. CREAR USUARIO PRUEBA (MORTAL) ---
  const profe = await prisma.user.create({
    data: {
      email: "profe@prueba.com",
      name: "Profe de Prueba",
      password: pass,
      role: "USER",
      subscriptionStatus: "SEMESTRAL"
    }
  });
  // Darle licencia SOLO para Matemáticas
  await prisma.license.create({
    data: { userId: profe.id, subject: "Matemáticas", expiresAt: new Date("2025-12-31") }
  });
  console.log("      -> 👤 Usuario Prueba creado: profe@prueba.com (Solo Mate)");

  // --- C. MALLA CURRICULAR (DATOS REALES) ---
  const curriculum = [
    // 1. DESARROLLO DE SOFTWARE (TÉCNICA)
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Tecnologías de Información", t: "RA1: Mantenimiento preventivo y correctivo de hardware." },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Tecnologías de Información", t: "RA2: Instalación de Sistemas Operativos y Drivers." },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Lógica y Algoritmos", t: "RA1: Resolución de problemas mediante diagramas de flujo." },
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", u: "Programación Web", t: "RA1: Creación de interfaces web con HTML5 y CSS3." },
    
    // 2. CONTABILIDAD (TÉCNICA)
    { m: "TECNICA", l: "Décimo", s: "Contabilidad", u: "Fundamentos Contables", t: "RA1: Clasificación de cuentas (Activo, Pasivo, Patrimonio)." },
    { m: "TECNICA", l: "Undécimo", s: "Contabilidad", u: "Costos", t: "RA1: Cálculo de materia prima y mano de obra directa." },

    // 3. TURISMO (TÉCNICA)
    { m: "TECNICA", l: "Décimo", s: "Turismo", u: "Geografía Turística", t: "RA1: Identificación de zonas turísticas de Costa Rica." },

    // 4. ACADÉMICAS
    { m: "ACADEMICA", l: "Sétimo", s: "Matemáticas", u: "Números", t: "AE1: Operaciones combinadas con números enteros." },
    { m: "ACADEMICA", l: "Décimo", s: "Matemáticas", u: "Geometría", t: "AE1: Ecuación de la circunferencia y sus aplicaciones." },
    { m: "ACADEMICA", l: "Décimo", s: "Español", u: "Literatura", t: "AE1: Análisis crítico de textos literarios costarricenses." }
  ];

  await prisma.syllabus.createMany({
    data: curriculum.map(c => ({
        modalidad: c.m, level: c.l, subject: c.s, unit: c.u, topic: c.t, period: "I Periodo"
    }))
  });
  console.log(`      -> 📚 Malla Curricular cargada: ${curriculum.length} elementos.`);
}

main().finally(() => prisma.$disconnect());