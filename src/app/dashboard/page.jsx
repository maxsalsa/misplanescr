"use client";
import Link from 'next/link';
import { FileText, ClipboardList, Puzzle, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProfileWizard from '@/components/auth/ProfileWizard';

export default function DashboardPage() {
    const [showWizard, setShowWizard] = useState(false);

    useEffect(() => {
        // Check basic auth requirement
        const profileComplete = localStorage.getItem('MEP_PROFILE_COMPLETE');
        if (!profileComplete) setShowWizard(true);

        // 🔮 ORACLE TRIGGER (KAISEN 14.0)
        // Simulating the "7 days before" notice
        const timer = setTimeout(() => {
            import('sonner').then(({ toast }) => {
                toast.message("🔮 El Oráculo del MEP informa:", {
                    description: "Licenciado/a, he preparado el borrador del Examen Trimestral basado en sus últimos temas. ¿Desea revisarlo?",
                    action: {
                        label: "Ver Borrador",
                        onClick: () => console.log("Abriendo Borrador Predictivo...")
                    },
                    duration: 8000,
                    icon: '🎓'
                });
            });
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const cards = [
        {
            title: "Nuevo Planeamiento",
            desc: "Genere su Plan Anual o de Práctica Pedagógica en segundos con IA.",
            icon: <FileText size={48} />,
            color: "bg-green-600",
            link: "/dashboard/generator" // We'll make this next
        },
        {
            title: "Instrumentos",
            desc: "Rúbricas, Listas de Cotejo y Pruebas Cortas ajustadas al DUA.",
            icon: <ClipboardList size={48} />,
            color: "bg-blue-600",
            link: "/dashboard/instruments"
        },
        {
            title: "Recursos Didácticos",
            desc: "Material de apoyo, GTAs y Quizzes Gamificados para sus estudiantes.",
            icon: <Puzzle size={48} />,
            color: "bg-yellow-500",
            link: "/dashboard/resources"
        }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {showWizard && <ProfileWizard onComplete={() => setShowWizard(false)} />}

            <header className="mb-12">
                <h1 className="text-3xl font-black text-[#003366] mb-2">Centro de Mando</h1>
                <p className="text-slate-500 text-lg">¿Qué vamos a automatizar hoy, Profe?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card, idx) => (
                    <Link key={idx} href={card.link} className="group relative block h-full">
                        <div className={`absolute inset-0 rounded-2xl transform translate-y-2 translate-x-2 transition-transform group-hover:translate-y-4 group-hover:translate-x-4 opacity-20 ${card.color}`}></div>
                        <div className={`relative h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xl transition-transform group-hover:-translate-y-1 overflow-hidden`}>
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 shadow-md ${card.color}`}>
                                {card.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">{card.title}</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">{card.desc}</p>

                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                <PlusCircle className="text-slate-300" size={32} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* RECENT ACTIVITY MOCK */}
            <div className="mt-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-4 uppercase text-xs tracking-wider">Actividad Reciente</h3>
                <div className="text-center py-8 text-slate-400 text-sm italic">
                    Aún no ha generado documentos. ¡Inicie su primer planeamiento arriba!
                </div>
            </div>
        </div>
    );
}
