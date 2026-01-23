import { getAllPrograms } from '@/lib/catalog-service';
import { Search, FileText, BookOpen, Filter } from 'lucide-react';

/**
 * PAGE: VISOR DE CURRÍCULO OFICIAL
 * Acceso directo a los documentos normativos oficiales del MEP.
 * Generado dinámicamente desde catalogo_mep.json
 */
export default async function CurriculumPage() {
    const programs = await getAllPrograms();

    // Agrupar por Modalidad para la vista principal
    const byModality = programs.reduce((acc, prog) => {
        if (!acc[prog.modalidad]) acc[prog.modalidad] = [];
        acc[prog.modalidad].push(prog);
        return acc;
    }, {});

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Programas de Estudio Oficiales</h1>
                    <p className="text-slate-500">Fuente de verdad del Ministerio de Educación Pública (MEP).</p>
                </div>
                <div className="badge badge-primary badge-outline font-mono">
                    {programs.length} Documentos Indexados
                </div>
            </div>

            {/* Búsqueda Rápida (Placeholder visual, la lógica sería client-side o URL params) */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar asignatura, especialidad o nivel..."
                    className="input input-bordered w-full pl-10 bg-white shadow-sm"
                />
            </div>

            {/* Grid de Modalidades */}
            <div className="space-y-8">
                {Object.entries(byModality).map(([modalidad, items]) => (
                    <div key={modalidad} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center gap-3">
                            <BookOpen className="text-indigo-600" />
                            <h2 className="text-lg font-bold text-slate-700">{modalidad}</h2>
                            <span className="badge badge-ghost text-xs">{items.length} programas</span>
                        </div>

                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.slice(0, 9).map((prog) => ( // Mostrar solo algunos iniciales para no saturar
                                <a
                                    key={prog.id}
                                    href={prog.ruta_completa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                                >
                                    <div className="p-2 bg-white rounded-lg border border-slate-100 group-hover:border-indigo-200">
                                        <FileText className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-700 text-sm group-hover:text-indigo-700 line-clamp-1">
                                            {prog.nombre}
                                        </h3>
                                        <p className="text-xs text-slate-500">{prog.nivel}</p>
                                    </div>
                                </a>
                            ))}
                            {items.length > 9 && (
                                <div className="flex items-center justify-center p-3 text-sm text-slate-400 italic">
                                    + {items.length - 9} documentos más...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {programs.length === 0 && (
                <div className="alert alert-warning">
                    <span>No se encontró el catálogo oficial. Por favor verifique la carga de datos.</span>
                </div>
            )}
        </div>
    );
}
