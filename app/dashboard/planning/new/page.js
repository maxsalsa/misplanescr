"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Wand2, Loader2, BookCheck, Database, LayoutGrid, RefreshCw } from "lucide-react";
import { SmartCombobox } from "@/components/ui/SmartCombobox";

export default function NewPlanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  // ESTADOS
  const [modalidad, setModalidad] = useState("TECNICA");
  const [level, setLevel] = useState("Décimo");
  const [subject, setSubject] = useState(""); 
  const [unit, setUnit] = useState("");
  
  // DATA
  const [syllabusData, setSyllabusData] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableUnits, setAvailableUnits] = useState([]);
  const [detectedRAs, setDetectedRAs] = useState([]);

  // CARGA DE DATOS ROBUSTA
  const loadData = async () => {
    setDataLoading(true);
    try {
        const res = await fetch("/api/curriculum");
        if (!res.ok) throw new Error("Error de red");
        const data = await res.json();
        setSyllabusData(data || []);
        toast.success(`Sistema Conectado: ${data.length} registros cargados.`);
    } catch (err) {
        console.error(err);
        toast.error("Error conectando con Base de Datos.");
    } finally {
        setDataLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // FILTRO MATERIAS
  useEffect(() => {
    if (!syllabusData.length) return;
    
    // Normalización para evitar errores de mayúsculas/tildes
    const filtered = syllabusData.filter(i => 
        i.modalidad === modalidad && 
        i.level.toLowerCase() === level.toLowerCase()
    );
    
    const subs = [...new Set(filtered.map(i => i.subject))].sort();
    setAvailableSubjects(subs);
    
    // Si la materia seleccionada ya no existe en la nueva lista, limpiar
    if (!subs.includes(subject)) {
        setSubject(""); 
        setUnit("");
    }
  }, [modalidad, level, syllabusData]);

  // FILTRO UNIDADES
  useEffect(() => {
    if (!subject) return;
    const units = syllabusData
        .filter(i => i.subject === subject && i.level.toLowerCase() === level.toLowerCase())
        .map(i => i.unit);
    setAvailableUnits([...new Set(units)]);
    setUnit("");
  }, [subject]);

  // DETECCIÓN RAs
  useEffect(() => {
    if (!unit) { setDetectedRAs([]); return; }
    const ras = syllabusData
        .filter(i => i.subject === subject && i.unit === unit)
        .map(i => i.topic);
    setDetectedRAs(ras);
  }, [unit]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ modality: modalidad, level, subject, unit, officialOutcomes: detectedRAs })
        });
        if (!res.ok) throw new Error("Error IA");
        const data = await res.json();
        if(data.error) throw new Error(data.error); // Capturar error de licencia
        
        localStorage.setItem("generatedPlan", JSON.stringify(data));
        toast.success("Planeamiento Generado");
        router.push("/dashboard/planning/editor");
    } catch (error) {
        toast.error(error.message || "Error al generar.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 text-white">
                <LayoutGrid className="w-8 h-8" />
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Nuevo Planeamiento</h1>
                <p className="text-slate-500 font-medium flex items-center gap-2">
                    {dataLoading ? <span className="flex items-center text-orange-500"><Loader2 className="w-3 h-3 animate-spin mr-1"/> Conectando DB...</span> : <span className="text-green-600 flex items-center"><Database className="w-3 h-3 mr-1"/> Sistema Online</span>}
                </p>
            </div>
        </div>
        <button onClick={loadData} className="btn btn-ghost btn-sm" title="Recargar Datos">
            <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin' : ''}`}/>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PANEL IZQUIERDO */}
        <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative overflow-visible z-20">
                
                <form onSubmit={handleGenerate} className="space-y-5">
                    {/* MODALIDAD */}
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" onClick={() => setModalidad("TECNICA")} 
                            className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${modalidad === "TECNICA" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-100 text-slate-400"}`}>
                            🎓 Técnica
                        </button>
                        <button type="button" onClick={() => setModalidad("ACADEMICA")}
                            className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${modalidad === "ACADEMICA" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-slate-100 text-slate-400"}`}>
                            📚 Académica
                        </button>
                    </div>

                    {/* COMBOBOXES (YA NO TIENEN EL PROP 'DISABLED') */}
                    <SmartCombobox 
                        label="Nivel Educativo"
                        placeholder="Seleccione Nivel..."
                        options={modalidad === "TECNICA" ? ["Décimo", "Undécimo", "Duodécimo"] : ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"]}
                        value={level}
                        onChange={setLevel}
                    />

                    <div className="relative">
                        <SmartCombobox 
                            label={modalidad === "TECNICA" ? "Especialidad / Sub-área" : "Asignatura"}
                            placeholder={availableSubjects.length ? "Escriba para buscar..." : "Cargando materias..."}
                            options={availableSubjects}
                            value={subject}
                            onChange={setSubject}
                            // ELIMINADO EL PROP DISABLED
                        />
                        {!availableSubjects.length && !dataLoading && (
                            <p className="text-[10px] text-red-500 mt-1 absolute right-0 top-0 font-bold">
                                ⚠️ No hay materias para este Nivel/Modalidad
                            </p>
                        )}
                    </div>

                    <SmartCombobox 
                        label="Unidad de Estudio"
                        placeholder="Seleccione la Unidad..."
                        options={availableUnits}
                        value={unit}
                        onChange={setUnit}
                    />

                    <button disabled={loading || !unit} className="btn btn-primary w-full h-14 text-lg font-bold shadow-xl shadow-blue-500/20 mt-4 rounded-xl">
                        {loading ? <><Loader2 className="animate-spin mr-2"/> Generando...</> : <><Wand2 className="mr-2"/> Generar Planeamiento</>}
                    </button>
                </form>
            </div>
        </div>

        {/* PANEL DERECHO (VISUALIZACIÓN) */}
        <div className="lg:col-span-7">
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full min-h-[500px]">
                <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <BookCheck className="w-5 h-5 text-green-600"/> Resultados Oficiales
                </h2>

                {!unit ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                        <Database className="w-16 h-16 mb-4 opacity-20"/>
                        <p className="text-center max-w-xs">Seleccione una Unidad para cargar los Resultados de Aprendizaje.</p>
                    </div>
                ) : (
                    <div className="space-y-3 animate-in slide-in-from-bottom-4">
                        {detectedRAs.map((ra, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                                    {i + 1}
                                </div>
                                <p className="text-sm font-semibold text-slate-800">{ra}</p>
                            </div>
                        ))}
                    </div>
                )}
             </div>
        </div>

      </div>
    </div>
  );
}