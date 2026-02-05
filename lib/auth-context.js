"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { PLANS_CONFIG } from "./plans";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("aulaPlanUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Check expiration
      const now = new Date();
      const expiry = new Date(parsedUser.planExpiry);

      // If expired demo, we could lock them out or downgrade.
      // For now, we just load the user state.
      setUser(parsedUser);
    } else {
      // Auto-create Demo User for first time visitors if not exists
      // In a real app we'd wait for login, but for this "product demo" feel:
      // We start with null, letting them hit the login page.
    }
    setLoading(false);
  }, []);

  const login = (email, name, role = "teacher") => {
    // Simulate Login - Creates a fresh Demo session if no previous data
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + PLANS_CONFIG.DEMO.durationDays);

    const newUser = {
      email,
      name,
      role, // 'teacher', 'student', 'family'
      planId: PLANS_CONFIG.DEMO.id,
      planName: PLANS_CONFIG.DEMO.name,
      planExpiry: expiryDate.toISOString(),
      usage: {
        plansCreated: 0,
      },
    };

    // Check if we have an existing upgrade in localStorage for this email (simulating backend)
    // For simplicity, we just overwrite for new login unless logic is complex.
    // Let's stick to simple "New Session = Demo" or "Resuming Session".

    setUser(newUser);
    localStorage.setItem("aulaPlanUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aulaPlanUser");
  };

  const upgradePlan = (newPlanId) => {
    if (!user) return;

    const planConfig = Object.values(PLANS_CONFIG).find(
      (p) => p.id === newPlanId,
    );
    if (!planConfig) return;

    const now = new Date();
    const newExpiry = new Date();
    newExpiry.setDate(now.getDate() + planConfig.durationDays);

    const updatedUser = {
      ...user,
      planId: planConfig.id,
      planName: planConfig.name,
      planExpiry: newExpiry.toISOString(),
    };

    setUser(updatedUser);
    localStorage.setItem("aulaPlanUser", JSON.stringify(updatedUser));
  };

  const checkPermission = (feature) => {
    if (!user) return false;
    const currentPlan = Object.values(PLANS_CONFIG).find(
      (p) => p.id === user.planId,
    );
    if (!currentPlan) return false;

    if (feature === "export_pdf") return currentPlan.limits.pdfExport;
    if (feature === "ai_advanced")
      return currentPlan.limits.aiStrategies === "advanced";

    return true;
  };

  const incrementUsage = (metric) => {
    if (!user) return;
    const newUsage = { ...user.usage, [metric]: (user.usage[metric] || 0) + 1 };
    const updatedUser = { ...user, usage: newUsage };
    setUser(updatedUser);
    localStorage.setItem("aulaPlanUser", JSON.stringify(updatedUser));
  };

  const getDaysRemaining = () => {
    if (!user) return 0;
    const now = new Date();
    const expiry = new Date(user.planExpiry);
    const diffTime = Math.abs(expiry - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return expiry < now ? 0 : diffDays;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        upgradePlan,
        checkPermission,
        incrementUsage,
        getDaysRemaining,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
