const fs = require("fs");
const path = require("path");

console.log("   ⚡ REGENERANDO ARCHIVOS DE CONFIGURACIÓN LIMPIOS...");

// 1. PACKAGE.JSON (ESTABLE Y SIN BOM)
const pkg = {
  "name": "aulaplan-stable",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "npx prisma generate && next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.0",
    "daisyui": "^4.12.0",
    "framer-motion": "^11.0.0",
    "helmet": "^7.1.0",
    "isomorphic-dompurify": "^2.0.0",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.300.0",
    "next": "14.2.13", 
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sonner": "^1.4.0",
    "tailwind-merge": "^2.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "prisma": "^5.22.0",
    "tailwindcss": "^3.3.0"
  }
};

// Escribimos el JSON puro (sin marcas invisibles)
fs.writeFileSync(path.join(__dirname, "package.json"), JSON.stringify(pkg, null, 2), { encoding: "utf8" });

console.log("   ✅ package.json reparado.");