import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || "antigravity-secret-key-mep-2026");

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // RUTAS PÚBLICAS
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/static") || pathname === "/login") {
    return NextResponse.next();
  }

  // VERIFICAR TOKEN
  const token = req.cookies.get("auth-token")?.value;
  let isAuthenticated = false;

  if (token) {
    try { await jwtVerify(token, SECRET); isAuthenticated = true; } catch (e) {}
  }

  // LÓGICA DE REDIRECCIÓN
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
