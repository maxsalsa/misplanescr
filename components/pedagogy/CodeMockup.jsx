import { Terminal, Copy, Play } from "lucide-react";

export default function CodeMockup({ code, language = "sql" }) {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#1e1e1e] shadow-2xl my-4 font-mono text-sm">
      {/* VS CODE HEADER */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-slate-400 text-xs font-bold flex items-center gap-2">
          <Terminal size={12} /> main.{language}
        </div>
        <div className="flex gap-3">
          <Play
            size={14}
            className="text-emerald-500 cursor-pointer hover:text-emerald-400"
          />
          <Copy
            size={14}
            className="text-slate-400 cursor-pointer hover:text-white"
          />
        </div>
      </div>

      {/* CODE BODY */}
      <div className="p-4 text-emerald-400 overflow-x-auto">
        <pre>
          <code>{code || "-- Esperando input del estudiante..."}</code>
        </pre>
      </div>

      {/* TERMINAL FOOTER */}
      <div className="bg-[#252526] px-4 py-2 border-t border-slate-700 text-xs text-slate-500 flex gap-4">
        <span>Ln 12, Col 45</span>
        <span>UTF-8</span>
        <span>{language.toUpperCase()}</span>
        <span className="text-blue-400">Prettier: On</span>
      </div>
    </div>
  );
}
