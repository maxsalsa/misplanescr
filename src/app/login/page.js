"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, LogIn, ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react'; // V48 Real Auth
import { toast } from 'sonner';

export default function LoginPage() {
    // const { login } = useAuth(); // MOCK CONTEXT DISABLED
    const router = useRouter();
    const [role, setRole] = useState('teacher');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('⚡ [V48] Attempting Real Login for:', email);

        try {
            // 1. Call NextAuth Backend
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false, // Handle client-side to show generic error or success
            });

            console.log('⚡ [V48] Login Result:', result);

            if (result?.error) {
                toast.error('Credenciales inválidas. Verifique consola.');
                console.error('Login Failed:', result.error);
                setLoading(false);
            } else {
                toast.success('¡Bienvenido! Redirigiendo...');
                // 2. Force hard reload to ensure Context picks up changes if we don't fix context immediately
                // router.push('/dashboard'); 
                window.location.href = '/dashboard/generator';
            }
        } catch (err) {
            console.error('Login Exception:', err);
            toast.error('Error de conexión.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/30">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Inicia sesión en AulaPlan
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Selecciona tu perfil para ingresar
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">

                    {/* Role Selector */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`p-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-1 ${role === 'student' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
                        >
                            <span className="text-xl">🎓</span> Estudiante
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('teacher')}
                            className={`p-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-1 ${role === 'teacher' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
                        >
                            <span className="text-xl">👩‍🏫</span> Docente
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('family')}
                            className={`p-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center gap-1 ${role === 'family' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
                        >
                            <span className="text-xl">👪</span> Familia
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Form fields remain same essentially, just context changed by role */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                {role === 'family' ? 'DNI / Identificación' : 'Correo Electrónico'}
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type={role === 'teacher' ? "email" : "text"}
                                    autoComplete="username"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input input-bordered w-full bg-slate-50 focus:bg-white transition-colors"
                                    placeholder={role === 'teacher' ? "profe@mep.go.cr" : role === 'student' ? "juanito123" : "101110111"}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input input-bordered w-full bg-slate-50 focus:bg-white transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="loading loading-dots loading-sm"></span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Ingresar como {role === 'teacher' ? 'Docente' : role === 'student' ? 'Estudiante' : 'Familiar'} <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
