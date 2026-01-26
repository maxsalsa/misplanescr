"use client";
import React, { useState, useEffect } from 'react';
import { useGroups } from '@/context/groups-context';
import { useRouter } from 'next/navigation';
import { UserPlus, Save, Trash2, ArrowLeft, Download, Scale } from 'lucide-react';

export default function GroupDetailPage({ params }) {
    const { id } = params;
    const { groups, addStudent, deleteStudent, updateGrade, addTicket, removeTicket, toggleGuideGroup, calculatefinal, rules } = useGroups();
    const router = useRouter();

    const [group, setGroup] = useState(null);
    const [activeTab, setActiveTab] = useState('students'); // 'students' | 'grades' | 'conduct'
    const [newStudent, setNewStudent] = useState({ name: '', email: '' });
    const [selectedStudentForConduct, setSelectedStudentForConduct] = useState(null);
    const [newTicket, setNewTicket] = useState({ type: 'Leve', points: 5, description: '' });

    useEffect(() => {
        const found = groups.find(g => g.id === id);
        if (found) setGroup(found);
    }, [groups, id]);

    if (!group) return <div className="p-8 text-center">Cargando grupo...</div>;

    const handleAddStudent = () => {
        if (!newStudent.name) return;
        addStudent(id, newStudent);
        setNewStudent({ name: '', email: '' });
    };

    const handleAddTicket = () => {
        if (!selectedStudentForConduct || !newTicket.description) return;
        addTicket(id, selectedStudentForConduct.id, {
            ...newTicket,
            date: new Date().toISOString().split('T')[0]
        });
        setNewTicket({ type: 'Leve', points: 5, description: '' });
        // Close modal or keep open? keep open to see update.
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <button onClick={() => router.back()} className="btn btn-circle btn-ghost btn-sm">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{group.name}</h1>
                    <p className="text-slate-500">{group.grade} • {group.students.length} Estudiantes</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase mr-2">¿Es Grupo Guía?</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary toggle-sm"
                        checked={group.isGuideGroup || false}
                        onChange={() => toggleGuideGroup(id)}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
                <div className="tabs tabs-boxed bg-white p-1 shadow-sm w-fit">
                    <a
                        className={`tab tab-lg ${activeTab === 'students' ? 'tab-active bg-indigo-100 text-indigo-700 font-bold' : ''}`}
                        onClick={() => setActiveTab('students')}
                    >
                        👨‍🎓 Lista de Clase
                    </a>
                    <a
                        className={`tab tab-lg ${activeTab === 'grades' ? 'tab-active bg-emerald-100 text-emerald-700 font-bold' : ''}`}
                        onClick={() => setActiveTab('grades')}
                    >
                        📝 Libro de Notas
                    </a>
                </div>

                {/* Conditionally Render Conduct Tab */}
                {group.isGuideGroup && (
                    <div className="tabs tabs-boxed bg-white p-1 shadow-sm w-fit inline-flex">
                        <a
                            className={`tab tab-lg ${activeTab === 'conduct' ? 'tab-active bg-amber-100 text-amber-700 font-bold' : ''}`}
                            onClick={() => setActiveTab('conduct')}
                        >
                            🛡️ Conducta
                        </a>
                    </div>
                )}
            </div>

            {/* CONTENT: STUDENTS LIST */}
            {
                activeTab === 'students' && (
                    <div className="card bg-white shadow-xl border border-slate-100">
                        <div className="card-body">
                            {/* Add Student Bar */}
                            <div className="flex flex-col md:flex-row gap-4 items-end mb-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <div className="form-control w-full">
                                    <label className="label text-xs font-bold text-slate-500">NOMBRE COMPLETO</label>
                                    <input
                                        type="text" placeholder="Ej: Diana Salas" className="input input-sm input-bordered bg-white"
                                        value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label text-xs font-bold text-slate-500">CORREO / ID</label>
                                    <input
                                        type="text" placeholder="Correo MEP" className="input input-sm input-bordered bg-white"
                                        value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                                    />
                                </div>
                                <button onClick={handleAddStudent} className="btn btn-sm btn-primary gap-2">
                                    <UserPlus size={16} /> Agregar
                                </button>
                            </div>

                            {/* List */}
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Contacto</th>
                                            <th className="text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.students.map((student, idx) => (
                                            <tr key={student.id}>
                                                <th>{idx + 1}</th>
                                                <td className="font-bold text-slate-700">{student.name}</td>
                                                <td className="text-slate-500 font-mono text-xs">{student.email || 'Sin correo'}</td>
                                                <td className="text-right">
                                                    <button
                                                        onClick={() => deleteStudent(id, student.id)}
                                                        className="btn btn-ghost btn-xs text-red-400 hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Trash2 size={14} /> borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {group.students.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="text-center py-8 text-slate-400 italic">
                                                    Aún no hay estudiantes en este grupo.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* CONTENT: GRADEBOOK */}
            {
                activeTab === 'grades' && (
                    <div className="card bg-white shadow-xl border border-slate-100 overflow-hidden">
                        <div className="card-body p-0">
                            {/* Gradebook Header */}
                            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center">
                                <div className="text-xs text-emerald-800 font-bold flex items-center gap-2">
                                    <Scale size={16} /> DESGLOSE: Cotidiano ({rules.weights.cotidiano}%) + Tareas ({rules.weights.tareas}%) + Pruebas ({rules.weights.pruebas}%) + Proyecto ({rules.weights.proyecto}%)
                                </div>
                                <button className="btn btn-xs btn-outline btn-emerald gap-1">
                                    <Download size={12} /> Exportar Excel
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className="bg-slate-50 text-slate-600">
                                        <tr>
                                            <th className="w-1/3 pl-6">Estudiante</th>
                                            <th className="text-center bg-blue-50/50">Cotidiano ({rules.weights.cotidiano}%)</th>
                                            <th className="text-center bg-purple-50/50">Tareas ({rules.weights.tareas}%)</th>
                                            <th className="text-center bg-orange-50/50">Pruebas ({rules.weights.pruebas}%)</th>
                                            <th className="text-center bg-pink-50/50">Proyecto ({rules.weights.proyecto}%)</th>
                                            <th className="text-center font-black bg-slate-100">NOTA FINAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.students.map((student) => {
                                            const finalGrade = calculatefinal(student.grades);
                                            const isPassing = finalGrade >= 70;

                                            // Calculate earned points for visuals
                                            const pCoti = (student.grades.cotidiano * (rules.weights.cotidiano / 100)).toFixed(1);
                                            const pTareas = (student.grades.tareas * (rules.weights.tareas / 100)).toFixed(1);
                                            const pPruebas = (student.grades.pruebas * (rules.weights.pruebas / 100)).toFixed(1);
                                            const pProyecto = (student.grades.proyecto * (rules.weights.proyecto / 100)).toFixed(1);

                                            return (
                                                <tr key={student.id} className="hover:bg-slate-50 group transition-colors">
                                                    <td className="pl-6 font-medium text-slate-700">{student.name}</td>

                                                    {/* COTIDIANO */}
                                                    <td className="p-1 relative">
                                                        <input
                                                            type="number" min="0" max="100"
                                                            className="input input-sm input-ghost w-full text-center font-mono focus:bg-blue-50 focus:text-blue-600"
                                                            value={student.grades.cotidiano}
                                                            onChange={(e) => updateGrade(id, student.id, 'cotidiano', e.target.value)}
                                                        />
                                                        <div className="text-[10px] text-center text-blue-400 font-bold absolute bottom-1 w-full pointer-events-none">{pCoti} pts</div>
                                                    </td>

                                                    {/* TAREAS */}
                                                    <td className="p-1 relative">
                                                        <input
                                                            type="number" min="0" max="100"
                                                            className="input input-sm input-ghost w-full text-center font-mono focus:bg-purple-50 focus:text-purple-600"
                                                            value={student.grades.tareas}
                                                            onChange={(e) => updateGrade(id, student.id, 'tareas', e.target.value)}
                                                        />
                                                        <div className="text-[10px] text-center text-purple-400 font-bold absolute bottom-1 w-full pointer-events-none">{pTareas} pts</div>
                                                    </td>

                                                    {/* PRUEBAS */}
                                                    <td className="p-1 relative">
                                                        <input
                                                            type="number" min="0" max="100"
                                                            className="input input-sm input-ghost w-full text-center font-mono focus:bg-orange-50 focus:text-orange-600"
                                                            value={student.grades.pruebas}
                                                            onChange={(e) => updateGrade(id, student.id, 'pruebas', e.target.value)}
                                                        />
                                                        <div className="text-[10px] text-center text-orange-400 font-bold absolute bottom-1 w-full pointer-events-none">{pPruebas} pts</div>
                                                    </td>

                                                    {/* PROYECTO */}
                                                    <td className="p-1 relative">
                                                        <input
                                                            type="number" min="0" max="100"
                                                            className="input input-sm input-ghost w-full text-center font-mono focus:bg-pink-50 focus:text-pink-600"
                                                            value={student.grades.proyecto}
                                                            onChange={(e) => updateGrade(id, student.id, 'proyecto', e.target.value)}
                                                        />
                                                        <div className="text-[10px] text-center text-pink-400 font-bold absolute bottom-1 w-full pointer-events-none">{pProyecto} pts</div>
                                                    </td>

                                                    <td className="text-center font-bold text-lg">
                                                        <div className={`flex flex-col items-center justify-center ${isPassing ? 'text-emerald-600' : 'text-red-500'}`}>
                                                            <span>{finalGrade}</span>
                                                            <span className={`badge badge-xs ${isPassing ? 'badge-success' : 'badge-error'} text-white`}>
                                                                {isPassing ? 'APR' : 'REP'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* CONTENT: CONDUCT */}
            {activeTab === 'conduct' && (
                <div className="card bg-white shadow-xl border border-slate-100 overflow-hidden">
                    <div className="card-body p-0">
                        <div className="p-4 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
                            <div className="text-xs text-amber-800 font-bold">
                                🛡️ GESTIÓN DE BOLETAS Y CONDUCTA
                            </div>
                            <button className="btn btn-xs btn-outline btn-amber gap-1" onClick={() => alert("Generando Acta en PDF... (Simulado)")}>
                                <Download size={12} /> Generar Acta Oficial
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="w-1/3 pl-6">Estudiante</th>
                                        <th className="text-center">Boletas</th>
                                        <th className="text-center">Nota Actual</th>
                                        <th className="text-right pr-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.students.map((student) => {
                                        const conduct = student.conduct || 100;
                                        const tickets = student.disciplinaryTickets || [];
                                        return (
                                            <tr key={student.id} className="hover:bg-slate-50">
                                                <td className="pl-6 font-medium text-slate-700">
                                                    {student.name}
                                                    <div className="text-xs text-slate-400 font-normal">{student.email}</div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="badge badge-ghost text-xs font-bold">{tickets.length} Registradas</div>
                                                </td>
                                                <td className="text-center">
                                                    <div className={`text-xl font-black ${conduct < 65 ? 'text-red-500' : 'text-slate-700'}`}>
                                                        {conduct}
                                                    </div>
                                                    <div className="text-[10px] uppercase font-bold text-slate-400">
                                                        {conduct >= 90 ? 'Excelente' : conduct >= 80 ? 'Muy Bueno' : conduct >= 70 ? 'Bueno' : 'Regular'}
                                                    </div>
                                                </td>
                                                <td className="text-right pr-6">
                                                    <button
                                                        className="btn btn-sm btn-amber btn-outline gap-2"
                                                        onClick={() => setSelectedStudentForConduct(student)}
                                                    >
                                                        📜 Gestionar Boletas
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* BOLETAS MODAL */}
                    {selectedStudentForConduct && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Expediente Disciplinario</h3>
                                        <p className="text-sm text-slate-500">Estudiante: {selectedStudentForConduct.name}</p>
                                    </div>
                                    <button className="btn btn-circle btn-sm btn-ghost" onClick={() => setSelectedStudentForConduct(null)}>✕</button>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Add New Ticket Form */}
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <h4 className="text-xs font-black text-amber-800 uppercase mb-3">Registrar Nueva Falta</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <select
                                                className="select select-sm select-bordered w-full"
                                                value={newTicket.type}
                                                onChange={e => {
                                                    const t = e.target.value;
                                                    let pts = 5;
                                                    if (t === 'Muy Leve') pts = 5;
                                                    if (t === 'Leve') pts = 10;
                                                    if (t === 'Grave') pts = 20;
                                                    if (t === 'Gravísima') pts = 35;
                                                    setNewTicket({ ...newTicket, type: t, points: pts });
                                                }}
                                            >
                                                <option value="Muy Leve">Falta Muy Leve (1-5 pts)</option>
                                                <option value="Leve">Falta Leve (6-10 pts)</option>
                                                <option value="Grave">Falta Grave (11-30 pts)</option>
                                                <option value="Gravísima">Falta Gravísima (30-45 pts)</option>
                                            </select>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Puntos a Rebajar:</span>
                                                <input
                                                    type="number" className="input input-sm input-bordered w-20 font-bold text-center text-red-500"
                                                    value={newTicket.points}
                                                    onChange={e => setNewTicket({ ...newTicket, points: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered w-full text-sm mb-3"
                                            placeholder="Descripción detallada de la falta..."
                                            value={newTicket.description}
                                            onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                                        ></textarea>
                                        <button className="btn btn-sm btn-error w-full text-white" onClick={handleAddTicket}>
                                            Registrar Boleta y Rebajar Puntos
                                        </button>
                                    </div>

                                    {/* History */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-slate-400 uppercase">Historial de Boletas ({selectedStudentForConduct.disciplinaryTickets?.length || 0})</h4>
                                        {selectedStudentForConduct.disciplinaryTickets?.length > 0 ? (
                                            selectedStudentForConduct.disciplinaryTickets.map((ticket) => (
                                                <div key={ticket.id} className="flex gap-4 p-3 bg-white border border-slate-200 rounded-lg shadow-sm items-start">
                                                    <div className={`badge badge-sm mt-1 whitespace-nowrap ${ticket.type === 'Muy Leve' ? 'badge-info' :
                                                        ticket.type === 'Leve' ? 'badge-warning' :
                                                            'badge-error text-white'
                                                        }`}>{ticket.type} (-{ticket.points})</div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-700">{ticket.description}</p>
                                                        <p className="text-xs text-slate-400">{ticket.date}</p>
                                                    </div>
                                                    <button
                                                        className="btn btn-ghost btn-xs text-slate-400 hover:text-red-500"
                                                        onClick={() => removeTicket(id, selectedStudentForConduct.id, ticket.id)}
                                                        title="Eliminar Boleta"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-sm text-slate-400 italic py-4">Este estudiante no tiene boletas registradas. ¡Excelente conducta! 👍</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
