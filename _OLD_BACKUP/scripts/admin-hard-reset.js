import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("🚨 INITIATING HARD RESET FOR ADMIN CREDENTIALS...");

    // 1. Generate Fresh Hash
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash('admin123', salt);

    console.log(`🔐 Generated New Hash: ${newHash.substring(0, 10)}...`);

    // 2. Force Update
    try {
        const user = await prisma.user.update({
            where: { email: 'admin@autoplanea.cr' },
            data: {
                passwordHash: newHash,
                status: 'ACTIVE', // Ensure active
                role: 'ADMIN' // Ensure role
            }
        });
        console.log("✅ SUCCESS: Admin User Updated.");
        console.log(`   User: ${user.email}`);
        console.log(`   Status: ${user.status}`);
        console.log(`   Hash Updated: YES`);

    } catch (error) {
        console.error("❌ ERROR: Could not update user. check if user exists.");
        console.error(error);

        // Try creating if missing (Safety Net)
        try {
            console.log("⚠️ Attempting to CREATE Admin user...");
            await prisma.user.create({
                data: {
                    email: 'admin@autoplanea.cr',
                    name: 'Lic. Max Salazar',
                    role: 'ADMIN',
                    status: 'ACTIVE',
                    passwordHash: newHash,
                    plan: 'institucional'
                }
            });
            console.log("✅ SUCCESS: Admin User CREATED.");
        } catch (createError) {
            console.error("❌ CRITICAL: Database connection or schema error.");
            console.error(createError);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
