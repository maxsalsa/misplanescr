
import { OpenAI } from "openai";

// Initialize OpenAI client
// NOTE: In production, ensure OPENAI_API_KEY is set in environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    try {
        const { prompt, style = "educational" } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return new Response(JSON.stringify({ error: "OpenAI API Key missing" }), { status: 500 });
        }

        // Enhance prompt for educational context
        const enhancedPrompt = `
      Educational illustration for Costa Rican students. 
      Topic: ${prompt}.
      Style: ${style === "cartoon" ? "Friendly, vibrant cartoon, Pixar style" : "Scientific, detailed, textbook diagram, clear labels"}.
      Context: School education, safe for work, pedagogical, high definition.
    `;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: enhancedPrompt,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            response_format: "url",
        });

        return new Response(JSON.stringify({
            url: response.data[0].url,
            revised_prompt: response.data[0].revised_prompt
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("[Visual Engine Error]:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
