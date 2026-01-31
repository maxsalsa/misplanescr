const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Protocolo V1700: Carga Humanística y Lingüística...");

  // ==========================================
  // 🧭 ORIENTACIÓN Y PSICOLOGÍA
  // ==========================================
  
  // ORIENTACIÓN (7° a 11°)
  await injectSubject("Orientación", "ORI-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Módulo: Adaptación al Cambio", outcome: "Reconocer cambios físicos y emocionales en la adolescencia." },
    { grade: "9°", title: "Módulo: Elección Vocacional", outcome: "Explorar intereses y habilidades para la elección de carrera/especialidad." },
    { grade: "11°", title: "Módulo: Proyecto de Vida", outcome: "Diseñar plan de metas a corto y mediano plazo." }
  ]);

  // PSICOLOGÍA (10° y 11° - Diversificada)
  await injectSubject("Psicología", "PSI-DIV", "SECUNDARIA", "ACADEMICA", [
    { grade: "10°", title: "Fundamentos de la Psicología", outcome: "Diferenciar procesos cognitivos básicos y superiores." },
    { grade: "11°", title: "Salud Mental y Sociedad", outcome: "Analizar el impacto del estrés y estrategias de afrontamiento." }
  ]);

  // AFECTIVIDAD Y SEXUALIDAD (Integral)
  await injectSubject("Afectividad y Sexualidad", "SEX-INT", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Relaciones Interpersonales", outcome: "Establecer vínculos basados en el respeto y la equidad." },
    { grade: "10°", title: "Derechos Sexuales y Reproductivos", outcome: "Analizar el marco legal de protección y responsabilidad." }
  ]);

  // ==========================================
  // 🇫🇷 IDIOMAS ADICIONALES
  // ==========================================

  // FRANCÉS (Tercer Ciclo y Diversificada)
  await injectSubject("Francés", "FRA-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Unité 1: Salutations et Présentations", outcome: "Saluer et prendre congé en contexte formel et informel." },
    { grade: "9°", title: "Unité 1: Ma ville et mon quartier", outcome: "Décrire son environnement immédiat." },
    { grade: "11°", title: "Unité 1: Projets d'avenir", outcome: "Exprimer des souhaits et des intentions professionnelles." }
  ]);

  // ==========================================
  // 🛠️ TECNOLOGÍAS (TERCER CICLO ACADÉMICO)
  // ==========================================
  // En colegios académicos, ven Artes Industriales o Educación para el Hogar en 7-9

  await injectSubject("Artes Industriales", "ART-IND", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "Seguridad y Materiales", outcome: "Aplicar normas de salud ocupacional en el taller." },
    { grade: "9°", title: "Proyectos en Madera/Metal", outcome: "Construir objetos utilitarios simples." }
  ]);

  await injectSubject("Educación para el Hogar", "EDU-HOG", "SECUNDARIA", "ACADEMICA", [
    { grade: "8°", title: "Nutrición y Salud", outcome: "Elaborar menús balanceados según guías alimentarias." },
    { grade: "9°", title: "Consumo Inteligente", outcome: "Analizar etiquetas y presupuestos familiares." }
  ]);
  
  // ==========================================
  // ✝️ EDUCACIÓN RELIGIOSA
  // ==========================================
  await injectSubject("Educación Religiosa", "REL-SEC", "SECUNDARIA", "ACADEMICA", [
    { grade: "7°", title: "La Persona y su Entorno", outcome: "Valorar la vida como don sagrado." }
  ]);

  console.log("🏁 MALLA COMPLEMENTARIA (ORIENTACIÓN/IDIOMAS) CARGADA.");
}

// HELPER DE INYECCIÓN
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
      data: { title: u.title, grade: u.grade, semester: 1, subjectId: subject.id }
    });
    for (const outcomes of [u.outcome]) { // Array wrapper
      const lo = await prisma.learningOutcome.create({ data: { description: outcomes, unitId: unitDB.id } });
      
      // Lógica de idioma para indicadores
      let desc = `Muestra evidencias de ${outcomes.toLowerCase()}`;
      if (code === "FRA-SEC") desc = `L'étudiant est capable de ${outcomes.toLowerCase()}`;
      
      await prisma.indicator.create({ data: { description: `Indicador: ${desc}`, outcomeId: lo.id } });
    }
  }
  console.log(`✅ [${code}] ${name} cargada.`);
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});