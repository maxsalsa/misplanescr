"use client";
import { createSection } from "@/app/actions/management";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useRef } from "react";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn btn-primary w-full">
      {pending ? <span className="loading loading-spinner"></span> : "Guardar Sección"}
    </button>
  );
}

export default function CreateSectionClient() {
  const modalRef = useRef(null);

  async function clientAction(formData) {
    const res = await createSection(null, formData);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      if (modalRef.current) modalRef.current.close();
    }
  }

  return (
    <>
      <dialog id="create_section_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Nueva Sección 2026</h3>
          <form action={clientAction} className="space-y-4">
            <div className="form-control">
              <label className="label">Nombre (Ej: 10-1)</label>
              <input name="name" className="input input-bordered" placeholder="10-1" required />
            </div>
            <div className="form-control">
              <label className="label">Nivel Académico</label>
              <select name="level" className="select select-bordered" required>
                <option value="7">Sétimo</option>
                <option value="8">Octavo</option>
                <option value="9">Noveno</option>
                <option value="10">Décimo</option>
                <option value="11">Undécimo</option>
                <option value="12">Duodécimo</option>
              </select>
            </div>
            <div className="modal-action">
              <SubmitBtn />
              <button type="button" className="btn" onClick={() => modalRef.current.close()}>Cancelar</button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
