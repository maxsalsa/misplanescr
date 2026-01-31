# ==============================================================================
# 🚀 PROTOCOLO V20: GESTIÓN INTEGRAL (ACADEMIC & HR)
# AUTORIDAD: Antigravity Engine
# ==============================================================================

$ErrorActionPreference = "Stop"
Write-Host "INICIANDO DESPLIEGUE MODULAR V20 (FIXED)..." -ForegroundColor Cyan

# 1. CREAR DIRECTORIOS
$Dirs = @(
    "app/actions",
    "app/dashboard/groups/[id]",
    "app/dashboard/hr"
)

foreach ($d in $Dirs) {
    if (!(Test-Path $d)) {
        New-Item -ItemType Directory -Force -Path $d | Out-Null
        Write-Host "Directorio creado: $d" -ForegroundColor Green
    }
}

# 2. GENERAR 'app/actions/management.js'
$ManagementActions = '@
"use server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// --- SCHEMAS ---

const SectionSchema = z.object({
  name: z.string().min(1, "El nombre de la sección es requerido (Ej: 10-1)"),
  level: z.string().min(1, "El nivel es requerido"),
  year: z.number().default(2026),
});

const StudentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  cedula: z.string().optional(),
  sectionId: z.string(),
  has7600: z.boolean().default(false),
  isGifted: z.boolean().default(false),
  medicalNotes: z.string().optional(),
});

const RequestSchema = z.object({
  type: z.string().min(1, "Seleccione un tipo"),
  description: z.string().min(5, "Justifique la solicitud"),
  dateStart: z.string().transform((str) => new Date(str)),
  dateEnd: z.string().optional().transform((str) => str ? new Date(str) : null),
});

// --- ACTIONS: SECTIONS ---

export async function createSection(prevState, formData) {
  try {
    const session = await auth();
    if (!session) return { error: "No autorizado" };

    const data = {
      name: formData.get("name"),
      level: formData.get("level"),
      year: parseInt(formData.get("year") || "2026"),
    };

    const validated = SectionSchema.parse(data);

    await prisma.section.create({
      data: {
        ...validated,
        teacherId: session.user.id,
      },
    });

    revalidatePath("/dashboard/groups");
    return { success: true, message: "Sección creada exitosamente." };
  } catch (e) {
    if (e instanceof z.ZodError) return { error: e.errors[0].message };
    if (e.code === "P2002") return { error: "Ya existe una sección con ese nombre." };
    return { error: "Error al crear sección." };
  }
}

export async function deleteSection(id) {
    const session = await auth();
    if (!session) return { error: "No autorizado" };
    
    const section = await prisma.section.findUnique({ where: { id } });
    if (section.teacherId !== session.user.id) return { error: "Acceso denegado" };

    await prisma.section.delete({ where: { id } });
    revalidatePath("/dashboard/groups");
    return { success: true };
}

// --- ACTIONS: STUDENTS ---

export async function addStudent(prevState, formData) {
    try {
        const session = await auth();
        if (!session) return { error: "No autorizado" };

        const data = {
            name: formData.get("name"),
            cedula: formData.get("cedula"),
            sectionId: formData.get("sectionId"),
            has7600: formData.get("has7600") === "on",
            isGifted: formData.get("isGifted") === "on",
            medicalNotes: formData.get("medicalNotes"),
        };

        const validated = StudentSchema.parse(data);

        await prisma.student.create({ data: validated });
        revalidatePath(`/dashboard/groups/${data.sectionId}`);
        return { success: true, message: "Estudiante matriculado." };
    } catch (e) {
        console.error(e);
        return { error: "Error al matricular estudiante." };
    }
}

export async function toggleStudentFlag(studentId, field, value) {
    try {
        const session = await auth();
        if (!session) return { error: "User not found" };

        await prisma.student.update({
            where: { id: studentId },
            data: { [field]: value }
        });

        revalidatePath("/dashboard/groups/[id]"); 
        return { success: true };
    } catch (e) {
        return { error: "Error updating flag" };
    }
}

export async function deleteStudent(studentId, sectionId) {
     try {
        await prisma.student.delete({ where: { id: studentId } });
        revalidatePath(`/dashboard/groups/${sectionId}`);
        return { success: true };
     } catch(e) { return { error: "Error deleting" }; }
}

// --- ACTIONS: HR ---

