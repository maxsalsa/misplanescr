// check_models.js
// Script para listar qué modelos ve realmente tu API Key
require('dotenv').config(); // Cargar variables de entorno
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function escanearCerebros() {
  console.log("🕵️‍♂️ ESCANEANDO MODELOS DISPONIBLES EN GOOGLE...");
  
  // 1. Obtener la llave
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
      console.error("❌ ERROR: No veo la API KEY en el archivo .env");
      return;
  }
  console.log(`🔑 Llave detectada: ${apiKey.substring(0,6)}...`);

  // 2. Conectar
  try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Usamos el gestor de modelos para listar
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init
      
      // Truco: La librería oficial tiene un método listModels en el manager, 
      // pero a veces es confuso acceder. Vamos a intentar una llamada directa si falla lo obvio.
      // En versiones recientes, no hay un "listModels" simple expuesto en la clase principal 
      // de forma directa en todos los entornos, así que haremos una PRUEBA DE FUEGO.
      
      console.log("\n--- INTENTANDO CONECTAR CON MODELOS CONOCIDOS ---");
      
      const candidatos = ["gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro", "gemini-1.5-pro"];
      
      for (const nombreModelo of candidatos) {
          process.stdout.write(`Probando [${nombreModelo}]... `);
          try {
              const m = genAI.getGenerativeModel({ model: nombreModelo });
              const result = await m.generateContent("Hola, ¿estás vivo?");
              const response = await result.response;
              console.log(`✅ ¡VIVO! Respondió: "${response.text().substring(0, 10)}..."`);
              console.log(`\n🎉 ¡EUREKA! USA ESTE NOMBRE EN TU CÓDIGO: "${nombreModelo}"`);
              return; // Terminamos apenas encontremos uno
          } catch (e) {
              console.log(`❌ (No disponible: ${e.message.substring(0, 20)}...)`);
          }
      }
      
      console.log("\n⚠️ NINGUNO RESPONDIÓ. Es probable que debamos actualizar la librería 'npm install' de nuevo.");

  } catch (error) {
    console.error("❌ ERROR CRÍTICO AL ESCANEAR:", error);
  }
}

escanearCerebros();