"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // V48 Integration
import { useAntiPiracy } from '../hooks/use-anti-piracy';
import { Toaster } from 'sonner';

const SaaSContext = createContext();

export function SaaSProvider({ children }) {
    // Activate Anti-Piracy Hooks globally
    useAntiPiracy();
    const { data: session, status } = useSession(); // V48 Session Hook

    // Default to 'teacher' and 'free' for the demo initially
    const [userRole, setUserRole] = useState('teacher'); // 'admin', 'teacher', 'student', 'parent'
    const [planType, setPlanType] = useState('free'); // 'free', 'monthly', 'annual'
    const [usage, setUsage] = useState({ plansCreated: 0, activitiesCreated: 0 }); // Usage tracking

    // Limits Configuration
    const LIMITS = {
        free: { maxPlans: 0, previewOnly: true },
        monthly: { maxPlans: 15, previewOnly: false },
        annual: { maxPlans: Infinity, previewOnly: false }
    };

    /**
     * DATOS OFICIALES DE FACTURACIÓN (CONSTITUCIÓN DEL SISTEMA)
     */
    const paymentInfo = {
        method: "SINPE Móvil",
        number: "6090-6359",
        name: "Max Salazar Sánchez",
        bank: "Banco Popular",
        contact: "+506 6090-6359"
    };

    const [userProfile, setUserProfile] = useState({
        name: 'Cargando...',
        institution: '...',
        email: '...'
    });

    // V48: Hydrate State from Real Session
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            console.log("⚡ [V48] SaaS Context Hydrated:", session.user);

            // Map Backend Roles to Frontend Roles
            const beRole = session.user.role || 'DOCENTE';
            let feRole = 'teacher';
            if (beRole === 'SUPER_ADMIN') feRole = 'admin';
            if (beRole === 'DOCENTE') feRole = 'teacher';
            if (beRole === 'DOCENTE_TECNICO') feRole = 'teacher';
            if (beRole === 'ESTUDIANTE') feRole = 'student';
            if (beRole === 'FAMILIA') feRole = 'parent';

            setUserRole(feRole);
            setUserProfile({
                name: session.user.name || 'Usuario',
                email: session.user.email || 'sin-email',
                institution: 'MEP Cloud' // TODO: Fetch real institution
            });

            // Map Plan
            const bePlan = (session.user.plan || 'demo').toLowerCase();
            let fePlan = 'free';
            if (bePlan === 'pro') fePlan = 'monthly';
            if (bePlan === 'institucional') fePlan = 'annual';
            setPlanType(fePlan);
        }
    }, [session, status]);

    // Persist state (Legacy Mock Logic Disabled)
    // Legacy methods removed for V48
    const switchRole = (role) => setUserRole(role);
    const upgradePlan = (type) => setPlanType(type);
    const downgradePlan = () => setPlanType('free');
    const incrementUsage = (metric) => setUsage({ ...usage, [metric]: (usage[metric] || 0) + 1 });


    const checkLimit = (metric) => {
        // If Admin, always true
        if (userRole === 'admin') return true;

        const limit = LIMITS[planType] || LIMITS.free;
        const current = usage[metric] || 0;

        if (metric === 'plansCreated') {
            return current < limit.maxPlans;
        }
        return true;
    };

    const value = {
        userRole,
        planType,
        userProfile,
        usage,
        limits: LIMITS[planType] || LIMITS.free,
        switchRole,
        upgradePlan,
        downgradePlan,
        incrementUsage,
        checkLimit,
        isFree: planType === 'free',
        isMonthly: planType === 'monthly',
        isAnnual: planType === 'annual',
        isAdmin: userRole === 'admin',
        isTeacher: userRole === 'teacher' || userRole === 'admin',
        isStudent: userRole === 'student',
        isParent: userRole === 'parent',
        paymentInfo, // Exposed for UI components to satisfy Business Model

        // Admin Features
        adminActions: {
            getAllUsers: () => [
                { id: 1, name: "Max Salazar", email: "admin@mep.go.cr", role: "admin", plan: "annual", status: "active", expires: "2099-12-31" },
                { id: 2, name: "Profe Demo", email: "demo@ctp.ed.cr", role: "teacher", plan: "free", status: "active", expires: "2024-12-31" },
                { id: 3, name: "Licda. Maria", email: "maria@colegio.ed.cr", role: "teacher", plan: "monthly", status: "active", expires: "2024-03-30" },
            ],
            modifyUserPlan: (id, newPlan) => {
                console.log(`[Admin] Upgrading user ${id} to ${newPlan}`);
                toast.success("Plan de usuario actualizado correctamente");
            },
            getSystemStats: () => ({
                mrr: 450000,
                activeUsers: 142,
                plansGenerated: 1890,
                ragDocs: 192
            })
        }
    };

    return (
        <SaaSContext.Provider value={value}>
            {children}
        </SaaSContext.Provider>
    );
}

export function useSaaS() {
    const context = useContext(SaaSContext);
    if (context === undefined) {
        throw new Error('useSaaS must be used within a SaaSProvider');
    }
    return context;
}
