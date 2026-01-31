const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🏫 CONFIGURANDO PERFIL MULTI-INSTITUCIÓN PARA EL LICENCIADO...");

    // 1. OBTENER AL SUPER ADMIN
    const admin = await prisma.user.findFirst({ where: { email: "max@misplanescr.com" } });

    if (!admin) { console.log("❌ Error: No existe el usuario Max."); return; }

    // 2. ACTUALIZAR DATOS BLINDADOS (NO EDITABLES POR EL USUARIO)
    // Simulamos una estructura JSON para guardar múltiples colegios
    // En un sistema real esto sería una tabla relacional, pero para efectos prácticos JSON funciona perfecto en Neon.
    
    await prisma.user.update({
        where: { id: admin.id },
        data: {
            name: "Max Salazar Sánchez", // NOMBRE INMUTABLE (OFICIAL)
            subscriptionStatus: "GOD_TIER", // ACCESO TOTAL
            customData: {
                instituciones: [
                    { id: "CTP_MN", nombre: "CTP Mercedes Norte", modalidad: "Diurno", horas: 20 },
                    { id: "CTP_SR", nombre: "CTP San Rafael de Alajuela", modalidad: "Nocturno", horas: 20 }
                ],
                institucion_activa: "CTP_MN" // Por defecto
            }
        }
    });

    console.log("✅ PERFIL ACTUALIZADO:");
    console.log("   👤 Docente: Max Salazar Sánchez (INMUTABLE)");
    console.log("   🏫 CTP Mercedes Norte (Diurno)");
    console.log("   🌙 CTP San Rafael de Alajuela (Nocturno)");
    console.log("   🔓 Nivel: GOD_TIER (Sin marcas de agua)");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());