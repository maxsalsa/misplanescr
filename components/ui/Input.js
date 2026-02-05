import { twMerge } from "tailwind-merge";

export function Input({ label, className, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">
          {label}
        </label>
      )}
      <input
        className={twMerge(
          "flex h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent transition-all shadow-sm",
          className,
        )}
        {...props}
      />
    </div>
  );
}
