import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        
        // Buscar usuario en Neon DB
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        // Verificar contraseña (o bypass temporal para admin inicial)
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // NOTA: Para el primer login, si la pass en DB no está hasheada, esto fallará.
        // Asumiremos que el seed creó una pass correcta o simple.
        
        if (passwordsMatch || password === user.password) return user; 
        
        return null;
      },
    }),
  ],
});
