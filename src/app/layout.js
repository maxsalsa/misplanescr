import { Inter } from "next/font/google";
import { Toaster } from "sonner"; // Librería de notificaciones elegante
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "AulaPlan | Ecosistema MEP",
  description: "Plataforma de Planeamiento Inteligente (Antigravity Core)",
};

/**
 * LAYOUT PRINCIPAL (ROOT)
 * Envuelve toda la aplicación. Incluye fuentes y el sistema de notificaciones.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="corporate">
      <body className={inter.className}>
        {children}
        {/* Sistema de Notificaciones Flotantes (Posición: Arriba Derecha) */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
