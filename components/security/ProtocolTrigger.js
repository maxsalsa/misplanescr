/**
 * 🛡️ ANTIGRAVITY PROTOCOL TRIGGER
 * Central Intelligence for Student Safety.
 * Detects keywords related to MEP Protocols (Armas, Drogas, Suicidio, Bullying).
 */

export const evaluarYDispararProtocolo = ({ texto, onEscalar }) => {
  if (!texto) return { triggered: false };

  const lowerText = texto.toLowerCase();

  // 1. MATRIX DE RIESGOS (MEP)
  const riskMatrix = [
    {
      level: "CRITICO",
      keywords: [
        "arma",
        "pistola",
        "cuchillo",
        "navaja",
        "matar",
        "suicidio",
        "muerte",
      ],
      protocol: "P-Violencia-Armas",
    },
    {
      level: "ALTO",
      keywords: ["droga", "marihuana", "coca", "vape"],
      protocol: "P-Drogas",
    },
    {
      level: "MEDIO",
      keywords: ["golpe", "pelea", "bullying", "acoso"],
      protocol: "P-Bullying",
    },
  ];

  // 2. SCANNING
  for (const risk of riskMatrix) {
    if (risk.keywords.some((k) => lowerText.includes(k))) {
      const alertData = {
        level: risk.level,
        protocol: risk.protocol,
        detected: true,
        timestamp: new Date().toISOString(),
      };

      // 3. EXECUTE ESCALATION
      if (onEscalar) onEscalar(alertData);
      return { triggered: true, ...alertData };
    }
  }

  return { triggered: false };
};
