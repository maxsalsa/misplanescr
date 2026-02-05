"use client";
import { useState } from "react";
import { ClipboardList, AlertTriangle, CheckCircle, Clock, BookOpen } from "lucide-react";

export default function BitacoraPage() {
  const [activeTab, setActiveTab] = useState("CONDUCTA"); // CONDUCTA | ACADEMICO | NOTAS
  const [estudiante, setEstudiante] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Simulación de DB
  const estudiantes = ["Sebastián Mora", "Valentina Calvo", "Andrés Gómez"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("Registro guardado en expediente.");
    setTimeout(()=>setMensaje(""), 3000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                <ClipboardList className="text-blue-600"/> Bitácora de Seguimiento
            </h1>
            <p className="text-slate-500">Registro diario de incidencias y desempeño estudiantil.</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: FORMULARIO */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h3 className="font-bold text-slate-700 mb-4">Nuevo Registro</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-slate-500">Estudiante</label>
                    <select className="w-full p-2 border rounded-lg bg-slate-50" value={estudiante} onChange={e=>setEstudiante(e.target.value)}>
                        <option value="">Seleccionar...</option>
                        {estudiantes.map((e,i)=><option key={i} value={e}>{e}</option>)}
                    </select>
                </div>

                {/* TABS TIPO DE REGISTRO */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                    {["CONDUCTA", "ACADEMICO"].map(tab => (
                        <button 
                            type="button"
                            key={tab}
                            onClick={()=>setActiveTab(tab)}
                            className={`flex-1 py-2 text-xs font-bold rounded-md transition ${activeTab===tab ? "bg-white shadow text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "CONDUCTA" ? (
                    <div className="space-y-3 animate-in fade-in">
                        <label className="text-xs font-bold text-slate-500">Tipificación (REA)</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option>Falta Leve</option>
                            <option>Falta Grave</option>
                            <option>Falta Muy Grave</option>
                            <option>Reconocimiento Positivo</option>
                        </select>
                        <textarea className="w-full p-2 border rounded-lg h-24 text-sm" placeholder="Descripción del hecho..."></textarea>
                    </div>
                ) : (
                    <div className="space-y-3 animate-in fade-in">
                        <label className="text-xs font-bold text-slate-500">Rubro</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option>Trabajo Cotidiano</option>
                            <option>Tarea</option>
                            <option>Proyecto</option>
                        </select>
                        <label className="text-xs font-bold text-slate-500">Estado</label>
                        <div className="flex gap-2">
                             <label className="flex items-center gap-1 text-sm"><input type="radio" name="estado"/> Entregó</label>
                             <label className="flex items-center gap-1 text-sm"><input type="radio" name="estado"/> No Entregó</label>
                             <label className="flex items-center gap-1 text-sm"><input type="radio" name="estado"/> Incompleto</label>
                        </div>
                    </div>
                )}

                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">
                    Guardar Registro
                </button>
                
                {mensaje && (
                    <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm font-bold animate-in fade-in">
                        {mensaje}
                    </div>
                )}
            </form>
        </div>

        {/* COLUMNA 2: HISTORIAL RECIENTE */}
        <div className="lg:col-span-2">
             <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Clock size={18}/> Actividad Reciente (Hoy)
             </h3>

             <div className="space-y-4">
                {/* EJEMPLO 1: CONDUCTA */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-start">
                    <div className="bg-red-100 text-red-600 p-2 rounded-lg mt-1">
                        <AlertTriangle size={20}/>
                    </div>
                    <div>
                        <div className="flex justify-between w-full">
                            <h4 className="font-bold text-slate-800">Valentina Calvo</h4>
                            <span className="text-xs text-slate-400">Hace 20 min</span>
                        </div>
                        <p className="text-xs font-bold text-red-600 uppercase">Falta Leve (Uso de celular)</p>
                        <p className="text-sm text-slate-600 mt-1">Utiliza dispositivo móvil durante explicación magistral sin autorización.</p>
                    </div>
                </div>

                {/* EJEMPLO 2: ACADÉMICO */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-start">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1">
                        <BookOpen size={20}/>
                    </div>
                    <div>
                        <div className="flex justify-between w-full">
                            <h4 className="font-bold text-slate-800">Sebastián Mora</h4>
                            <span className="text-xs text-slate-400">Hace 1 hora</span>
                        </div>
                        <p className="text-xs font-bold text-blue-600 uppercase">Trabajo Cotidiano: Incompleto</p>
                        <p className="text-sm text-slate-600 mt-1">No finaliza la práctica de laboratorio #3 en el tiempo establecido.</p>
                    </div>
                </div>

                {/* EJEMPLO 3: POSITIVO */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-start">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg mt-1">
                        <CheckCircle size={20}/>
                    </div>
                    <div>
                        <div className="flex justify-between w-full">
                            <h4 className="font-bold text-slate-800">Andrés Gómez</h4>
                            <span className="text-xs text-slate-400">Hace 2 horas</span>
                        </div>
                        <p className="text-xs font-bold text-green-600 uppercase">Reconocimiento Positivo</p>
                        <p className="text-sm text-slate-600 mt-1">Colaboración destacada con compañeros durante el trabajo en equipo.</p>
                    </div>
                </div>

             </div>
        </div>

      </div>
    </div>
  );
}