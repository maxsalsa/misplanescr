"use client";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function NotificationRequest() {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("64503722");
    toast.success("Número SINPE copiado");
  };

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
      <h4 className="font-bold text-blue-900 mb-2">Instrucciones de Activación</h4>
      <p className="text-sm text-blue-800 mb-4">
        Para activar su licencia, realice el pago vía SINPE Móvil y envíe el comprobante.
      </p>
      
      <div className="bg-white p-3 rounded-lg border border-blue-100 flex items-center justify-between mb-4">
        <div>
            <p className="text-xs text-slate-500 uppercase font-bold">SINPE Móvil (Banco Popular)</p>
            <p className="text-xl font-mono font-black text-slate-800">6450-3722</p>
            <p className="text-xs text-slate-600">Max Salazar Sánchez</p>
        </div>
        <button onClick={copyToClipboard} className="btn btn-sm btn-ghost text-blue-600">
            <Copy className="w-4 h-4"/>
        </button>
      </div>

      <div className="text-xs text-center text-slate-500">
        Una vez realizado, haga clic en el botón de WhatsApp para enviar el comprobante.
      </div>
    </div>
  );
}