"use client";

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CurriculumManagerPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [logs, setLogs] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error("Por favor selecciona un archivo PDF.");
            return;
        }

        setUploading(true);
        setLogs("Iniciando carga e ingesta...");

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload-curriculum', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                toast.success("¡Documento integrado exitosamente!");
                setLogs(prev => prev + "\n" + data.logs + "\n✅ PROCESO COMPLETADO.");
                setFile(null); // Reset
            } else {
                toast.error("Error en la ingesta: " + data.error);
                setLogs(prev => prev + "\n❌ ERROR: " + data.error);
            }

        } catch (err) {
            console.error(err);
            toast.error("Error de conexión con el servidor.");
            setLogs(prev => prev + "\n❌ ERROR CRÍTICO DE CONEXIÓN.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestor Curricular</h1>
                    <p className="text-slate-500">Sube los Programas de Estudio Oficiales (PDF) para alimentar la IA.</p>
                </div>
                <div className="badge badge-primary badge-outline gap-2 p-4">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                    Motor V13 Activo
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* UPLOAD CARD */}
                <div className="card glass-card border border-slate-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-slate-800">
                            <Upload className="w-6 h-6 text-indigo-600" />
                            Carga de Documentos
                        </h2>

                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-slate-50 mt-4">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                disabled={uploading}
                            />
                            <p className="text-xs text-slate-400 mt-2">Solo archivos .PDF (Máx 10MB)</p>
                        </div>

                        {file && (
                            <div className="alert bg-indigo-50 border-indigo-100 text-indigo-700 mt-4">
                                <FileText className="w-5 h-5" />
                                <span>Archivo seleccionado: <strong>{file.name}</strong></span>
                            </div>
                        )}

                        <div className="card-actions justify-end mt-4">
                            <button
                                className="btn btn-primary w-full"
                                onClick={handleUpload}
                                disabled={uploading || !file}
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Procesando e Indexando...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5" />
                                        Subir e Integrar al Cerebro
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* LOGS CARD */}
                <div className="card bg-slate-900 text-slate-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-white border-b border-slate-700 pb-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-emerald-400" />
                            Terminal de Ingesta (Logs)
                        </h2>
                        <div className="mockup-code bg-black text-xs h-64 overflow-y-auto">
                            <pre data-prefix="$"><code>waiting for input...</code></pre>
                            {logs.split('\n').map((line, i) => (
                                <pre key={i} data-prefix=">"><code>{line}</code></pre>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* INFO SECTION */}
            <div className="alert bg-white border border-slate-200 shadow-sm">
                <CheckCircle className="text-emerald-500 w-6 h-6" />
                <div>
                    <h3 className="font-bold text-slate-800">¿Cómo funciona la Ingesta Universal?</h3>
                    <div className="text-xs text-slate-500">
                        1. El PDF se guarda en la carpeta segura <code>documentos_mep</code>.<br />
                        2. Se ejecuta el script <code>antifinal.py</code> que "lee" el PDF.<br />
                        3. Se crean "vectores" de conocimiento y se guardan en <code>cerebro_mep</code>.<br />
                        4. La IA ahora puede responder preguntas específicas de este documento.
                    </div>
                </div>
            </div>
        </div>
    );
}
