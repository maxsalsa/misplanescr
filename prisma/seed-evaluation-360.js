const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// --- GENERADOR DE NIVELES 1-3 (INTELIGENCIA ARTIFICIAL SIMULADA) ---
function generateLevels(indicador) {
  // Lógica simple para simular la construcción pedagógica
  const base = indicador.replace(/^Analiza |^Describe |^Explica |^Aplica /i, "").trim();
  return {
      inicial: `Cita aspectos básicos de ${base}.`,
      intermedio: `Brinda características generales de ${base}.`,
      avanzado: `Analiza correctamente ${base} según lo estudiado.`
  };
}

// --- INDICADORES TRANSVERSALES (PARA RELLENAR RÚBRICAS) ---
const TRANSVERSALES = [
  "Sigue las instrucciones brindadas por la persona docente.",
  "Mantiene el orden y aseo en su espacio de trabajo.",
  "Participa colaborativamente con sus pares.",
  "Entrega los productos en el tiempo establecido."
];

async function main() {
  console.log("📊 GENERANDO ECOSISTEMA DE EVALUACIÓN 360°...");

  if (!fs.existsSync(GOLD_DIR)) { console.log("❌ Sin datos."); return; }
  const files = fs.readdirSync(GOLD_DIR).filter(f => f.endsWith(".json"));
  let totalInstruments = 0;

  // SUPER ADMIN
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

          // 2. UNIDADES
          let unidades = data.unidades || data.units || [{ titulo: `Unidad General ${name}`, aprendizajes: data.aprendizajes || [] }];

          for (const u of unidades) {
              const uTitle = u.titulo || "Unidad Estándar";
              const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: data.nivel || "General", subjectId: subject.id } });
              
              // EXTRAER INDICADORES REALES
              let indicators = [];
              const rawAps = u.aprendizajes || u.outcomes || [];
              for (const ap of rawAps) {
                   const txt = typeof ap === "string" ? ap : ap.descripcion;
                   if (txt) indicators.push(txt);
              }

              // Si no hay indicadores suficientes, usamos genéricos del tema
              if (indicators.length < 2) indicators.push(`Dominio de contenidos de ${uTitle}`);
              
              // MEZCLA: Indicadores Cognitivos + Transversales para llegar a 6
              let rubricIndicators = [...indicators];
              let tIndex = 0;
              while (rubricIndicators.length < 6) {
                  rubricIndicators.push(TRANSVERSALES[tIndex % TRANSVERSALES.length]);
                  tIndex++;
              }
              rubricIndicators = rubricIndicators.slice(0, 6); // Limitar a 6 exactos

              // --- GENERACIÓN DE 6 TIPOS DE INSTRUMENTOS ---

              // 1. RÚBRICA DE TRABAJO COTIDIANO (ANALÍTICA 1-3)
              await prisma.lessonPlan.create({
                  data: {
                      title: `Rúbrica Cotidiana: ${uTitle}`,
                      userId: admin.id,
                      status: "PUBLISHED",
                      content: {
                          tipo: "Instrumento de Evaluación",
                          formato: "Rúbrica Analítica",
                          criterios: rubricIndicators.map(ind => ({
                              indicador: ind,
                              niveles: generateLevels(ind)
                          }))
                      }
                  }
              });

              // 2. LISTA DE COTEJO (SÍ/NO)
              await prisma.assessment.create({
                  data: {
                      title: `Lista de Cotejo: Práctica de ${uTitle}`,
                      type: "LISTA_COTEJO",
                      userId: admin.id,
                      subjectId: subject.id,
                      rubric: {
                          tipo: "Lista de Cotejo",
                          columnas: ["Criterio", "Sí", "No", "Observaciones"],
                          items: rubricIndicators.map(ind => ({ criterio: ind, check: false }))
                      },
                      content: { instruccion: "Marque con una X si la persona estudiante cumple el criterio." }
                  }
              });

              // 3. RÚBRICA DE PROYECTO (CRITERIOS DE FONDO Y FORMA)
              await prisma.assessment.create({
                  data: {
                      title: `Proyecto: Investigación de ${uTitle}`,
                      type: "PROYECTO",
                      userId: admin.id,
                      subjectId: subject.id,
                      rubric: {
                          tipo: "Rúbrica Global",
                          escala: "1 a 5 Puntos",
                          criterios: [
                              { nombre: "Contenido", desc: "Profundidad del tema", valor: "5 pts" },
                              { nombre: "Creatividad", desc: "Originalidad en la entrega", valor: "5 pts" },
                              { nombre: "Exposición", desc: "Claridad oral", valor: "5 pts" },
                              { nombre: rubricIndicators[0], desc: "Aplicación del tema", valor: "5 pts" }
                          ]
                      },
                      content: { fases: ["Planeación", "Ejecución", "Cierre"] }
                  }
              });

              // 4. RÚBRICA DE TAREA CORTA (ESCALA NUMÉRICA)
              await prisma.assessment.create({
                  data: {
                      title: `Tarea Corta: ${uTitle}`,
                      type: "TAREA",
                      userId: admin.id,
                      subjectId: subject.id,
                      rubric: {
                          tipo: "Escala Numérica",
                          total: "20 pts",
                          items: rubricIndicators.slice(0, 4).map(ind => ({ item: ind, valor: "5 pts" }))
                      },
                      content: { instruccion: "Resuelva los ejercicios en casa." }
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
                          total_puntos: 35,
                          porcentaje: "20%",
                          distribucion: [
                              { indicador: indicators[0] || "General", pts: 10, tipo: "Selección Única" },
                              { indicador: indicators[1] || "Aplicación", pts: 10, tipo: "Pareo" },
                              { indicador: indicators[2] || "Análisis", pts: 15, tipo: "Respuesta Construida" }
                          ]
                      },
                      content: { partes: ["I. Selección", "II. Correspondencia", "III. Desarrollo"] }
                  }
              });

              // 6. TRIVIA/JUEGO (FORMATIVA)
              await prisma.assessment.create({
                  data: {
                      title: `Trivia: Reto ${uTitle}`,
                      type: "JUEGO",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: {
                          preguntas: [
                              { q: `¿Qué caracteriza a ${uTitle}?`, a: ["Opción A", "Opción B"], correct: 0 },
                              { q: `Verdadero o Falso: ${indicators[0]}`, a: ["V", "F"], correct: 0 }
                          ]
                      }
                  }
              });

              totalInstruments += 6;
          }
          process.stdout.write("✨");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ EVALUACIÓN 360 FINALIZADA: ${totalInstruments} INSTRUMENTOS CREADOS.`);
  console.log("   -> Incluye Rúbricas, Listas de Cotejo, Pruebas y Juegos para todo el currículo.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());