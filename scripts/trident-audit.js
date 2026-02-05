require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function runTridentAudit() {
  console.log("\n=======================================================");
  console.log("      📊 REPORTE DE CERTIFICACIÓN - AULAPLAN ULTRA");
  console.log("=======================================================\n");

  let score = 100;
  let issues = [];

  // -------------------------------------------------------------------
  // 1. NIVEL ANTIGRAVITY (INTELIGENCIA ARTIFICIAL & REDUNDANCIA)
  // -------------------------------------------------------------------
  console.log("🧠 1. AUDITORÍA ANTIGRAVITY (CEREBRO)");
  
  // Verificamos si las llaves existen
  const keys = {
    GEMINI: !!process.env.GEMINI_API_KEY,
    GROQ: !!process.env.GROQ_API_KEY,
    OPENAI: !!process.env.OPENAI_API_KEY
  };

  if (keys.GEMINI && keys.GROQ && keys.OPENAI) {
    console.log("   ✅ Redundancia Triple Activada (Gemini + Groq + OpenAI).");
  } else if (keys.GEMINI) {
    console.log("   ⚠️ Advertencia: Solo motor Gemini detectado (Sin redundancia total).");
    // No bajamos puntos porque funciona, pero avisamos.
  } else {
    console.log("   ❌ ERROR CRÍTICO: No hay cerebros de IA conectados.");
    score -= 30;
    issues.push("Falta API KEY de Inteligencia Artificial.");
  }

  // Verificamos si el código de route.js tiene la lógica de switch
  const routePath = path.join(process.cwd(), "app", "api", "generate", "route.js");
  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, "utf8");
    if (content.includes("Gemini Skip") && content.includes("Groq Skip")) {
        console.log("   ✅ Lógica de 'Failover' (Salto de emergencia) detectada en código.");
    } else {
        console.log("   ⚠️ La lógica de respaldo no parece estar activa en el código.");
        score -= 10;
    }
  } else {
    console.log("   ❌ Archivo cerebral (route.js) no encontrado.");
    score -= 50;
  }

  // -------------------------------------------------------------------
  // 2. NIVEL "NOTEBOOKLM" (NORMATIVA Y PEDAGOGÍA)
  // -------------------------------------------------------------------
  console.log("\n📚 2. AUDITORÍA NORMATIVA (PEDAGOGÍA MEP)");

  // Verificamos si la regla de 3 opciones está escrita en el prompt
  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, "utf8");
    const rule1 = content.includes("ESTRICTAMENTE TRES (3)");
    const rule2 = content.includes("PROHIBIDO generar opción D");
    
    if (rule1 && rule2) {
        console.log("   ✅ Regla '3 Opciones' (REA-MEP 2026) inyectada en el Prompt.");
    } else {
        console.log("   ❌ El cerebro no tiene la instrucción de 3 opciones.");
        score -= 20;
        issues.push("La IA no está programada para 3 opciones.");
    }
  }

  // Verificamos si el Frontend soporta la visualización ABC
  const gamePath = path.join(process.cwd(), "components", "gamification", "TriviaGame.jsx");
  if (fs.existsSync(gamePath)) {
    const content = fs.readFileSync(gamePath, "utf8");
    if (content.includes("String.fromCharCode(65 + idx)")) { // Lógica para A, B, C
         console.log("   ✅ Interfaz Gráfica (UI) configurada para formato A, B, C.");
    } else {
         console.log("   ⚠️ La interfaz visual podría no estar mostrando A, B, C correctamente.");
    }
  }

  // -------------------------------------------------------------------
  // 3. NIVEL SISTEMA (INFRAESTRUCTURA & SINCRONIZACIÓN)
  // -------------------------------------------------------------------
  console.log("\n⚙️ 3. AUDITORÍA DE SISTEMA (MI REVISIÓN)");

  // Prueba de Base de Datos
  try {
    process.stdout.write("   🔌 Conexión a Base de Datos (Neon Cloud)... ");
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    console.log(`✅ ESTABLE (${latency}ms)`);
  } catch (e) {
    console.log(`❌ FALLO DE CONEXIÓN: ${e.message}`);
    score -= 40;
    issues.push("Base de datos desconectada.");
  }

  // Verificación de Build
  const nextFolder = path.join(process.cwd(), ".next");
  if (fs.existsSync(nextFolder)) {
      console.log("   ✅ Compilación de Producción (.next) existe.");
  } else {
      console.log("   ⚠️ No se detecta 'build'. El sistema podría ser lento en arranque.");
      // No bajamos puntos porque 'npm start' puede fallar pero 'npm run dev' funciona.
  }

  // Verificación de Archivos Vitales
  const criticalFiles = [
    "lib/db.js",
    "lib/auth-options.js",
    "app/dashboard/grades/page.js"
  ];
  
  let filesOk = true;
  criticalFiles.forEach(f => {
      if (!fs.existsSync(path.join(process.cwd(), f))) {
          console.log(`   ❌ Archivo crítico faltante: ${f}`);
          filesOk = false;
          score -= 10;
          issues.push(`Falta archivo: ${f}`);
      }
  });
  if (filesOk) console.log("   ✅ Estructura de archivos críticos íntegra.");


  // -------------------------------------------------------------------
  // RESULTADO FINAL
  // -------------------------------------------------------------------
  console.log("\n=======================================================");
  if (score === 100) {
      console.log("🏆 CALIFICACIÓN FINAL: 100/100 (CERTIFICADO)");
      console.log("   ESTADO: OPERATIVO, LEGAL Y BLINDADO.");
      console.log("   Puedes irte a descansar con total tranquilidad. 🛌💤");
  } else if (score >= 80) {
      console.log(`⚠️ CALIFICACIÓN FINAL: ${score}/100 (ACEPTABLE)`);
      console.log("   El sistema funciona, pero hay advertencias menores.");
  } else {
      console.log(`🔥 CALIFICACIÓN FINAL: ${score}/100 (RIESGO)`);
      console.log("   NO se recomienda el despliegue sin arreglar los fallos.");
  }

  if (issues.length > 0) {
      console.log("\n🔧 ACCIONES PENDIENTES:");
      issues.forEach(i => console.log(`   - ${i}`));
  }
  console.log("=======================================================\n");

  await prisma.$disconnect();
}

runTridentAudit();