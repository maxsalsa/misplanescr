import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

export default async function DashboardHome() {
  // En el futuro aquí conectaremos con Prisma para datos reales
  const stats = [
    { title: "Planes Generados", value: "12", icon: BookOpen, color: "text-blue-600" },
    { title: "Estudiantes", value: "35", icon: Users, color: "text-emerald-600" },
    { title: "Promedio General", value: "88.5", icon: TrendingUp, color: "text-amber-600" },
    { title: "Nivel", value: "Premium", icon: GraduationCap, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
        <span className="text-sm text-slate-500 font-mono">CICLO LECTIVO 2026</span>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">Hoy</span>
            </div>
            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* ÁREA DE BIENVENIDA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Bienvenido, Max Salazar.</h2>
        <p className="opacity-80 max-w-2xl">
          El sistema Antigravity está operativo. Todos los módulos de IA (OpenAI/Groq) están conectados a la Base de Datos Neon.
          Selecciona una herramienta en el menú lateral para comenzar.
        </p>
      </div>
    </div>
  );
}
