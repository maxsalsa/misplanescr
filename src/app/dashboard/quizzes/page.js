"use client";
import { useState, useEffect } from "react";
import { Play, Clock, CheckCircle, XCircle, Award, Volume2, ArrowRight } from "lucide-react";

// Mock Data for specific MEP Quizzes
const QUIZZES = [
    {
        id: 1,
        title: "Soporte TI: Prueba I Periodo (Simulacro)",
        subject: "Tecnologías de Información",
        questions: [
            {
                id: 1,
                text: "Caso: Computadora no enciende. ¿Qué paso es más probable para solucionar el problema?",
                options: [
                    { id: "a", text: "Desconectar periféricos y reintentar", color: "bg-red-500" },
                    { id: "b", text: "Revisar conexión fuente-placa madre", color: "bg-blue-500", isCorrect: true },
                    { id: "c", text: "Instalar nuevo S.O.", color: "bg-yellow-500" },
                    { id: "d", text: "Cambiar el monitor", color: "bg-green-500" }
                ],
                time: 30
            },
            {
                id: 2,
                text: "Caso: Computadora se apaga inesperadamente y carcasa caliente. ¿Causa más probable?",
                options: [
                    { id: "a", text: "Disco duro dañado", color: "bg-red-500" },
                    { id: "b", text: "Batería CMOS descargada", color: "bg-blue-500" },
                    { id: "c", text: "Disipador mal instalado o poca pasta térmica", color: "bg-yellow-500", isCorrect: true },
                    { id: "d", text: "Virus informático", color: "bg-green-500" }
                ],
                time: 30
            },
            {
                id: 3,
                text: "Estándar internacional IEEE para redes WiFi:",
                options: [
                    { id: "a", text: "802.11", color: "bg-red-500", isCorrect: true },
                    { id: "b", text: "802.15", color: "bg-blue-500" },
                    { id: "c", text: "RJ45", color: "bg-yellow-500" },
                    { id: "d", text: "TCP/IP", color: "bg-green-500" }
                ],
                time: 15
            },
            {
                id: 4,
                text: "¿Cómo se llama el identificador físico único de una tarjeta de red?",
                options: [
                    { id: "a", text: "Dirección IP", color: "bg-red-500" },
                    { id: "b", text: "Dirección MAC", color: "bg-blue-500", isCorrect: true },
                    { id: "c", text: "Gateway", color: "bg-yellow-500" },
                    { id: "d", text: "DNS", color: "bg-green-500" }
                ],
                time: 20
            },
            {
                id: 5,
                text: "¿Qué protocolo asigna automáticamente direcciones IP?",
                options: [
                    { id: "a", text: "DNS", color: "bg-red-500" },
                    { id: "b", text: "HTTP", color: "bg-blue-500" },
                    { id: "c", text: "DHCP", color: "bg-yellow-500", isCorrect: true },
                    { id: "d", text: "FTP", color: "bg-green-500" }
                ],
                time: 20
            },
            {
                id: 6,
                text: "Error: 'Sistema operativo no encontrado' y disco duro no aparece en BIOS. Solución:",
                options: [
                    { id: "a", text: "Cambiar batería CMOS", color: "bg-red-500" },
                    { id: "b", text: "Revisar conexión del disco duro", color: "bg-blue-500", isCorrect: true },
                    { id: "c", text: "Reinstalar Windows", color: "bg-yellow-500" },
                    { id: "d", text: "Comprar otra PC", color: "bg-green-500" }
                ],
                time: 45
            }
        ]
    },
    {
        id: 2,
        title: "Normativa MEP: Evaluación Diagnóstica",
        subject: "Pedagogía",
        questions: [
            {
                id: 1,
                text: "¿Cuál es el propósito principal de la Evaluación Diagnóstica?",
                options: [
                    { id: "a", text: "Asignar una nota al inicio", color: "bg-red-500" },
                    { id: "b", text: "Decidir quién pasa de año", color: "bg-blue-500" },
                    { id: "c", text: "Conocer el estado para mejorar", color: "bg-yellow-500", isCorrect: true },
                    { id: "d", text: "Sancionar al estudiante", color: "bg-green-500" }
                ],
                time: 20
            },
            {
                id: 2,
                text: "¿Qué instrumento NO es propio de una evaluación diagnóstica cualitativa?",
                options: [
                    { id: "a", text: "Escala de Calificación", color: "bg-red-500" },
                    { id: "b", text: "Prueba Escrita con Puntos Nota", color: "bg-blue-500", isCorrect: true },
                    { id: "c", text: "Lista de Cotejo", color: "bg-yellow-500" },
                    { id: "d", text: "Rúbrica", color: "bg-green-500" }
                ],
                time: 25
            }
        ]
    }
];

