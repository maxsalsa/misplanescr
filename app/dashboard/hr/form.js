"use client";
import { createHRRequest } from "@/app/actions/management";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

function SubmitBtn() {
    const { pending } = useFormStatus();
    return <button disabled={pending} className="btn btn-primary w-full shadow-lg shadow-blue-900/10">{pending ? "Enviando..." : "Radicar Solicitud"}</button>;
}

export default function ClientForm() {
    return (
        <form action={async (formData) => {
            const res = await createHRRequest(null, formData);
            if (res.error) toast.error(res.error);
            else { toast.success(res.message); }
        }} className="space-y-4">
            <div className="form-control">
                <label className="label text-xs uppercase font-bold text-slate-500">Tipo de Trámite</label>
                <select name="type" className="select select-bordered w-full" required>
                    <option value="">Seleccione...</option>
                    <option value="Cita Médica">Cita Médica (CCSS)</option>
                    <option value="Permiso con Goce">Permiso con Goce Salarial</option>
                    <option value="Licencia Sindical">Licencia Sindical</option>
                    <option value="Asuntos Personales">Asuntos Personales (Sin Goce)</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                    <label className="label text-xs uppercase font-bold text-slate-500">Desde</label>
                    <input type="date" name="dateStart" className="input input-bordered w-full" required />
                </div>
                <div className="form-control">
                    <label className="label text-xs uppercase font-bold text-slate-500">Hasta (Opcional)</label>
                    <input type="date" name="dateEnd" className="input input-bordered w-full" />
                </div>
            </div>

            <div className="form-control">
                <label className="label text-xs uppercase font-bold text-slate-500">Justificación</label>
                <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Detalle el motivo..." required></textarea>
            </div>

            <SubmitBtn />
        </form>
    );
}
