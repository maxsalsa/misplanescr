"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  BookOpen, FileText, Gamepad2, Image as ImageIcon, 
  CheckSquare, Square, ArrowRight, Zap, CheckCircle, FileDown
} from "lucide-react";
import { generateMEPDocument } from "@/utils/pdfGenerator";

// --- SIMULACIÓN DE SYLLABUS (CONTENIDOS DEL MEP) ---
// En producción, esto viene de su Base de Datos Vectorial
const SYLLABUS_DB = {
  "Técnica": {
    "Desarrollo de Software": [
        { id: "RA1", unidad: "Unidad 1: Lógica", texto: "Analizar problemas mediante algoritmos y diagramas de flujo." },
        { id: "RA2", unidad: "Unidad 1: Lógica", texto: "Utilizar estructuras de control selectivas (If/Else/Switch)." },
        { id: "RA3", unidad: "Unidad 2: Programación", texto: "Codificar soluciones utilizando estructuras repetitivas (While/For)." },
        { id: "RA4", unidad: "Unidad 2: Programación", texto: "Aplicar buenas prácticas de Clean Code y documentación." }
    ],
    "Turismo Ecológico": [
        { id: "RA1", unidad: "Unidad 1: Geografía", texto: "Identificar las zonas de vida de Costa Rica según Holdridge." },
        { id: "RA2", unidad: "Unidad 1: Geografía", texto: "Reconocer la flora y fauna endémica de la región." },
        { id: "RA3", unidad: "Unidad 2: Atención", texto: "Aplicar protocolos de bienvenida al turista en idioma inglés." }
    ]
  },
  "Académica": {
    "Español": [
        { id: "IA1", unidad: "Mes 1", texto: "Analizar críticamente textos literarios costarricenses." },
        { id: "IA2", unidad: "Mes 1", texto: "Utilizar normas gramaticales en la producción textual." },
        { id: "IA3", unidad: "Mes 2", texto: "Expresar ideas complejas mediante el debate oral." }
    ]
  }
};

