import Swal from "sweetalert2"
import { clasificarRiesgo } from "@/policy/riskClassifier"

export function evaluarYDispararProtocolo({ texto, onEscalar }) {
    const r = clasificarRiesgo(texto)

    if (r.nivel === "BAJO") return { triggered: false, risk: r }

    Swal.fire({
        title: "Protocolo de Vida Estudiantil",
        html: `
      <div style="text-align:left">
        <p><b>Nivel:</b> ${r.nivel}</p>
        <p><b>Categoría:</b> ${r.categoriaPrincipal ?? "—"}</p>
        <p style="margin-top:8px">Sugerencia: active el protocolo institucional y registre evidencia mínima.</p>
      </div>
    `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Activar protocolo",
        cancelButtonText: "Cerrar",
        confirmButtonColor: "hsl(var(--er))",
    }).then((res) => {
        if (res.isConfirmed) onEscalar?.(r)
    })

    return { triggered: true, risk: r }
}
