export default function MediacionRow({ docenteAccion, estudianteAccion }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-4 border-primary p-4 bg-base-200 rounded-2xl my-2">
            <div className="space-y-2">
                <span className="text-[11px] uppercase font-extrabold text-primary">
                    Persona docente (provoca / media)
                </span>
                <p className="text-sm italic leading-relaxed">
                    {docenteAccion || "—"}
                </p>
            </div>

            <div className="space-y-2">
                <span className="text-[11px] uppercase font-extrabold text-success">
                    Persona estudiante (construye / evidencia)
                </span>
                <p className="text-sm font-bold leading-relaxed">
                    {estudianteAccion || "—"}
                </p>
            </div>
        </div>
    )
}
