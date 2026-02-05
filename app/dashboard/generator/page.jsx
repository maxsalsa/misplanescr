"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  FileText, Save, RefreshCw, CheckCircle, BookOpen, Layers, 
  Clock, Activity, Heart, Download, Cloud
} from "lucide-react";

export default function GeneratorPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [materias, setMaterias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  
  // FORMULARIO
  const [nivel, setNivel] = useState("Décimo");
  const [materiaSelec, setMateriaSelec] = useState("");
  const [tipo, setTipo] = useState("Planeamiento Didáctico");

  // RESULTADO (EL DOCUMENTO GENERADO)
  const [resultado, setResultado] = useState(null);

  // CARGAR MATERIAS (SIMULACIÓN DE DB RÁPIDA)
  useEffect(() => {
    // Aquí cargaríamos desde una API real que consulta Prisma
    const demoDB = [
        "Desarrollo de Software - Programación", "Desarrollo de Software - Gestión BD",
        "Ciberseguridad - Hacking Ético", "Ciberseguridad - Forense",
        "Contabilidad - Costos", "Turismo - Ecoturismo", "Ejecutivo - Servicio al Cliente",
        "Español", "Matemáticas", "Ciencias", "Estudios Sociales", "Inglés"
    ];
    setMaterias(demoDB);
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null); // Limpiar previo
    
    try {
        const res = await fetch("/api/planeamiento/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nivel, materia: materiaSelec, tipo })
        });
        const json = await res.json();
        
        if(json.success) {
            setResultado(json.data); // GUARDAMOS LA DATA RICA DEL BACKEND
        } else {
            alert("Error: " + json.error);
        }
    } catch (err) {
        alert("Error de conexión.");
    } finally {
        setLoading(false);
    }
  };

  const materiasFiltradas = materias.filter(m => m.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                <Layers className="text-blue-600" /> Nuevo Planeamiento Oficial
            </h1>
            <p className="text-slate-500">Motor MEP 2026: Tiempos, Pausas Activas y DUA Integrados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PANEL DE CONTROL (IZQUIERDA) */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <BookOpen size={18} /> Configuración
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Nivel</label>
                        <select value={nivel} onChange={e=>setNivel(e.target.value)} className="w-full mt-1 p-2 border rounded-lg bg-slate-50">
                            <option>Sétimo</option><option>Octavo</option><option>Noveno</option>
                            <option>Décimo</option><option>Undécimo</option><option>Duodécimo</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Asignatura</label>
                        <input type="text" placeholder="Buscar..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} 
                            className="w-full mt-1 p-2 border rounded-lg bg-slate-50 mb-2 text-sm" />
                        <select value={materiaSelec} onChange={e=>setMateriaSelec(e.target.value)} className="w-full p-2 border rounded-lg bg-slate-50 h-32" size={5}>
                            {materiasFiltradas.map((m,i)=><option key={i} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <button onClick={handleGenerate} disabled={loading || !materiaSelec}
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50">
                        {loading ? <RefreshCw className="animate-spin"/> : <Save size={18} />}
                        {loading ? "Procesando..." : "Generar Documento"}
                    </button>
                </div>
            </div>
        </div>

        {/* PANEL DE VISUALIZACIÓN (DERECHA - EL RESULTADO) */}
        <div className="lg:col-span-2">
            {resultado ? (
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* ENCABEZADO DEL DOCUMENTO */}
                    <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{resultado.encabezado.asignatura}</h2>
                            <p className="text-sm text-slate-500">{resultado.encabezado.nivel} • {resultado.encabezado.periodo}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded w-fit">
                                <Clock size={14} /> Tiempo Total: {resultado.encabezado.tiempo_total}
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                            <Download size={16} /> Descargar PDF
                        </button>
                    </div>

                    {/* CUERPO DEL PLAN */}
                    <div className="p-6 space-y-6">
                        
                        {/* SECCIÓN 1: COMPETENCIAS Y EVIDENCIA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                <h4 className="font-bold text-indigo-800 text-sm mb-1 flex items-center gap-2">
                                    <CheckCircle size={14} /> Evidencia de Desempeño
                                </h4>
                                <p className="text-sm text-indigo-900 font-medium">{resultado.competencias.evidencia_final}</p>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <h4 className="font-bold text-amber-800 text-sm mb-1 flex items-center gap-2">
                                    <Heart size={14} /> Habilidades Blandas
                                </h4>
                                <p className="text-sm text-amber-900">{resultado.competencias.blanda}</p>
                            </div>
                        </div>

                        {/* SECCIÓN 2: MEDIACIÓN (CRONOGRAMA) */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-700 border-b pb-2">Secuencia Didáctica (Minuto a Minuto)</h3>
                            
                            {/* FASES */}
                            {[resultado.mediacion.focalizacion, resultado.mediacion.exploracion].map((fase, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="min-w-[60px] text-center bg-slate-100 rounded p-1 text-xs font-bold text-slate-600">{fase.tiempo}</div>
                                    <div>
                                        <h5 className="font-bold text-slate-800 text-sm">{fase.fase}</h5>
                                        <p className="text-sm text-slate-600">{fase.desc}</p>
                                    </div>
                                </div>
                            ))}

                            {/* PAUSA ACTIVA (DESTACADA) */}
                            <div className="flex gap-4 items-center bg-green-50 p-3 rounded-lg border border-green-100">
                                <div className="min-w-[60px] text-center bg-green-200 rounded p-1 text-xs font-bold text-green-800">
                                    {resultado.mediacion.pausa_activa.tiempo}
                                </div>
                                <div>
                                    <h5 className="font-bold text-green-800 text-sm flex items-center gap-2">
                                        <Activity size={16} /> {resultado.mediacion.pausa_activa.tipo}
                                    </h5>
                                    <p className="text-sm text-green-700">{resultado.mediacion.pausa_activa.desc}</p>
                                </div>
                            </div>

                            {[resultado.mediacion.contrastacion, resultado.mediacion.aplicacion].map((fase, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="min-w-[60px] text-center bg-slate-100 rounded p-1 text-xs font-bold text-slate-600">{fase.tiempo}</div>
                                    <div>
                                        <h5 className="font-bold text-slate-800 text-sm">{fase.fase}</h5>
                                        <p className="text-sm text-slate-600">{fase.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* SECCIÓN 3: DUA */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-400 mb-2">Ajustes de Diseño Universal (DUA)</h4>
                            <div className="flex flex-wrap gap-2">
                                {resultado.dua.map((d, i) => (
                                    <span key={i} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">{d}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-2xl min-h-[400px]">
                    <Layers size={48} className="mb-4 text-slate-200" />
                    <p className="font-medium">Seleccione los parámetros para visualizar el plan</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}