"use client";
import { useState } from "react";
import {
  addStudent,
  deleteStudent,
  toggleStudentFlag,
} from "@/app/actions/management";
import { toast } from "sonner";
import { Plus, Trash2, GraduationCap, Brain, Activity } from "lucide-react";

export default function StudentTable({ students, sectionId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleToggle = async (id, field, currentVal) => {
    const newVal = !currentVal;
    const res = await toggleStudentFlag(id, field, newVal);
    if (res.error) toast.error("Error al actualizar");
    else toast.success("Expediente actualizado");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-700">Nómina Estudiantil</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-sm btn-primary"
        >
          <Plus size={16} /> Agregar Estudiante
        </button>
      </div>

      {isAdding && (
        <form
          action={async (formData) => {
            const res = await addStudent(null, formData);
            if (res.error) toast.error(res.error);
            else {
              toast.success(res.message);
              setIsAdding(false);
            }
          }}
          className="mb-6 p-4 bg-slate-50 rounded-lg border border-blue-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-in fade-in"
        >
          <input type="hidden" name="sectionId" value={sectionId} />
          <div className="md:col-span-2">
            <label className="label text-xs">Nombre Completo</label>
            <input
              name="name"
              className="input input-sm input-bordered w-full bg-white"
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          <div>
            <label className="label text-xs">Cédula (Opcional)</label>
            <input
              name="cedula"
              className="input input-sm input-bordered w-full bg-white"
              placeholder="1-1234-5678"
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary w-full">Guardar</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th className="text-center">Ley 7600</th>
              <th className="text-center">Alta Dotación</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-slate-400 py-8">
                  No hay estudiantes matriculados.
                </td>
              </tr>
            )}
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td>
                  <div className="font-bold text-slate-800">{student.name}</div>
                  <div className="text-xs text-slate-400">
                    {student.cedula || "S/C"}
                  </div>
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-warning toggle-sm"
                    defaultChecked={student.has7600}
                    onChange={() =>
                      handleToggle(student.id, "has7600", student.has7600)
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-info toggle-sm"
                    defaultChecked={student.isGifted}
                    onChange={() =>
                      handleToggle(student.id, "isGifted", student.isGifted)
                    }
                  />
                </td>
                <td className="text-right">
                  <button
                    onClick={async () => {
                      if (confirm("¿Eliminar estudiante?")) {
                        await deleteStudent(student.id, sectionId);
                        toast.success("Eliminado");
                      }
                    }}
                    className="btn btn-ghost btn-xs text-red-400 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
