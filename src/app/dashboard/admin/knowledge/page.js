"use client";
import { useState, useEffect } from 'react';
import { Folder, FileText, Upload, RefreshCw, Search, X } from 'lucide-react';
import { toast } from 'sonner';

import VisorPDF from '@/components/ui/visor-pdf';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function KnowledgeBasePage() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/scan-docs');
            const data = await res.json();
            if (data.files) {
                setFiles(data.files);
            }
        } catch (error) {
            console.error("Error fetching docs", error);
            toast.error("Error al cargar documentos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleViewFile = (file) => {
        setSelectedFile(file);
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Centro de Documentación Oficial MEP</h1>
                    <p className="text-slate-500">Gestión de Programas de Estudio y Normativa Oficial</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchDocs} className="btn btn-ghost gap-2">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Actualizar Índice
                    </button>
                    <button className="btn btn-primary gap-2" onClick={() => toast.info("Para subir archivos, copie los PDFs en la carpeta 'public/mep-docs' del servidor.")}>
                        <Upload className="w-4 h-4" />
                        Subir Documentos
                    </button>
                </div>
            </header>

            {/* Stats / Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-blue-600">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-800">{files.length}</div>
                        <div className="text-sm text-slate-500">Documentos Indexados</div>
                    </div>
                </div>
                <div className="bg-blue-600 p-6 rounded-xl shadow-lg border border-blue-500 text-white flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-1">¿Cómo agregar más?</h3>
                    <p className="text-blue-100 text-sm">
                        Coloca tus archivos PDF en la carpeta <code className="bg-black/20 px-1 rounded">public/mep-docs</code> del proyecto. El sistema los detectará automáticamente.
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Buscar por asignatura, nivel o código..."
                    className="input input-lg w-full pl-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* File List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-400">Cargando índice de archivos...</div>
                ) : files.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <Folder className="w-16 h-16 text-slate-200 mb-4" />
                        <h3 className="text-lg font-bold text-slate-600">Biblioteca Vacía</h3>
                        <p className="text-slate-400 mb-6 max-w-md">No se han encontrado documentos en el servidor. Copia los programas de estudio en la carpeta designada.</p>
                    </div>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500">
                                <th>Nombre del Archivo</th>
                                <th>Tamaño</th>
                                <th>Tipo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFiles.map((file, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 group">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-50 text-red-500 rounded">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-700">{file.name}</div>
                                                <div className="text-xs text-slate-400">{file.path}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-slate-500 font-mono text-xs">{file.size}</td>
                                    <td><span className="badge badge-sm badge-ghost">PDF Oficial</span></td>
                                    <td>
                                        <button
                                            onClick={() => handleViewFile(file)}
                                            className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                                        >
                                            Ver Documento
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* PDF Viewer Modal */}
            <Dialog open={!!selectedFile} onOpenChange={(open) => !open && setSelectedFile(null)}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b">
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            {selectedFile?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 bg-slate-100 p-4 overflow-hidden">
                        {selectedFile && (
                            <VisorPDF
                                url={`/mep-docs/${selectedFile.name}`}
                                title={selectedFile.name}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
