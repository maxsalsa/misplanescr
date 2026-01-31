"use client";
import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function RubricBuilder({ onChange }) {
  const [criteria, setCriteria] = useState([
    { id: 1, name: "", points: 5, description: "" }
  ]);

  const addCriterion = () => {
    setCriteria([...criteria, { id: Date.now(), name: "", points: 5, description: "" }]);
  };

  const removeCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id, field, value) => {
    const newCriteria = criteria.map(c => c.id === id ? { ...c, [field]: value } : c);
    setCriteria(newCriteria);
    if(onChange) onChange(newCriteria);
  };

  const totalPoints = criteria.reduce((sum, c) => sum + parseInt(c.points || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end border-b border-slate-200 pb-2">
         <h4 className="font-bold text-slate-700">Diseño de Rúbrica</h4>
         <span className="badge badge-primary font-bold">Total: {totalPoints} pts</span>
      </div>

      <div className="space-y-3">
        {criteria.map((c, index) => (
          <div key={c.id} className="flex gap-3 items-start bg-slate-50 p-3 rounded-lg border border-slate-200 group">
             <GripVertical className="text-slate-300 mt-3 cursor-move"/>
             <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                   <input 
                     type="text" 
                     placeholder={`Criterio #${index + 1} (Ej: Ortografía)`}
                     className="input input-sm input-bordered w-full bg-white"
                     value={c.name}
                     onChange={(e) => updateCriterion(c.id, "name", e.target.value)}
                   />
                   <input 
                     type="number" 
                     className="input input-sm input-bordered w-20 text-center bg-white"
                     value={c.points}
                     onChange={(e) => updateCriterion(c.id, "points", e.target.value)}
                   />
                </div>
                <textarea 
                   placeholder="Descripción del nivel esperado..."
                   className="textarea textarea-bordered textarea-xs w-full bg-white h-10 min-h-0"
                   value={c.description}
                   onChange={(e) => updateCriterion(c.id, "description", e.target.value)}
                ></textarea>
             </div>
             <button onClick={() => removeCriterion(c.id)} className="btn btn-ghost btn-sm text-slate-400 hover:text-red-500 mt-1"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>

      <button onClick={addCriterion} type="button" className="btn btn-sm btn-outline w-full border-dashed border-slate-300 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300">
         <Plus size={14}/> Agregar Criterio
      </button>
    </div>
  );
}