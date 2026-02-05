export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 prose prose-slate bg-white shadow-xl rounded-xl my-10 border border-slate-200">
      <h1 className="text-3xl font-black text-slate-900 mb-6">
        Términos Legales y Privacidad
      </h1>

      <div className="alert alert-info shadow-sm mb-6">
        <span>
          Cumplimiento total con la Ley de Protección de la Persona frente al
          Tratamiento de sus Datos Personales (Ley No. 8968).
        </span>
      </div>

      <h3 className="font-bold text-slate-800">1. Propiedad de los Datos</h3>
      <p>
        Los expedientes de estudiantes y planes generados son propiedad
        exclusiva del docente suscriptor. AulaPlan actúa como custodio
        encriptado.
      </p>

      <h3 className="font-bold text-slate-800">2. Pagos y Suscripciones</h3>
      <p>
        El servicio se activa mediante pago SINPE Móvil. Las suscripciones
        anuales tienen vigencia por el curso lectivo 2026 completo. No se
        realizan reembolsos parciales.
      </p>

      <h3 className="font-bold text-slate-800">3. Uso Ético</h3>
      <p>
        La IA es una herramienta de apoyo. El docente es el responsable final de
        la mediación pedagógica en el aula.
      </p>

      <div className="mt-8 text-xs text-slate-400 border-t pt-4">
        AulaPlan CR © 2026. Todos los derechos reservados.
      </div>
    </div>
  );
}
