
import { differenceInHours } from 'date-fns';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ReporteSinpe {
    numeroComprobante: string;
    imagenUrl: string;
    montoReportado: number;
}

const PRECIO_SUSCRIPCION = 10000; // Define your price logic here

// Mock OCR function
const parseDateFromOCR = (url: string): Date => {
    // In production, use Tesseract.js or Azure Vision
    // Heuristic: If url contains "old", return old date
    if (url.includes("OLD_RECEIPT")) {
        return new Date('2025-01-01');
    }
    return new Date();
};

export async function validarReportePago(data: ReporteSinpe) {
    console.log(`🛡️ [ESCUDO SINPE] Analizando comprobante: ${data.numeroComprobante}...`);

    // 1. Verificar Duplicados en DB
    const existe = await prisma.paymentReport.findUnique({
        where: { comprobanteId: data.numeroComprobante }
    });

    if (existe) {
        console.warn(`🚨 FRAUDE: Comprobante ${data.numeroComprobante} usado anteriormente.`);
        return {
            status: "REJECTED",
            riskLevel: "CRITICAL",
            message: "Comprobante duplicado detectado en base de datos."
        };
    }

    // 2. Verificar Antigüedad (Heurística OCR)
    const fechaComprobante = parseDateFromOCR(data.imagenUrl);
    const horasDiferencia = differenceInHours(new Date(), fechaComprobante);

    if (horasDiferencia > 48) { // Allow weekend gap
        console.warn(`⚠️ ALERTA: Comprobante antiguo (${horasDiferencia} horas).`);
        return {
            status: "WARNING",
            riskLevel: "HIGH",
            message: "La fecha del comprobante es mayor a 48 horas."
        };
    }

    // 3. Verificar Monto
    if (data.montoReportado < PRECIO_SUSCRIPCION) {
        console.warn(`⚠️ ALERTA: Monto insuficiente (${data.montoReportado}).`);
        return {
            status: "WARNING",
            riskLevel: "HIGH",
            message: `El monto (${data.montoReportado}) es menor al precio del plan.`
        };
    }

    return { status: "OK", riskLevel: "LOW", message: "Comprobante validado correctamente." };
}
