const fs = require("fs");
const path = require("path");

// 1. REPARAR GLOBALS.CSS (El estilo base)
const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
}
`;

// 2. REPARAR LAYOUT.JS (Eliminar BOM y caracteres fantasma)
const layoutContent = `import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "AulaPlan | Ecosistema MEP",
  description: "Plataforma de Planeamiento Inteligente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="corporate">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
`;

// 3. REPARAR MIDDLEWARE.JS (Formato Estándar Limpio)
const middlewareContent = `import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

// Inicializar NextAuth
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  // Proteger Dashboard y Admin
  if (isOnDashboard || isOnAdmin) {
    if (isLoggedIn) return null; // Permitir acceso
    return NextResponse.redirect(new URL("/login", req.nextUrl)); // Patear al login
  }

  // Si ya está logueado y va al login, mandar al dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return null;
});

export const config = {
  // Matcher optimizado para excluir estáticos y API pública
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
`;

// EJECUCIÓN DE ESCRITURA (UTF-8 PURO)
console.log("🧼 INICIANDO LIMPIEZA DE CÓDIGO (PROTOCOLO UTF-8)...");

const cssPath = path.join("app", "globals.css");
fs.writeFileSync(cssPath, cssContent.trim(), "utf8");
console.log("✅ app/globals.css RESTAURADO.");

const layoutPath = path.join("app", "layout.js");
fs.writeFileSync(layoutPath, layoutContent.trim(), "utf8");
console.log("✅ app/layout.js LIMPIADO (BOM Eliminado).");

const middlewarePath = path.join("middleware.js");
fs.writeFileSync(middlewarePath, middlewareContent.trim(), "utf8");
console.log("✅ middleware.js ESTANDARIZADO.");

console.log("✨ SISTEMA LISTO PARA COMPILACIÓN LIMPIA.");
