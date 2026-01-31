import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDirectorStats, getComplianceReport } from "@/actions/director-actions";
import Link from "next/link";
import {
    BarChart3,
    Users,
    FileCheck,
    AlertTriangle,
    Download,
    Search,
    Filter
} from "lucide-react";

export const metadata = {
    title: "Panel del Director | AulaPlan",
    description: "Monitoreo y control institucional",
};

export default async function DirectorPage({ searchParams }) {
    const session = await auth();

    // 1. Security Gate
    if (!session?.user || (session.user.role !== "DIRECTOR" && session.user.role !== "GOD_TIER")) {
        redirect("/dashboard");
    }

    // 2. Fetch Data (Parallel)
    const statsData = getDirectorStats();
    // Parse search params for filters
    const subjectFilter = searchParams?.subject || "";
    const levelFilter = searchParams?.level || "";

    const reportData = getComplianceReport(subjectFilter, levelFilter);

    const [stats, report] = await Promise.all([statsData, reportData]);

    // 3. UI Helpers
    const { totalPlans, activeTeachersCount, subjectStats } = stats;
    // Simple "Compliance Score" mockup (planes / 10 * docentes)
    const complianceScore = Math.min(100, Math.round((totalPlans / (activeTeachersCount * 5 || 1)) * 100));

    return (
        <div className="p-6 space-y-8 bg-slate-50 min-h-screen text-slate-900">

            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <span className="text-4xl">👁️</span> El Ojo del Director
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Resumen operativo: {session.user.schoolId ? `Institución ${session.user.schoolId}` : "Vista Global (God Tier)"}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Este botón podría ser un Client Component que invoque la acción de descarga */}
                    <form action="/api/director/export" method="POST">
                        <button type="submit" disabled className="btn btn-neutral btn-sm opacity-50 cursor-not-allowed" title="Próximamente">
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Todo (ZIP)
                        </button>
                    </form>
                </div>
            </header>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    title="Total Planes"
                    value={totalPlans}
                    icon={<FileCheck className="w-8 h-8 text-blue-600" />}
                    trend="+12% este mes"
                />
                <KpiCard
                    title="Docentes Activos"
                    value={activeTeachersCount}
                    icon={<Users className="w-8 h-8 text-emerald-600" />}
                    sub="en plataforma"
                />
                <KpiCard
                    title="Índice Cumplimiento"
                    value={`${complianceScore}%`}
                    icon={<BarChart3 className="w-8 h-8 text-violet-600" />}
                    sub="Estimado global"
                />
                <KpiCard
                    title="Alertas Críticas"
                    value="0"
                    icon={<AlertTriangle className="w-8 h-8 text-rose-600" />}
                    sub="Acción requerida"
                    alert
                />
            </div>

            {/* MAIN CONTENT SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: COMPLIANCE TABLE (2/3 width) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Filter className="w-5 h-5 text-slate-400" /> Auditoría de Entregas
                        </h2>
                        {/* Simple filters link generator mockup */}
                        <div className="join">
                            <Link href="/dashboard/director" className={`join-item btn btn-xs ${!subjectFilter ? 'btn-active' : ''}`}>Todos</Link>
                            <Link href="/dashboard/director?subject=Matemáticas" className={`join-item btn btn-xs ${subjectFilter === 'Matemáticas' ? 'btn-active' : ''}`}>Mate</Link>
                            <Link href="/dashboard/director?subject=Español" className={`join-item btn btn-xs ${subjectFilter === 'Español' ? 'btn-active' : ''}`}>Español</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="table table-sm w-full">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th>Estatus</th>
                                        <th>Docente</th>
                                        <th>Asignatura</th>
                                        <th>Nivel</th>
                                        <th>Última Mod.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.length > 0 ? (
                                        report.map((plan) => (
                                            <tr key={plan.id} className="hover:bg-slate-50">
                                                <td>
                                                    <div className={`badge badge-xs ${plan.status === 'PUBLISHED' ? 'badge-success' : 'badge-warning'}`}>
                                                        {plan.status === 'PUBLISHED' ? 'ENTREGADO' : plan.status}
                                                    </div>
                                                </td>
                                                <td className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span>{plan.teacherName}</span>
                                                        <span className="text-[10px] text-slate-400">{plan.teacherEmail}</span>
                                                    </div>
                                                </td>
                                                <td>{plan.subject}</td>
                                                <td>{plan.level}</td>
                                                <td className="text-slate-400 text-xs">
                                                    {new Date(plan.lastModified).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-8 text-slate-400">
                                                No se encontraron registros con los filtros actuales.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* RIGHT: DEPARTMENT STATS (1/3 width) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Desglose por Dept.</h2>
                    <div className="bg-white rounded-lg border shadow-sm p-4 space-y-4">
                        {subjectStats.map((stat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{stat.subject}</span>
                                    <span className="text-slate-500">{stat.count} planes</span>
                                </div>
                                <progress
                                    className="progress progress-primary w-full h-2"
                                    value={stat.count}
                                    max={totalPlans > 0 ? totalPlans : 100}
                                ></progress>
                            </div>
                        ))}
                        {subjectStats.length === 0 && (
                            <p className="text-sm text-slate-400 text-center">Sin datos registrados.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, icon, sub, trend, alert }) {
    return (
        <div className={`p-4 rounded-xl border bg-white shadow-sm flex items-start justify-between ${alert ? 'border-rose-100 bg-rose-50/30' : 'border-slate-100'}`}>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold mt-1 text-slate-800">{value}</h3>
                {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
                {trend && <p className="text-xs text-emerald-600 font-medium mt-1">{trend}</p>}
            </div>
            <div className={`p-2 rounded-lg ${alert ? 'bg-rose-100' : 'bg-slate-100'} bg-opacity-50`}>
                {icon}
            </div>
        </div>
    );
}
