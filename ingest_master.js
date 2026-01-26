require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ORDEN DE BATALLA: OpenAI lidera.
const ROTACION = ["OPENAI", "GROQ", "GOOGLE"]; 
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function iniciarIngesta() {
  console.log("🧬 [ANTIGRAVITY] MODO PLATINUM (Integridad OpenAI)...");

  // Validar conexión básica
  try {
      const test = await fetch("http://127.0.0.1:3000/api/programs/ingest", {
          method: "POST", headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ filename: "TEST", texto: "Hola", provider: "OPENAI" })
      });
      if(test.ok) console.log("✅ Conexión OpenAI verificada.");
      else console.warn("⚠️ Advertencia en prueba inicial.");
  } catch(e) { 
      console.error("❌ ERROR: Servidor apagado. Ejecuta 'npm run dev'.");
      return;
  }

  const programas = await prisma.mep_programs_core.findMany({
      where: { status: "ACTIVE" },
      orderBy: { id: "asc" }
  });

  console.log(`📋 Cola de trabajo: ${programas.length} programas.`);

  for (const [i, prog] of programas.entries()) {
    console.log(`\n🔥 [${i+1}] Procesando: ${prog.filename}`);
    let exito = false;

    for (const provider of ROTACION) {
        if (exito) break;
        try {
            const res = await fetch("http://127.0.0.1:3000/api/programs/ingest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    filename: prog.filename,
                    texto: prog.raw_text || "",
                    provider: provider
                })
            });
            
            const apiRes = await res.json();
            if (!apiRes.success) throw new Error(apiRes.error);
            
            // GUARDAR EN BASE DE DATOS
            await prisma.mep_programs_core.update({
                where: { id: prog.id },
                data: {
                    structure_json: apiRes.data,
                    fundamentacion: apiRes.data.fundamentacion || "Generado IA",
                    perfil_salida: typeof apiRes.data.perfil_salida === "object" ? JSON.stringify(apiRes.data.perfil_salida) : apiRes.data.perfil_salida,
                    last_deep_scan: new Date()
                }
            });
            
            console.log(`   ✅ ÉXITO (${provider}).`);
            exito = true;

        } catch (e) {
            // Si falla, intentamos el siguiente silenciosamente
            // console.warn(`   ⚠️ Fallo ${provider}: ${e.message}`);
        }
    }
    
    if(!exito) console.error("   💀 FALLO TOTAL (Todos los proveedores).");
    
    // Con OpenAI pagado, podemos ir más rápido (500ms espera)
    await esperar(500); 
  }
  console.log("\n🧬 INGESTA FINALIZADA.");
}

iniciarIngesta();
