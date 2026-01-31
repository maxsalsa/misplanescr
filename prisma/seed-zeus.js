const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// --- BANCO DE ESTRATEGIAS ---
const INICIO = [ "Docente plantea pregunta retadora.", "Docente muestra video introductorio.", "Lluvia de ideas sobre conocimientos previos." ];
const DESARROLLO = [ "Estudiantes crean mapa mental.", "Análisis de casos en subgrupos.", "Resolución de práctica guiada." ];
const CIERRE = [ "Plenaria de conclusiones.", "Trivia rápida de comprobación.", "Boleto de salida." ];
function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function main() {
  console.log("⚡ ZEUS V2: INYECCIÓN FORZADA DE RECURSOS...");

  if (!fs.existsSync(GOLD_DIR)) { console.error("❌ ERROR: Falta GOLD_DATA."); return; }
  const files = fs.readdirSync(GOLD_DIR).filter(f => f.endsWith(".json"));
  let totalRecursos = 0;

  // SUPER ADMIN
  const admin = await prisma.user.upsert({
      where: { email: "max@misplanescr.com" },
      update: {},
      create: { email: "max@misplanescr.com", name: "Max Salazar", role: "SUPER_ADMIN", subscriptionStatus: "ULTRA" }
  });

  for (const file of files) {
      try {
          const raw = fs.readFileSync(path.join(GOLD_DIR, file), "utf-8");
          if (raw.length < 50) continue;
          const data = JSON.parse(raw);
          
          let materiaName = (data.materia || data.subjectName || file.replace(".json","")).replace(/_/g, " ");
          materiaName = materiaName.charAt(0).toUpperCase() + materiaName.slice(1);
          const isPrimaria = file.toLowerCase().includes("ciclo");
          const modType = file.toLowerCase().includes("tecnico") ? "TECNICA" : "ACADEMICA";
          const code = (materiaName.substring(0,4) + "-" + (data.nivel || "GEN")).toUpperCase().replace(/\s/g, "");

          // 1. MATERIA
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: { name: materiaName, educationLevel: isPrimaria ? "PRIMARIA" : "SECUNDARIA", modalityType: modType }},
              update: {},
              create: { name: materiaName, code, educationLevel: isPrimaria ? "PRIMARIA" : "SECUNDARIA", modalityType: modType }
          });

          // 2. UNIDADES (BUSCADOR FLEXIBLE)
          // Busca 'unidades', 'units', 'modules', o usa un array vacío
          const unidades = data.unidades || data.units || data.modules || [];
          
          if (unidades.length > 0) {
              for (let i = 0; i < unidades.length; i++) {
                  const u = unidades[i];
                  const unitTitle = u.titulo || u.title || u.name || `Unidad ${i+1}`;
                  
                  // Crear Unidad
                  const unitDB = await prisma.studyUnit.create({
                      data: { title: unitTitle, grade: data.nivel || "General", subjectId: subject.id }
                  });

                  // 3. APRENDIZAJES (BUSCADOR FLEXIBLE)
                  // Busca 'aprendizajes', 'outcomes', 'indicators', 'criteria'
                  const rawOutcomes = u.aprendizajes || u.outcomes || u.indicators || u.criteria || [];
                  let indicadoresTexto = [];

                  for (const item of rawOutcomes) {
                      // Intenta extraer texto de cualquier estructura
                      let desc = "";
                      if (typeof item === "string") desc = item;
                      else if (item.descripcion) desc = item.descripcion;
                      else if (item.description) desc = item.description;
                      else if (item.text) desc = item.text;
                      
                      if (desc && desc.length > 5) {
                          const lo = await prisma.learningOutcome.create({ data: { description: desc, unitId: unitDB.id } });
                          await prisma.indicator.create({ data: { description: `Ind: ${desc}`, outcomeId: lo.id } });
                          indicadoresTexto.push(desc);
                      }
                  }

                  // 4. GENERACIÓN DE EJEMPLOS (SI ENCONTRAMOS AL MENOS 1 INDICADOR)
                  if (indicadoresTexto.length > 0) {
                      const planTitle = `Plan de Unidad: ${unitTitle.substring(0, 40)}`;
                      
                      // A. PLAN
                      await prisma.lessonPlan.create({
                          data: {
                              title: planTitle,
                              userId: admin.id,
                              status: "PUBLISHED",
                              content: {
                                  unidad: unitTitle,
                                  aprendizajes: indicadoresTexto.slice(0,3),
                                  estrategias: { inicio: getRandom(INICIO), desarrollo: getRandom(DESARROLLO), cierre: getRandom(CIERRE) },
                                  rubrica: { inicial: "Cita...", intermedio: "Caracteriza...", avanzado: "Analiza..." }
                              }
                          }
                      });

                      // B. EXAMEN
                      await prisma.assessment.create({
                          data: {
                              title: `Prueba: ${unitTitle}`,
                              type: "EXAMEN",
                              userId: admin.id,
                              subjectId: subject.id,
                              specsTable: { pts: 30, content: indicadoresTexto.slice(0,3) },
                              content: { instruccion: "Responda correctamente." }
                          }
                      });

                      totalRecursos += 2;
                  }
              }
          }
          process.stdout.write(".");
      } catch (e) { /* silent */ }
  }

  console.log(`\n\n✅ INYECCIÓN FINALIZADA.`);
  console.log(`   🚀 SE GENERARON ${totalRecursos} RECURSOS PEDAGÓGICOS.`);
}

main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());