"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";

export default function ChangePasswordPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(pass !== confirm) return toast.error("Las contraseñas no coinciden");
    if(pass.length < 6) return toast.error("Mínimo 6 caracteres");
    
    setLoading(true);
    
    try {
        // 1. PETICIÓN AL SERVIDOR (DB)
        const res = await fetch("/api/auth/change-password", {
            method: "POST",
            body: JSON.stringify({ userId: session?.user?.id, newPassword: pass })
        });
        
        if(res.ok) {
            toast.success("Contraseña actualizada. Ingresando...");
            
            // 2. ACTUALIZAR SESIÓN LOCAL
            await update({ mustChangePassword: false }); 
            
            // 3. *** TRUCO DEL ALMENDRUCO ***
            // Forzamos recarga completa para limpiar caché vieja de NextAuth.
            // No usamos router.push, usamos el navegador nativo.
            window.location.href = "/dashboard"; 
        } else {
            toast.error("Error al actualizar en servidor");
            setLoading(false);
        }
    } catch (error) {
        toast.error("Error de conexión");
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-red-600"/>
            </div>
            <h1 className="text-2xl font-black text-slate-800 mb-2">Seguridad Requerida</h1>
            <p className="text-slate-500 mb-6 text-sm">Por políticas de seguridad financiera y académica, debe cambiar su contraseña temporal antes de continuar.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="password" 
                    placeholder="Nueva Contraseña" 
                    className="input input-bordered w-full" 
                    onChange={e=>setPass(e.target.value)} 
                    required minLength={6}
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    className="input input-bordered w-full" 
                    onChange={e=>setConfirm(e.target.value)} 
                    required minLength={6}
                />
                <button disabled={loading} className="btn btn-error w-full text-white shadow-lg">
                    {loading ? <><Loader2 className="animate-spin"/> Actualizando...</> : <><ShieldCheck className="w-4"/> Establecer Contraseña</>}
                </button>
            </form>
        </div>
    </div>
  );
}