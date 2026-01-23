'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// CORRECCIÓN APLICADA: Alias para evitar conflictos
import { Menu as MenuIcon, X, LayoutDashboard, BookOpen, Users, GraduationCap, FileText, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const navigation = [
    { name: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Planeamiento', href: '/dashboard/planning', icon: BookOpen },
    { name: 'Estudiantes', href: '/dashboard/students', icon: Users },
    { name: 'Evaluación', href: '/dashboard/grading', icon: GraduationCap },
  ];

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-zinc-950'>
      {/* MOBILE HEADER */}
      <div className='lg:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border-b border-slate-200'>
        <span className='font-bold text-indigo-600'>Aulaplan</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='p-2'>
          {isSidebarOpen ? <X className='w-6 h-6' /> : <MenuIcon className='w-6 h-6' />}
        </button>
      </div>

      <div className='flex'>
        {/* SIDEBAR */}
        <aside className={ixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static }>
           <div className='h-16 flex items-center px-6 border-b border-slate-200'>
             <span className='text-xl font-bold'>Antigravity</span>
           </div>
           <nav className='p-4 space-y-1'>
             {navigation.map((item) => {
               const Icon = item.icon;
               return (
                 <Link key={item.name} href={item.href} className='flex items-center px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg'>
                   <Icon className='w-5 h-5 mr-3' />
                   {item.name}
                 </Link>
               );
             })}
           </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className='flex-1 p-4 lg:p-8'>{children}</main>
      </div>
    </div>
  );
}
