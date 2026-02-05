"use client";
import { useState, useEffect } from "react";
import { Save, Printer, School, Loader2, X, Plus, Trash2, AlertCircle } from "lucide-react";
import ExcelImporter from "@/components/dashboard/ExcelImporter";

export default function SeaUltraPage() {
  const [view, setView] = useState("EDIT");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCell, setActive] = useState(null);
  const [students, setStudents] = useState([]);
  const context = { institution: "C.T.P. MERCEDES NORTE", subject: "Gestión Software", group: "12-2", period: "I-2026" };

  useEffect(() => {
    fetch("/api/grades").then(r => r.json()).then(data => {
      if (data?.length) setStudents(data.map(d => ({ id: d.studentId, name: d.studentName, cotidiano: d.cotidiano, tareas: d.tareas, pruebas: d.pruebas, proyecto: d.proyecto, asistencia: d.asistencia, details: d.details || {} })));
      setLoading(false);
    });
  }, []);

  const calc = (s) => (parseFloat(s.cotidiano) + parseFloat(s.tareas) + parseFloat(s.pruebas) + parseFloat(s.proyecto) + parseFloat(s.asistencia)).toFixed(0);
  const save = async () => { setSaving(true); await fetch("/api/grades", { method: "POST", body: JSON.stringify({ students: students.map(s => ({ ...s, final: calc(s) })), period: context.period, subject: context.subject }) }); setSaving(false); alert("¡Guardado!"); };
  const handleImport = (imp) => { const m = [...students]; imp.forEach(i => { if (!m.find(s => s.id === i.id)) m.push(i) }); setStudents(m); setView("EDIT"); setTimeout(save, 500); };
  const updateRubric = (items) => {
    let obt = 0, tot = items.length * 3; items.forEach(i => obt += i.value);
    const w = { cotidiano: 40, tareas: 10, pruebas: 20, proyecto: 20, asistencia: 10 };
    const g = tot === 0 ? 0 : ((obt / tot) * w[activeCell.field]);
    setStudents(p => p.map(s => s.id === activeCell.id ? { ...s, [activeCell.field]: g.toFixed(2), details: { ...s.details, [activeCell.field]: items } } : s));
  };
  const getItems = () => students.find(s => s.id === activeCell?.id)?.details?.[activeCell?.field] || [];

  if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin inline" /> Cargando Registro...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      <div className="card bg-base-100 shadow-xl mb-6 border">
        <div className="card-body flex-row justify-between items-center">
          <div><h1 className="text-3xl font-black flex gap-2"><School className="text-primary" />SEA Ultra</h1></div>
          <div className="flex gap-2"><button className="btn btn-success text-white" onClick={save} disabled={saving}>{saving ? "..." : "Guardar"}</button><div className="join border"><button className={`join-item btn ${view === "EDIT" ? "btn-active" : ""}`} onClick={() => setView("EDIT")}>Notas</button><button className={`join-item btn ${view === "IMPORT" ? "btn-active" : ""}`} onClick={() => setView("IMPORT")}>Importar</button><button className={`join-item btn ${view === "ACTA" ? "btn-active" : ""}`} onClick={() => setView("ACTA")}>Acta</button></div></div>
        </div>
        <div className="h-6 flex text-[10px] font-bold text-white text-center"><div className="bg-blue-600 w-[40%]">COT 40%</div><div className="bg-purple-600 w-[10%]">TAR 10%</div><div className="bg-orange-600 w-[20%]">PRU 20%</div><div className="bg-pink-600 w-[20%]">PRO 20%</div><div className="bg-emerald-600 w-[10%]">ASI 10%</div></div>
      </div>

      {view === "IMPORT" && <ExcelImporter onImport={handleImport} isPremium={true} />}
      {view === "EDIT" && <div className="space-y-2">{students.map(s => (<div key={s.id} className="card bg-base-100 shadow-sm border p-3 flex-row items-center gap-4 hover:border-primary"><div className="flex-1 font-bold">{s.name}</div><div className="grid grid-cols-5 gap-1">{['cotidiano', 'tareas', 'pruebas', 'proyecto', 'asistencia'].map((k, i) => (<button key={k} onClick={() => setActive({ id: s.id, field: k, name: s.name })} className={`w-14 h-12 rounded text-white font-bold flex flex-col items-center justify-center text-xs shadow-sm active:scale-95 ${['bg-blue-600', 'bg-purple-600', 'bg-orange-600', 'bg-pink-600', 'bg-emerald-600'][i]}`}><span className="opacity-70 text-[8px]">{k.substring(0, 3).toUpperCase()}</span><span>{parseFloat(s[k]).toFixed(0)}</span></button>))}</div><div className={`radial-progress text-xs font-bold ${calc(s) >= 70 ? 'text-success' : 'text-error'}`} style={{ "--value": calc(s) }}>{calc(s)}</div></div>))}</div>}

      {activeCell && <div className="fixed inset-0 z-50 flex justify-end"><div className="absolute inset-0 bg-black/50" onClick={() => setActive(null)}></div><div className="w-full max-w-md bg-base-100 h-full shadow-2xl p-6 flex flex-col animate-slide-left"><div className="flex justify-between mb-4 border-b pb-4"><div><h2 className="text-2xl font-black capitalize">{activeCell.field}</h2><p>{activeCell.name}</p></div><button onClick={() => setActive(null)}><X /></button></div><div className="flex-1 overflow-y-auto space-y-4">{getItems().map((it, ix) => (<div key={ix} className="card border p-3 bg-base-200/30"><div className="flex justify-between mb-2"><input className="font-bold bg-transparent w-full" value={it.name} onChange={e => { const n = [...getItems()]; n[ix].name = e.target.value; updateRubric(n) }} /><Trash2 className="w-4 cursor-pointer text-error" onClick={() => { updateRubric(getItems().filter((_, z) => z !== ix)) }} /></div><div className="grid grid-cols-3 gap-1 mb-2">{[1, 2, 3].map(v => <button key={v} onClick={() => { const n = [...getItems()]; n[ix].value = v; updateRubric(n) }} className={`btn btn-xs ${it.value === v ? 'btn-primary' : 'btn-outline'}`}>{v}</button>)}</div><textarea className="textarea textarea-xs w-full" placeholder="Justificación" value={it.justification} onChange={e => { const n = [...getItems()]; n[ix].justification = e.target.value; updateRubric(n) }} /></div>))}<button className="btn btn-outline w-full border-dashed" onClick={() => updateRubric([...getItems(), { name: `Item ${getItems().length + 1}`, value: 3, justification: "" }])}><Plus className="w-4" /> Agregar</button></div></div></div>}
      {view === "ACTA" && <div className="card bg-white text-black p-8 text-center max-w-4xl mx-auto"><h2 className="text-2xl font-serif font-bold">ACTA OFICIAL</h2><table className="w-full text-left mt-4 border-collapse"><thead><tr className="border-b border-black"><th>Estudiante</th><th className="text-right">Nota</th></tr></thead><tbody>{students.map(s => <tr key={s.id} className="border-b border-gray-200"><td>{s.name}</td><td className="text-right font-bold">{calc(s)}</td></tr>)}</tbody></table><button className="btn btn-neutral mt-8 no-print" onClick={() => window.print()}><Printer /> Imprimir</button></div>}
    </div>
  );
}