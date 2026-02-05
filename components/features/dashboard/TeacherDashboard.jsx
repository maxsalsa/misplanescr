"use client";
import { useState } from "react";
import {
  Users,
  BookOpen,
  Calculator,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
  FileText,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

/**
 * 🎨 DAY 3 DELIVERABLE: Teacher Dashboard UI (Cero Fricción)
 * "Azul/Blanco Profesional" - Clean, Metric-Driven, MEP Compliant.
 */

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // MOCK DATA for Prototype
  const stats = {
    students: 142,
    plans_active: 8,
    pending_grades: 2,
    alerts: 3, // Deserción Risks
  };

  const alertStudents = [
    { id: 1, name: "Brandon G.", issue: "3 Ausencias seguidas", risk: "high" },
    { id: 2, name: "Maria S.", issue: "Bajón en Notas (-20%)", risk: "medium" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex">
      {/* SIDEBAR NAVEGACIÓN */}
      <aside className="w-20 lg:w-64 bg-[#003366] text-white flex flex-col transition-all h-screen sticky top-0">
        <div className="p-6 font-bold text-xl tracking-tight hidden lg:block">
          MisPlanesCR <span className="text-blue-300 font-normal">v1.0</span>
        </div>
        <div className="lg:hidden p-4 font-bold text-center">MP</div>

        <nav className="flex-1 px-2 space-y-2 mt-4">
          <NavItem
            icon={<TrendingUp size={20} />}
            label="Panel General"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={<BookOpen size={20} />}
            label="Planeamiento"
            onClick={() => setActiveTab("planning")}
          />
          <NavItem
            icon={<Calculator size={20} />}
            label="Notas (Calc)"
            onClick={() => setActiveTab("grades")}
          />
          <NavItem
            icon={<Calendar size={20} />}
            label="Asistencia"
            onClick={() => setActiveTab("attendance")}
          />
          <NavItem
            icon={<Award size={20} />}
            label="Gamificación"
            onClick={() => setActiveTab("gamification")}
          />
          <div className="pt-4 border-t border-blue-900 mt-4">
            <NavItem icon={<Settings size={20} />} label="Configuración" />
          </div>
        </nav>

        <div className="p-4 bg-blue-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center font-bold">
              MS
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-semibold">Max Salazar</div>
              <div className="text-xs text-blue-300">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#003366]">
            {activeTab === "overview"
              ? "Panel de Control 2026"
              : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex gap-4">
            <span className="badge badge-success gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>{" "}
              Sistema en Línea
            </span>
            <button className="btn btn-sm btn-ghost text-slate-500">
              Ayuda
            </button>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              icon={<Users className="text-blue-600" />}
              value={stats.students}
              label="Estudiantes Activos"
              trend="+12% vs 2025"
            />
            <StatCard
              icon={<BookOpen className="text-indigo-600" />}
              value={stats.plans_active}
              label="Planes Vigentes"
              sub="Todo al día"
            />
            <StatCard
              icon={<AlertTriangle className="text-amber-500" />}
              value={stats.alerts}
              label="Alertas de Riesgo"
              bg="bg-amber-50 border-amber-200"
            />
            <StatCard
              icon={<Award className="text-emerald-500" />}
              value="89%"
              label="Engagement (Gamif)"
              trend="Nivel Oro"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Quick Actions & Gradebook Preview */}
            <div className="lg:col-span-2 space-y-8">
              {/* Grading Assistant (The Core Ask) */}
              <div className="card bg-white shadow-sm border border-slate-200">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title text-[#003366] flex items-center gap-2">
                      <Calculator size={20} />
                      Asistente de Evaluación (Calibrado MEP)
                    </h2>
                    <button className="btn btn-sm btn-primary">
                      Nueva Nota
                    </button>
                  </div>

                  {/* Dynamic Percentage Visualizer */}
                  <div className="flex items-center gap-2 text-sm font-medium mb-6">
                    <div
                      className="h-4 bg-blue-600 rounded-l-md flex items-center justify-center text-white text-[10px]"
                      style={{ width: "35%" }}
                    >
                      EXAM (35%)
                    </div>
                    <div
                      className="h-4 bg-indigo-500 flex items-center justify-center text-white text-[10px]"
                      style={{ width: "45%" }}
                    >
                      COTID (45%)
                    </div>
                    <div
                      className="h-4 bg-emerald-500 flex items-center justify-center text-white text-[10px]"
                      style={{ width: "10%" }}
                    >
                      TAR (10%)
                    </div>
                    <div
                      className="h-4 bg-amber-500 rounded-r-md flex items-center justify-center text-white text-[10px]"
                      style={{ width: "10%" }}
                    >
                      PROY (10%)
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table table-sm w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th>Estudiante</th>
                          <th>P. Actual</th>
                          <th>Proyección</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-bold">Aguilar, Sofia</td>
                          <td className="text-emerald-600 font-bold">92.5</td>
                          <td>Aprobado</td>
                          <td>
                            <button className="btn btn-xs btn-ghost">
                              Editar
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-bold">Bolaños, Carlos</td>
                          <td className="text-amber-600 font-bold">68.0</td>
                          <td className="text-xs text-amber-600">
                            Requiere +75 en Examen
                          </td>
                          <td>
                            <button className="btn btn-xs btn-outline btn-warning">
                              Alerta Padres
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Gamification Connection */}
              <div className="card bg-gradient-to-r from-indigo-900 to-blue-900 text-white shadow-lg overflow-hidden relative">
                <div className="absolute right-0 top-0 opacity-10 p-4">
                  <Award size={120} />
                </div>
                <div className="card-body z-10">
                  <h2 className="card-title text-xl">
                    Centro de Entrenamiento Estudiantil
                  </h2>
                  <p className="opacity-90 max-w-lg">
                    Los estudiantes han completado 450 misiones esta semana. El
                    tema &quot;Revolución Industrial&quot; tiene una tasa de
                    éxito del 95%.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-warning border-0 bg-yellow-400 text-yellow-900 hover:bg-yellow-300">
                      Ver Ranking Global
                    </button>
                    <button className="btn btn-outline text-white hover:bg-white/20">
                      Generar Quiz Relámpago (AI)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Notifications & Tools */}
            <div className="space-y-6">
              {/* Attendance Alert Block */}
              <div className="card bg-white border-l-4 border-red-500 shadow-sm">
                <div className="card-body p-5">
                  <h3 className="font-bold text-red-700 flex items-center gap-2">
                    <AlertTriangle size={18} /> Alertas de Deserción
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Estudiantes con 3+ ausencias consecutivas.
                  </p>

                  <div className="space-y-2">
                    {alertStudents.map((st) => (
                      <div
                        key={st.id}
                        className="flex justify-between items-center p-2 bg-red-50 rounded text-sm"
                      >
                        <span className="font-bold text-slate-700">
                          {st.name}
                        </span>
                        <span className="badge badge-error badge-sm text-white">
                          {st.issue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-sm btn-error w-full mt-4 text-white">
                    Contactar Hogares (WhatsApp)
                  </button>
                </div>
              </div>

              {/* Quick Shortcuts */}
              <div className="grid grid-cols-2 gap-3">
                <ShortcutButton
                  icon={<FileText size={18} />}
                  label="Crear GTA"
                />
                <ShortcutButton
                  icon={<BookOpen size={18} />}
                  label="Plan Nuevo"
                />
                <ShortcutButton icon={<Settings size={18} />} label="Rubros" />
                <ShortcutButton icon={<LogOut size={18} />} label="Salir" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-Components for Clean Code
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? "bg-blue-500 text-white shadow-md" : "text-blue-100 hover:bg-blue-800"}`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function StatCard({
  icon,
  value,
  label,
  trend,
  sub,
  bg = "bg-white border-slate-200",
}) {
  return (
    <div
      className={`card ${bg} border shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="card-body p-5 flex flex-row items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-slate-800">{value}</div>
          <div className="text-sm text-slate-500 font-medium">{label}</div>
          {trend && (
            <div className="text-xs text-emerald-600 mt-1 font-bold">
              {trend}
            </div>
          )}
          {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
        </div>
        <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

function ShortcutButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
      {icon}
      <span className="text-xs font-bold mt-2">{label}</span>
    </button>
  );
}
