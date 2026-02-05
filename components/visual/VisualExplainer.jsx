"use client";

import React, { useState } from "react";
import Image from "next/image";
import { VisualEngine } from "@/services/visual-engine";
import { Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";

/**
 * VisualExplainer Component
 * A "Magic Blackboard" that generates images for concepts.
 */
export function VisualExplainer({ topic, defaultStyle = "cartoon" }) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    setError(null);

    try {
      const result = await VisualEngine.generateImage(topic, defaultStyle);
      setImage(result);
    } catch (err) {
      setError("No se pudo generar la imagen. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!topic) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-1">
      {/* Control Bar */}
      <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Visual Explainer
            </h3>
            <p className="text-xs text-slate-500">
              Motor DALL-E 3 Institutional
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
            ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generando...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Ilustrar Concepto</span>
            </>
          )}
        </button>
      </div>

      {/* Canvas Area */}
      <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl min-h-[300px] flex items-center justify-center overflow-hidden group">
        {!image && !loading && (
          <div className="text-center p-8 text-slate-400">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">
              Haz clic en &quot;Ilustrar&quot; para visualizar:
            </p>
            <p className="font-semibold text-slate-600 mt-1">
              &quot;{topic}&quot;
            </p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10 transition-all">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-indigo-600 font-medium animate-pulse">
              Pibntando píxeles...
            </p>
          </div>
        )}

        {image && !loading && (
          <div className="relative w-full h-full animate-in fade-in duration-700">
            <Image
              src={image.url}
              alt={topic}
              width={512}
              height={512}
              className="w-full h-auto object-cover shadow-lg"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs font-light truncate">{image.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
