import Navbar from "@/components/dashboard/Navbar";
import SideNav from "@/components/dashboard/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        {/* Navbar sticky top */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="h-full w-64 md:w-72">
          <SideNav />
        </div>
      </div>
    </div>
  );
}