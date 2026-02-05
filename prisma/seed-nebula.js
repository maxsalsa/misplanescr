const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 1. LOS "SABORES" DEL MULTIVERSO (ESTILOS DE CLASE)
const VARIANTS = {
  GAMIFIED: {
    suffix: "(Gamificado)",
    icon: "🎮",
    focus: "Competencia y Juego",
    strategies: ["Escape Room Digital", "Trivia Kahoot/Quizizz", "Búsqueda del Tesoro QR", "Sistema de Puntos/Insignias"],
    tool: "Dispositivos Móviles"
  },
  MAKER: {
    suffix: "(Maker/Taller)",
    icon: "🛠️",
    focus: "Construcción Física",
    strategies: ["Creación de Maqueta", "Prototipado con Reciclaje", "Diseño 3D", "Feria de Inventos"],
    tool: "Material Concreto"
  },
  INQUIRY: {
    suffix: "(Científico)",
    icon: "🔬",
    focus: "Indagación y Método Científico",
    strategies: ["Laboratorio Húmedo", "Recolección de Datos de Campo", "Análisis de Muestras", "Validación de Hipótesis"],
    tool: "Instrumental de Lab"
  },
  SOCIAL: {
    suffix: "(Debate/Social)",
    icon: "🗣️",
    focus: "Argumentación y Comunidad",
    strategies: ["Mesa Redonda", "Juicio Simulado", "Entrevistas a la Comunidad", "Campaña de Concientización"],
    tool: "Guion de Entrevista"
  }
};

// 2. MATRIZ DE TEMAS POPULARES (DONDE MÁS BUSCAN LOS PROFES)
const HOT_TOPICS = [
  { s: "Ciencias", l: "8vo", t: "Célula y Tejidos" },
  { s: "Ciencias", l: "9no", t: "Genética Básica" },
  { s: "Estudios Sociales", l: "10mo", t: "Segunda Guerra Mundial" },
  { s: "Estudios Sociales", l: "11mo", t: "Globalización" },
  { s: "Español", l: "7mo", t: "Género Lírico (Poesía)" },
  { s: "Español", l: "10mo", t: "Análisis de Novela" },
  { s: "Matemáticas", l: "9no", t: "Teorema de Pitágoras" },
  { s: "Matemáticas", l: "11mo", t: "Funciones" },
  { s: "Cívica", l: "11mo", t: "Políticas Públicas Inclusivas" },
  { s: "Inglés", l: "10mo", t: "Technology and Innovation" },
  { s: "Afectividad y Sexualidad", l: "10mo", t: "Relaciones Impropias" },
  { s: "Artes Plásticas", l: "8vo", t: "Teoría del Color" }
];

// 3. GENERADOR DE CONTENIDO ADAPTADO AL SABOR
function generateVariantContent(topic, variantKey) {
  const v = VARIANTS[variantKey];
  
  // Selección aleatoria de estrategia dentro del sabor
  const mainActivity = v.strategies[Math.floor(Math.random() * v.strategies.length)];
  
  return {
    status: "success",
    meta: { mode: "NEBULA_VARIANT", style: variantKey, icon: v.icon },
    administrative: {
      eje_transversal: "Ciudadanía Digital y Derechos Humanos",
      enfoque_pedagogico: v.focus
    },
    planning_module: {
      learning_outcome: `Abordaje de ${topic.t} mediante metodología ${v.focus}.`,
      mediation: [
        { moment: "1. CONEXIÓN", activity: `Enganche: ${variantKey === 'GAMIFIED' ? 'Reto Flash' : 'Pregunta Detonante'} sobre ${topic.t}.`, dua_variant: "Visual" },
        { moment: "2. COLABORACIÓN", activity: "Organización de equipos y roles.", technique: "Trabajo Cooperativo" },
        { moment: "3. CONSTRUCCIÓN", activity: `Actividad Central: ${mainActivity} aplicado a ${topic.t}.`, evidence_type: v.focus, ui_render_hint: variantKey === 'GAMIFIED' ? 'GamificationCard' : 'Checklist' },
        { moment: "4. CLARIFICACIÓN", activity: "Socialización de resultados y feedback.", technique: "Rúbrica 360" }
      ],
      // BUFFET DE EVALUACIÓN ESPECÍFICO
      evaluation_system: {
        short_task: { 
            title: `Tarea ${v.suffix}`, 
            description: `Ejecución breve usando ${v.tool}.`, 
            value: "5%" 
        },
        rubric: {
            title: "Instrumento de Evaluación",
            criteria: [
                { indicator: "Creatividad en la solución", levels: { high: "3", mid: "2", low: "1" } },
                { indicator: `Dominio de ${topic.t}`, levels: { high: "3", mid: "2", low: "1" } }
            ]
        }
      }
    }
  };
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ Falta Admin"); return; }

  console.log("🌌 DETONANDO NEBULA: GENERANDO VERSIONES ALTERNATIVAS...");

  let count = 0;

  for (const item of HOT_TOPICS) {
    // PARA CADA TEMA, GENERAMOS LAS 4 VARIANTES
    const styles = ["GAMIFIED", "MAKER", "INQUIRY", "SOCIAL"];
    
    for (const style of styles) {
        // Filtrar lógica: No hacemos "Laboratorio" de Poesía, hacemos "Social/Maker"
        if (item.s === "Español" && style === "INQUIRY") continue; 
        if (item.s === "Matemáticas" && style === "SOCIAL") continue; 

        const variantName = VARIANTS[style].suffix;
        const title = `MEP NEBULA: ${item.s} - ${item.t} ${variantName}`;
        
        const exists = await prisma.lessonPlan.findFirst({ where: { title } });
        
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title,
                    subject: item.s,
                    level: item.l,
                    status: "PUBLISHED",
                    userId: admin.id,
                    content: generateVariantContent(item, style)
                }
            });
            console.log(`   ✨ Variante Creada: ${item.t} -> ${style}`);
            count++;
        }
    }
  }
  
  console.log(`\n✅ NEBULA FINALIZADO. ${count} NUEVAS OPCIONES PEDAGÓGICAS.`);
  console.log("   -> Ahora el docente puede elegir CÓMO enseñar el mismo tema.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());