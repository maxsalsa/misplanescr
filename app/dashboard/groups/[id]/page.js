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
    include: { students: { orderBy: { name: "asc" } } },
  });

  if (!section || section.teacherId !== session.user.id) notFound();

  const total = section.students.length;
  const adecuaciones = section.students.filter((s) => s.has7600).length;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">{section.name}</h1>
          <div className="flex gap-4 mt-2 text-sm font-medium">
            <span className="text-slate-500">Nivel: {section.level}</span>
            <span className="flex items-center gap-1 text-blue-600">
              <Users size={16} /> Total: {total}
            </span>
            {adecuaciones > 0 && (
              <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 rounded-full">
                <ShieldAlert size={16} /> Adecuaciones: {adecuaciones}
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
