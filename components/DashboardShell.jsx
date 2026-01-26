"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  PenTool, 
  Users, 
  Database, 
  LogOut, 
  Menu, 
  ShieldCheck 
} from "lucide-react";

export default function DashboardShell({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // En producción, estos datos vendrían de la sesión real
  const user = { name: "Max Salazar", role: "SUPER_ADMIN", plan: "ULTRA" };

  const menuItems = [
    { name: "Tablero", href: "/dashboard", icon: LayoutDashboard },
    { name: "Generar Plan", href: "/dashboard/create", icon: Sparkles },
    { name: "Herramientas", href: "/dashboard/tools", icon: PenTool }, // Rúbricas, Exámenes
    // { name: "Mis Estudiantes", href: "/dashboard/students", icon: Users }, // Futuro
  ];

  return (
    <div className="flex h-screen bg-base-200 font-sans text-base-content overflow-hidden">
      {/* SIDEBAR INTELIGENTE */}
      <aside className={`bg-base-100 border-r border-base-300 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} flex flex-col relative z-20`}>
        
        {/* LOGO */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-base-300 bg-base-100">
          {isSidebarOpen && (
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AULAPLAN
            </span>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-sm btn-square">
            <Menu size={20} />
          </button>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${isActive ? "bg-primary text-primary-content shadow-md" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}>
                <item.icon size={20} className={isActive ? "text-primary-content" : "text-base-content/50 group-hover:text-primary"} />
                {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}

          {/* ZONA ADMIN (SOLO SUPER_ADMIN) */}
          {user.role === "SUPER_ADMIN" && (
            <>
              <div className="divider my-4 text-xs opacity-50 px-4">{isSidebarOpen ? "ADMINISTRACIÓN" : "---"}</div>
              <Link href="/admin/programs" className={`flex items-center gap-3 px-3 py-3 rounded-lg text-warning hover:bg-warning/10 transition-colors ${pathname === "/admin/programs" ? "bg-warning/20" : ""}`}>
                <Database size={20} />
                {isSidebarOpen && <span className="font-bold text-sm">Gestor Curricular</span>}
              </Link>
            </>
          )}
        </nav>

        {/* PIE DE PÁGINA DE USUARIO */}
        <div className="p-4 border-t border-base-300 bg-base-100/50">
          <div className="flex items-center gap-3">
            <div className={`avatar placeholder ${user.plan === "ULTRA" ? "online" : ""}`}>
              <div className="bg-neutral text-neutral-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                <span className="text-xs font-bold">MX</span>
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden transition-all">
                <span className="text-sm font-bold truncate leading-none mb-1">{user.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-wide opacity-60 bg-base-300 px-1 rounded w-fit">
                  {user.role}
                </span>
              </div>
            )}
          </div>
          {isSidebarOpen && (
             <Link href="/login" className="btn btn-xs btn-ghost w-full mt-3 text-error gap-2">
               <LogOut size={12} /> Cerrar Sesión
             </Link>
          )}
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        <div className="container mx-auto p-6 md:p-8 max-w-7xl animate-in fade-in duration-500">
           {children}
        </div>
      </main>
    </div>
  );
}
