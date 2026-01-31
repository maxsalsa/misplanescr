const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// RUTA OBJETIVO
const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

// --- 🧠 MOTOR DE REDACCIÓN PEDAGÓGICA (The Writer) ---
// Esta función genera texto pedagógico "humano" basado en el contexto del archivo.

function redactarPlan(materia, nivel, archivo) {
  const m = materia.toLowerCase();
  const esTecnico = m.includes("ciber") || m.includes("web") || m.includes("turismo") || m.includes("conta") || m.includes("secret") || m.includes("banca") || m.includes("logist") || m.includes("ejecut") || m.includes("hard") || m.includes("soft") || m.includes("redes") || m.includes("software");
  const esCiencias = m.includes("ciencia") || m.includes("biolo") || m.includes("quimica") || m.includes("fisica");
  
  // 1. ESTRATEGIAS DE MEDIACIÓN (4 MOMENTOS)
  let mediacion = [];
  if (esTecnico) {
    mediacion = [
        { moment: "1. CONEXIÓN", activity: "Presentación de un caso empresarial real o video técnico de la industria.", dua: "Captar interés (7.1)" },
        { moment: "2. COLABORACIÓN", activity: "Formación de 'Células de Trabajo' para analizar la normativa técnica vigente.", dua: "Comunidad y apoyo (8.3)" },
        { moment: "3. CONSTRUCCIÓN", activity: "Taller Práctico: Ejecución de procedimientos técnicos con uso de equipo real o simulado.", evidence: "Lista de Cotejo / Producto Terminado", dua: "Acción física (4.1)" },
        { moment: "4. CLARIFICACIÓN", activity: "Control de Calidad: Revisión cruzada de resultados contra estándares de la industria.", technique: "Feedback Formativo" }
    ];
  } else if (esCiencias) {
    mediacion = [
        { moment: "1. FOCALIZACIÓN", activity: "Pregunta Generadora: ¿Cómo afecta este fenómeno a mi comunidad?", dua: "Relevancia (7.2)" },
        { moment: "2. EXPLORACIÓN", activity: "Gira de campo o laboratorio de indagación para recolección de datos.", dua: "Percepción (1.2)" },
        { moment: "3. CONTRASTACIÓN", activity: "Triangulación de datos obtenidos con la teoría científica.", dua: "Comprensión (3.3)" },
        { moment: "4. APLICACIÓN", activity: "Resolución de problema socio-científico local.", evidence: "Reporte Científico", dua: "Funciones Ejecutivas (6.3)" }
    ];
  } else {
    // ACADÉMICO GENERAL
    mediacion = [
        { moment: "1. ENGANCHE", activity: "Lluvia de ideas y activación de conocimientos previos.", dua: "Conocimientos previos (3.1)" },
        { moment: "2. TRABAJO GRUPAL", activity: "Lectura colaborativa y análisis de textos.", dua: "Decodificación (2.2)" },
        { moment: "3. PRÁCTICA", activity: "Resolución de ejercicios prácticos y estudios de caso.", evidence: "Portafolio", dua: "Práctica graduada (5.3)" },
        { moment: "4. CIERRE", activity: "Plenaria de conclusiones y metacognición.", technique: "Auto-reflexión (9.3)" }
    ];
  }

  // 2. COMPONENTES DE EVALUACIÓN (RUBRICAS Y TAREAS)
  const evaluacion = {
    cotidiano: {
        title: "Trabajo Cotidiano (En Clase)",
        percent: "20%",
        rubric: [
            { indicator: "Dominio conceptual", levels: { high: "Domina conceptos y los aplica.", medium: "Domina conceptos básicos.", low: "Confunde términos." } },
            { indicator: "Procedimiento técnico", levels: { high: "Ejecuta sin errores y con seguridad.", medium: "Ejecuta con errores menores.", low: "Requiere asistencia constante." } }
        ]
    },
    tareas: {
        title: "Tarea #1: Investigación Extraclase",
        percent: "10%",
        description: esTecnico ? "Investigar la normativa ISO/NIIF aplicable al tema y traer ejemplos." : "Realizar un mapa mental de la lectura asignada.",
        checklist: ["Portada Formal", "Bibliografía APA", "Contenido Completo"]
    },
    proyecto: {
        title: "Proyecto Semestral",
        percent: "30%",
        phases: ["Avance 1: Anteproyecto", "Avance 2: Desarrollo", "Entrega Final y Defensa"]
    }
  };

  return { mediacion, evaluacion };
}

