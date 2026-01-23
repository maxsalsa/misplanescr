/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#4f46e5", // Indigo 600
                    "secondary": "#0ea5e9", // Sky 500
                    "accent": "#10b981", // Emerald 500
                    "neutral": "#1e293b", // Slate 800
                    "base-100": "#ffffff",
                    "base-200": "#f8fafc", // Slate 50
                    "base-300": "#f1f5f9",
                    "info": "#3abff8",
                    "success": "#36d399",
                    "warning": "#fbbd23",
                    "error": "#f87272",
                },
                harmony: {
                    "primary": "#6366f1", // Indigo 500
                    "secondary": "#a855f7", // Purple 500
                    "accent": "#ec4899", // Pink 500
                    "neutral": "#1f2937",
                    "base-100": "#111827", // Gray 900
                    "base-200": "#1f2937", // Gray 800
                    "base-300": "#374151", // Gray 700
                    "info": "#3b82f6",
                    "success": "#22c55e",
                    "warning": "#eab308",
                    "error": "#ef4444",
                }
            },
        ],
    },
}
