const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 INICIANDO CARGA OMNI-DIRECTIONAL...");

  // 1. ESTRATEGIAS LÚDICAS (GAMIFICACIÓN)
  const games = [
    {
      title: "Trivia Explosiva (Repaso)",
      category: "JUEGO",
      adaptationTag: "UNIVERSAL",
      content: "El docente divide la clase en equipos. Se proyectan preguntas de selección única con temporizador (estilo Kahoot). Cada respuesta correcta suma puntos para un incentivo grupal."
    },
    {
      title: "Escape Room Educativo",
      category: "DINAMICA",
      adaptationTag: "ALTA_DOTACION",
      content: "El docente esconde pistas relacionadas con el tema en el aula. Los estudiantes deben resolver problemas matemáticos o lógicos para encontrar la 'llave' y salir al recreo."
    },
    {
      title: "Bingo de Conceptos",
      category: "JUEGO",
      adaptationTag: "UNIVERSAL",
      content: "El docente dicta definiciones. El estudiante marca el concepto correspondiente en su cartón de Bingo. Refuerza la asociación memoria-concepto."
    }
  ];

  for (const g of games) {
    await prisma.pedagogicalStrategy.create({ data: g });
  }
  console.log("✅ Gamificación cargada.");

  // 2. PLANTILLAS DE EVALUACIÓN (SIMULACROS)
  // Aquí simulamos crear un "Examen Base" en la cuenta del Super Admin
  const admin = await prisma.user.findUnique({ where: { email: "max@misplanescr.com" } });
  
  if (admin) {
      await prisma.assessment.create({
        data: {
            title: "Simulacro Prueba Nacional Estandarizada (Matemáticas)",
            type: "SIMULACRO",
            userId: admin.id,
            content: {
                instructions: "Seleccione la respuesta correcta. Tiempo: 120 min.",
                items: [
                    { question: "¿Cuál es el valor de x en 2x + 4 = 10?", options: ["2", "3", "4", "5"], correct: "3" },
                    { question: "¿Área de un cuadrado de lado 5?", options: ["10", "20", "25", "50"], correct: "25" }
                ]
            }
        }
      });
      console.log("✅ Banco de Simulacros iniciado.");
  }

  // 3. SISTEMA DE NOTIFICACIONES (PRUEBA)
  if (admin) {
      await prisma.notification.create({
          data: {
              userId: admin.id,
              type: "INFO",
              message: "Bienvenido al Sistema Omni-Directional v4.0. El módulo de trámites está activo.",
              read: false
          }
      });
      console.log("✅ Sistema de Notificaciones probado.");
  }

  console.log("🏁 SISTEMA TOTAL (ACADÉMICO + ADMIN + LÚDICO) LISTO.");
}

main().catch(e => {console.error(e);process.exit(1)}).finally(async()=>{await prisma.$disconnect()});