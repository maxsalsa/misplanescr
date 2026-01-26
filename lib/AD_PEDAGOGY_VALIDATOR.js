/**
 * 🕵️‍♂️ AD PEDAGOGY VALIDATOR (FISCALIZADOR AUTOMÁTICO)
 * Analiza si un plan generado para Alta Dotación cumple con los criterios de Bloom Superior.
 * 
 * Uso: validarComplejidad(texto_generado)
 */

const VERBOS_BLOOM_SUPERIOR = [
    'diseña', 'crea', 'inventa', 'construye', 'hipotetiza',
    'critica', 'evalúa', 'juzga', 'compone', 'planifica', 'argumenta'
];

const VERBOS_PROHIBIDOS = [
    'copia', 'repite', 'memoriza', 'lista', 'define', 'colorea'
];

export function validarComplejidad(textoPlano) {
    const texto = textoPlano.toLowerCase();

    // 1. Detección de Verbos de Alta Demanda
    const aciertos = VERBOS_BLOOM_SUPERIOR.filter(v => texto.includes(v));
    const fallos = VERBOS_PROHIBIDOS.filter(v => texto.includes(v));

    const score = (aciertos.length * 10) - (fallos.length * 5);

    // 2. Reporte de Auditoría
    const reporte = {
        nivelDetectado: score > 20 ? 'ALTA_DOTACION_VERIFICADA' : 'COMPLEJIDAD_INSUFICIENTE',
        score: score,
        evidencias: aciertos,
        alertas: fallos,
        compliance: score > 20
    };

    console.log(`🧠 [AD VALIDATOR] Score: ${score} | Status: ${reporte.nivelDetectado}`);
    return reporte;
}
