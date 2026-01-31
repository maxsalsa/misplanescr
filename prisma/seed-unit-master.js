const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// --- BANCO DE ESTRATEGIAS (BINOMIO SAGRADO) ---
const ESTRATEGIAS = [
  "La persona docente presenta un conflicto cognitivo. La persona estudiante debate posibles soluciones.",
  "La persona docente modela el uso de la herramienta. La persona estudiante ejecuta una práctica guiada.",
  "La persona docente facilita rúbricas de evaluación. La persona estudiante realiza co-evaluación de pares."
];

async function main() {
  console.log("🔥 INICIANDO INYECCIÓN MAESTRA POR UNIDAD...");
  
  if (!fs.existsSync(GOLD_DIR)) { console.log("❌ Sin datos GOLD."); return; }
  const files = fs.readdirSync(GOLD_DIR).filter(f => f.endsWith(".json"));
  let totalDocs = 0;

  const admin = await prisma.user.upsert({
      where: { email: "max@misplanescr.com" },
      update: {},
      create: { email: "max@misplanescr.com", role: "SUPER_ADMIN" }
  });

  for (const file of files) {
      try {
          const raw = fs.readFileSync(path.join(GOLD_DIR, file), "utf-8");
          const data = JSON.parse(raw);
          
          let name = data.materia || data.subjectName || file.replace(".json","").replace(/_/g, " ");
          name = name.charAt(0).toUpperCase() + name.slice(1);
          const code = (name.substring(0,4) + "-" + (data.nivel || "GEN")).toUpperCase();

          // 1. MATERIA
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: { 
                  name: name, 
                  educationLevel: "SECUNDARIA", 
                  modalityType: file.includes("TECNICO") ? "TECNICA" : "ACADEMICA" 
              }},
              update: {},
              create: { name: name, code, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
          });

          // 2. DETECTAR UNIDADES (LA CLAVE)
          let unidades = data.unidades || data.units || [];
          
          // Si no hay unidades explícitas, creamos una GENÉRICA basada en el archivo
          if (unidades.length === 0) {
              unidades = [{ 
                  titulo: `Unidad General: ${name}`, 
                  aprendizajes: data.aprendizajes || [`Fundamentos de ${name}`] 
              }];
          }

          // 3. ITERAR SOBRE CADA UNIDAD (ECOSISTEMA COMPLETO)
          for (const u of unidades) {
              const uTitle = u.titulo || u.title || "Unidad Sin Título";
              
              // A. CREAR UNIDAD EN BD
              const unitDB = await prisma.studyUnit.create({
                  data: { title: uTitle, grade: data.nivel || "General", subjectId: subject.id }
              });

              // Guardar Aprendizajes
              const rawAps = u.aprendizajes || u.outcomes || [];
              let indicators = [];
              for (const ap of rawAps) {
                   const txt = typeof ap === "string" ? ap : ap.descripcion;
                   if (txt) {
                       const lo = await prisma.learningOutcome.create({ data: { description: txt, unitId: unitDB.id } });
                       await prisma.indicator.create({ data: { description: `Ind: ${txt}`, outcomeId: lo.id } });
                       indicators.push(txt);
                   }
              }
              if (indicators.length === 0) indicators.push(`Contenidos generales de ${uTitle}`);

              // --- GENERAR DOCUMENTOS PARA ESTA UNIDAD ESPECÍFICA ---
              
              // 1. PLAN DE PRÁCTICA PEDAGÓGICA (TRABAJO COTIDIANO)
              await prisma.lessonPlan.create({
                  data: {
                      title: `Plan Unidad: ${uTitle}`,
                      userId: admin.id,
                      status: "PUBLISHED",
                      content: {
                          unidad: uTitle,
                          estrategias: {
                              focalizacion: "Lluvia de ideas y preguntas generadoras.",
                              exploracion: ESTRATEGIAS[0],
                              contrastacion: ESTRATEGIAS[1],
                              aplicacion: ESTRATEGIAS[2]
                          },
                          rubrica: { inicial: "Cita", intermedio: "Caracteriza", avanzado: "Analiza" }
                      }
                  }
              });

              // 2. TAREA CORTA (REFORZAMIENTO)
              await prisma.assessment.create({
                  data: {
                      title: `Tarea Corta: ${uTitle}`,
                      type: "TAREA",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: { instruccion: "Resuelva los ejercicios asignados en clase." },
                      rubric: { criterio: "Puntualidad y Contenido", escala: "1-5" }
                  }
              });

              // 3. PROYECTO (SOLO SI ES UNIDAD GRANDE O TÉCNICA)
              await prisma.assessment.create({
                  data: {
                      title: `Proyecto: Aplicación de ${name}`,
                      type: "PROYECTO",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: { fases: ["Investigación", "Desarrollo", "Defensa"] },
                      rubric: { criterio: "Innovación", escala: "1-10" }
                  }
              });

              // 4. PORTAFOLIO DE EVIDENCIAS
              await prisma.assessment.create({
                  data: {
                      title: `Portafolio: Evidencias de ${uTitle}`,
                      type: "PORTAFOLIO",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: { instruccion: "Seleccione sus 3 mejores trabajos y reflexione." }
                  }
              });

              // 5. PRUEBA ESCRITA (TABLA DE ESPECIFICACIONES)
              await prisma.assessment.create({
                  data: {
                      title: `Prueba Escrita: ${uTitle}`,
                      type: "EXAMEN",
                      userId: admin.id,
                      subjectId: subject.id,
                      specsTable: { 
                          puntos: 40, 
                          indicadores: indicators.slice(0, 4) 
                      },
                      content: { partes: ["Selección", "Respuesta Corta", "Desarrollo"] }
                  }
              });
              
               // 6. TRIVIA (GAMIFICACIÓN)
              await prisma.assessment.create({
                  data: {
                      title: `Trivia: Repaso de ${uTitle}`,
                      type: "JUEGO",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: { q: "¿Verdadero o Falso?", a: ["V", "F"], correct: 0 }
                  }
              });

              totalDocs += 6;
          }
          process.stdout.write("✨");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ INYECCIÓN MAESTRA COMPLETADA: ${totalDocs} DOCUMENTOS GENERADOS.`);
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());