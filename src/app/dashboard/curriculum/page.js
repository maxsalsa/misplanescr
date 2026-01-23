"use client";
import { MEP_DATA } from '@/lib/mep-data';

export default function CurriculumPage() {
    const subject = "Matemáticas";
    const grade = "10";
    const data = MEP_DATA[subject][grade];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Malla Curricular</h2>
                    <p className="text-gray-500">Explora los contenidos oficiales del MEP.</p>
                </div>
                <div className="badge badge-lg badge-primary">{subject} - {grade}°</div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {Object.entries(data).map(([period, units]) => (
                    <div key={period} className="card bg-base-100 shadow-md border border-base-200">
                        <div className="card-header p-4 bg-base-200 font-bold border-b border-base-300">
                            {period}
                        </div>
                        <div className="card-body p-0">
                            {Object.entries(units).map(([unit, items]) => (
                                <div key={unit} className="collapse collapse-plus border-b last:border-0 border-base-200">
                                    <input type="checkbox" />
                                    <div className="collapse-title text-lg font-medium hover:bg-base-100">
                                        {unit} <span className="opacity-50 text-sm font-normal ml-2">({items.length} aprendizajes)</span>
                                    </div>
                                    <div className="collapse-content bg-base-50">
                                        <ul className="list-disc list-inside py-4 space-y-2 text-sm">
                                            {items.map(item => (
                                                <li key={item.id} className="text-gray-700">
                                                    <span className="font-semibold">{item.aprendizaje}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
