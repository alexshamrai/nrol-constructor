import type { EquipmentItem, EquipmentPreset, Exercise, ExerciseAvailability } from '../types';

export const equipmentItems: { id: EquipmentItem; nameEn: string; nameUa: string }[] = [
  { id: 'bodyweight', nameEn: 'Bodyweight', nameUa: 'Власна вага' },
  { id: 'dumbbells', nameEn: 'Dumbbells', nameUa: 'Гантелі' },
  { id: 'barbell', nameEn: 'Barbell + Rack', nameUa: 'Штанга + стійка' },
  { id: 'trx', nameEn: 'TRX / Suspension Trainer', nameUa: 'TRX / Петлі' },
  { id: 'pull_up_bar', nameEn: 'Pull-up Bar', nameUa: 'Турнік' },
  { id: 'resistance_bands', nameEn: 'Resistance Bands', nameUa: 'Резинові еспандери' },
  { id: 'pull_up_assist_band', nameEn: 'Pull-up Assist Band', nameUa: 'Резина для підтягувань' },
  { id: 'step_box', nameEn: 'Step / Box', nameUa: 'Степ / Тумба' },
  { id: 'bench', nameEn: 'Bench', nameUa: 'Лавка для жиму' },
  { id: 'swiss_ball', nameEn: 'Swiss Ball', nameUa: 'Фітбол' },
  { id: 'cable_machine', nameEn: 'Cable Machine', nameUa: 'Кабельний тренажер' },
  { id: 'kettlebell', nameEn: 'Kettlebell', nameUa: 'Гиря' },
];

export const equipmentPresets: EquipmentPreset[] = [
  {
    id: 'home_basic',
    nameEn: 'Home Gym Basic',
    nameUa: 'Домашній зал (базовий)',
    items: ['bodyweight', 'dumbbells', 'pull_up_bar', 'resistance_bands'],
  },
  {
    id: 'home_full',
    nameEn: 'Home Gym Full',
    nameUa: 'Домашній зал (повний)',
    items: ['bodyweight', 'dumbbells', 'trx', 'pull_up_bar', 'resistance_bands', 'pull_up_assist_band', 'step_box'],
  },
  {
    id: 'home_plus_bench',
    nameEn: 'Home Gym + Bench',
    nameUa: 'Домашній зал + лавка',
    items: ['bodyweight', 'dumbbells', 'trx', 'pull_up_bar', 'resistance_bands', 'pull_up_assist_band', 'step_box', 'bench'],
  },
  {
    id: 'commercial',
    nameEn: 'Commercial Gym',
    nameUa: 'Тренажерний зал',
    items: ['bodyweight', 'dumbbells', 'barbell', 'trx', 'pull_up_bar', 'resistance_bands', 'pull_up_assist_band', 'step_box', 'bench', 'cable_machine', 'kettlebell'],
  },
];

export function getExerciseAvailability(exercise: Exercise, userEquipment: EquipmentItem[]): ExerciseAvailability {
  // bodyweight exercises always available
  if (exercise.equipment.length === 0 || (exercise.equipment.length === 1 && exercise.equipment[0] === 'bodyweight')) {
    return 'available';
  }

  const hasAll = exercise.equipment.every(eq => eq === 'bodyweight' || userEquipment.includes(eq));
  if (hasAll) return 'available';

  // Check if adaptation exists
  if (exercise.adaptationEn) return 'adaptation';

  return 'unavailable';
}
