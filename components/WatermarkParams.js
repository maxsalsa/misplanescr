// COMPONENTE DE PROTECCIÓN DE ACTIVOS
export function WatermarkOverlay({ isPremium }) {
  if (isPremium) return null; // Si paga, no mostramos nada.

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="transform -rotate-45 opacity-15 text-slate-900 text-6xl font-black whitespace-nowrap select-none">
        AULAPLAN FREE • NO VÁLIDO • AULAPLAN FREE • NO VÁLIDO
      </div>
    </div>
  );
}
