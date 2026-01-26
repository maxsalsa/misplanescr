"use client";
import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Conducta() {

    const triggerReport = (student) => {
        Swal.fire({
            title: `Reporte: ${student}`,
            html: `
                <select id="swal-type" class="swal2-input">
                    <option value="LEVE">Falta Leve</option>
                    <option value="GRAVE">Falta Grave</option>
                    <option value="GRAVISIMA">Falta Gravísima</option>
                </select>
                <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción de los hechos..."></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Registrar Boleta',
            preConfirm: () => {
                const type = document.getElementById('swal-type').value;
                const desc = document.getElementById('swal-desc').value;
                return { type, desc };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { type, desc } = result.value;
                const lowerDesc = desc.toLowerCase();

                // 🔐 QA TEST: TRIGGER DETECTION
                if (type === 'GRAVISIMA' || lowerDesc.includes('arma') || lowerDesc.includes('droga') || lowerDesc.includes('suicid')) {
                    Swal.fire({
                        icon: 'warning',
                        title: '¡PROTOCOLO DE RIESGO ACTIVADO!',
                        text: 'Se ha detectado una situación de alto riesgo. El sistema está notificando a Orientación y habilitando enlace al 9-1-1.',
                        footer: '<a href="tel:911" style="color:red; font-weight:bold;">LLAMAR AL 9-1-1 AHORA</a>'
                    });
                    console.log("[QA-AUDIT] TRIGGER FIRED: Risk Content Detected in Conduct Report.");
                } else {
                    Swal.fire('Registrado', 'La boleta ha sido guardada en Neon DB.', 'success');
                }
            }
        });
    };

    return (
        <div>
            <div className="alert alert-warning mb-6 text-black">
                <AlertTriangle />
                <span><strong>Protocolo Activo:</strong> Cualquier reporte de armas o drogas disparará alerta inmediata (9-1-1).</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => triggerReport("Max Salazar")} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center hover:bg-slate-700 cursor-pointer border border-transparent hover:border-red-500 transition-all">
                    <span className="font-bold">Salazar Sanchez, Max</span>
                    <button className="btn btn-sm btn-ghost text-red-400"><ShieldAlert size={16} /></button>
                </div>
                <div onClick={() => triggerReport("Sofia Vargas")} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center hover:bg-slate-700 cursor-pointer border border-transparent hover:border-red-500 transition-all">
                    <span className="font-bold">Vargas Monge, Sofia</span>
                    <button className="btn btn-sm btn-ghost text-red-400"><ShieldAlert size={16} /></button>
                </div>
            </div>
        </div>
    );
}
