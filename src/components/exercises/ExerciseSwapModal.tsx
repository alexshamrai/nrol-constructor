import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { WorkoutSlot, ExerciseAvailability, ProgramPhase } from '../../types';
import { exercises } from '../../data/exercises';
import { equipmentItems, getExerciseAvailability } from '../../data/equipment';
import { useStore } from '../../store/useStore';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useThemeClass } from '../../hooks/useThemeClass';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

interface ExerciseSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: WorkoutSlot;
  currentExerciseId?: string;
  onSelect: (exerciseId: string) => void;
  phase?: ProgramPhase;
}

const phaseLevelRange: Record<ProgramPhase, [number, number]> = {
  basic_training: [1, 2.5],
  hypertrophy: [2, 4],
  strength_power: [3, 5],
};

const availabilityOrder: Record<ExerciseAvailability, number> = {
  available: 0,
  adaptation: 1,
  unavailable: 2,
};

export function ExerciseSwapModal({
  isOpen,
  onClose,
  slot,
  currentExerciseId,
  onSelect,
  phase,
}: ExerciseSwapModalProps) {
  const { t } = useTranslation();
  const loc = useLocalizedField();
  const tc = useThemeClass();
  const equipment = useStore((s) => s.equipment);

  const matchingExercises = useMemo(() => {
    const isCore =
      slot.pattern === 'core_stability' || slot.pattern === 'core_dynamic';

    const filtered = exercises.filter((ex) => {
      if (ex.pattern !== slot.pattern) return false;
      // Direction match for push/pull (skip for core)
      if (!isCore && slot.direction && ex.direction !== slot.direction) return false;
      return true;
    });

    // Sort: available first, then adaptation, then unavailable. Within group, by level.
    return filtered.sort((a, b) => {
      const availA = getExerciseAvailability(a, equipment);
      const availB = getExerciseAvailability(b, equipment);
      const orderDiff = availabilityOrder[availA] - availabilityOrder[availB];
      if (orderDiff !== 0) return orderDiff;
      return a.level - b.level;
    });
  }, [slot, equipment]);

  const isRecommended = (level: number): boolean => {
    if (!phase) return false;
    const [min, max] = phaseLevelRange[phase];
    return level >= min && level <= max;
  };

  const handleSelect = (exerciseId: string) => {
    onSelect(exerciseId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${t('programs.swapExercise')} — ${slot.category}`}
      size="xl"
    >
      <div className="max-h-[60vh] overflow-y-auto space-y-2 -mx-1 px-1">
        {matchingExercises.length === 0 && (
          <p className="py-8 text-center" style={{ color: 'var(--text-muted)' }}>{t('common.noResults')}</p>
        )}

        {matchingExercises.map((ex) => {
          const availability = getExerciseAvailability(ex, equipment);
          const isCurrent = ex.id === currentExerciseId;
          const recommended = isRecommended(ex.level);

          const eqNames = ex.equipment.map((eqId) => {
            const item = equipmentItems.find((ei) => ei.id === eqId);
            return item ? loc.name(item) : eqId;
          });

          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => handleSelect(ex.id)}
              className={[
                'w-full text-left rounded-lg border p-3 transition-colors',
                isCurrent
                  ? tc.selectedRing
                  : 'hover:opacity-90',
              ].join(' ')}
              style={isCurrent ? undefined : {
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-secondary)',
              }}
            >
              {/* Top row: badges */}
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <Badge variant="bt">L{ex.level}</Badge>
                <Badge variant={availability}>{t(`equipment.${availability}`)}</Badge>
                {ex.coreGoal && <Badge variant="sp">{ex.coreGoal}</Badge>}
                {recommended && (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${tc.blue}`}>
                    {t('exercises.recommended', 'Recommended')}
                  </span>
                )}
                {isCurrent && (
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${tc.green}`}>
                    Current
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {loc.name(ex)}
              </div>

              {/* Description (truncated) */}
              <p className="text-xs line-clamp-2 mb-1.5" style={{ color: 'var(--text-muted)' }}>
                {loc.description(ex)}
              </p>

              {/* Equipment pills */}
              {eqNames.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {eqNames.map((name) => (
                    <span
                      key={name}
                      className="inline-block rounded px-1.5 py-0.5 text-[10px]"
                      style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              )}

              {/* Adaptation note */}
              {availability === 'adaptation' && ex.adaptationEn && (
                <div className={`mt-1 rounded border px-2 py-1 text-xs ${tc.yellow}`}>
                  {t('exercises.adaptation')}:{' '}
                  {loc.description({
                    descriptionEn: ex.adaptationEn,
                    descriptionUa: ex.adaptationUa ?? ex.adaptationEn,
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
