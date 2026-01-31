const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("📚 Inyectando Programas de Estudio MEP...");

  // LISTA DE MATERIAS OFICIALES
  const subjects = [
    { 
      name: "Estudios Sociales", code: "SOC", icon: "🌍",
      units: [
        { title: "La Geografía y el ser humano", level: "7°" },
        { title: "Historia Antigua y Medieval", level: "7°" },
        { title: "Geografía de Costa Rica", level: "8°" },
        { title: "Cambio Climático y Gestión del Riesgo", level: "9°" }
      ]
    },
    { 
      name: "Ciencias", code: "CIE", icon: "🧬",
      units: [
        { title: "La Célula y la Vida", level: "7°" },
        { title: "Materia y Energía", level: "8°" },
        { title: "Física y Química Básica", level: "9°" }
      ]
    },
    { 
      name: "Matemáticas", code: "MAT", icon: "📐",
      units: [
        { title: "Números Enteros y Racionales", level: "7°" },
        { title: "Geometría Euclídea", level: "8°" },
        { title: "Funciones y Álgebra", level: "10°" }
      ]
    },
    { 
      name: "Educación Cívica", code: "CIV", icon: "🇨🇷",
      units: [
        { title: "Seguridad Ciudadana", level: "7°" },
        { title: "Identidad Nacional", level: "8°" },
        { title: "Derechos Humanos", level: "9°" }
      ]
    }
  ];

  for (const sub of subjects) {
    // Crear materia
    const createdSubject = await prisma.subject.upsert({
      where: { name: sub.name },
      update: {},
      create: {
        name: sub.name,
        code: sub.code,
        icon: sub.icon
      }
    });

    // Crear unidades
    for (const unit of sub.units) {
      await prisma.studyUnit.create({
        data: {
          title: unit.title,
          level: unit.level,
          subjectId: createdSubject.id
        }
      });
    }
    console.log(`✅ Materia instalada: ${sub.name} con ${sub.units.length} unidades.`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });