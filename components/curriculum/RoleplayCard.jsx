import React from "react";
import { User, MessageCircle, Mic } from "lucide-react";
import AudioRecorder from "./AudioRecorder";

export default function RoleplayCard({ scenario, characterA, characterB }) {
  return (
    <div className="card bg-white border border-pink-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 border-b border-pink-100 flex justify-between items-center">
        <div className="flex gap-2 items-center text-pink-700 font-bold">
          <User size={18} />
          <span>Simulación de Roles</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-pink-400 font-mono">
          Soft Skills Mode
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h5 className="text-sm font-bold text-slate-700 mb-2">Escenario:</h5>
          <p className="text-slate-600 text-sm italic border-l-4 border-pink-300 pl-3">
            &quot;{scenario || "Escenario no definido..."}&quot;
          </p>
        </div>

        <div className="space-y-3">
          <div className="chat chat-start">
            <div className="chat-image avatar placeholder">
              <div className="bg-pink-100 text-pink-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                A
              </div>
            </div>
            <div className="chat-header text-xs opacity-50 mb-1">
              {characterA || "Cliente"}
            </div>
            <div className="chat-bubble chat-bubble-secondary text-sm bg-pink-100 text-pink-900">
              ¿Cuál es su protocolo para manejar una queja de alto nivel?
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar placeholder">
              <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                B
              </div>
            </div>
            <div className="chat-header text-xs opacity-50 mb-1 flex items-center gap-1">
              {characterB || "Estudiante"}{" "}
              <Mic size={10} className="text-red-500 animate-pulse" />
            </div>
            <div className="chat-bubble bg-slate-100 text-slate-600 text-sm border border-slate-200 text-left">
              (Respuesta esperada del estudiante...)
            </div>
          </div>
        </div>

        <div className="divider text-xs text-slate-400">
          EVIDENCIA DE ORALIDAD
        </div>

        <AudioRecorder />
      </div>
    </div>
  );
}
