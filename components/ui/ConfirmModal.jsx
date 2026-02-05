"use client";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({ id, title, message, onConfirm }) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg flex items-center gap-2 text-error">
          <AlertTriangle /> {title}
        </h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* Si hay un botón en el form, cerrará el modal */}
            <button className="btn btn-ghost mr-2">Cancelar</button>
            <button className="btn btn-error text-white" onClick={onConfirm}>
              Sí, eliminar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
