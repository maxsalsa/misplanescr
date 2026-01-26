"use client";

import { SessionProvider } from "next-auth/react";
import { SaaSProvider } from "@/context/saas-context";
import { AuthProvider } from "@/context/auth-context";
import { GroupsProvider } from "@/context/groups-context";
import { OfflineProvider } from "@/components/providers/OfflineProvider";
import { Toaster } from "sonner";

/**
 * GlobalProviders - Restored with all context providers
 */
export function GlobalProviders({ children, session }) {
    return (
        <SessionProvider session={session}>
            <OfflineProvider>
                <AuthProvider>
                    <SaaSProvider>
                        <GroupsProvider>
                            {children}
                            <Toaster position="top-center" richColors />
                        </GroupsProvider>
                    </SaaSProvider>
                </AuthProvider>
            </OfflineProvider>
        </SessionProvider>
    );
}
