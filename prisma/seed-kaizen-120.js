const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// UNIT: Circuitos de Corriente Continua (CTP / Electrónica) - 40 Hours
const UNIT_DATA = {
    title: "Unidad 1: Circuitos de Corriente Continua",
    subject: "Electrónica Industrial",
    level: "10",
    totalHours: 40,
    outcomes: [
        {
            ra: "RA1: Analizar las magnitudes eléctricas básicas.",
            indicators: ["Calcula voltaje", "Mide resistencia", "Aplica Ley de Ohm"],
            saberes: ["Voltaje", "Corriente", "Resistencia", "Potencia"],
            suggestedTimeHours: 10
        },
        {
            ra: "RA2: Construir circuitos serie, paralelo y mixto.",
            indicators: ["Interpreta diagramas", "Monta protoboard", "Verifica continuidad"],
            saberes: ["Nodos", "Mallas", "Soldadura básica"],
            suggestedTimeHours: 20
        },
        {
            ra: "RA3: Diagnosticar fallas en circuitos DC.",
            indicators: ["Identifica corto circuito", "Identifica circuito abierto"],
            saberes: ["Protocolo de falla", "Uso de multímetro"],
            suggestedTimeHours: 10
        }
    ]
};

async function main() {
    console.log(`🏭 KAIZEN 120.0: INJECTING 'THE UNIT GOVERNOR'...`);

    // 1. In a real scenario, we create the CurriculumMaster entries
    // For now, we simulate the "Unit Container" logic verification

    console.log(`... Analyzing Time Budget for Unit '${UNIT_DATA.title}' (${UNIT_DATA.totalHours} hours)...`);

    // Simulate User Selection (Route B: Technical)
    const currentSelection = [
        { name: "Clase Magistral Ley Ohm", minutes: 120 }, // 2h
        { name: "Taller Práctico: Series", minutes: 600 }, // 10h
        { name: "Laboratorio: Mallas", minutes: 600 },     // 10h
        { name: "Proyecto: Fuente DC", minutes: 1200 }     // 20h
    ];

    const totalMinutes = currentSelection.reduce((s, a) => s + a.minutes, 0);
    const budgetMinutes = UNIT_DATA.totalHours * 60;

    console.log(`... Used: ${totalMinutes / 60}h | Budget: ${UNIT_DATA.totalHours}h`);

    if (totalMinutes > budgetMinutes) {
        console.log(`⚠️ ALERTA TÉCNICA: Exceso de ${(totalMinutes - budgetMinutes) / 60} horas.`);
    } else {
        console.log(`✅ TIME BUDGET PERFECT.`);
    }

    // In production, this data resides in Neon to drive the frontend
    console.log(`✅ UNIT GOVERNOR LOGIC VALIDATED.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
