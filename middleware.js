import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Tu configuración de Auth

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  // 1. PROTECCIÓN DE RUTAS (REDIRECCIÓN)
  if (isOnDashboard || isOnAdmin) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  // 2. INYECCIÓN DE CABECERAS DE SEGURIDAD (HARDENING)
  const response = NextResponse.next();
  
  // Evita que tu web sea incrustada en iframes de otros sitios (Clickjacking)
  response.headers.set("X-Frame-Options", "DENY");
  // Previene que el navegador "adivine" tipos de archivos (MIME Sniffing)
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Protección básica XSS
  response.headers.set("X-XSS-Protection", "1; mode=block");
  // Fuerza HTTPS estricto (HSTS) - Vital para datos sensibles
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  return response;
});

export const config = {
  // Excluimos archivos estáticos e imágenes del middleware
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};