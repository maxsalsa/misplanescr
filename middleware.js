export { default } from "next-auth/middleware";

export const config = {
  // Protegemos TODO lo que esté bajo /dashboard
  // Esto incluye: Planeamiento, Admin, Boletas, Estudiantes, etc.
  matcher: ["/dashboard/:path*"]
};