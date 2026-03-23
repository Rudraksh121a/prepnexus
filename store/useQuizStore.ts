import { create } from 'zustand';
import { QuizConfig, QuizResults } from '@/types';

interface QuizState {
    // Current Configuration parameters from the Dashboard
    config: QuizConfig | null;

    // Results calculated post-quiz
    results: QuizResults | null;

    // Actions
    setConfig: (config: QuizConfig) => void;
    setResults: (results: QuizResults) => void;
    clearQuizState: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
    config: null,
    results: null,
    setConfig: (config) => set({ config }),
    setResults: (results) => set({ results }),
    clearQuizState: () => set({ config: null, results: null }),
}));
