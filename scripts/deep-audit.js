require("dotenv").config(); // <--- ESTA ES LA VISIÓN NOCTURNA
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function runAudit() {
  console.log("\n🔍 INICIANDO AUDITORÍA OMEGA v2.1...");
  let healthScore = 100;
  let errors = [];

  // 1. VERIFICACIÓN DE PULSO DE BASE DE DATOS
  try {
    process.stdout.write("   🔌 Probando conexión a Base de Datos... ");
    const start = Date.now();
    await prisma.$queryRaw`SELECT 1`; 
    const latency = Date.now() - start;
    console.log(`✅ OK (${latency}ms)`);
    
    // Conteo de datos vitales
    const userCount = await prisma.user.count();
    const planCount = await prisma.lessonPlan.count();
    console.log(`      📊 Datos actuales: ${userCount} Usuarios, ${planCount} Planes.`);

  } catch (e) {
    console.log("❌ FALLO CRÍTICO");
    errors.push("Base de datos inaccesible: " + e.message);
    healthScore -= 50;
  }

  // 2. VERIFICACIÓN DE SECRETOS (ENV)
  console.log("   🔑 Verificando Bóveda de Claves (.env)...");
  
  // Lista de claves vitales
  const checks = [
    { key: "DATABASE_URL", crit: true },
    { key: "NEXTAUTH_SECRET", crit: true },
    { key: "NEXTAUTH_URL", crit: true },
    { key: "GEMINI_API_KEY", crit: false } // Es opcional para arrancar, pero vital para IA
  ];

  checks.forEach(check => {
    if (!process.env[check.key]) {
      console.log(`      ❌ Faltante: ${check.key}`);
      errors.push(`Falta variable: ${check.key}`);
      healthScore -= check.crit ? 20 : 10;
    } else {
      // Ocultamos la clave por seguridad, solo mostramos los últimos 4 caracteres
      const val = process.env[check.key];
      const safeVal = val.length > 5 ? "..." + val.slice(-4) : "***";
      console.log(`      ✅ Presente: ${check.key} (${safeVal})`);
    }
  });

  // 3. REPORTE FINAL
  console.log("\n" + "=".repeat(40));
  console.log(`🏆 PUNTUJE DE SALUD DEL SISTEMA: ${Math.max(0, healthScore)}/100`);
  
  if (healthScore >= 100) {
    console.log("   ESTADO: KAMIZAMA (DIOS) ✨💎");
  } else if (healthScore > 70) {
    console.log("   ESTADO: OPERATIVO (Con advertencias leves) ⚠️");
  } else {
    console.log("   ESTADO: CRÍTICO (El sistema puede fallar) 🔥");
  }

  if (errors.length > 0) {
    console.log("\n📋 ACCIONES REQUERIDAS:");
    errors.forEach(e => console.log(`   - ${e}`));
  }
  console.log("=".repeat(40) + "\n");
  
  await prisma.$disconnect();
}

runAudit();