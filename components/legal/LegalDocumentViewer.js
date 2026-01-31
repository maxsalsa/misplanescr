"use client";
import { useRef, useState } from "react";
import { Printer, FileCheck, Type, Minus, Plus, Eye } from "lucide-react";
import { toast } from "sonner";

export default function LegalDocumentViewer({ title, content }) {
  const [fontSize, setFontSize] = useState(10); // 10pt es el estándar legal DAJ-001
  const [highContrast, setHighContrast] = useState(false);

  // Rangos permitidos: 10pt (Legal) hasta 24pt (Baja Visión)
  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 10));

  const handlePrint = () => {
    window.print();
    toast.success("Enviado a Impresión", { description: `Formato ajustado a ${fontSize}pt.` });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      
      {/* BARRA DE HERRAMIENTAS DE ACCESIBILIDAD (NO IMPRIMIBLE) */}
      <div className="bg-slate-900 text-white p-3 rounded-xl flex flex-wrap justify-between items-center no-print shadow-lg gap-4">
         
         <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><FileCheck size={20}/></div>
            <div>
               <h3 className="font-bold text-sm">Visor Oficial MEP</h3>
               <p className="text-[10px] text-slate-300">Cumple Circular DAJ-001</p>
            </div>
         </div>

         {/* CONTROLES DUA */}
         <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
            <button onClick={decreaseFont} className="btn btn-xs btn-ghost text-white hover:bg-slate-700" title="Reducir Letra">
               <Minus size={14}/>
            </button>
            <div className="flex items-center gap-2 px-2 text-xs font-mono min-w-[80px] justify-center">
               <Type size={14}/> {fontSize}pt
            </div>
            <button onClick={increaseFont} className="btn btn-xs btn-ghost text-white hover:bg-slate-700" title="Aumentar Letra">
               <Plus size={14}/>
            </button>
            <div className="w-px h-4 bg-slate-600 mx-1"></div>
            <button 
               onClick={() => setHighContrast(!highContrast)} 
               className={`btn btn-xs ${highContrast ? "btn-warning text-black" : "btn-ghost text-white"}`}
               title="Alto Contraste"
            >
               <Eye size={14}/> {highContrast ? "ON" : "OFF"}
            </button>
         </div>

         <button onClick={handlePrint} className="btn btn-institutional bg-white text-slate-900 hover:bg-slate-100 border-none btn-sm">
            <Printer size={16}/> Imprimir
         </button>
      </div>

      {/* LIENZO DEL DOCUMENTO (IMPRIMIBLE) */}
      <div className={`p-8 overflow-auto flex justify-center no-print-bg transition-colors duration-300 ${highContrast ? "bg-black" : "bg-slate-100"}`}>
         
         <div 
            className="document-legal-mep shadow-xl transition-all duration-300"
            style={{ 
               fontSize: `${fontSize}pt`,
               // Si es alto contraste, fondo negro y letra amarilla/blanca
               backgroundColor: highContrast ? "#000000" : "#ffffff",
               color: highContrast ? "#FFFF00" : "#000000",
               borderColor: highContrast ? "#FFFF00" : "transparent"
            }}
         >
            {/* ENCABEZADO AUTOMÁTICO SI ES PRUEBA */}
            <div className="mb-6 text-center" style={{ fontSize: `${fontSize + 2}pt`, fontWeight: "bold" }}>
               MINISTERIO DE EDUCACIÓN PÚBLICA
            </div>

            {/* CONTENIDO INYECTADO */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
         </div>

      </div>
      
      <p className="text-center text-xs text-slate-400 no-print">
         * Al imprimir, el navegador respetará el tamaño de letra seleccionado.
      </p>
    </div>
  );
}