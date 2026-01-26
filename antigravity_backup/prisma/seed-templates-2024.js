const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("📐 KAIZEN 400.0: STRUCTURAL TEMPLATE HYDRATION...");

    const templates = [
        {
            name: "Planeamiento General I y II Ciclo",
            modality: "Primaria",
            columns: ["Aprendizajes Esperados", "Estrategias de Mediación", "Indicadores"],
            rules: "Los indicadores deben incluir Verbo + Contenido + Condición. Mediación debe ser secuencial/gradual."
        },
        {
            name: "Planeamiento Unidocente",
            modality: "Primaria Unidocente",
            columns: ["Círculo de la Armonía", "Mediación Correlacionada", "Indicadores", "Círculo Creativo", "Cierre Pedagógico"],
            rules: "Modelado para multigrado. Incluir bloques de tiempo fijos (20-40-20 min)."
        },
        {
            name: "Planeamiento Francés",
            modality: "Idiomas",
            columns: ["Savoirs", "Savoir Faire", "Mediación (4 Etapas)", "Indicateurs"],
            rules: "Etapa 1: Découverte, Etapa 2: Conceptualisation, Etapa 3: Fixation, Etapa 4: Production."
        },
        {
            name: "Planeamiento Inglés",
            modality: "Idiomas",
            columns: ["Learn to Know/Do/Be", "Didactic Sequence", "Integrated Mini-Project", "Assessment/Indicators"],
            rules: "Integrar 6 semanas: 4 de aprendizaje, 1 de refuerzo, 1 de Mini-Proyecto."
        }
    ];

    for (const t of templates) {
        await prisma.planningTemplate.upsert({
            where: { name: t.name },
            update: t,
            create: t
        });
    }

    console.log("✅ TEMPLATE SHELLS ACTIVE. Generation engine is now structurally compliant.");
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
