// Movement patterns from the book
export type MovementPattern =
  | 'squat'
  | 'hinge'
  | 'push'
  | 'pull'
  | 'lunge'
  | 'single_leg_stance'
  | 'core_stability'
  | 'core_dynamic'
  | 'combination'
  | 'power';

export type PushDirection = 'horizontal' | 'vertical';
export type PullDirection = 'horizontal' | 'vertical';

// Core exercise goals from the book
export type CoreGoal = 'AE' | 'ALF' | 'AR' | 'HF';
// AE = anti-extension, ALF = anti-lateral flexion, AR = anti-rotation, HF = hip flexion

export type EquipmentItem =
  | 'dumbbells'
  | 'barbell'
  | 'trx'
  | 'pull_up_bar'
  | 'bench'
  | 'resistance_bands'
  | 'pull_up_assist_band'
  | 'step_box'
  | 'swiss_ball'
  | 'cable_machine'
  | 'kettlebell'
  | 'bodyweight';

export type ExerciseAvailability = 'available' | 'adaptation' | 'unavailable';

export interface Exercise {
  id: string;
  pattern: MovementPattern;
  level: number; // e.g., 1, 1.5, 2, 2.5, 3, 4, 5
  nameEn: string;
  nameUa: string;
  descriptionEn: string;
  descriptionUa: string;
  direction?: PushDirection | PullDirection; // for push/pull
  coreGoal?: CoreGoal; // for core exercises
  equipment: EquipmentItem[]; // required equipment
  bestFor: string[]; // e.g., ['BT I', 'Hyp (all reps)']
  adaptationEn?: string; // how to adapt if missing equipment
  adaptationUa?: string;
}

export type ProgramPhase = 'basic_training' | 'hypertrophy' | 'strength_power';

export type ProgramId =
  | 'bt1'
  | 'bt2'
  | 'bt3'
  | 'bt4'
  | 'hyp1'
  | 'hyp2'
  | 'hyp3'
  | 'sp1'
  | 'sp2'
  | 'sp3';

// Periodization mode selector for Hypertrophy programs
export type PeriodizationMode = 'undulating' | 'linear';

// Linear: sessions progress through phases sequentially
export interface LinearPhase {
  sessions: [number, number]; // session range, e.g. [1, 4]
  sets: number;
  reps: number;
  restSeconds: number;
  labelEn: string;
  labelUa: string;
}

// Undulating (original from book): A and B NEVER have the same scheme in the same "week"
export interface UndulatingWeek {
  weekNumber: number;
  workoutA: {
    sets: number;
    reps: number;
    restSeconds: number;
    intensity: 'heavy' | 'light' | 'medium';
  };
  workoutB: {
    sets: number;
    reps: number;
    restSeconds: number;
    intensity: 'heavy' | 'light' | 'medium';
  };
}

export interface UndulatingScheme {
  weeks: UndulatingWeek[];
}

// Combined periodization config
export interface PeriodizationConfig {
  mode: PeriodizationMode;
  linear?: LinearPhase[];
  undulating?: UndulatingScheme;
}

// Slot in a workout template
export interface WorkoutSlot {
  order: string; // e.g., 'Core 1', '1a', '2b', 'CX-1'
  category: string; // e.g., 'Stability', 'Squat', 'MAX: Hinge'
  pattern: MovementPattern;
  direction?: PushDirection | PullDirection;
  sets: string; // e.g., '2-3', '4', 'wave'
  reps: string; // e.g., '15', '6RM', '7-5-3'
  restSeconds?: number;
  isMaxStrength?: boolean;
  isGiantSet?: boolean;
  noteEn?: string;
  noteUa?: string;
}

export interface WorkoutTemplate {
  id: string; // e.g., 'bt1_a', 'sp3_c'
  label: string; // e.g., 'A', 'B', 'C', 'D'
  slots: WorkoutSlot[];
}

export interface MetabolicConfig {
  type: 'intervals' | 'complex' | 'metabolic_circuit' | 'free_zone';
  detailsEn: string;
  detailsUa: string;
}

export interface ProgramTemplate {
  id: ProgramId;
  phase: ProgramPhase;
  nameEn: string;
  nameUa: string;
  sessions: number; // total sessions (always 12)
  workoutsPerWeek: number; // always 3
  workouts: WorkoutTemplate[];
  periodization?: PeriodizationConfig;
  metabolic: MetabolicConfig;
  descriptionEn: string;
  descriptionUa: string;
  changesFromPrevEn: string;
  changesFromPrevUa: string;
}

// User's configured program (with exercises selected)
export interface ConfiguredWorkout {
  templateId: string;
  exerciseSelections: Record<string, string>; // slotOrder -> exerciseId
}

export interface ConfiguredProgram {
  programId: ProgramId;
  periodizationMode?: PeriodizationMode;
  startDate?: string;
  workouts: ConfiguredWorkout[];
  notes?: string;
}

// Long-term plan
export interface TrainingPlan {
  id: string;
  name: string;
  programs: ConfiguredProgram[];
  equipment: EquipmentItem[];
  createdAt: string;
}

// Equipment preset
export interface EquipmentPreset {
  id: string;
  nameEn: string;
  nameUa: string;
  items: EquipmentItem[];
}

// RAMP warmup (Chapter 17)
export type WarmupCategory =
  | 'range_of_motion'   // R — joint mobility
  | 'activation'         // A — wake up muscles
  | 'movement_prep'      // M — mobility drills
  | 'locomotion';        // M — locomotion drills (final adrenaline burst)

export interface WarmupExercise {
  id: string;
  category: WarmupCategory;
  nameEn: string;
  nameUa: string;
  sets: number;
  reps: string;
  descriptionEn: string;
  descriptionUa: string;
  // Book's progression hint — earliest phase where Alwyn introduces this exercise.
  // Lower = beginner-friendly (BT). Higher = more advanced (S&P).
  introducedIn: ProgramPhase;
}

// User's customized RAMP — list of enabled exercise ids in order.
export interface RampConfiguration {
  selectedIds: string[];
}
