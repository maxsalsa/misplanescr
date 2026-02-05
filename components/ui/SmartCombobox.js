"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export function SmartCombobox({ label, options, value, onChange, placeholder, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const filteredOptions = query === "" ? options : options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="form-control w-full relative" ref={wrapperRef}>
      <label className="label font-bold text-slate-700 text-sm mb-1">{label}</label>
      <button type="button" disabled={disabled} onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 text-left bg-slate-50 transition-all ${isOpen ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"}`}>
        <span className={`truncate ${!value ? "text-slate-400" : "text-slate-900 font-bold"}`}>{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
            <input autoFocus type="text" className="w-full p-2 rounded border text-sm" placeholder="Buscar..." onChange={(e) => setQuery(e.target.value)}/>
          </div>
          <ul className="max-h-60 overflow-auto p-1">
            {filteredOptions.length === 0 ? <li className="p-3 text-xs text-slate-400 text-center">Sin resultados</li> : 
              filteredOptions.map((opt) => (
                <li key={opt} onClick={() => { onChange(opt); setIsOpen(false); setQuery(""); }}
                  className={`cursor-pointer p-3 rounded-lg text-sm ${value === opt ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50"}`}>
                  {opt}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}