"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const LEVEL_THEMES = {
  preescolar: { name: "Preescolar", color: "orange" },
  primaria: { name: "Primaria", color: "green" },
  secundaria: { name: "Secundaria Académica", color: "blue" },
  tecnico: { name: "Técnico Profesional", color: "navy" },
  ipec: { name: "IPEC / Adultos", color: "purple" },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [levelTheme, setLevelTheme] = useState("tecnico");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("aulaplan_theme") || "light";
    const savedLevel =
      localStorage.getItem("aulaplan_level_theme") || "tecnico";
    setTheme(savedTheme);
    setLevelTheme(savedLevel);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute("data-level-theme", savedLevel);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("aulaplan_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const changeLevelTheme = (level) => {
    setLevelTheme(level);
    localStorage.setItem("aulaplan_level_theme", level);
    document.documentElement.setAttribute("data-level-theme", level);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        levelTheme,
        toggleTheme,
        changeLevelTheme,
        levelThemes: LEVEL_THEMES,
        isDark: theme === "dark",
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
