"use client";
import React, { useState } from "react";
import { Plus, Trash2, CheckSquare, Save } from "lucide-react";

export default function ChecklistBuilder({ initialData, title = "Lista de Cotejo" }) {
    const [items, setItems] = useState(initialData || []);

    const addItem = () => {
        setItems([...items, { criteria: "", completed: false }]);
    };

    const updateItem = (index, val) => {
        const newItems = [...items];
        newItems[index].criteria = val;
        setItems(newItems);
    };

    const deleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden max-w-2xl mx-auto">
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <CheckSquare size={18} className="text-blue-600" /> {title}
                </h3>
                <span className="badge badge-sm badge-ghost text-xs">Binario (Sí/No)</span>
            </div>

            <div className="p-2">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-xs uppercase text-slate-400 border-b border-slate-100">
                            <th className="p-2 text-left">Criterio de Verificación</th>
                            <th className="p-2 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item, i) => (
                            <tr key={i} className="group">
                                <td className="p-2 flex items-center gap-3">
                                    <div className="w-4 h-4 rounded border border-slate-300 bg-slate-50 flex-shrink-0"></div>
                                    <input
                                        className="w-full bg-transparent border-none focus:ring-0 text-slate-700"
                                        placeholder="Ej: Utiliza guantes de seguridad..."
                                        value={item.criteria}
                                        onChange={(e) => updateItem(i, e.target.value)}
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    <button onClick={() => deleteItem(i)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addItem} className="mt-2 w-full py-2 border border-dashed border-slate-300 rounded text-slate-500 text-xs font-bold hover:bg-slate-50 hover:text-blue-600 transition-colors flex justify-center items-center gap-2">
                    <Plus size={14} /> AGREGAR ITEM
                </button>
            </div>
        </div>
    );
}
