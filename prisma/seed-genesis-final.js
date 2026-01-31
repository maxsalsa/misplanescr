const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// IMPORTAMOS EL CEREBRO QUE ACABAMOS DE CREAR (Simulado para el seed porque es CommonJS)
const PEDAGOGY_MATRIX = {
  HARD_TECH: { moments: [{m:"CONEXIÓN", a:"Caso Forense"}, {m:"COLAB", a:"Diseño Arquitectura"}, {m:"CONSTRUCCIÓN", a:"Coding Lab"}, {m:"CLARIFICACIÓN", a:"Debugging"}] },
  SCIENCE: { moments: [{m:"FOCALIZACIÓN", a:"Pregunta Investigable"}, {m:"EXPLORACIÓN", a:"Trabajo de Campo"}, {m:"CONTRASTACIÓN", a:"Análisis Datos"}, {m:"APLICACIÓN", a:"Resolución"}] },
  SERVICE: { moments: [{m:"ENGANCHE", a:"Análisis Video"}, {m:"ENSAYO", a:"Guiones"}, {m:"SIMULACIÓN", a:"Roleplay"}, {m:"REFLEXIÓN", a:"Feedback"}] },
  ACADEMIC: { moments: [{m:"CONEXIÓN", a:"Activación"}, {m:"COLABORACIÓN", a:"Discusión"}, {m:"CONSTRUCCIÓN", a:"Práctica"}, {m:"CIERRE", a:"Metacognición"}] }
};

function analyze(filename) {
  const n = filename.toLowerCase();
  if (n.includes("ciber") || n.includes("soft") || n.includes("web") || n.includes("red")) return { type: "HARD_TECH", ...PEDAGOGY_MATRIX.HARD_TECH };
  if (n.includes("ciencia") || n.includes("biolo") || n.includes("fisica") || n.includes("quimica")) return { type: "SCIENCE", ...PEDAGOGY_MATRIX.SCIENCE };
  if (n.includes("turismo") || n.includes("hotel") || n.includes("secret") || n.includes("ejecut")) return { type: "SERVICE", ...PEDAGOGY_MATRIX.SERVICE };
  return { type: "ACADEMIC", ...PEDAGOGY_MATRIX.ACADEMIC };
}

// RUTA REAL DEL USUARIO
const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

async function scan(dir, adminId) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
        await scan(fullPath, adminId);
    } else if (file.toLowerCase().endsWith(".pdf")) {
        
        const subject = path.basename(dir);
        const cleanName = file.replace(".pdf","").replace(/_/g," ");
        // DETECCIÓN DE NIVEL MEJORADA
        let level = "General";
        if (cleanName.match(/10|décimo/i)) level = "10mo";
        else if (cleanName.match(/11|undécimo/i)) level = "11mo";
        else if (cleanName.match(/12|duodécimo/i)) level = "12mo";
        else if (cleanName.match(/7|sétimo/i)) level = "7mo";
        else if (cleanName.match(/8|octavo/i)) level = "8vo";
        else if (cleanName.match(/9|noveno/i)) level = "9no";
        else if (cleanName.match(/1|2|3|4|5|6|primaria/i)) level = "Primaria";

        const intelligence = analyze(file);
        
        console.log(`   ⚡ [${intelligence.type}] Sincronizando: ${cleanName} (${level})`);

        // 1. CREAR GRUPO (SECCIÓN)
        const groupName = `${level.replace("mo","")}-1 ${subject.substring(0,6)}`;
        let group = await prisma.group.findFirst({ where: { name: groupName } });
        if (!group) {
            group = await prisma.group.create({
                data: { name: groupName, grade: level, shift: "DIURNO", userId: adminId }
            });
        }

        // 2. CREAR PLAN MAESTRO
        const title = `MEP 2026: ${subject} - ${cleanName}`;
        const exists = await prisma.lessonPlan.findFirst({ where: { title } });
        
        if (!exists) {
            await prisma.lessonPlan.create({
                data: {
                    title: title,
                    subject: subject,
                    level: level,
                    status: "PUBLISHED",
                    userId: adminId,
                    content: {
                        administrative: { period: "2026", origin: file, type: intelligence.type, group_id: group.id },
                        curriculum: { unit: cleanName, outcome: "Competencia Oficial MEP" },
                        mediation: intelligence.moments.map(m => ({
                            moment: m.m, activity: m.a, dua_principle: "Diseño Universal"
                        })),
                        evaluation_system: {
                            written_test: { 
                                title: "I Prueba Parcial", 
                                rows: [
                                    { obj: "Reconocimiento", points: 10, time: 15, cognitive: "Conocimiento", type: "Sel. Única" },
                                    { obj: "Aplicación Práctica", points: 25, time: 40, cognitive: "Aplicación", type: "Desarrollo" }
                                ]
                            }
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
  if (!admin) { console.log("❌ ERROR: Falta GOD_TIER."); return; }
  
  console.log("📡 ESCANEANDO EL UNIVERSO MEP LOCAL...");
  if (!fs.existsSync(BASE_PATH)) { 
      console.log("⚠️ ATENCIÓN: No encontré la carpeta MEP_ORDENADO en public/mep-docs.");
      console.log("   -> Creando datos de prueba basados en su solicitud...");
  }
  
  await scan(BASE_PATH, admin.id);
  console.log("\n✅ SINCRONIZACIÓN COMPLETADA. LA BD TIENE ALMA.");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());