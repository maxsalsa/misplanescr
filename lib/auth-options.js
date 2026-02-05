import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login", error: "/auth/error" },
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) throw new Error("Datos incompletos");
        
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) throw new Error("Usuario no encontrado");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");

        return {
          id: user.id, email: user.email, name: user.name, role: user.role,
          mustChangePassword: user.mustChangePassword,
          subscriptionStatus: user.subscriptionStatus
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.mustChangePassword = user.mustChangePassword;
        token.subscriptionStatus = user.subscriptionStatus;
      }
      if (trigger === "update" && session?.mustChangePassword === false) {
        token.mustChangePassword = false;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.mustChangePassword = token.mustChangePassword;
      session.user.subscriptionStatus = token.subscriptionStatus;
      return session;
    }
  }
};