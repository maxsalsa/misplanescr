import PublicNavbar from "@/components/layout/PublicNavbar";
import FooterLegal from "@/components/layout/FooterLegal";
import { CheckCircle, Zap, FileText, Lock } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicNavbar />
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in duration-700">
          <span className="badge bg-blue-900/50 text-blue-300 border-blue-800 p-3 font-bold mb-4">✨ Actualizado para Curso Lectivo 2026</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Planeamiento MEP <br/> <span className="text-blue-500">en Segundos.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            La única plataforma con Inteligencia Artificial Pedagógica que cumple estrictamente con la <strong>Circular DAJ-001</strong> y el formato oficial.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link href="/login" className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white border-none shadow-xl shadow-blue-900/50 px-10 rounded-2xl">
              Comenzar Ahora
            </Link>
            <Link href="#demo" className="btn btn-lg btn-outline text-white hover:bg-white hover:text-slate-900 rounded-2xl">
              Ver Demo en Video
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900">¿Por qué elegir MisPlanesCR?</h2>
          <p className="text-slate-500 mt-2">Diseñado por docentes, potenciado por ingeniería.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-amber-500" size={32}/>}
            title="Velocidad Extrema"
            desc="Genera indicadores, mediación y rúbricas en menos de 2 segundos. Olvídese de Word."
          />
          <FeatureCard 
            icon={<FileText className="text-blue-500" size={32}/>}
            title="Formato Oficial MEP"
            desc="Columnas exactas, Binomio Sagrado y Pautas DUA integradas automáticamente."
          />
          <FeatureCard 
            icon={<Lock className="text-emerald-500" size={32}/>}
            title="Seguridad Bancaria"
            desc="Sus datos y evaluaciones están protegidos con encriptación de grado industrial."
          />
        </div>
      </section>

      {/* CTA / PRICING */}
      <section id="precios" className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900 to-slate-800 rounded-3xl p-12 border border-blue-800 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 bg-blue-500 w-32 h-32 rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-4xl font-black mb-6">Plan ULTRA 2026</h2>
          <div className="text-5xl font-black text-blue-400 mb-2">₡5.000<span className="text-lg text-slate-400 font-normal">/mes</span></div>
          <p className="text-slate-300 mb-8">Acceso total a generación ilimitada, descargas PDF limpias y soporte prioritario.</p>
          
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 inline-block text-left mb-8">
            <p className="text-sm font-bold text-slate-400 uppercase mb-2">Método de Activación:</p>
            <div className="flex items-center gap-3 text-2xl font-mono font-bold text-emerald-400">
               <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
               SINPE MÓVIL: 6090-6359
            </div>
            <p className="text-xs text-slate-500 mt-2">A nombre de: Max Salazar Sánchez</p>
          </div>

          <div>
            <Link href="/login" className="btn btn-wide bg-white text-slate-900 hover:bg-slate-100 border-none font-bold">
              Ya realicé el SINPE
            </Link>
          </div>
        </div>
      </section>

      <FooterLegal />
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow hover:-translate-y-1 duration-300">
      <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}