export async function createHRRequest(prevState, formData) {
    try {
        const session = await auth();
        if (!session) return { error: "No autorizado" };

        const data = {
            type: formData.get("type"),
            description: formData.get("description"),
            dateStart: formData.get("dateStart"),
            dateEnd: formData.get("dateEnd"),
        };
        
        const validated = RequestSchema.parse(data);

        await prisma.administrativeRequest.create({
            data: {
                ...validated,
                userId: session.user.id
            }
        });

        revalidatePath("/dashboard/hr");
        return { success: true, message: "Solicitud enviada a Dirección." };
    } catch (e) {
        return { error: "Error al procesar solicitud." };
    }
}
'@
Set-Content -Path "app/actions/management.js" -Value $ManagementActions -Encoding UTF8
Write-Host "✅ Action Manager Generado." -ForegroundColor Green


# 3. GENERAR 'app/dashboard/groups/page.js'
$GroupsPage = '@
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";
import { Users, Plus, ChevronRight, School } from "lucide-react";
import CreateSectionClient from "./client-view"; 

export default async function GroupsPage() {
  const session = await auth();
  const sections = await prisma.section.findMany({
    where: { teacherId: session.user.id },
    include: { _count: { select: { students: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Mis Secciones</h1>
          <p className="text-slate-500">Gestión de matrícula y expedientes 2026</p>
        </div>
        
        <button className="btn btn-primary shadow-lg" onClick={() => document.getElementById('create_section_modal').showModal()}>
          <Plus size={20} /> Nueva Sección
        </button>
      </div>

      <CreateSectionClient />

      {sections.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
           <School size={48} className="mx-auto text-slate-300 mb-4" />
           <h3 className="text-xl font-bold text-slate-700">No tienes secciones activas</h3>
           <p className="text-slate-500 mb-6">Inicia el curso lectivo creando tu primer grupo.</p>
           <button className="btn btn-outline" onClick={() => document.getElementById('create_section_modal').showModal()}>
             Crear Sección
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <Link key={section.id} href={`/dashboard/groups/${section.id}`} className="card bg-white shadow-md hover:shadow-xl transition-all border border-slate-100 group">
              <div className="card-body">
                <div className="flex justify-between items-start">
                   <div>
                     <h2 className="card-title text-2xl font-black text-slate-800">{section.name}</h2>
                     <span className="badge badge-ghost mt-1">{section.level}</span>
                   </div>
                   <div className="p-2 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                     <ChevronRight size={24} />
                   </div>
                </div>
                
                <div className="divider my-4"></div>
                
                <div className="flex justify-between items-center text-slate-500 text-sm">
                   <div className="flex items-center gap-2">
                      <Users size={16} /> {section._count.students} Estudiantes
                   </div>
                   <span className="font-mono text-xs opacity-50">2026</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
'@
Set-Content -Path "app/dashboard/groups/page.js" -Value $GroupsPage -Encoding UTF8
Write-Host "✅ Groups Page (Server) Generado." -ForegroundColor Green


# 4. GENERAR 'app/dashboard/groups/client-view.js'
$GroupsClient = '@
"use client";
import { createSection } from "@/app/actions/management";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRef } from "react";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn btn-primary w-full">
      {pending ? <span className="loading loading-spinner"></span> : "Guardar Sección"}
    </button>
  );
}

export default function CreateSectionClient() {
  const modalRef = useRef(null);

  async function clientAction(formData) {
    const res = await createSection(null, formData);
    if (res?.error) {
       toast.error(res.error);
    } else {
       toast.success(res.message);
       if (modalRef.current) modalRef.current.close();
    }
  }

  return (
    <>
      <dialog id="create_section_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nueva Sección 2026</h3>
          <form action={clientAction} className="space-y-4">
            <div className="form-control">
               <label className="label">Nombre (Ej: 10-1)</label>
               <input name="name" className="input input-bordered" placeholder="10-1" required />
            </div>
            <div className="form-control">
               <label className="label">Nivel Académico</label>
               <select name="level" className="select select-bordered" required>
                 <option value="7">Sétimo</option>
                 <option value="8">Octavo</option>
                 <option value="9">Noveno</option>
                 <option value="10">Décimo</option>
                 <option value="11">Undécimo</option>
                 <option value="12">Duodécimo</option>
               </select>
            </div>
            <div className="modal-action">
               <SubmitBtn />
               <button type="button" className="btn" onClick={() => modalRef.current.close()}>Cancelar</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
           <button>close</button>
        </form>
      </dialog>
    </>
  );
}
'@
Set-Content -Path "app/dashboard/groups/client-view.js" -Value $GroupsClient -Encoding UTF8
Write-Host "✅ Client Modal Generado." -ForegroundColor Green


# 5. GENERAR 'app/dashboard/groups/[id]/page.js'
$SectionDetail = '@
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import StudentTable from "./student-table";
import { Users, ShieldAlert } from "lucide-react";

export default async function SectionDetailPage({ params }) {
  const session = await auth();
  const { id } = await params;
  
  const section = await prisma.section.findUnique({
    where: { id },
    include: { students: { orderBy: { name: "asc" } } }
  });

  if (!section || section.teacherId !== session.user.id) notFound();

  const total = section.students.length;
  const adecuaciones = section.students.filter(s => s.has7600).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">{section.name}</h1>
          <div className="flex gap-4 mt-2 text-sm font-medium">
             <span className="text-slate-500">Nivel: {section.level}</span>
             <span className="flex items-center gap-1 text-blue-600"><Users size={16}/> Total: {total}</span>
             {adecuaciones > 0 && (
                <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 rounded-full">
                    <ShieldAlert size={16}/> Adecuaciones: {adecuaciones}
                </span>
             )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <StudentTable students={section.students} sectionId={section.id} />
      </div>
    </div>
  );
}
'@
Set-Content -Path "app/dashboard/groups/[id]/page.js" -Value $SectionDetail -Encoding UTF8
Write-Host "✅ Section Detail (Server) Generado." -ForegroundColor Green


# 6. GENERAR 'app/dashboard/groups/[id]/student-table.js'
$StudentTable = '@
"use client";
import { useState } from "react";
import { addStudent, deleteStudent, toggleStudentFlag } from "@/app/actions/management";
import { toast } from "sonner";
import { Plus, Trash2, GraduationCap, Brain, Activity } from "lucide-react";

export default function StudentTable({ students, sectionId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleToggle = async (id, field, currentVal) => {
    const newVal = !currentVal;
    const res = await toggleStudentFlag(id, field, newVal);
    if(res.error) toast.error("Error al actualizar");
    else toast.success("Expediente actualizado");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
         <h3 className="font-bold text-slate-700">Nómina Estudiantil</h3>
         <button onClick={() => setIsAdding(!isAdding)} className="btn btn-sm btn-primary">
            <Plus size={16} /> Agregar Estudiante
         </button>
      </div>

      {isAdding && (
         <form action={async (formData) => {
             const res = await addStudent(null, formData);
             if(res.error) toast.error(res.error);
             else { toast.success(res.message); setIsAdding(false); }
         }} className="mb-6 p-4 bg-slate-50 rounded-lg border border-blue-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end animate-in fade-in">
             <input type="hidden" name="sectionId" value={sectionId} />
             <div className="md:col-span-2">
                 <label className="label text-xs">Nombre Completo</label>
                 <input name="name" className="input input-sm input-bordered w-full bg-white" placeholder="Ej: Juan Pérez" required />
             </div>
             <div>
                 <label className="label text-xs">Cédula (Opcional)</label>
                 <input name="cedula" className="input input-sm input-bordered w-full bg-white" placeholder="1-1234-5678" />
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
                <tr><td colSpan="4" className="text-center text-slate-400 py-8">No hay estudiantes matriculados.</td></tr>
            )}
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td>
                  <div className="font-bold text-slate-800">{student.name}</div>
                  <div className="text-xs text-slate-400">{student.cedula || "S/C"}</div>
                </td>
                <td className="text-center">
                   <input 
                     type="checkbox" 
                     className="toggle toggle-warning toggle-sm"
                     defaultChecked={student.has7600}
                     onChange={() => handleToggle(student.id, "has7600", student.has7600)}
                   />
                </td>
                <td className="text-center">
                   <input 
                     type="checkbox" 
                     className="toggle toggle-info toggle-sm" 
                     defaultChecked={student.isGifted}
                     onChange={() => handleToggle(student.id, "isGifted", student.isGifted)}
                   />
                </td>
                <td className="text-right">
                   <button 
                     onClick={async () => {
                        if(confirm("¿Eliminar estudiante?")) {
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
'@
Set-Content -Path "app/dashboard/groups/[id]/student-table.js" -Value $StudentTable -Encoding UTF8
Write-Host "✅ Student Table (Client) Generado." -ForegroundColor Green


# 7. GENERAR 'app/dashboard/hr/page.js'
$HRPage = '@
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { CalendarClock, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";
import ClientForm from "./form";

export default async function HRPage() {
  const session = await auth();
  const requests = await prisma.administrativeRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-1">
          <div className="card bg-white shadow-lg border border-slate-200">
             <div className="card-body">
                <h2 className="card-title text-slate-800 mb-4 flex gap-2">
                    <FileText className="text-blue-600"/> Nueva Solicitud
                </h2>
                <ClientForm />
             </div>
          </div>
       </div>

       <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex gap-2 items-center">
             <CalendarClock className="text-slate-500" /> Historial de Trámites
          </h2>
          
          {requests.length === 0 ? (
             <div className="alert bg-slate-50 border-slate-200">
                <Clock className="text-slate-400" />
                <span>No tienes solicitudes registradas. Tu historial aparecerá aquí.</span>
             </div>
          ) : (
            <div className="space-y-4">
              {requests.map(req => (
                 <div key={req.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 items-start">
                    <div className="mt-1">
                       {req.status === "APROBADO" && <CheckCircle2 className="text-emerald-500" />}
                       {req.status === "PENDIENTE" && <Clock className="text-amber-500" />}
                       {req.status === "RECHAZADO" && <XCircle className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between">
                          <h3 className="font-bold text-slate-800">{req.type}</h3>
                          <span className={`badge ${
                              req.status === "APROBADO" ? "badge-success text-white" : 
                              req.status === "PENDIENTE" ? "badge-warning text-white" : "badge-error text-white"
                          }`}>{req.status}</span>
                       </div>
                       <p className="text-sm text-slate-600 mt-1">{req.description}</p>
                       <p className="text-xs text-slate-400 mt-2 font-mono">
                          {new Date(req.dateStart).toLocaleDateString()} 
                          {req.dateEnd && ` -> ${new Date(req.dateEnd).toLocaleDateString()}`}
                       </p>
                    </div>
                 </div>
              ))}
            </div>
          )}
       </div>
    </div>
  );
}
'@
Set-Content -Path "app/dashboard/hr/page.js" -Value $HRPage -Encoding UTF8
Write-Host "✅ HR Page (Server) Generado." -ForegroundColor Green


# 8. GENERAR 'app/dashboard/hr/form.js'
$HRForm = '@
"use client";
import { createHRRequest } from "@/app/actions/management";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
    const { pending } = useFormStatus();
    return <button disabled={pending} className="btn btn-primary w-full">{pending ? "Enviando..." : "Radicar Solicitud"}</button>;
}

export default function ClientForm() {
    return (
        <form action={async (formData) => {
            const res = await createHRRequest(null, formData);
            if(res.error) toast.error(res.error);
            else { toast.success(res.message); }
        }} className="space-y-4">
            <div className="form-control">
                <label className="label text-xs uppercase font-bold text-slate-500">Tipo de Trámite</label>
                <select name="type" className="select select-bordered w-full" required>
                    <option value="">Seleccione...</option>
                    <option value="Cita Médica">Cita Médica (CCSS)</option>
                    <option value="Permiso con Goce">Permiso con Goce Salarial</option>
                    <option value="Licencia Sindical">Licencia Sindical</option>
                    <option value="Asuntos Personales">Asuntos Personales (Sin Goce)</option>
                </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                    <label className="label text-xs uppercase font-bold text-slate-500">Desde</label>
                    <input type="date" name="dateStart" className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label text-xs uppercase font-bold text-slate-500">Hasta (Opcional)</label>
                    <input type="date" name="dateEnd" className="input input-bordered w-full" />
                </div>
            </div>

            <div className="form-control">
                <label className="label text-xs uppercase font-bold text-slate-500">Justificación</label>
                <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Detalle el motivo..." required></textarea>
            </div>

            <SubmitBtn />
        </form>
    );
}
'@
Set-Content -Path "app/dashboard/hr/form.js" -Value $HRForm -Encoding UTF8
Write-Host "✅ HR Form (Client) Generado." -ForegroundColor Green

Write-Host "PROTOCOLO V20 EJECUTADO CON EXITO. MODULOS LISTOS." -ForegroundColor Cyan
