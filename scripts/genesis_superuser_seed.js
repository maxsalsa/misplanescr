const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GENESIS PROTOCOL: INJECT SUPER ADMIN
// "In the beginning, there was Code. And the Admin said 'Let there be Access'."

async function genesis() {
    try {
        console.log("⚡ INITIATING GENESIS PROTOCOL...");

        const superAdmin = await prisma.user.upsert({
            where: { email: 'max@misplanescr.com' },
            update: {
                role: 'SUPER_ADMIN',
                subscriptionStatus: 'ACTIVE',
                planType: 'ULTRA', // GOD MODE PLAN
                subscriptionEnd: new Date('2099-12-31'), // IMMORTAL
                adminAccessExpires: new Date('2099-12-31')
            },
            create: {
                email: 'max@misplanescr.com',
                name: 'Max Salazar',
                role: 'SUPER_ADMIN',
                subscriptionStatus: 'ACTIVE',
                planType: 'ULTRA',
                subscriptionEnd: new Date('2099-12-31'),
                adminAccessExpires: new Date('2099-12-31')
            }
        });

        console.log("✅ GENESIS COMPLETE. SUPER ADMIN INJECTED:");
        console.log({
            id: superAdmin.id,
            email: superAdmin.email,
            role: superAdmin.role,
            status: superAdmin.subscriptionStatus,
            plan: superAdmin.planType
        });

        console.log("\n🚀 SYSTEM UNLOCKED. YOU MAY NOW ENTER.");

    } catch (e) {
        console.error("❌ GENESIS FAILED:", e);
    } finally {
        await prisma.$disconnect();
    }
}

genesis();
