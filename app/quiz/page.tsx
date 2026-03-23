"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { Question } from "@/types";
import TimerBar from "@/components/quiz/TimerBar";
import QuestionPalette from "@/components/quiz/QuestionPalette";
// History saving handled locally

export default function QuizEngine() {
  const router = useRouter();

  const config = useQuizStore((state) => state.config);
  const setResults = useQuizStore((state) => state.setResults);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(
    new Set(),
  );
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!config) {
      console.warn("No active quiz configuration found. Redirecting to home.");
      router.replace("/");
      return;
    }

    setTimeLeft(config.timeLimit * 60);

    // Load manual questions provided from the JSON paste step
    if (config.manualQuestions && config.manualQuestions.length > 0) {
      setQuestions(config.manualQuestions);
    }
    setLoading(false);
  }, [config, router]);

  // Timer tick
  useEffect(() => {
    if (!config) return;
    if (timeLeft <= 0) {
      if (questions.length > 0 && !isSubmitting) {
        handleSubmit();
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, config]);

  // Track visited questions
  useEffect(() => {
    setVisited((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentIndex);
      return newSet;
    });
  }, [currentIndex]);

  const currentQ = questions[currentIndex];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!questions.length || !currentQ) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (currentIndex < questions.length - 1) {
            handleNext();
          } else if (currentIndex === questions.length - 1) {
            handleSubmit();
          }
          break;
        case "Enter":
          e.preventDefault();
          if (currentIndex === questions.length - 1) {
            handleSubmit();
          } else {
            handleNext();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          e.preventDefault();
          const optionIndex = parseInt(e.key) - 1;
          if (optionIndex < currentQ.options.length) {
            handleOptionSelect(optionIndex);
          }
          break;
        case "m":
        case "M":
          e.preventDefault();
          handleMarkReview();
          break;
        case "c":
        case "C":
          e.preventDefault();
          handleClearResponse();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions, currentQ]);

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentIndex];
      return newAnswers;
    });
  };

  const handleMarkReview = () => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!config || isSubmitting) return;
    setIsSubmitting(true);

    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });

    const baseTimeSeconds = config.timeLimit * 60;
    const timeTaken = baseTimeSeconds - timeLeft;
    const accuracy = (score / questions.length) * 100;

    // Save to localStorage history
    const historyItem = {
      id: `quiz-${Date.now()}`,
      examName: config.examName,
      topic: config.topic,
      difficulty: config.difficulty,
      score,
      total: questions.length,
      timeTaken,
      accuracy,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      questions,
      answers,
    };

    // Save to localStorage
    try {
      const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
      history.push(historyItem);
      localStorage.setItem("quizHistory", JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history:", e);
    }

    setResults({
      score,
      total: questions.length,
      timeTaken,
      topic: config.topic,
      difficulty: config.difficulty,
      accuracy,
      questions,
      answers,
    });

    router.replace("/analysis");
  };

  if (!config) return null;

  if (loading) {
    return (
      <main className="flex h-screen w-full items-center justify-center gradient-bg flex-col gap-4">
        <div className="w-12 h-12 border-4 border-subtle border-t-primary rounded-full animate-spin glow-primary"></div>
        <div className="type-label text-secondary animate-pulse">
          Initializing Cognitive Diagnostic Test...
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex h-screen w-full items-center justify-center gradient-bg flex-col gap-4 text-center">
        <h2 className="type-hero text-2xl text-danger glow-danger">
          No Questions Found
        </h2>
        <p className="type-question text-secondary max-w-sm">
          No quiz questions were loaded. Please go back and paste the AI JSON
          output.
        </p>
        <button
          onClick={() => router.replace("/")}
          className="type-btn px-6 py-2 mt-4 rounded-lg bg-surface border border-subtle"
        >
          Return Home
        </button>
      </main>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full gradient-bg overflow-hidden text-primary selection-brand">
      <TimerBar
        timeLeft={timeLeft}
        timeLimit={config.timeLimit}
        examName={config.examName}
        topic={config.topic}
        difficulty={config.difficulty}
      />

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Area: Question Display */}
        <section className="flex-1 overflow-y-auto w-full relative flex flex-col">
          <div className="p-6 md:p-10 lg:p-14 flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="type-hero text-2xl text-calm glow-primary">
                Question {currentIndex + 1}
              </span>
              <div className="hidden md:flex items-center gap-2 text-xs text-muted bg-elevated px-3 py-1 rounded-full">
                <span>⌨️</span>
                <span>
                  Arrows: navigate | Enter: next/submit | 1-4: select | M: mark
                  | C: clear
                </span>
              </div>
            </div>

            <div className="type-question text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 tracking-wide text-primary border-l-2 border-primary pl-4">
              {currentQ.text}
            </div>

            <div className="flex flex-col gap-4 max-w-3xl">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentIndex] === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    className={`
                      w-full text-left p-5 rounded-xl border transition-all flex items-start gap-4 hover:-translate-y-1 group
                      ${
                        isSelected
                          ? "bg-[var(--primary-soft)] border-primary glow-primary"
                          : "bg-elevated border-subtle hover:border-primary-500 hover:bg-overlay"
                      }
                    `}
                    title={`Keyboard shortcut: ${i + 1}`}
                  >
                    <div
                      className={`
                      flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center type-score text-sm transition-colors
                      ${isSelected ? "border-primary bg-primary text-[var(--bg-base)]" : "border-subtle text-secondary"}
                    `}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span
                      className={`type-option text-[15px] pt-1 flex-1 ${isSelected ? "text-primary" : "text-secondary"}`}
                    >
                      {opt}
                    </span>
                    <span className="type-hint text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 px-2 py-1 rounded bg-subtle text-muted">
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-subtle bg-surface/50 backdrop-blur-md p-4 px-6 md:px-10 flex gap-4 md:justify-between items-center sm:flex-row flex-col-reverse justify-center sticky bottom-0">
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleMarkReview}
                className="type-btn flex-1 sm:flex-none px-4 md:px-6 py-3 rounded-lg bg-elevated border border-subtle hover:border-warn hover:text-warn text-secondary transition-all text-xs md:text-sm"
                title="Keyboard: M"
              >
                Mark Review
              </button>
              <button
                onClick={handleClearResponse}
                className="type-btn flex-1 sm:flex-none px-4 md:px-6 py-3 rounded-lg bg-elevated border border-subtle hover:border-danger hover:text-danger text-secondary transition-all text-xs md:text-sm"
                title="Keyboard: C"
              >
                Clear
              </button>
            </div>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="type-btn w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[var(--success-600)] to-[var(--primary-600)] text-success shadow-primary hover:brightness-110 transition-all font-bold"
                title="Keyboard: Enter"
              >
                Submit Quiz ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="type-btn w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] text-primary shadow-primary hover:brightness-110 transition-all font-bold"
                title="Keyboard: Enter or Right Arrow"
              >
                Save & Next <span>→</span>
              </button>
            )}
          </div>
        </section>

        <QuestionPalette
          questions={questions}
          visited={visited}
          answers={answers}
          markedForReview={markedForReview}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          handleSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
