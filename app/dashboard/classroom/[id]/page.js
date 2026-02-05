"use client";
import { useState } from "react";
import { Trophy, CheckSquare, Plus, Save } from "lucide-react";
import { toast } from "sonner";

export default function ClassroomDetail({ params }) {
  const [tab, setTab] = useState("grades");

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* ENCABEZADO DE SECCIÓN */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Sección {params.id}</h1>
          <p className="text-blue-200 text-sm">Matemáticas • Periodo I 2026</p>
        </div>
        <div className="join bg-white/10 border border-white/20">
          <button
            onClick={() => setTab("grades")}
            className={`join-item btn btn-sm border-none ${tab === "grades" ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-transparent text-white hover:bg-white/10"}`}
          >
            <Trophy size={14} className="mr-2" /> Notas
          </button>
          <button
            onClick={() => setTab("attendance")}
            className={`join-item btn btn-sm border-none ${tab === "attendance" ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-transparent text-white hover:bg-white/10"}`}
          >
            <CheckSquare size={14} className="mr-2" /> Asistencia
          </button>
        </div>
      </div>

      {/* ÁREA DE TRABAJO */}
      <div className="bg-white border border-slate-200 rounded-xl min-h-[500px] p-1">
        {tab === "grades" ? (
          <div className="h-full flex flex-col items-center justify-center p-10 text-center">
            <div className="p-4 bg-yellow-50 rounded-full mb-4">
              <Trophy size={40} className="text-yellow-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Registro de Calificaciones
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">
              No hay actividades registradas. Cree un cotidiano, tarea o prueba
              para comenzar.
            </p>
            <button className="btn btn-institutional gap-2 shadow-xl">
              <Plus size={16} /> Nueva Actividad
            </button>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-700">
                Pase de Lista: {new Date().toLocaleDateString()}
              </h3>
              <button
                className="btn btn-sm btn-primary gap-2"
                onClick={() => toast.success("Asistencia Guardada")}
              >
                <Save size={14} /> Guardar
              </button>
            </div>
            {/* Tabla Simulada */}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th className="text-center">Estado</th>
                    <th>Observación</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="font-medium text-slate-700">
                        Estudiante {i}
                      </td>
                      <td className="text-center flex justify-center gap-1">
                        <button className="btn btn-xs btn-success text-white">
                          P
                        </button>
                        <button className="btn btn-xs btn-ghost text-slate-300 hover:bg-red-100 hover:text-red-500">
                          A
                        </button>
                        <button className="btn btn-xs btn-ghost text-slate-300 hover:bg-yellow-100 hover:text-yellow-600">
                          T
                        </button>
                      </td>
                      <td>
                        <input
                          className="input input-xs input-bordered"
                          placeholder="..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
