"use client";
import { useState } from 'react';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import DocumentSkeleton from '@/components/features/preview/DocumentSkeleton';
import SecureDocumentPreview from '@/components/features/preview/SecureDocumentPreview';
import SteppedPlanner from '@/components/features/generator/SteppedPlanner';

export default function GeneratorPage() {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleGenerate = async (e, directPrompt = null) => {
        if (e) e.preventDefault();
        const activeTopic = directPrompt || topic;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            // Import dynamically to ensure server-client split
            const { generatePlanAction } = await import('@/app/actions/generator');
            const response = await generatePlanAction(activeTopic);

            if (response.error) {
                setError(response.error);
            } else {
                setResult(response.content);
                // 🦅 SOVEREIGN CONFIRMATION (UX)
                import('sonner').then(({ toast }) => {
                    toast.success("¡Listo, Lic. Max!", {
                        description: `Su plan enriquecido (Alta Dotación/Universal) ha sido generado y guardado en la Bóveda Segura.`,
                        duration: 5000,
                        className: "bg-green-50 border-green-500"
                    });
                });
            }
        } catch (err) {
            setError("Error inesperado. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* SEARCH HEADER */}
            <div className="text-center mb-8 animate-fade-in-down">
                <h1 className="text-4xl font-black text-[#003366] mb-2">Generador de Planeamiento Oficial</h1>
                <p className="text-slate-500">
                    Motor de Ingeniería Inversa Curricular (MEP).
                </p>
            </div>

            {/* STEPPED INTERFACE */}
            {!result && (
                <SteppedPlanner onGenerate={(prompt) => {
                    setTopic(prompt);
                    // Trigger manual generate logic
                    const fakeEvent = { preventDefault: () => { } };
                    handleGenerate(fakeEvent, prompt);
                }} loading={loading} />
            )}

            {/* FEEDBACK AREA */}
            <div className="min-h-[500px]">
                {error && (
                    <div className="alert alert-error max-w-2xl mx-auto shadow-lg animate-shake">
                        <BookOpen />
                        <span>{error}</span>
                    </div>
                )}

                {loading && <DocumentSkeleton />}

                {result && (
                    <div className="animate-fade-in-up">
                        <SecureDocumentPreview
                            content={{ title: `Planeamiento: ${topic}`, body: result }}
                            userSubscription="FREE"
                            userId="USR-SESSION"
                            userName="Docente"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
