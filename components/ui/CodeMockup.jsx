import { Terminal } from 'lucide-react';

export default function CodeMockup({ language = "python", code, title = "Script" }) {
    return (
        <div className="mockup-code bg-[#1e1e1e] text-white my-4 shadow-xl">
            <div className="flex items-center px-4 py-2 border-b border-white/10 bg-black/20">
                <Terminal size={14} className="text-green-400 mr-2" />
                <span className="text-xs uppercase font-mono tracking-widest text-slate-400">{title} • {language}</span>
            </div>
            <pre className="p-4">
                <code>{code || "# Waiting for input..."}</code>
            </pre>
        </div>
    )
}
