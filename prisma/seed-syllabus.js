const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Limpiando datos curriculares viejos...");
  await prisma.syllabus.deleteMany({}); // Borrón y cuenta nueva en currículo

  console.log("📚 Inyectando Currículo EDUCACIÓN TÉCNICA (Ej: Software)...");
  
  const tecnicaData = [
    // --- DESARROLLO DE SOFTWARE (NIVEL 10) ---
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", unit: "Lógica de Programación", topic: "Algoritmos y Diagramas de Flujo" },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", unit: "Programación Básica", topic: "Estructuras de Control" },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", unit: "Tecnologías de Información", topic: "Sistemas Operativos" },
    
    // --- DESARROLLO DE SOFTWARE (NIVEL 11) ---
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", unit: "Programación Orientada a Objetos", topic: "Clases, Objetos y Herencia" },
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", unit: "Base de Datos I", topic: "Modelo Entidad Relación" },
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", unit: "Desarrollo Web Cliente", topic: "HTML5, CSS3 y JS" },

    // --- DESARROLLO DE SOFTWARE (NIVEL 12) ---
    { m: "TECNICA", l: "Duodécimo", s: "Desarrollo de Software", unit: "Desarrollo Web Servidor", topic: "APIs RESTful y Node.js" },
    { m: "TECNICA", l: "Duodécimo", s: "Desarrollo de Software", unit: "Aplicaciones Móviles", topic: "Desarrollo Híbrido" },
    { m: "TECNICA", l: "Duodécimo", s: "Desarrollo de Software", unit: "Emprendimiento", topic: "Plan de Negocios Tecnológico" },
    
    // --- CONTABILIDAD (Ejemplo breve) ---
    { m: "TECNICA", l: "Décimo", s: "Contabilidad", unit: "Fundamentos Contables", topic: "Ecuación Contable" },
  ];

  const academicaData = [
    // --- MATEMÁTICAS ---
    { m: "ACADEMICA", l: "Sétimo", s: "Matemáticas", unit: "Números", topic: "Números Enteros y sus operaciones" },
    { m: "ACADEMICA", l: "Octavo", s: "Matemáticas", unit: "Geometría", topic: "Triángulos y sus propiedades" },
    { m: "ACADEMICA", l: "Noveno", s: "Matemáticas", unit: "Álgebra", topic: "Factorización y Productos Notables" },
    { m: "ACADEMICA", l: "Décimo", s: "Español", unit: "Literatura", topic: "Análisis de textos literarios costarricenses" },
  ];

  const allData = [...tecnicaData, ...academicaData];

  for (const item of allData) {
    await prisma.syllabus.create({
      data: {
        modalidad: item.m,
        level: item.l,
        subject: item.s, // En técnica esto actúa como la Sub-área o Especialidad
        period: "I Periodo", // Por defecto para la demo
        unit: item.unit,
        topic: item.topic
      }
    });
  }

  console.log("✅ Base de Datos Curricular: ACTUALIZADA (Software, Conta, Académica).");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });