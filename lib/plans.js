export const PLANS_CONFIG = {
  DEMO: {
    id: "demo",
    name: "Plan Demo (Gratis)",
    price: 0,
    durationDays: 7, // Configurable
    limits: {
      groups: 1,
      subjects: 1,
      plans: 1,
      pdfExport: false,
      aiStrategies: "basic", // basic | advanced
    },
    features: [
      "1 Grupo",
      "1 Asignatura",
      "1 Planeamiento Mensual",
      "IA Básica",
      "Vista Previa (Sin PDF)",
    ],
    color: "bg-slate-100 border-slate-300 text-slate-700",
  },
  MONTHLY: {
    id: "monthly",
    name: "Plan Mensual (Pro)",
    price: 4000,
    currency: "CRC",
    durationDays: 30,
    limits: {
      groups: 9999,
      subjects: 9999,
      plans: 9999,
      pdfExport: true,
      aiStrategies: "advanced",
    },
    features: [
      "Grupos Ilimitados",
      "Asignaturas Ilimitadas",
      "Planeamientos Ilimitados",
      "Exportar PDF Oficial",
      "IA Avanzada & Creativa",
      "Soporte Prioritario",
    ],
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  ANNUAL: {
    id: "annual",
    name: "Plan Anual (Pro+)",
    price: 35000, // Discounted
    currency: "CRC",
    durationDays: 365,
    limits: {
      groups: 9999,
      subjects: 9999,
      plans: 9999,
      pdfExport: true,
      aiStrategies: "advanced",
    },
    features: [
      "Todo lo del Plan Mensual",
      "Ahorro del 27%",
      "Soporte VIP",
      "Acceso Anticipado a Funciones",
    ],
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
};
