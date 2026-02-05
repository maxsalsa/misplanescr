"use client";

import {
  Video,
  BookOpen,
  PenTool,
  Link as LinkIcon,
  Download,
} from "lucide-react";

/**
 * Muestra los recursos extraídos del plan.
 * Soporta formato v5.0 (JSON Estructurado) y Legacy (Texto Plano).
 */
export default function ResourceList({ plan }) {
  // 1. Estrategia de Extracción (Parser)
  const extractResources = (content) => {
    const resources = [];

    // A: Parseo Inteligente de Texto (Legacy/Rich Text)
    // Busca patrones como "Ver video:", "Lectura:", "Materiales:"
    const textToScan =
      typeof content === "string" ? content : JSON.stringify(content);

    // Auto-detect YouTube Links
    const youtubeRegex =
      /(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\s]+)/g;
    const ytMatches = textToScan.match(youtubeRegex);
    if (ytMatches) {
      ytMatches.forEach((url) =>
        resources.push({
          type: "VIDEO",
          title: "Video Didáctico Sugerido",
          url,
        }),
      );
    }

    // Auto-detect PDF/Drive Links
    const docRegex =
      /(https?:\/\/[^\s]+(?:\.pdf|drive\.google|docs\.google)[^\s]*)/g;
    const docMatches = textToScan.match(docRegex);
    if (docMatches) {
      docMatches.forEach((url) =>
        resources.push({ type: "DOCUMENT", title: "Documento de Apoyo", url }),
      );
    }

    // B: Extracción Estructurada (v5.0 Protocolo Apoteosis)
    if (content?.planning_module?.resources) {
      content.planning_module.resources.forEach((r) => resources.push(r));
    }

    // C: Inyección Estática por Contexto (Si no hay nada)
    if (resources.length === 0) {
      // Fallback inteligente basado en materia
      if (textToScan.includes("Matemáticas")) {
        resources.push({
          type: "TOOL",
          title: "Calculadora Científica",
          url: null,
        });
        resources.push({
          type: "TOOL",
          title: "Juego Geometría Online",
          url: "https://www.geogebra.org/",
        });
      }
    }

    return resources;
  };

  const resources = extractResources(plan?.content);

  if (!resources || resources.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case "VIDEO":
        return <Video className="w-4 h-4 text-red-500" />;
      case "DOCUMENT":
        return <Download className="w-4 h-4 text-blue-500" />;
      case "TOOL":
        return <PenTool className="w-4 h-4 text-amber-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="card bg-base-100 border border-slate-200 shadow-sm mt-6 no-print">
      <div className="card-body p-4">
        <h3 className="card-title text-sm font-bold flex items-center gap-2 uppercase text-slate-500">
          <LinkIcon className="w-4 h-4" /> Recursos Tangibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="p-2 bg-white rounded-md shadow-sm">
                {getIcon(res.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {res.title}
                </p>
                {res.url ? (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate block"
                  >
                    Abrir Recurso ↗
                  </a>
                ) : (
                  <p className="text-xs text-slate-400">Material Físico</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
