"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, BookOpen } from "lucide-react";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Sample events (In production, fetch from DB)
const SAMPLE_EVENTS = [
    { id: 1, date: "2026-01-22", title: "Entrega Plan Mensual", type: "deadline", color: "bg-red-500" },
    { id: 2, date: "2026-01-27", title: "Reunión de Departamento", type: "meeting", color: "bg-blue-500" },
    { id: 3, date: "2026-02-05", title: "Prueba Corta - 10mo", type: "exam", color: "bg-amber-500" },
    { id: 4, date: "2026-02-14", title: "Día del Amor y la Amistad", type: "holiday", color: "bg-pink-500" },
];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and total days
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Navigation
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Get events for a specific date
    const getEventsForDate = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return SAMPLE_EVENTS.filter(e => e.date === dateStr);
    };

    // Generate calendar grid
    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-24 bg-slate-50"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const events = getEventsForDate(day);
        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
        const isSelected = selectedDate === day;

        calendarDays.push(
            <div
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`h-24 p-2 border border-slate-100 cursor-pointer transition-all hover:bg-indigo-50 
                    ${isToday ? "bg-indigo-100 border-indigo-300" : "bg-white"}
                    ${isSelected ? "ring-2 ring-indigo-500" : ""}`}
            >
                <span className={`text-sm font-semibold ${isToday ? "text-indigo-700" : "text-slate-700"}`}>{day}</span>
                <div className="mt-1 space-y-1 overflow-hidden">
                    {events.slice(0, 2).map(event => (
                        <div key={event.id} className={`text-xs text-white px-1 py-0.5 rounded truncate ${event.color}`}>
                            {event.title}
                        </div>
                    ))}
                    {events.length > 2 && <span className="text-xs text-slate-400">+{events.length - 2} más</span>}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">📅 Calendario Escolar</h1>
                    <p className="text-slate-500">Organiza tus entregas, reuniones y evaluaciones.</p>
                </div>
                <button className="btn btn-primary gap-2">
                    <Plus size={18} /> Nuevo Evento
                </button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-xl shadow-sm">
                <button onClick={prevMonth} className="btn btn-ghost btn-sm"><ChevronLeft /></button>
                <h2 className="text-xl font-bold text-slate-800">{MONTHS[month]} {year}</h2>
                <button onClick={nextMonth} className="btn btn-ghost btn-sm"><ChevronRight /></button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 bg-slate-800 text-white rounded-t-xl">
                {DAYS.map(day => (
                    <div key={day} className="text-center py-2 text-sm font-medium">{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 bg-white rounded-b-xl shadow-lg overflow-hidden">
                {calendarDays}
            </div>

            {/* Event Details Sidebar (when date selected) */}
            {selectedDate && (
                <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border-l-4 border-indigo-500">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">
                        📌 Eventos del {selectedDate} de {MONTHS[month]}
                    </h3>
                    {getEventsForDate(selectedDate).length > 0 ? (
                        <ul className="space-y-3">
                            {getEventsForDate(selectedDate).map(event => (
                                <li key={event.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                    <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                                    <div>
                                        <p className="font-medium text-slate-800">{event.title}</p>
                                        <p className="text-xs text-slate-500 capitalize">{event.type}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500 flex items-center gap-2"><Clock size={16} /> Sin eventos programados.</p>
                    )}
                </div>
            )}
        </div>
    );
}
