const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

// LA RUTA DEL TESORO QUE USTED ENCONTRÓ
const DATA_DIR = path.join(__dirname, "seeds", "data");

async function main() {
  console.log(`📂 LEYENDO CARPETA: ${DATA_DIR}`);
  
  if (!fs.existsSync(DATA_DIR)) {
      console.error("❌ ERROR: No encuentro la carpeta de datos. Verifique la ruta.");
      return;
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".json"));
  console.log(`📚 SE DETECTARON ${files.length} PROGRAMAS EDUCATIVOS.`);
  console.log("---------------------------------------------------");

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
      try {
          // 1. LEER ARCHIVO
          const raw = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
          const data = JSON.parse(raw);
          
          // 2. NORMALIZAR DATOS (INTELIGENCIA DE ANTIGRAVITY)
          // A veces el JSON tiene campos en inglés o español, normalizamos aquí.
          const materiaName = data.materia || data.subjectName || data.name || file.split("_")[2] || "Materia Desconocida";
          const nivelRaw = data.nivel || data.grade || data.level || "Sin Nivel";
          
          // Detectar Modalidad por nombre de archivo si falta en JSON
          let modalidad = "ACADEMICA";
          if (file.includes("TECNICO") || file.includes("General_")) modalidad = "TECNICA";
          if (file.includes("INDIGENA")) modalidad = "INDIGENA";
          if (file.includes("ACADEMICO")) modalidad = "ACADEMICA";
          
          // Generar Código Único para evitar choques
          const uniqueCode = (data.codigo || file.replace(".json", "")).substring(0, 20).toUpperCase();

          // 3. INYECTAR EN NEON (UPSERT)
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: {
                  name: materiaName,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: modalidad
              }},
              update: { code: uniqueCode }, // Actualizamos el código si ya existe
              create: {
                  name: materiaName,
                  code: uniqueCode,
                  educationLevel: nivelRaw.includes("CICLO") ? "PRIMARIA" : "SECUNDARIA",
                  modalityType: modalidad
              }
          });

          // 4. INYECTAR UNIDADES (SI EXISTEN)
          const unidades = data.unidades || data.units || [];
          if (unidades.length > 0) {
              for (const u of unidades) {
                  const unitTitle = u.titulo || u.title || "Unidad General";
                  // Crear Unidad
                  const unitDB = await prisma.studyUnit.create({
                      data: {
                          title: unitTitle,
                          grade: nivelRaw,
                          subjectId: subject.id
                      }
                  });

                  // Crear Resultados e Indicadores
                  const aprendizajes = u.aprendizajes || u.outcomes || [];
                  for (const apr of aprendizajes) {
                      const desc = typeof apr === "string" ? apr : (apr.descripcion || apr.description);
                      if (desc) {
                          const lo = await prisma.learningOutcome.create({
                              data: { description: desc, unitId: unitDB.id }
                          });
                          
                          // Indicadores asociados
                          const indicators = apr.indicadores || apr.indicators || [];
                          if (indicators.length > 0) {
                              for (const ind of indicators) {
                                  await prisma.indicator.create({ data: { description: ind, outcomeId: lo.id } });
                              }
                          } else {
                              // Si no hay indicadores explícitos, creamos uno espejo
                              await prisma.indicator.create({ data: { description: `Evidencia: ${desc}`, outcomeId: lo.id } });
                          }
                      }
                  }
              }
          }
          
          process.stdout.write("✅"); // Barra de progreso visual
          successCount++;

      } catch (err) {
          console.log(`\n❌ ERROR en archivo ${file}: ${err.message}`);
          errorCount++;
      }
  }

  console.log("\n\n---------------------------------------------------");
  console.log(`🏁 FINALIZADO: ${successCount} Cargados | ${errorCount} Errores.`);
  console.log("   Su base de datos ahora contiene el Currículo Nacional.");
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());