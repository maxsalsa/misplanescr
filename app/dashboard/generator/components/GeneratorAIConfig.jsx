import React from "react";

export default function GeneratorAIConfig({
  configuracion_ia,
  setConfiguracionIA,
  archivos_oficiales,
  setArchivosOficiales,
  handleAIGenerate,
  cargando_ia,
  error_validacion,
  estado_progreso,
}) {
  return (
    <div
      className="card glass-card p-4 md:p-8 animate-fade-in border-2 border-indigo-100 shadow-xl"
      role="region"
      aria-label="Configuración de Inteligencia Artificial"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h3 className="card-title text-2xl text-indigo-900 flex items-center gap-2">
            <span className="text-3xl">🦾</span> Configuración MEP-PLANNER AI
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-lg">
            Sube el <b>Programa de Estudio Oficial (PDF)</b> y define la unidad.
            El sistema analizará la normativa para generar un planeamiento ético
            y alineado.
          </p>
        </div>
        <div className="badge badge-primary badge-lg badge-outline mt-2 md:mt-2 font-mono">
          Motor GPT-4o
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FILE UPLOAD SECTION */}
        <div className="form-control md:col-span-2 p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 transition-colors">
          <label className="label font-bold text-slate-700 mb-2">
            1. Documentos Oficiales (Opcional si usas el Cerebro)
          </label>
          <input
            type="file"
            accept=".pdf"
            multiple
            className="file-input file-input-bordered file-input-primary w-full shadow-sm"
            onChange={(e) => setArchivosOficiales(Array.from(e.target.files))}
            aria-label="Subir archivos PDF del programa de estudio"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-400">
              Puede seleccionar múltiples archivos (Progama, Reglamento,
              Circulares).
            </p>
            {archivos_oficiales.length > 0 && (
              <span className="badge badge-success badge-sm gap-1">
                ✓ {archivos_oficiales.length} Archivos listos
              </span>
            )}
          </div>
        </div>

        {/* CONFIG FIELDS */}
        <div className="form-control">
          <label className="label font-bold text-slate-600">
            2. Subárea / Asignatura
            <span
              className="tooltip tooltip-right"
              data-tip="Ej: Gestión Bancaria o Matemáticas"
            >
              ❓
            </span>
          </label>
          <input
            type="text"
            placeholder="Ej: Gestión Bancaria"
            className="input input-bordered focus:input-primary transition-all bg-white"
            value={configuracion_ia.sub_area}
            onChange={(e) =>
              setConfiguracionIA({
                ...configuracion_ia,
                sub_area: e.target.value,
              })
            }
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-slate-600">
            3. Nivel Académico
          </label>
          <input
            type="text"
            placeholder="Ej: Décimo Año"
            className="input input-bordered focus:input-primary transition-all bg-white"
            value={configuracion_ia.nivel}
            onChange={(e) =>
              setConfiguracionIA({ ...configuracion_ia, nivel: e.target.value })
            }
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-slate-600">
            4. Unidad de Estudio
          </label>
          <input
            type="text"
            placeholder="Ej: Unidad 1: Sistema Financiero"
            className="input input-bordered focus:input-primary transition-all bg-white"
            value={configuracion_ia.unidad}
            onChange={(e) =>
              setConfiguracionIA({
                ...configuracion_ia,
                unidad: e.target.value,
              })
            }
          />
        </div>

        <div className="form-control">
          <label className="label font-bold text-slate-600">
            5. Tiempo (Horas Efectivas)
          </label>
          <input
            type="number"
            placeholder="Ej: 10"
            className="input input-bordered focus:input-primary transition-all bg-white"
            value={configuracion_ia.horas_lectivas}
            onChange={(e) =>
              setConfiguracionIA({
                ...configuracion_ia,
                horas_lectivas: e.target.value,
              })
            }
          />
        </div>

        {/* GRUPO CONTEXT FIELDS (NUEVOS SUPER PROMPT) */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <div className="form-control">
            <label className="label font-bold text-indigo-800 text-xs uppercase tracking-wider">
              6. Modalidad
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={configuracion_ia.modalidad}
              onChange={(e) =>
                setConfiguracionIA({
                  ...configuracion_ia,
                  modalidad: e.target.value,
                })
              }
            >
              <option value="">Seleccione...</option>
              <option value="Diurno">Diurno</option>
              <option value="Nocturno">Nocturno</option>
              <option value="Técnico Profesional">Técnico Profesional</option>
              <option value="CINDEA">CINDEA</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label font-bold text-indigo-800 text-xs uppercase tracking-wider">
              7. Periodo Lectivo
            </label>
            <select
              className="select select-bordered select-sm w-full"
              value={configuracion_ia.periodo}
              onChange={(e) =>
                setConfiguracionIA({
                  ...configuracion_ia,
                  periodo: e.target.value,
                })
              }
            >
              <option value="I Semestre">I Semestre</option>
              <option value="II Semestre">II Semestre</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label font-bold text-indigo-800 text-xs uppercase tracking-wider">
              8. Grupo / Sección
            </label>
            <input
              type="text"
              placeholder="Ej: 10-2"
              className="input input-bordered input-sm focus:input-primary transition-all bg-white"
              value={configuracion_ia.grupo}
              onChange={(e) =>
                setConfiguracionIA({
                  ...configuracion_ia,
                  grupo: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* 9. VARIABILIDAD (MOTOR CREATIVO) */}
        <div className="form-control md:col-span-2 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-indigo-100">
          <label className="label font-bold text-indigo-900 mb-2">
            <span className="flex items-center gap-2">
              <span className="text-xl">🧬</span> 9. Nivel de Innovación
              (Variabilidad)
            </span>
            <span className="badge badge-primary badge-outline text-xs">
              Anti-Repetición
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                id: "estandar",
                icon: "🛡️",
                title: "Estándar",
                desc: "Apego oficial estricto.",
              },
              {
                id: "creativo",
                icon: "🎨",
                title: "Lúdico",
                desc: "Gamificación y juegos.",
              },
              {
                id: "innovador",
                icon: "🚀",
                title: "A.B.P.",
                desc: "Enfoque de Proyectos.",
              },
              {
                id: "disruptivo",
                icon: "💥",
                title: "Disruptivo",
                desc: "Debates y Retos.",
              },
            ].map((mode) => (
              <div
                key={mode.id}
                onClick={() =>
                  setConfiguracionIA({
                    ...configuracion_ia,
                    variability: mode.id,
                  })
                }
                className={`cursor-pointer border rounded-lg p-3 transition-all hover:scale-105 ${
                  configuracion_ia.variability === mode.id
                    ? "bg-white border-indigo-500 shadow-md ring-2 ring-indigo-200"
                    : "bg-white/50 border-slate-200 hover:border-indigo-300"
                }`}
              >
                <div className="text-2xl mb-1">{mode.icon}</div>
                <div className="font-bold text-sm text-slate-800">
                  {mode.title}
                </div>
                <div className="text-xs text-slate-500 leading-tight">
                  {mode.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ERROR BOUNDARY (Accessible Alert) */}
      {error_validacion && (
        <div
          role="alert"
          className="alert alert-error mt-6 shadow-md border-l-4 border-red-600 animate-shake"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Atención</h3>
            <div className="text-sm">{error_validacion}</div>
          </div>
        </div>
      )}

      {/* SMART STEPPER FEEDBACK */}
      {cargando_ia && (
        <div
          className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 animate-fade-in"
          aria-live="polite"
        >
          <div className="flex justify-between text-xs font-bold text-indigo-900 mb-2 uppercase tracking-wider">
            <span>Progreso de Análisis</span>
            <span>{estado_progreso}...</span>
          </div>
          <progress
            className="progress progress-primary w-full h-3"
            value={
              estado_progreso === "validando"
                ? 10
                : estado_progreso === "leyendo"
                  ? 30
                  : estado_progreso === "generando"
                    ? 70
                    : estado_progreso === "finalizando"
                      ? 95
                      : 0
            }
            max="100"
          ></progress>
          <p className="text-xs text-indigo-500 mt-2 text-center italic">
            {estado_progreso === "generando"
              ? "Consultando normativa oficial del MEP (puede tardar unos segundos)..."
              : "Preparando entorno..."}
          </p>
        </div>
      )}

      <div className="card-actions justify-end mt-8">
        <button
          className={`btn btn-primary btn-action btn-block md:btn-wide btn-lg md:btn-md shadow-lg transform active:scale-95 transition-transform ${cargando_ia ? "loading" : ""}`}
          onClick={handleAIGenerate}
          disabled={cargando_ia}
        >
          {cargando_ia ? "Procesando..." : "✨ Generar Planeamiento"}
        </button>
      </div>
    </div>
  );
}
