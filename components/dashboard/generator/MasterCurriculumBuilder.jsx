"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Briefcase, Zap, Search, Save, FileText, Trash2, Printer } from "lucide-react";

/**
 * 🏗️ MASTER CURRICULUM BUILDER
 * 
 * Arquitectura de Interfaz para construcción curricular automática.
 * - Input Layer: Selectores de Taxonomía (DaisyUI 5).
 * - Logic Layer: Filtrado en cascada (Nivel -> Especialidad -> Unidad).
 * - Render Layer: Component Factory (CodeRubric vs RoleplayScript).
 */

export default function MasterCurriculumBuilder() {
    // 1. STATE MANAGEMENT (Lógica de Estado)
    const [loading, setLoading] = useState(false);
    const [uiMode, setUiMode] = useState("DEFAULT"); // 'DEFAULT' | 'TECH_VIEW' | 'SERVICE_VIEW'

    const [filters, setFilters] = useState({
        modalidad: "",    // Académica vs Técnica
        especialidad: "", // Ciberseguridad, Turismo, etc.
        unidad: ""        // RA específicos
    });

    // DATA MOCKUPS (Simulando Neon DB)
    // En producción, esto vendría de useQuery / SWR
    const SPECIALTIES_DB = {
        "HARD_TECH": ["Desarrollo Web", "Ciberseguridad", "Inteligencia Artificial"],
        "SOFT_SKILLS": ["Turismo", "Gestión Empresarial", "Secretariado Ejecutivo"]
    };

    // 2. LOGIC LAYER (Cerebro del Filtrado)
    const handleSpecialtyChange = (e) => {
        const selectedScale = e.target.value;
        setFilters({ ...filters, especialidad: selectedScale });

        // Lógica de detección de Familia
        if (SPECIALTIES_DB["HARD_TECH"].includes(selectedScale)) {
            setUiMode("TECH_VIEW");
        } else if (SPECIALTIES_DB["SOFT_SKILLS"].includes(selectedScale)) {
            setUiMode("SERVICE_VIEW");
        } else {
            setUiMode("DEFAULT");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">

            {/* 🟢 ZONA 1: TOP BAR (FILTROS Y NAVEGACIÓN SEMÁNTICA) */}
            <fieldset className="fieldset bg-base-100 border border-base-300 p-4 rounded-xl shadow-sm">
                <legend className="fieldset-legend font-bold text-sm text-primary px-2 uppercase tracking-wider">
                    Configuración del Planeamiento
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                    {/* A. Selector de Modalidad */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">1. Modalidad</span></label>
                        <select
                            className="select select-bordered w-full"
                            onChange={(e) => setFilters({ ...filters, modalidad: e.target.value })}
                        >
                            <option disabled selected>Seleccione...</option>
                            <option>Educación Técnica (CTP)</option>
                            <option>Académica (Liceo)</option>
                            <option>Adultos (CINDEA)</option>
                        </select>
                    </div>

                    {/* B. Selector de Especialidad (Cascada) */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">2. Especialidad / Asignatura</span></label>
                        <select
                            className="select select-bordered w-full"
                            onChange={handleSpecialtyChange}
                            disabled={!filters.modalidad}
                        >
                            <option disabled selected>Seleccione...</option>
                            <optgroup label="Tecnología (Hard Tech)">
                                <option>Desarrollo Web</option>
                                <option>Ciberseguridad</option>
                            </optgroup>
                            <optgroup label="Servicios (Soft Skills)">
                                <option>Turismo</option>
                                <option>Gestión Empresarial</option>
                            </optgroup>
                        </select>
                    </div>

                    {/* C. Selector de Unidad (RA) */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">3. Unidad de Estudio (RA)</span></label>
                        <select className="select select-bordered w-full" disabled={!filters.especialidad}>
                            <option disabled selected>Cargando RAs...</option>
                            {filters.especialidad === "Desarrollo Web" && <option>RA1: Aplicaciones Frontend</option>}
                            {filters.especialidad === "Turismo" && <option>RA1: Protocolo de Servicio</option>}
                        </select>
                    </div>

                    {/* D. Buscador Semántico */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text font-semibold">Buscador Inteligente</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ej. 'Ciclos en Python' o 'Atención al cliente'"
                                className="input input-bordered w-full pl-10"
                            />
                            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                        </div>
                    </div>

                </div>
            </fieldset>

            {/* 🟠 ZONA 2: RENDERIZADO DINÁMICO (COMPONENT FACTORY) */}
            <div className="@container min-h-[500px]">

                {/* CASO A: TECH VIEW (Terminal + Código) */}
                {uiMode === "TECH_VIEW" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">

                        {/* Lado Izquierdo: Simulador de Entorno */}
                        <div className="mockup-code bg-slate-900 text-slate-200 shadow-xl overflow-hidden flex flex-col h-full">
                            <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50">
                                <span className="text-xs font-mono text-emerald-400">terminal@aulaplan:~/proyectos</span>
                                <Zap size={14} className="text-yellow-400" />
                            </div>
                            <pre data-prefix="$" className="text-emerald-400"><code>initialize_environment --lab="Python Basics"</code></pre>
                            <pre data-prefix=">" className="text-slate-400"><code>Cargando dependencias... OK</code></pre>
                            <pre data-prefix=">" className="text-slate-400"><code>Generando estructura de prueba... OK</code></pre>
                            <div className="p-6 font-mono text-sm">
                                <p className="text-yellow-100 opacity-80 mb-2"># INSTRUCCIÓN PARA EL ESTUDIANTE:</p>
                                <p className="mb-4">Desarrolle un script que valide la entrada de usuario utilizando un bucle <span className="text-cyan-400">while</span> y manejo de excepciones <span className="text-cyan-400">try/except</span>.</p>
                                <div className="bg-black/30 p-4 rounded border border-slate-700">
                                    <code className="text-blue-300">def</code> <code className="text-yellow-300">validar_edad</code>():<br />
                                    &nbsp;&nbsp;<code className="text-pink-400">pass</code> <span className="text-slate-500"># Tu código aquí</span>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho: Rúbrica Técnica */}
                        <CodeRubricTable subarea={filters.especialidad} />
                    </div>
                )}

                {/* CASO B: SERVICE VIEW (Escenario + Checklist) */}
                {uiMode === "SERVICE_VIEW" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">

                        {/* Lado Izquierdo: Escenario de Roleplay */}
                        <div className="card bg-orange-50/50 border border-orange-100 shadow-xl">
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h2 className="card-title text-slate-800">Escenario de Simulación</h2>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Role Play: Atención de Quejas</p>
                                    </div>
                                </div>

                                <div className="prose prose-sm">
                                    <p><strong>Situación:</strong> Un cliente internacional llega al mostrador visiblemente molesto porque su reservación no aparece en el sistema.</p>
                                    <p><strong>Objetivo:</strong> El estudiante debe aplicar el protocolo L.E.A.S.T. (Listen, Empathize, Apologize, Solve, Thank).</p>
                                </div>

                                <div className="alert alert-info mt-4 text-xs">
                                    <Zap size={14} />
                                    <span>Tip: Evaluar tono de voz y lenguaje corporal.</span>
                                </div>
                            </div>
                        </div>

                        {/* Lado Derecho: Checklist de Protocolo */}
                        <RoleplayChecklist />
                    </div>
                )}

                {/* CASO DEFAULT: Empty State */}
                {uiMode === "DEFAULT" && (
                    <div className="flex flex-col items-center justify-center h-96 bg-base-50 rounded-xl border-2 border-dashed border-base-300 text-slate-400">
                        <Search size={48} className="mb-4 opacity-20" />
                        <h3 className="font-bold text-lg">Esperando Configuración</h3>
                        <p className="text-sm">Seleccione una especialidad para cargar el motor pedagógico.</p>
                    </div>
                )}

            </div>

            {/* 🔵 ZONA 3: DOCK DE HERRAMIENTAS (Toolbar inferor) */}
            <div className="dock dock-sm fixed bottom-6 left-1/2 -translate-x-1/2 bg-base-100/90 backdrop-blur border border-base-200 shadow-2xl rounded-full p-2 px-6 flex gap-4 z-50">
                <button className="btn btn-ghost btn-circle tooltip tooltip-top" data-tip="Limpiar">
                    <Trash2 size={20} className="text-error" onClick={() => setUiMode("DEFAULT")} />
                </button>
                <button className="btn btn-primary tooltip tooltip-top" data-tip="Generar Planeamiento">
                    <Zap size={20} />
                </button>
                <button className="btn btn-ghost btn-circle tooltip tooltip-top" data-tip="Guardar Borrador">
                    <Save size={20} />
                </button>
                <button className="btn btn-ghost btn-circle tooltip tooltip-top" data-tip="Exportar PDF">
                    <Printer size={20} />
                </button>
            </div>

        </div>
    );
}

// ----------------------------------------------------------------------------
// SUB-COMPONENTES (MOCKUPS PARA LA DEMO)
// ----------------------------------------------------------------------------

function CodeRubricTable({ subarea }) {
    return (
        <div className="card bg-base-100 border border-base-200 shadow-md h-full">
            <div className="card-body p-0">
                <div className="p-4 border-b border-base-200 bg-base-50 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <FileText size={16} /> Rúbrica de Producto: {subarea}
                    </h3>
                    <span className="badge badge-neutral badge-sm">Sintaxis Rigurosa</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr className="text-slate-500">
                                <th>Criterio Técnico (Sintaxis)</th>
                                <th className="w-24 text-center">Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Uso correcto de estructuras de control (bucles/condicionales) sin errores de indentación.</td>
                                <td className="text-center font-mono font-bold text-primary">5</td>
                            </tr>
                            <tr>
                                <td>Manejo de excepciones (try/catch) para evitar crash del sistema.</td>
                                <td className="text-center font-mono font-bold text-primary">5</td>
                            </tr>
                            <tr>
                                <td>Documentación del código (comentarios) siguiendo estándar PEP-8.</td>
                                <td className="text-center font-mono font-bold text-primary">3</td>
                            </tr>
                            <tr>
                                <td>Eficiencia del algoritmo (Complejidad ciclomática baja).</td> // Avanzado
                                <td className="text-center font-mono font-bold text-primary">7</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="bg-base-50 font-bold">
                                <td>TOTAL PUNTOS</td>
                                <td className="text-center text-lg">20</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

function RoleplayChecklist() {
    return (
        <div className="card bg-base-100 border border-base-200 shadow-md h-full">
            <div className="card-body p-0">
                <div className="p-4 border-b border-base-200 bg-orange-50 rounded-t-xl flex justify-between items-center">
                    <h3 className="font-bold text-sm flex items-center gap-2 text-orange-900">
                        <FileText size={16} /> Lista de Cotejo: Protocolo de Servicio
                    </h3>
                    <span className="badge badge-warning badge-sm text-white">Soft Skills</span>
                </div>
                <ul className="menu w-full p-2">
                    <li className="border-b border-base-100">
                        <label className="label cursor-pointer justify-start gap-4">
                            <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" />
                            <span className="label-text">Mantiene contacto visual y postura abierta.</span>
                        </label>
                    </li>
                    <li className="border-b border-base-100">
                        <label className="label cursor-pointer justify-start gap-4">
                            <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" />
                            <span className="label-text">Escucha activamente sin interrumpir al cliente.</span>
                        </label>
                    </li>
                    <li className="border-b border-base-100">
                        <label className="label cursor-pointer justify-start gap-4">
                            <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" />
                            <span className="label-text">Ofrece una disculpa sincera por el inconveniente.</span>
                        </label>
                    </li>
                    <li>
                        <label className="label cursor-pointer justify-start gap-4">
                            <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" />
                            <span className="label-text">Propone una solución viable dentro de las políticas.</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}
