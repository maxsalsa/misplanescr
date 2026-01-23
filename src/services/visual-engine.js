
/**
 * Visual Engine Service
 * Handles interaction with the backend generation API (DALL-E 3)
 */

export const VisualEngine = {
    /**
     * Generates an educational image based on a topic.
     * @param {string} topic - The educational topic (e.g. "Photosynthesis process")
     * @param {string} style - "realistic" | "cartoon" | "diagram"
     * @returns {Promise<{url: string, caption: string}>}
     */
    generateImage: async (topic, style = "realistic") => {
        try {
            const response = await fetch("/api/visual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: topic, style }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            return {
                url: data.url,
                caption: data.revised_prompt || topic
            };
        } catch (error) {
            console.error("Visual Engine Client Error:", error);
            // Fallback for demo/error (placeholder)
            return {
                url: `https://placehold.co/600x400?text=${encodeURIComponent(topic)}`,
                caption: "Placeholder (Generation Failed)"
            };
        }
    }
};
