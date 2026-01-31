"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  FileText,
  Users,
  Settings,
  LogOut,
  ShieldCheck
} from "lucide-react";
import UpgradeCard from "../business/UpgradeCard";

const menuItems = [
  { name: "Tablero Principal", href: "/dashboard", icon: LayoutDashboard },
  { name: "Planeamiento", href: "/dashboard/create", icon: PenTool },
  { name: "Evaluación & GTA", href: "/dashboard/assessment", icon: FileText },
  { name: "Gestión RRHH", href: "/dashboard/hr", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col text-white shadow-2xl z-50">

      {/* LOGO DE LA PLATAFORMA */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShieldCheck size={24} className="text-white" />
        </div>
        <div>
          <h1 className="font-black text-xl tracking-tighter">AulaPlan</h1>
          <p className="text-[10px] text-slate-400 tracking-widest uppercase">Sistema V85</p>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase mb-2">Módulos Académicos</p>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 translate-x-1"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <item.icon size={20} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ZONA DE CONVERSIÓN (V500) */}
      <div className="px-4 pb-4">
        <UpgradeCard />
      </div>

      {/* PERFIL DE USUARIO (FOOTER) */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xs">
            MS
          </div>
          <div>
            <p className="text-sm font-bold text-white">Max Salazar</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Super Admin
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-red-400 text-xs w-full px-2 transition-colors">
          <LogOut size={14} /> Cerrar Sesión Segura
        </button>
      </div>
    </div>
  );
}