export default function FlexiblePlanningPage() {
  const { data: session } = useSession();
  
  // ESTADOS
  const [nivel, setNivel] = useState("Décimo");
  const [materia, setMateria] = useState("");
  const [contenidosDisponibles, setContenidosDisponibles] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]); // LOS RAs ELEGIDOS
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [tipoRecurso, setTipoRecurso] = useState("");

  // 1. CARGAR CONTENIDOS AL ELEGIR MATERIA
  useEffect(() => {
    setSeleccionados([]);
    setResultado(null);
    if (!materia) { setContenidosDisponibles([]); return; }

    // Simulación de carga inteligente según materia
    if (materia.includes("Software")) setContenidosDisponibles(SYLLABUS_DB["Técnica"]["Desarrollo de Software"]);
    else if (materia.includes("Turismo")) setContenidosDisponibles(SYLLABUS_DB["Técnica"]["Turismo Ecológico"]);
    else setContenidosDisponibles(SYLLABUS_DB["Académica"]["Español"]);

  }, [materia]);

  // 2. MANEJAR CHECKBOXES
  const toggleRA = (textoRA) => {
    if (seleccionados.includes(textoRA)) {
        setSeleccionados(seleccionados.filter(t => t !== textoRA));
    } else {
        setSeleccionados([...seleccionados, textoRA]);
    }
  };

  // 3. GENERAR RECURSO (CEREBRO)
  const handleGenerate = async (tipo) => {
    if (seleccionados.length === 0) {
        alert("⚠️ Por favor seleccione al menos un Resultado de Aprendizaje o Contenido para evaluar.");
        return;
    }
    setTipoRecurso(tipo);
    setLoading(true); 
    setResultado(null);

    // CONSTRUIMOS EL PROMPT CON LO SELECCIONADO
    const promptContext = {
        nivel,
        materia,
        tipo,
        contenidos_seleccionados: seleccionados, // AQUÍ VA LA MIXTURA
        contexto: "General" 
    };

    try {
        const res = await fetch("/api/planeamiento/generate", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(promptContext)
        });
        const json = await res.json();
        if(json.success) setResultado(json.data);
    } catch (err) { alert("Error de conexión"); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-32">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="text-blue-600" /> Planificador Flexible
                </h1>
                <p className="text-slate-500 text-sm">Seleccione RAs de diferentes unidades según su avance real.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMNA IZQUIERDA: CONFIGURACIÓN */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-4">1. Datos Generales</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500">Nivel</label>
                            <select value={nivel} onChange={e=>setNivel(e.target.value)} className="w-full p-2 border rounded-lg">
                                <option>Sétimo</option><option>Octavo</option><option>Noveno</option><option>Décimo</option><option>Undécimo</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500">Materia</label>
                            <select value={materia} onChange={e=>setMateria(e.target.value)} className="w-full p-2 border rounded-lg">
                                <option value="">-- Seleccionar --</option>
                                <option value="Desarrollo de Software">Desarrollo de Software (Téc)</option>
                                <option value="Turismo Ecológico">Turismo Ecológico (Téc)</option>
                                <option value="Español">Español (Acad)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* BOTONERA DE GENERACIÓN */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 opacity-100 transition-opacity">
                    <h3 className="font-bold text-slate-700 mb-4">3. Generar Recurso</h3>
                    <p className="text-xs text-slate-400 mb-4">La IA usará solo los temas marcados.</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <button onClick={()=>handleGenerate("Planeamiento Didáctico")} disabled={!materia || seleccionados.length===0} className="flex items-center gap-3 p-3 rounded-xl border border-blue-100 hover:bg-blue-50 text-left transition disabled:opacity-50">
                            <div className="bg-blue-600 text-white p-2 rounded-lg"><BookOpen size={18}/></div>
                            <div>
                                <span className="block font-bold text-sm text-slate-700">Planeamiento</span>
                                <span className="text-[10px] text-slate-400">Estrategias de Mediación</span>
                            </div>
                        </button>
                        
                        <button onClick={()=>handleGenerate("Prueba Escrita")} disabled={!materia || seleccionados.length===0} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-left transition disabled:opacity-50">
                            <div className="bg-slate-700 text-white p-2 rounded-lg"><FileText size={18}/></div>
                            <div>
                                <span className="block font-bold text-sm text-slate-700">Prueba Escrita / Quiz</span>
                                <span className="text-[10px] text-slate-400">Items válidos REA</span>
                            </div>
                        </button>

                        <button onClick={()=>handleGenerate("Gamificación (Trivia)")} disabled={!materia || seleccionados.length===0} className="flex items-center gap-3 p-3 rounded-xl border border-purple-100 hover:bg-purple-50 text-left transition disabled:opacity-50">
                            <div className="bg-purple-600 text-white p-2 rounded-lg"><Gamepad2 size={18}/></div>
                            <div>
                                <span className="block font-bold text-sm text-slate-700">Juego / Trivia</span>
                                <span className="text-[10px] text-slate-400">Kahoot o Dinámica</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* COLUMNA CENTRAL: SELECTOR DE CONTENIDOS (EL BUFFET) */}
            <div className="lg:col-span-2">
                {!materia ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl p-8">
                        <BookOpen size={48} className="mb-4 opacity-20"/>
                        <p>Seleccione una materia para ver los aprendizajes disponibles.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700">2. Selección de Aprendizajes (RAs)</h3>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                {seleccionados.length} Seleccionados
                            </span>
                        </div>
                        
                        <div className="p-4 space-y-2 overflow-y-auto max-h-[500px]">
                            {/* AGRUPAR VISUALMENTE SI ES POSIBLE */}
                            {contenidosDisponibles.map((ra) => {
                                const isSelected = seleccionados.includes(ra.texto);
                                return (
                                    <div 
                                        key={ra.id} 
                                        onClick={() => toggleRA(ra.texto)}
                                        className={`cursor-pointer p-4 rounded-xl border transition-all flex gap-4 items-start ${isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-slate-100 hover:border-blue-200"}`}
                                    >
                                        <div className={`mt-1 ${isSelected ? "text-blue-600" : "text-slate-300"}`}>
                                            {isSelected ? <CheckSquare size={20}/> : <Square size={20}/>}
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                                {ra.unidad}
                                            </span>
                                            <p className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-slate-600"}`}>
                                                {ra.texto}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

        </div>

        {/* RESULTADO GENERADO */}
        {loading && (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="loading w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h2 className="text-xl font-bold text-slate-800 animate-pulse">Diseñando {tipoRecurso}...</h2>
                <p className="text-slate-500">Integrando {seleccionados.length} aprendizajes seleccionados.</p>
            </div>
        )}

        {resultado && (
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fixed bottom-0 left-0 right-0 z-40 max-h-[80vh] overflow-y-auto m-4 lg:m-8 ring-4 ring-black/5">
                <div className="bg-slate-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
                    <div>
                        <h2 className="font-bold text-lg">{resultado.titulo || "Recurso Generado"}</h2>
                        <p className="text-slate-400 text-xs">{tipoRecurso} • {seleccionados.length} RAs cubiertos</p>
                    </div>
                    <button onClick={() => setResultado(null)} className="text-slate-400 hover:text-white">Cerrar X</button>
                </div>
                
                <div className="p-8">
                    {/* VISTA PREVIA SIMPLE DEL RESULTADO */}
                    <div className="prose max-w-none text-slate-600">
                        {tipoRecurso.includes("Prueba") && (
                            <div>
                                <h3 className="text-blue-700 font-bold">Vista Previa de Ítems:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    {resultado.parte_seleccion?.items.map((it, i) => (
                                        <li key={i}><strong>Item {i+1}:</strong> {it.enunciado}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                         {tipoRecurso.includes("Planeamiento") && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded border">
                                    <strong>Focalización:</strong> {resultado.mediacion?.focalizacion?.actividad}
                                </div>
                                <div className="p-4 bg-slate-50 rounded border">
                                    <strong>Aplicación:</strong> {resultado.mediacion?.aplicacion?.actividad}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={()=>generateMEPDocument(resultado)} className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-xl shadow-green-600/20 transform hover:scale-105">
                            <FileDown size={24}/> Descargar PDF Listo
                        </button>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
}