"use client";
import { useState, useRef } from "react";
import { createActivity, saveGradesBatch } from "@/app/actions/gradebook";
import { Plus, Save, Gamepad2, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function GradebookTab({ section }) {
  const [activities, setActivities] = useState(section.activities);
  const [editingGrade, setEditingGrade] = useState({}); // { `${studentId}-${activityId}`: score }
  const dialogRef = useRef(null);

  // Helper activity icon
  const getIcon = (type) => {
    if (type === "JUEGO")
      return <Gamepad2 size={16} className="text-purple-500" />;
    return <FileText size={16} className="text-blue-500" />;
  };

  // Handle Create Activity
  async function handleCreate(formData) {
    const res = await createActivity(null, formData);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Actividad Creada");
      dialogRef.current.close();
      // Optimistic update or router.refresh() handles it via prop update if server revalidates,
      // but explicit reload might be needed if using state. For now rely on server revalidation prop propagation.
    }
  }

  // Handle Grade Change
  const handleScoreChange = (studentId, activityId, score) => {
    setEditingGrade({ ...editingGrade, [`${studentId}-${activityId}`]: score });
  };

  // Handle Save (Per Activity Column usually, or Global)
  // Let's implement "Save Column" logic for efficiency
  const saveColumn = async (activityId) => {
    const updates = [];
    section.students.forEach((s) => {
      const key = `${s.id}-${activityId}`;
      if (key in editingGrade) {
        updates.push({
          studentId: s.id,
          score: parseFloat(editingGrade[key]),
          feedback: "",
        });
      }
    });

    if (updates.length === 0) return;

    const res = await saveGradesBatch(activityId, updates, section.id);
    if (res.success) toast.success("Notas guardadas");
    else toast.error("Error al guardar");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-700">
          Registro de Calificaciones
        </h2>
        <button
          className="btn btn-primary btn-sm gap-2"
          onClick={() => dialogRef.current.showModal()}
        >
          <Plus size={16} /> Nueva Actividad
        </button>
      </div>

      {/* GRADEBOOK GRID */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
        <table className="table">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="sticky left-0 bg-slate-50 z-10 w-48">
                Estudiantes
              </th>
              {activities.map((act) => (
                <th key={act.id} className="min-w-[120px] text-center group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-xs uppercase font-black">
                      {getIcon(act.type)} {act.type}
                    </div>
                    <span
                      className="text-[10px] font-normal text-slate-500 truncate max-w-[100px]"
                      title={act.title}
                    >
                      {act.title}
                    </span>
                    <div className="mt-1 badge badge-ghost badge-sm">
                      {act.percentage}%
                    </div>
                    <button
                      onClick={() => saveColumn(act.id)}
                      className="btn btn-xs btn-ghost text-emerald-600 mt-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Save size={12} /> Guardar
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="sticky left-0 bg-white font-medium text-slate-700 border-r border-slate-100">
                  {student.name}
                </td>
                {activities.map((act) => {
                  // Find existing grade
                  const gradeObj = act.grades.find(
                    (g) => g.studentId === student.id,
                  );
                  const key = `${student.id}-${act.id}`;
                  const currentVal =
                    key in editingGrade
                      ? editingGrade[key]
                      : (gradeObj?.score ?? "");

                  return (
                    <td key={act.id} className="p-1">
                      <input
                        type="number"
                        className={`input input-sm w-full text-center focus:bg-blue-50 transition-colors ${currentVal !== "" && parseFloat(currentVal) < 70 ? "text-red-600 font-bold bg-red-50" : "text-slate-800"}`}
                        placeholder="-"
                        min="0"
                        max={act.maxPoints + 20} // Allow bonus
                        value={currentVal}
                        onChange={(e) =>
                          handleScoreChange(student.id, act.id, e.target.value)
                        }
                        onBlur={() => saveColumn(act.id)} // Auto-save on blur? risky for batches, maybe specific cell
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nueva Actividad Evaluativa</h3>
          <form action={handleCreate} className="space-y-3">
            <input type="hidden" name="sectionId" value={section.id} />

            <div className="form-control">
              <label className="label">Título</label>
              <input
                name="title"
                className="input input-bordered"
                placeholder="Ej: Trivia Volcanes"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Tipo</label>
                <select name="type" className="select select-bordered">
                  <option value="COTIDIANO">Trabajo Cotidiano</option>
                  <option value="TAREA">Tarea</option>
                  <option value="PRUEBA">Prueba</option>
                  <option value="PROYECTO">Proyecto</option>
                  <option value="JUEGO">Juego / Trivia</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">Valor (%)</label>
                <input
                  name="percentage"
                  type="number"
                  className="input input-bordered"
                  placeholder="5"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Puntos Totales</label>
                <input
                  name="maxPoints"
                  type="number"
                  className="input input-bordered"
                  defaultValue="100"
                />
              </div>
              <div className="form-control">
                <label className="label">Fecha</label>
                <input
                  name="date"
                  type="date"
                  className="input input-bordered"
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">Indicador / Justificación</label>
              <textarea
                name="indicator"
                className="textarea textarea-bordered"
                placeholder="Habilidad evaluada..."
                required
              ></textarea>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary">Crear</button>
              <button
                type="button"
                className="btn"
                onClick={() => dialogRef.current.close()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
