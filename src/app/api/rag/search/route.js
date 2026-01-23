
import { searchKnowledgeBase } from '@/services/rag-bridge';

export async function POST(req) {
    try {
        const { query, modality, level } = await req.json();

        if (!query) {
            return new Response(JSON.stringify({ error: "Query is required" }), { status: 400 });
        }

        // Call the Python Bridge
        console.log(`[API RAG] Searching for: ${query} in ${modality}/${level}`);
        const resultContext = await searchKnowledgeBase(query, modality, level);

        console.log("[API RAG] Search complete. Length:", resultContext.length);

        return new Response(JSON.stringify({
            success: true,
            context: resultContext,
            results_count: resultContext.length > 50 ? "Multiple Sources Found" : "No Context"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("[API RAG Error]:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
