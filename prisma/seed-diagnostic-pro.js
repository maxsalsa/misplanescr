const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

async function main() {
  console.log("📡 GENERANDO INSTRUMENTOS DIAGNÓSTICOS MEP (COGNITIVO, SOCIOAFECTIVO, PSICOMOTOR)...");

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
          
          const isTecnico = file.includes("TECNICO") || file.includes("Informatica");
          const isPrimaria = file.toLowerCase().includes("ciclo");

          // 1. MATERIA
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: { name: name, educationLevel: isPrimaria ? "PRIMARIA" : "SECUNDARIA", modalityType: isTecnico ? "TECNICA" : "ACADEMICA" }},
              update: {},
              create: { name: name, code: name.substring(0,4).toUpperCase(), educationLevel: isPrimaria ? "PRIMARIA" : "SECUNDARIA", modalityType: isTecnico ? "TECNICA" : "ACADEMICA" }
          });

          // UNIDAD INICIAL (CONTEXTO)
          const uTitle = "Diagnóstico Inicial y Contextualización";
          const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: "General", subjectId: subject.id } });

          // --- A. DIMENSIÓN COGNITIVA (PRUEBA O KPSI) ---
          await prisma.assessment.create({
              data: {
                  title: `Diagnóstico Cognitivo: Prerrequisitos de ${name}`,
                  type: "DIAGNOSTICO",
                  userId: admin.id,
                  subjectId: subject.id,
                  content: {
                      dimension: "Cognitiva",
                      instrumento: "Prueba Escrita No Estandarizada",
                      objetivo: "Determinar el dominio de conductas previas.",
                      partes: [
                          { tipo: "Selección", items: "5 ítems sobre conceptos base." },
                          { tipo: "Respuesta Construida", items: "Resolución de 2 problemas fundamentales." }
                      ],
                      accion_remedial: "Si la nota es < 60, activar Plan de Nivelación."
                  }
              }
          });

          // --- B. DIMENSIÓN SOCIOAFECTIVA (ESCALA DE CALIFICACIÓN) ---
          // Basado en [cite: 129] Aspectos Socioafectivos
          await prisma.assessment.create({
              data: {
                  title: `Diagnóstico Socioafectivo: Adaptación y Grupo`,
                  type: "DIAGNOSTICO",
                  userId: admin.id,
                  subjectId: subject.id,
                  rubric: {
                      titulo: "Escala Gráfica Descriptiva",
                      criterios: [
                          { rasgo: "Trabajo Colaborativo", niveles: ["Se aísla", "Participa pasivamente", "Coopera activamente"] },
                          { rasgo: "Respeto a normas", niveles: ["Frecuentes interrupciones", "A veces interrumpe", "Respeta el turno"] },
                          { rasgo: "Interés por la materia", niveles: ["Desmotivado", "Interés ocasional", "Alta motivación"] }
                      ]
                  },
                  content: {
                      dimension: "Socioafectiva",
                      tecnica: "Observación Sistemática",
                      instruccion: "Observe al grupo durante la primera semana y marque el nivel predominante."
                  }
              }
          });

          // --- C. DIMENSIÓN PSICOMOTORA (LISTA DE COTEJO) ---
          // Crucial para talleres técnicos o educación física [cite: 154]
          if (isTecnico || isPrimaria) {
              await prisma.assessment.create({
                  data: {
                      title: `Diagnóstico Psicomotor: Habilidades de Taller/Aula`,
                      type: "DIAGNOSTICO",
                      userId: admin.id,
                      subjectId: subject.id,
                      rubric: {
                          titulo: "Lista de Cotejo (Sí/No)",
                          items: [
                              { criterio: "Manejo adecuado de herramientas/lápiz", check: false },
                              { criterio: "Coordinación óculo-manual en tareas finas", check: false },
                              { criterio: "Organización espacial en el área de trabajo", check: false },
                              { criterio: "Postura corporal adecuada", check: false }
                          ]
                      },
                      content: {
                          dimension: "Psicomotora",
                          uso: "Detección de dificultades motoras que afecten la seguridad o la escritura."
                      }
                  }
              });
              totalDocs++;
          }

          // --- D. REGISTRO ANECDÓTICO (PLANTILLA) ---
          // Basado en 
          await prisma.assessment.create({
              data: {
                  title: `Plantilla: Registro Anecdótico`,
                  type: "ADMINISTRATIVO",
                  userId: admin.id,
                  subjectId: subject.id,
                  content: {
                      estructura: {
                          datos: ["Estudiante", "Fecha", "Hora", "Actividad"],
                          descripcion: "Descripción objetiva del incidente (sin interpretar).",
                          interpretacion: "Valoración del docente.",
                          accion: "Medida tomada."
                      },
                      ejemplo: "El estudiante X mostró frustración al fallar en el código, golpeando el teclado (Descripción). Posible baja tolerancia a la frustración (Interpretación)."
                  }
              }
          });

          totalDocs += 3;
          process.stdout.write("📡");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ PROTOCOLO RADAR COMPLETADO: ${totalDocs} INSTRUMENTOS DE DIAGNÓSTICO CREADOS.`);
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());