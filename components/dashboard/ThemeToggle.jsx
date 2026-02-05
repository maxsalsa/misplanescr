"use client";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        data-toggle-theme="business,corporate"
        data-act-class="ACTIVECLASS"
      />

      {/* Sun icon */}
      <Sun className="swap-on fill-current w-6 h-6 text-yellow-500" />

      {/* Moon icon */}
      <Moon className="swap-off fill-current w-6 h-6 text-indigo-400" />
    </label>
  );
}
