import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Diagnosing Auth for: admin@autoplanea.cr');

    // 1. Fetch User
    const user = await prisma.user.findUnique({
        where: { email: 'admin@autoplanea.cr' }
    });

    if (!user) {
        console.error('❌ User NOT FOUND in database!');
        return;
    }

    console.log('✅ User Found:', {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
        passwordHashLength: user.passwordHash ? user.passwordHash.length : 0
    });

    // 2. Test Password
    const inputPassword = 'admin123';
    console.log(`🔑 Testing password: '${inputPassword}'`);

    const isMatch = await bcrypt.compare(inputPassword, user.passwordHash);

    if (isMatch) {
        console.log('✅ Password VALID. Login should work.');
    } else {
        console.error('❌ Password INVALID. Hash mismatch.');
        console.log(' stored hash:', user.passwordHash);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
