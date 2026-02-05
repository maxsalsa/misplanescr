import React from "react";
import { Bot, FileText, Puzzle } from "lucide-react"; // Assuming lucide-react is available

export default function ModeSelector({
  modoOperativo,
  setModoOperativo,
  setStep,
}) {
  const modes = [
    {
      id: "clasico",
      label: "Clásico",
      icon: FileText,
      color: "text-indigo-600",
    },
    {
      id: "ia_normativa",
      label: "MEP-PLANNER AI",
      icon: Bot,
      color: "text-indigo-600",
    },
    { id: "recursos", label: "Recursos", icon: Puzzle, color: "text-pink-600" },
  ];

  return (
    <div className="flex bg-slate-100 p-1 rounded-lg mt-4 md:mt-0">
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
            modoOperativo === mode.id
              ? `bg-white shadow ${mode.color}`
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => {
            setModoOperativo(mode.id);
            setStep(1);
          }}
        >
          {mode.id === "ia_normativa" && <mode.icon size={16} />}
          {mode.label}
        </button>
      ))}
    </div>
  );
}
