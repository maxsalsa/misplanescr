"use client";
import { useState, useEffect } from "react";
import { Sparkles, AlertTriangle, BookOpen, Clock, Zap, Download, Copy, RefreshCw } from "lucide-react";
import { getTeacherGroups } from "@/app/actions/planning";
import { generatePlanAction } from "@/app/actions/generate"; // IMPORTANTE
import { toast } from "sonner";

export default function CreatePlanPage() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null); // Aquí guardamos el HTML

  useEffect(() => { getTeacherGroups().then(setGroups); }, []);

  const handleGroupChange = (e) => {
    const groupName = e.target.value;
    const group = groups.find(g => g.name === groupName);
    setSelectedGroup(group);
    if (group?.has7600) toast("Protocolo de Inclusión Activado", { icon: <AlertTriangle className="text-orange-500" /> });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedPlan(null);

    // Feedback visual inmediato (Empático)
    const toastId = toast.loading("Consultando con el Motor Pedagógico...", {
      description: "Analizando perfiles estudiantiles y normativa..."
    });

    const formData = new FormData(e.target);
    const data = {
      subject: formData.get("subject"),
      grade: selectedGroup?.name || "General",
      duration: formData.get("duration"),
      topic: formData.get("topic"),
      inclusionContext: selectedGroup ?
        `${selectedGroup.has7600 ? "Ley 7600 (Discapacidad). " : ""}${selectedGroup.isGifted ? "Alta Dotación. " : ""}`
        : ""
    };

    try {
      const result = await generatePlanAction(data);

      if (result.success) {
        setGeneratedPlan(result.html);
        toast.dismiss(toastId);
        toast.success("¡Propuesta Lista!", {
          description: "Puede revisar, imprimir o copiar su planeamiento.",
          icon: <Sparkles className="text-yellow-400" />
        });
      } else {
        // Manejo de Error "Humano"
        toast.dismiss(toastId);
        console.error("Error Técnico:", result.error); // Guardamos el log técnico para el dev
        toast.error("Hubo un pequeño contratiempo", {
          description: "No pudimos completar la redacción. Por favor intente de nuevo en unos segundos."
        });
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Error de Conexión", { description: "Verifique su internet e intente nuevamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pb-20">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Estudio de Creación</h1>
          <p className="text-slate-500">Inteligencia Artificial aplicada al currículo MEP.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* COLUMNA IZQUIERDA: CONTROLES */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="card-solemn p-6 space-y-4 bg-white h-fit">

            <div className="form-control">
              <label className="label text-xs font-bold text-slate-700 uppercase">Grupo</label>
              <select onChange={handleGroupChange} className="select select-bordered bg-slate-50" required>
                <option value="">-- Seleccionar --</option>
                {groups.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
              </select>
            </div>

            {selectedGroup && (selectedGroup.has7600 || selectedGroup.isGifted) && (
              <div className="text-xs bg-orange-50 text-orange-800 p-3 rounded border border-orange-200">
                <strong>⚠️ Inclusión Detectada:</strong> Se adaptará la mediación automáticamente.
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-700 uppercase">Asignatura</label>
                <select name="subject" className="select select-bordered bg-slate-50">
                  <option>Matemáticas</option><option>Ciencias</option><option>Español</option><option>Estudios Sociales</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold text-slate-700 uppercase">Duración</label>
                <select name="duration" className="select select-bordered bg-slate-50">
                  <option>Semanal</option><option>Mensual</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs font-bold text-slate-700 uppercase">Tema / Habilidad</label>
              <textarea name="topic" className="textarea textarea-bordered h-24 bg-slate-50" placeholder="Ej: Suma de fracciones heterogéneas..." required></textarea>
            </div>

            <button disabled={loading} className="btn btn-institutional w-full shadow-lg gap-2 text-lg">
              {loading ? (
                <><RefreshCw className="animate-spin" size={20} /> Redactando Propuesta...</>
              ) : (
                <><Zap size={20} className="text-yellow-400" /> Iniciar Redacción Inteligente</>
              )}
            </button>
          </form>
        </div>

        {/* COLUMNA DERECHA: RESULTADO (VISOR DE DOCUMENTO) */}
        <div className="lg:col-span-1">
          {generatedPlan ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-100 p-3 rounded-lg border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Vista Previa del Documento</span>
                <div className="flex gap-2">
                  <button className="btn btn-xs btn-ghost gap-1" onClick={() => toast.success("Copiado")}><Copy size={12} /> Copiar</button>
                  <button className="btn btn-xs btn-ghost gap-1"><Download size={12} /> PDF</button>
                </div>
              </div>

              {/* RENDERIZADO DEL HTML DE LA IA */}
              <div className="bg-white p-8 border border-slate-200 shadow-xl rounded-xl min-h-[500px]"
                dangerouslySetInnerHTML={{ __html: generatedPlan }} />
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
              <Sparkles size={48} className="mb-4 opacity-20" />
              <p>El plan generado aparecerá aquí.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}