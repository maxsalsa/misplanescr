"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ShieldAlert, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PasswordLock({ children }) {
  const { data: session, update } = useSession();
  const [pass, setPass] = useState("");
  const router = useRouter();

  if (!session?.user?.mustChangePassword) return <>{children}</>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/change-password", { method: "POST", body: JSON.stringify({ newPassword: pass }) });
    if (res.ok) { await update({ mustChangePassword: false }); router.refresh(); }
    else alert("Error al actualizar");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 p-8 text-center">
            <ShieldAlert className="w-16 h-16 text-error mx-auto mb-4"/>
            <h2 className="text-2xl font-black">Seguridad Requerida</h2>
            <p className="mb-4 text-sm">Estás usando una clave temporal. Define una privada.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="password" className="input input-bordered w-full" placeholder="Nueva Contraseña" value={pass} onChange={e=>setPass(e.target.value)} required minLength={6}/>
                <button className="btn btn-primary w-full">Actualizar y Entrar</button>
            </form>
        </div>
    </div>
  );
}