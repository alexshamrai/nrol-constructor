import type { PeriodizationConfig } from '../types';

// Hyp I periodization
export const hyp1Periodization: { undulating: PeriodizationConfig; linear: PeriodizationConfig } = {
  undulating: {
    mode: 'undulating',
    undulating: {
      weeks: [
        { weekNumber: 1, workoutA: { sets: 4, reps: 6, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 12, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 2, workoutA: { sets: 2, reps: 20, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 6, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 3, workoutA: { sets: 3, reps: 12, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 20, restSeconds: 30, intensity: 'light' } },
        { weekNumber: 4, workoutA: { sets: 4, reps: 6, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 12, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 5, workoutA: { sets: 2, reps: 20, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 6, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 6, workoutA: { sets: 3, reps: 12, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 20, restSeconds: 30, intensity: 'light' } },
      ],
    },
  },
  linear: {
    mode: 'linear',
    linear: [
      { sessions: [1, 4], sets: 2, reps: 20, restSeconds: 30, labelEn: 'Light (2×20)', labelUa: 'Легка (2×20)' },
      { sessions: [5, 8], sets: 3, reps: 12, restSeconds: 60, labelEn: 'Medium (3×12)', labelUa: 'Середня (3×12)' },
      { sessions: [9, 12], sets: 4, reps: 6, restSeconds: 90, labelEn: 'Heavy (4×6)', labelUa: 'Важка (4×6)' },
    ],
  },
};

// Hyp II periodization
export const hyp2Periodization: { undulating: PeriodizationConfig; linear: PeriodizationConfig } = {
  undulating: {
    mode: 'undulating',
    undulating: {
      weeks: [
        { weekNumber: 1, workoutA: { sets: 4, reps: 4, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 8, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 2, workoutA: { sets: 2, reps: 12, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 4, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 3, workoutA: { sets: 3, reps: 8, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 12, restSeconds: 30, intensity: 'light' } },
        { weekNumber: 4, workoutA: { sets: 4, reps: 4, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 8, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 5, workoutA: { sets: 2, reps: 12, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 4, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 6, workoutA: { sets: 3, reps: 8, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 12, restSeconds: 30, intensity: 'light' } },
      ],
    },
  },
  linear: {
    mode: 'linear',
    linear: [
      { sessions: [1, 4], sets: 2, reps: 12, restSeconds: 30, labelEn: 'Moderate (2×12)', labelUa: 'Помірна (2×12)' },
      { sessions: [5, 8], sets: 3, reps: 8, restSeconds: 60, labelEn: 'Heavy (3×8)', labelUa: 'Важка (3×8)' },
      { sessions: [9, 12], sets: 4, reps: 4, restSeconds: 90, labelEn: 'Max (4×4)', labelUa: 'Макс. (4×4)' },
    ],
  },
};

// Hyp III periodization
export const hyp3Periodization: { undulating: PeriodizationConfig; linear: PeriodizationConfig } = {
  undulating: {
    mode: 'undulating',
    undulating: {
      weeks: [
        { weekNumber: 1, workoutA: { sets: 4, reps: 5, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 10, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 2, workoutA: { sets: 2, reps: 15, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 5, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 3, workoutA: { sets: 3, reps: 10, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 15, restSeconds: 30, intensity: 'light' } },
        { weekNumber: 4, workoutA: { sets: 4, reps: 5, restSeconds: 90, intensity: 'heavy' }, workoutB: { sets: 3, reps: 10, restSeconds: 60, intensity: 'medium' } },
        { weekNumber: 5, workoutA: { sets: 2, reps: 15, restSeconds: 30, intensity: 'light' }, workoutB: { sets: 4, reps: 5, restSeconds: 90, intensity: 'heavy' } },
        { weekNumber: 6, workoutA: { sets: 3, reps: 10, restSeconds: 60, intensity: 'medium' }, workoutB: { sets: 2, reps: 15, restSeconds: 30, intensity: 'light' } },
      ],
    },
  },
  linear: {
    mode: 'linear',
    linear: [
      { sessions: [1, 4], sets: 2, reps: 15, restSeconds: 30, labelEn: 'Moderate (2×15)', labelUa: 'Помірна (2×15)' },
      { sessions: [5, 8], sets: 3, reps: 10, restSeconds: 60, labelEn: 'Heavy (3×10)', labelUa: 'Важка (3×10)' },
      { sessions: [9, 12], sets: 4, reps: 5, restSeconds: 90, labelEn: 'Very Heavy (4×5)', labelUa: 'Дуже важка (4×5)' },
    ],
  },
};

// Wave loading for S&P III
export interface WaveLoadingSession {
  sessionNumber: 1 | 2 | 3;
  wave1: { reps: number[] }; // e.g., [7, 5, 3]
  wave2: { reps: number[] }; // e.g., [7, 5, 3] but heavier
  labelEn: string;
  labelUa: string;
}

export const waveLoadingSessions: WaveLoadingSession[] = [
  { sessionNumber: 1, wave1: { reps: [7, 5, 3] }, wave2: { reps: [7, 5, 3] }, labelEn: 'Workout 1: 7-5-3, 7-5-3', labelUa: 'Тренування 1: 7-5-3, 7-5-3' },
  { sessionNumber: 2, wave1: { reps: [6, 4, 2] }, wave2: { reps: [6, 4, 2] }, labelEn: 'Workout 2: 6-4-2, 6-4-2', labelUa: 'Тренування 2: 6-4-2, 6-4-2' },
  { sessionNumber: 3, wave1: { reps: [5, 3, 1] }, wave2: { reps: [5, 3, 1] }, labelEn: 'Workout 3: 5-3-1, 5-3-1 (1RM attempts!)', labelUa: 'Тренування 3: 5-3-1, 5-3-1 (спроба 1RM!)' },
];

// Rest period rules from the book
export function getRestSeconds(reps: number, isMaxStrength: boolean): number {
  if (isMaxStrength) return 120; // 2+ minutes
  if (reps >= 12) return 30;
  if (reps >= 8) return 60;
  if (reps >= 4) return 90;
  return 120; // very heavy
}
