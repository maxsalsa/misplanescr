"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Save, User, Book, Briefcase, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Mock Catalog of MEP Subjects
const CATALOGO_MEP = {
    modalidades: ['Académica Diurna', 'Técnica Profesional', 'Nocturna', 'CINDEA/IPEC'],
    niveles: ['7° Año', '8° Año', '9° Año', '10° Año', '11° Año', '12° Año'],
    asignaturas: ['Matemática', 'Español', 'Ciencias', 'Estudios Sociales', 'Inglés', 'Informática Educativa', 'Desarrollo Web (Téc)', 'Contabilidad (Téc)', 'Electrónica (Téc)']
};

export default function SettingsPage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        nombre: user?.name || '',
        email: user?.email || '',
        telefono: '8888-8888',
        institucion: 'CTP de Puriscal',
        carga_academica: [
            { id: 1, modalidad: 'Técnica Profesional', nivel: '10° Año', asignatura: 'Desarrollo Web (Téc)' }
        ]
    });

    const handleSave = () => {
        // In a real app, this would PUT to /api/users/profile
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
            loading: 'Guardando perfil profesional...',
            success: '¡Configuración actualizada! Su dashboard se adaptará a estos cambios.',
            error: 'Error al guardar'
        });
    };

    const addCarga = () => {
        setProfile(prev => ({
            ...prev,
            carga_academica: [
                ...prev.carga_academica,
                { id: Date.now(), modalidad: 'Académica Diurna', nivel: '7° Año', asignatura: 'Matemática' }
            ]
        }));
    };

    const removeCarga = (id) => {
        setProfile(prev => ({
            ...prev,
            carga_academica: prev.carga_academica.filter(c => c.id !== id)
        }));
    };

    const updateCarga = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            carga_academica: prev.carga_academica.map(c => c.id === id ? { ...c, [field]: value } : c)
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                    <User className="text-indigo-600" /> Configuración de Perfil Docente
                </h1>
                <p className="text-slate-500">Defina su carga académica para que la IA personalice sus planeamientos y recursos.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Personal Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <h2 className="font-bold text-lg text-slate-700 mb-4 flex items-center gap-2">
                        <Briefcase size={20} className="text-indigo-500" /> Datos Institucionales
                    </h2>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Nombre Completo</span></label>
                            <input type="text" value={profile.nombre} onChange={e => setProfile({ ...profile, nombre: e.target.value })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Centro Educativo</span></label>
                            <input type="text" value={profile.institucion} onChange={e => setProfile({ ...profile, institucion: e.target.value })} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Correo MEP</span></label>
                            <input type="email" value={profile.email} disabled className="input input-bordered w-full bg-slate-50" />
                        </div>
                    </div>
                </div>

                {/* Academic Load Configurator - THE CORE REQUEST */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg text-slate-700 flex items-center gap-2">
                            <Book size={20} className="text-emerald-500" /> Carga Académica Actual
                        </h2>
                        <button onClick={addCarga} className="btn btn-sm btn-outline btn-primary">
                            + Agregar Grupo/Materia
                        </button>
                    </div>

                    <div className="space-y-4">
                        {profile.carga_academica.map((carga, index) => (
                            <div key={carga.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white transition-colors relative group">
                                <div className="absolute -top-3 -right-3 hidden group-hover:block">
                                    <button onClick={() => removeCarga(carga.id)} className="btn btn-circle btn-xs btn-error text-white shadow-md">✕</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="form-control">
                                        <label className="label py-0"><span className="label-text text-xs font-bold text-slate-400">Modalidad</span></label>
                                        <select value={carga.modalidad} onChange={(e) => updateCarga(carga.id, 'modalidad', e.target.value)} className="select select-bordered select-sm w-full">
                                            {CATALOGO_MEP.modalidades.map(m => <option key={m}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label py-0"><span className="label-text text-xs font-bold text-slate-400">Nivel / Año</span></label>
                                        <select value={carga.nivel} onChange={(e) => updateCarga(carga.id, 'nivel', e.target.value)} className="select select-bordered select-sm w-full">
                                            {CATALOGO_MEP.niveles.map(n => <option key={n}>{n}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <label className="label py-0"><span className="label-text text-xs font-bold text-slate-400">Asignatura</span></label>
                                        <select value={carga.asignatura} onChange={(e) => updateCarga(carga.id, 'asignatura', e.target.value)} className="select select-bordered select-sm w-full">
                                            {CATALOGO_MEP.asignaturas.map(a => <option key={a}>{a}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {profile.carga_academica.length === 0 && (
                            <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
                                No tiene carga académica asignada. Agregue materias para empezar.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-8 right-8">
                <button onClick={handleSave} className="btn btn-primary btn-lg shadow-xl gap-2 rounded-full animate-bounce-subtle">
                    <Save size={20} /> Guardar Cambios
                </button>
            </div>
        </div>
    );
}
