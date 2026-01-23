"use client";
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, UserPlus, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        // Simulator Register -> Auto Login
        setTimeout(() => {
            login(formData.email, formData.name);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center mb-6 text-slate-400 hover:text-indigo-600 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-1" /> Volver al Inicio
                </Link>
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Crea tu cuenta docente
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    ¿Ya tienes cuenta? <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Inicia sesión</Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                            <input name="name" type="text" required className="mt-1 input input-bordered w-full bg-slate-50" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Correo MEP / Personal</label>
                            <input name="email" type="email" required className="mt-1 input input-bordered w-full bg-slate-50" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                            <input name="password" type="password" required className="mt-1 input input-bordered w-full bg-slate-50" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Confirmar Contraseña</label>
                            <input name="confirmPassword" type="password" required className="mt-1 input input-bordered w-full bg-slate-50" onChange={handleChange} />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                            >
                                {loading ? "Creando cuenta..." : "Registrarme Gratis"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
