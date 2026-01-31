import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Skeleton Header */}
      <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse mb-8"></div>
      
      {/* Skeleton Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
        ))}
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
      
      <div className="fixed bottom-4 right-4 flex items-center gap-2 text-slate-400 text-sm">
        <Loader2 className="animate-spin" /> Sincronizando Multiverso...
      </div>
    </div>
  );
}