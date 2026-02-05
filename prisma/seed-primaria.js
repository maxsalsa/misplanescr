const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("   🌱 Iniciando siembra de I y II Ciclos...");

  const nivelesPrimaria = [
    "Primero", "Segundo", "Tercero", // I Ciclo
    "Cuarto", "Quinto", "Sexto"      // II Ciclo
  ];

  const materiasBase = [
    "Matemáticas", 
    "Español", 
    "Ciencias", 
    "Estudios Sociales", 
    "Inglés", 
    "Educación Religiosa",
    "Artes Plásticas",
    "Educación Musical",
    "Educación Física"
  ];

  // Temarios simplificados por materia (Ejemplos representativos)
  const temarios = {
    "Matemáticas": [
        { u: "Números", t: "Números naturales y sus operaciones básicas." },
        { u: "Geometría", t: "Figuras geométricas planas y cuerpos sólidos." },
        { u: "Medidas", t: "Medidas de longitud, peso y capacidad (Sistema Internacional)." }
    ],
    "Español": [
        { u: "Lectoescritura", t: "Comprensión de lectura y producción textual." },
        { u: "Expresión Oral", t: "Escucha atenta y expresión de ideas claras." },
        { u: "Gramática", t: "Uso correcto de mayúsculas, signos de puntuación y ortografía." }
    ],
    "Ciencias": [
        { u: "Cuerpo Humano", t: "Hábitos de higiene y sistemas del cuerpo." },
        { u: "Seres Vivos", t: "Clasificación de animales y plantas del entorno." },
        { u: "Energía y Materia", t: "Estados de la materia y formas de energía." }
    ],
    "Estudios Sociales": [
        { u: "Mi Cantón", t: "Historia y geografía del cantón y la provincia." },
        { u: "Costa Rica", t: "Relieve, clima y regiones socioeconómicas de Costa Rica." },
        { u: "Historia Patria", t: "Símbolos nacionales y efemérides importantes." }
    ],
    "Inglés": [
        { u: "Unit 1: Me and My Friends", t: "Greetings, introductions, and personal information." },
        { u: "Unit 2: My School", t: "School supplies, classroom objects, and instructions." },
        { u: "Unit 3: My Family", t: "Family members and descriptions." }
    ]
  };

  const curriculum = [];

  nivelesPrimaria.forEach(niv => {
    materiasBase.forEach(mat => {
        // Buscamos si tenemos temario específico, si no, uno genérico
        const temas = temarios[mat] || [
            { u: "Unidad General", t: `Contenidos fundamentales de ${mat} para ${niv}.` }
        ];

        temas.forEach(tema => {
            curriculum.push({
                m: "PRIMARIA", // Nueva modalidad para filtrar fácil
                l: niv,
                s: mat,
                u: tema.u,
                t: tema.t
            });
        });
    });
  });

  console.log(`   ⚡ Agregando ${curriculum.length} registros de Primaria...`);

  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: "ACADEMICA", // En el sistema lo ponemos bajo Académica para simplificar menú
        level: i.l,
        subject: i.s,
        unit: i.u,
        topic: i.t,
        period: "I Periodo"
    }))
  });

  console.log("   ✅ PRIMARIA INSTALADA (1º a 6º Grado).");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());