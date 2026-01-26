"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner"; // Feedback elegante

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;
        const toastId = toast.loading("Verificando credenciales en Neon DB...");

        try {
            // Usamos el signIn de NextAuth en lugar de fetch manual
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                toast.error("Acceso denegado: Credenciales inválidas", { id: toastId });
                setLoading(false);
            } else {
                toast.success(`Bienvenido al Núcleo`, { id: toastId });
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            toast.error("Error crítico de conexión", { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 font-sans relative overflow-hidden">
            {/* Fondo Decorativo */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20 pointer-events-none"></div>

            <div className="card w-full max-w-md bg-base-100 shadow-2xl border-t-4 border-primary z-10 animate-in fade-in zoom-in duration-300">
                <div className="card-body items-center text-center p-8">

                    <div className="mb-4 relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-40"></div>
                        <div className="relative bg-base-100 p-4 rounded-full ring-1 ring-base-200">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-black tracking-tight text-base-content">
                        AulaPlan <span className="text-primary">Access</span>
                    </h2>
                    <p className="text-sm text-base-content/60 font-medium mb-6">
                        Credenciales de Seguridad Requeridas
                    </p>

                    <form onSubmit={handleLogin} className="w-full space-y-4 text-left">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-xs uppercase tracking-wide">Correo Institucional</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-4 w-4 text-base-content/40" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="usuario@mep.go.cr"
                                    className="input input-bordered w-full pl-10 focus:input-primary bg-base-200/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-xs uppercase tracking-wide">Llave de Acceso</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-base-content/40" />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-10 focus:input-primary bg-base-200/50"
                                    required
                                />
                            </div>
                            <label className="label justify-end">
                                <a href="#" className="label-text-alt link link-hover text-primary font-medium">¿Olvidaste tu contraseña?</a>
                            </label>
                        </div>

                        <button className="btn btn-primary w-full mt-4 gap-2 shadow-lg shadow-primary/20" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión Segura"}
                        </button>
                    </form>

                    <div className="mt-6 text-xs text-base-content/40 font-mono">
                        ANTIGRAVITY SECURE GATEWAY v4.0
                    </div>
                </div>
            </div>
        </div>
    );
}
