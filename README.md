# AulaPlan CR - Plataforma Comercial SaaS 🇨🇷

Plataforma de generación de planeamientos didácticos con IA para docentes del MEP (Costa Rica), construida con Next.js, TailwindCSS y DaisyUI.

## 🚀 Características Finales (MVP)
- **Autenticación Real**: Login, Registro, Persistencia de sesión.
- **Gestión Académica**: Grupos, Estudiantes (CRUD), Asistencia diaria con cálculo de porcentajes.
- **Planeamiento IA**: Generador paso a paso, exportación PDF (con marcas de agua según plan).
- **Modelo SaaS**: Planes Demo, Mensual, Anual con pasarela de pago simulada (SINPE Móvil).
- **Evaluación**: Quizzes interactivos tipo Kahoot.

## 🛠️ Stack Tecnológico
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **Persistence**: LocalStorage (Service Layer pattern)
- **PDF Generation**: jsPDF + jspdf-autotable

---

## 💻 Instrucciones para Correr en Local

1.  **Clonar el repositorio** (si aplica) o navegar a la carpeta raíz.
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
4.  **Abrir en el navegador**:
    Visita [http://localhost:3000](http://localhost:3000).

---

## 🐙 Instrucciones para Subir a GitHub

Si estás iniciando desde cero en git:

1.  **Inicializar repositorio**:
    ```bash
    git init
    ```
2.  **Agregar archivos**:
    ```bash
    git add .
    ```
3.  **Hacer primer commit**:
    ```bash
    git commit -m "Initial commit: AulaPlan MVP Complete"
    ```
4.  **Conectar con GitHub** (Crea un repo vacío en GitHub primero):
    ```bash
    git remote add origin https://github.com/TU_USUARIO/aulaplan-cr.git
    git branch -M main
    git push -u origin main
    ```

---

## ▲ Instrucciones para Desplegar en Vercel

1.  **Crear cuenta en Vercel** (vercel.com).
2.  **Importar Proyecto**:
    - Haz clic en "Add New..." > "Project".
    - Selecciona "Import" junto a tu repositorio de GitHub `aulaplan-cr`.
3.  **Configurar Build**:
    - Framework Preset: `Next.js` (Automático)
    - Root Directory: `./` (Automático)
    - Build Command: `next build` (Automático)
4.  **Desplegar**:
    - Haz clic en **Deploy**.
    - Espera ~1 minuto.
    - ¡Listo! Tu app estará en `https://aulaplan-cr.vercel.app`.

---

## 📂 Estructura del Proyecto

```
/app
  /login            # Página de inicio de sesión
  /register         # Página de registro
  /dashboard        # Área privada del docente
    /generator      # Generador de planes IA
    /groups         # Gestión de estudiantes
    /attendance     # Control de asistencia
    /planning       # Repositorio de planes
  layout.js         # Layout principal + AuthProvider
  page.js           # Landing Page

/lib
  academic-service.js # Lógica de negocio (Grupos/Asistencia)
  auth-context.js     # Estado de usuario y planes
  mep-data.js         # Base de datos curricular
  plans.js            # Configuración de precios
```
