const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ESPECIALES = [
    { n: "Educación Especial (Aula Integrada)", m: "ACADEMICA", nivel: "Primaria", icono: "🧩" },
    { n: "Problemas de Aprendizaje", m: "ACADEMICA", nivel: "Apoyo", icono: "🧠" },
    { n: "Club de Ajedrez", m: "ACADEMICA", nivel: "Complementaria", icono: "♟️" },
    { n: "Club de Bandas", m: "ACADEMICA", nivel: "Complementaria", icono: "🎺" },
    { n: "Bandera Azul Ecológica", m: "ACADEMICA", nivel: "Comité", icono: "♻️" }
];

async function main() {
    console.log("🧩 FINALIZANDO EL UNIVERSO CON INCLUSIÓN Y CLUBES...");
    const admin = await prisma.user.findFirst({ where: { email: "max@misplanescr.com" } });

    for (const item of ESPECIALES) {
        const subject = await prisma.subject.upsert({
            where: { name_educationLevel_modalityType: { name: item.n, educationLevel: item.nivel, modalityType: item.m }},
            update: {},
            create: { name: item.n, code: item.n.substring(0,3).toUpperCase(), educationLevel: item.nivel, modalityType: item.m }
        });

        // Plan de Adecuación o Club
        await prisma.lessonPlan.create({
            data: {
                title: `Planificación: ${item.n}`,
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    unidad: "Planificación Anual",
                    enfoque: "Inclusión y Desarrollo Integral",
                    icono: item.icono,
                    estrategias: { inicio: "Diagnóstico", desarrollo: "Talleres", cierre: "Presentación" },
                    rubrica: []
                }
            }
        });
        process.stdout.write("🧩");
    }
    console.log("\n✅ UNIVERSO COMPLETO AL 100%.");
}
main().catch(e => console.error(e)).finally(async() => await prisma.$disconnect());