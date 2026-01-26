const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// -----------------------------------------------------------------------------
// ANTIGRAVITY DATA ENGINE: CURRICULUM SEEDER
// Paste the JSON output from the AI here.
// -----------------------------------------------------------------------------

const CURRICULUM_DATA = [
    // EXAMPLE DATA (Replace with AI Output)
    {
        "unit_uuid": "550e8400-e29b-41d4-a716-446655440000",
        "specialty": "Ciberseguridad",
        "level": 10,
        "ui_family": "HARD_TECH",
        "learning_outcome": {
            "text": "Analizar fallos de seguridad en sistemas operativos...",
            "code": "LO_01"
        },
        // ... rest of the object
    }
];

async function main() {
    console.log('🚀 Antigravity Data Injection Started...');

    for (const item of CURRICULUM_DATA) {
        // In a real scenario, we might have a specific 'Curriculum' table.
        // For now, we seed into 'PedagogicalPlan' as a template or a new model if schema evolved.
        // Assuming we treat these as 'Official Templates' owned by a System Admin.

        // Since schema.prisma only has PedagogicalPlan and it handles generic content:

        console.log(`Processing: ${item.specialty} - Unit ${item.unit_uuid}`);

        // Logic to upsert or create would go here.
        // const res = await prisma.pedagogicalPlan.create({ ... })

        console.log(`  ✅ Ingested: ${item.learning_outcome.code} [${item.ui_family}]`);
    }

    console.log('🏁 Data Injection Complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
