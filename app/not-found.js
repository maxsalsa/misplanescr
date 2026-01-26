import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-4 text-white">
      <div className="text-center space-y-6 p-8 bg-white/10 rounded-2xl backdrop-blur-sm shadow-xl">
        <Compass size={80} className="mx-auto text-white opacity-90 animate-pulse" />
        <h2 className="text-6xl font-extrabold tracking-tight">404</h2>
        <p className="text-2xl font-medium">Ruta no encontrada en el ecosistema.</p>
        <p className="text-white/80">Parece que te has aventurado demasiado lejos.</p>
        <div className="mt-8">
          <Link href="/dashboard" className="btn btn-lg btn-primary bg-white text-primary hover:bg-gray-100 border-none shadow-md font-bold px-8">
            Volver al Comando Central
          </Link>
        </div>
      </div>
    </div>
  );
}