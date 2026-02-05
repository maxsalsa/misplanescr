import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  description,
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
        {Icon && (
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-black text-slate-900">{value}</div>
        {trend && (
          <span
            className={cn(
              "text-xs font-bold mb-1",
              trendUp ? "text-emerald-600" : "text-red-500",
            )}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-slate-400 mt-2">{description}</p>
      )}
    </div>
  );
}
