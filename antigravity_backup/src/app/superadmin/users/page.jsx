
import { activateUser } from '@/app/actions/superadmin';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { MessageCircle, CheckCircle, XCircle, Search } from 'lucide-react';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// 🛡️ SUPERADMIN PAGE: USERS
export default async function SuperAdminUsersPage() {
    const session = await auth();
    // HARDCODED SECURITY
    if (session?.user?.email !== 'admin@aulaplanea.com') {
        redirect('/dashboard');
    }

    // Fetch users (Optimized for Speed)
    // In production we would add pagination, here we limit to 50 for speed
    const users = await prisma.user.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: { institution: true }
    });

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-[#003366]">Cabina de Mando (Soberana)</h1>
                    <p className="text-slate-500">Gestión de Usuarios y Activación de Licencias</p>
                </div>
                <div className="badge badge-primary badge-lg gap-2">
                    SuperAdmin: Lic. Max Salazar
                </div>
            </header>

            {/* QUICK SEARCH */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por correo, nombre o institución..."
                        className="input input-bordered w-full pl-10"
                    />
                </div>
                <button className="btn btn-primary">Buscar</button>
            </div>

            {/* USERS TABLE */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-slate-200">
                <table className="table">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th>Usuario</th>
                            <th>Institución</th>
                            <th>Plan Actual</th>
                            <th>Estado</th>
                            <th>Acciones Soberanas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-xs">{user.name?.substring(0, 2).toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.institution ? (
                                        <span className="badge badge-ghost">{user.institution.name}</span>
                                    ) : (
                                        <span className="text-xs text-red-400">Sin Institución</span>
                                    )}
                                </td>
                                <td>
                                    {user.role === 'SUPER_ADMIN' ? (
                                        <span className="badge badge-warning font-black">GOD MODE</span>
                                    ) : (
                                        <span className="badge badge-outline">{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    {/* STATUS INDICATOR */}
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${user.password ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className="text-xs">{user.password ? 'Activo' : 'Pendiente'}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        {/* WHATSAPP CONFIRMATION */}
                                        <a
                                            href={`https://wa.me/?text=Hola%20${encodeURIComponent(user.name)},%20su%20pago%20ha%20sido%20verificado.%20¡Cuenta%20PRO%20Activada!`}
                                            target="_blank"
                                            className="btn btn-sm btn-circle btn-success text-white"
                                            title="Confirmar por WhatsApp"
                                        >
                                            <MessageCircle size={16} />
                                        </a>

                                        {/* ACTIVATE ACTIONS (Server Action Trigger) */}
                                        <form action={async () => {
                                            "use server";
                                            await activateUser(user.id, 'PREMIUM');
                                        }}>
                                            <button className="btn btn-sm btn-ghost text-blue-600 font-bold">
                                                Activar PRO
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
