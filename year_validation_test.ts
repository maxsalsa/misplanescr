
import { z } from 'zod';
import { PlanSchema } from '@/lib/validators/mep-schema';

console.log('🚀 TEST DE VALIDACIÓN MULTI-AÑO MEP (2025 vs 2026)');

const runValidation = (mockPlan: any, label: string) => {
    console.log(`\n🧪 Probando: ${label} (Año: ${mockPlan.year})`);
    const result = PlanSchema.safeParse(mockPlan);
    if (result.success) {
        console.log('   ✅ APROBADO (Cumple normativa)');
    } else {
        console.log('   ❌ RECHAZADO (Violación de Normativa):');
        result.error.errors.forEach(e => console.log(`      -> ${e.message}`));
    }
};

// Mock Data
const basicPlan = {
    modalidad: 'Técnica', nivel: '10', asignatura: 'Mate', unidad: 'Geometría',
    aprendizajes: [{
        resultado: 'Resolver problemas de triángulos.',
        indicadores: ['Identifica catetos'],
        estrategias: 'El docente explica en la pizarra y los alumnos copian.' // ⚠️ REDACCIÓN TRADICIONAL
    }]
};

// CASO 1: 2025 (Debería pasar, reglas laxas)
runValidation({
    ...basicPlan,
    year: 2025,
    dua_active: false
}, "Plan 2025 Tradicional");

// CASO 2: 2026 (Debería fallar, falta DUA)
runValidation({
    ...basicPlan,
    year: 2026,
    dua_active: false
}, "Plan 2026 Sin DUA");

// CASO 3: 2026 Corregido (Debería pasar)
runValidation({
    ...basicPlan,
    year: 2026,
    dua_active: true,
    aprendizajes: [{
        resultado: 'Resolver problemas de triángulos.',
        indicadores: ['Identifica catetos'],
        estrategias: 'El docente ofrece MULTIFORMATO de video y texto. El estudiante hace una ELECCION de evaluación.' // ✅ REDACCIÓN DUA
    }]
}, "Plan 2026 DUA Compliant");
