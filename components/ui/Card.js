import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
  return (
    <div className={twMerge("bg-white rounded-2xl border border-slate-200 shadow-sm p-6", className)} {...props}>
      {children}
    </div>
  );
}
