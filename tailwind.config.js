/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grid-pattern": "url('/grid.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate", "business"], // CORPORATE = CLARO, BUSINESS = OSCURO
    darkTheme: "business", 
    logs: false,
  },
};