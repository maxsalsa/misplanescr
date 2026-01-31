import React from 'react';

/**
 * 📄 DOCUMENT TEMPLATE SWITCHER
 * Renders the specific header required by MEP regulations based on the document type.
 */

// Placeholder for official MEP Shield (User needs to upload real one)
const MEP_SHIELD = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Coat_of_arms_of_Costa_Rica.svg/282px-Coat_of_arms_of_Costa_Rica.svg.png";

import Image from 'next/image';

// ... (existing constants)

export const HeaderFormal = ({ institution, teacher, group, resource }) => (
    <header className="w-full border-b-2 border-black mb-6 pb-2 font-serif">
        <div className="flex justify-between items-start mb-4">
            <div className="w-20 relative h-20">
                <Image
                    src={MEP_SHIELD}
                    alt="Escudo CR"
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>

            <div className="text-center flex-1 px-4">
                <h1 className="font-bold text-lg uppercase tracking-wide">Ministerio de Educación Pública</h1>
                <h2 className="font-bold text-md">{institution.regionalDirection || "DIRECCIÓN REGIONAL [PENDIENTE]"}</h2>
                <h3 className="font-bold text-md">{institution.name}</h3>
                {(institution.circuit) && <p className="text-sm">Circuito {institution.circuit}</p>}
            </div>

            <div className="w-20 relative h-20">
                <Image
                    src={institution.logoUrl || "https://placehold.co/80?text=LOGO"}
                    alt="Logo Inst"
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm border-t border-black pt-2">
            <div className="flex"><span className="font-bold w-32">Docente:</span> {teacher.name}</div>
            <div className="flex"><span className="font-bold w-32">Asignatura:</span> {group.specialty || "General"}</div>
            <div className="flex"><span className="font-bold w-32">Nivel:</span> {group.level}</div>
            <div className="flex"><span className="font-bold w-32">Curso Lectivo:</span> {group.year}</div>
            <div className="col-span-2 flex mt-1"><span className="font-bold w-32">Unidad/RA:</span> {resource.linkedOutcome || "General"}</div>
        </div>
    </header>
);

export const HeaderStudent = ({ institution, resource }) => (
    <header className="w-full mb-6 border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center bg-white p-2 text-xs text-gray-400 mb-2 border-b">
            <span>{institution.name}</span>
            <span>{resource.type.replace('_', ' ')}</span>
        </div>

        <h1 className="text-xl font-bold text-center mb-4 uppercase text-[#003366]">
            Instrumento de Desempeño: {resource.title}
        </h1>

        <div className="grid grid-cols-2 gap-4 text-sm font-medium">
            <div className="border-b border-gray-300 pb-1">Estudiante: __________________________________</div>
            <div className="border-b border-gray-300 pb-1">Sección: _________</div>
            <div className="border-b border-gray-300 pb-1">Fecha: ___/___/___</div>
            <div className="border-b border-gray-300 pb-1">Tiempo Probable: 80 min</div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs">
            <span className="font-bold text-blue-800">INDICADOR ESPERADO:</span>
            <p className="mt-1 italic">{resource.contentJson?.indicator || "Indicador extraído automáticamente del RAG..."}</p>
        </div>
    </header>
);

export const HeaderEvaluation = ({ institution, teacher, group, resource }) => (
    <header className="w-full mb-6">
        {/* Compact Admin Header */}
        <div className="flex justify-between items-center text-xs border-b border-black pb-2 mb-4">
            <div>
                <div className="font-bold">{institution.name}</div>
                <div>{teacher.name} | {group.year}</div>
            </div>
            <div className="font-bold text-right">
                <div>{group.specialty}</div>
                <div>{resource.type}</div>
            </div>
        </div>

        <div className="flex gap-6">
            {/* Grading Box */}
            <div className="border-2 border-black p-0 w-1/3">
                <div className="bg-gray-200 font-bold text-center border-b border-black text-sm p-1">CALIFICACIÓN</div>
                <div className="grid grid-cols-2 text-xs divide-x divide-black border-b border-black">
                    <div className="p-1 text-center bg-white">Puntos Total</div>
                    <div className="p-1 text-center bg-white font-bold">{resource.contentJson?.totalPoints || 45}</div>
                </div>
                <div className="grid grid-cols-2 text-xs divide-x divide-black border-b border-black">
                    <div className="p-1 text-center bg-white">Puntos Obtenidos</div>
                    <div className="p-1 text-center bg-white"></div>
                </div>
                <div className="grid grid-cols-2 text-xs divide-x divide-black border-b border-black">
                    <div className="p-1 text-center bg-white">% Valor</div>
                    <div className="p-1 text-center bg-white font-bold">{resource.contentJson?.percentage || 25}%</div>
                </div>
                <div className="grid grid-cols-2 text-xs divide-x divide-black">
                    <div className="p-1 text-center bg-white">Nota</div>
                    <div className="p-1 text-center bg-white h-8"></div>
                </div>
            </div>

            {/* Instructions */}
            <div className="flex-1 border border-gray-400 p-2 text-sm">
                <h3 className="font-bold underline mb-1">INSTRUCCIONES GENERALES:</h3>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Lea cuidadosamente cada ítem antes de responder.</li>
                    <li>Utilice bolígrafo de tinta azul o negra.</li>
                    <li>No se permite el uso de corrector en las respuestas de selección única.</li>
                    <li>Tiempo disponible: 80 minutos.</li>
                </ul>
            </div>
        </div>
    </header>
);

export const DocumentTemplateSwitcher = ({ resource, institution, teacher, group }) => {
    switch (resource.type) {
        case 'PLAN_PRACTICA':
        case 'PLAN_ANUAL':
        case 'PLAN_UNIDAD':
            return <HeaderFormal institution={institution} teacher={teacher} group={group} resource={resource} />;

        case 'TRABAJO_COTIDIANO':
        case 'TAREA_CORTA':
        case 'GUIA_AUTONOMA':
            return <HeaderStudent institution={institution} resource={resource} />;

        case 'EXAMEN':
        case 'PRUEBA_CORTA':
        case 'PROYECTO':
            return <HeaderEvaluation institution={institution} teacher={teacher} group={group} resource={resource} />;

        default:
            return <HeaderFormal institution={institution} teacher={teacher} group={group} resource={resource} />;
    }
};
