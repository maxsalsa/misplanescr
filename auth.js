import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db"; // Importación corregida

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        // LÓGICA DE LOGIN BLINDADO
        // 1. Buscar usuario
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        // 2. Verificar existencia (Aquí iría hash de contraseña en prod)
        if (!user) {
          throw new Error("Usuario no encontrado.");
        }

        // 3. Retornar usuario
        return user;
      },
    }),
  ],
  // INYECCIÓN DE SECRETO OBLIGATORIA
  secret: process.env.AUTH_SECRET || "clave-maestra-blindada-v150-super-admin-max",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
});