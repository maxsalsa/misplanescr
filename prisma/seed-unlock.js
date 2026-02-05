const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("💉 Iniciando transfusión de datos...");

  // 1. Verificar si ya existen
  const count = await prisma.syllabus.count();
  if (count > 0) {
     console.log(`   ¡OJO! Ya hay ${count} registros. Borrando para evitar duplicados corruptos...`);
     await prisma.syllabus.deleteMany({});
  }

  // 2. Insertar Datos PERFECTOS para la Demo
  const data = [
    // TÉCNICA - DÉCIMO (LO QUE USTED ESTÁ INTENTANDO BUSCAR)
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Tecnologías de Información", t: "RA1: Mantenimiento de Hardware." },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Lógica y Algoritmos", t: "RA1: Diagramas de Flujo." },
    { m: "TECNICA", l: "Décimo", s: "Contabilidad", u: "Fundamentos Contables", t: "RA1: Activos y Pasivos." },
    { m: "TECNICA", l: "Décimo", s: "Turismo", u: "Geografía", t: "RA1: Zonas Turísticas." },
    { m: "TECNICA", l: "Décimo", s: "Ejecutivo Comercial", u: "Servicio al Cliente", t: "RA1: Protocolo Telefónico." },

    // ACADÉMICA (PARA PROBAR EL OTRO BOTÓN)
    { m: "ACADEMICA", l: "Décimo", s: "Matemáticas", u: "Geometría", t: "AE1: Circunferencia." },
    { m: "ACADEMICA", l: "Décimo", s: "Español", u: "Literatura", t: "AE1: Novela Costarricense." }
  ];

  await prisma.syllabus.createMany({
    data: data.map(d => ({
        modalidad: d.m,
        level: d.l, // Debe coincidir EXACTO con el Select del Frontend ("Décimo")
        subject: d.s,
        unit: d.u,
        topic: d.t,
        period: "I Periodo"
    }))
  });

  console.log("✅ DATOS INYECTADOS: Ahora Décimo tiene Software, Conta y Turismo.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());