export default function QuizzesPage() {
    const [mode, setMode] = useState("menu"); // menu, playing, feedback, finished
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (mode === "playing" && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && mode === "playing") {
            handleTimeUp();
        }
        return () => clearInterval(timer);
    }, [timeLeft, mode]);

    const startQuiz = (quiz) => {
        setActiveQuiz(quiz);
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameStarted(true);
        loadQuestion(0, quiz);
    };

    const loadQuestion = (index, quiz = activeQuiz) => {
        setMode("playing");
        setTimeLeft(quiz.questions[index].time);
    };

    const handleAnswer = (option) => {
        const isCorrect = option.isCorrect;
        setLastAnswerCorrect(isCorrect);
        if (isCorrect) {
            // Score calculation: Base 1000 + Time Bonus
            const points = 1000 + (timeLeft * 10);
            setScore((prev) => prev + points);
        }
        setMode("feedback");
    };

    const handleTimeUp = () => {
        setLastAnswerCorrect(false);
        setMode("feedback");
    };

    const nextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < activeQuiz.questions.length) {
            setCurrentQuestionIndex(nextIndex);
            loadQuestion(nextIndex);
        } else {
            setMode("finished");
        }
    };

    const exitGame = () => {
        setMode("menu");
        setActiveQuiz(null);
        setGameStarted(false);
    };

    // --- RENDER COMPONENT: MENU ---
    if (mode === "menu") {
        return (
            <div className="space-y-8 animate-fade-in">
                <div className="hero rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-8 shadow-xl relative overflow-hidden">
                    <div className="max-w-2xl relative z-10">
                        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-yellow-300">⚡</span>
                            AulaQuiz
                        </h1>
                        <p className="text-indigo-100 mb-6 text-lg">
                            Gamificación integrada. Lanza quizzes estilo "Kahoot" directamente en clase para motivar a tus estudiantes.
                        </p>
                        <button className="btn btn-warning border-none text-indigo-900 hover:bg-yellow-400 shadow-lg font-bold">
                            + Crear Nuevo Quiz
                        </button>
                    </div>
                    {/* Decorative Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {QUIZZES.map((quiz) => (
                        <div key={quiz.id} className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group cursor-pointer" onClick={() => startQuiz(quiz)}>
                            <figure className="h-40 bg-slate-50 flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🎮</span>
                                <div className="badge badge-primary absolute top-3 right-3">{quiz.questions.length} Preguntas</div>
                            </figure>
                            <div className="card-body p-6">
                                <div className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1">{quiz.subject}</div>
                                <h2 className="card-title text-xl text-slate-800 mb-2">{quiz.title}</h2>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary btn-sm gap-2" onClick={(e) => { e.stopPropagation(); startQuiz(quiz); }}>
                                        <Play size={16} /> Jugar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Placeholder for 'Create New' visual */}
                    <div className="card border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer min-h-[250px]">
                        <div className="text-center text-slate-400">
                            <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-2">
                                <span className="text-2xl">+</span>
                            </div>
                            <span className="font-medium">Crear desde cero</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = activeQuiz.questions[currentQuestionIndex];

    // --- RENDER COMPONENT: PLAYING ---
    if (mode === "playing") {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center relative bg-slate-900 rounded-3xl overflow-hidden p-6 animate-in fade-in zoom-in duration-300">
                {/* Header Info */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-white z-10">
                    <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md font-mono text-xl">
                        {currentQuestionIndex + 1} / {activeQuiz.questions.length}
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-600 px-6 py-2 rounded-full font-bold shadow-lg shadow-indigo-500/50">
                        <Award size={20} className="text-yellow-300" />
                        {score} pts
                    </div>
                </div>

                {/* Timer Circle */}
                <div className="absolute top-16 right-1/2 translate-x-1/2">
                    <div className={`countdown font-mono text-4xl font-bold p-4 bg-white/10 rounded-full backdrop-blur-md border-4 ${timeLeft < 5 ? 'border-red-500 text-red-400 animate-pulse' : 'border-indigo-400 text-white'}`}>
                        <span style={{ "--value": timeLeft }}></span>
                    </div>
                </div>

                {/* Question */}
                <div className="mt-16 mb-12 text-center max-w-4xl z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                        {currentQuestion.text}
                    </h2>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl z-10">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(option)}
                            className={`${option.color} hover:brightness-110 active:scale-95 transition-all h-24 md:h-32 rounded-2xl flex items-center justify-center shadow-lg transform hover:-translate-y-1 relative overflow-hidden group`}
                        >
                            {/* Shape Icon (Kahoot style) - Mocked by simple shapes */}
                            <div className="absolute left-6 opacity-50 group-hover:opacity-100 transition-opacity">
                                {option.id === 'a' && <div className="w-0 h-0 border-l-[15px] border-l-transparent border-t-[30px] border-t-white border-r-[15px] border-r-transparent"></div>} {/* Triangle */}
                                {option.id === 'b' && <div className="w-8 h-8 bg-white rotate-45"></div>} {/* Diamond */}
                                {option.id === 'c' && <div className="w-8 h-8 rounded-full bg-white"></div>} {/* Circle */}
                                {option.id === 'd' && <div className="w-8 h-8 bg-white"></div>} {/* Square */}
                            </div>

                            <span className="text-xl md:text-2xl font-bold text-white px-12 text-center shadow-black drop-shadow-sm">
                                {option.text}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Animated Background */}
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
        );
    }

    // --- RENDER COMPONENT: FEEDBACK ---
    if (mode === "feedback") {
        return (
            <div className={`min-h-[80vh] flex flex-col items-center justify-center text-center p-8 rounded-3xl ${lastAnswerCorrect ? 'bg-green-600' : 'bg-red-600'} text-white animate-in zoom-in duration-300`}>
                <div className="mb-6">
                    {lastAnswerCorrect ? (
                        <CheckCircle size={120} className="text-white drop-shadow-xl animate-bounce" />
                    ) : (
                        <XCircle size={120} className="text-white drop-shadow-xl animate-pulse" />
                    )}
                </div>
                <h2 className="text-5xl font-black mb-2 uppercase tracking-wider drop-shadow-md">
                    {lastAnswerCorrect ? "¡Correcto!" : "¡Incorrecto!"}
                </h2>
                <p className="text-xl opacity-90 mb-8 font-medium">
                    {lastAnswerCorrect ? "+ Puntos extra por velocidad" : "¡Ánimo! La próxima sale mejor."}
                </p>

                <div className="bg-white/20 backdrop-blur-md px-12 py-6 rounded-2xl mb-8 border border-white/30">
                    <span className="block text-sm uppercase tracking-widest opacity-75 mb-1">Puntaje Actual</span>
                    <span className="text-5xl font-mono font-bold">{score}</span>
                </div>

                <button onClick={nextQuestion} className="btn btn-lg bg-white text-slate-900 border-none hover:bg-slate-200 px-12 shadow-xl flex items-center gap-3">
                    Siguiente Pregunta <ArrowRight />
                </button>
            </div>
        );
    }

    // --- RENDER COMPONENT: FINISHED ---
    if (mode === "finished") {
        return (
            <div className="min-h-[80vh] bg-indigo-900 rounded-3xl flex flex-col items-center justify-center text-white p-8 animate-in slide-in-from-bottom duration-500 relative overflow-hidden">
                {/* Confetti Effect (CSS only mockup) */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 animate-spin"></div>
                    <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 animate-bounce"></div>
                    <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-red-400 animate-ping"></div>
                </div>

                <Award size={100} className="text-yellow-400 mb-6 animate-pulse" />
                <h1 className="text-5xl font-bold mb-4">¡Quiz Completado!</h1>
                <p className="text-2xl text-indigo-200 mb-12">Gran trabajo en "{activeQuiz.title}"</p>

                <div className="grid grid-cols-2 gap-8 mb-12 w-full max-w-lg">
                    <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-md border border-white/10">
                        <span className="block text-sm text-indigo-300 uppercase mb-2">Puntaje Final</span>
                        <span className="text-5xl font-bold text-yellow-300">{score}</span>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl text-center backdrop-blur-md border border-white/10">
                        <span className="block text-sm text-indigo-300 uppercase mb-2">Precisión</span>
                        <span className="text-5xl font-bold text-green-300">
                            {Math.round((score / (activeQuiz.questions.length * 1200)) * 100)}%
                        </span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={exitGame} className="btn btn-secondary btn-lg px-8">Volver al Menú</button>
                    <button onClick={() => startQuiz(activeQuiz)} className="btn btn-primary btn-lg px-8">Jugar de Nuevo</button>
                </div>
            </div>
        );
    }

    return null;
}
