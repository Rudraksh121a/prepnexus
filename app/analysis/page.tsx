"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuizStore } from "@/store/useQuizStore";

export default function AnalysisEngine() {
  const router = useRouter();
  const results = useQuizStore((state) => state.results);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!results) {
    return (
      <main className="flex h-screen w-full items-center justify-center gradient-bg flex-col gap-4">
        <h2 className="type-hero text-2xl text-danger glow-danger">
          No Results Found
        </h2>
        <p className="type-question text-secondary max-w-sm text-center">
          No quiz results were found. Please take a quiz first.
        </p>
        <Link
          href="/"
          className="type-btn px-6 py-2 mt-4 rounded-lg bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] text-primary shadow-primary hover:brightness-110 transition-all"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const {
    score,
    total,
    accuracy,
    timeTaken,
    topic,
    difficulty,
    questions,
    answers,
  } = results;
  const minutesTaken = Math.floor(timeTaken / 60);
  const secondsTaken = timeTaken % 60;

  return (
    <main className="min-h-screen gradient-bg flex flex-col relative selection-brand text-primary py-12 px-6">
      {/* Background flares */}
      <div
        className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary-600)] rounded-full blur-[120px] opacity-20 pointer-events-none animate-pulse z-0"
        style={{ animationDuration: "8s" }}
      ></div>
      <div
        className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--calm-600)] rounded-full blur-[100px] opacity-20 pointer-events-none animate-pulse z-0"
        style={{ animationDuration: "6s", animationDelay: "2s" }}
      ></div>

      {/* Header */}
      <div className="max-w-4xl mx-auto w-full z-10 mb-12 text-center">
        <Link
          href="/"
          className="type-logo text-2xl md:text-3xl drop-shadow-lg tracking-widest mb-8 inline-block"
        >
          prep<span className="text-calm">nexus</span>
        </Link>
      </div>

      {/* Main Results Container */}
      <div className="max-w-4xl mx-auto w-full z-10">
        {/* Results Header */}
        <div className="text-center mb-12">
          <h1 className="type-hero text-5xl md:text-6xl mb-6">
            Quiz Complete! 🎉
          </h1>
          <p className="type-question text-secondary text-lg mb-4">
            {topic} • <span className="capitalize">{difficulty}</span>
          </p>
        </div>

        {/* Score Ring */}
        <div className="mb-12 text-center">
          <div className="inline-block relative">
            <svg className="w-40 h-40" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                className="fill-none stroke-subtle"
                strokeWidth="8"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                className="fill-none stroke-primary transition-all"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - accuracy / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="type-hero text-4xl font-bold text-primary">
                {Math.round(accuracy)}%
              </div>
              <div className="type-label text-xs text-secondary mt-2">
                Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 rounded-2xl bg-elevated border border-subtle text-center">
            <div className="type-score text-4xl font-bold text-success mb-2">
              {score}/{total}
            </div>
            <div className="type-label text-sm text-secondary">Score</div>
          </div>
          <div className="p-8 rounded-2xl bg-elevated border border-subtle text-center">
            <div className="type-score text-4xl font-bold text-primary mb-2">
              {Math.round(accuracy)}%
            </div>
            <div className="type-label text-sm text-secondary">Accuracy</div>
          </div>
          <div className="p-8 rounded-2xl bg-elevated border border-subtle text-center">
            <div className="type-score text-4xl font-bold text-calm mb-2">
              {minutesTaken}:{String(secondsTaken).padStart(2, "0")}
            </div>
            <div className="type-label text-sm text-secondary">Time Taken</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="mb-12">
          <h2 className="type-hero text-2xl md:text-3xl mb-8 text-center">
            Question Review
          </h2>
          <div className="space-y-6">
            {questions.map((question, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? "bg-[var(--success-soft)]/20 border-success"
                      : "bg-[var(--danger-soft)]/20 border-danger"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center type-score text-sm font-bold ${
                        isCorrect
                          ? "bg-success text-[var(--bg-base)]"
                          : "bg-danger text-[var(--bg-base)]"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="type-question text-lg font-semibold mb-4">
                        {question.text}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optIdx) => {
                          const isUserSelected = userAnswer === optIdx;
                          const isCorrectAnswer =
                            optIdx === question.correctAnswer;

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                isCorrectAnswer
                                  ? "bg-success/20 border-success"
                                  : isUserSelected && !isCorrect
                                    ? "bg-danger/20 border-danger"
                                    : "bg-elevated border-subtle"
                              }`}
                            >
                              <span className="type-label text-sm">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="type-option text-sm ml-2">
                                {option}
                              </span>
                              {isCorrectAnswer && (
                                <span className="ml-2 text-success font-bold">
                                  ✓
                                </span>
                              )}
                              {isUserSelected && !isCorrect && (
                                <span className="ml-2 text-danger font-bold">
                                  ✗
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          <Link
            href="/#create-quiz"
            className="type-btn px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] text-primary shadow-primary hover:brightness-110 transition-all font-bold"
          >
            Take Another Quiz
          </Link>
          <Link
            href="/"
            className="type-btn px-8 py-4 rounded-xl bg-elevated border border-subtle hover:border-primary/50 transition-all font-bold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
