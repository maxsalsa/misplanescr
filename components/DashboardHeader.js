"use client";
import { ShieldCheck, User, Bell } from "lucide-react";

export default function DashboardHeader({ user }) {
  // En prod, user viene de la sesión real
  const currentUser = user || { name: "Max Salazar", role: "SUPER_ADMIN", plan: "ULTRA" };

  return (
    <div className="w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
       <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="font-bold text-slate-800 tracking-tight">AULAPLAN <span className="text-xs align-top text-blue-600">OS</span></span>
       </div>

       <div className="flex items-center gap-6">
          {/* BADGE DE PLAN */}
          {currentUser.plan === "ULTRA" && (
             <div className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-slate-200">
                <ShieldCheck size={12} className="text-emerald-400"/>
                <span>PLAN ULTRA</span>
             </div>
          )}
          
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><Bell size={20}/></button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 font-mono tracking-wide">{currentUser.role}</p>
             </div>
             <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
                <User size={20}/>
             </div>
          </div>
       </div>
    </div>
  );
}