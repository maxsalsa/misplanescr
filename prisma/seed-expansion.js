const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// IMPORTAMOS EL BANCO (SIMULADO PARA EL SCRIPT)
const STRATEGIES = {
  ARTS: { c: "Apreciación de Obra Abstracta", a: "Taller de Acuarela", e: "Lienzo" },
  SPORTS: { c: "Video NBA: Análisis Táctico", a: "Circuito Funcional", e: "Registro FC" },
  LANG: { c: "Canción en Francés (Stromae)", a: "Roleplay: En el Restaurante", e: "Audio" },
  RELIGION: { c: "Parábola Moderna", a: "Drama Creativo", e: "Guion" },
  MATH: { c: "Problema de la Vida Real (Finanzas)", a: "Resolución en Pizarra Colaborativa", e: "Hoja de Ejercicios" }
};

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  console.log("🌍 INYECTANDO EJEMPLOS DE VARIEDAD (EXPANSIÓN)...");

  const examples = [
    { sub: "Educación Física", lev: "10mo", top: "Resistencia Aeróbica", type: "INDUSTRIAL", strat: STRATEGIES.SPORTS },
    { sub: "Artes Plásticas", lev: "7mo", top: "Teoría del Color", type: "INDUSTRIAL", strat: STRATEGIES.ARTS },
    { sub: "Francés", lev: "8vo", top: "Salutations et Présentations", type: "ACADEMIC", strat: STRATEGIES.LANG },
    { sub: "Educación Religiosa", lev: "9no", top: "Valores en la Sociedad", type: "ACADEMIC", strat: STRATEGIES.RELIGION },
    { sub: "Matemáticas", lev: "11mo", top: "Funciones Logarítmicas", type: "ACADEMIC", strat: STRATEGIES.MATH },
    { sub: "Psicología", lev: "12mo", top: "Inteligencia Emocional", type: "SERVICE", strat: STRATEGIES.RELIGION } // Reuso estrategia humanista
  ];

  for (const ex of examples) {
    const title = `MEP 2026: ${ex.sub} - ${ex.top}`;
    
    // UPSERT (SOLO CREA SI NO EXISTE)
    const exists = await prisma.lessonPlan.findFirst({ where: { title } });
    
    if (!exists) {
        console.log(`   + Creando: ${ex.sub} (${ex.top})`);
        await prisma.lessonPlan.create({
            data: {
                title,
                subject: ex.sub,
                level: ex.lev,
                status: "PUBLISHED",
                userId: admin.id,
                content: {
                    administrative: { period: "2026", origin: "Expansion Pack", modality: "Académica" },
                    curriculum: { unit: ex.top, outcome: "Competencia Específica" },
                    mediation: [
                        { moment: "1. CONEXIÓN", activity: ex.strat.c, dua: "Interés" },
                        { moment: "2. COLABORACIÓN", activity: "Trabajo en parejas.", dua: "Social" },
                        { moment: "3. CONSTRUCCIÓN", activity: ex.strat.a, evidence: ex.strat.e, dua: "Acción" },
                        { moment: "4. CLARIFICACIÓN", activity: "Cierre y estiramiento/reflexión.", technique: "Metacognición" }
                    ],
                    evaluation_system: {
                        written_test: { title: "Prueba Práctica", rows: [{obj: "Ejecución técnica", points: 20}] }
                    }
                }
            }
        });
    }
  }
  console.log("✅ EXPANSIÓN COMPLETADA.");
}

main().finally(() => prisma.$disconnect());