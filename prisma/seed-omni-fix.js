const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Inyectando Módulos Reales (CINDEA/IPEC/CTP)...");

  // --- 1. ADULTOS (CINDEA / IPEC) ---
  // En CINDEA, las "Materias" son Áreas. Los contenidos son Módulos.
  
  // ÁREA: CIENCIAS (II NIVEL)
  await createSubjectTree(
    "Área de Ciencias Naturales", "ADULTOS", "CINDEA", "CN-ADUL",
    [
      { grade: "II Nivel", title: "Módulo 54: La Tierra en el Universo", outcomes: ["Describir la estructura del sistema solar.", "Analizar movimientos terrestres."] },
      { grade: "II Nivel", title: "Módulo 55: Materia y Energía", outcomes: ["Clasificar formas de energía.", "Aplicar leyes de conservación."] }
    ]
  );

  // ÁREA: MATEMÁTICAS (III NIVEL - BACHILLERATO)
  await createSubjectTree(
    "Área de Matemáticas", "ADULTOS", "IPEC", "MAT-IPEC",
    [
      { grade: "III Nivel", title: "Módulo 68: Funciones y Estadística", outcomes: ["Analizar modelos matemáticos.", "Interpretar gráficos estadísticos."] }
    ]
  );

  // --- 2. SECUNDARIA TÉCNICA (CTP) ---
  // Ejemplo: Especialidad Desarrollo de Software
  await createSubjectTree(
    "Tecnologías de Información (Especialidad)", "SECUNDARIA", "TECNICA", "CTP-SOFT",
    [
      { grade: "10°", title: "Lógica de Programación", outcomes: ["Desarrollar algoritmos en pseudocódigo.", "Aplicar estructuras de control."] },
      { grade: "11°", title: "Programación Orientada a Objetos", outcomes: ["Diseñar clases y objetos.", "Implementar herencia y polimorfismo."] }
    ]
  );

  // --- 3. LICEOS RURALES ---
  await createSubjectTree(
    "Talleres de Desarrollo", "SECUNDARIA", "RURAL", "RUR-TALL",
    [
      { grade: "7°", title: "Taller de Identidad Local", outcomes: ["Investigar historia de la comunidad.", "Valorar patrimonio cultural."] }
    ]
  );
  
  // --- 4. PREESCOLAR (CORREGIDO) ---
  await createSubjectTree(
    "Ciclo Materno Infantil", "PREESCOLAR", "ACADEMICA", "PRE-MAT",
    [
      { grade: "Materno", title: "Dimensión Corporal Cinética", outcomes: ["Desarrollar motricidad fina.", "Coordinar movimientos corporales."] }
    ]
  );

  console.log("🏁 ACTUALIZACIÓN DE MODALIDADES COMPLETADA.");
}

async function createSubjectTree(name, level, modality, code, units) {
  const sub = await prisma.subject.upsert({
    where: { name_educationLevel_modalityType: { name, educationLevel: level, modalityType: modality } },
    update: {},
    create: { name, educationLevel: level, modalityType: modality, code }
  });

  for (const u of units) {
    const unitDB = await prisma.studyUnit.create({
      data: { title: u.title, grade: u.grade, semester: 1, subjectId: sub.id }
    });
    for (const out of u.outcomes) {
      const oDB = await prisma.learningOutcome.create({ data: { description: out, unitId: unitDB.id } });
      await prisma.indicator.create({ data: { description: `Indicador: ${out} (Sugerido)`, outcomeId: oDB.id } });
    }
  }
  console.log(`✅ [${modality}] ${name} cargada.`);
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});