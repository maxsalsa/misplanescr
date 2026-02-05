export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyChildren, getStudentLog } from "@/actions/family-actions";
import { User, BookOpen, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Portal Familia | AulaPlan",
  description: "Conexión Hogar-Escuela",
};

export default async function FamilyPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const children = await getMyChildren();

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen text-slate-900">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            🏠 Portal de la Familia
          </h1>
          <p className="text-slate-500 mt-1">
            Bienvenido, {session.user.name}. Aquí está el progreso de sus hijos.
          </p>
        </div>
        {/* Botón de Soporte - WhatsApp */}
        <a
          href="https://wa.me/50688888888?text=Hola,%20necesito%20ayuda%20con%20AulaPlan"
          target="_blank"
          className="btn btn-success text-white gap-2 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" /> Soporte Directo
        </a>
      </header>

      {children.length === 0 ? (
        <div className="alert alert-info">
          <User className="w-5 h-5" />
          <span>
            No tiene estudiantes vinculados a su cuenta. Contacte al director.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {children.map(async (child) => {
            const logs = await getStudentLog(child.id);

            return (
              <div
                key={child.id}
                className="card bg-white shadow-sm border border-slate-200"
              >
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-12 text-xl font-bold">
                        {child.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title">{child.name}</h2>
                      <p className="text-sm text-slate-500">
                        Grupo: {child.group?.name} • Docente:{" "}
                        {child.group?.user?.name || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="divider">Bitácora de Clases</div>

                  {logs.length > 0 ? (
                    <div className="space-y-3">
                      {logs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <BookOpen className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                          <div>
                            <h3 className="font-semibold text-sm text-slate-900">
                              {log.title}
                            </h3>
                            <p className="text-xs text-slate-500 uppercase font-bold">
                              {log.subject}
                            </p>
                            <p className="text-xs text-slate-400">
                              Publicado el{" "}
                              {new Date(log.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-sm">
                      No hay actividad reciente registrada.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
