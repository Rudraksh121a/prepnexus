"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { Difficulty, QuestionCount, Question } from "@/types";

export default function QuizForm() {
  const router = useRouter();
  const setConfig = useQuizStore((state) => state.setConfig);

  const [examName, setExamName] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(5);
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
  const timeLimit = 5; // Default 5 minutes per quiz

  const [showPromptArea, setShowPromptArea] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGeneratePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const focus = additionalDetails
      ? ` with a specific focus on: ${additionalDetails}`
      : "";
    const sub = subtopic ? `, particularly ${subtopic}` : "";

    const prompt = `You are a master educational Quiz AI generator.
Generate ${questionCount} ${difficulty} difficulty multiple choice questions.
Topic: ${topic}${sub}${focus}.
Exam Context: ${examName}.

You MUST output ONLY a pure JSON array containing the questions, using this exact strict schema:
[
  {
    "id": "q-1",
    "text": "The question text goes here?",
    "options": [
      "Option A",
      "Option B", 
      "Option C",
      "Option D"
    ],
    "correctAnswer": 0
  }
]
Do NOT return markdown wrapping like \`\`\`json. Return ONLY the raw JSON array string.`;

    setPromptText(prompt);
    setShowPromptArea(true);
    setJsonInput("");
    setJsonError("");
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setJsonError("");

    if (!jsonInput.trim()) {
      setJsonError("Please paste the JSON output from your AI tool.");
      return;
    }

    try {
      let raw = jsonInput.trim();
      if (raw.startsWith("```json")) raw = raw.slice(7);
      if (raw.startsWith("```")) raw = raw.slice(3);
      if (raw.endsWith("```")) raw = raw.slice(0, -3);

      const parsed = JSON.parse(raw.trim()) as Question[];
      if (
        !Array.isArray(parsed) ||
        parsed.length === 0 ||
        !parsed[0].text ||
        !parsed[0].options ||
        parsed[0].correctAnswer === undefined
      ) {
        throw new Error("Invalid schema");
      }

      setIsSubmitting(true);
      setConfig({
        examName,
        topic,
        subtopic,
        additionalDetails,
        questionCount,
        difficulty,
        timeLimit,
        manualQuestions: parsed,
      });
      router.push("/quiz");
    } catch {
      setJsonError(
        "Invalid JSON format. Please ensure it strictly matches the requested schema.",
      );
    }
  };

  const handleBack = () => {
    setShowPromptArea(false);
    setPromptText("");
    setJsonInput("");
    setJsonError("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--primary-soft)] flex items-center justify-center border border-primary mb-4 glow-primary">
          <span className="text-2xl leading-none">✨</span>
        </div>
        <h2 className="type-hero mb-2 text-3xl md:text-4xl">
          Quiz{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-400)] via-[var(--calm-400)] to-[var(--primary-400)]">
            Configuration
          </span>
        </h2>
        <p className="type-question text-secondary text-sm md:text-base max-w-2xl">
          {showPromptArea
            ? "Copy the prompt below and paste it into ChatGPT or Claude, then paste the JSON output here."
            : "Fill in the details below to generate your AI quiz prompt."}
        </p>
      </div>

      {!showPromptArea ? (
        <form
          onSubmit={handleGeneratePrompt}
          className="flex flex-col gap-8 bg-surface/50 p-6 md:p-8 rounded-2xl border border-subtle shadow-md backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="examName" className="type-label">
                Exam / Category Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="examName"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g. SAT, AWS Dev..."
                required
                className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-muted"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="topic" className="type-label">
                Primary Topic <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Mathematics, React..."
                required
                className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-muted"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="subtopic" className="type-label">
                Subtopic{" "}
                <span className="text-muted lowercase tracking-normal">
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                id="subtopic"
                value={subtopic}
                onChange={(e) => setSubtopic(e.target.value)}
                placeholder="e.g. Algebra, Hooks..."
                className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-muted"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="additionalDetails" className="type-label">
                Additional Details{" "}
                <span className="text-muted lowercase tracking-normal">
                  (Optional)
                </span>
              </label>
              <input
                type="text"
                id="additionalDetails"
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Add focus area or any notes"
                className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-muted"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="type-label">Question Count</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count as QuestionCount)}
                  className={`py-3 rounded-lg flex flex-col items-center justify-center transition-all text-sm ${
                    questionCount === count
                      ? "bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] text-primary shadow-primary"
                      : "bg-elevated border border-subtle hover:border-primary/50"
                  }`}
                >
                  <span className="type-score text-lg font-bold">{count}</span>
                  <span className="type-hint text-xs mt-1">Questions</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="type-label">Difficulty</label>
            <div className="grid grid-cols-3 gap-3">
              {["easy", "moderate", "hard"].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff as Difficulty)}
                  className={`py-3 rounded-lg transition-all capitalize text-sm font-medium ${
                    difficulty === diff
                      ? "bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] text-primary shadow-primary"
                      : "bg-elevated border border-subtle hover:border-primary/50"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!examName || !topic}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] shadow-primary hover:brightness-110 active:scale-[0.98] transition-all text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Quiz Prompt
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleStartQuiz}
          className="flex flex-col gap-8 bg-surface/50 p-6 md:p-8 rounded-2xl border border-subtle shadow-md backdrop-blur-sm"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="prompt" className="type-label">
              Generated Prompt
            </label>
            <div className="relative">
              <textarea
                id="prompt"
                value={promptText}
                readOnly
                className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 outline-none transition-all placeholder-muted font-mono text-sm h-48 resize-none"
              />
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="absolute top-3 right-3 px-3 py-1 rounded text-xs bg-primary text-primary-light hover:brightness-110 transition-all"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="jsonInput" className="type-label">
              Paste JSON Response <span className="text-danger">*</span>
            </label>
            <textarea
              id="jsonInput"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste the JSON array output from ChatGPT or Claude here..."
              required
              className="type-option w-full px-4 py-3 rounded-md bg-elevated border border-subtle focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder-muted font-mono text-sm h-48 resize-none"
            />
            {jsonError && <p className="text-danger text-sm">{jsonError}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-8 py-4 rounded-xl bg-elevated border border-subtle hover:border-primary/50 transition-all text-lg font-bold"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--calm-600)] shadow-primary hover:brightness-110 active:scale-[0.98] transition-all text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Starting Quiz..." : "Start Quiz"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
