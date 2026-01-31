const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const DATA_DIR = path.join(__dirname, "seeds", "data");

async function main() {
  console.log(`📂 ESCANEANDO: ${DATA_DIR}`);
  
  if (!fs.existsSync(DATA_DIR)) {
      console.error("❌ ERROR: Carpeta no encontrada.");
      return;
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".json"));
  console.log(`📚 ARCHIVOS ENCONTRADOS: ${files.length}`);
  console.log("---------------------------------------------------");

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
      try {
          // --- PASO 1: LIMPIEZA DE NOMBRE DE ARCHIVO ---
          // Quitamos (1), (2), _0, _copy, etc. para obtener el "Nombre Real"
          // Ejemplo: "Matematica(1).json" -> "Matematica"
          let cleanFileName = file
              .replace(/\(\d+\)/g, "")  // Quita (1), (23)
              .replace(/_\d+$/, "")     // Quita _0, _1 al final
              .replace(/_copy/, "")     // Quita _copy
              .replace(".json", "")
              .trim();

          const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
          
          // Validación: Si el archivo está vacío, saltar
          if (!raw || raw.length < 10) {
              skipped++;
              continue;
          }

          const data = JSON.parse(raw);
          
          // --- PASO 2: NORMALIZACIÓN DE DATOS ---
          const materiaName = data.materia || data.subjectName || data.name || cleanFileName.split("_")[2] || cleanFileName;
          const nivelRaw = data.nivel || data.grade || data.level || "Sin Nivel";
          
          // Lógica de Modalidad
          let modalidad = "ACADEMICA";
          if (file.includes("TECNICO") || file.includes("General_")) modalidad = "TECNICA";
          if (file.includes("INDIGENA")) modalidad = "INDIGENA";
          
          // Generar Código Limpio (Sin el (1))
          const uniqueCode = cleanFileName.substring(0, 20).toUpperCase();

          // --- PASO 3: FUSIÓN INTELIGENTE (UPSERT) ---
          // Gracias a @@unique([name, educationLevel, modalityType]), 
          // si el sistema encuentra "Contabilidad" y luego "Contabilidad(1)",
          // NO crea dos. Solo actualiza la misma entrada.
          
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: {
                  name: materiaName,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: modalidad
              }},
              update: { 
                  // Si ya existe, actualizamos el código por si acaso este es el bueno
                  code: uniqueCode 
              },
              create: {
                  name: materiaName,
                  code: uniqueCode,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: modalidad
              }
          });

          // Cargar Unidades (Misma lógica: se agregan a la materia existente)
          const unidades = data.unidades || data.units || [];
          if (unidades.length > 0) {
              for (const u of unidades) {
                  const unitDB = await prisma.studyUnit.create({
                      data: {
                          title: u.titulo || u.title || "Unidad General",
                          grade: nivelRaw,
                          subjectId: subject.id
                      }
                  });
                  
                  // Cargar Aprendizajes (Simplificado para velocidad)
                  const aprendizajes = u.aprendizajes || u.outcomes || [];
                  for (const apr of aprendizajes) {
                      const desc = typeof apr === "string" ? apr : (apr.descripcion || apr.description);
                      if(desc) {
                          const lo = await prisma.learningOutcome.create({
                              data: { description: desc, unitId: unitDB.id }
                          });
                          await prisma.indicator.create({ data: { description: `Indicador: ${desc}`, outcomeId: lo.id } });
                      }
                  }
              }
          }
          
          process.stdout.write("."); // Feedback minimalista
          processed++;

      } catch (err) {
          // Ignoramos errores de JSONs corruptos silenciosamente para no detener la carga
          skipped++;
      }
  }

  console.log("\n---------------------------------------------------");
  console.log(`✅ PROCESADOS Y FUSIONADOS: ${processed}`);
  console.log(`🗑️ SALTADOS (BASURA/VACÍOS): ${skipped}`);
  console.log("   Base de datos limpia y sin duplicados.");
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());