// --- 🕷️ CRAWLER RECURSIVO (EL EXPLORADOR) ---
async function escanearDirectorio(dir, adminId) {
  if (!fs.existsSync(dir)) {
      console.log(`❌ ALERTA: No se encontró la ruta ${dir}`);
      return;
  }
  
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // 📂 SI ES CARPETA, PROFUNDIZAR (RECURSIVIDAD)
      // Asumimos que el nombre de la carpeta aporta contexto (ej: "Modalidad Técnica")
      await escanearDirectorio(fullPath, adminId);
    } 
    else if (item.toLowerCase().endsWith(".pdf")) {
      // 📄 SI ES PDF, PROCESAR
      const subject = path.basename(dir); // La carpeta padre suele ser la materia
      const cleanName = item.replace(".pdf", "").replace(/_/g, " ");
      
      // Detectar Nivel
      let level = "General";
      if (cleanName.match(/10|décimo|decimo/i)) level = "10mo";
      else if (cleanName.match(/11|undécimo|undecimo/i)) level = "11mo";
      else if (cleanName.match(/12|duodécimo|duodecimo/i)) level = "12mo";
      else if (cleanName.match(/7|sétimo|septimo/i)) level = "7mo";
      else if (cleanName.match(/8|octavo/i)) level = "8vo";
      else if (cleanName.match(/9|noveno/i)) level = "9no";

      console.log(`   ⚡ INYECTANDO: [${subject}] ${cleanName}...`);

      // GENERAR CONTENIDO "GOD TIER"
      const contenido = redactarPlan(subject, level, item);

      // CREAR GRUPO VINCULADO
      const groupName = `${level.replace("mo","").replace("vo","").replace("no","")}-1 ${subject.substring(0,5)}`;
      
      // UPSERT (CREAR O ACTUALIZAR) EL PLAN
      // Buscamos si ya existe por Título para no duplicar a lo loco
      const tituloOficial = `MEP 2026: ${subject} - ${cleanName}`;
      
      const existingPlan = await prisma.lessonPlan.findFirst({ where: { title: tituloOficial } });

      if (!existingPlan) {
          await prisma.lessonPlan.create({
            data: {
              title: tituloOficial,
              subject: subject,
              level: level,
              status: "PUBLISHED",
              userId: adminId,
              content: {
                administrative: { 
                    period: "Curso Lectivo 2026", 
                    origin_file: fullPath,
                    modality: "Presencial / Híbrida" 
                },
                curriculum: { 
                    unit: cleanName, 
                    outcome: "Competencia oficial del programa de estudio." 
                },
                mediation: contenido.mediacion,
                evaluation_system: {
                    daily_work: contenido.evaluacion.cotidiano,
                    homework: contenido.evaluacion.tareas,
                    project: contenido.evaluacion.proyecto
                }
              }
            }
          });
      }
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta usuario GOD_TIER."); return; }

  console.log("🚀 INICIANDO ESCANEO PROFUNDO DE: " + BASE_PATH);
  
  // EJECUTAR EL CRAWLER
  await escanearDirectorio(BASE_PATH, admin.id);

  console.log("\n✅ GÉNESIS COMPLETADO.");
  console.log("   -> Se han creado Planes, Tareas, Proyectos y Rúbricas.");
  console.log("   -> La base de datos ahora contiene la estructura completa de su disco duro.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());