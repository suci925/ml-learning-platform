import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChapterProgress {
  chapterId: number;
  completed: boolean;
  quizPassed: boolean;
  quizScore: number;
  lastVisited: string | null;
}

interface ProgressState {
  chapters: Record<number, ChapterProgress>;
  markChapterRead: (chapterId: number) => void;
  markQuizPassed: (chapterId: number, score: number) => void;
  getOverallProgress: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      chapters: {},
      markChapterRead: (chapterId) =>
        set((state) => ({
          chapters: {
            ...state.chapters,
            [chapterId]: {
              ...state.chapters[chapterId],
              chapterId,
              completed: true,
              lastVisited: new Date().toISOString(),
            },
          },
        })),
      markQuizPassed: (chapterId, score) =>
        set((state) => ({
          chapters: {
            ...state.chapters,
            [chapterId]: {
              ...state.chapters[chapterId],
              chapterId,
              quizPassed: true,
              quizScore: score,
            },
          },
        })),
      getOverallProgress: () => {
        const state = get();
        const completed = Object.values(state.chapters).filter((c) => c.completed).length;
        return Math.round((completed / 16) * 100);
      },
    }),
    { name: 'ml-learning-progress' }
  )
);
