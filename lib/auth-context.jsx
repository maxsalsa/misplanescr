"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: "1",
    email: "admin@aulaplan.cr",
    password: "admin2024",
    name: "Prof. Max Rodriguez",
    role: "admin",
    institution: "CTP Futuro Digital",
    institutionType: "tecnico",
    subscription: "pro",
    createdAt: new Date().toISOString(),
  },
  {
    id: "est001",
    email: "maria.estudiante@ctp.cr",
    password: "est2024",
    name: "Maria Fernanda Solano",
    role: "estudiante",
    cedula: "1-2345-6789",
    groupId: "10-1",
    institution: "CTP Futuro Digital",
    createdAt: new Date().toISOString(),
  },
  {
    id: "est002",
    email: "carlos.estudiante@ctp.cr",
    password: "est2024",
    name: "Carlos Andres Mora",
    role: "estudiante",
    cedula: "1-3456-7890",
    groupId: "10-1",
    institution: "CTP Futuro Digital",
    createdAt: new Date().toISOString(),
  },
  {
    id: "padre001",
    email: "padre.familia@gmail.com",
    password: "padre2024",
    name: "Roberto Solano Mendez",
    role: "padre",
    studentIds: ["est001"],
    institution: "CTP Futuro Digital",
    createdAt: new Date().toISOString(),
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem("aulaplan_users");
    if (storedUsers) {
      const parsed = JSON.parse(storedUsers);
      // Merge default users with stored users
      const merged = [...DEFAULT_USERS];
      parsed.forEach((u) => {
        if (!merged.find((m) => m.id === u.id)) {
          merged.push(u);
        }
      });
      setUsers(merged);
    } else {
      setUsers(DEFAULT_USERS);
      localStorage.setItem("aulaplan_users", JSON.stringify(DEFAULT_USERS));
    }

    const storedUser = localStorage.getItem("aulaplan_current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(
        "aulaplan_current_user",
        JSON.stringify(userWithoutPassword),
      );
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: "Credenciales incorrectas" };
  };

  const register = (userData) => {
    const exists = users.find((u) => u.email === userData.email);
    if (exists) {
      return { success: false, error: "El correo ya esta registrado" };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: userData.role || "teacher",
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("aulaplan_users", JSON.stringify(updatedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(
      "aulaplan_current_user",
      JSON.stringify(userWithoutPassword),
    );

    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aulaplan_current_user");
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("aulaplan_current_user", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u,
    );
    setUsers(updatedUsers);
    localStorage.setItem("aulaplan_users", JSON.stringify(updatedUsers));
  };

  const isAdmin = () => user?.role === "admin";
  const isTeacher = () => user?.role === "teacher" || user?.role === "admin";
  const isStudent = () => user?.role === "estudiante";
  const isParent = () => user?.role === "padre";
  const isPro = () => user?.subscription === "pro" || user?.role === "admin";

  const getAllUsers = () => users.map(({ password, ...u }) => u);

  return (
    <AuthContext.Provider
      value={{
        user,
        users: getAllUsers(),
        loading,
        login,
        register,
        logout,
        updateUser,
        isAdmin,
        isTeacher,
        isStudent,
        isParent,
        isPro,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
