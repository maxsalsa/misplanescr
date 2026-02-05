const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. BANCO DE ASIGNATURAS DE NICHO (LO QUE FALTABA)
const NICHE_SUBJECTS = [
  // TÉCNICAS RARAS
  { area: "Náutica", levels: ["10mo", "11mo"], topics: ["Nudos Marineros", "Navegación Costera", "Mantenimiento de Motores Fuera de Borda"] },
  { area: "Joyería", levels: ["10mo", "11mo"], topics: ["Fundición de Plata", "Engaste de Piedras", "Pulido de Metales"] },
  { area: "Plásticos", levels: ["11mo", "12mo"], topics: ["Inyección de Polímeros", "Extrusión", "Reciclaje Industrial"] },
  { area: "Textiles", levels: ["10mo"], topics: ["Patronaje Industrial", "Manejo de Overlock", "Fibras Naturales vs Sintéticas"] },
  
  // ARTÍSTICAS ESPECÍFICAS
  { area: "Danza", levels: ["7mo", "8vo", "9no"], topics: ["Expresión Corporal", "Folclore Guanacasteco", "Danza Contemporánea"] },
  { area: "Teatro", levels: ["10mo", "11mo"], topics: ["Improvisación", "Dramaturgia", "Montaje Escénico"] },
  
  // ÁREAS DE VIDA Y SALUD
  { area: "Orientación", levels: ["7mo", "9no", "11mo"], topics: ["Elección Vocacional", "Manejo del Estrés", "Prevención de Drogas"] },
  { area: "Afectividad y Sexualidad", levels: ["8vo", "10mo"], topics: ["Derechos Reproductivos", "Relaciones Sanas", "Consentimiento"] }
];

// 2. MOTOR DE REDACCIÓN DE INDICADORES (VERBO + OBJETO + CONDICIÓN)
const VERBS = {
  COGNITIVE: ["Analizar", "Clasificar", "Comparar", "Inferir", "Argumentar"],
  PSYCHOMOTOR: ["Ejecutar", "Ensamblar", "Calibrar", "Digitar", "Manipular"],
  AFFECTIVE: ["Valorar", "Internalizar", "Respetar", "Demostrar", "Cooperar"]
};

function generateIndicators(topic, type) {
  const verbs = type === "TECHNICAL" ? VERBS.PSYCHOMOTOR : VERBS.COGNITIVE;
  return [
    `${verbs[0]} los principios básicos de ${topic} según la normativa vigente.`,
    `${verbs[1]} los componentes relacionados con ${topic} con precisión y seguridad.`,
    `${verbs[2]} soluciones a problemas comunes en ${topic} mediante el trabajo colaborativo.`
  ];
}

// 3. MOTOR DE ADECUACIONES ESPECÍFICAS (NO GENÉRICAS)
function generateSpecificSupports(area) {
  if (area === "Joyería" || area === "Plásticos" || area === "Textiles") {
    return [
      "Adaptación de empuñadura en herramientas.",
      "Uso de guantes con texturas guía.",
      "Etiquetado braille en maquinaria."
    ];
  } else if (area === "Orientación" || area === "Afectividad") {
    return [
      "Uso de pictogramas para expresar emociones.",
      "Roleplay con guiones pre-establecidos.",
      "Ambiente sensorialmente controlado."
    ];
  } else {
    return ["Lectura fácil", "Tiempo extendido", "Ubicación preferencial"];
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  console.log("⚛️ DETONANDO SINGULARIDAD (NICHO + INDICADORES)...");

  for (const subject of NICHE_SUBJECTS) {
    for (const level of subject.levels) {
      for (const topic of subject.topics) {
        
        const title = `MEP SINGULARITY: ${subject.area} - ${topic} (${level})`;
        const indicators = generateIndicators(topic, subject.area.match(/Joyería|Náutica|Plásticos|Textiles/) ? "TECHNICAL" : "ACADEMIC");
        const supports = generateSpecificSupports(subject.area);
        
        // ESTRUCTURA MASIVA
        const payload = {
          status: "success",
          meta: { mode: "SINGULARITY_DETAIL", niche: true },
          administrative: {
            asignatura: subject.area,
            nivel: level,
            unidad: topic,
            eje_transversal: "Cultura de Calidad"
          },
          planning_module: {
            learning_outcome: `Competencia Específica: Dominio de ${topic}`,
            // INYECTAMOS VARIANTES DE MEDIACIÓN
            mediation_strategies: [
              { moment: "1. FOCALIZACIÓN", activity: `Estudio de caso real sobre ${topic}.`, dua: supports[0] },
              { moment: "2. EXPLORACIÓN", activity: "Gira de campo o simulación virtual.", dua: "Video con subtítulos" },
              { moment: "3. CONTRASTACIÓN", activity: "Mesa redonda con expertos invitados.", dua: "Intérprete LESCO si requiere" },
              { moment: "4. APLICACIÓN", activity: `Proyecto práctico de ${topic}.`, dua: supports[1] }
            ],
            // INYECTAMOS INDICADORES REALES (LO QUE PIDIÓ)
            evaluation_indicators: indicators.map(ind => ({
                indicator: ind,
                technique: "Observación",
                instrument: "Rúbrica Analítica"
            })),
            // INYECTAMOS INSTRUMENTOS VARIADOS
            evaluation_instruments: {
                rubric: {
                    title: `Rúbrica de ${topic}`,
                    criteria: indicators.map(ind => ({
                        criterion: ind,
                        levels: { "3": "Logrado independientemente", "2": "Logrado con apoyo", "1": "En proceso" }
                    }))
                },
                checklist: {
                    title: "Lista de Cotejo de Seguridad",
                    items: ["Uso de EPP", "Orden en el puesto", "Limpieza final"]
                }
            }
          }
        };

        const exists = await prisma.lessonPlan.findFirst({ where: { title } });
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title,
                    subject: subject.area,
                    level: level,
                    status: "PUBLISHED",
                    userId: admin.id,
                    content: payload
                }
            });
            console.log(`   💎 Nicho Cubierto: ${subject.area} [${topic}] -> Indicadores generados.`);
        }
      }
    }
  }
  
  console.log("✅ SINGULARIDAD COMPLETADA. HUECOS CURRICULARES RELLENADOS.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());