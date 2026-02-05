"use client";
import Link from "next/link";
import { FileText, Trash2, Calendar } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PlanCard({ plan }) {
  const router = useRouter();

  const handleDelete = async () => {
    // Aquí iría la llamada a la API de borrado real
    // await fetch(`/api/plans/${plan.id}`, { method: "DELETE" });

    toast.success("Plan enviado a la papelera", {
      description: "Tienes 30 días para recuperarlo (Simulado)",
      action: {
        label: "Deshacer",
        onClick: () => console.log("Undo"),
      },
    });
    // router.refresh(); // Recargar página
  };

  return (
    <>
      <div className="card bg-base-100 shadow-md border border-base-200 hover:shadow-xl transition-all duration-300 group">
        <div className="card-body p-6">
          <div className="flex justify-between items-start">
            <div className="badge badge-primary badge-outline font-bold mb-2">
              {plan.subject}
            </div>
            <div className="badge badge-ghost text-xs">{plan.level}</div>
          </div>

          <h2 className="card-title text-base-content text-lg mb-1 group-hover:text-primary transition-colors">
            <FileText size={20} className="text-primary/70" />
            {plan.title.replace(/MEP \w+: /, "")}
          </h2>

          <p className="text-base-content/60 text-xs flex items-center gap-2 mb-4">
            <Calendar size={12} /> Modificado:{" "}
            {new Date(plan.createdAt).toLocaleDateString()}
          </p>

          <div className="card-actions justify-between items-center mt-4">
            <button
              className="btn btn-ghost btn-xs text-error opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() =>
                document.getElementById(`modal_delete_${plan.id}`).showModal()
              }
            >
              <Trash2 size={14} /> Borrar
            </button>

            <Link
              href={`/dashboard/library/${plan.id}`}
              className="btn btn-sm btn-primary text-white"
            >
              Ver Plan
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL DE SEGURIDAD FUERA DE LA TARJETA */}
      <ConfirmModal
        id={`modal_delete_${plan.id}`}
        title="¿Eliminar este plan?"
        message={`Estás a punto de borrar "${plan.title}". Esta acción se puede deshacer por un tiempo limitado.`}
        onConfirm={handleDelete}
      />
    </>
  );
}
