const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando Protocolo de Rescate Académico...");

  // ==========================================
  // 1. PRIMARIA (I Y II CICLOS | 1° a 6°)
  // ==========================================
  const primariaSubjects = [
    { name: "Matemáticas", code: "MAT-PRI" },
    { name: "Español", code: "ESP-PRI" },
    { name: "Ciencias", code: "CIE-PRI" },
    { name: "Estudios Sociales", code: "SOC-PRI" },
    { name: "Inglés", code: "ING-PRI" }
  ];

  for (const sub of primariaSubjects) {
    await injectSubject(sub.name, sub.code, "PRIMARIA", "ACADEMICA", [
      { grade: "1°", title: "Unidad 1: Mi entorno", outcome: "Identificar elementos del entorno." },
      { grade: "2°", title: "Unidad 1: Convivencia", outcome: "Reconocer normas de clase." },
      { grade: "3°", title: "Unidad 1: El Cantón", outcome: "Describir historia local." },
      { grade: "4°", title: "Unidad 1: La Provincia", outcome: "Ubicar geografía provincial." },
      { grade: "5°", title: "Unidad 1: Historia Antigua", outcome: "Analizar pobladores originarios." },
      { grade: "6°", title: "Unidad 1: Costa Rica Contemporánea", outcome: "Explicar el Estado benefactor." }
    ]);
  }

  // ==========================================
  // 2. SECUNDARIA ACADÉMICA (7° a 11°)
  // ==========================================
  // Estas son las materias base que ven TODOS los colegios (Diurnos, Nocturnos y Técnicos)
  
  // ESPAÑOL
  await injectSubject("Español", "ESP-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Género Literario: Cuento", outcome: "Analizar cuentos costarricenses." },
    { grade: "10°", title: "Movimientos Literarios", outcome: "Comparar Vanguardismo y Realismo." },
    { grade: "11°", title: "Ensayo y Argumentación", outcome: "Redactar ensayos críticos." }
  ]);

  // ESTUDIOS SOCIALES
  await injectSubject("Estudios Sociales", "SOC-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Geografía Física", outcome: "Describir formas de relieve." },
    { grade: "9°", title: "Historia Medieval", outcome: "Explicar el feudalismo." },
    { grade: "11°", title: "Geopolítica Mundial", outcome: "Analizar conflictos contemporáneos." }
  ]);

  // EDUCACIÓN CÍVICA
  await injectSubject("Educación Cívica", "CIV-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Seguridad Ciudadana", outcome: "Proponer medidas de seguridad vial." },
    { grade: "11°", title: "Políticas Públicas", outcome: "Evaluar políticas inclusivas." }
  ]);

  // MATEMÁTICAS (ACADÉMICA)
  await injectSubject("Matemáticas", "MAT-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Números Enteros", outcome: "Resolver operaciones combinadas." },
    { grade: "9°", title: "Geometría", outcome: "Aplicar Teorema de Pitágoras." },
    { grade: "11°", title: "Funciones Logarítmicas", outcome: "Graficar funciones inversas." }
  ]);

  console.log("🏁 RESCATE COMPLETADO: Primaria y Secundaria Académica restauradas.");
}

// FUNCIÓN INYECTORA SEGURA (No duplica, usa Upsert)
async function injectSubject(name, code, level, modType, units) {
  const subject = await prisma.subject.upsert({
    where: { 
      name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modType } 
    },
    update: {}, // Si existe, no hace nada
    create: { name, code, educationLevel: level, modalityType: modType }
  });

  for (const u of units) {
    // Creamos I Periodo por defecto para tener datos
    const unitDB = await prisma.studyUnit.create({
      data: { title: u.title, grade: u.grade, semester: 1, subjectId: subject.id }
    });
    
    const lo = await prisma.learningOutcome.create({ 
        data: { description: u.outcome, unitId: unitDB.id } 
    });
    
    await prisma.indicator.create({ 
        data: { description: `Indicador: Demuestra dominio de ${u.outcome.toLowerCase()}`, outcomeId: lo.id } 
    });
  }
  console.log(`✅ [${level}] ${name} restaurada.`);
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});