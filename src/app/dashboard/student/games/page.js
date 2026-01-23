"use client";
import { useState } from "react";
import { Gamepad2, Trophy, Star, Zap, Clock, Play, Lock, CheckCircle } from "lucide-react";

// Simulated games/quizzes
const GAMES = [
    { id: 1, title: "Batalla de Fracciones", subject: "Matemáticas", type: "quiz", difficulty: "Medio", xp: 150, completed: true, score: 85 },
    { id: 2, title: "Escape Room: La Célula", subject: "Ciencias", type: "escape", difficulty: "Difícil", xp: 300, completed: false, locked: false },
    { id: 3, title: "Jeopardy Histórico", subject: "Estudios Sociales", type: "jeopardy", difficulty: "Fácil", xp: 100, completed: true, score: 92 },
    { id: 4, title: "Trivia de Gramática", subject: "Español", type: "trivia", difficulty: "Medio", xp: 150, completed: false, locked: false },
    { id: 5, title: "Desafío Final: Álgebra", subject: "Matemáticas", type: "boss", difficulty: "Experto", xp: 500, completed: false, locked: true },
];

const DIFFICULTY_COLORS = {
    "Fácil": "badge-success",
    "Medio": "badge-warning",
    "Difícil": "badge-error",
    "Experto": "badge-secondary",
};

const TYPE_ICONS = {
    quiz: "📝",
    escape: "🚪",
    jeopardy: "🎯",
    trivia: "❓",
    boss: "👾",
};

export default function StudentGamesPage() {
    const [filter, setFilter] = useState("all");

    const totalXP = GAMES.filter(g => g.completed).reduce((sum, g) => sum + g.xp, 0);
    const completedCount = GAMES.filter(g => g.completed).length;

    const filteredGames = GAMES.filter(g => {
        if (filter === "completed") return g.completed;
        if (filter === "pending") return !g.completed && !g.locked;
        return true;
    });

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-purple-700">🎮 Juegos y Quizzes</h1>
                    <p className="text-slate-500">Aprende jugando y gana puntos de experiencia (XP).</p>
                </div>
                {/* XP Counter */}
                <div className="flex items-center gap-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Trophy size={24} />
                    <div>
                        <p className="text-2xl font-black">{totalXP} XP</p>
                        <p className="text-xs text-purple-200">{completedCount} de {GAMES.length} completados</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="tabs tabs-boxed bg-purple-100 mb-6 p-1">
                <button className={`tab ${filter === "all" ? "tab-active bg-purple-600 text-white" : "text-purple-700"}`} onClick={() => setFilter("all")}>
                    Todos
                </button>
                <button className={`tab ${filter === "pending" ? "tab-active bg-purple-600 text-white" : "text-purple-700"}`} onClick={() => setFilter("pending")}>
                    Pendientes
                </button>
                <button className={`tab ${filter === "completed" ? "tab-active bg-purple-600 text-white" : "text-purple-700"}`} onClick={() => setFilter("completed")}>
                    Completados
                </button>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                    <div key={game.id} className={`card bg-white shadow-lg border border-slate-100 overflow-hidden transition-all hover:shadow-xl ${game.locked ? "opacity-60" : ""}`}>
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <span className="text-3xl">{TYPE_ICONS[game.type]}</span>
                                <span className={`badge ${DIFFICULTY_COLORS[game.difficulty]}`}>{game.difficulty}</span>
                            </div>
                            <h3 className="card-title text-slate-800 mt-2">{game.title}</h3>
                            <p className="text-sm text-slate-500">{game.subject}</p>

                            <div className="flex items-center gap-4 mt-4 text-sm">
                                <span className="flex items-center gap-1 text-amber-500">
                                    <Star size={14} fill="currentColor" /> {game.xp} XP
                                </span>
                                {game.completed && (
                                    <span className="flex items-center gap-1 text-green-500">
                                        <CheckCircle size={14} /> {game.score}%
                                    </span>
                                )}
                            </div>

                            <div className="card-actions mt-4">
                                {game.locked ? (
                                    <button className="btn btn-disabled btn-block gap-2">
                                        <Lock size={16} /> Bloqueado
                                    </button>
                                ) : game.completed ? (
                                    <button className="btn btn-outline btn-success btn-block gap-2">
                                        <Zap size={16} /> Volver a Jugar
                                    </button>
                                ) : (
                                    <button className="btn btn-primary btn-block gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 border-none hover:from-purple-600 hover:to-indigo-700">
                                        <Play size={16} /> Iniciar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
