// test_pilot.js
async function probarInteligencia() {
  console.log("🚀 SOLICITANDO PLAN A ANTIGRAVITY (VÍA 127.0.0.1)...");
  
  try {
    const response = await fetch('http://127.0.0.1:3000/api/planning/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        materia: "Matematicas",
        nivel: "7",
        unidad: "Números",
        tema: "Números Enteros",
        promptUsuario: "Quiero énfasis en actividades lúdicas."
      })
    });

    const data = await response.json();
    
    console.log("\n--- REPORTE DE MISIÓN ---");
    console.log(`📡 FUENTE: ${data.source || 'DESCONOCIDA'}`); 
    
    if (data.success) {
        console.log("✅ PLAN GENERADO.");
        // Imprimimos solo un pedacito para ver si funcionó
        if (data.data.secciones) {
            console.log("Muestra:", data.data.secciones[0].estrategias[0]);
        }
    } else {
        console.log("❌ ERROR:", data);
    }

  } catch (error) {
    console.error("❌ FALLO DE CONEXIÓN:", error.message);
    console.log("TIP: Verifica que 'npm run dev' siga corriendo en la OTRA ventana.");
  }
}

probarInteligencia();