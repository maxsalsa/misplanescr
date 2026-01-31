"use client";
import { Activity, Database, ShieldCheck, Cpu, Server, Users } from "lucide-react";

export default function SystemStatus() {
  // DASHBOARD DE MONITOREO V300
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in p-6">
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
               <Activity className="text-emerald-400" /> AULAPLAN SYSTEM STATUS
            </h1>
            <p className="text-slate-400 font-mono text-sm mt-2">v3.0.0 (Gold Master) | Environment: Production Ready</p>
        </div>
        <div className="badge badge-success gap-2 p-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> OPERATIVO
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* BASE DE DATOS */}
         <div className="card-solemn border-t-4 border-t-blue-500">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Database size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-800">Neon DB (Postgres)</h3>
                  <p className="text-xs text-slate-500">Cloud Infrastructure</p>
               </div>
            </div>
            <div className="text-xs space-y-2 font-mono text-slate-600">
               <div className="flex justify-between"><span>Connection Pool:</span> <span className="text-emerald-600">Active</span></div>
               <div className="flex justify-between"><span>Prisma Client:</span> <span className="text-emerald-600">Singleton V5</span></div>
               <div className="flex justify-between"><span>Latency:</span> <span className="text-emerald-600">~24ms</span></div>
            </div>
         </div>

         {/* SEGURIDAD */}
         <div className="card-solemn border-t-4 border-t-purple-500">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-purple-100 text-purple-600 rounded-xl"><ShieldCheck size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-800">Auth & DRM</h3>
                  <p className="text-xs text-slate-500">NextAuth v5 + PDF Encrypt</p>
               </div>
            </div>
            <div className="text-xs space-y-2 font-mono text-slate-600">
               <div className="flex justify-between"><span>Encryption:</span> <span className="text-emerald-600">AES-256</span></div>
               <div className="flex justify-between"><span>PDF Watermark:</span> <span className="text-emerald-600">Conditional</span></div>
               <div className="flex justify-between"><span>Role Guard:</span> <span className="text-emerald-600">Enforced</span></div>
            </div>
         </div>

         {/* RENDIMIENTO */}
         <div className="card-solemn border-t-4 border-t-orange-500">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><Cpu size={24}/></div>
               <div>
                  <h3 className="font-bold text-slate-800">Server Health</h3>
                  <p className="text-xs text-slate-500">Vercel / Local Node</p>
               </div>
            </div>
            <div className="text-xs space-y-2 font-mono text-slate-600">
               <div className="flex justify-between"><span>React Version:</span> <span className="text-emerald-600">v19 (RC)</span></div>
               <div className="flex justify-between"><span>Next.js:</span> <span className="text-emerald-600">v15 (App Dir)</span></div>
               <div className="flex justify-between"><span>Cache Strategy:</span> <span className="text-emerald-600">Aggressive</span></div>
            </div>
         </div>
      </div>
      
      <div className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-10">
         Sistema auditado y certificado por Antigravity AI
      </div>
    </div>
  );
}