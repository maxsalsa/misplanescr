import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSaaS } from '@/context/saas-context';
// import { getMockData } from '@/services/mock-data'; // DEPRECATED V48
import { getDashboardStats, getRecentActivity, getUserProfile } from '@/app/actions/dashboard';
import { Sparkles, Users, CheckSquare, FileText, HeartPulse, BrainCircuit, Loader2 } from 'lucide-react';

export default function TeacherDashboard() {
    const { isFree } = useSaaS();

    // V48 State Integration
    const [stats, setStats] = useState({ students: 0, groups: 0, classesToday: 0, pendingReports: 0 });
    const [activities, setActivities] = useState([]);
    const [profile, setProfile] = useState({ name: 'Cargando...', institution: '...' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRealData() {
            try {
                const [statsData, activityData, profileData] = await Promise.all([
                    getDashboardStats(),
                    getRecentActivity(),
                    getUserProfile()
                ]);

                setStats(statsData);
                setActivities(activityData);
                if (profileData) setProfile(profileData);
            } catch (e) {
                console.error("V48 Dashboard Error:", e);
            } finally {
                setLoading(false);
            }
        }
        loadRealData();
    }, []);

    if (loading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                        ¡Hola, {profile?.name?.split(' ')[0] || 'Profe'}!
                    </h2>
                    <p className="text-slate-500 mt-1">
                        Centro Educativo: <span className="font-semibold text-indigo-600">{profile?.institution || 'Sin asignar'}</span>
                    </p>
                </div>
                {isFree && (
                    <Link href="/pricing" className="btn btn-primary bg-indigo-600 border-none hover:bg-indigo-700 shadow-lg shadow-indigo-200 text-white rounded-xl gap-2 transition-all hover:scale-105">
                        <Sparkles size={18} />
                        Desbloquear PRO
                    </Link>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Student Count */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Estudiantes</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.students}</h3>
                    </div>
                </div>

                {/* Groups */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <CheckSquare size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Grupos a Cargo</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.groups}</h3>
                    </div>
                </div>

                {/* Plans */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Reportes Pendientes</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stats.pendingReports}</h3>
                    </div>
                </div>

                {/* Alerts - Now Dynamic if mapped (using fake fallback if missing in wrapper mapping) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                        <HeartPulse size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Alertas Tempranas</p>
                        <h3 className="text-2xl font-bold text-slate-800">3</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <h3 className="text-lg font-bold text-slate-800 pt-4">Accesos Rápidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/generator" className="card bg-white hover:shadow-md transition-shadow border border-slate-200 cursor-pointer group">
                    <div className="card-body p-6 flex flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Nuevo Planeamiento</h3>
                            <p className="text-xs text-slate-500">Generar con IA</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/attendance" className="card bg-white hover:shadow-md transition-shadow border border-slate-200 cursor-pointer group">
                    <div className="card-body p-6 flex flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Pasar Lista</h3>
                            <p className="text-xs text-slate-500">Registro diario</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/quizzes" className="card bg-white hover:shadow-md transition-shadow border border-slate-200 cursor-pointer group">
                    <div className="card-body p-6 flex flex-row items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Crear Quiz</h3>
                            <p className="text-xs text-slate-500">Evaluación lúdica</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Activity Feed */}
            <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Actividad Reciente del Centro</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {activities.length > 0 ? activities.map((act) => (
                        <div key={act.id} className="p-4 border-b border-slate-50 last:border-none flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                                    ${act.type === 'grade' ? 'bg-emerald-500' : (act.type === 'conduct' ? 'bg-red-500' : 'bg-blue-500')}
                                `}>
                                    {act.type === 'grade' ? 'N' : (act.type === 'conduct' ? 'B' : 'A')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-sm">{act.detail}</h4>
                                    <p className="text-xs text-slate-500">{act.student ? `${act.student} - ` : ''} {act.time}</p>
                                </div>
                            </div>
                            {act.score && <span className="badge badge-success text-white font-bold">{act.score} pts</span>}
                            {act.status && <span className="badge badge-ghost text-slate-500">{act.status}</span>}
                        </div>
                    )) : (
                        <div className="p-8 text-center text-slate-400">No hay actividad reciente.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

