export default function manifest() {
  return {
    name: "AulaPlan CR - Planeamiento Inteligente",
    short_name: "AulaPlan",
    description: "Plataforma oficial de planeamiento didáctico MEP con IA.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#1e293b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
