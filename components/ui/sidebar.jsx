"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, BookOpen, Users, Settings, LogOut,
    GraduationCap, FileText, HelpCircle, ShieldAlert, CreditCard
} from "lucide-react";
import { useSession } from "next-auth/react";

export function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.user?.role || "TEACHER"; // Default to Teacher

    // LOGICA DE ROLES (V90)
    const isDirector = role === "DIRECTOR" || role === "SUPER_ADMIN";
    const isSuperAdmin = role === "SUPER_ADMIN";

    // MENÚ BASADO EN ROL
    const menuItems = [
        { name: "Comando Central", href: "/dashboard", icon: LayoutDashboard, visible: true },
        { name: "Crear Planeamiento", href: "/dashboard/create", icon: BookOpen, visible: true },
        { name: "Evaluación (Test Maker)", href: "/dashboard/evaluation", icon: FileText, visible: true }, // NEW
        { name: "Portafolio Digital", href: "/dashboard/library", icon: FileText, visible: true },
        { name: "Expedientes y Grupos", href: "/dashboard/groups", icon: Users, visible: true },
        {
            name: "Gestión Administrativa",
            href: "/dashboard/hr",
            icon: FileText,
            visible: true // Visible for all now (Teachers request perms, Directors approve)
        },
        {
            name: "Auditoría (God Mode)",
            href: "/dashboard/admin",
            icon: ShieldAlert,
            visible: isSuperAdmin,
            className: "text-red-400 hover:text-red-300"
        },
        { name: "Centro de Ayuda", href: "/dashboard/help", icon: HelpCircle, visible: true },
    ];

    return (
        <div className="drawer-side z-50 shadow-2xl lg:shadow-none">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-slate-900 text-slate-100 flex flex-col">

                {/* LOGO EMPRESARIAL */}
                <li className="mb-8 mt-2">
                    <div className="flex flex-col gap-0 hover:bg-transparent cursor-default">
                        <div className="flex items-center gap-3 text-white">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-lg shadow-blue-900/50">
                                <GraduationCap size={28} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">AulaPlan<span className="text-blue-500">.cr</span></span>
                        </div>
                        <div className="flex items-center gap-2 pl-12">
                            <span className="text-[10px] text-slate-400 font-mono tracking-widest">OS V90 BLINDADO</span>
                            {isSuperAdmin && <span className="badge badge-xs badge-error text-white font-bold">GOD</span>}
                        </div>
                    </div>
                </li>

                {/* ITEMS DE NAVEGACIÓN */}
                <div className="flex-1 space-y-1">
                    {menuItems.filter(i => i.visible).map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${pathname === item.href
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-105"
                                        : item.className || "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }
                `}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        </li>
                    ))}

                    {/* SUBMENÚ DE CONFIGURACIÓN */}
                    <li>
                        <details className="group">
                            <summary className="text-slate-400 hover:text-white font-medium group-open:text-white">
                                <Settings size={20} /> Configuración
                            </summary>
                            <ul className="pl-4 border-l-2 border-slate-800 mt-2 space-y-1">
                                <li><Link href="/dashboard/profile" className="text-slate-400 text-xs hover:text-white">Perfil Docente</Link></li>
                                <li>
                                    <Link href="/dashboard/subscription" className="text-slate-400 text-xs hover:text-white flex items-center justify-between">
                                        Facturación
                                        <CreditCard size={12} className="text-emerald-500" />
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </div>

                {/* PIE DE PÁGINA */}
                <li className="mt-auto border-t border-slate-800 pt-4">
                    <button className="btn btn-error btn-outline btn-sm w-full gap-2 uppercase font-bold tracking-wider text-xs">
                        <LogOut size={14} /> Cerrar Sesión
                    </button>
                </li>
            </ul>
        </div>
    );
}
