"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

/**
 * AUTH MOCK SYSTEM
 * Simulates a complex authentication flow for demonstration purposes.
 * 
 * ROLES:
 * - 'guest': Can view generator but CANNOT save/download.
 * - 'teacher-pending': Registered but not activated by Admin.
 * - 'teacher-active': Fully active, but limited to 'allowedSubjects'.
 * - 'admin': Superuser. Can approve teachers and manage content.
 */

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null); // { id, name, role, email, allowedSubjects: [] }
    const [loading, setLoading] = useState(true);

    // Initial Load - Check LocalStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('mep_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Default to Guest if no user
            setUser({ role: 'guest', name: 'Invitado' });
        }
        setLoading(false);
    }, []);

    const login = (email, password, role = 'teacher', name = '') => {
        // MOCK LOGIN LOGIC

        // 1. SUPER ADMIN
        if (email === 'admin@mep.go.cr' && password === 'admin') {
            const adminUser = {
                id: 'admin-001',
                name: 'Super Admin MEP (Max)',
                email: 'admin@mep.go.cr',
                role: 'admin',
                isPremium: true, // UNLIMITED POWER
                subscriptionStatus: 'ACTIVE',
                allowedSubjects: ['*']
            };
            setUser(adminUser);
            localStorage.setItem('mep_user', JSON.stringify(adminUser));

            // 🍪 COOKIE SYNC FOR PROXY GUARD (20 MIN TIMEOUT)
            document.cookie = "auth-token=valid-admin-token; path=/; max-age=1200";
            document.cookie = "user-role=SUPER_ADMIN; path=/; max-age=1200";
            document.cookie = "subscription=ACTIVE; path=/; max-age=1200";

            toast.success("Bienvenido, Arquitecto Máximo.");
            router.push('/dashboard/admin/licenses');
            return true;
        }

        // 2. TEACHER PREMIUM (Demo)
        if (email === 'profe@mep.go.cr' && password === 'premium') {
            const teacherUser = {
                id: 't-001',
                name: 'Profe Premium',
                email: 'profe@mep.go.cr',
                role: 'teacher-active',
                isPremium: true,
                allowedSubjects: ['math-10', 'web-10']
            };
            setUser(teacherUser);
            localStorage.setItem('mep_user', JSON.stringify(teacherUser));
            toast.success("Sesión Premium Iniciada 🌟");
            router.push('/dashboard');
            return true;
        }

        // 3. TEACHER FREE (Test)
        if (email === 'free@mep.go.cr' && password === 'free') {
            const freeUser = {
                id: 't-002',
                name: 'Profe Gratuito',
                email: 'free@mep.go.cr',
                role: 'teacher-active',
                isPremium: false, // RESTRICTED
                allowedSubjects: []
            };
            setUser(freeUser);
            localStorage.setItem('mep_user', JSON.stringify(freeUser));

            // 🍪 COOKIE SYNC FOR PROXY GUARD (20 MIN TIMEOUT)
            document.cookie = "auth-token=valid-free-token; path=/; max-age=1200";
            document.cookie = "user-role=TEACHER; path=/; max-age=1200";
            document.cookie = "subscription=FREE; path=/; max-age=1200";

            toast.info("Modo Gratuito (Lectura). Suscríbase para desbloquear.");
            router.push('/dashboard');
            return true;
        }

        // 3. STUDENT DEMO (Generic Handler)
        if (role === 'student' || role === 'estudiante') {
            const studentUser = {
                id: 's-001',
                name: name || 'Estudiante Demo',
                email: email,
                role: 'student',
                grade: '10-1',
                specialty: 'Desarrollo Web'
            };
            setUser(studentUser);
            localStorage.setItem('mep_user', JSON.stringify(studentUser));
            toast.success(`Bienvenido al Aula, ${studentUser.name}`);
            router.push('/dashboard/student');
            return true;
        }

        toast.error("Credenciales inválidas.");
        return false;
    };

    /**
     * Starts the registration process.
     * In this business model, registration just creates a "pending" user
     * and shows them payment info.
     */
    const register = (data) => {
        // Create a 'pending' user
        const newUser = {
            id: `u-${Date.now()}`,
            name: data.name,
            email: data.email,
            role: 'teacher-pending',
            allowedSubjects: [],
            phone: data.phone,
            location: data.location || 'Alajuela, Costa Rica' // Default from context
        };

        // Save to a "Mock Database" of all users (for Admin to see)
        const allUsers = JSON.parse(localStorage.getItem('mep_db_users') || '[]');
        if (allUsers.find(u => u.email === data.email)) {
            toast.error("Este correo ya está registrado.");
            return false;
        }

        allUsers.push(newUser);
        localStorage.setItem('mep_db_users', JSON.stringify(allUsers));

        // Auto-login as pending
        setUser(newUser);
        localStorage.setItem('mep_user', JSON.stringify(newUser));

        return true;
    };

    const logout = () => {
        setUser({ role: 'guest', name: 'Invitado' });
        localStorage.removeItem('mep_user');

        // 🍪 CLEAR COOKIES
        document.cookie = "auth-token=; path=/; max-age=0";
        document.cookie = "user-role=; path=/; max-age=0";
        document.cookie = "subscription=; path=/; max-age=0";

        router.push('/');
        toast.info("Sesión cerrada.");
    };

    const hasAccessToSubject = (subjectId) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        if (user.role === 'guest' || user.role === 'teacher-pending') return false;

        // Active teacher check
        if (user.allowedSubjects && user.allowedSubjects.includes(subjectId)) return true;
        return false;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            register,
            hasAccessToSubject
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
