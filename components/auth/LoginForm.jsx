"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, CheckSquare, Square, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Credenciales no válidas. Verifique su correo.");
        setLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) { setError("Error de conexión segura."); setLoading(false); }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 rounded-full">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
            </div>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800">AulaPlan Ultra</h2>
        <p className="mt-2 text-sm text-slate-500">Plataforma de Gestión Educativa MEP</p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
              placeholder="Correo Institucional" />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input type={showPass ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
              placeholder="Contraseña" />
            <button type="button" className="absolute right-3 top-3.5 p-1 rounded-md hover:bg-gray-100 transition" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center cursor-pointer select-none" onClick={() => setRemember(!remember)}>
            {remember ? <CheckSquare className="h-5 w-5 text-blue-600" /> : <Square className="h-5 w-5 text-gray-300" />}
            <span className="ml-2 text-gray-600 font-medium">Recordarme</span>
          </div>
          <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            ¿Olvidó su contraseña?
          </a>
        </div>

        {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center animate-pulse">
                <span className="mr-2">⚠️</span> {error}
            </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
          {loading ? "Autenticando..." : "Ingresar al Sistema"}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-xs text-gray-400">Sistema Auditado y Seguro &copy; 2026</p>
      </div>
    </div>
  );
}