const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

async function main() {
  console.log("🔍 GENERANDO DIAGNÓSTICO INTEGRAL (COGNITIVO + SOCIOAFECTIVO + PSICOMOTOR)...");

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

          // --- GENERACIÓN DE INSTRUMENTOS SEGÚN PDF 2011 ---

          // A. TÉCNICA R.R.P.C.C. (Cognitivo/Reflexivo - Para todos)
          await prisma.assessment.create({
              data: {
                  title: `Diagnóstico R.R.P.C.C.: Inicio de ${name}`,
                  type: "DIAGNOSTICO",
                  userId: admin.id,
                  subjectId: subject.id,
                  content: {
                      tecnica: "R.R.P.C.C. (Recordar, Resumir, Preguntar, Conectar, Comentar)",
                      instrucciones: "La persona estudiante completará el siguiente cuadro en 10 minutos:",
                      pasos: [
                          { paso: "Recordar", accion: "Escriba 3 conceptos clave del año anterior." },
                          { paso: "Resumir", accion: "Sintetice en una oración qué espera aprender." },
                          { paso: "Preguntar", accion: "Plantee una duda que tenga sobre la materia." },
                          { paso: "Conectar", accion: "¿Cómo se relaciona esto con su vida diaria?" },
                          { paso: "Comentar", accion: "¿Cómo se siente ante este nuevo reto?" }
                      ]
                  }
              }
          });

          // B. ESCALA DE CALIFICACIÓN (Socioafectivo - Actitudes)
          await prisma.assessment.create({
              data: {
                  title: `Escala Gráfica: Actitudes hacia ${name}`,
                  type: "DIAGNOSTICO",
                  userId: admin.id,
                  subjectId: subject.id,
                  rubric: {
                      tipo: "Escala Gráfica Descriptiva",
                      criterios: [
                          { rasgo: "Interés por la materia", niveles: ["Le aburre", "Neutral", "Le apasiona"] },
                          { rasgo: "Trabajo en equipo", niveles: ["Prefiere solo", "Coopera a veces", "Lidera/Apoya"] },
                          { rasgo: "Autonomía", niveles: ["Dependiente", "Sigue instrucciones", "Proactivo"] }
                      ]
                  },
                  content: { instruccion: "Marque con una X la posición que mejor describa a la persona estudiante." }
              }
          });

          // C. LISTA DE COTEJO PSICOMOTORA (Solo si es Técnico o Primaria/Artes)
          // Fundamental según PDF pág. 13
          if (isTecnico || isPrimaria || name.includes("Física") || name.includes("Artes")) {
              await prisma.assessment.create({
                  data: {
                      title: `Diagnóstico Psicomotor: Habilidades Prácticas`,
                      type: "DIAGNOSTICO",
                      userId: admin.id,
                      subjectId: subject.id,
                      rubric: {
                          tipo: "Lista de Cotejo",
                          items: [
                              { criterio: "Coordinación viso-manual al utilizar herramientas", check: false },
                              { criterio: "Organización espacial del área de trabajo", check: false },
                              { criterio: "Postura corporal ergonómica", check: false },
                              { criterio: "Precisión en el trazo / corte / ejecución", check: false }
                          ]
                      }
                  }
              });
              totalDocs++;
          }

          // D. AUTOASESORÍA (Socioafectivo Profundo - PDF pág. 25)
          // Excelente para detectar barreras de aprendizaje o prejuicios
          await prisma.assessment.create({
              data: {
                  title: `Autoasesoría: Mis Paradigmas sobre ${name}`,
                  type: "DIAGNOSTICO",
                  userId: admin.id,
                  subjectId: subject.id,
                  content: {
                      tecnica: "Autoasesoría (Anónima)",
                      casos: [
                          "Caso A: 'Creo que esta materia es muy difícil y no sirvo para esto'.",
                          "Caso B: 'Me gusta aprender pero me da miedo preguntar'."
                      ],
                      pregunta: "¿Con cuál caso se identifica más y por qué?",
                      objetivo: "Detectar barreras emocionales antes de iniciar contenidos."
                  }
              }
          });

          totalDocs += 3;
          process.stdout.write("🔍");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ INYECCIÓN DIAGNÓSTICA FINALIZADA: ${totalDocs} INSTRUMENTOS.`);
  console.log("   -> Se aplicaron técnicas oficiales del documento MEP 2011.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());