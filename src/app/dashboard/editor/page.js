"use client";
import { FileEdit, Construction } from 'lucide-react';

export default function EditorPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FileEdit className="text-indigo-600" /> Editor de Planes
            </h1>
            <div className="alert alert-info">
                <Construction className="w-6 h-6" />
                <div>
                    <h3 className="font-bold">En Desarrollo</h3>
                    <p>El editor visual de planeamientos estará disponible próximamente.</p>
                </div>
            </div>
        </div>
    );
}
