const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Protocolo V1500: Carga de Talleres de Tercer Ciclo...");

  // ==========================================
  // 🗣️ INGLÉS CONVERSACIONAL (Listening & Speaking)
  // ==========================================
  // Nota: Se carga como materia separada del Inglés Académico
  
  await injectSubject("Inglés Conversacional (Listening & Speaking)", "ENG-CONV", "SECUNDARIA", "TECNICA", [
    {
      grade: "7°", semester: 1, title: "Unit 1: Me and my environment",
      outcomes: ["Demonstrate understanding of simple introductions.", "Express personal information orally."]
    },
    {
      grade: "8°", semester: 1, title: "Unit 1: Hobbies and Entertainment",
      outcomes: ["Describe daily routines and leisure activities.", "Ask and answer questions about past events."]
    },
    {
      grade: "9°", semester: 1, title: "Unit 1: Technology and Future",
      outcomes: ["Predict future events using simple future tense.", "Discuss pros and cons of technology."]
    }
  ]);

  // ==========================================
  // 🛠️ TALLERES EXPLORATORIOS (7°, 8°, 9°)
  // ==========================================
  // Estos talleres rotan, así que se cargan disponibles para los 3 niveles usualmente,
  // aquí cargaremos ejemplos representativos por nivel sugerido.

  // 1. TALLER: ELECTRICIDAD BÁSICA
  await injectSubject("Taller Expl: Electricidad", "EXP-ELEC", "SECUNDARIA", "TECNICA", [
    { grade: "7°", semester: 1, title: "Seguridad y Circuitos Simples", outcomes: ["Identificar herramientas de electricista.", "Armar un circuito serie con batería."] }
  ]);

  // 2. TALLER: DIBUJO TÉCNICO
  await injectSubject("Taller Expl: Dibujo Técnico", "EXP-DRAW", "SECUNDARIA", "TECNICA", [
    { grade: "7°", semester: 1, title: "Instrumentación y Geometría", outcomes: ["Utilizar escuadras y compás correctamente.", "Realizar trazados geométricos básicos."] }
  ]);

  // 3. TALLER: TURISMO Y CULTURA
  await injectSubject("Taller Expl: Cultura Turística", "EXP-TOUR", "SECUNDARIA", "TECNICA", [
    { grade: "8°", semester: 1, title: "Atractivos Locales", outcomes: ["Identificar el patrimonio natural de la comunidad.", "Aplicar normas de cortesía con visitantes."] }
  ]);

  // 4. TALLER: AGROINDUSTRIA / HUERTA
  await injectSubject("Taller Expl: Agroecología", "EXP-AGRO", "SECUNDARIA", "TECNICA", [
    { grade: "8°", semester: 1, title: "Cultivos Hidropónicos", outcomes: ["Preparar sustratos para siembra.", "Controlar variables de riego."] }
  ]);

  // 5. TALLER: OFIMÁTICA / COMPUTACIÓN
  await injectSubject("Taller Expl: Herramientas Digitales", "EXP-COMP", "SECUNDARIA", "TECNICA", [
    { grade: "9°", semester: 1, title: "Procesadores de Texto y Presentaciones", outcomes: ["Diseñar documentos con formato profesional.", "Crear diapositivas interactivas."] }
  ]);

  // 6. TALLER: MADERAS / EBANISTERÍA
  await injectSubject("Taller Expl: Artes Industriales (Maderas)", "EXP-WOOD", "SECUNDARIA", "TECNICA", [
    { grade: "9°", semester: 1, title: "Acabados y Lijado", outcomes: ["Aplicar técnicas de lijado en madera.", "Utilizar barnices y selladores."] }
  ]);

  console.log("🏁 TALLERES E IDIOMAS CARGADOS.");
}

async function injectSubject(name, code, level, modType, units) {
  const subject = await prisma.subject.upsert({
    where: { 
      name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modType } 
    },
    update: {},
    create: { name, code, educationLevel: level, modalityType: modType }
  });

  for (const u of units) {
    const unitDB = await prisma.studyUnit.create({
      data: { title: u.title, grade: u.grade, semester: u.semester, subjectId: subject.id }
    });
    for (const out of u.outcomes) {
      const lo = await prisma.learningOutcome.create({ data: { description: out, unitId: unitDB.id } });
      
      // Lógica de Indicadores: Si es Inglés, el indicador va en Inglés
      const prefix = code === "ENG-CONV" ? "Performance Indicator:" : "Indicador:";
      const desc = code === "ENG-CONV" ? `Student is able to ${out.toLowerCase()}` : `Demuestra habilidad en ${out.toLowerCase()}`;
      
      await prisma.indicator.create({ data: { description: `${prefix} ${desc}`, outcomeId: lo.id } });
    }
  }
  console.log(`✅ [${code}] ${name} cargada.`);
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});