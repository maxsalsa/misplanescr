"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PLANS_CONFIG } from '@/lib/plans';
import { useAuth } from '@/context/auth-context';
import { Loader2, UploadCloud, CheckCircle2, Copy } from 'lucide-react';

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, upgradePlan } = useAuth();

    const planId = searchParams.get('plan');
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (planId && PLANS_CONFIG[planId.toUpperCase()]) {
            setPlan(PLANS_CONFIG[planId.toUpperCase()]);
        } else {
            // Fallback or error
            setPlan(PLANS_CONFIG.MONTHLY);
        }
        setLoading(false);
    }, [planId]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Could show a toast here
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);

        // Simulate API call and validation delay
        setTimeout(() => {
            upgradePlan(plan.id);
            setUploading(false);
            setSuccess(true);

            // Redirect after showing success
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        }, 2000);
    };

    if (loading || !plan) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">¡Pago Recibido!</h2>
                    <p className="text-slate-500">
                        Tu suscripción al <strong>{plan.name}</strong> ha sido activada exitosamente.
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="w-full btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                        >
                            Ir al Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 text-center mb-8">
                    Finalizar Compra
                </h1>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
                    <div className="md:flex">
                        {/* Order Summary */}
                        <div className="p-8 md:w-1/2 bg-slate-50 border-r border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Resumen de tu pedido</h3>
                            <div className="flex items-center justify-between py-4 border-b border-slate-200">
                                <span className="text-slate-600">{plan.name}</span>
                                <span className="font-medium text-slate-900">₡{plan.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className="font-bold text-lg text-slate-900">Total a Pagar</span>
                                <span className="font-bold text-2xl text-indigo-600">₡{plan.price.toLocaleString()}</span>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-medium text-slate-900 mb-2">Instrucciones de Pago:</h4>
                                <div className="prose prose-sm text-slate-500">
                                    <p>Por favor realiza una transferencia o SINPE Móvil por el monto exacto a:</p>
                                </div>

                                <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-sm font-medium text-slate-500">SINPE Móvil</span>
                                        <div className="flex items-center text-slate-900 font-mono font-bold">
                                            8888-8888
                                            <button onClick={() => handleCopy('88888888')} className="ml-2 text-indigo-600 hover:text-indigo-800 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center group">
                                        <span className="text-sm font-medium text-slate-500">IBAN (BNCR)</span>
                                        <div className="flex items-center text-slate-900 font-mono font-bold text-xs truncate ml-2">
                                            CR00010000000000000000
                                            <button onClick={() => handleCopy('CR00010000000000000000')} className="ml-2 text-indigo-600 hover:text-indigo-800 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-500">Titular</span>
                                        <span className="text-slate-900 font-medium">Antigravity S.A.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upload Proof */}
                        <div className="p-8 md:w-1/2">
                            <h3 className="text-lg font-semibold text-slate-900 mb-6">Confirmar Pago</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={user?.name || ''}
                                        className="input input-bordered w-full bg-white text-slate-900"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Comprobante de Pago
                                    </label>
                                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${file ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-indigo-400'}`}>
                                        <div className="space-y-1 text-center">
                                            {!file ? (
                                                <>
                                                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                                                    <div className="flex text-sm text-slate-600 justify-center">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                            <span>Subir archivo</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf" required />
                                                        </label>
                                                        <p className="pl-1">o arrastrar aquí</p>
                                                    </div>
                                                    <p className="text-xs text-slate-500">PNG, JPG, PDF hasta 5MB</p>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <CheckCircle2 className="h-10 w-10 text-green-600 mb-2" />
                                                    <p className="text-sm text-slate-900 font-medium">{file.name}</p>
                                                    <button type="button" onClick={() => setFile(null)} className="text-xs text-red-500 hover:underline mt-1">Cambiar archivo</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={!file || uploading}
                                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all
                        ${!file || uploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                    `}
                                    >
                                        {uploading ? (
                                            <span className="flex items-center">
                                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                Validando...
                                            </span>
                                        ) : 'Enviar Comprobante y Activar'}
                                    </button>
                                    <p className="mt-4 text-xs text-center text-slate-500">
                                        Al confirmar, aceptas nuestros términos y condiciones.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button onClick={() => router.back()} className="text-sm text-slate-500 hover:text-slate-800">
                        Cancelar y volver
                    </button>
                </div>
            </div>
        </div>
    );
}
