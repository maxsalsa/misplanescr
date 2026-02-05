const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. ÁREAS QUE NECESITAN REFUERZO MASIVO (PREESCOLAR Y PRIMARIA)
const EARLY_EDUCATION = [
  { area: "Ciclo Materno Infantil", levels: ["Interactivo II"], topics: ["Autonomía Personal", "Motora Fina", "Socialización"] },
  { area: "Ciclo Transición", levels: ["Transición"], topics: ["Pre-Lectura", "Conciencia Fonológica", "Pensamiento Lógico"] },
  { area: "Primaria Básica", levels: ["1er Grado", "2do Grado", "3er Grado"], topics: ["Lectura Inicial", "Suma y Resta", "Comunidad"] },
  { area: "Primaria Superior", levels: ["4to Grado", "5to Grado", "6to Grado"], topics: ["Redacción", "Geometría", "Historia de CR"] }
];

// 2. MATERIAS COMPLEMENTARIAS "OLVIDADAS"
const COMPLEMENTARY = [
  "Educación Religiosa", "Artes Plásticas", "Educación Musical", "Educación Física", 
  "Informática Educativa", "Afectividad y Sexualidad", "Hogar", "Artes Industriales"
];

// 3. GENERADOR DE EXPERIENCIAS (ENFOQUE MEP: GUÍAS DE TRABAJO AUTÓNOMO)
function generateHorizonContent(area, level, topic) {
  return {
    status: "success",
    meta: { mode: "HORIZON_TOTAL", focus: "Integral" },
    administrative: {
      institucion: "MEP",
      ciclo: area.includes("Primaria") ? "I y II Ciclo" : "Preescolar",
      asignatura: area,
      nivel: level,
      eje: "Vivencia de los Derechos Humanos"
    },
    planning_module: {
      learning_outcome: `Desarrollo de habilidades en ${topic}`,
      // ESTRUCTURA DE GUÍA DE TRABAJO AUTÓNOMO (GTA - MODELO MEP)
      mediation: [
        { 
            moment: "1. ME PREPARO", 
            activity: "Busco un lugar cómodo, ventilado y con luz para trabajar.", 
            dua_variant: "Pictogramas de orden" 
        },
        { 
            moment: "2. VOY A RECORDAR", 
            activity: `Pregunta generadora: ¿Qué sé sobre ${topic}?`, 
            technique: "Lluvia de Ideas" 
        },
        { 
            moment: "3. PONGO EN PRÁCTICA", 
            activity: `Realizo ejercicios lúdicos sobre ${topic} utilizando material concreto.`, 
            evidence_type: "Trabajo Manual",
            ui_render_hint: area.includes("Infantil") ? "BigText" : "Standard"
        },
        { 
            moment: "4. VALORO LO APRENDIDO", 
            activity: "Marco con X mi nivel de desempeño (Manita arriba / Manita abajo).", 
            technique: "Autoevaluación Gráfica" 
        }
      ],
      evaluation_system: {
        daily_work: { 
            title: "Trabajo Cotidiano", 
            rubric: [
                { indicator: "Sigue instrucciones", levels: { high: "Sí", mid: "A veces", low: "Con ayuda" } }
            ] 
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("🌌 DETONANDO EVENTO HORIZONTE...");
  let count = 0;

  // 1. INYECCIÓN PREESCOLAR Y PRIMARIA (LO MÁS PEDIDO)
  for (const group of EARLY_EDUCATION) {
    for (const lvl of group.levels) {
        for (const topic of group.topics) {
            // Generamos 3 variantes por tema para que haya riqueza
            for (let i = 1; i <= 3; i++) {
                const title = `MEP BASICO: ${group.area} - ${topic} (${lvl}) v${i}`;
                const exists = await prisma.lessonPlan.findFirst({ where: { title } });
                
                if (!exists) {
                    await prisma.lessonPlan.create({
                        data: {
                            title,
                            subject: group.area.includes("Primaria") ? "General (Unidocente)" : "Preescolar",
                            level: lvl,
                            status: "PUBLISHED",
                            userId: admin.id,
                            content: generateHorizonContent(group.area, lvl, topic)
                        }
                    });
                    count++;
                }
            }
        }
    }
  }

  // 2. INYECCIÓN DE COMPLEMENTARIAS EN TODOS LOS NIVELES (1-6)
  const primLevels = ["1er", "2do", "3er", "4to", "5to", "6to"];
  for (const subj of COMPLEMENTARY) {
    for (const lvl of primLevels) {
        const title = `MEP COMPLEMENTARIA: ${subj} - ${lvl} Grado`;
        const exists = await prisma.lessonPlan.findFirst({ where: { title } });
        
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title,
                    subject: subj,
                    level: lvl + " Grado",
                    status: "PUBLISHED",
                    userId: admin.id,
                    content: generateHorizonContent(subj, lvl, "Fundamentos Básicos")
                }
            });
            count++;
            if (count % 20 === 0) process.stdout.write(".");
        }
    }
  }

  console.log(`\n✅ EVENTO HORIZONTE COMPLETADO. ${count} NUEVOS RECURSOS BASE.`);
  console.log("   -> Preescolar (Interactivo/Transición) Cubierto.");
  console.log("   -> Primaria (1-6) Cubierto.");
  console.log("   -> Complementarias (Música, Religión, Física) Cubiertas.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());