const fs = require('fs');
const path = require('path');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// RUTA OBJETIVO
const BASE_PATH = path.join(process.cwd(), 'public', 'mep-docs', 'MEP_ORDENADO');

// CEREBRO PEDAGÓGICO
function analyzeSubjectType(filename) {
  const n = filename.toLowerCase();
  if (n.includes("ciber") || n.includes("soft") || n.includes("web") || n.includes("red") || n.includes("ia") || n.includes("datos")) return "HARD_TECH";
  if (n.includes("turismo") || n.includes("hotel") || n.includes("secret") || n.includes("ejecut")) return "SERVICE";
  if (n.includes("contab") || n.includes("banca") || n.includes("finan") || n.includes("logist")) return "BUSINESS";
  return "ACADEMIC";
}

function generateContent(filename, type, folder) {
  const cleanName = filename.replace('.pdf', '').replace(/_/g, ' ').toUpperCase();
  let strategies = [], evidence = "", rubric = {};

  if (type === "HARD_TECH") {
    strategies = ["Análisis de caso técnico real.", "Laboratorio práctico (Sandbox/Simulación).", "Codificación/Configuración de la solución.", "Depuración y Optimización."];
    evidence = "Repositorio Git / Bitácora Técnica / Script";
    rubric = { high: "Código/Configuración funcional y optimizada.", low: "Código con errores sintácticos." };
  } else if (type === "SERVICE") {
    strategies = ["Video detonante sobre servicio al cliente.", "Diseño de guion de protocolo.", "Roleplay (Simulación de atención).", "Feedback de pares."];
    evidence = "Video de Simulación / Lista de Cotejo";
    rubric = { high: "Ejecuta el protocolo con fluidez y empatía.", low: "Omite pasos críticos del protocolo." };
  } else {
    strategies = ["Lectura de normativa vigente.", "Análisis de estados financieros/casos.", "Resolución de problema en Hoja de Cálculo.", "Informe Ejecutivo."];
    evidence = "Informe Financiero / Excel";
    rubric = { high: "Cálculos exactos según NIIF.", low: "Errores numéricos significativos." };
  }

  return {
    administrative: { period: "2026", modality: "Técnica", origin: filename },
    curriculum: { unit_name: cleanName, learning_result: "Competencia Oficial MEP." },
    mediation: strategies.map((act, i) => ({ moment: `${i+1}. MOMENTO`, activity: act, dua_principle: "Múltiples formas de implicación" })),
    evaluation: { type: "Rúbrica Analítica", criteria: [{ indicator: `Dominio de ${cleanName}`, levels: rubric }] }
  };
}

async function scan(dir, adminId) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await scan(fullPath, adminId);
    } else if (file.toLowerCase().endsWith(".pdf")) {
      const type = analyzeSubjectType(file);
      const subject = path.basename(dir); 
      const level = file.match(/10|11|12/) ? (file.match(/10|11|12/)[0] + "mo") : "General";
      
      console.log(`   [+] Procesando: ${subject} -> ${file}`);
      
      await prisma.lessonPlan.create({
        data: {
          title: `MEP OFICIAL: ${subject} - ${file.replace('.pdf','')}`,
          subject: subject,
          level: level,
          status: "PUBLISHED",
          userId: adminId,
          content: generateContent(file, type, subject)
        }
      });
    }
  }
}

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) { console.log("❌ ERROR: Falta usuario GOD_TIER."); return; }
  if (!fs.existsSync(BASE_PATH)) { console.log(`❌ ERROR: No existe ${BASE_PATH}`); return; }
  
  console.log("🚀 ESCANEANDO UNIVERSO MEP...");
  await scan(BASE_PATH, admin.id);
  console.log("✅ FIN DE LA TRANSMISIÓN. BASE DE DATOS ACTUALIZADA.");
}

main().finally(async () => await prisma.$disconnect());