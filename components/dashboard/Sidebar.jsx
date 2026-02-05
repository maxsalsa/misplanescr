"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FilePlus2, // Icono para Nuevo Planeamiento
  Users,     // Docente Guía
  AlertCircle, // Boletas
  BookOpen, 
  LogOut 
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Centro de Comando", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Nuevo Planeamiento", icon: FilePlus2, href: "/dashboard/planning/new" }, // NOMBRE CORREGIDO
  { name: "Docente Guía", icon: Users, href: "/dashboard/students" }, // NUEVO
  { name: "Control de Boletas", icon: AlertCircle, href: "/dashboard/behavior" }, // NUEVO
  { name: "Recursos MEP", icon: BookOpen, href: "/dashboard/library" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        {/* LOGO PEQUEÑO */}
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            AP
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">AULAPLAN</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"}`}>
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button onClick={() => signOut()} className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
          <LogOut size={20} />
          <span>Salir del Sistema</span>
        </button>
      </div>
    </div>
  );
}