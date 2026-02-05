"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { markWelcomeAsSeen } from "@/app/actions/user-actions";
import { Rocket, Crown } from "lucide-react";

// Define explicit interface locally to avoid 'any' if types aren't perfect yet

export const WelcomeToast = ({ user }) => {
  useEffect(() => {
    // Si la bandera en DB ya dice TRUE, no hacemos nada. Silencio absoluto.
    if (user.hasSeenWelcome) return;

    // Si es FALSE, lanzamos el mensaje
    const launchToast = async () => {
      // 1. Mensaje para el Super Admin
      if (user.role === "SUPER_ADMIN") {
        toast.success("Acceso Seguro Establecido", {
          description: `Bienvenido, Prof. ${user.apellido1}. El sistema Antigravity está bajo su mando.`,
          icon: <Crown className="w-5 h-5 text-yellow-400" />,
          duration: 6000,
          className: "bg-zinc-900 text-white border-yellow-500",
        });
      }
      // 2. Mensaje para Docentes
      else {
        toast.success(
          `¡Bienvenido a bordo, ${user.honorific || ""} ${user.apellido1}!`,
          {
            description:
              "Tu espacio de trabajo está listo. Comencemos a transformar la educación.",
            icon: <Rocket className="w-5 h-5 text-blue-500" />,
            duration: 5000,
          },
        );
      }

      // 3. ACTUALIZACIÓN SILENCIOSA EN NEON DB
      await markWelcomeAsSeen(user.id);
    };

    launchToast();
  }, [user]);

  return null;
};
