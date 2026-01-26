import { exec } from 'child_process';
import path from 'path';
import util from 'util';

const execPromise = util.promisify(exec);

/**
 * Searches the RAG Vector Database using the Python engine (Core Bridge).
 * @param {string} query - The search query
 * @param {string} modality - Filter by modality
 * @param {string} level - Filter by level
 * @returns {Promise<string>} - The retrieved context
 */
export async function searchKnowledgeBase(query, modality, level, profile) {
    try {
        // Pointing to the new Python Core Bridge
        const pythonScript = path.join(process.cwd(), 'python_core', 'bridge_cli.py');

        const isWindows = process.platform === 'win32';
        const pythonCommand = isWindows ? 'py' : 'python'; // Fallback to 'python' if 'py' fails manually

        // Using --query argument style
        const cmd = `python "${pythonScript}" --query "${query}" --modality "${modality || ''}" --level "${level || ''}" --profile "${profile || 'ESTANDAR'}"`;

        console.log(`🔍 RAG Execution: ${cmd}`);

        const { stdout, stderr } = await execPromise(cmd);

        if (stderr) {
            console.warn("⚠️ Python Bridge Warning:", stderr);
        }

        return stdout;

    } catch (error) {
        console.error("❌ RAG Bridge Failed:", error);
        return "";
    }
}

/**
 * Triggers a full re-indexing (Not recommended via Web, use CLI).
 */
export async function rebuildKnowledgeBase() {
    console.warn("⚠️ Rebuild from Web is disabled in v3.0. Use 'python python_core/entrena.py' on server.");
    return false;
}
