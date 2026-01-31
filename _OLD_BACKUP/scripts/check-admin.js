import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Checking Database for Admin User...");

    const admin = await prisma.user.findUnique({
        where: { email: 'admin@autoplanea.cr' }
    });

    if (!admin) {
        console.error("❌ ERROR: User 'admin@autoplanea.cr' NOT FOUND in database.");
        console.log("💡 Suggestion: Run 'npx prisma db seed' or 'node prisma/seed.js'");
        return;
    }

    console.log("✅ User Found:", admin.email);
    console.log("🔑 Stored Hash:", admin.passwordHash);

    const match = await bcrypt.compare('admin123', admin.passwordHash);

    if (match) {
        console.log("✅ Password 'admin123' VERIFIED successfully against hash.");
    } else {
        console.error("❌ ERROR: Password 'admin123' DOES NOT MATCH the stored hash.");
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
