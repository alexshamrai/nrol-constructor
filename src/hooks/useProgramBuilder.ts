import { useState, useCallback, useMemo } from 'react';
import { programs } from '../data/programs';
import { exercises } from '../data/exercises';
import { useStore } from '../store/useStore';
import type {
  ProgramId,
  ProgramPhase,
  WorkoutSlot,
  ConfiguredWorkout,
} from '../types';

/**
 * Target exercise level ranges per program phase.
 * Lower-level exercises for basic training, higher for strength/power.
 */
const phaseLevelRange: Record<ProgramPhase, [number, number]> = {
  basic_training: [1, 2.5],
  hypertrophy: [2, 4],
  strength_power: [3, 5],
};

interface UseProgramBuilderResult {
  /** Workout configurations with exercise selections */
  workouts: ConfiguredWorkout[];
  /** Set a specific exercise for a given workout + slot */
  setExercise: (workoutId: string, slotOrder: string, exerciseId: string) => void;
  /** Auto-populate all slots based on available equipment and program phase */
  autoPopulate: () => void;
  /** Get the selected exercise id for a given slot */
  getExerciseForSlot: (workoutId: string, slotOrder: string) => string | undefined;
}

export function useProgramBuilder(programId: ProgramId): UseProgramBuilderResult {
  const program = useMemo(
    () => programs.find((p) => p.id === programId),
    [programId],
  );

  const equipment = useStore((s) => s.equipment);

  // State: one ConfiguredWorkout per workout template
  const [workouts, setWorkouts] = useState<ConfiguredWorkout[]>(() =>
    (program?.workouts ?? []).map((w) => ({
      templateId: w.id,
      exerciseSelections: {},
    })),
  );

  const setExercise = useCallback(
    (workoutId: string, slotOrder: string, exerciseId: string) => {
      setWorkouts((prev) =>
        prev.map((cw) =>
          cw.templateId === workoutId
            ? {
                ...cw,
                exerciseSelections: {
                  ...cw.exerciseSelections,
                  [slotOrder]: exerciseId,
                },
              }
            : cw,
        ),
      );
    },
    [],
  );

  const getExerciseForSlot = useCallback(
    (workoutId: string, slotOrder: string): string | undefined => {
      const cw = workouts.find((w) => w.templateId === workoutId);
      return cw?.exerciseSelections[slotOrder];
    },
    [workouts],
  );

  const autoPopulate = useCallback(() => {
    if (!program) return;

    const phase = program.phase;
    const [minLevel, maxLevel] = phaseLevelRange[phase];

    const newWorkouts = program.workouts.map((wt) => {
      const selections: Record<string, string> = {};

      for (const slot of wt.slots) {
        const best = pickExercise(slot, equipment, minLevel, maxLevel);
        if (best) {
          selections[slot.order] = best.id;
        }
      }

      return { templateId: wt.id, exerciseSelections: selections };
    });

    setWorkouts(newWorkouts);
  }, [program, equipment]);

  return { workouts, setExercise, autoPopulate, getExerciseForSlot };
}

/**
 * Pick the best exercise for a slot based on:
 * 1. Matching pattern + direction
 * 2. Available equipment
 * 3. Closest level to the middle of the phase range
 */
function pickExercise(
  slot: WorkoutSlot,
  userEquipment: string[],
  minLevel: number,
  maxLevel: number,
) {
  const targetLevel = (minLevel + maxLevel) / 2;

  // Find exercises matching the slot's pattern and direction
  const candidates = exercises.filter((ex) => {
    if (ex.pattern !== slot.pattern) return false;

    // Direction match for push/pull
    if (slot.direction && ex.direction !== slot.direction) return false;

    // Equipment check: user must have all required pieces (bodyweight is always available)
    const hasEquipment = ex.equipment.every(
      (eq) => eq === 'bodyweight' || userEquipment.includes(eq),
    );
    if (!hasEquipment) return false;

    // Level within phase range (with some tolerance)
    if (ex.level < minLevel - 0.5 || ex.level > maxLevel + 0.5) return false;

    return true;
  });

  if (candidates.length === 0) {
    // Fallback: try without level restriction
    const fallback = exercises.filter((ex) => {
      if (ex.pattern !== slot.pattern) return false;
      if (slot.direction && ex.direction !== slot.direction) return false;
      return ex.equipment.every(
        (eq) => eq === 'bodyweight' || userEquipment.includes(eq),
      );
    });

    if (fallback.length === 0) return null;

    // Pick closest to target level
    return fallback.reduce((best, cur) =>
      Math.abs(cur.level - targetLevel) < Math.abs(best.level - targetLevel) ? cur : best,
    );
  }

  // Pick the one closest to the target level
  return candidates.reduce((best, cur) =>
    Math.abs(cur.level - targetLevel) < Math.abs(best.level - targetLevel) ? cur : best,
  );
}
