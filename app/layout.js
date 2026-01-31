import { Inter } from "next/font/google";
import "./globals.css"; // Importamos la coherencia visual V200
import Sidebar from "@/components/layout/Sidebar"; // Navegación V85
import FooterLegal from "@/components/layout/FooterLegal"; // Escudo Legal V200
import { Toaster } from "sonner"; // Sistema de Alertas

// FUENTE OFICIAL (Legible y Profesional)
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AulaPlan | Ecosistema Educativo MEP",
  description: "Plataforma de Gestión Industrial para Docentes de Costa Rica.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} watermark-bg`}>

        {/* CONTENEDOR PRINCIPAL FLEXIBLE */}
        <div className="flex min-h-screen bg-slate-50 text-slate-900">

          {/* 1. BARRA LATERAL (CABINA DE MANDO) */}
          {/* Fija a la izquierda, siempre visible */}
          <Sidebar />

          {/* 2. ÁREA DE CONTENIDO DINÁMICO */}
          <main className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">

            {/* El contenido de cada página (Dashboard, Crear, etc.) se inyecta aquí */}
            <div className="flex-1 p-8 overflow-y-auto">
              {children}
            </div>

            {/* 3. PIE DE PÁGINA (LEGALIDAD) */}
            {/* Aparece al final de cada scroll */}
            <FooterLegal />

          </main>
        </div>

        {/* 4. SISTEMA DE NOTIFICACIONES (FLOTANTE) */}
        {/* Aquí aparecerán los mensajes de "Guardado" o "Error de Rúbrica" */}
        <Toaster richColors position="top-right" closeButton />

      </body>
    </html>
  );
}