'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, User, FileText, ClipboardList, GraduationCap, X } from 'lucide-react';
import Link from 'next/link';
import { globalSearchAction } from '@/app/actions/search';
import { useRouter } from 'next/navigation';

export function GlobalSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    // Debounce Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                setIsOpen(true);
                const response = await globalSearchAction(query);
                if (response.success) {
                    setResults(response.results);
                }
                setLoading(false);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const getIcon = (type) => {
        switch (type) {
            case 'student': return <User size={16} className="text-blue-500" />;
            case 'plan': return <FileText size={16} className="text-emerald-500" />;
            case 'grade': return <ClipboardList size={16} className="text-amber-500" />;
            default: return <Search size={16} />;
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md hidden md:block group">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Buscar estudiante, grupo, boleta..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                />
                {loading && <Loader2 className="absolute right-3 top-2.5 animate-spin text-blue-500" size={18} />}
                {query && !loading && (
                    <button onClick={() => { setQuery(''); setIsOpen(false); }} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* RESULTS DROPDOWN */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Resultados</div>
                        {results.map((result, idx) => (
                            <Link
                                key={idx}
                                href={result.url}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                            >
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    {getIcon(result.type)}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-700 text-sm">{result.title}</div>
                                    <div className="text-xs text-slate-500">{result.subtitle}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="bg-slate-50 px-4 py-2 text-[10px] text-center text-slate-400 border-t border-slate-100 font-medium">
                        Presione ENTER para ver todos
                    </div>
                </div>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && !loading && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 p-4 text-center z-50">
                    <p className="text-sm text-slate-500">No se encontraron resultados.</p>
                </div>
            )}
        </div>
    );
}
