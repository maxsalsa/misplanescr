const ADMIN_EMAIL = "maxi.salsa@gmail.com";

// Mock implementation of Email and WebPush
const sendEmail = async (opts) => {
  console.log(`📧 [EMAIL-OUT] To: ${opts.to} | Subject: ${opts.subject}`);
  // In production: resend.emails.send(...)
};

const sendPushNotification = async (opts) => {
  console.log(`🔔 [PUSH-OUT] ${opts.title} - ${opts.body}`);
  // In production: web-push.sendNotification(...)
};

export async function notificarNuevoPago(pagoData) {
  // 1. Envío al Correo (Respaldo Legal)
  await sendEmail({
    to_EMAIL,
    subject: `💰 Nuevo SINPE: ${pagoData.monto} - ${pagoData.docenteName}`,
    template: "ADMIN_PAYMENT_ALERT",
    attachment: pagoData.comprobanteUrl,
  });

  // 2. Disparo a la Barra de Notificaciones (Push)
  await sendPushNotification({
    userRole: "SUPER_ADMIN",
    title: "Nuevo Ingreso Detectado",
    body: `${pagoData.docenteName} reportó un pago. Revisar ahora.`,
    icon: "/icons/sinpe-alert.png",
    clickAction: "https://misplanescr.com/admin/pagos",
  });

  console.log(`✅ Alerta de Cobro enviada al Prof. Salazar (${ADMIN_EMAIL})`);
}
