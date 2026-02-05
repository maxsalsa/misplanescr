export default function DashboardLoading() {
  return (
    <div className="w-full h-full p-4 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-8 bg-slate-200 rounded w-24"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-slate-200 rounded-xl"></div>
        <div className="h-96 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}
