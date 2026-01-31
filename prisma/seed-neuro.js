const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const GOLD_DIR = path.join(__dirname, "seeds", "GOLD_DATA");

// --- BANCO DE PAUSAS ACTIVAS (NEUROCIENCIA APLICADA) ---
const PAUSAS = [
  {
      tipo: "Gimnasia Cerebral",
      titulo: "El Ocho Perezoso",
      desc: "Los estudiantes dibujan ochos acostados en el aire con el pulgar. Mejora la integración hemisférica y el enfoque visual."
  },
  {
      tipo: "Activación Física",
      titulo: "Estatuas Musicales",
      desc: "Los estudiantes se mueven libremente y deben congelarse en una postura de equilibrio cuando el docente da la señal. Reactiva el flujo sanguíneo."
  },
  {
      tipo: "Enfoque y Calma",
      titulo: "Respiración 4-7-8",
      desc: "Inhalar en 4 segundos, retener 7 y exhalar en 8. Reduce la ansiedad antes de una práctica compleja."
  },
  {
      tipo: "Coordinación",
      titulo: "Manos Cruzadas (Gateo)",
      desc: "Tocar rodilla izquierda con codo derecho y viceversa rítmicamente. Activa ambos hemisferios cerebrales."
  },
  {
      tipo: "Estiramiento",
      titulo: "La Cosecha de Manzanas",
      desc: "Estirarse hacia el techo como intentando alcanzar objetos altos, alternando brazos. Descomprime la columna vertebral."
  }
];

async function main() {
  console.log("🧠 GENERANDO PLANES NEURO-EDUCATIVOS...");

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
          
          // Crear Materia
          const subject = await prisma.subject.upsert({
              where: { name_educationLevel_modalityType: { name: name, educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }},
              update: {},
              create: { name: name, code: name.substring(0,4).toUpperCase(), educationLevel: "SECUNDARIA", modalityType: "ACADEMICA" }
          });

          // Unidades
          let unidades = data.unidades || [{ titulo: `Unidad General ${name}`, aprendizajes: [`Dominio de ${name}`] }];

          for (const u of unidades) {
              const uTitle = u.titulo || "Unidad Estándar";
              const unitDB = await prisma.studyUnit.create({ data: { title: uTitle, grade: data.nivel || "General", subjectId: subject.id } });

              // Seleccionar una Pausa Aleatoria
              const pausa = PAUSAS[Math.floor(Math.random() * PAUSAS.length)];

              // --- CREAR PLAN CON PAUSA INTEGRADA ---
              await prisma.lessonPlan.create({
                  data: {
                      title: `Plan Neuro-Activo: ${uTitle}`,
                      userId: admin.id,
                      status: "PUBLISHED",
                      content: {
                          unidad: uTitle,
                          duracion_estimada: "120 minutos (3 lecciones)",
                          estrategias: {
                              focalizacion: "La persona docente inicia con una pregunta detonadora. La persona estudiante comparte saberes previos.",
                              exploracion: "La persona docente facilita la teoría mediante videos interactivos. La persona estudiante toma apuntes gráficos.",
                              
                              // AQUÍ ESTÁ LA MAGIA: LA PAUSA INSERTADA
                              pausa_activa: {
                                  icono: "⚡",
                                  nombre: pausa.titulo,
                                  tipo: pausa.tipo,
                                  duracion: "5-7 minutos",
                                  instruccion: `INTERVENCIÓN: ${pausa.desc} Objetivo: Recargar energía para la siguiente fase.`
                              },

                              contrastacion: "La persona estudiante, ya reactivada, realiza un análisis comparativo en grupos.",
                              aplicacion: "La persona docente asigna el reto final. La persona estudiante construye la solución."
                          },
                          rubrica: { inicial: "Cita", intermedio: "Describe", avanzado: "Aplica" }
                      }
                  }
              });
              
              totalDocs++;
          }
          process.stdout.write("⚡");
      } catch (e) { /* silent */ }
  }
  
  console.log(`\n✅ PROTOCOLO NEURO COMPLETADO: ${totalDocs} PLANES CON PAUSAS ACTIVAS.`);
  console.log("   -> Se insertaron rutinas de Gimnasia Cerebral, Estiramiento y Enfoque.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());