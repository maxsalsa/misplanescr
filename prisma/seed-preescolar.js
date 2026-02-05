const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("   👶 Iniciando carga de Educación Preescolar...");

  const niveles = ["Materno Infantil", "Transición"];

  // EN PREESCOLAR, LAS "MATERIAS" SON ÁMBITOS DE DESARROLLO
  const ambitos = [
    { 
      nombre: "Socio-Afectiva",
      unidades: [
        { u: "Identidad", t: "Reconocimiento de sí mismo, sus cualidades y emociones." },
        { u: "Convivencia", t: "Relaciones interpersonales, normas y valores en el grupo." },
        { u: "Autonomía", t: "Independencia en hábitos de higiene y actividades diarias." }
      ]
    },
    { 
      nombre: "Psicomotriz",
      unidades: [
        { u: "Esquema Corporal", t: "Control del cuerpo, movimiento y desplazamiento." },
        { u: "Motora Fina", t: "Coordinación viso-manual, rasgado, recorte y trazos." },
        { u: "Ubicación Espacial", t: "Nociones de arriba-abajo, dentro-fuera, cerca-lejos." }
      ]
    },
    { 
      nombre: "Cognoscitiva y Lingüística",
      unidades: [
        { u: "Comunicación Oral", t: "Expresión de ideas, vocabulario y comprensión de cuentos." },
        { u: "Pensamiento Lógico", t: "Seriación, clasificación, conteo y figuras geométricas." },
        { u: "Descubrimiento del Medio", t: "Observación de la naturaleza, plantas y animales." }
      ]
    },
    {
      nombre: "Expresión Artística",
      unidades: [
        { u: "Artes Plásticas", t: "Creatividad mediante pintura, modelado y dibujo." },
        { u: "Música y Movimiento", t: "Ritmo, canciones infantiles y expresión corporal." }
      ]
    }
  ];

  const curriculum = [];

  niveles.forEach(niv => {
    ambitos.forEach(ambito => {
        ambito.unidades.forEach(tema => {
            curriculum.push({
                m: "PREESCOLAR", // Modalidad específica
                l: niv,
                s: ambito.nombre, // Ej: Socio-Afectiva
                u: tema.u,        // Ej: Identidad
                t: tema.t         // Ej: Reconocimiento...
            });
        });
    });
  });

  console.log(`   ⚡ Agregando ${curriculum.length} registros de Preescolar...`);

  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: "ACADEMICA", // Lo ponemos en Académica para que aparezca en el menú general
        level: i.l,
        subject: i.s,
        unit: i.u,
        topic: i.t,
        period: "I Periodo"
    }))
  });

  console.log("   ✅ PREESCOLAR LISTO (Materno y Transición).");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());