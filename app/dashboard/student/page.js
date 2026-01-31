import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getStudentProgress, getStudentResources } from "@/actions/student-actions";
import { Trophy, Book, Zap, FileText, Video, Link as LinkIcon, Star } from "lucide-react";

export const metadata = {
    title: "Mi Progreso | AulaPlan Estudiante",
    description: "Tu ecosistema de aprendizaje",
};

export default async function StudentPage() {
    const session = await auth();
    if (!session?.user) redirect("/auth/login");

    // Fetch Data
    const progressData = await getStudentProgress();
    const resources = await getStudentResources();

    const { percent, level, points } = progressData;

    return (
        <div className="pb-20 bg-slate-100 min-h-screen font-sans">

            {/* 1. HERO SECTION (Gamification) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-b-[30px] shadow-lg mb-6">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Hola, {session.user.name.split(' ')[0]}</h1>
                        <p className="text-blue-200 text-sm">Estudiante MEP</p>
                    </div>
                    <div className="avatar placeholder">
                        <div className="bg-white/20 text-white rounded-full w-10">
                            <span className="text-lg">🎓</span>
                        </div>
                    </div>
                </header>

                {/* Progress Bar & Level */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <span className="text-xs uppercase text-blue-200 tracking-wider">Nivel Actual</span>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                <span className="text-xl font-bold">{level}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-yellow-400">{points}</span>
                            <span className="text-xs text-blue-200 block">XP Totales</span>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-yellow-400 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-blue-200">
                        <span>Progreso Anual</span>
                        <span>{percent}% Completado</span>
                    </div>
                </div>
            </div>

            {/* 2. ACTIONS GRID */}
            <div className="px-6 mb-8">
                <h2 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> Acciones Rápidas
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform text-center">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Mis Notas</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform text-center">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Logros</span>
                    </div>
                </div>
            </div>

            {/* 3. RESOURCE FEED */}
            <div className="px-6">
                <h2 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                    <Book className="w-5 h-5 text-pink-500" /> Material de Clase
                </h2>

                <div className="space-y-4">
                    {resources.length > 0 ? (
                        resources.map((res, idx) => (
                            <a
                                key={idx}
                                href={res.url}
                                className="block bg-white p-4 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-pink-500 rounded-l-2xl"></div>
                                <div className="flex items-start gap-3 pl-2">
                                    <div className="mt-1">
                                        {res.type === 'video' && <Video className="w-5 h-5 text-slate-400" />}
                                        {res.type === 'link' && <LinkIcon className="w-5 h-5 text-slate-400" />}
                                        {(res.type === 'document' || !res.type) && <FileText className="w-5 h-5 text-slate-400" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 leading-tight mb-1">{res.title}</h3>
                                        <p className="text-xs text-slate-400">{new Date(res.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-400 text-sm">No hay materiales nuevos esta semana.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
