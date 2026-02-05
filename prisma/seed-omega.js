const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpiando escenario...");
  await prisma.syllabus.deleteMany({}); 

  const curriculum = [
    // --- INNOVACIÓN (PARA IMPRESIONAR) ---
    { m: "TECNICA", l: "Duodécimo", s: "Ciberseguridad", unit: "Hacking Ético", topic: "RA1: Ejecución de pruebas de penetración (Pentesting)." },
    { m: "TECNICA", l: "Duodécimo", s: "Inteligencia Artificial", unit: "Machine Learning", topic: "RA1: Entrenamiento de modelos supervisados." },

    // --- DESARROLLO DE SOFTWARE (CORE) ---
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", unit: "Tecnologías de Información", topic: "RA1: Mantenimiento preventivo de hardware." },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", unit: "Lógica y Algoritmos", topic: "RA1: Diagramación de flujo y pseudocódigo." },
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", unit: "Programación Web", topic: "RA1: Desarrollo Frontend con React." },

    // --- ACADÉMICAS (LO CLÁSICO) ---
    { m: "ACADEMICA", l: "Décimo", s: "Matemáticas", unit: "Geometría Analítica", topic: "RA1: Ecuación de la circunferencia." },
    { m: "ACADEMICA", l: "Undécimo", s: "Biología", unit: "Genética", topic: "RA1: Leyes de Mendel y herencia." },
    { m: "ACADEMICA", l: "Sétimo", s: "Estudios Sociales", unit: "Historia Antigua", topic: "RA1: Legado de Grecia y Roma." },

    // --- OTRAS TÉCNICAS ---
    { m: "TECNICA", l: "Undécimo", s: "Contabilidad", unit: "Costos", topic: "RA1: Estado de costos de producción." },
    { m: "TECNICA", l: "Décimo", s: "Turismo", unit: "Ecología", topic: "RA1: Identificación de flora y fauna nacional." }
  ];

  console.log(`⚡ Inyectando ${curriculum.length} temas de alta calidad...`);
  
  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: i.m, level: i.l, subject: i.s, period: "I Periodo", unit: i.unit, topic: i.topic
    }))
  });

  console.log("✅ BASE DE DATOS LISTA PARA DEMOSTRACIÓN.");
}

main().finally(() => prisma.$disconnect());