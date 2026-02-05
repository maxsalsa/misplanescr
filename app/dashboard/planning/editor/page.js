"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, FileDown, Lock, FileCheck } from "lucide-react";
import { toast } from "sonner";

export default function PlanEditorPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [plan, setPlan] = useState(null);

  const status = session?.user?.subscriptionStatus || "FREE";
  const role = session?.user?.role || "USER";
  const isPaidUser = status === "SEMESTRAL" || status === "ANUAL" || status === "VIP" || role === "ADMIN";

  useEffect(() => {
    const savedPlan = localStorage.getItem("generatedPlan");
    if (!savedPlan) {
        toast.warning("Sesión de documento expirada.");
        return router.push("/dashboard/planning/new");
    }
    setPlan(JSON.parse(savedPlan));
  }, []);

  const handlePrint = () => window.print();

  if (!plan) return null;
  const { encabezado, desarrollo_pedagogico: sections } = plan;

  return (
    <div className="min-h-screen bg-slate-900 p-8 font-sans print:bg-white print:p-0">
      
      {/* BARRA DE HERRAMIENTAS */}
      <div className="max-w-[21cm] mx-auto mb-6 flex justify-between items-center print:hidden">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white flex gap-2 text-sm font-bold items-center">
            <ArrowLeft className="w-4 h-4"/> EDITAR PARÁMETROS
        </button>
        <button onClick={handlePrint} className="btn bg-blue-600 hover:bg-blue-500 text-white border-none gap-2 px-6 font-bold shadow-lg shadow-blue-900/50">
            <FileDown className="w-4 h-4"/> DESCARGAR PDF OFICIAL
        </button>
      </div>

      {/* HOJA A4 (CSS PURO) */}
      <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] p-[2.5cm] shadow-2xl relative print:shadow-none print:m-0 print:w-full print:max-w-none">
        
        {/* BLOQUEO VISUAL SI NO PAGA */}
        {!isPaidUser && (
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 print:visible">
                <Lock className="w-16 h-16 text-slate-800 mb-4"/>
                <h2 className="text-3xl font-black text-slate-900">VISTA PREVIA LIMITADA</h2>
                <p className="text-slate-600 mt-2 font-medium">Su licencia actual no permite descargar este documento.</p>
            </div>
        )}

        {/* ENCABEZADO MEP */}
        <div className="text-center mb-6">
            <h1 className="font-bold uppercase text-black text-lg font-serif">Ministerio de Educación Pública</h1>
            <h2 className="font-bold uppercase text-black text-sm">Dirección de Educación Técnica</h2>
            <div className="mt-2 border-b-2 border-black inline-block px-8 pb-1 mb-1">
                <h3 className="font-bold uppercase text-black text-sm">Planeamiento Didáctico Mensual</h3>
            </div>
        </div>

        {/* DATOS ADMINISTRATIVOS */}
        <table className="w-full border-collapse border border-black mb-6 text-sm">
            <tbody>
                <tr>
                    <td className="border border-black p-2 w-1/2"><span className="font-bold">Centro Educativo:</span> {encabezado.institucion}</td>
                    <td className="border border-black p-2 w-1/2"><span className="font-bold">Docente:</span> {session?.user?.name}</td>
                </tr>
                <tr>
                    <td className="border border-black p-2"><span className="font-bold">Asignatura:</span> {encabezado.asignatura}</td>
                    <td className="border border-black p-2"><span className="font-bold">Nivel:</span> {encabezado.nivel}</td>
                </tr>
                <tr>
                    <td className="border border-black p-2" colSpan={2}><span className="font-bold">Unidad:</span> {encabezado.unidad}</td>
                </tr>
            </tbody>
        </table>

        {/* TABLA PEDAGÓGICA */}
        <div className="mb-2 font-bold uppercase text-xs text-black">I. Mediación Pedagógica</div>
        <table className="w-full border-collapse border border-black text-sm">
            <thead className="bg-gray-100 print:bg-transparent">
                <tr>
                    <th className="border border-black p-2 w-1/3 text-center">Aprendizaje Esperado</th>
                    <th className="border border-black p-2 w-2/3 text-center">Estrategias de Mediación</th>
                </tr>
            </thead>
            <tbody>
                {sections.map((item, idx) => (
                    <tr key={idx} className="break-inside-avoid">
                        <td className="border border-black p-3 align-top text-justify">{item.resultado_aprendizaje_oficial}</td>
                        <td className="border border-black p-0 align-top">
                            <div className="p-3 border-b border-black last:border-b-0">
                                <p className="mb-2 text-justify"><span className="font-bold underline">Focalización:</span> {item.estrategias_mediacion?.find(e=>e.fase.includes("Foc"))?.actividad}</p>
                                <p className="mb-2 text-justify"><span className="font-bold underline">Exploración:</span> {item.estrategias_mediacion?.find(e=>e.fase.includes("Exp"))?.actividad}</p>
                                <p className="text-justify"><span className="font-bold underline">Contrastación:</span> {item.estrategias_mediacion?.find(e=>e.fase.includes("Con"))?.actividad}</p>
                            </div>
                            <div className="p-2 bg-gray-50 print:bg-transparent text-xs italic border-t border-black">
                                <span className="font-bold not-italic">Evaluación: </span>{item.indicadores_evaluacion?.join(", ")}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* FIN: SIN RASTROS */}
    
      </div>
    </div>
  );
}