import { prisma } from "@/lib/db"; // Server Component
import { UserPlus, Search, Smile } from "lucide-react";

async function getStudents() {
  const user = await prisma.user.findUnique({
    where: { email: "max.salazar@mep.go.cr" },
    include: { students: true }
  });
  return user ? user.students : [];
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Expedientes Estudiantiles</h1>
          <p className="text-slate-500">Gestión de matrícula y adecuaciones curriculares.</p>
        </div>
        <button className="btn btn-institutional gap-2 shadow-lg">
          <UserPlus size={18} /> Nuevo Estudiante
        </button>
      </div>

      {students.length === 0 ? (
        // --- EMPTY STATE (ESTADO VACÍO) ---
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-200 text-center">
           <div className="p-4 bg-blue-50 text-blue-500 rounded-full mb-4">
             <Smile size={48} />
           </div>
           <h3 className="text-xl font-bold text-slate-700 mb-2">Su aula está vacía</h3>
           <p className="text-slate-500 max-w-sm mb-6">
             Agregue sus estudiantes para que la IA pueda detectar casos de Ley 7600 automáticamente.
           </p>
           <button className="btn btn-outline btn-primary">
             Matricular Primer Alumno
           </button>
        </div>
      ) : (
        // --- LISTA DE ESTUDIANTES ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="card-solemn p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="avatar placeholder">
                  <div className="bg-slate-200 text-slate-600 rounded-xl w-12">
                    <span className="text-lg font-bold">{student.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="badge badge-ghost font-mono">{student.section}</div>
              </div>
              
              <h3 className="font-bold text-lg text-slate-800">{student.name}</h3>
              
              {/* BANDERAS DE INCLUSIÓN */}
              <div className="mt-4 flex gap-2 flex-wrap">
                {student.has7600 && (
                  <span className="badge badge-warning gap-1 text-xs">
                    Ley 7600
                  </span>
                )}
                {student.isGifted && (
                  <span className="badge badge-info gap-1 text-xs">
                    Alta Dotación
                  </span>
                )}
                {!student.has7600 && !student.isGifted && (
                  <span className="text-xs text-slate-400 italic">Sin adecuaciones registradas</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}