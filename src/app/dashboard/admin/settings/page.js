"use client";
import { useState } from "react";
import { Settings, Bell, Shield, Palette, Database, Save, ToggleLeft, ToggleRight } from "lucide-react";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "MisPlanesCR",
        supportEmail: "soporte@misplanescr.com",
        allowRegistration: true,
        requireEmailVerification: false,
        maintenanceMode: false,
        defaultTrialDays: 7,
        maxFileSize: 10,
        enableNotifications: true,
        darkModeDefault: false,
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        alert("✅ Configuración guardada exitosamente.");
        // In production: POST to API
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">⚙️ Configuración del Sistema</h1>
                    <p className="text-slate-500">Ajustes globales de la plataforma.</p>
                </div>
                <button onClick={handleSave} className="btn btn-primary gap-2">
                    <Save size={18} /> Guardar Cambios
                </button>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* General */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <Settings size={20} className="text-indigo-500" /> General
                    </h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="label text-sm font-medium">Nombre del Sitio</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={settings.siteName}
                                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="label text-sm font-medium">Correo de Soporte</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={settings.supportEmail}
                                onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-green-500" /> Seguridad
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-slate-700">Permitir Registro Público</p>
                                <p className="text-xs text-slate-400">Los usuarios pueden crear cuentas sin invitación.</p>
                            </div>
                            <button onClick={() => toggleSetting("allowRegistration")} className="text-2xl">
                                {settings.allowRegistration ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-slate-400" />}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-slate-700">Verificación de Correo Obligatoria</p>
                                <p className="text-xs text-slate-400">Los usuarios deben confirmar su email.</p>
                            </div>
                            <button onClick={() => toggleSetting("requireEmailVerification")} className="text-2xl">
                                {settings.requireEmailVerification ? <ToggleRight className="text-green-500" /> : <ToggleLeft className="text-slate-400" />}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-red-600">⚠️ Modo Mantenimiento</p>
                                <p className="text-xs text-slate-400">Solo admins pueden acceder al sistema.</p>
                            </div>
                            <button onClick={() => toggleSetting("maintenanceMode")} className="text-2xl">
                                {settings.maintenanceMode ? <ToggleRight className="text-red-500" /> : <ToggleLeft className="text-slate-400" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Limits */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <Database size={20} className="text-amber-500" /> Límites y Almacenamiento
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="label text-sm font-medium">Días de Prueba (Demo)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={settings.defaultTrialDays}
                                onChange={(e) => setSettings(prev => ({ ...prev, defaultTrialDays: parseInt(e.target.value) }))}
                            />
                        </div>
                        <div>
                            <label className="label text-sm font-medium">Tamaño Máximo de Archivo (MB)</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={settings.maxFileSize}
                                onChange={(e) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                        <Palette size={20} className="text-purple-500" /> Apariencia
                    </h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium text-slate-700">Modo Oscuro por Defecto</p>
                            <p className="text-xs text-slate-400">Nuevos usuarios verán la interfaz en modo oscuro.</p>
                        </div>
                        <button onClick={() => toggleSetting("darkModeDefault")} className="text-2xl">
                            {settings.darkModeDefault ? <ToggleRight className="text-purple-500" /> : <ToggleLeft className="text-slate-400" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
