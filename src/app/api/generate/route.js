
import { NextResponse } from 'next/server';
import { generateMEPPlan } from '@/core/ia-engine/ai-service';
import { searchKnowledgeBase } from '@/core/ia-engine/rag-bridge';
import pdf from 'pdf-parse';

export async function POST(request) {
    const REQUEST_ID = crypto.randomUUID(); // Audit Log ID
    console.log(`[API ${REQUEST_ID}] Iniciando solicitud de generación de plan.`);

    try {
        const formData = await request.formData();

        // 1. Extraction & Sanitization (Multi-File Support)
        const files = formData.getAll('file');
        const inputs = {
            subArea: (formData.get('subArea') || '').trim(),
            level: (formData.get('level') || '').trim(),
            unit: (formData.get('unit') || '').trim(),
            hours: (formData.get('hours') || '0').trim(),
            period: (formData.get('period') || '').trim(),
            group: (formData.get('group') || '').trim(),
            modality: (formData.get('modality') || '').trim(),
            // PEDAGOGY PARAMS (New Hybrid Architecture)
            pedagogy: {
                focus: formData.get('pedagogy_focus'),
                tone: formData.get('pedagogy_tone'),
                forbidden: formData.get('pedagogy_forbidden'),
                dua: formData.get('pedagogy_dua')
            }
        };

        // 2. Security & Validation Layer (Audit Protocol)
        const errors = [];

        // File Validation (Relaxed for RAG)
        if (files.length === 0) {
            console.log(`[API ${REQUEST_ID}] Sin archivos. Iniciando Modo RAG (Búsqueda en Cerebro).`);
        } else {
            files.forEach((file, index) => {
                if (file.size > 10 * 1024 * 1024) errors.push(`El archivo #${index + 1} excede el límite de 10MB.`);
                if (file.type !== 'application/pdf') errors.push(`El archivo #${index + 1} no es un PDF válido.`);
            });
        }

        // Parameter Validation
        if (!inputs.subArea) errors.push('La Sub-área es obligatoria.');
        if (!inputs.level) errors.push('El Nivel es obligatorio.');
        if (!inputs.unit) errors.push('La Unidad es obligatoria.');
        if (!['I Semestre', 'II Semestre'].includes(inputs.period)) errors.push('Periodo inválido.');
        if (!inputs.group) errors.push('El Grupo es obligatorio.');

        if (errors.length > 0) {
            console.warn(`[API ${REQUEST_ID}] Validación fallida:`, errors);
            return NextResponse.json({ error: 'Error de Validación', details: errors }, { status: 400 });
        }

        // 3. Processing (Batch PDF Parsing)
        let combinedText = "";

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const pdfData = await pdf(buffer);
            const text = pdfData.text || "";
            if (text.length > 50) {
                combinedText += `\n\n--- INICIO DE DOCUMENTO: ${file.name} ---\n${text}\n--- FIN DE DOCUMENTO ---\n`;
            }
        }



        // RAG FALLBACK
        if (combinedText.length < 100) {
            console.log(`[API ${REQUEST_ID}] Buscando en Vector DB para: ${inputs.subArea} / ${inputs.unit}`);
            const ragContext = await searchKnowledgeBase(`${inputs.subArea} ${inputs.unit}`, inputs.modality, inputs.level);

            if (ragContext && ragContext.length > 50) {
                combinedText = ragContext;
                console.log(`[API ${REQUEST_ID}] RAG recuperó ${ragContext.length} caracteres de contexto.`);
            } else {
                console.error(`[API ${REQUEST_ID}] Fallo total: Ni PDF ni RAG.`);
                return NextResponse.json({ error: 'No se encontró contexto oficial. Por favor suba un PDF o contacte a soporte.' }, { status: 400 });
            }
        }

        console.log(`[API ${REQUEST_ID}] ${files.length} PDFs procesados (${combinedText.length} caracteres). Enviando a AI.`);

        // 4. Service Invocation
        const plan = await generateMEPPlan({
            texto_oficial: combinedText,
            sub_area: inputs.subArea,
            nivel: inputs.level,
            unidad: inputs.unit,
            horas_lectivas: parseInt(inputs.hours, 10),
            periodo: inputs.period,
            grupo: inputs.group,
            modalidad: inputs.modality,
            pedagogyParameters: inputs.pedagogy
        });

        console.log(`[API ${REQUEST_ID}] Plan generado exitosamente.`);
        return NextResponse.json({ plan });

    } catch (error) {
        console.error(`[API ${REQUEST_ID}] CRITICAL ERROR:`, error);
        return NextResponse.json({
            error: 'Error Interno del Sistema',
            message: error.message
        }, { status: 500 });
    }
}
