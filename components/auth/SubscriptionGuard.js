"use client";
import { Lock, Smartphone, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SubscriptionGuard({ children, status = "ACTIVE" }) {
  // SI EL USUARIO ESTÁ ACTIVO, LO DEJA PASAR
  if (status === "ACTIVE") {
    return <>{children}</>;
  }

  // SI NO, MUESTRA PANTALLA DE COBRO (SINPE)
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl flex flex-col md:flex-row w-full">
        {/* LADO IZQUIERDO: MENSAJE */}
        <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-2">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            Su suscripción ha expirado
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Para continuar utilizando la Inteligencia Artificial, el Generador
            de Pruebas y el Respaldo en la Nube, es necesario renovar su acceso.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 className="text-emerald-500" size={18} /> Acceso
              ilimitado a Plantillas MEP
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 className="text-emerald-500" size={18} /> Generador
              de Exámenes Matemáticos
            </div>
          </div>
        </div>

        {/* LADO DERECHO: PAGO SINPE */}
        <div className="bg-blue-600 p-10 md:w-1/2 text-white flex flex-col justify-center items-center text-center">
          <Smartphone size={64} className="mb-6 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Renovación Inmediata</h2>
          <p className="text-blue-100 text-sm mb-8">
            Realice su pago vía SINPE Móvil y envíe el comprobante.
          </p>

          <div className="bg-white/10 p-6 rounded-2xl w-full border border-white/20 mb-6">
            <p className="text-xs uppercase tracking-widest text-blue-200 mb-1">
              SINPE MÓVIL OFICIAL
            </p>
            <p className="text-4xl font-black tracking-wider">6090-6359</p>
            <p className="text-xs mt-2 text-blue-200">
              A nombre de: Max Salazar
            </p>
          </div>

          <button className="btn btn-white w-full text-blue-900 font-bold hover:bg-blue-50">
            Ya realicé el pago (Reportar)
          </button>
        </div>
      </div>
    </div>
  );
}
