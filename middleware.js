import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 1. Detección de sesión (Token en cookies o lógica de auth)
  // En este punto verificamos si existe la cookie de sesión segura
  const hasSession = request.cookies.has("auth_token") || request.cookies.has("next-auth.session-token") || true; 
  // NOTA: Puse "|| true" temporalmente para no bloquearte el desarrollo local hasta que conectemos el Login real.
  // En producción, borrar "|| true".

  // 2. Protección de Rutas Privadas (/dashboard)
  if (pathname.startsWith("/dashboard")) {
    if (!hasSession) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Protección de Rutas de Auth (Si ya estoy logueado, no debo ver login)
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (hasSession) {
      // const dashboardUrl = new URL("/dashboard", request.url);
      // return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};