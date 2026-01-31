const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// FUNCIÓN DE FORMATEO (ORTOGRAFÍA Y ESTILO)
function formatText(text) {
  if (!text) return "Sin Título";
  let clean = text.trim().replace(/\s+/g, " "); // Quitar dobles espacios
  clean = clean.charAt(0).toUpperCase() + clean.slice(1); // Capitalizar
  return clean;
}

async function main() {
  console.log("💎 CARGANDO BASE DE DATOS: MODO PLATINUM...");

  if (!fs.existsSync(GOLD_DIR)) {
      console.error("❌ ERROR CRÍTICO: No existe carpeta GOLD_DATA.");
      return;
  }

  const files = fs.readdirSync(GOLD_DIR).filter(f => f.endsWith(".json"));
  let processed = 0;

  for (const file of files) {
      try {
          const raw = fs.readFileSync(path.join(GOLD_DIR, file), "utf-8");
          // Saltar archivos vacíos
          if (raw.length < 20) continue; 
          
          const data = JSON.parse(raw);
          
          // NORMALIZAR NOMBRES
          const materiaName = formatText(data.materia || data.subjectName || file.replace(".json","").replace(/_/g, " "));
          const nivelRaw = data.nivel || "Sin Nivel";
          
          // DETECTAR MODALIDAD
          let mod = "ACADEMICA";
          if (file.toLowerCase().includes("tecnico") || file.includes("CTP")) mod = "TECNICA";
          if (file.toLowerCase().includes("indigena")) mod = "INDIGENA";
          if (file.toLowerCase().includes("cindea") || file.toLowerCase().includes("adultos")) mod = "ADULTOS";

          // GENERAR CÓDIGO ÚNICO
          const code = (materiaName.substring(0,4) + "-" + mod.substring(0,3)).toUpperCase().replace(/\s/g, "");

          // 1. UPSERT MATERIA
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: {
                  name: materiaName,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: mod
              }},
              update: { code: code },
              create: {
                  name: materiaName,
                  code: code,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: mod
              }
          });

          // 2. GENERAR BANCO DE PREGUNTAS (REPASO) AUTOMÁTICO
          // Solo si no existe ya uno para esta materia
          const existingExam = await prisma.assessment.findFirst({ where: { subjectId: subject.id, type: "SIMULACRO" } });
          
          if (!existingExam && data.unidades && data.unidades.length > 0) {
              const temas = data.unidades.map(u => u.titulo).join(", ");
              await prisma.assessment.create({
                  data: {
                      title: `Simulacro Oficial: ${materiaName}`,
                      type: "SIMULACRO",
                      userId: "system_generated",
                      subjectId: subject.id,
                      // Contenido Formal
                      content: {
                          instrucciones: "Seleccione la respuesta correcta. Dispone de 90 minutos.",
                          temario: temas,
                          estado: "AUTO_GENERADO"
                      },
                      // Rúbrica Formal
                      rubric: { criterio: "Dominio de contenidos", escala: "1-100" }
                  }
              });
          }
          process.stdout.write(".");
          processed++;
      } catch (e) {
          // Ignorar silenciosamente errores de formato
      }
  }
  console.log(`\n✅ ${processed} Programas procesados y corregidos.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());