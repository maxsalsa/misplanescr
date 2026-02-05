const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const prisma = new PrismaClient();

// RUTA EXACTA QUE USTED PROPORCIONÓ
const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

async function main() {
  console.log(`   📂 Buscando biblioteca en: ${BASE_PATH}`);

  if (!fs.existsSync(BASE_PATH)) {
    console.error("   ❌ ERROR CRÍTICO: No existe la carpeta 'public/mep-docs/MEP_ORDENADO'.");
    console.error("      Verifique que copió la carpeta en el lugar correcto.");
    return;
  }

  // FUNCIÓN PARA DETECTAR NIVEL SEGÚN EL NOMBRE DEL ARCHIVO O CARPETA
  function detectLevel(text) {
    const t = text.toLowerCase();
    if (t.includes("10") || t.includes("décimo") || t.includes("decimo")) return "Décimo";
    if (t.includes("11") || t.includes("undécimo") || t.includes("undecimo")) return "Undécimo";
    if (t.includes("12") || t.includes("duodécimo")) return "Duodécimo";
    if (t.includes("7") || t.includes("sétimo") || t.includes("septimo")) return "Sétimo";
    if (t.includes("8") || t.includes("octavo")) return "Octavo";
    if (t.includes("9") || t.includes("noveno")) return "Noveno";
    if (t.includes("4") || t.includes("cuarto")) return "Cuarto";
    if (t.includes("5") || t.includes("quinto")) return "Quinto";
    if (t.includes("6") || t.includes("sexto")) return "Sexto";
    return "Nivel General"; // Fallback
  }

  // FUNCIÓN PARA DETECTAR MATERIA
  function detectSubject(text) {
    const t = text.toLowerCase();
    if (t.includes("matem")) return "Matemáticas";
    if (t.includes("español")) return "Español";
    if (t.includes("ciencias")) return "Ciencias";
    if (t.includes("sociales")) return "Estudios Sociales";
    if (t.includes("ingl")) return "Inglés";
    if (t.includes("software") || t.includes("informática")) return "Desarrollo de Software";
    if (t.includes("ciber")) return "Ciberseguridad";
    if (t.includes("conta")) return "Contabilidad";
    if (t.includes("turismo")) return "Turismo";
    // Si no detecta nada conocido, usa el nombre de la carpeta padre como materia
    return null; 
  }

  // RECORRIDO RECURSIVO
  async function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await scanDirectory(fullPath); // Profundizar en subcarpetas
      } else if (file.toLowerCase().endsWith(".pdf")) {
        
        try {
            console.log(`      📄 Leyendo: ${file}...`);
            const dataBuffer = fs.readFileSync(fullPath);
            
            // LEER CONTENIDO DEL PDF
            const data = await pdf(dataBuffer);
            const textContent = data.text.substring(0, 1000); // Primeros 1000 caracteres para análisis
            
            // ANÁLISIS INTELIGENTE
            // Usamos la ruta completa para sacar pistas (ej: .../Técnica/10/Software/archivo.pdf)
            const pathInfo = fullPath.replace(BASE_PATH, ""); 
            
            let level = detectLevel(pathInfo) || detectLevel(file);
            let subject = detectSubject(pathInfo) || detectSubject(file) || "Materia Detectada (PDF)";
            
            // Extraer un "Tema" del contenido del PDF (buscando "Objetivo" o "Unidad")
            let topic = "Contenido extraído de PDF";
            const matchTema = textContent.match(/(?:unidad|tema|objetivo)[:\s]+([^.\n]+)/i);
            if (matchTema) topic = matchTema[1].trim();
            
            // INSERTAR EN BASE DE DATOS
            await prisma.syllabus.create({
                data: {
                    modalidad: pathInfo.toLowerCase().includes("tecnica") ? "TECNICA" : "ACADEMICA",
                    level: level,
                    subject: subject,
                    unit: file, // Usamos el nombre del archivo como Unidad referencial
                    topic: `${topic} || (Fuente: ${file})`, // Guardamos referencia
                    period: "Importado PDF"
                }
            });

        } catch (err) {
            console.error(`      ❌ Error leyendo PDF: ${err.message}`);
        }
      }
    }
  }

  console.log("   🚀 Iniciando escaneo profundo de PDFs...");
  await scanDirectory(BASE_PATH);
  console.log("   ✅ PROCESO COMPLETADO. Los PDFs han sido indexados.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());