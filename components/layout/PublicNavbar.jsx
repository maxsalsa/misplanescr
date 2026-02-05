import Link from "next/link";
import { ShieldCheck, LogIn } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="w-full py-4 px-6 bg-slate-900 text-white flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-blue-500" size={28} />
        <span className="text-xl font-black tracking-tighter">MISPLANESCR</span>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          href="#precios"
          className="text-sm font-bold text-slate-300 hover:text-white transition-colors hidden md:block"
        >
          Planes
        </Link>
        <Link
          href="/login"
          className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white border-none gap-2 px-6 rounded-full"
        >
          <LogIn size={16} /> Ingresar
        </Link>
      </div>
    </nav>
  );
}
