import { HelpCircle, Book, Shield, DollarSign } from "lucide-react";

export default function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Centro de Capacitación Docente</h1>
        <p className="text-slate-500">Documentación oficial para el uso eficiente de AulaPlan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* GUÍA 1: PEDAGOGÍA */}
        <div className="card-solemn p-6">
          <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-4">
            <Book size={20} /> El Binomio Sagrado
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Todo plan generado sigue la estructura activa exigida por el MEP:
          </p>
          <ul className="text-sm list-disc list-inside text-slate-700 space-y-2 bg-slate-50 p-4 rounded-lg">
            <li><strong>El Docente:</strong> Facilita, cuestiona, presenta.</li>
            <li><strong>El Estudiante:</strong> Construye, resuelve, debate.</li>
          </ul>
        </div>

        {/* GUÍA 2: INCLUSIÓN */}
        <div className="card-solemn p-6">
          <h3 className="font-bold text-orange-700 flex items-center gap-2 mb-4">
            <Shield size={20} /> Protocolo Ley 7600
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            El sistema detecta automáticamente las banderas en &quot;Mis Estudiantes&quot;.
          </p>
          <div className="text-xs bg-orange-50 text-orange-900 p-3 rounded border border-orange-200">
            <strong>Nota:</strong> Usted no debe pedir la adecuación en el prompt. Si el estudiante existe en la base de datos, la IA lo sabrá.
          </div>
        </div>

        {/* GUÍA 3: FACTURACIÓN */}
        <div className="card-solemn p-6 col-span-1 md:col-span-2 bg-slate-900 text-white border-none">
          <h3 className="font-bold text-yellow-400 flex items-center gap-2 mb-4">
            <DollarSign size={20} /> Soporte y Pagos
          </h3>
          <p className="text-sm text-slate-300">
            Cualquier incidencia técnica o duda sobre su suscripción (Plan Ultra ₡15,000) se atiende directamente vía WhatsApp.
          </p>
          <div className="mt-4 text-center">
            <a href="https://wa.me/50660906359" target="_blank" className="btn btn-outline text-white hover:bg-white hover:text-slate-900 btn-sm">
              Contactar a Soporte (Max Salazar)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}