"use client";

import { Trash2 } from "lucide-react";
import { deletePlan } from "@/app/actions/library";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Confirmación nativa simple y efectiva
    const confirmed = window.confirm("¿Está seguro de eliminar este documento permanentemente? Esta acción no se puede deshacer.");
    
    if (!confirmed) return;

    setIsDeleting(true);
    const res = await deletePlan(id);
    
    if (res.success) {
      toast.success("Documento eliminado correctamente");
      router.refresh(); // Recarga la lista sin recargar la página completa
    } else {
      toast.error("Error al eliminar: " + res.error);
    }
    setIsDeleting(false);
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="btn btn-ghost btn-sm text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 transition-colors"
      title="Eliminar Plan"
    >
      {isDeleting ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}