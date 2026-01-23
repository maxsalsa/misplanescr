"use client";

import { PLANS_CONFIG } from "@/lib/plans";
import { useAuth } from '@/context/auth-context';
import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Star, ShieldCheck, Zap } from "lucide-react";

export default function PricingPage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleSelectPlan = (planId) => {
        if (planId === 'demo') {
            router.push('/dashboard'); // Already have it or downgrading (not implemented)
        } else {
            router.push(`/payment?plan=${planId}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <button
                        onClick={() => router.back()}
                        className="absolute top-8 left-8 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver
                    </button>

                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Planes y Precios</h2>
                    <p className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Invierte en tu tranquilidad
                    </p>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-slate-500">
                        Deja que la IA haga el trabajo pesado. Elige el plan que mejor se adapte a tus necesidades docentes.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
                    {Object.values(PLANS_CONFIG).map((plan) => {
                        const isCurrent = user?.planId === plan.id;
                        const isPopular = plan.id === 'monthly';

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col rounded-2xl border-2 ${isPopular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'
                                    } ${plan.color} p-8 transition-all duration-200 hover:shadow-lg bg-white`}
                            >
                                {isPopular && (
                                    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-32 rounded-bl-xl rounded-tr-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-1.5 text-center text-xs font-bold uppercase text-white shadow-sm">
                                        Más Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900">{plan.name}</h3>
                                    <div className="mt-4 flex items-baseline text-slate-900">
                                        <span className="text-4xl font-extrabold tracking-tight">
                                            {plan.price === 0 ? 'Gratis' : `₡${plan.price.toLocaleString()}`}
                                        </span>
                                        {plan.price > 0 && <span className="ml-1 text-xl font-medium text-slate-500">/{plan.durationDays === 365 ? 'año' : 'mes'}</span>}
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {plan.durationDays} días de acceso completo
                                    </p>
                                </div>

                                <ul className="flex-1 space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <Check className="h-5 w-5 text-green-500" />
                                            </div>
                                            <p className="ml-3 text-sm text-slate-700">{feature}</p>
                                        </li>
                                    ))}

                                    {/* Visual limit indicators */}
                                    {plan.limits.aiStrategies === 'advanced' ? (
                                        <li className="flex items-start">
                                            <div className="flex-shrink-0"><Zap className="h-5 w-5 text-yellow-500" /></div>
                                            <p className="ml-3 text-sm font-semibold text-slate-800">IA Creativa & Avanzada</p>
                                        </li>
                                    ) : (
                                        <li className="flex items-start opacity-50">
                                            <div className="flex-shrink-0"><Zap className="h-5 w-5 text-slate-400" /></div>
                                            <p className="ml-3 text-sm text-slate-500">IA Limitada</p>
                                        </li>
                                    )}
                                </ul>

                                <button
                                    onClick={() => handleSelectPlan(plan.id)}
                                    disabled={isCurrent}
                                    className={`w-full rounded-xl px-6 py-3 text-center text-base font-bold shadow-sm transition-all duration-200
                    ${isCurrent
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                                            : isPopular
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-md transform hover:-translate-y-0.5'
                                                : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
                                        }
                  `}
                                >
                                    {isCurrent ? 'Tu Plan Actual' : 'Seleccionar Plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Trust signals */}
                <div className="mt-16 border-t border-slate-200 pt-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-slate-900">Pago Seguro</h4>
                            <p className="mt-2 text-sm text-slate-500">Aceptamos SINPE Móvil y transferencias bancarias directas.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                                <Star className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-slate-900">Calidad MEP</h4>
                            <p className="mt-2 text-sm text-slate-500">Formatos 100% alineados a las últimas circulares del MEP.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-medium text-slate-900">Activación Rápida</h4>
                            <p className="mt-2 text-sm text-slate-500">Tu plan se activa minutos después de validar el comprobante.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
