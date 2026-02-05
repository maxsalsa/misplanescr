"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  GraduationCap,
  Settings,
  LogOut,
  BookOpen,
  Crown,
} from "lucide-react";
import { signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

export default function SideNav() {
  const pathname = usePathname();

  const links = [
    {
      name: "Centro de Comando",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      adminOnly: true,
    },
    { name: "Generador IA", href: "/dashboard/generator", icon: Crown },
    { name: "Librería de Planes", href: "/dashboard/library", icon: Library },
    { name: "Mis Grupos", href: "/dashboard/groups", icon: GraduationCap },
    { name: "Registro de Notas", href: "/dashboard/grades", icon: BookOpen },
  ];

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-base-200 border-r border-base-300">
      {/* LOGO */}
      <Link
        href="/"
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-32"
      >
        <div className="w-32 text-primary-content md:w-40">
          <h1 className="text-2xl font-black tracking-tighter">AULAPLAN</h1>
          <p className="text-xs font-medium opacity-80">
            Sistema Inteligente MEP
          </p>
        </div>
      </Link>

      {/* NAVEGACIÓN */}
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-4">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-base-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3 transition-all
              ${isActive ? "bg-base-100 text-primary border-l-4 border-primary shadow-sm" : "text-base-content/70"}`}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}

        <div className="hidden h-auto w-full grow rounded-md bg-base-100/50 md:block"></div>

        {/* ZONA DE USUARIO */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-bold text-base-content/50 uppercase">
              Apariencia
            </span>
            <ThemeToggle />
          </div>

          <button
            onClick={() => signOut()}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-base-100 p-3 text-sm font-medium hover:bg-error/10 hover:text-error md:flex-none md:justify-start md:p-2 md:px-3 transition-colors"
          >
            <LogOut className="w-6" />
            <div className="hidden md:block">Cerrar Sesión</div>
          </button>
        </div>
      </div>
    </div>
  );
}
