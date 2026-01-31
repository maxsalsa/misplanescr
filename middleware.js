export { default } from "next-auth/middleware";

// CONFIGURACIÓN DEL GUARDA
export const config = {
  // Solo protegemos las rutas del Dashboard.
  // La página de Login y la API pública quedan fuera.
  matcher: ["/dashboard/:path*"]
};