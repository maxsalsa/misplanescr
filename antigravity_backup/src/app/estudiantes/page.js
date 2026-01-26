import { prisma } from '@/lib/prisma';
import { User, Plus, Search } from 'lucide-react';
import Link from 'next/link';

async function getStudents() {
  try {
    return await prisma.student.findMany({ include: { courses: true } });
  } catch { return []; }
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mis Estudiantes</h1>
          <p className="text-slate-600 font-medium">Gestión de matrícula y perfiles DUA</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} /> Nuevo Estudiante
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="bg-white p-4 rounded-lg border-2 border-slate-200 shadow-sm flex gap-2">
        <Search className="text-slate-400 my-auto" />
        <input type="text" placeholder="Buscar por nombre o cédula..." className="w-full outline-none text-slate-700 font-medium" />
      </div>

      {/* TABLA DE ESTUDIANTES */}
      <div className="card overflow-hidden p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-slate-200">
              <th className="p-4 font-bold text-slate-700">Nombre</th>
              <th className="p-4 font-bold text-slate-700">Perfil de Aprendizaje / DUA</th>
              <th className="p-4 font-bold text-slate-700 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr><td colSpan="3" className="p-8 text-center text-slate-500">No hay estudiantes registrados.</td></tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    {student.name}
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {student.learningProfile ? (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold border border-orange-200">
                        {student.learningProfile}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">Sin adecuación registrada</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 font-bold hover:underline">Editar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link href="/" className="btn-secondary inline-flex">
          ← Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}
