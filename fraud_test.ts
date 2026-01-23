import { validarReportePago } from '@/lib/payments/fraud-detection';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 TEST DE ESCUDO ANTI-FRAUDE SINPE');

    // 1. Simular Pago Válido
    console.log('\n🧪 Caso 1: Pago Legítimo');
    const pagoReal = {
        numeroComprobante: `SINPE-${Date.now()}`,
        imagenUrl: 'https://banco.com/recibo.jpg',
        montoReportado: 12000
    };
    const res1 = await validarReportePago(pagoReal);
    console.log(`   Resultado: [${res1.status}] Riesgo: ${res1.riskLevel}`);

    // Insertar este pago en DB para probar duplicidad
    if (res1.status === 'OK') {
        // Necesitamos un user valido. Usamos el admin.
        const admin = await prisma.user.findUnique({ where: { email: 'max.salazar@antigravity.core' } });
        if (admin) {
            await prisma.paymentReport.create({
                data: {
                    userId: admin.id,
                    comprobanteId: pagoReal.numeroComprobante,
                    monto: pagoReal.montoReportado,
                    riskLevel: res1.riskLevel
                }
            });
        }
    }

    // 2. Simular Fraude (Duplicado)
    console.log('\n🧪 Caso 2: Intento de Clonación (Replay Attack)');
    const pagoClonado = { ...pagoReal }; // Mismo ID
    const res2 = await validarReportePago(pagoClonado);
    console.log(`   Resultado: [${res2.status}] Riesgo: ${res2.riskLevel} -> ${res2.message}`);

    // 3. Simular Recibo Viejo
    console.log('\n🧪 Caso 3: Recibo Antiguo (OCR)');
    const pagoViejo = {
        numeroComprobante: `OLD-${Date.now()}`,
        imagenUrl: 'https://banco.com/OLD_RECEIPT.jpg',
        montoReportado: 15000
    };
    const res3 = await validarReportePago(pagoViejo);
    console.log(`   Resultado: [${res3.status}] Riesgo: ${res3.riskLevel} -> ${res3.message}`);

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
