"use client"
import React, { useState } from 'react';
import { Users, ShieldAlert, FileSpreadsheet, Star } from "lucide-react";
import Swal from "sweetalert2";
// 🛡️ ANTIGRAVITY SINGLE SOURCE OF TRUTH
import { evaluarYDispararProtocolo } from '@/components/security/ProtocolTrigger';

export default function GestionVidaEstudiantil() {
    const [seccion, setSeccion] = useState("10-1 (Ciberseguridad)");
    // 🛡️ AUTH CONNECTION
    const [isDocenteGuia, setIsDocenteGuia] = useState(true); // Should come from User Context

    // 🛡️ Regla de Oro: Control de Conducta y Protocolos
    const registrarBoleta = (estudiante, falta) => {

        // 1. Check Security Protocols first (Botón Rojo)
        const protocolAnalysis = evaluarYDispararProtocolo({
            texto: falta,
            onEscalar: (risk) => {
                console.warn(`[AUDIT] Protocolo Activado para ${estudiante}:`, risk);
                Swal.fire({
                    title: "⚠️ PROTOCOLO ACTIVADO",
                    text: `Se ha detectado una situación de riesgo ${risk.level}. Iniciando Protocolo MEP ${risk.protocol}.`,
                    icon: "warning",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "NOTIFICAR DIRECCIÓN"
                });
            }
        });

        if (protocolAnalysis.triggered) return;

        // 2. Proceed with minor conduct report
        console.log(`Boleta registrada para ${estudiante}: ${falta}`);
        Swal.fire({
            title: "Boleta Registrada",
            text: "La falta leve ha sido anotada en el expediente digital.",
            icon: "success",
            timer: 1500
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
            {/* ... Content ... */}
            {/* (Keeping UI structure but verifying Classes) */}

            {/* Header de Gestión Administrativa */}
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 bg-slate-800 p-6 rounded-[32px] border border-white/5 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-2xl shadow-lg">
                        <Users size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-tight">{seccion}</h1>
                        <p className="text-[10px] font-bold opacity-50 tracking-widest text-slate-300">Gesti&oacute;n de Grupo | AulaPlan v5.0</p>
                    </div>
                </div>
                {isDocenteGuia && (
                    <div className="badge badge-warning p-3 font-black text-[10px] uppercase gap-2 text-black shadow-glow">
                        <Star size={12} /> Docente Gu&iacute;a
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Registro de Asistencia y Conducta */}
                <section className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-800 rounded-[42px] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                        {/* Decorative BG element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full blur-3xl"></div>

                        <h2 className="text-lg font-black mb-6 uppercase text-slate-200">Control de Asistencia & Conducta</h2>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="text-primary-content text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th>Estudiante</th>
                                        <th>Estado</th>
                                        <th>Conducta Real</th>
                                        <th>Acci&oacute;n</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                        <td className="font-bold text-slate-200">Salazar Sanchez, Max</td>
                                        <td><input type="checkbox" className="checkbox checkbox-success checkbox-sm rounded-md" defaultChecked /></td>
                                        <td><span className="badge badge-ghost text-[10px] uppercase font-bold text-slate-400">Sin incidentes</span></td>
                                        <td>
                                            <button
                                                onClick={() => registrarBoleta("Max", "Porta un arma de fuego")}
                                                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                                title="Reportar Falta"
                                            >
                                                <ShieldAlert size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Mock Data Row 2 */}
                                    <tr className="hover:bg-white/5 transition-colors border-b border-white/5">
                                        <td className="font-bold text-slate-200">Vargas Monge, Sofia</td>
                                        <td><input type="checkbox" className="checkbox checkbox-success checkbox-sm rounded-md" defaultChecked /></td>
                                        <td><span className="badge badge-ghost text-[10px] uppercase font-bold text-slate-400">Excelente</span></td>
                                        <td>
                                            <button
                                                onClick={() => registrarBoleta("Sofia", "Llegada tardía")}
                                                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                            >
                                                <ShieldAlert size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Instrument Panel */}
                <aside className="space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[42px] shadow-2xl border border-primary/20">
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                            <FileSpreadsheet size={16} /> Instrumentos T&eacute;cnicos
                        </h3>
                        <div className="space-y-4">
                            <button className="btn btn-outline btn-block rounded-2xl border-white/10 text-xs font-black uppercase hover:border-primary hover:text-primary">
                                Generar R&uacute;brica de Desempe&ntilde;o
                            </button>
                            <button className="btn btn-outline btn-block rounded-2xl border-white/10 text-xs font-black uppercase hover:border-primary hover:text-primary">
                                Lista de Cotejo para RA-02
                            </button>
                            <div className="divider opacity-10"></div>
                            <div className="alert bg-black/20 text-[10px] border-none">
                                <ShieldAlert size={12} className="text-warning" />
                                <span className="opacity-60 italic">
                                    *Bloqueo Antigravity: No se permite guardar notas sin instrumento vinculado.
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
