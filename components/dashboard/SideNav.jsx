import Link from "next/link";
import { Building2, Home, BookOpen, Users, BarChart3, Settings, MapPin, Database } from "lucide-react";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 border-r bg-white">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-900 p-4 md:h-32" href="/">
        <div className="w-32 text-white md:w-40">
          <h1 className="font-black text-xl">AULAPLAN <span className="text-blue-500">TITÁN</span></h1>
          <p className="text-[10px] text-slate-400">Sistema Blindado v4.0</p>
        </div>
      </Link>
      
      {/* NAVEGACIÓN */}
      <div className="flex grow flex-col space-y-2">
        <NavLinks />
        <div className="grow bg-slate-50 rounded-md"></div>
        
        {/* BOTÓN DE BACKUP (REDUNDANCIA) */}
        <a href="/api/backup" target="_blank" className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-md text-xs font-bold hover:bg-emerald-100 border border-emerald-200">
            <Database size={14}/> BACKUP SEGURO
        </a>
      </div>
    </div>
  );
}

function NavLinks() {
  const links = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Librería Total", href: "/dashboard/library", icon: BookOpen },
    { name: "Registros", href: "/dashboard/grades", icon: Users },
    { name: "Instrumentos", href: "/dashboard/instruments", icon: BarChart3 },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] items-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          >
            <LinkIcon className="w-5" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}