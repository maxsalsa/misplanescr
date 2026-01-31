const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  
  if (!adminUser) {
    console.error("❌ ERROR CRÍTICO: Max Salazar no existe en la DB.");
    return;
  }

  // ELIMINAR DATOS BASURA ANTERIORES (LIMPIEZA DE CALIDAD)
  // Opcional: Descomentar si quiere borrar los planes de prueba anteriores
  // await prisma.lessonPlan.deleteMany({ where: { subject: "Desarrollo Web" } });

  console.log("   -> Redactando Planeamiento Modelo: Desarrollo Web 12 (Frameworks)...");

  await prisma.lessonPlan.create({
    data: {
      title: "UNIDAD 1: Desarrollo Front-End con Frameworks Reactivos",
      subject: "Desarrollo Web",
      level: "12mo",
      status: "PUBLISHED",
      userId: adminUser.id,
      content: {
        // DATOS ADMINISTRATIVOS
        administrative: {
          period: "I Semestre 2026",
          modality: "Técnico Profesional",
          hours: "12 horas semanales"
        },

        // APRENDIZAJES ESPERADOS (DEL PDF OFICIAL)
        curriculum: {
          unit_name: "Programación del Lado del Cliente",
          learning_result: "Desarrollar interfaces web dinámicas utilizando frameworks basados en componentes (React/Vue).",
          essential_knowledge: ["Virtual DOM", "Componentes Funcionales", "Hooks y Estados", "Consumo de APIs"]
        },

        // MEDIACIÓN PEDAGÓGICA (4 MOMENTOS + DUA)
        mediation: [
          {
            moment: "1. CONEXIÓN (Enganche)",
            activity: "El docente presenta dos sitios web: uno estático (HTML puro) y uno reactivo (Facebook).",
            technique: "Debate guiado: ¿Por qué uno parpadea al navegar y el otro no?",
            dua_focus: "Proporcionar múltiples formas de representación (Visual)."
          },
          {
            moment: "2. COLABORACIÓN (Trabajo en Equipo)",
            activity: "En parejas, los estudiantes realizan un 'Code Review' de un script JS vainilla proporcionado por el docente, identificando líneas repetitivas que podrían ser componentes.",
            technique: "Aprendizaje entre pares (Peer Programming).",
            dua_focus: "Fomentar la colaboración y la comunidad."
          },
          {
            moment: "3. CONSTRUCCIÓN (Manos a la obra)",
            activity: "La persona estudiante construye una 'To-Do List' interactiva. Debe implementar: 1) Un componente para el Input, 2) Un componente para la Lista, 3) Gestión de Estado para borrar elementos.",
            evidence: "Repositorio en GitHub con el código fuente y despliegue en Vercel.",
            dua_focus: "Optimizar la elección y la autonomía (Permitir elegir el tema de la App)."
          },
          {
            moment: "4. CLARIFICACIÓN (Cierre)",
            activity: "Mesa redonda para analizar los errores comunes en el manejo de 'Props' y 'State'.",
            technique: "Metacognición y auto-reflexión."
          }
        ],

        // EVALUACIÓN TÉCNICA (INSTRUMENTOS REALES)
        evaluation: {
          technique: "Desempeño",
          instrument: "Rúbrica Analítica",
          indicators: [
            {
              desc: "Implementa componentes funcionales reutilizables.",
              levels: {
                high: "Crea componentes modulares, con props tipados y totalmente reutilizables.",
                medium: "Crea componentes, pero tienen dependencias rígidas o lógica mezclada.",
                low: "No logra separar la lógica en componentes independientes."
              }
            },
            {
              desc: "Gestiona el estado de la aplicación (State Management).",
              levels: {
                high: "Utiliza Hooks (useState/useEffect) eficientemente para la reactividad.",
                medium: "Logra reactividad parcial pero con renderizados innecesarios.",
                low: "La interfaz no responde a los cambios de datos en tiempo real."
              }
            }
          ]
        }
      }
    }
  });

  console.log("✅ PLANEAMIENTO 'GOLD STANDARD' CREADO CON ÉXITO.");
  console.log("   -> Redacción: Técnica y Formal.");
  console.log("   -> Metodología: DUA y 4 Momentos.");
  console.log("   -> Evaluación: Rúbrica Científica.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());