import { auth } from "../../auth";
import DashboardShell from "../../components/DashboardShell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
    const session = await auth();

    // Double check, though middleware handles this.
    if (!session) {
        redirect("/login");
    }

    return (
        <DashboardShell session={session}>
            {children}
        </DashboardShell>
    );
}
