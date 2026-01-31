// UTILIDAD DE NEGOCIO: CONTROL DE ACCESO
export const CHECK_ACCESS = (userPlan, featureReq) => {
  const HIERARCHY = { "FREE": 0, "PREMIUM": 1, "GOD_TIER": 2 };
  
  const userLevel = HIERARCHY[userPlan] || 0;
  const reqLevel = HIERARCHY[featureReq] || 0;

  if (userLevel < reqLevel) {
    return {
      allowed: false,
      watermark: "AULAPLAN FREE - VERSIÓN DE PRUEBA",
      action: "REDIRECT_TO_PAYMENT"
    };
  }

  return { allowed: true, watermark: null, action: "GRANT_ACCESS" };
};