"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function ExamPage({ params }) {
  const [plan, setPlan] = useState(null);
  const [exam, setExam] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => { Promise.resolve(params).then(p => fetch(`/api/plans/search?id=${p.id}`).then(r=>r.json()).then(d=>{setPlan(d[0]); setExam(JSON.parse(d[0].content).resources_360?.exam_preview)})) }, [params]);
  if (!plan) return <div>Cargando...</div>;
  return (
    <div className="bg-gray-100 min-h-screen p-8 print:p-0 print:bg-white">
      <div className="max-w-[21cm] mx-auto mb-6 flex justify-between print:hidden"><button onClick={()=>router.back()} className="btn btn-ghost">Volver</button><button onClick={()=>window.print()} className="btn btn-primary"><Printer/> Imprimir</button></div>
      <div className="max-w-[21cm] mx-auto bg-white shadow-2xl p-12 min-h-[29.7cm] print:shadow-none print:p-0 text-sm font-serif">
        <div className="text-center border-b-2 border-black pb-4 mb-8"><h1 className="font-bold uppercase">MEP - Prueba Escrita</h1><h2>{plan.subject}</h2><p>I Periodo 2026</p></div>
        <div className="grid grid-cols-2 gap-4 border border-black p-4 mb-8"><div><strong>Docente:</strong> {session?.user?.name}</div><div><strong>Nivel:</strong> {plan.level}</div></div>
        <div className="space-y-8">
            <div><h3 className="font-bold bg-gray-100 p-1 mb-4">I Parte. Selección Única</h3>{exam?.selection?.map((q,i)=><div key={i} className="mb-4 break-inside-avoid"><p>{i+1}. {q}</p><div className="pl-4">a) ____ b) ____ c) ____</div></div>)}</div>
            <div><h3 className="font-bold bg-gray-100 p-1 mb-4">II Parte. Desarrollo</h3>{exam?.production?.map((q,i)=><div key={i} className="mb-4 break-inside-avoid"><p>{q}</p><div className="h-24 border rounded mt-2"></div></div>)}</div>
        </div>
      </div>
    </div>
  );
}