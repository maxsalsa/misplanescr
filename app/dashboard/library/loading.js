export default function Loading() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="h-10 w-1/3 bg-slate-200 rounded animate-pulse mb-4"></div>

      {/* Skeleton de Filtros */}
      <div className="flex gap-2 mb-8">
        <div className="h-8 w-24 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-24 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-24 bg-slate-200 rounded-full animate-pulse"></div>
      </div>

      {/* Skeleton de Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-48 bg-slate-100 rounded-xl border border-slate-200 p-4 space-y-3 animate-pulse"
          >
            <div className="flex justify-between">
              <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-300 rounded mt-2"></div>
            <div className="h-20 w-full bg-slate-200 rounded mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
