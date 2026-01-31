'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, LayoutDashboard, Sparkles, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { GlobalSearch } from './GlobalSearch';

export function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Tablero', href: '/', icon: LayoutDashboard },
    { name: 'Generador MEP', href: '/generador', icon: Sparkles },
    { name: 'Estudiantes', href: '/estudiantes', icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white"><GraduationCap size={20} /></div>
          <span className="font-bold text-slate-800 hidden md:block">MisPlanesCR</span>
        </div>

        {/* SEARCH BAR */}
        <div className="flex-1 mx-8 max-w-md hidden md:block">
          <GlobalSearch />
        </div>

        <div className="flex gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={twMerge("flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")}
              >
                <item.icon size={16} /> {item.name}
              </Link>
            );
          })}
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Profesor Max</div>
      </div>
    </nav>
  );
}
