const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

function detectPedagogy(filename) {
  const n = filename.toLowerCase();
  // LÓGICA DE MATRIZ DE ESPECIALIDADES DINÁMICAS
  if (n.includes("ciber") || n.includes("web") || n.includes("soft") || n.includes("red")) {
    return { 
      type: "HARD_TECH", 
      evidence: "Repositorio / Código Fuente",
      cognitive: "Análisis y Creación",
      activity: "Laboratorio de Configuración en Entorno Virtual" 
    };
  } else if (n.includes("turismo") || n.includes("hotel") || n.includes("secret") || n.includes("ejecut")) {
    return { 
      type: "SOFT_SKILLS", 
      evidence: "Video de Roleplay / Guion",
      cognitive: "Aplicación",
      activity: "Simulación de Protocolo de Servicio al Cliente" 
    };
  } else {
    return { 
      type: "GESTION", 
      evidence: "Hoja de Cálculo / Informe",
      cognitive: "Comprensión",
      activity: "Estudio de Caso y Análisis Financiero" 
    };
  }
}

async function quantumScan(dir, adminId) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
        await quantumScan(fullPath, adminId);
    } else if (file.toLowerCase().endsWith(".pdf")) {
        const subject = path.basename(dir);
        const cleanName = file.replace(".pdf","").replace(/_/g," ");
        const level = file.match(/10|11|12/) ? (file.match(/10|11|12/)[0] + "mo") : "10mo";
        const meta = detectPedagogy(file);
        
        console.log(`   ⚡ ASIMILANDO: ${subject} [Modo: ${meta.type}]`);

        // CREAR GRUPO AUTOMÁTICO
        const groupName = `${level.replace("mo","")}-1 ${subject.substring(0,8)}`;
        let group = await prisma.group.findFirst({ where: { name: groupName } });
        if (!group) {
            group = await prisma.group.create({
                data: { name: groupName, grade: level, shift: "DIURNO", userId: adminId }
            });
        }

        // CREAR PLAN MAESTRO CON TABLA DE ESPECIFICACIONES PRE-CARGADA
        await prisma.lessonPlan.create({
            data: {
                title: `MEP OFICIAL: ${cleanName}`,
                subject: subject,
                level: level,
                status: "PUBLISHED",
                userId: adminId,
                content: {
                    administrative: { period: "2026", origin: file, group: group.name },
                    // TABLA DE ESPECIFICACIONES (DATOS INICIALES PARA EL EDITOR)
                    evaluation_system: {
                        written_test: {
                            title: "I Prueba Parcial",
                            rows: [
                                { obj: "Definir conceptos técnicos", cognitive: "Conocimiento", type: "RC", time: 10, points: 5 },
                                { obj: "Explicar funcionamiento del sistema", cognitive: "Comprensión", type: "Corr", time: 20, points: 10 },
                                { obj: meta.activity, cognitive: meta.cognitive, type: "Desarrollo", time: 40, points: 25 },
                                { obj: "Resolución de problemas", cognitive: "Análisis", type: "Caso", time: 10, points: 15 }
                            ]
                        }
                    },
                    mediation: [
                        { moment: "1. CONEXIÓN", activity: "Video detonante y preguntas generadoras.", dua: "Múltiples formas de implicación" },
                        { moment: "2. COLABORACIÓN", activity: "Análisis grupal de normativa.", dua: "Aprendizaje colaborativo" },
                        { moment: "3. CONSTRUCCIÓN", activity: meta.activity, evidence: meta.evidence, dua: "Acción y expresión técnica" },
                        { moment: "4. CLARIFICACIÓN", activity: "Cierre cognitivo y autoevaluación.", technique: "Metacognición" }
                    ]
                }
            }
        });
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta GOD_TIER."); return; }
  console.log("🚀 EJECUTANDO PROTOCOLO RAG-SIMULADO...");
  if (!fs.existsSync(BASE_PATH)) { console.log("⚠️ RUTA NO ENCONTRADA. VERIFIQUE CARPETA PUBLIC."); }
  await quantumScan(BASE_PATH, admin.id); 
  console.log("✅ INGESTA COMPLETADA.");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());