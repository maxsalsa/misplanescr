"use client";
import { useState } from "react";
import { HelpCircle, X, MessageCircle } from "lucide-react";

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 no-print">
      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 w-72 animate-in slide-in-from-bottom-5 mb-2">
           <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-900 text-sm">¿Necesita ayuda, profe?</h4>
              <button onClick={() => setIsOpen(false)}><X size={14} className="text-slate-400"/></button>
           </div>
           <p className="text-slate-600 text-xs leading-relaxed mb-3">
             Estoy aquí para guiarle. Si no sabe cómo llenar un formulario o descargar un PDF, pregúnteme.
           </p>
           <button className="btn btn-institutional btn-sm w-full text-xs">
             <MessageCircle size={14}/> Chatear con Soporte
           </button>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/20 flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24}/> : <HelpCircle size={28}/>}
      </button>
    </div>
  );
}