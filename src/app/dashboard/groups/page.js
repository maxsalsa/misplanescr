"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useGroups } from '@/context/groups-context';
import { Plus, Users, School, Trash2, Edit2, ChevronRight, Building2, Check, X, BookOpen, GraduationCap, Upload, FileSpreadsheet, Download } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useGroups } from '@/context/groups-context';
import { Plus, Users, School, Trash2, Edit2, ChevronRight, Building2, Check, X, BookOpen, GraduationCap, Upload, FileSpreadsheet, Download } from 'lucide-react';
import Link from 'next/link';
import ImportModal from './import-modal'; // Imported Component
import SubjectSelector from './subject-selector'; // New Logic Component

export default function GroupsPage() {
    /**
     * Groups Context Hook
     * Provides access to global state for Groups, Students, and Institutions.
     * Contains the core logic for CRUD operations.
     */
    const {
        groups, addGroup, deleteGroup, updateGroup, addStudent,
        myInstitutions, activeInstitution, addInstitution, switchInstitution, deleteInstitution
    } = useGroups();

    // --------------------------------------------------------------------------
    // UI STATES
    // --------------------------------------------------------------------------
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false); // Controls the Create/Edit Group Modal
    const [isInstModalOpen, setIsInstModalOpen] = useState(false);   // Controls the Add Institution Modal
    const [isImportModalOpen, setIsImportModalOpen] = useState(false); // Controls the Excel Import Modal
    const [isEditMode, setIsEditMode] = useState(false);             // Distinguishes between Creating and Editing
    const [editingGroupId, setEditingGroupId] = useState(null);      // Tracks which group is being edited

    // Data States
    const [catalog, setCatalog] = useState([]);
    const [loadingCatalog, setLoadingCatalog] = useState(true);

    // Form States
    const [groupForm, setGroupForm] = useState({ name: '', grade: 'Décimo', subjectId: '', isGuideGroup: false });
    const [instForm, setInstForm] = useState({ name: '', type: 'Académico', region: 'San José' });

    // Fetch Catalog on Mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await fetch('/api/catalog');
                if (res.ok) {
                    const data = await res.json();
                    setCatalog(data);
                }
            } catch (error) {
                console.error("Error loading catalog:", error);
            } finally {
                setLoadingCatalog(false);
            }
        };
        fetchCatalog();
    }, []);

    // Handlers
    const handleSaveGroup = () => {
        if (!groupForm.name) return;
        if (isEditMode && editingGroupId) {
            updateGroup(editingGroupId, groupForm);
        } else {
            addGroup(groupForm.name, groupForm.grade, groupForm.subjectId, groupForm.isGuideGroup);
        }
        resetGroupForm();
    };

    const handleEditGroup = (group) => {
        setGroupForm({
            name: group.name,
            grade: group.grade,
            subjectId: group.subjectId || '',
            isGuideGroup: group.isGuideGroup || false
        });
        setEditingGroupId(group.id);
        setIsEditMode(true);
        setIsGroupModalOpen(true);
    };

    const resetGroupForm = () => {
        setGroupForm({ name: '', grade: 'Décimo', subjectId: '', isGuideGroup: false });
        setIsEditMode(false);
        setEditingGroupId(null);
        setIsGroupModalOpen(false);
    };

    const handleAddInstitution = () => {
        if (!instForm.name) return;
        addInstitution(instForm);
        setInstForm({ name: '', type: 'Académico', region: 'San José' });
        setIsInstModalOpen(false);
        const handleAddInstitution = () => {
            if (!instForm.name) return;
            addInstitution(instForm);
            setInstForm({ name: '', type: 'Académico', region: 'San José' });
            setIsInstModalOpen(false);
        };

        const handleBulkImport = (groupId, studentsData) => {
            // Batch Add to Context
            // In a real app, this should be a single API call. 
            // For MVP Context, we loop.
            studentsData.forEach(student => {
                // Map Excel columns to our schema
                // Expected Keys: NOMBRE, APELLIDO1, APELLIDO2, CEDULA, CORREO, TELEFONO

                // Intelligent Mapping (Case insensitive)
                const getVal = (keys) => {
                    for (let k of keys) {
                        const found = Object.keys(student).find(key => key.toUpperCase().includes(k));
                        if (found) return student[found];
                    }
                    return "";
                };

                const fullName = getVal(['NOMBRE', 'NAME']) + " " + getVal(['APELLIDO', 'LAST', 'PRIMER APELLIDO']);
                const cleanName = fullName.replace("undefined", "").trim() || "Estudiante Importado";
                const cedula = getVal(['CEDULA', 'ID', 'IDENTIFICACION']);
                const email = getVal(['CORREO', 'EMAIL']);

                addStudent(groupId, {
                    name: cleanName,
                    cedula: cedula,
                    email: email,
                    phone: getVal(['TELEFONO', 'CELULAR', 'PHONE']),
                    address: getVal(['DIRECCION', 'DOMICILIO', 'ADDRESS']),
                    dob: getVal(['NACIMIENTO', 'BIRTH', 'FECHA']),
                });
            });
            setIsImportModalOpen(false);
        };

        // Derived Data for UI
        const filteredSubjects = catalog.filter(sub => {
            // Basic fuzzy match for grade level in subject list
            // In a real app, strict IDs are better. This is a heuristic for the demo.
            const gradeMap = {
                'Décimo': '10', 'Undécimo': '11', 'Duodécimo': '12',
                'Séptimo': '7', 'Octavo': '8', 'Noveno': '9'
            };
            const levelCode = gradeMap[groupForm.grade];
            if (!levelCode) return true;
            // Try to match level code in subject parts
            return sub.id.includes(levelCode); // Simple filter
        });

        return (
            <div className="max-w-7xl mx-auto space-y-8 px-4 py-8">
                {/* HERITAGE HEADER: Institution Context */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Institución Activa</p>
                            <div className="dropdown">
                                <label tabIndex={0} className="text-lg font-bold text-slate-800 flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition-colors">
                                    {activeInstitution?.name || "Seleccionar Institución"}
                                    <ChevronRight className="rotate-90" size={16} />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[2] menu p-2 shadow-xl bg-white rounded-box w-72 border border-slate-100 mt-2">
                                    <li className="menu-title text-xs uppercase text-slate-400">Mis Colegios</li>
                                    {myInstitutions.map(inst => (
                                        <li key={inst.id}>
                                            <a
                                                onClick={() => switchInstitution(inst.id)}
                                                className={`flex justify-between ${activeInstitution?.id === inst.id ? 'active font-bold' : ''}`}
                                            >
                                                {inst.name}
                                                {activeInstitution?.id === inst.id && <Check size={14} />}
                                            </a>
                                        </li>
                                    ))}
                                    <div className="divider my-1"></div>
                                    <li>
                                        <a onClick={() => setIsInstModalOpen(true)} className="text-indigo-600 font-medium">
                                            <Plus size={14} /> Agregar Nueva Institución
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="btn btn-outline border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400 gap-2"
                        >
                            <Upload size={18} /> Importar Lista
                        </button>
                        <button
                            onClick={() => { resetGroupForm(); setIsGroupModalOpen(true); }}
                            className="btn btn-primary shadow-lg shadow-indigo-500/20"
                        >
                            <Plus size={20} /> Nuevo Grupo
                        </button>
                    </div>
                </div>

                {/* Quick Stats & Grid */}
                {/* ... (Keep existing stats logic, simplified) ... */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Reusing existing stat cards structure for consistency */}
                    <div className="stats shadow bg-white border border-slate-100">
                        <div className="stat">
                            <div className="stat-figure text-indigo-500"><School size={32} /></div>
                            <div className="stat-title">Total Grupos</div>
                            <div className="stat-value text-indigo-600">{groups.length}</div>
                            <div className="stat-desc">{activeInstitution?.name}</div>
                        </div>
                    </div>
                    {/* Add more stats as needed */}
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(group => {
                        const groupAvg = group.students.length > 0
                            ? (group.students.reduce((acc, s) => {
                                return acc + ((s.grades.cotidiano + s.grades.tareas + s.grades.pruebas + s.grades.proyecto) / 4);
                            }, 0) / group.students.length).toFixed(1)
                            : null;

                        return (
                            <div key={group.id} className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group relative overflow-hidden">
                                {/* Color Coding Strip */}
                                <div className={`absolute top-0 left-0 w-1 h-full ${group.grade.includes("Décimo") ? "bg-indigo-500" :
                                    group.grade.includes("Undécimo") ? "bg-emerald-500" :
                                        group.grade.includes("Duodécimo") ? "bg-amber-500" : "bg-slate-500"
                                    }`}></div>

                                <div className="card-body p-6 pl-8"> {/* Left padding for strip */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-2">
                                            <span className="badge badge-ghost font-medium text-xs">{group.grade}</span>
                                            {group.isGuideGroup && (
                                                <span className="badge badge-warning text-xs gap-1">
                                                    ⭐ Guía
                                                </span>
                                            )}
                                        </div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm text-slate-400 hover:bg-slate-100">
                                                <Edit2 size={16} />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-xl w-48 border border-slate-100">
                                                <li><a onClick={() => handleEditGroup(group)}><Edit2 size={14} /> Editar</a></li>
                                                <li><a onClick={() => deleteGroup(group.id)} className="text-red-500"><Trash2 size={14} /> Eliminar</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <h2 className="card-title text-xl text-slate-800 mb-1">{group.name}</h2>
                                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                                        <BookOpen size={12} />
                                        {group.subjectId ? (catalog.find(c => c.id === group.subjectId)?.nombre || "Asignatura personalizada") : "Sin asignatura oficial"}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-50">
                                        <span className="flex items-center gap-2">
                                            <Users size={16} /> {group.students.length}
                                        </span>
                                        {groupAvg && (
                                            <span className={`font-bold ${Number(groupAvg) >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                {groupAvg}%
                                            </span>
                                        )}
                                    </div>

                                    <Link href={`/dashboard/groups/${group.id}`} className="mt-4 btn btn-primary btn-sm btn-block gap-2 rounded-lg">
                                        Ver Notas <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {groups.length === 0 && (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <School className="text-indigo-400" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700">¡Bienvenido a {activeInstitution?.name || "AulaPlan"}!</h3>
                            <p className="text-slate-500 max-w-md mx-auto mb-8">
                                Para comenzar, crea tu primer grupo de clase. Podrás vincularlo a las asignaturas oficiales del MEP.
                            </p>
                            <button onClick={() => { resetGroupForm(); setIsGroupModalOpen(true); }} className="btn btn-primary px-8">
                                <Plus size={20} /> Crear Primer Grupo
                            </button>
                        </div>
                    )}
                </div>

                {/* MODAL: GROUP (ADD/EDIT) */}
                {isGroupModalOpen && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="modal-box w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-visible">
                            <h3 className="font-bold text-2xl mb-6 text-slate-800">
                                {isEditMode ? 'Editar Grupo' : 'Nuevo Grupo'}
                            </h3>

                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label font-medium text-slate-600">Nombre del Grupo</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: 10-3 Desarrollo Web"
                                        className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        value={groupForm.name}
                                        onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                                    />
                                </div>

                                {/* REPLACED WITH LOGICAL SELECTOR */}
                                <SubjectSelector
                                    institutionType={activeInstitution?.type || 'Académico'}
                                    selectedSubjectId={groupForm.subjectId}
                                    grade={groupForm.grade}
                                    setGrade={(val) => setGroupForm({ ...groupForm, grade: val })}
                                    onSelect={(id, name) => setGroupForm({ ...groupForm, subjectId: id })}
                                />

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={groupForm.isGuideGroup}
                                            onChange={e => setGroupForm({ ...groupForm, isGuideGroup: e.target.checked })}
                                        />
                                        <span className="label-text font-medium text-slate-700">
                                            Asignar como Grupo Guía (Profesor Consejero)
                                        </span>
                                    </label>
                                </div>

                            </div>

                            <div className="modal-action mt-8">
                                <button className="btn btn-ghost" onClick={() => setIsGroupModalOpen(false)}>Cancelar</button>
                                <button className="btn btn-primary px-8" onClick={handleSaveGroup}>
                                    {isEditMode ? 'Guardar Cambios' : 'Crear Grupo'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL: INSTITUTION (ADD) */}
                {isInstModalOpen && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                        <div className="modal-box w-full max-w-md bg-white rounded-2xl">
                            <h3 className="font-bold text-xl mb-4">Agregar Institución</h3>
                            <div className="space-y-4">
                                <input
                                    className="input input-bordered w-full"
                                    placeholder="Nombre (Ej: CTP de Puriscal)"
                                    value={instForm.name}
                                    onChange={e => setInstForm({ ...instForm, name: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <select
                                        className="select select-bordered w-full"
                                        value={instForm.type}
                                        onChange={e => setInstForm({ ...instForm, type: e.target.value })}
                                    >
                                        <option>Académico</option>
                                        <option>Técnico</option>
                                        <option>Privado</option>
                                        <option>Nocturno</option>
                                    </select>
                                    <input
                                        className="input input-bordered w-full"
                                        placeholder="Región (Ej: Puriscal)"
                                        value={instForm.region}
                                        onChange={e => setInstForm({ ...instForm, region: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-ghost" onClick={() => setIsInstModalOpen(false)}>Cancelar</button>
                                <button className="btn btn-primary" onClick={handleAddInstitution}>Agregar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL: BULK IMPORT */}
                {isImportModalOpen && (
                    <ImportModal
                        onClose={() => setIsImportModalOpen(false)}
                        groups={groups}
                        onImport={(groupId, data) => handleBulkImport(groupId, data)}
                    />
                )}
            </div>
        );
    }
}
