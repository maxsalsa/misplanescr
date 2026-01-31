"use client";
import { useState } from "react";
import { saveAttendanceBatch } from "@/app/actions/gradebook";
import { toast } from "sonner";
import { Check, X, Clock, HelpCircle, Save } from "lucide-react";

export default function AttendanceTab({ section }) {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendance, setAttendance] = useState({}); // { studentId: "P" | "A" | "T" }
    const [loading, setLoading] = useState(false);

    // Default all to "P" initially? Or leave empty? Let's leave empty.

    const setStatus = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSave = async () => {
        setLoading(true);
        const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status }));

        if (records.length === 0) {
            toast.warning("No hay registros para guardar");
            setLoading(false);
            return;
        }

        const res = await saveAttendanceBatch(section.id, date, records);
        if (res.success) {
            toast.success("Asistencia Guardada");
            setAttendance({}); // Reset visual? Or keep?
        } else {
            toast.error(res.error);
        }
        setLoading(false);
    };

    const markAllPresent = () => {
        const newAtt = {};
        section.students.forEach(s => newAtt[s.id] = "P");
        setAttendance(newAtt);
        toast.info("Todos marcados como Presentes");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-4">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered font-bold text-slate-700" />
                    <button onClick={markAllPresent} className="btn btn-ghost btn-sm text-blue-600">Marcar Todos Presentes</button>
                </div>
                <button onClick={handleSave} disabled={loading} className="btn btn-primary shadow-lg gap-2">
                    {loading ? <span className="loading loading-spinner"></span> : <><Save size={18} /> Guardar Asistencia</>}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.students.map(student => {
                    const status = attendance[student.id];
                    return (
                        <div key={student.id} className={`p-4 rounded-xl border flex justify-between items-center transition-all ${status === "P" ? "bg-emerald-50 border-emerald-200" :
                                status === "A" ? "bg-red-50 border-red-200" :
                                    status === "T" ? "bg-amber-50 border-amber-200" : "bg-white border-slate-200"
                            }`}>
                            <div>
                                <p className="font-bold text-slate-800">{student.name}</p>
                                <p className="text-xs text-slate-400">Estado: {status || "Pendiente"}</p>
                            </div>
                            <div className="join">
                                <button
                                    className={`join-item btn btn-sm ${status === "P" ? "btn-success text-white" : "btn-outline border-slate-200 text-slate-400"}`}
                                    onClick={() => setStatus(student.id, "P")}
                                >P</button>
                                <button
                                    className={`join-item btn btn-sm ${status === "T" ? "btn-warning text-white" : "btn-outline border-slate-200 text-slate-400"}`}
                                    onClick={() => setStatus(student.id, "T")}
                                >T</button>
                                <button
                                    className={`join-item btn btn-sm ${status === "A" ? "btn-error text-white" : "btn-outline border-slate-200 text-slate-400"}`}
                                    onClick={() => setStatus(student.id, "A")}
                                >A</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
