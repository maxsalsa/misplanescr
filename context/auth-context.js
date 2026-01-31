"use client";
import { createContext, useContext } from "react";
const AuthContext = createContext({ user: { name: "Max Salazar", role: "GOD_TIER" } });
export const AuthProvider = ({ children }) => <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
export const useAuth = () => useContext(AuthContext);