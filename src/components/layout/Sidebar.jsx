"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  UploadCloud,
  Heart,
  ShieldAlert
} from 'lucide-react';

/**
 * 🧭 MASTER NAVIGATION
 * Central Hub connecting all "Swiss Clock" Modules.
 */

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: 'Panel Principal', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Mis Planeamientos', icon: FileText, path: '/dashboard/plans' },

    // 🇨🇭 MÓDULOS RELOJ SUIZO
    { section: 'HERRAMIENTAS' },
    { name: 'Importador Inteligente', icon: UploadCloud, path: '/dashboard/tools/importer' },
    { name: 'Cápsulas Familiares', icon: Heart, path: '/dashboard/tools/family' },

    // 🏢 MÓDULO B2B (DIRECTOR)
    { section: 'INSTITUCIÓN' },
    { name: 'Gestión de Licencias', icon: Users, path: '/dashboard/admin/licenses' },
    { name: 'Configurar Identidad', icon: Settings, path: '/dashboard/settings/institution' },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen text-slate-300 p-4 flex flex-col">
      <div className="font-black text-2xl text-white mb-8 px-2 tracking-tighter">
        MisPlanes<span className="text-primary">CR</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item, i) => (
          item.section ? (
            <div key={i} className="text-xs font-bold text-slate-500 uppercase mt-6 mb-2 px-2">
              {item.section}
            </div>
          ) : (
            <Link
              key={i}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${pathname === item.path ? 'bg-primary text-white' : 'hover:bg-slate-800'}`}
            >
              <item.icon size={18} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        ))}
      </nav>

      <div className="p-4 bg-slate-800 rounded-xl mt-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <ShieldAlert size={12} />
          <span>Zona Segura (SSL)</span>
        </div>
        <div className="text-[10px] text-slate-500">
          ID: USR-SESSION-ACTIVE
        </div>
      </div>
    </div>
  );
}
