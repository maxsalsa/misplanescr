"use client";

import { Trash2, AlertTriangle, Undo2 } from "lucide-react";
import { deletePlan, restorePlan } from "@/app/actions/library"; // Assuming restorePlan exists or we mock it
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef } from "react";

export default function DeleteButton({ id, title = "Este documento" }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.close();
  };

  const handleConfirmDelete = async () => {
    closeModal();
    setIsDeleting(true);

    // 1. Optimistic UI / Direct Action
    const res = await deletePlan(id);

    if (res.success) {
      // 2. Elegant Notification with UNDO
      toast.success("Documento enviado a la papelera", {
        description: `${title} ha sido eliminado.`,
        action: {
          label: "DESHACER",
          onClick: async () => {
            // Undo Logic
            toast.promise(restorePlan(id), {
              loading: "Restaurando...",
              success: "Documento restaurado exitosamente",
              error: "No se pudo restaurar",
            });
            router.refresh();
          },
        },
        duration: 5000, // 5 seconds to undo
        icon: <Trash2 className="w-4 h-4 text-red-500" />,
      });

      router.refresh();
    } else {
      toast.error("Error al eliminar", { description: res.error });
    }

    setIsDeleting(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        disabled={isDeleting}
        className="btn btn-ghost btn-sm text-error hover:bg-error/10 transition-colors"
        title="Eliminar Plan"
      >
        {isDeleting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <Trash2 size={16} />
        )}
      </button>

      {/* Corporate Modal (DaisyUI) */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box border-t-4 border-error">
          <h3 className="font-bold text-lg flex items-center gap-2 text-error">
            <AlertTriangle className="w-6 h-6" />
            Confirmar Eliminación
          </h3>
          <p className="py-4 text-base-content/70">
            ¿Está seguro de que desea eliminar <strong>{title}</strong>? <br />
            Esta acción moverá el archivo a la papelera de reciclaje.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost" onClick={closeModal}>
                Cancelar
              </button>
              <button
                type="button" // Prevent form submit
                className="btn btn-error text-white"
                onClick={handleConfirmDelete}
              >
                Sí, Eliminar
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
