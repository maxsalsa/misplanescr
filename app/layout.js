import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "AulaPlan | Ecosistema MEP",
  description: "Plataforma de Planeamiento Inteligente",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="corporate">
      {/* Usamos fuentes del sistema nativas (Cero Latencia) */}
      <body className="font-sans antialiased min-h-screen bg-base-200">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
