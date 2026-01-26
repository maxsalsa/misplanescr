"use client";
import React, { useState, useEffect } from 'react';
import { Search, Check } from 'lucide-react';

export default function SmartCombobox({ label, options = [], onSelect, placeholder = "Buscar..." }) {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    // AI/Auto-Load Simulation (In prod this would be useQuery)
    useEffect(() => {
        if (!query) {
            setFiltered(options);
        } else {
            const lower = query.toLowerCase();
            setFiltered(options.filter(opt => opt.label.toLowerCase().includes(lower)));
        }
    }, [query, options]);

    return (
        <div className="form-control w-full relative">
            <label className="label">
                <span className="label-text font-bold text-xs uppercase">{label}</span>
            </label>
            <div className="relative">
                <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder={selected ? selected.label : placeholder}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay for click
                />
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            </div>

            {isOpen && filtered.length > 0 && (
                <ul className="absolute z-50 w-full bg-white/90 backdrop-blur-xl text-black mt-1 rounded-lg shadow-xl border border-white/20 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    {filtered.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => { setSelected(opt); setIsOpen(false); setQuery(''); if (onSelect) onSelect(opt); }}
                            className="p-3 hover:bg-slate-100 cursor-pointer text-sm flex justify-between items-center"
                        >
                            {opt.label}
                            {selected?.value === opt.value && <Check size={14} className="text-green-500" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
