"use client";
import { useState } from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, FileSpreadsheet } from 'lucide-react';
import { parseAndValidateImport } from '@/core/productivity/smart-importer';

/**
 * 📥 SMART IMPORTER UI
 * Zero-Friction interface for bulk student onboarding from Excel/CSV.
 */

export default function SmartImporterWidget() {
    const [file, setFile] = useState(null);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);
        setLoading(true);

        // Call the Logic Engine
        // In a real app, we pass the institutionId obtained from Session
        const result = await parseAndValidateImport(selected, "INSTITUTION-ID-PLACEHOLDER");

        setReport(result);
        setLoading(false);
    };

    return (
        <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
                <h2 className="card-title text-primary flex gap-2">
                    <FileSpreadsheet /> Importador Inteligente
                </h2>
                <p className="text-sm opacity-70">
                    Sube tu lista de estudiantes (Excel/CSV). El sistema limpiará los datos automáticamente.
                </p>

                {/* DRAG & DROP ZONE */}
                <div className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${file ? 'border-primary bg-primary/10' : 'border-base-300 bg-base-50'}`}>
                    {!file ? (
                        <>
                            <UploadCloud size={48} className="text-base-400 mb-2" />
                            <span className="font-bold text-base-500">Arrastra tu archivo aquí</span>
                            <span className="text-xs text-base-400 mt-1">o haz clic para buscar</span>
                            <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer" onChange={handleFileChange} accept=".csv, .xlsx" />
                        </>
                    ) : (
                        <div className="text-center">
                            <FileSpreadsheet size={48} className="mx-auto text-primary mb-2" />
                            <div className="font-bold">{file.name}</div>
                            <button className="btn btn-xs btn-ghost text-error mt-2" onClick={() => { setFile(null); setReport(null); }}>Cancelar</button>
                        </div>
                    )}
                </div>

                {/* PREVIEW REPORT */}
                {loading && <div className="loading loading-bars loading-lg mx-auto my-4 text-primary"></div>}

                {report && (
                    <div className="mt-4 animate-fade-in space-y-4">
                        <div className="stats shadow w-full">
                            <div className="stat place-items-center">
                                <div className="stat-title">Total</div>
                                <div className="stat-value text-primary">{report.summary.total}</div>
                            </div>
                            <div className="stat place-items-center">
                                <div className="stat-title">Válidos</div>
                                <div className="stat-value text-success">{report.summary.success}</div>
                            </div>
                            <div className="stat place-items-center">
                                <div className="stat-title">Errores</div>
                                <div className="stat-value text-error">{report.summary.failed}</div>
                            </div>
                        </div>

                        {report.logs.length > 0 && (
                            <div className="alert alert-warning shadow-sm items-start">
                                <AlertTriangle />
                                <div className="flex-1">
                                    <h3 className="font-bold text-xs">Atención requerida en {report.logs.length} filas</h3>
                                    <ul className="text-xs list-disc pl-4 mt-1 max-h-24 overflow-y-auto">
                                        {report.logs.map((L, i) => (
                                            <li key={i}>Fila {L.row}: {L.errors.join(", ")}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <button className="btn btn-primary w-full gap-2">
                            <CheckCircle size={18} /> Confirmar Importación
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
