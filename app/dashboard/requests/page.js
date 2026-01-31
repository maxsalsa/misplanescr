"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth-context"; // CONTEXTO DE CASTA
import { FileText, CheckCircle, XCircle, Clock, Upload, Send } from "lucide-react";
import { toast } from "sonner";

export default function RequestsPage() {
   const { user } = useAuth(); // { role: 'DIRECTOR' | 'PARENT' | 'TEACHER' }
   const isDirector = user?.role === 'DIRECTOR' || user?.role === 'SUPER_ADMIN';
   const isParent = user?.role === 'PARENT' || user?.role === 'STUDENT';

   // DATOS SIMULADOS (NEON DB)
   const [requests, setRequests] = useState([
      { id: 1, student: "Mora Rojas Sebastián", type: "Justificación Médica", date: "27/01/2026", status: "PENDIENTE", file: "dictamen.pdf" },
      { id: 2, student: "Jiménez Castro Valentina", type: "Permiso de Salida", date: "28/01/2026", status: "APROBADO", file: null }
   ]);

   if (isParent) {
      // VISTA FAMILIA: SOLO ENVIAR
      return (
         <div className="max-w-2xl mx-auto p-6 space-y-6 animate-in fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
               <h1 className="text-2xl font-black text-slate-900 mb-2">Trámite Familiar</h1>
               <p className="text-slate-500 mb-6">Envíe justificaciones o solicite permisos para su hijo/a.</p>

               <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Solicitud Enviada a Dirección"); }}>
                  <div>
                     <label className="label font-bold text-slate-700">Tipo de Trámite</label>
                     <select className="select select-bordered w-full bg-slate-50">
                        <option>Justificación de Ausencia (Enfermedad)</option>
                        <option>Permiso de Salida Temprana</option>
                        <option>Beca de Transporte</option>
                     </select>
                  </div>

                  <div>
                     <label className="label font-bold text-slate-700">Adjuntar Evidencia (Foto/PDF)</label>
                     <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer">
                        <Upload className="mx-auto text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500">Clic para subir dictamen o carta</span>
                     </div>
                  </div>

                  <button className="btn btn-primary w-full gap-2">
                     <Send size={16} /> Enviar Solicitud
                  </button>
               </form>
            </div>

            <div className="text-center text-xs text-slate-400">
               <p>Sus datos están protegidos por el Protocolo V300.</p>
            </div>
         </div>
      );
   }

   // VISTA DIRECTOR/DOCENTE: APROBAR
   return (
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in pb-20">

         <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div>
               <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="text-blue-600" /> Gestión de Dirección
               </h1>
               <p className="text-slate-500 text-sm">Bandeja de Entrada de Trámites Oficiales.</p>
            </div>
            <div className="flex gap-2">
               <span className="badge badge-warning gap-1 font-bold">1 Pendiente</span>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">
               {requests.map((req) => (
                  <div key={req.id} className="card-solemn flex justify-between items-center group hover:border-blue-300 cursor-pointer transition-all">
                     <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${req.status === "PENDIENTE" ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"}`}>
                           {req.status === "PENDIENTE" ? <Clock size={20} /> : <CheckCircle size={20} />}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-800">{req.student}</h4>
                           <p className="text-xs text-slate-500 font-bold uppercase">{req.type} • {req.date}</p>
                           {req.file && (
                              <span className="text-xs text-blue-600 underline flex items-center gap-1 mt-1">
                                 <FileText size={10} /> Ver Adjunto
                              </span>
                           )}
                        </div>
                     </div>

                     {req.status === "PENDIENTE" && (
                        <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => toast("Solicitud Rechazada")} className="btn btn-circle btn-sm btn-ghost text-red-500 hover:bg-red-50" title="Rechazar">
                              <XCircle size={20} />
                           </button>
                           <button onClick={() => toast.success("Solicitud Aprobada")} className="btn btn-circle btn-sm btn-ghost text-emerald-500 hover:bg-emerald-50" title="Aprobar">
                              <CheckCircle size={20} />
                           </button>
                        </div>
                     )}
                  </div>
               ))}
            </div>

            <div className="space-y-6">
               <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold mb-2">Invitar Director/Familia</h3>
                  <p className="text-xs text-slate-400 mb-4">Envíe un acceso seguro para gestión de trámites.</p>
                  {/* Formulario de invitación mantiene funcionalidad */}
                  <button className="btn btn-primary btn-sm w-full">Enviar Acceso Seguro</button>
               </div>
            </div>

         </div>
      </div>
   );
}