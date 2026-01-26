import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 animate-pulse">404</h2>
      <p className="text-2xl font-bold text-white mb-2">Zona Fuera de Cobertura MEP</p>
      <p className="text-slate-400 mb-8 max-w-md">
        La ruta que intentas explorar no existe en el mapa curricular oficial.
      </p>
      <Link href="/dashboard" className="btn btn-primary btn-lg rounded-full shadow-lg shadow-blue-500/20">
        Volver al Comando Central
      </Link>
    </div>
  )
}