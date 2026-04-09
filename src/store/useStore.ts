import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  EquipmentItem,
  ConfiguredProgram,
  TrainingPlan,
  ProgramId,
} from '../types';

interface AppState {
  // Equipment
  equipment: EquipmentItem[];
  setEquipment: (items: EquipmentItem[]) => void;
  toggleEquipment: (item: EquipmentItem) => void;

  // Configured programs
  configuredPrograms: ConfiguredProgram[];
  addConfiguredProgram: (program: ConfiguredProgram) => void;
  updateConfiguredProgram: (programId: ProgramId, updates: Partial<ConfiguredProgram>) => void;
  removeConfiguredProgram: (programId: ProgramId) => void;

  // Training plans
  trainingPlans: TrainingPlan[];
  activeTrainingPlanId: string | null;
  addTrainingPlan: (plan: TrainingPlan) => void;
  updateTrainingPlan: (id: string, updates: Partial<TrainingPlan>) => void;
  removeTrainingPlan: (id: string) => void;
  setActiveTrainingPlan: (id: string | null) => void;

  // UI state
  language: 'en' | 'ua';
  setLanguage: (lang: 'en' | 'ua') => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Equipment - default home gym full
      equipment: [
        'bodyweight',
        'dumbbells',
        'trx',
        'pull_up_bar',
        'resistance_bands',
        'pull_up_assist_band',
        'step_box',
      ],
      setEquipment: (items) => set({ equipment: items }),
      toggleEquipment: (item) =>
        set((state) => ({
          equipment: state.equipment.includes(item)
            ? state.equipment.filter((e) => e !== item)
            : [...state.equipment, item],
        })),

      // Configured programs
      configuredPrograms: [],
      addConfiguredProgram: (program) =>
        set((state) => ({
          configuredPrograms: [...state.configuredPrograms, program],
        })),
      updateConfiguredProgram: (programId, updates) =>
        set((state) => ({
          configuredPrograms: state.configuredPrograms.map((p) =>
            p.programId === programId ? { ...p, ...updates } : p
          ),
        })),
      removeConfiguredProgram: (programId) =>
        set((state) => ({
          configuredPrograms: state.configuredPrograms.filter(
            (p) => p.programId !== programId
          ),
        })),

      // Training plans
      trainingPlans: [],
      activeTrainingPlanId: null,
      addTrainingPlan: (plan) =>
        set((state) => ({
          trainingPlans: [...state.trainingPlans, plan],
        })),
      updateTrainingPlan: (id, updates) =>
        set((state) => ({
          trainingPlans: state.trainingPlans.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removeTrainingPlan: (id) =>
        set((state) => ({
          trainingPlans: state.trainingPlans.filter((p) => p.id !== id),
        })),
      setActiveTrainingPlan: (id) => set({ activeTrainingPlanId: id }),

      // UI
      language: 'en',
      setLanguage: (language) => set({ language }),
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'nrol-constructor-storage',
      partialize: (state) => ({
        equipment: state.equipment,
        configuredPrograms: state.configuredPrograms,
        trainingPlans: state.trainingPlans,
        activeTrainingPlanId: state.activeTrainingPlanId,
        language: state.language,
        theme: state.theme,
      }),
    }
  )
);
