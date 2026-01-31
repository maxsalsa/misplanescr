"use client";
import React from 'react';
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, BarChart3, LogOut, Menu, X, ShieldCheck } from "lucide-react";

export default function DashboardShell({ children, session }) {
    // session is passed as prop from server layout

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen bg-base-100">
                {/* Mobile Navbar */}
                <div className="w-full navbar bg-base-300 lg:hidden z-20 sticky top-0">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <Menu className="w-6 h-6" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold text-primary">AulaPlan</div>
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 lg:p-10 bg-base-100 text-base-content">
                    {children}
                </main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-30">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <aside className="bg-base-200 text-base-content w-80 min-h-full flex flex-col border-r border-base-300">
                    <div className="p-4 flex items-center gap-2 border-b border-base-300/50 min-h-[4rem]">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">AulaPlan</span>
                    </div>

                    <ul className="menu p-4 w-full gap-2 flex-1">
                        {/* Sidebar content */}
                        <li>
                            <Link href="/dashboard" className="active:bg-primary active:text-primary-content font-medium">
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/generator" className="font-medium">
                                <FileText className="w-5 h-5" />
                                Generador
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/stats" className="font-medium">
                                <BarChart3 className="w-5 h-5" />
                                Estadísticas
                            </Link>
                        </li>
                    </ul>

                    <div className="p-4 border-t border-base-300/50 bg-base-200/50">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                    <span className="text-xl">{session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || 'U'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-semibold truncate">{session?.user?.name || 'Usuario'}</span>
                                <span className="text-xs text-base-content/60 truncate" title={session?.user?.email}>{session?.user?.email || 'user@example.com'}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="btn btn-outline btn-error btn-sm w-full gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Cerrar Sesión
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
