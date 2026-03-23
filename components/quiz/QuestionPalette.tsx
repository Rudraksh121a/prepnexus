"use client";

import { Question } from "@/types";

interface QuestionPaletteProps {
  questions: Question[];
  visited: Set<number>;
  answers: Record<number, number>;
  markedForReview: Set<number>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handleSubmit: () => void;
}

export default function QuestionPalette({
  questions,
  visited,
  answers,
  markedForReview,
  currentIndex,
  setCurrentIndex,
  handleSubmit,
}: QuestionPaletteProps) {
  const answered = Object.keys(answers).length;
  const notVisited = questions.length - visited.size;

  const getStatusColor = (index: number) => {
    if (index === currentIndex) return "bg-primary glow-primary";
    if (markedForReview.has(index)) return "bg-warn";
    if (answers[index] !== undefined) return "bg-success";
    if (visited.has(index)) return "bg-overlay border-primary";
    return "bg-elevated border-subtle";
  };

  return (
    <aside className="hidden lg:flex lg:w-80 flex-col border-l border-subtle bg-surface/50 backdrop-blur-sm">
      {/* Header Stats */}
      <div className="p-6 border-b border-subtle">
        <h2 className="type-label text-sm tracking-widest mb-4 uppercase">
          Questions Overview
        </h2>
        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-lg bg-elevated border border-subtle text-center">
            <div className="type-score text-2xl font-bold text-success">
              {answered}
            </div>
            <div className="type-hint text-xs text-secondary mt-1">
              Answered
            </div>
          </div>
          <div className="flex-1 p-3 rounded-lg bg-elevated border border-subtle text-center">
            <div className="type-score text-2xl font-bold text-primary">
              {notVisited}
            </div>
            <div className="type-hint text-xs text-secondary mt-1">
              Not Visited
            </div>
          </div>
          <div className="flex-1 p-3 rounded-lg bg-elevated border border-subtle text-center">
            <div className="type-score text-2xl font-bold text-warn">
              {markedForReview.size}
            </div>
            <div className="type-hint text-xs text-secondary mt-1">Review</div>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center type-score text-sm font-bold
                ${getStatusColor(index)}
                hover:brightness-110
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t border-subtle p-6">
        <button
          onClick={handleSubmit}
          className="type-btn w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--success-600)] to-[var(--primary-600)] text-success shadow-success hover:brightness-110 transition-all font-bold"
        >
          Submit Quiz
        </button>
      </div>
    </aside>
  );
}
