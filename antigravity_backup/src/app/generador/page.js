'use client';

import { useState } from 'react';
import { generatePlanAction } from '@/actions/generate';
import { OfficialDocument } from '@/components/pdf/OfficialDoc'; // Importamos el PDF engine
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Printer, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import Link from 'next/link';

export default function GeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [formDataState, setFormDataState] = useState({}); // Guardamos los datos para el PDF

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setPlan(null);
    
    const formData = new FormData(event.target);
    const dataObj = Object.fromEntries(formData.entries());
    setFormDataState(dataObj); // Guardamos datos administrativos
    
    const result = await generatePlanAction(formData);

    if (result.success) {
      setPlan(result.plan);
      toast.success("Documento Generado", { description: "Listo para revisión oficial." });
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
      
      {/* FORMULARIO DE TRABAJO (Se oculta al imprimir) */}
      <div className="lg:col-span-4 space-y-6 print:hidden">
        <div className="mb-4">
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-700 flex items-center gap-1">
             <ArrowLeft size={16} /> Volver
           </Link>
        </div>

        <Card className="border-t-4 border-t-blue-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-bold text-slate-800 border-b pb-2">Datos Administrativos</h3>
            <Input label="Centro Educativo" name="centro" defaultValue="CTP General" />
            <Input label="Dirección Regional" name="regional" defaultValue="San José Norte" />
            
            <h3 className="font-bold text-slate-800 border-b pb-2 pt-2">Datos Curriculares</h3>
            <div className="grid grid-cols-2 gap-3">
               <Select label="Asignatura" name="asignatura" options={["Matemáticas", "Ciencias", "Español", "Estudios Sociales"]} />
               <Select label="Nivel" name="nivel" options={["7mo", "8vo", "9no", "10mo", "11mo"]} />
            </div>
            
            <Select label="Modalidad" name="modalidad" options={["Académica", "Técnica Profesional", "Nocturna"]} />

            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Tema / Indicador</label>
                <textarea required name="topic" rows="3" className="w-full rounded-lg border-2 border-slate-200 p-2 text-sm focus:border-blue-600 outline-none" placeholder="Tema a desarrollar..."></textarea>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full bg-blue-800 hover:bg-blue-900"><Sparkles size={18} className="mr-2"/> Generar Oficial</Button>
          </form>
        </Card>
      </div>

      {/* VISTA PREVIA (Pantalla) + DOCUMENTO OFICIAL (Impresión) */}
      <div className="lg:col-span-8">
        {plan ? (
          <>
            {/* 1. VISOR DE PANTALLA (UX Amigable) */}
            <Card className="min-h-[800px] bg-white print:hidden border-l-4 border-l-green-500">
               <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                     <Badge className="bg-green-600 text-white border-none">Borrador</Badge>
                     <span className="text-xs text-slate-400">Revise antes de imprimir</span>
                  </div>
                  <Button onClick={() => window.print()} className="h-9 bg-slate-800 text-white"><Printer size={16} className="mr-2"/> Imprimir Oficial</Button>
               </div>
               <div className="prose prose-slate max-w-none">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{plan}</ReactMarkdown>
               </div>
            </Card>

            {/* 2. DOCUMENTO OFICIAL (Solo visible al Imprimir) */}
            <OfficialDocument 
              planData={formDataState} 
              user={{ name: "Profesor Max", regional: formDataState.regional, centro: formDataState.centro }} 
              content={plan} 
            />
          </>
        ) : (
          <div className="h-[600px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 print:hidden">
            <p className="font-bold">Área de Trabajo</p>
          </div>
        )}
      </div>

    </div>
  );
}
