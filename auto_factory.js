require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// TIEMPOS (En milisegundos)
const PAUSA_EXITO = 10000;   // 10 seg (Normal)
const PAUSA_CASTIGO = 60000; // 60 seg (Si Google nos bloquea)

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function limpiarNombre(txt) {
    if (!txt) return "General";
    return txt.replace(/[0-9_.-]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

async function iniciar() {
  console.log("🏭 [ANTIGRAVITY] INICIANDO MODO TORTUGA...");

  // 1. ADMIN
  const admin = await prisma.user.findFirst({ where: { email: "admin@aulaplan.com" } });
  if (!admin) return console.error("❌ Crea el admin primero.");

  // 2. CARGA
  const programas = await prisma.mep_programs_core.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { id: 'asc' }
  });
  console.log(`📋 Cola: ${programas.length} programas.`);

  // 3. PROCESO
  for (const [i, prog] of programas.entries()) {
    const nombre = limpiarNombre(prog.subject || prog.filename);
    
    // Verificar duplicados para ahorrar tiempo
    const yaExiste = await prisma.pedagogicalPlan.findFirst({ where: { title: nombre } });
    if (yaExiste) {
        console.log(`⏭️ [${i+1}/${programas.length}] "${nombre}" ya existe.`);
        continue;
    }

    console.log(`\n⚙️ [${i+1}/${programas.length}] Procesando: "${nombre}"...`);
    
    try {
      const res = await fetch('http://127.0.0.1:3000/api/planning/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ materia: nombre, nivel: "Diversificada", tema: "Plan Oficial" })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
          throw new Error(data.error || `HTTP ${res.status}`);
      }

      // GUARDAR (Sea JSON perfecto o Texto Roto)
      await prisma.pedagogicalPlan.create({
        data: {
          title: nombre,
          subject: nombre,
          level: "MEP Oficial",
          content: JSON.stringify(data.data),
          status: data.status || "GENERADO",
          userId: admin.id,
          riskProtocol: false
        }
      });

      console.log(`✅ Guardado (${data.status}). Esperando ${PAUSA_EXITO/1000}s...`);
      await esperar(PAUSA_EXITO);

    } catch (e) {
      console.error(`❌ ERROR: ${e.message}`);
      // Si es error de tráfico, castigo largo
      if (e.message.includes("429") || e.message.includes("Blocked")) {
          console.log(`🛑 TRÁFICO ALTO. Esperando ${PAUSA_CASTIGO/1000}s para enfriar...`);
          await esperar(PAUSA_CASTIGO);
      } else {
          await esperar(5000); // Error menor
      }
    }
  }
}

iniciar();