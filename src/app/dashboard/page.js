import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import DashboardContent from "@/components/features/dashboard/DashboardContent";

export default async function DashboardPage() {
    // 1. Verificamos quién eres tú
    const session = await auth();

    if (!session || !session.user) {
        redirect("/login");
    }

    // 2. Traemos tus planes reales de Neon
    const userEmail = session.user.email;

    const userDb = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { planes: true } // Relation name is 'planes' in schema
    });

    // 3. Si eres SUPER_ADMIN, podrías ver todos los planes del sistema (opcional)
    const allPlans = userDb?.role === 'SUPER_ADMIN'
        ? await prisma.plan.findMany({ include: { user: true } })
        : userDb?.planes || [];

    return (
        <main className="min-h-screen bg-base-200">
            <DashboardContent
                initialPlans={allPlans}
                userRole={userDb?.role || 'USER'}
                userName={userDb?.name || 'Usuario'}
            />
        </main>
    );
}