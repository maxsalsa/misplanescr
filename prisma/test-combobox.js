const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🧪 TEST 1: CARGA DE MODALIDADES Y MATERIAS");
  // Simula: Usuario selecciona "SECUNDARIA" -> Combobox carga Materias
  const subjects = await prisma.subject.findMany({
    where: { educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" },
    select: { name: true, code: true }
  });
  
  if (subjects.length > 0) {
      console.log(`✅ Combobox Materias [Secundaria]: ${subjects.length} opciones encontradas.`);
      console.log(`   Ejemplo: ${subjects[0].name} (${subjects[0].code})`);
  } else {
      console.log("❌ FALLO: El Combobox de Materias saldría vacío.");
  }

  console.log("\n🧪 TEST 2: CARGA DE NIVELES Y UNIDADES");
  // Simula: Usuario selecciona "Español" -> Combobox carga Unidades
  const spanish = await prisma.subject.findFirst({ where: { name: "Español" } });
  
  if (spanish) {
      const units = await prisma.studyUnit.findMany({
          where: { subjectId: spanish.id, grade: "7°" } // Probamos 7mo año
      });
      
      if (units.length > 0) {
          console.log(`✅ Combobox Unidades [Español 7°]: ${units.length} opciones encontradas.`);
          console.log(`   Ejemplo: ${units[0].title}`);
      } else {
          console.log("❌ FALLO: El Combobox de Unidades saldría vacío para 7°.");
      }
  } else {
      console.log("⚠️ No se pudo probar Test 2 porque falta la materia Español.");
  }

  console.log("\n🧪 TEST 3: VERIFICACIÓN DE RÚBRICAS (1-3)");
  // Verificamos si las tareas cargadas tienen modelo de rúbrica
  const tasks = await prisma.pedagogicalStrategy.findMany({
      where: { category: "TAREA" },
      take: 1
  });
  
  if (tasks.length > 0 && tasks[0].rubricModel) {
      console.log("✅ Rúbricas Inteligentes: DETECTADAS.");
      console.log(`   Modelo: ${tasks[0].rubricModel}`);
  } else {
      console.log("❌ ALERTA: Las tareas no tienen rúbricas pre-cargadas.");
  }
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());