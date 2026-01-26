"use client";
import React, { useState } from 'react';
import Asistencia from './Asistencia';
import Conducta from './Conducta';
import Evidencias from './Evidencias';

export default function GruposPage() {
    const [tab, setTab] = useState('ASISTENCIA');

    return (
        <div className="p-6 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Gestión de Grupos (10-1)</h1>
            <div className="flex gap-4 mb-6">
                <button onClick={() => setTab('ASISTENCIA')} className={`btn ${tab === 'ASISTENCIA' ? 'btn-primary' : 'btn-outline'}`}>Asistencia</button>
                <button onClick={() => setTab('CONDUCTA')} className={`btn ${tab === 'CONDUCTA' ? 'btn-primary' : 'btn-outline'}`}>Conducta</button>
                <button onClick={() => setTab('EVIDENCIAS')} className={`btn ${tab === 'EVIDENCIAS' ? 'btn-primary' : 'btn-outline'}`}>Evidencias</button>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                {tab === 'ASISTENCIA' && <Asistencia />}
                {tab === 'CONDUCTA' && <Conducta />}
                {tab === 'EVIDENCIAS' && <Evidencias />}
            </div>
        </div>
    );
}
