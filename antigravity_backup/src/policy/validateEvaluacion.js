import Swal from "sweetalert2"

/**
 * Reglas mínimas de cumplimiento para evaluación.
 * Nota: Ajustar nombres según tu modelo real de datos.
 */
export function validarEvaluacion({ tipoTrabajo, hasInstrumento }) {
    // Bloqueo: Trabajo Cotidiano sin rúbrica/escala/instrumento adjunto
    if (tipoTrabajo === "Trabajo Cotidiano" && !hasInstrumento) {
        Swal.fire({
            title: "Incumplimiento de Evaluación",
            text:
                "No se puede asignar calificación global sin un instrumento (rúbrica, escala u otro) asociado. Adjunte el instrumento para continuar.",
            icon: "error",
            confirmButtonText: "Entendido",
            confirmButtonColor: "hsl(var(--er))", // DaisyUI: error
        })
        return { ok: false, reason: "MISSING_INSTRUMENTO" }
    }

    return { ok: true }
}
