"use client";

import Link from 'next/link';

export default function SuspendedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
            <div className="card w-96 bg-white shadow-xl border-t-8 border-indigo-500">
                <figure className="px-10 pt-10">
                    <div className="bg-indigo-100 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                </figure>
                <div className="card-body text-center">
                    <h2 className="card-title justify-center text-slate-800">Aula en Pausa</h2>
                    <p className="text-slate-500 text-sm mt-2">
                        El acceso a este grupo de AutoPlanea se encuentra temporalmente detenido.
                    </p>
                    <div className="my-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg">
                        <p className="font-semibold">Información para Estudiantes:</p>
                        "Por favor contacta a tu profesor guía para reactivar el acceso."
                    </div>
                    <div className="card-actions justify-center">
                        <Link href="/" className="btn btn-outline btn-sm">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
