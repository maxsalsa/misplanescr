const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🔍 INSPECTING NEON DB FOR MATH 7 DATA...");

    // 1. Search for Subject/Unit
    // Try different naming conventions just in case
    const subject = await prisma.subject.findFirst({
        where: {
            OR: [
                { name: { contains: "Matem" } },
                { name: { contains: "Math" } }
            ],
            // educationLevel might be "7", "SEPTIMO", etc. Let's try flexible search or just get first math
        },
        include: {
            units: {
                include: {
                    outcomes: true // Get indicators/outcomes
                }
            }
        }
    });

    if (subject) {
        console.log(`✅ SUBJECT FOUND: ${subject.name} (Level: ${subject.educationLevel})`);
        if (subject.units.length > 0) {
            const unit = subject.units[0];
            console.log(`   📂 Unit: ${unit.title}`);
            if (unit.outcomes.length > 0) {
                console.log(`      🎯 Outcome: ${unit.outcomes[0].description}`);
            } else {
                console.log("      ⚠️ No Outcomes found in Unit.");
            }
        } else {
            console.log("   ⚠️ No Units found for this Subject.");
        }
    } else {
        console.log("❌ SUBJECT 'Matemáticas' NOT FOUND in DB. Switching to Inference Mode for Curriculum.");
    }

    // 2. Search for TDAH Strategy
    const strategy = await prisma.pedagogicalStrategy.findFirst({
        where: {
            adaptationTag: "TDAH"
        }
    });

    if (strategy) {
        console.log(`\n✅ TDAH STRATEGY FOUND: "${strategy.title}"`);
        console.log(`   📝 Content: ${strategy.content}`);
        console.log(`   ⚖️  Rubric (Raw): ${strategy.rubricModel}`);
    } else {
        console.log("\n❌ TDAH STRATEGY NOT FOUND in DB.");
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
