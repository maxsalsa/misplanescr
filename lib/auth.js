import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales incompletas");
        }

        // 1. BUSCAR USUARIO EN DB REAL
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado");
        }

        // 2. VERIFICAR CONTRASEÑA ENCRIPTADA
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }

        // 3. RETORNAR USUARIO CON ROL
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // IMPORTANTE: El rol viaja en la sesión
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Página de error personalizada
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};