import React, { useState, useCallback } from 'react';
import { Upload, FileSpreadsheet, X, Check, AlertCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

export default function ImportModal({ onClose, groups, onImport }) {
    const [step, setStep] = useState(1); // 1: Upload, 2: Select Group & Preview
    const [fileData, setFileData] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState("");
    const [fileName, setFileName] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Get first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert to JSON
                const json = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    toast.error("El archivo está vacío o no tiene un formato válido.");
                    return;
                }

                setFileData(json);
                setFileName(file.name);
                setStep(2);
                toast.success(`${json.length} estudiantes detectados.`);
            } catch (error) {
                console.error(error);
                toast.error("Error al leer el archivo. Asegúrese que sea un Excel válido.");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
            handleFile(file);
        } else {
            toast.error("Formato no soportado. Use Excel (.xlsx, .xls) o CSV.");
        }
    }, []);

    const handleConfirm = () => {
        if (!selectedGroupId) {
            toast.error("Por favor seleccione un grupo de destino.");
            return;
        }
        onImport(selectedGroupId, fileData);
        toast.success("Proceso de importación iniciado.");
    };

    const downloadTemplate = () => {
        // Generate a simple template
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([
            { "NOMBRE": "Juan", "APELLIDO1": "Perez", "APELLIDO2": "Mora", "CEDULA": "111111111", "TELEFONO": "88888888", "CORREO": "juan@est.mep.go.cr", "DIRECCION": "San Jose, Centro" },
            { "NOMBRE": "Maria", "APELLIDO1": "Rojas", "APELLIDO2": "Solis", "CEDULA": "222222222", "TELEFONO": "99999999", "CORREO": "", "DIRECCION": "Heredia, Flores" }
        ]);
        XLSX.utils.book_append_sheet(wb, ws, "Plantilla Estudiantes");
        XLSX.writeFile(wb, "Plantilla_Estudiantes_MEP.xlsx");
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="modal-box w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                        <FileSpreadsheet className="text-emerald-600" />
                        Importación Masiva de Estudiantes
                    </h3>
                    <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm"><X size={20} /></button>
                </div>

                {step === 1 ? (
                    <div className="space-y-6">
                        <div
                            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors
                                ${isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 bg-slate-50'}
                            `}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={onDrop}
                        >
                            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Upload className="text-indigo-500" size={32} />
                            </div>
                            <h4 className="text-lg font-medium text-slate-700 mb-2">Arrastre su archivo Excel aquí</h4>
                            <p className="text-slate-500 text-sm mb-6">Soporta .xlsx, .xls, .csv</p>

                            <label className="btn btn-primary">
                                Seleccionar Archivo
                                <input type="file" className="hidden" accept=".xlsx, .xls, .csv" onChange={(e) => handleFile(e.target.files[0])} />
                            </label>
                        </div>

                        <div className="alert alert-info bg-blue-50 border-blue-100 text-blue-800 text-sm">
                            <AlertCircle size={18} />
                            <span>
                                <strong>Tip:</strong> El sistema detectará automáticamente columnas como "Nombre", "Cédula", "Correo", "Teléfono".
                            </span>
                            <button onClick={downloadTemplate} className="btn btn-xs btn-ghost gap-1 ml-auto text-blue-700 underline">
                                <Download size={12} /> Descargar Plantilla
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                            <FileSpreadsheet className="text-emerald-600" />
                            <div className="flex-1">
                                <p className="font-bold text-emerald-900">{fileName}</p>
                                <p className="text-xs text-emerald-700">{fileData.length} registros encontrados</p>
                            </div>
                            <button onClick={() => setStep(1)} className="btn btn-ghost btn-xs text-emerald-700">Cambiar</button>
                        </div>

                        <div className="form-control">
                            <label className="label font-medium text-slate-600">Seleccionar Grupo de Destino</label>
                            <select
                                className="select select-bordered w-full"
                                value={selectedGroupId}
                                onChange={(e) => setSelectedGroupId(e.target.value)}
                            >
                                <option value="">-- Seleccione un Grupo --</option>
                                {groups.map(g => (
                                    <option key={g.id} value={g.id}>{g.name} ({g.grade})</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <label className="label font-medium text-slate-500 text-xs uppercase tracking-wider mb-2">Vista Previa (Primeros 3)</label>
                            <div className="overflow-x-auto">
                                <table className="table table-xs bg-white">
                                    <thead>
                                        <tr>
                                            <th>Nombre (Detectado)</th>
                                            <th>Cédula</th>
                                            <th>Correo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileData.slice(0, 3).map((row, i) => {
                                            // Quick preview logic same as main logic
                                            const getVal = (keys) => {
                                                for (let k of keys) {
                                                    const found = Object.keys(row).find(key => key.toUpperCase().includes(k));
                                                    if (found) return row[found];
                                                }
                                                return "-";
                                            };
                                            const fullName = getVal(['NOMBRE', 'NAME']) + " " + getVal(['APELLIDO', 'LAST']);
                                            return (
                                                <tr key={i}>
                                                    <td>{fullName.replace("undefined", "")}</td>
                                                    <td>{getVal(['CEDULA', 'ID'])}</td>
                                                    <td>{getVal(['CORREO', 'EMAIL'])}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
                            <button className="btn btn-primary gap-2" onClick={handleConfirm}>
                                <Check size={18} /> Importar Estudiantes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
