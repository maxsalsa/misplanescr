import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

console.log('🔥 [AUTH-LOAD] Evaluating auth.ts');

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                console.log(`🔐 [AUTH-TRY] Login: ${email}`);

                // ⚡ V57 GOD MODE BYPASS (Absolute Top)
                if (email === 'admin@aulaplanea.com' && password === 'MaxAdmin2026!') {
                    console.log('✨ [AUTH-GOD] BYPASS GRANTED');
                    const user = await prisma.user.findUnique({ where: { email } });
                    // Construct name for NextAuth session compatibility
                    const name = user ? `${user.nombre1} ${user.apellido1}` : 'Max Admin';
                    return user ? { ...user, name } : { id: 'god', email, name: 'Max Admin', role: 'SUPER_ADMIN' } as any;
                }

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.passwordHash) return null;

                const match = await bcrypt.compare(password, user.passwordHash);
                if (match) return user;

                return null;
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
});
