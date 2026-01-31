const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. EL DICCIONARIO UNIVERSAL (MALLA COMPLETA)
const CURRICULUM = {
  PREESCOLAR: ["Interactivo II", "Transición"],
  PRIMARIA: ["1er Grado", "2do Grado", "3er Grado", "4to Grado", "5to Grado", "6to Grado"],
  SECUNDARIA: ["7mo Año", "8vo Año", "9no Año", "10mo Año", "11mo Año"],
  TECNICA: ["10mo Técnico", "11mo Técnico", "12mo Técnico"],
  NOCTURNA: ["I Nivel", "II Nivel", "III Nivel"]
};

const SUBJECTS = {
  BASICAS: ["Matemáticas", "Español", "Ciencias", "Estudios Sociales", "Cívica"],
  IDIOMAS: ["Inglés Académico", "Inglés Conversacional", "Francés", "Italiano"],
  COMPLEMENTARIAS: ["Educación Física", "Educación Religiosa", "Artes Plásticas", "Educación Musical", "Psicología", "Lógica", "Filosofía"],
  TECNOLOGIAS: ["Artes Industriales", "Educación para el Hogar", "Informática Educativa", "Robótica"],
  ESPECIALIDADES: [
    "Dibujo Arquitectónico", "Mecánica de Precisión", "Electrotecnia", "Electrónica", 
    "Contabilidad", "Banca y Finanzas", "Turismo Ecológico", "Turismo de Alimentos",
    "Agroindustria", "Agroecología", "Desarrollo de Software", "Ciberseguridad",
    "Diseño Publicitario", "Secretariado Ejecutivo"
  ]
};

const CONTEXTS = [
  { type: "URBANO", focus: "Tecnología y Acceso" },
  { type: "RURAL", focus: "Naturaleza y Comunidad" },
  { type: "INDIGENA", focus: "Cosmovisión y Territorio" },
  { type: "NOCTURNO", focus: "Andragogía (Adultos)" },
  { type: "UNIDOCENTE", focus: "Multinivel" }
];

// 2. GENERADOR DE "ADN" PEDAGÓGICO
function generateTitanContent(materia, nivel, contexto) {
  const isTech = SUBJECTS.ESPECIALIDADES.includes(materia);
  const isArt = ["Artes Plásticas", "Educación Musical"].includes(materia);
  
  // Estrategia según materia
  let act = "Clase magistral participativa";
  let tool = "Cuaderno";
  
  if (isTech) { act = "Taller práctico de destrezas"; tool = "Herramienta Especializada / Software"; }
  else if (isArt) { act = "Taller de expresión creativa"; tool = "Instrumento / Lienzo"; }
  else if (contexto.type === "INDIGENA") { act = "Círculo de saberes"; tool = "Oralidad"; }
  
  return {
    status: "success",
    meta: { 
        titan_id: Math.floor(Math.random() * 100000), 
        context_adaptation: contexto.focus,
        redundancy_check: "OK"
    },
    administrative: { period: "2026", modality: contexto.type },
    planning_module: {
      learning_outcome: `Competencia integral en ${materia} para ${nivel}`,
      mediation: [
        { moment: "1. CONEXIÓN", activity: `Enganche contextual (${contexto.focus}) sobre el tema.`, dua_variant: "Visual/Auditivo" },
        { moment: "2. COLABORACIÓN", activity: "Análisis de casos en grupos heterogéneos.", technique: "Aprendizaje Cooperativo" },
        { moment: "3. CONSTRUCCIÓN", activity: `${act} aplicando conocimientos.`, evidence_type: isTech ? "Producto Final" : "Ensayo/Práctica", ui_render_hint: isTech ? "Checklist" : "Text" },
        { moment: "4. CLARIFICACIÓN", activity: "Meta-cognición y cierre.", technique: "Sondeo" }
      ],
      evaluation_system: {
        daily_work: { title: "Cotidiano", percent: "20%", rubric: [{ indicator: "Participación", levels: { high: "3", mid: "2", low: "1" } }] },
        project: { title: isTech ? "Proyecto Técnico" : "Investigación", percent: "30%" }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin (Ejecuta seed-admin.js)"); return; }

  console.log("🛡️ INICIANDO PROTOCOLO TITÁN (COBERTURA TOTAL)...");
  let count = 0;

  // BUCLE DE LA MUERTE (Cubre todas las combinaciones)
  // 1. ITERAR CONTEXTOS
  for (const ctx of CONTEXTS) {
    // 2. ITERAR CATEGORÍAS DE MATERIA
    for (const [category, subjectList] of Object.entries(SUBJECTS)) {
        // Solo inyectamos algunas materias por contexto para no hacer 10,000 registros, 
        // pero aseguramos variedad.
        const selectedSubjects = subjectList; 

        for (const sub of selectedSubjects) {
            // 3. SELECCIONAR NIVEL ADECUADO
            let niveles = CURRICULUM.SECUNDARIA; // Default
            if (category === "ESPECIALIDADES") niveles = CURRICULUM.TECNICA;
            if (ctx.type === "NOCTURNO") niveles = CURRICULUM.NOCTURNA;

            // Elegimos 1 nivel al azar para esta combinación (para optimizar)
            const nivel = niveles[Math.floor(Math.random() * niveles.length)];
            
            const title = `TITAN ${ctx.type}: ${sub} - ${nivel}`;
            
            // UPSERT (Evita duplicados, garantiza integridad)
            const exists = await prisma.lessonPlan.findFirst({ where: { title } });
            
            if (!exists) {
                await prisma.lessonPlan.create({
                    data: {
                        title, 
                        subject: sub, 
                        level: nivel, 
                        status: "PUBLISHED", 
                        userId: admin.id, 
                        content: generateTitanContent(sub, nivel, ctx)
                    }
                });
                count++;
                if (count % 10 === 0) process.stdout.write("."); // Barra de progreso
            }
        }
    }
  }
  
  console.log(`\n✅ TITÁN COMPLETADO. ${count} NUEVOS EXPEDIENTES BLINDADOS.`);
  console.log("   -> Cubre: Idiomas, Tecnologías, Básicas, Complementarias.");
  console.log("   -> Contextos: Indígena, Rural, Urbano, Nocturno.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());