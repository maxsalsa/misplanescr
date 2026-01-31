import React from 'react';
import { BarChart2, PieChart, Activity } from 'lucide-react';

export default function DataGraph({ dataPoints = [10, 45, 30, 60, 55, 20], label = "Resultados Experimentales" }) {
    // Simple SVG Graph
    const max = Math.max(...dataPoints);
    const height = 60;

    return (
        <div className="card bg-white border border-blue-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Activity size={16} /> {label}
            </div>
            <div className="flex items-end gap-2 h-20 border-b border-l border-slate-300 pb-1 pl-1">
                {dataPoints.map((val, idx) => (
                    <div
                        key={idx}
                        className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-all relative group"
                        style={{ height: `${(val / max) * 100}%` }}
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {val}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>Exp 1</span>
                <span>Exp 6</span>
            </div>
        </div>
    );
}
