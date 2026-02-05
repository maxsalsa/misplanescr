"use client";

import { useSaaS } from "@/context/saas-context";
import { Lock } from "lucide-react";
import Link from "next/link";

export function DemoBanner() {
  const { isFree, upgradePlan } = useSaaS();

  if (!isFree) return null;

  return (
    <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-center gap-4 text-sm font-medium shadow-lg z-[100] relative">
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-indigo-200" />
        <span>
          Estás en{" "}
          <span className="font-bold text-white">Modo Demostración</span>. Las
          exportaciones y descargas están deshabilitadas.
        </span>
      </div>
      <button
        onClick={upgradePlan}
        className="btn btn-xs btn-white hover:bg-white/90 text-indigo-700 border-none font-bold animate-pulse"
      >
        Actualizar a PRO
      </button>
    </div>
  );
}
