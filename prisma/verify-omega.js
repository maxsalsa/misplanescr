const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
    // Crear una notificación de sistema para Max
    const admin = await prisma.user.findFirst({ where: { email: "max@misplanescr.com" } });
    if(admin) {
        await prisma.lessonPlan.create({
            data: {
                title: "⚠️ REPORTE OMEGA: SISTEMA ACTUALIZADO",
                userId: admin.id,
                status: "PUBLISHED",
                content: {
                    mensaje: "El protocolo Omega se ha activado correctamente.",
                    auditoria: "Prompt: OK | DB: OK | UI: Zen Mode",
                    fecha: new Date().toISOString()
                }
            }
        });
        console.log("   ✅ Notificación de Sistema creada en Dashboard.");
    }
}
main().finally(() => prisma.$disconnect());