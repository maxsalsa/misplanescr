"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const MENU = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mis Planes", href: "/dashboard/plans", icon: BookOpen },
  { name: "Evaluación", href: "/dashboard/assessment", icon: FileText },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    Cookies.remove("ap_session");
    router.push("/auth/login");
  };

  return (
    <>
      <div className="md:hidden p-4 bg-white border-b flex justify-between shadow-sm sticky top-0 z-50">
        <span className="font-black text-slate-800">AulaPlan</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Desktop */}
      <aside className="hidden md:flex w-64 h-screen bg-slate-900 text-white flex-col sticky top-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="font-black text-2xl">AulaPlan.cr</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {MENU.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={cn(
                "flex gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-all",
                pathname === i.href && "bg-blue-600 shadow-lg",
              )}
            >
              <i.icon size={20} /> <span className="font-medium">{i.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <button
            onClick={logout}
            className="flex gap-2 text-red-400 hover:text-red-300"
          >
            <LogOut size={20} /> Salir
          </button>
        </div>
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 z-50 bg-slate-900 text-white w-3/4 shadow-2xl md:hidden p-4"
          >
            <div className="flex justify-between mb-8">
              <h2 className="font-bold text-xl">Menú</h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="space-y-4">
              {MENU.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setIsOpen(false)}
                  className="flex gap-3 text-lg"
                >
                  {i.icon} {i.name}
                </Link>
              ))}
            </nav>
            <button onClick={logout} className="mt-8 text-red-400 flex gap-2">
              <LogOut /> Cerrar Sesión
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
