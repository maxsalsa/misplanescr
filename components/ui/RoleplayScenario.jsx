import { Users, MessageCircle } from 'lucide-react';

export default function RoleplayScenario({ scenario, roleA, roleB }) {
    return (
        <div className="card bg-base-100 shadow-xl border-l-4 border-secondary my-4">
            <div className="card-body">
                <h3 className="flex items-center gap-2 text-lg font-bold text-secondary">
                    <Users size={20} />
                    Simulación: {scenario}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="badge badge-primary mb-2">Rol A</span>
                        <p className="text-sm italic">"{roleA}"</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="badge badge-accent mb-2 text-white">Rol B</span>
                        <p className="text-sm italic">"{roleB}"</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button className="btn btn-sm btn-outline gap-2">
                        <MessageCircle size={16} />
                        Evaluar Interacción (Speaking/Conducta)
                    </button>
                </div>
            </div>
        </div>
    )
}
