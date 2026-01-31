import SideNav from "@/components/dashboard/SideNav";
import CopilotWidget from "@/components/dashboard/CopilotWidget";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-50">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-0 md:overflow-y-auto">
        {children}
      </div>
      {/* WIDGET DE INTELIGENCIA FLOTANTE */}
      <CopilotWidget />
    </div>
  );
}