"use client";
import {
  Terminal,
  FlaskConical,
  Briefcase,
  Palette,
  BookOpen,
  LayoutGrid,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "Todo";

  const categories = [
    { name: "Todo", id: "Todo", icon: <LayoutGrid size={16} /> },
    { name: "Tecnología", id: "HARD_TECH", icon: <Terminal size={16} /> },
    { name: "Ciencias", id: "STEAM", icon: <FlaskConical size={16} /> },
    { name: "Servicios", id: "SERVICE", icon: <Briefcase size={16} /> },
    { name: "Artes", id: "ART", icon: <Palette size={16} /> },
    { name: "Académico", id: "ACADEMIC", icon: <BookOpen size={16} /> },
  ];

  const handleSelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id === "Todo") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 mb-6 scrollbar-hide">
      {categories.map((cat) => {
        const isActive =
          currentCategory === cat.id ||
          (currentCategory === "Todo" && cat.id === "Todo");
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              isActive
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
