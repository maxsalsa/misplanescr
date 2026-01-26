"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, GraduationCap, Menu, FileText, HelpCircle, ChevronDown } from "lucide-react";
import NotificationCenter from "@/components/notification-center"; // IMPORTADO

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Comando Central", href: "/dashboard", icon: LayoutDashboard },
    { name: "Crear Planeamiento", href: "/dashboard/create", icon: BookOpen },
    { name: "Portafolio Digital", href: "/dashboard/library", icon: FileText },
    { name: "Expedientes (7600)", href: "/dashboard/students", icon: Users },
    { name: "Centro de Ayuda", href: "/dashboard/help", icon: HelpCircle },
  ];

  return (
    <div className="drawer lg:drawer-open bg-slate-50 min-h-screen" data-theme="corporate">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* BARRA SUPERIOR (HEADER) */}
        <div className="w-full navbar bg-white border-b border-slate-200 sticky top-0 z-40 px-6 justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost btn-sm">
              <Menu size={20} />
            </label>
            <span className="font-bold text-blue-700">AulaPlan</span>
          </div>
          
          {/* BARRA DERECHA: NOTIFICACIONES + USUARIO (SOLO ICONO) */}
          <div className="flex-1 justify-end flex items-center gap-2">
            <NotificationCenter /> {/* AQUÍ ESTÁ LA CAMPANA */}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <div className="hidden md:block text-right mr-2">
              <p className="text-xs font-bold text-slate-700">Lic. Salazar</p>
              <p className="text-[10px] text-emerald-600 font-bold">PLAN ULTRA</p>
            </div>
            <div className="avatar placeholder">
              <div className="bg-slate-900 text-white rounded-full w-8">
                <span className="text-xs">MS</span>
              </div>
            </div>
          </div>
        </div>
        
        <main className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div> 
      
      <div className="drawer-side z-50 shadow-2xl lg:shadow-none">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-72 min-h-full bg-slate-900 text-slate-100 flex flex-col">
          <li className="mb-8 mt-2">
            <div className="flex flex-col gap-0 hover:bg-transparent cursor-default">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-blue-600 p-2 rounded-lg"><GraduationCap size={28} /></div>
                <span className="text-2xl font-black tracking-tighter">AulaPlan</span>
              </div>
              <span className="text-xs text-slate-400 font-mono pl-12">v15.0 UX/UI</span>
            </div>
          </li>

          <div className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${pathname === item.href ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                  <item.icon size={20} />
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* SUBMENÚ DE CONFIGURACIÓN (COLLAPSIBLE) */}
            <li>
              <details>
                <summary className="text-slate-400 hover:text-white font-medium">
                  <Settings size={20} /> Configuración
                </summary>
                <ul className="pl-4 border-l border-slate-700 mt-2">
                  <li><a className="text-slate-400 text-xs">Perfil Docente</a></li>
                  <li><a className="text-slate-400 text-xs">Facturación</a></li>
                </ul>
              </details>
            </li>
          </div>

          <li className="mt-auto border-t border-slate-800 pt-4">
            <button className="btn btn-error btn-outline btn-sm w-full gap-2">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}