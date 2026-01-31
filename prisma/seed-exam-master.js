const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

async function main() {
  console.log("🎓 GENERANDO PRUEBAS ESCRITAS CON FORMATO OFICIAL...");
  
  if (!fs.existsSync(GOLD_DIR)) { console.log("❌ Sin datos."); return; }
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
              where: { name_educationLevel_modalityType: { name: name, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
              update: {},
              create: { name: name, code, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
          });

          // 2. UNIDADES
          let unidades = data.unidades || [{ titulo: `Unidad General ${name}`, aprendizajes: [`Fundamentos de ${name}`] }];

          for (const u of unidades) {
              const uTitle = u.titulo || "Unidad Estándar";
              const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: data.nivel || "General", subjectId: subject.id } });
              
              // Extraer indicadores (Mínimo 6 para poder evaluar bien)
              let indicators = [];
              const rawAps = u.aprendizajes || u.outcomes || [];
              for (const ap of rawAps) {
                   const txt = typeof ap === "string" ? ap : ap.descripcion;
                   if (txt) indicators.push(txt);
              }
              while (indicators.length < 6) indicators.push(`Dominio conceptual de ${uTitle} (Parte ${indicators.length+1})`);

              // --- A. LA PRUEBA ESCRITA (ESTRUCTURA REAL) ---
              await prisma.assessment.create({
                  data: {
                      title: `Prueba Escrita: ${uTitle}`,
                      type: "EXAMEN",
                      userId: admin.id,
                      subjectId: subject.id,
                      specsTable: { 
                          puntos_totales: 40, 
                          porcentaje: "20%",
                          tiempo: "80 minutos",
                          detalle_puntos: [
                              { parte: "I. Selección", pts: 10 },
                              { parte: "II. Pareo", pts: 10 },
                              { parte: "III. Respuesta Construida", pts: 20 }
                          ]
                      },
                      content: {
                          encabezado: {
                              institucion: "Centro Educativo",
                              periodo: "I Periodo 2026",
                              docente: "Lic. Max Salazar",
                              valor: "20%",
                              puntos: "40 pts"
                          },
                          instrucciones_generales: [
                              "Lea cuidadosamente las instrucciones específicas.",
                              "Utilice bolígrafo de tinta azul o negra.",
                              "No utilice corrector ni hojas adicionales sin sello."
                          ],
                          parte_1_seleccion: indicators.slice(0,5).map((ind, i) => ({
                              pregunta: `Pregunta base sobre: ${ind.substring(0,30)}...`,
                              opciones: ["A) Opción Incorrecta", "B) Opción Correcta", "C) Opción Distractora"],
                              valor: "1 pto c/u"
                          })),
                          parte_2_pareo: {
                              columna_A: ["Concepto 1", "Concepto 2", "Concepto 3", "Concepto 4"],
                              columna_B: ["Definición 1", "Definición 2", "Definición 3", "Definición 4", "Distractor"]
                          },
                          parte_3_desarrollo: [
                              { pregunta: `Explique detalladamente la importancia de: ${indicators[0]}`, valor: "5 pts" },
                              { pregunta: `Resuelva el siguiente problema práctico sobre: ${indicators[1]}`, valor: "15 pts" }
                          ]
                      }
                  }
              });

              // --- B. TAREA CORTA (RÚBRICA DE 6 CRITERIOS) ---
              await prisma.assessment.create({
                  data: {
                      title: `Tarea Corta #1: ${uTitle}`,
                      type: "TAREA",
                      userId: admin.id,
                      subjectId: subject.id,
                      content: { instruccion: "Realice un mapa conceptual en casa sobre los temas vistos." },
                      rubric: {
                          titulo: "Instrumento de Evaluación",
                          criterios: [
                              { nombre: "Puntualidad", desc: "Entrega en fecha indicada.", escala: "1-3" },
                              { nombre: "Contenido", desc: "Abarca los conceptos clave.", escala: "1-3" },
                              { nombre: "Jerarquía", desc: "Orden lógico de ideas.", escala: "1-3" },
                              { nombre: "Ortografía", desc: "Uso correcto del idioma.", escala: "1-3" },
                              { nombre: "Creatividad", desc: "Diseño visual propio.", escala: "1-3" },
                              { nombre: "Bibliografía", desc: "Cita fuentes consultadas.", escala: "1-3" }
                          ]
                      }
                  }
              });

              // --- C. TRABAJO COTIDIANO (RÚBRICA DE PROCESO 6 CRITERIOS) ---
              await prisma.lessonPlan.create({
                  data: {
                      title: `Plan Unidad: ${uTitle}`,
                      userId: admin.id,
                      status: "PUBLISHED",
                      content: {
                          unidad: uTitle,
                          estrategias: { inicio: "Lluvia de ideas", desarrollo: "Práctica guiada", cierre: "Plenaria" },
                          rubrica_cotidiano: [
                              { indicador: indicators[0], niveles: { 1:"Cita", 2:"Describe", 3:"Analiza" } },
                              { indicador: indicators[1], niveles: { 1:"Cita", 2:"Describe", 3:"Analiza" } },
                              { indicador: indicators[2], niveles: { 1:"Cita", 2:"Describe", 3:"Analiza" } },
                              { indicador: "Trabajo en equipo", niveles: { 1:"No participa", 2:"Participa poco", 3:"Lidera" } },
                              { indicador: "Orden y Aseo", niveles: { 1:"Desordenado", 2:"Regular", 3:"Impecable" } },
                              { indicador: "Cumplimiento de materiales", niveles: { 1:"No trae", 2:"Incompleto", 3:"Completo" } }
                          ]
                      }
                  }
              });

              totalDocs += 3;
          }
          process.stdout.write("✨");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ PROTOCOLO MAGISTER COMPLETADO: ${totalDocs} DOCUMENTOS OFICIALES.`);
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());