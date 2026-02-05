import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  className,
  variant = "primary",
  isLoading,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-70 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800 shadow-md shadow-blue-200 border border-blue-800",
    secondary:
      "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-500 hover:text-blue-700 shadow-sm",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
    ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-100",
  };

  return (
    <button
      className={twMerge(baseStyles, variants[variant], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
