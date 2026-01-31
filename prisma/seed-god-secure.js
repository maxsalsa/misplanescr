const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 GOD MODE V2 (SECURE) INICIADO...");

  // A. CREAR SUPER ADMIN (MAX SALAZAR)
  const boss = await prisma.user.upsert({
    where: { email: "max@misplanescr.com" },
    update: { role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" },
    create: { 
        email: "max@misplanescr.com", 
        name: "Max Salazar", 
        role: "SUPER_ADMIN", 
        subscriptionStatus: "ULTRA",
        passwordHash: "$2b$10$SecretHash...", // Simulación de seguridad
        lastLogin: new Date()
    }
  });
  // CREAR USUARIO FREE (PRUEBA)
  await prisma.user.upsert({
    where: { email: "profe@prueba.com" },
    update: {},
    create: { email: "profe@prueba.com", name: "Profe Prueba", role: "TEACHER", subscriptionStatus: "FREE" }
  });
  console.log("✅ [IAM] Usuarios Maestros restaurados.");

  // B. CEREBRO PEDAGÓGICO (BINOMIO SAGRADO + DUA + EVALUACIÓN)
  const strategies = [
    { 
      title: "Lluvia de Ideas", category: "COTIDIANO", adaptationTag: "UNIVERSAL",
      content: "La persona docente plantea una pregunta generadora. La persona estudiante aporta ideas previas construyendo un mapa mental."
    },
    { 
      title: "Estudio de Casos", category: "COTIDIANO", adaptationTag: "UNIVERSAL",
      content: "La persona docente presenta un problema real. La persona estudiante analiza causas y propone soluciones en subgrupos."
    },
    { 
      title: "Agenda Visual (TEA)", category: "COTIDIANO", adaptationTag: "TEA",
      content: "La persona docente estructura la clase con pictogramas. La persona estudiante sigue la secuencia visual anticipando transiciones."
    },
    { 
      title: "Investigación Documental", category: "TAREA", adaptationTag: "UNIVERSAL",
      content: "La persona docente asigna temas. La persona estudiante indaga fuentes y elabora un reporte.",
      rubricModel: JSON.stringify({inicial:"Cita fuentes dudosas.", intermedio:"Usa fuentes confiables.", avanzado:"Contrasta fuentes académicas."})
    }
  ];
  for (const s of strategies) {
    await prisma.pedagogicalStrategy.create({ data: s });
  }
  console.log("✅ [CEREBRO] Estrategias Pedagógicas cargadas.");

  // C. MATRIZ EDUCATIVA (MUESTRA ROBUSTA DE TODOS LOS SECTORES)
  
  // 1. PRIMARIA
  await injectSubject("Matemáticas", "MAT-PRI", "PRIMARIA", "ACADEMICA", [
    { grade: "1°", title: "Números Naturales", outcomes: ["Identificar números del 0 al 10."] },
    { grade: "6°", title: "Geometría", outcomes: ["Calcular áreas y perímetros."] }
  ]);
  
  // 2. SECUNDARIA ACADÉMICA
  await injectSubject("Español", "ESP-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Cuento Costarricense", outcomes: ["Analizar elementos del cuento."] },
    { grade: "11°", title: "Ensayo", outcomes: ["Redactar textos argumentativos."] }
  ]);

  // 3. TÉCNICA (INDUSTRIAL & COMERCIAL)
  await injectSubject("Desarrollo de Software", "TEC-SOFT", "SECUNDARIA", "TECNICA", [
    { grade: "10°", title: "Lógica", outcomes: ["Diseñar algoritmos."] },
    { grade: "12°", title: "Apps Móviles", outcomes: ["Publicar aplicaciones."] }
  ]);
  await injectSubject("Electrotecnia", "IND-ELEC", "SECUNDARIA", "TECNICA", [
    { grade: "10°", title: "Circuitos DC", outcomes: ["Aplicar Ley de Ohm."] }
  ]);
  // Taller Exploratorio
  await injectSubject("Taller Expl: Electricidad", "EXP-ELEC", "SECUNDARIA", "TECNICA", [
    { grade: "7°", title: "Seguridad", outcomes: ["Usar equipo de protección."] }
  ]);
  // Idioma
  await injectSubject("Inglés Conversacional", "ENG-CONV", "SECUNDARIA", "TECNICA", [
    { grade: "7°", title: "Unit 1: Greetings", outcomes: ["Introduce oneself."] }
  ]);

  // 4. ADULTOS (CINDEA)
  await injectSubject("Área de Ciencias Naturales", "CN-ADUL", "ADULTOS", "CINDEA", [
    { grade: "II Nivel", title: "Módulo 54: La Tierra", outcomes: ["Analizar capas de la Tierra."] }
  ]);

  // 5. COMPLEMENTARIAS
  await injectSubject("Orientación", "ORI-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "10°", title: "Vocación", outcomes: ["Explorar carreras."] }
  ]);

  console.log("🏁 SISTEMA FÉNIX RESTAURADO AL 100%.");
}

async function injectSubject(name, code, level, modType, units) {
  const subject = await prisma.subject.upsert({
    where: { name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modType } },
    update: {}, create: { name, code, educationLevel: level, modalityType: modType }
  });
  for (const u of units) {
    const unitDB = await prisma.studyUnit.create({ data: { title: u.title, grade: u.grade, semester: 1, subjectId: subject.id } });
    for (const out of u.outcomes) {
      const lo = await prisma.learningOutcome.create({ data: { description: out, unitId: unitDB.id } });
      let prefix = code === "ENG-CONV" ? "Performance Indicator:" : "Indicador:";
      await prisma.indicator.create({ data: { description: `${prefix} Evidencia ${out}`, outcomeId: lo.id } });
    }
  }
  console.log(`✅ [${level}] ${name} inyectada.`);
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});