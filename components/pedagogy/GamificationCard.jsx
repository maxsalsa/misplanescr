"use client";
import React from "react";
import { Trophy, Target, Terminal, ShieldAlert, CheckCircle, Code, AlertTriangle } from "lucide-react";

export default function GamificationCard({ game }) {
  if (!game) return null;

  // DETECCIÓN DE MODO VISUAL (OMEGA UI)
  const isTech = game.type === "QUIZ_TECH" || game.title?.includes("Código") || game.title?.includes("Software");
  const isAudit = game.type === "AUDIT_CHALLENGE" || game.title?.includes("Seguridad") || game.title?.includes("Norma");

  // --- MODO 1: TERMINAL DE HACKER (HARD TECH) ---
  if (isTech) {
    return (
      <div className="mt-6 font-mono text-sm">
        <div className="bg-slate-900 text-green-400 rounded-t-lg p-3 flex items-center gap-2 border-b border-slate-700">
          <Terminal className="w-4 h-4" />
          <span className="opacity-70">root@aulaplan:~/gamification# ./start_quiz.sh</span>
        </div>
        <div className="bg-slate-950 text-slate-300 p-6 rounded-b-lg border-x border-b border-slate-900 shadow-2xl">
          <h3 className="text-xl font-bold text-green-500 mb-2 flex items-center gap-2">
            <Code className="w-5 h-5"/> {game.title}
          </h3>
          <p className="mb-6 opacity-80 border-l-2 border-green-700 pl-3">{game.description}</p>
          
          <div className="space-y-4">
            {game.questions?.map((q, i) => (
              <div key={i} className="group">
                <div className="flex gap-2 mb-1">
                  <span className="text-blue-500">[{i+1}]</span>
                  <span className="font-bold text-slate-100">{q.questionText}</span>
                </div>
                <div className="pl-6 space-y-1">
                  {q.options?.map((opt, j) => (
                    <div key={j} className="flex items-center gap-2 hover:bg-slate-900 p-1 rounded cursor-pointer transition-colors">
                      <div className={`w-3 h-3 rounded-full border ${opt === q.correctAnswer ? "bg-green-500 border-green-500" : "border-slate-600"}`}></div>
                      <span className={opt === q.correctAnswer ? "text-green-400 font-bold" : "text-slate-500"}>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-slate-600 animate-pulse">_ ESPERANDO INPUT DEL USUARIO...</div>
        </div>
      </div>
    );
  }

  // --- MODO 2: ALERTA DE SEGURIDAD (INDUSTRIAL/AUDITORÍA) ---
  if (isAudit) {
    return (
      <div className="mt-6 border-l-8 border-red-600 bg-red-50 rounded-r-lg shadow-lg overflow-hidden">
        <div className="bg-red-600 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2 font-black uppercase tracking-widest">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                PROTOCOLO DE SEGURIDAD
            </div>
            <span className="text-xs bg-white text-red-600 px-2 py-1 rounded font-bold">PRIORIDAD ALTA</span>
        </div>
        
        <div className="p-6">
            <h3 className="text-2xl font-black text-red-800 mb-2">{game.title}</h3>
            <p className="text-red-700 mb-6 font-medium">{game.description}</p>

            <div className="grid gap-3">
                {game.questions?.map((q, i) => (
                    <div key={i} className="bg-white p-4 rounded border border-red-100 shadow-sm flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                        <div>
                            <p className="font-bold text-gray-800 mb-2">{q.questionText}</p>
                            <div className="flex flex-wrap gap-2">
                                {q.options?.map((opt, j) => (
                                    <span key={j} className={`px-3 py-1 rounded-full text-xs font-bold border ${opt === q.correctAnswer ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                                        {opt}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }

  // --- MODO 3: ESTÁNDAR (LEGACY / LÚDICO) ---
  return (
    <div className="mt-6 bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Trophy className="w-32 h-32 text-indigo-600" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                {game.type || "Gamificación"}
            </span>
        </div>
        
        <h3 className="text-2xl font-black text-indigo-900 mb-2">{game.title}</h3>
        <p className="text-indigo-700 mb-6">{game.description}</p>

        <div className="grid md:grid-cols-2 gap-4">
            {game.questions?.map((q, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50 hover:border-indigo-300 transition-colors">
                    <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-indigo-500 mt-1" />
                        <div>
                            <p className="font-bold text-gray-800 text-sm mb-2">{q.questionText}</p>
                            <ul className="text-xs space-y-1 text-gray-500">
                                {q.options?.map((opt, j) => (
                                    <li key={j} className={opt === q.correctAnswer ? "text-green-600 font-bold" : ""}>• {opt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}