export type Difficulty = 'easy' | 'moderate' | 'hard';
export type QuestionCount = 5 | 10;

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
}

export interface QuizConfig {
    examName: string;
    topic: string;
    subtopic?: string;
    additionalDetails?: string;
    questionCount: number;
    difficulty: Difficulty;
    timeLimit: number;
    manualQuestions?: Question[];
}

export interface QuizResults {
    score: number;
    total: number;
    timeTaken: number;
    topic: string;
    difficulty: Difficulty;
    accuracy: number;
    questions?: Question[];
    answers?: Record<number, number>;
}

export interface QuizHistoryItem {
    id: string;
    examName: string;
    topic: string;
    difficulty: Difficulty;
    score: number;
    total: number;
    timeTaken: number;
    date: string;
    questions?: Question[];
    answers?: Record<number, number>;
}
