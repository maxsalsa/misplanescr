import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export function Select({ label, options = [], className, ...props }) {
  return (
    <div className="w-full space-y-1.5 relative">
      {label && <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1">{label}</label>}
      <div className="relative">
        <select
          className={twMerge(
            "flex h-11 w-full appearance-none rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent cursor-pointer shadow-sm transition-all",
            className
          )}
          {...props}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
