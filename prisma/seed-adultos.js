const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("   🎓 Iniciando carga de Oferta Modular (CINDEA/IPEC)...");

  // ESTRUCTURA ESPECÍFICA DE ADULTOS
  // Nota: Los agrupamos bajo "ACADEMICA" en el menú, pero con nombres de nivel claros.
  
  const oferta = [
    {
      nivel: "CINDEA - Nivel I (Primaria)",
      materias: [
        { s: "Alfabetización", u: "Lectura Inicial", t: "Reconocimiento de fonemas y grafemas básicos." },
        { s: "Cálculo Matemático I", u: "Operaciones Básicas", t: "Suma y resta en contextos cotidianos." },
        { s: "Ciencias Naturales I", u: "Salud Integral", t: "Hábitos de vida saludable y prevención." }
      ]
    },
    {
      nivel: "CINDEA - Nivel II (Tercer Ciclo)",
      materias: [
        // Módulos típicos de CINDEA
        { s: "Español", u: "Módulo 42: Comunicación y Vida", t: "Análisis de textos no literarios y prensa." },
        { s: "Matemáticas", u: "Módulo 22: Geometría en el Entorno", t: "Cálculo de áreas y perímetros en situaciones reales." },
        { s: "Ciencias", u: "Módulo 54: La Materia y Energía", t: "Propiedades físicas y químicas en la industria." },
        { s: "Estudios Sociales", u: "Módulo 31: Historia de Costa Rica", t: "Procesos de independencia y formación del Estado." },
        { s: "Inglés", u: "Module 1: Interactions", t: "Basic personal information and daily routines." }
      ]
    },
    {
      nivel: "CINDEA - Nivel III (Diversificada)",
      materias: [
        { s: "Español", u: "Módulo 61: Literatura Costarricense", t: "Análisis de la novela y poesía contemporánea." },
        { s: "Matemáticas", u: "Módulo 72: Funciones y Estadística", t: "Interpretación de gráficas y probabilidad." },
        { s: "Biología", u: "Módulo 81: Genética y Herencia", t: "Leyes de Mendel y biotecnología." },
        { s: "Cívica", u: "Módulo 12: Democracia y Participación", t: "Mecanismos electorales y gobierno estudiantil." },
        { s: "Inglés", u: "Module 5: Work Environment", t: "Job interviews, resume writing, and workplace safety." }
      ]
    }
  ];

  const curriculum = [];

  oferta.forEach(bloque => {
    bloque.materias.forEach(mat => {
        curriculum.push({
            m: "ADULTOS", // Etiqueta interna
            l: bloque.nivel,
            s: mat.s,
            u: mat.u,
            t: mat.t
        });
    });
  });

  console.log(`   ⚡ Agregando ${curriculum.length} Módulos de Adultos...`);

  await prisma.syllabus.createMany({
    data: curriculum.map(i => ({
        modalidad: "ACADEMICA", // Visible en menú Académico
        level: i.l,
        subject: i.s,
        unit: i.u,
        topic: i.t,
        period: "Semestral" // CINDEA suele ser semestral
    }))
  });

  console.log("   ✅ CINDEA/IPEC INTEGRADOS.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());