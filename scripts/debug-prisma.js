import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Inspecting Prisma Client Models...");

    // Get all keys on the prisma instance
    // Note: Models are usually lazy getters on the instance or defined on the prototype
    const keys = Object.keys(prisma);
    console.log("Keys on prisma instance:", keys);

    // Explicit check
    const modelName = 'plan';
    if (prisma[modelName]) {
        console.log(`✅ prisma.${modelName} exists!`);
        try {
            // @ts-ignore
            const count = await prisma[modelName].count();
            console.log("   Count:", count);
        } catch (e) {
            console.error("   Error querying:", e.message);
        }
    } else {
        console.log(`❌ prisma.${modelName} does NOT exist.`);
    }

    const possibleModels = ['user', 'plan', 'planes', 'Plan'];
    for (const m of possibleModels) {
        // @ts-ignore
        if (prisma[m]) console.log(`👉 Found: prisma.${m}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
