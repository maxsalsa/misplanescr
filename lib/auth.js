import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "AulaPlan Secure",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        console.log(`🔒 Intento de acceso: ${credentials?.email}`);
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales incompletas");
        }

        // 1. LLAVE MAESTRA DE EMERGENCIA (PARA USTED, EL DUEÑO)
        if (credentials.email === "max@aulaplan.com" && credentials.password === "admin") {
             console.log("👑 Acceso Super Admin Autorizado (Bypass)");
             return {
                id: "master-admin",
                email: "max@aulaplan.com",
                name: "Lic. Max Salazar",
                role: "ADMIN",
                subscriptionStatus: "VIP"
             };
        }

        // 2. VERIFICACIÓN REAL EN BASE DE DATOS
        const user = await prisma.user.findUnique({ 
            where: { email: credentials.email } 
        });

        if (!user) throw new Error("Usuario no encontrado");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Contraseña incorrecta");

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            subscriptionStatus: user.subscriptionStatus
        };
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.subscriptionStatus = token.subscriptionStatus;
      }
      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscriptionStatus = user.subscriptionStatus;
      }
      return token;
    }
  }
};