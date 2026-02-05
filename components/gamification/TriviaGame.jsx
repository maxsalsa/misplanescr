"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RefreshCcw, BookOpen } from "lucide-react";

export default function TriviaGame({ data }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!data || !data.questions || data.questions.length === 0) return null;

  const question = data.questions[currentQuestion];

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(option);
    const correct = option === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < data.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 2000); 
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
      <div className="card-body p-8">
        {showScore ? (
          <div className="text-center space-y-6">
            <Trophy className="w-24 h-24 text-accent mx-auto animate-bounce" />
            <h2 className="text-3xl font-bold text-primary">¡Evaluación Completada!</h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Nota Final</div>
                <div className="stat-value text-secondary">
                   {Math.round((score / data.questions.length) * 100)}%
                </div>
                <div className="stat-desc">{score} de {data.questions.length} correctas</div>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="btn btn-primary btn-wide">
              <RefreshCcw className="w-4 h-4 mr-2" /> Nueva Prueba
            </button>
          </div>
        ) : (
          <>
            <progress className="progress progress-primary w-full mb-6" value={currentQuestion + 1} max={data.questions.length}></progress>
            <h3 className="text-xl font-bold mb-6 text-gray-800 leading-relaxed">
              {currentQuestion + 1}. {question.questionText}
            </h3>

            <div className="space-y-4">
              {question.options.map((option, idx) => {
                let btnStyle = "btn-outline border-2 hover:bg-gray-50"; 
                let icon = <span className="badge badge-lg mr-2">{String.fromCharCode(65 + idx)}</span>; // A, B, C

                if (selectedAnswer !== null) {
                    if (option === question.correctAnswer) {
                        btnStyle = "btn-success text-white border-success"; 
                        icon = <CheckCircle2 className="w-6 h-6 mr-2" />;
                    } else if (option === selectedAnswer) {
                        btnStyle = "btn-error text-white border-error"; 
                        icon = <XCircle className="w-6 h-6 mr-2" />;
                    } else {
                        btnStyle = "btn-ghost opacity-50"; 
                    }
                }

                return (
                  <button key={idx} onClick={() => handleAnswerClick(option)} disabled={selectedAnswer !== null}
                    className={`btn w-full justify-start h-auto py-4 text-lg normal-case text-left ${btnStyle}`}>
                    {icon} {option}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
                <div className="alert alert-info mt-6 animate-fade-in">
                    <BookOpen className="w-6 h-6" />
                    <div>
                        <h3 className="font-bold">Retroalimentación:</h3>
                        <div className="text-sm">{question.explanation || "Respuesta analizada."}</div>
                    </div>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}