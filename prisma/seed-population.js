const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// BANCO DE NOMBRES TICOS
const NAMES = ["Valentina", "Sebastián", "Sofía", "Santiago", "Camila", "Mateo", "Isabella", "Gabriel", "Mariana", "Alejandro", "Daniela", "Diego", "Valeria", "Samuel"];
const SURNAMES = ["Vargas", "Rodríguez", "Mora", "Rojas", "Jiménez", "González", "Sánchez", "Chaves", "Castillo", "Alvarado", "Quesada", "Gutiérrez"];

function getRandomName() {
  const n = NAMES[Math.floor(Math.random() * NAMES.length)];
  const s1 = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
  const s2 = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
  return `${n} ${s1} ${s2}`;
}

// TIPOS DE ADECUACIÓN
const NEEDS = ["Sin Adecuación", "Sin Adecuación", "Sin Adecuación", "No Significativa (Tiempo)", "No Significativa (Recinto)", "Significativa"];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  // 1. OBTENER PLANES EXISTENTES (Para ponerles nota)
  const plans = await prisma.lessonPlan.findMany({ take: 20 });
  if (plans.length === 0) { console.log("❌ Primero corre el Big Bang para tener planes."); return; }

  // 2. CREAR GRUPOS Y ESTUDIANTES
  const sections = ["7-1", "8-3", "9-2", "10-1 (Técnico)", "11-2 (Científico)", "12-1 (Nocturno)"];
  
  console.log("👥 MATRICULANDO ESTUDIANTES...");

  for (const sectionName of sections) {
    // Crear Grupo
    const group = await prisma.group.create({
      data: {
        name: sectionName,
        grade: sectionName.split("-")[0],
        shift: sectionName.includes("Nocturno") ? "NOCTURNO" : "DIURNO",
        userId: admin.id
      }
    });

    // Crear 20 estudiantes por grupo
    for (let i = 0; i < 20; i++) {
      const student = await prisma.student.create({
        data: {
          name: getRandomName(),
          needs: NEEDS[Math.floor(Math.random() * NEEDS.length)],
          groupId: group.id
        }
      });

      // 3. ASIGNAR CALIFICACIONES (SIMULACIÓN)
      // A cada estudiante le calificamos 3 planes al azar
      for (let j = 0; j < 3; j++) {
        const randomPlan = plans[Math.floor(Math.random() * plans.length)];
        
        // Simular: 30% de probabilidad de que NO esté calificado aún (Pendiente)
        if (Math.random() > 0.3) {
            // Nota aleatoria entre 50 y 100
            const score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            
            await prisma.grade.create({
                data: {
                    score: score,
                    total: 100,
                    feedback: score < 70 ? "Debe mejorar la entrega de evidencias." : "Excelente desempeño.",
                    studentId: student.id,
                    planId: randomPlan.id
                }
            });
        }
      }
    }
    console.log(`   ✅ Sección ${sectionName} creada con 20 estudiantes.`);
  }

  console.log("✅ POBLACIÓN Y NOTAS INYECTADAS.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());