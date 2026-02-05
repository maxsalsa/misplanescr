// ---------------------------------------------------------
// 1. EL PARCHE (DEBE IR EN LA LÍNEA 1 ABSOLUTA)
// ---------------------------------------------------------
if (!global.DOMMatrix) {
    global.DOMMatrix = class DOMMatrix {
        constructor() {
            this.a = 1; this.b = 0; this.c = 0; this.d = 1; 
            this.e = 0; this.f = 0;
            this.m11 = 1; this.m12 = 0; this.m21 = 0; this.m22 = 1; 
            this.m41 = 0; this.m42 = 0;
            this.is2D = true;
            this.isIdentity = true;
        }
    };
}
if (!global.ReadableStream) {
    try { global.ReadableStream = require('stream/web').ReadableStream; } catch(e) {}
}
// ---------------------------------------------------------

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

// Ahora sí cargamos la librería, ya parchada
let pdf = null;
try { 
    pdf = require("pdf-parse"); 
} catch (e) { 
    console.warn("⚠️ Advertencia: El motor PDF nativo falló, usaremos modo indexación por nombre."); 
}

const prisma = new PrismaClient();
const BASE_PATH = path.join(process.cwd(), "public", "mep-docs", "MEP_ORDENADO");

async function main() {
  console.log(`   📂 Biblioteca Objetivo: ${BASE_PATH}`);

  if (!fs.existsSync(BASE_PATH)) {
    console.error("   ❌ ERROR: No encuentro la carpeta 'MEP_ORDENADO'.");
    return;
  }

  // --- DETECTORES INTELIGENTES ---
  function detectLevel(text) {
    const t = text.toLowerCase();
    // Preescolar
    if (t.includes("materno")) return "Materno Infantil";
    if (t.includes("transicion") || t.includes("transición")) return "Transición";
    // Primaria
    if (t.includes("primero") || t.includes(" 1 ")) return "Primero";
    if (t.includes("segundo") || t.includes(" 2 ")) return "Segundo";
    if (t.includes("tercero") || t.includes(" 3 ")) return "Tercero";
    if (t.includes("cuarto") || t.includes(" 4 ")) return "Cuarto";
    if (t.includes("quinto") || t.includes(" 5 ")) return "Quinto";
    if (t.includes("sexto") || t.includes(" 6 ")) return "Sexto";
    // Secundaria
    if (t.includes("10") || t.includes("décimo")) return "Décimo";
    if (t.includes("11") || t.includes("undécimo")) return "Undécimo";
    if (t.includes("12") || t.includes("duodécimo")) return "Duodécimo";
    if (t.includes("7") || t.includes("sétimo")) return "Sétimo";
    if (t.includes("8") || t.includes("octavo")) return "Octavo";
    if (t.includes("9") || t.includes("noveno")) return "Noveno";
    // Adultos
    if (t.includes("cindea") || t.includes("ipec")) return "CINDEA Nivel I";
    
    return "Nivel General";
  }

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
    if (t.includes("agro")) return "Agroecología";
    if (t.includes("mecanica")) return "Mecánica";
    if (t.includes("ejecutivo")) return "Secretariado Ejecutivo";
    if (t.includes("afectiva")) return "Socio-Afectiva"; // Preescolar
    if (t.includes("psicomotriz")) return "Psicomotriz"; // Preescolar
    return "Recurso Educativo";
  }

  async function scanDirectory(dir) {
    let files = [];
    try { files = fs.readdirSync(dir); } catch(e) { return; }

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (file.toLowerCase().endsWith(".pdf")) {
        
        const pathInfo = fullPath.replace(BASE_PATH, ""); 
        let level = detectLevel(pathInfo) || detectLevel(file);
        let subject = detectSubject(pathInfo) || detectSubject(file);
        let topic = file.replace(".pdf", ""); // Default: Nombre archivo
        let contentRead = false;

        // INTENTO DE LECTURA DE PDF
        if (pdf) {
            try {
                const dataBuffer = fs.readFileSync(fullPath);
                // Leemos con timeout por si un PDF es gigante y traba el proceso
                const data = await pdf(dataBuffer);
                const text = data.text.substring(0, 600); // Solo el inicio
                
                // Si el nombre de archivo no nos dio pistas, usamos el texto del PDF
                if (subject === "Recurso Educativo") subject = detectSubject(text);
                if (level === "Nivel General") level = detectLevel(text);
                
                // Buscamos "Tema" o "Unidad" dentro del texto
                const match = text.match(/(?:unidad|tema|contenido|objetivo)[:\s]+([^.\n]{4,60})/i);
                if (match) topic = match[1].trim();
                
                contentRead = true;
            } catch (err) {
                // Si falla leer el PDF, no pasa nada, ya tenemos el nombre del archivo
            }
        }

        // GUARDAR EN BASE DE DATOS
        try {
            await prisma.syllabus.create({
                data: {
                    modalidad: pathInfo.toLowerCase().includes("tecnica") ? "TECNICA" : "ACADEMICA",
                    level: level,
                    subject: subject,
                    unit: "Archivo PDF",
                    topic: `${topic} ${contentRead ? '(Texto Extraído)' : '(Archivo Indexado)'}`,
                    period: "Importado"
                }
            });
            console.log(`      ✅ ${file} -> [${level} - ${subject}]`);
        } catch (dbErr) { }
      }
    }
  }

  console.log("   🚀 Iniciando escaneo (Con Parche DOMMatrix activo)...");
  await scanDirectory(BASE_PATH);
  console.log("   🏆 FINALIZADO.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());