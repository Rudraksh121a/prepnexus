interface TimerBarProps {
  timeLeft: number;
  timeLimit: number;
  examName: string;
  topic: string;
  difficulty: string;
}

export default function TimerBar({
  timeLeft,
  timeLimit,
  examName,
  topic,
  difficulty,
}: TimerBarProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (timeLimit * 60)) * 100;
  const isLowTime = timeLeft <= timeLimit * 60 * 0.2; // Red when 20% or less time remains

  return (
    <header className="border-b border-subtle bg-surface/80 backdrop-blur-md sticky top-0 z-40">
      <div className="px-6 md:px-10 lg:px-14 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Exam Info */}
        <div className="flex flex-col gap-1">
          <h1 className="type-hero text-lg md:text-xl font-bold">{examName}</h1>
          <p className="type-hint text-xs text-secondary">
            {topic} • <span className="capitalize">{difficulty}</span>
          </p>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <div className="relative w-24 h-24">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="fill-none stroke-subtle"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`fill-none transition-all ${isLowTime ? "stroke-danger" : "stroke-primary"}`}
                strokeWidth="3"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`type-score text-xl font-bold ${isLowTime ? "text-danger" : "text-primary"}`}
                >
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </div>
                <div className="type-hint text-xs text-secondary">
                  Time Left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
