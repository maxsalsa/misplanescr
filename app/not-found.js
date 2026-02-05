import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-black text-slate-200">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mt-4">
        Ruta no encontrada en el mapa
      </h2>
      <p className="text-slate-500 mt-2 max-w-md">
        Parece que te has salido del plan de estudios. Esta página no existe en
        nuestro universo educativo.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Volver al Dashboard
      </Link>
    </div>
  );
}
