"use client";
import { useState } from "react";
import { LibraryBig, Search, BookOpen, FileText, Video, Download, ExternalLink, Filter } from "lucide-react";

// Simulated library resources
const RESOURCES = [
    { id: 1, title: "Guía de Fracciones", subject: "Matemáticas", type: "pdf", description: "Repaso completo de fracciones con ejercicios.", size: "2.4 MB", date: "2026-01-15" },
    { id: 2, title: "La Célula Vegetal", subject: "Ciencias", type: "video", description: "Video explicativo de 8 minutos sobre células.", duration: "8:32", date: "2026-01-10" },
    { id: 3, title: "Mapa Mental: Revolución Industrial", subject: "Estudios Sociales", type: "image", description: "Esquema visual de los eventos clave.", size: "1.1 MB", date: "2026-01-08" },
    { id: 4, title: "Vocabulario de la Unidad 3", subject: "Inglés", type: "pdf", description: "Lista de palabras con pronunciación.", size: "890 KB", date: "2026-01-12" },
    { id: 5, title: "Ejercicios de Álgebra", subject: "Matemáticas", type: "pdf", description: "20 problemas de práctica con soluciones.", size: "1.8 MB", date: "2026-01-18" },
    { id: 6, title: "El Sistema Solar", subject: "Ciencias", type: "video", description: "Documental corto sobre los planetas.", duration: "12:45", date: "2026-01-05" },
];

const TYPE_CONFIG = {
    pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-50" },
    video: { icon: Video, color: "text-blue-500", bg: "bg-blue-50" },
    image: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50" },
};

const SUBJECTS = ["Todos", "Matemáticas", "Ciencias", "Estudios Sociales", "Inglés", "Español"];

export default function StudentLibraryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("Todos");

    const filteredResources = RESOURCES.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSubject = selectedSubject === "Todos" || r.subject === selectedSubject;
        return matchesSearch && matchesSubject;
    });

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-cyan-700">📚 Biblioteca de Repaso</h1>
                <p className="text-slate-500">Materiales y recursos para estudiar en casa.</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar material..."
                        className="input input-bordered w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-slate-400" />
                    <select
                        className="select select-bordered w-full md:w-48"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        {SUBJECTS.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map(resource => {
                    const config = TYPE_CONFIG[resource.type];
                    const Icon = config.icon;
                    return (
                        <div key={resource.id} className="card bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-all">
                            <div className="card-body">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${config.bg}`}>
                                        <Icon className={config.color} size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800">{resource.title}</h3>
                                        <span className="badge badge-ghost text-xs">{resource.subject}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mt-3">{resource.description}</p>
                                <div className="flex justify-between items-center mt-4 text-xs text-slate-400">
                                    <span>{resource.size || resource.duration}</span>
                                    <span>{resource.date}</span>
                                </div>
                                <div className="card-actions mt-4">
                                    {resource.type === "video" ? (
                                        <button className="btn btn-primary btn-block gap-2 bg-cyan-600 border-none hover:bg-cyan-700">
                                            <ExternalLink size={16} /> Ver Video
                                        </button>
                                    ) : (
                                        <button className="btn btn-outline btn-block gap-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50">
                                            <Download size={16} /> Descargar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredResources.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                    <LibraryBig size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No se encontraron materiales con esos criterios.</p>
                </div>
            )}
        </div>
    );
}
