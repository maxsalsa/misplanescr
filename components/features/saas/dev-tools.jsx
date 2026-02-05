"use client";
import { useState } from "react";
import { useSaaS } from "@/context/saas-context";
import {
  Settings,
  User,
  CreditCard,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export function DevTools() {
  const { userRole, switchRole, planType, upgradePlan, downgradePlan } =
    useSaaS();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development or demo
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.NEXT_PUBLIC_DEMO_MODE
  ) {
    // return null; // Uncomment to hide in real prod
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] font-sans">
      <div
        className={`bg-slate-900 text-white rounded-lg shadow-2xl transition-all duration-300 overflow-hidden border border-slate-700 w-64 ${isOpen ? "max-h-96" : "max-h-12"}`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 flex items-center justify-between bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Settings size={14} className="text-indigo-400" />
            <span>SaaS Control Panel</span>
          </div>
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>

        <div className="p-4 space-y-4">
          {/* Role Switcher */}
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase mb-2 block flex items-center gap-1">
              <User size={10} /> Rol de Usuario
            </label>
            <select
              value={userRole}
              onChange={(e) => switchRole(e.target.value)}
              className="select select-sm select-bordered w-full bg-slate-800 text-white border-slate-600 focus:border-indigo-500"
            >
              <option value="teacher">👨‍🏫 Docente</option>
              <option value="student">👨‍🎓 Estudiante</option>
              <option value="parent">👨‍👩‍👧 Padre/Madre</option>
            </select>
          </div>

          {/* Plan Switcher */}
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase mb-2 block flex items-center gap-1">
              <CreditCard size={10} /> Plan Actual
            </label>
            <div className="flex gap-2">
              <button
                onClick={downgradePlan}
                className={`btn btn-xs flex-1 ${planType === "free" ? "btn-error text-white" : "btn-ghost text-slate-400"}`}
              >
                Free
              </button>
              <button
                onClick={upgradePlan}
                className={`btn btn-xs flex-1 ${planType === "paid" ? "btn-success text-white" : "btn-ghost text-slate-400"}`}
              >
                Pro
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-2 rounded text-[10px] text-slate-500 font-mono">
            Estado: {userRole.toUpperCase()} | {planType.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
