"use client";

import { useSaaS } from "@/context/saas-context";

export function Watermark() {
  const { isFree, userProfile } = useSaaS();

  if (!userProfile) return null;

  // In Free Mode, we show a disruptive overlay sometimes or just faint background
  // In Paid Mode, this might be invisible on screen but visible on print (if we could controls print css)
  // or just always there as requested "Visual watermark overlay in demo mode".

  if (isFree) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center opacity-10 select-none overflow-hidden"
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-24 -rotate-12 transform scale-125">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="text-3xl font-black uppercase text-slate-900 border-4 border-slate-900 p-2 opacity-20 whitespace-nowrap"
            >
              MODO DEMOSTRACIÓN
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Paid mode watermark (subtle, bottom right)
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[50] opacity-30 select-none text-right text-xs">
      <p className="font-bold uppercase tracking-wider">
        {userProfile.institution}
      </p>
      <p>Licenciado a: {userProfile.name}</p>
      <p className="text-[10px] text-red-500">
        Prohibida su distribución no autorizada
      </p>
    </div>
  );
}
