"use client";
import { useState } from 'react';
import { Save, Building2, MapPin, Upload } from 'lucide-react';

export default function SchoolProfileConfig() {
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState("https://placehold.co/100x100/e2e8f0/64748b?text=LOGO");

    return (
        <div className="card bg-base-100 shadow-lg border border-base-200 max-w-4xl mx-auto">
            <div className="card-body">
                <h2 className="card-title text-[#003366] flex gap-2 border-b pb-4 mb-4">
                    <Building2 /> Identidad Institucional
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* COL 1: LOGO UPLOAD */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="avatar">
                            <div className="w-32 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={logoPreview} alt="Escudo" />
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline gap-2">
                            <Upload size={16} /> Subir Escudo
                        </button>
                        <p className="text-xs text-base-content/60 text-center">
                            Formato: PNG/JPG<br />Max: 2MB
                        </p>
                    </div>

                    {/* COL 2 & 3: FORM */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Nombre Oficial del Centro Educativo</span></label>
                            <input type="text" placeholder="Ej: CTP de Inteligencia Artificial" className="input input-bordered w-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Modalidad</span></label>
                                <select className="select select-bordered w-full">
                                    <option>Académica</option>
                                    <option>Técnica (CTP)</option>
                                    <option>Nocturna (CINDEA)</option>
                                    <option>Humanística</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Provincia</span></label>
                                <select className="select select-bordered w-full">
                                    <option>San José</option>
                                    <option>Alajuela</option>
                                    <option>Cartago</option>
                                    <option>Heredia</option>
                                    <option>Guanacaste</option>
                                    <option>Puntarenas</option>
                                    <option>Limón</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Dirección Regional (DRE)</span></label>
                                <input type="text" placeholder="Ej: San José Norte" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Circuito Escolar</span></label>
                                <input type="text" placeholder="Ej: 05" className="input input-bordered" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="btn btn-primary gap-2">
                                <Save size={18} /> Guardar Configuración
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* HEADER PREVIEW */}
            <div className="bg-slate-100 p-6 m-6 rounded-lg border border-slate-300">
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Vista Previa en Documentos Oficiales:</div>

                <div className="bg-white p-6 shadow-sm border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={logoPreview} className="w-16 h-16 object-contain opacity-80" alt="Logo" />
                        <div>
                            <h3 className="font-bold text-[#003366] text-lg leading-tight">MINISTERIO DE EDUCACIÓN PÚBLICA</h3>
                            <p className="text-xs uppercase tracking-wide">Dirección Regional de San José Norte | Circuito 05</p>
                            <p className="text-sm font-bold mt-1">CTP DE INTELIGENCIA ARTIFICIAL</p>
                        </div>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                        <p>Planeamiento Didáctico</p>
                        <p>Curso Lectivo 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
