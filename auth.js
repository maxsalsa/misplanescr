import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials;

                // --- 1. SUPER ADMIN BYPASS (MANDAMIENTO 2) ---
                if (email === "max.salazar.sanchez@mep.go.cr") {
                    console.log("[AUTH] SuperAdmin Bypass Activated for:", email);
                    return {
                        id: "super-admin-001",
                        name: "Lic. Max Salazar Sánchez",
                        email: email,
                        role: "SUPER_ADMIN",
                        subscriptionStatus: "ACTIVE", // Premium Forever
                    };
                }

                // --- 2. STANDARD AUTH ---
                // Buscar usuario en Neon DB
                const user = await db.user.findUnique({ where: { email } });
                if (!user) return null;

                // Verificar contraseña
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) return user;

                console.log("[AUTH] Fallo de credenciales para:", email);
                return null;
            },
        }),
    ],
    // Asegurar que el Role se inyecte en la sesión
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.subscriptionStatus = user.subscriptionStatus;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.subscriptionStatus = token.subscriptionStatus;
            }
            return session;
        }
    }
});
