"use client";
import React, { useState } from 'react';
import SteppedPlanner from '@/components/features/generator/SteppedPlanner';
import { Sparkles } from 'lucide-react';

export default function GeneratorPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = (prompt) => {
        setIsGenerating(true);
        // Logic to stream generation would go here
        console.log("Generating with prompt:", prompt);
        setTimeout(() => setIsGenerating(false), 2000); // Mock
    };

    return (
        <div className="p-8 min-h-screen bg-slate-50/50">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Sparkles className="text-primary" />
                    Generador de Planeamiento
                </h1>
                <p className="text-slate-500">Motor de Inteligencia Artificial v11.5 (Binomio Sagrado Active)</p>
            </div>

            <SteppedPlanner onGenerate={handleGenerate} loading={isGenerating} />
        </div>
    );
}
