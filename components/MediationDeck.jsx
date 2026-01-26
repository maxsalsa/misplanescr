import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Gamepad2, Database, FlaskConical, Gavel, HandMetal, Users, Info } from "lucide-react";

// Types derived from Antigravity Omni-Engine v10
;
}



const getIconForRoute = (tipo) => {
    const t = tipo.toLowerCase();
    if (t.includes('lúdica') || t.includes('gamificación')) return <Gamepad2 className="w-5 h-5 text-purple-600" />;
    if (t.includes('steam') || t.includes('maker')) return <Database className="w-5 h-5 text-blue-600" />; // Represents Tech/Data/Eng
    if (t.includes('científica')) return <FlaskConical className="w-5 h-5 text-green-600" />;
    if (t.includes('analítica') || t.includes('filosofía') || t.includes('juicio')) return <Gavel className="w-5 h-5 text-slate-600" />;
    if (t.includes('social')) return <Users className="w-5 h-5 text-orange-600" />;
    return <HandMetal className="w-5 h-5 text-indigo-600" />; // Default 'Rock On' or 'Action'
};

const getInclusionText = (inclusion | any) => {
    if (typeof inclusion === 'string') return inclusion;
    if (typeof inclusion === 'object') {
        // Return first available key-value pair formatted
        const entries = Object.entries(inclusion);
        if (entries.length > 0) return `${entries[0][0].toUpperCase()}: ${entries[0][1]}`;
    }
    return "Adaptación Universal";
};

export const MediationDeck.FC<MediationDeckProps> = ({ rutas }) => {
    if (!rutas || rutas.length === 0) return <div className="text-gray-500 italic">No hay rutas de mediación disponibles.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rutas.map((ruta, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-900 bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                {getIconForRoute(ruta.tipo)}
                                {ruta.tipo.split('/')[0]}
                            </span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Badge variant="outline" className="cursor-help"><Info className="w-3 h-3 mr-1" /> DUA</Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs bg-slate-900 text-white border-slate-700">
                                        <p className="font-semibold text-xs text-yellow-400">Estrategia de Inclusión:</p>
                                        <p className="text-xs">{getInclusionText(ruta.inclusion)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                            {ruta.tipo.split('/')[1] || "Estrategia General"}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="p-2 bg-blue-50 rounded-md border border-blue-100">
                            <span className="font-bold text-blue-800 block text-xs mb-1">DOCENTE (Facilita)</span>
                            {ruta.docente}
                        </div>
                        <div className="p-2 bg-green-50 rounded-md border border-green-100">
                            <span className="font-bold text-green-800 block text-xs mb-1">ESTUDIANTE (Construye)</span>
                            {ruta.estudiante}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
