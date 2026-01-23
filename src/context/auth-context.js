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
                name: 'Super Admin MEP',
                email: 'admin@mep.go.cr',
                role: 'admin',
                allowedSubjects: ['*'] // Wildcard for all
            };
            setUser(adminUser);
            localStorage.setItem('mep_user', JSON.stringify(adminUser));
            toast.success("Bienvenido, Administrador.");
            router.push('/dashboard/admin');
            return true;
        }

        // 2. TEACHER DEMO
        if (email === 'profe@mep.go.cr' && password === 'demo') {
            const teacherUser = {
                id: 't-001',
                name: 'Profe Demo',
                email: 'profe@mep.go.cr',
                role: 'teacher-active',
                allowedSubjects: ['math-10', 'web-10'] // Example encoded IDs
            };
            setUser(teacherUser);
            localStorage.setItem('mep_user', JSON.stringify(teacherUser));
            toast.success("Sesión iniciada correctamente.");
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
