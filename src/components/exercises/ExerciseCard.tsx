import { useTranslation } from 'react-i18next';
import type { Exercise, ExerciseAvailability } from '../../types';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { Badge } from '../common/Badge';
import { equipmentItems } from '../../data/equipment';
import { useStore } from '../../store/useStore';

interface ExerciseCardProps {
  exercise: Exercise;
  availability: ExerciseAvailability;
  onClick?: () => void;
}

const availabilityIcon: Record<ExerciseAvailability, string> = {
  available: '\u2705',
  adaptation: '\uD83D\uDD04',
  unavailable: '\u274C',
};

export function ExerciseCard({ exercise, availability, onClick }: ExerciseCardProps) {
  const { t } = useTranslation();
  const localized = useLocalizedField();
  const theme = useStore((s) => s.theme);
  const isLight = theme === 'light';

  const equipmentNames = exercise.equipment.map((eqId) => {
    const item = equipmentItems.find((ei) => ei.id === eqId);
    return item ? localized.name(item) : eqId;
  });

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className="border rounded-lg p-4 transition cursor-pointer flex flex-col gap-2 hover:opacity-90"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
    >
      {/* Top row: Level + Pattern + Availability */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="bt">
          L{exercise.level}
        </Badge>
        <Badge variant="hyp">
          {t(`patterns.${exercise.pattern}`)}
        </Badge>
        <Badge variant={availability}>
          {availabilityIcon[availability]}
        </Badge>
      </div>

      {/* Exercise name */}
      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {localized.name(exercise)}
      </h3>

      {/* Description (truncated) */}
      <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
        {localized.description(exercise)}
      </p>

      {/* Equipment tags */}
      {equipmentNames.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {equipmentNames.map((name) => (
            <span
              key={name}
              className="inline-block rounded px-1.5 py-0.5 text-[10px]"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
            >
              {name}
            </span>
          ))}
        </div>
      )}

      {/* Best for tags */}
      {exercise.bestFor.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {exercise.bestFor.map((tag) => (
            <span
              key={tag}
              className={`inline-block rounded px-1.5 py-0.5 text-[10px] ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-400'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Adaptation note */}
      {availability === 'adaptation' && exercise.adaptationEn && (
        <div className={`mt-1 rounded border px-2 py-1 text-xs ${isLight ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-yellow-900/30 border-yellow-800 text-yellow-300'}`}>
          {t('exercises.adaptation')}:{' '}
          {localized.description({
            descriptionEn: exercise.adaptationEn,
            descriptionUa: exercise.adaptationUa ?? exercise.adaptationEn,
          })}
        </div>
      )}
    </div>
  );
}
