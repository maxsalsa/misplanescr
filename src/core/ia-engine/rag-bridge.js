import { spawn } from 'child_process';
import path from 'path';

/**
 * RAG Bridge Service
 * Conecta el Backend de Node.js con el núcleo de Python (python_core).
 * Ejecuta `bridge_cli.py` para búsquedas vectoriales.
 */

export async function searchKnowledgeBase(query, modality, level) {
    return new Promise((resolve, reject) => {
        // Rutas Absolutas para robustez
        const pythonScript = path.resolve(process.cwd(), 'python_core/bridge_cli.py');

        // Argumentos CLI
        const args = [
            pythonScript,
            '--query', query,
            '--json' // Solicitamos salida JSON estructurada si posible
        ];

        if (modality) args.push('--modality', modality);
        if (level) args.push('--level', level);

        console.log(`[RAG BRIDGE] Ejecutando: python ${args.join(' ')}`);

        const pythonProcess = spawn('python', args);

        let dataBuffer = '';
        let errorBuffer = '';

        pythonProcess.stdout.on('data', (data) => {
            dataBuffer += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorBuffer += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`[RAG BRIDGE] Error (Exit Code ${code}): ${errorBuffer}`);
                // En caso de fallo, resolvemos vacío para no romper el flujo, pero loggeamos
                resolve("");
                return;
            }

            // Limpieza básica de salida
            const result = dataBuffer.trim();
            if (result.length > 0) {
                resolve(result);
            } else {
                console.warn("[RAG BRIDGE] Python retornó vacío.");
                resolve("");
            }
        });

        pythonProcess.on('error', (err) => {
            console.error("[RAG BRIDGE] Fallo al iniciar proceso Python:", err);
            reject(err);
        });
    });
}
