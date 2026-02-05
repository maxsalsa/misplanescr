const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("   🧹 Borrando datos antiguos...");
  await prisma.syllabus.deleteMany({}); 

  console.log("   💉 Inyectando DATOS MAESTROS (Coincidencia Exacta)...");
  
  const datos = [];

  // --- TÉCNICA (DÉCIMO) ---
  // Note: Usamos "Décimo" con tilde, igual que en el menú
  datos.push(
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Tecnologías de Información", t: "RA1: Mantenimiento Preventivo" },
    { m: "TECNICA", l: "Décimo", s: "Desarrollo de Software", u: "Lógica y Algoritmos", t: "RA1: Diagramas de Flujo" },
    { m: "TECNICA", l: "Décimo", s: "Contabilidad y Finanzas", u: "Gestión Contable", t: "RA1: Clasificación de Cuentas" },
    { m: "TECNICA", l: "Décimo", s: "Turismo y Hotelería", u: "Geografía Turística", t: "RA1: Zonas Turísticas CR" },
    { m: "TECNICA", l: "Décimo", s: "Ejecutivo Comercial", u: "Servicio al Cliente", t: "RA1: Etiqueta y Protocolo" },
    { m: "TECNICA", l: "Décimo", s: "Ciberseguridad", u: "Fundamentos de Redes", t: "RA1: Topologías de Red" },
    { m: "TECNICA", l: "Décimo", s: "Agroecología", u: "Suelos", t: "RA1: Tipos de Suelo" }
  );

  // --- TÉCNICA (UNDÉCIMO) ---
  datos.push(
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", u: "Programación Web", t: "RA1: HTML5 y CSS3" },
    { m: "TECNICA", l: "Undécimo", s: "Desarrollo de Software", u: "Bases de Datos", t: "RA1: Modelo Entidad Relación" },
    { m: "TECNICA", l: "Undécimo", s: "Contabilidad y Finanzas", u: "Costos", t: "RA1: Materia Prima y Mano de Obra" }
  );

  // --- TÉCNICA (DUODÉCIMO) ---
  datos.push(
    { m: "TECNICA", l: "Duodécimo", s: "Desarrollo de Software", u: "Apps Móviles", t: "RA1: Interfaces Híbridas" },
    { m: "TECNICA", l: "Duodécimo", s: "Ciberseguridad", u: "Hacking Ético", t: "RA1: Pentesting" }
  );

  // --- ACADÉMICA (TODOS LOS NIVELES) ---
  const nivelesAcad = ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"];
  const materiasAcad = ["Matemáticas", "Español", "Ciencias", "Estudios Sociales", "Inglés", "Biología", "Química"];

  nivelesAcad.forEach(niv => {
    materiasAcad.forEach(mat => {
        datos.push({
            m: "ACADEMICA", l: niv, s: mat,
            u: `Unidad 1: Introducción a ${mat}`,
            t: `Aprendizaje Esperado: Conceptos fundamentales de ${mat}`
        });
    });
  });

  // INSERTAR
  await prisma.syllabus.createMany({
    data: datos.map(d => ({
        modalidad: d.m,
        level: d.l,
        subject: d.s,
        unit: d.u,
        topic: d.t,
        period: "I Periodo"
    }))
  });

  const total = await prisma.syllabus.count();
  console.log(`   ✅ ÉXITO: Se insertaron ${total} registros curriculares.`);
  console.log("      (Ahora SÍ hay datos en la base de datos)");
}

main()
  .catch(e => {
    console.error("❌ ERROR CRÍTICO EN SEED:", e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());