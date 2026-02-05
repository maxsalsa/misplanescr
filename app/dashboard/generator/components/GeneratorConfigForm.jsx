"use client";
import React, { useEffect } from "react";
import { Lock, Unlock } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function GeneratorConfigForm({
  catalog,
  configuracion_curricular,
  setConfiguracionCurricular,
  activeInstitution,
  className,
}) {
  const { hasAccessToSubject, user } = useAuth();

  // --- LOGIC MOVED FROM PAGE.JS ---

  // 1. UNIQUE MODALITIES
  const modalidades = React.useMemo(
    () =>
      catalog ? [...new Set(catalog.map((item) => item.modalidad))].sort() : [],
    [catalog],
  );

  // 2. LEVELS (Dependent on Modality)
  const filteredLevels = catalog.filter(
    (item) => item.modalidad === configuracion_curricular.modalidad,
  );
  const niveles = [...new Set(filteredLevels.map((item) => item.nivel))].sort();

  // 3. SUBJECTS (Dependent on Modality + Level)
  const filteredPrograms = filteredLevels.filter(
    (item) => item.nivel === configuracion_curricular.nivel,
  );

  // PREMIUM ACCESS CHECKER
  const isSubjectLocked = (programName) => {
    if (user?.role === "admin") return false;
    const prog = filteredPrograms.find((p) => p.nombre === programName);
    if (!prog) return true;
    return !hasAccessToSubject(prog.id) && !hasAccessToSubject(prog.nombre);
  };

  // Auto-Select Logic (Internal Effects)
  useEffect(() => {
    if (
      modalidades.length > 0 &&
      !modalidades.includes(configuracion_curricular.modalidad)
    ) {
      const preferred =
        activeInstitution?.type === "Técnico"
          ? modalidades.find((m) => m.includes("Técnica"))
          : modalidades[0];
      setConfiguracionCurricular((prev) => ({
        ...prev,
        modalidad: preferred || modalidades[0],
      }));
    }
  }, [
    modalidades,
    activeInstitution,
    configuracion_curricular.modalidad,
    setConfiguracionCurricular,
  ]);

  useEffect(() => {
    if (
      niveles.length > 0 &&
      !niveles.includes(configuracion_curricular.nivel)
    ) {
      setConfiguracionCurricular((prev) => ({ ...prev, nivel: niveles[0] }));
    }
  }, [
    configuracion_curricular.modalidad,
    niveles,
    configuracion_curricular.nivel,
    setConfiguracionCurricular,
  ]);

  useEffect(() => {
    const subjectExists = filteredPrograms.find(
      (p) => p.nombre === configuracion_curricular.asignatura,
    );
    if (!subjectExists && filteredPrograms.length > 0) {
      setConfiguracionCurricular((prev) => ({
        ...prev,
        asignatura: filteredPrograms[0].nombre,
      }));
    }
  }, [
    configuracion_curricular.nivel,
    filteredPrograms,
    configuracion_curricular.asignatura,
    setConfiguracionCurricular,
  ]);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200 ${className}`}
    >
      {/* 1. MODALIDAD */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold text-slate-700">
            Modalidad Educativa
          </span>
        </label>
        <select
          className="select select-bordered w-full bg-slate-50"
          value={configuracion_curricular.modalidad}
          onChange={(e) =>
            setConfiguracionCurricular({
              ...configuracion_curricular,
              modalidad: e.target.value,
            })
          }
        >
          {modalidades.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* 2. NIVEL */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold text-slate-700">
            Nivel / Grado
          </span>
        </label>
        <select
          className="select select-bordered w-full bg-slate-50"
          value={configuracion_curricular.nivel}
          onChange={(e) =>
            setConfiguracionCurricular({
              ...configuracion_curricular,
              nivel: e.target.value,
            })
          }
        >
          {niveles.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* 3. ASIGNATURA */}
      <div className="form-control md:col-span-2">
        <label className="label">
          <span className="label-text font-bold text-slate-700">
            Asignatura o Especialidad
          </span>
        </label>
        <div className="relative">
          <select
            className="select select-bordered w-full bg-slate-50 pr-10"
            value={configuracion_curricular.asignatura}
            onChange={(e) =>
              setConfiguracionCurricular({
                ...configuracion_curricular,
                asignatura: e.target.value,
              })
            }
          >
            {filteredPrograms.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.nombre} {isSubjectLocked(p.nombre) ? "(🔒 Premium)" : ""}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
            {isSubjectLocked(configuracion_curricular.asignatura) ? (
              <Lock size={16} />
            ) : (
              <Unlock size={16} />
            )}
          </div>
        </div>
      </div>

      {/* 4. PERIODO (Static for now) */}
      <div className="form-control md:col-span-2">
        <label className="label">
          <span className="label-text font-bold">Periodo Lectivo</span>
        </label>
        <select
          className="select select-bordered"
          value={configuracion_curricular.periodo}
          onChange={(e) =>
            setConfiguracionCurricular({
              ...configuracion_curricular,
              periodo: e.target.value,
            })
          }
        >
          <option>I Periodo</option>
          <option>II Periodo</option>
        </select>
      </div>
    </div>
  );
}
