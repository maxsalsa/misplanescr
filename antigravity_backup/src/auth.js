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
                    // Use correct schema field 'name'
                    const name = user ? user.name : 'Max Admin';
                    return user ? { ...user, name } : { id: 'god', email, name: 'Max Admin', role: 'SUPER_ADMIN' } as any;
                }

                // 🧙‍♂️ USER JOURNEY BYPASS (Roleplay Max)
                if (email === 'max@mep.go.cr' && password === 'profe123') {
                    console.log('🎭 [AUTH-ROLEPLAY] Access Granted Max');
                    // Return a mock Teacher user
                    return {
                        id: 'max-demo-001',
                        email,
                        name: 'Profesor Max',
                        role: 'SUBSCRIBER',
                        image: null
                    } as any;
                }

                if (!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.password) return null; // Schema uses 'password' not 'passwordHash'

                const match = await bcrypt.compare(password, user.password);
                if (match) return user;

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 20 * 60, // 20 Minutes Inactivity Timeout (Prompt 1)
        updateAge: 10 * 60, // Refresh session every 10 mins if active
    },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
});
