import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import type { ExerciseAvailability, MovementPattern } from '../../types';
import { exercises } from '../../data/exercises';
import { CollapsibleEquipmentPanel } from '../equipment/CollapsibleEquipmentPanel';

const ALL_PATTERNS: MovementPattern[] = [
  'squat', 'hinge', 'push', 'pull', 'lunge',
  'single_leg_stance', 'core_stability', 'core_dynamic', 'combination', 'power',
];

function getUniqueLevels(): number[] {
  const levels = new Set(exercises.map((e) => e.level));
  return Array.from(levels).sort((a, b) => a - b);
}

interface ExerciseFilterProps {
  searchQuery: string;
  patternFilter: MovementPattern | 'all';
  levelFilter: number | 'all';
  availabilityFilter: ExerciseAvailability | 'all';
  setSearchQuery: (value: string) => void;
  setPatternFilter: (value: MovementPattern | 'all') => void;
  setLevelFilter: (value: number | 'all') => void;
  setAvailabilityFilter: (value: ExerciseAvailability | 'all') => void;
  onReset: () => void;
}

export function ExerciseFilter({
  searchQuery,
  patternFilter,
  levelFilter,
  availabilityFilter,
  setSearchQuery,
  setPatternFilter,
  setLevelFilter,
  setAvailabilityFilter,
  onReset,
}: ExerciseFilterProps) {
  const { t } = useTranslation();
  const uniqueLevels = getUniqueLevels();

  const hasActiveFilters =
    searchQuery !== '' ||
    patternFilter !== 'all' ||
    levelFilter !== 'all' ||
    availabilityFilter !== 'all';

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    borderColor: 'var(--border-secondary)',
    color: 'var(--text-secondary)',
  };

  return (
    <div className="flex flex-col gap-4">
      <CollapsibleEquipmentPanel />

      <div className="flex flex-wrap items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('exercises.search')}
            className="w-full rounded-md border py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={inputStyle}
          />
        </div>

        {/* Pattern dropdown */}
        <select
          value={patternFilter}
          onChange={(e) => setPatternFilter(e.target.value as MovementPattern | 'all')}
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={inputStyle}
        >
          <option value="all">{t('exercises.allPatterns')}</option>
          {ALL_PATTERNS.map((pattern) => (
            <option key={pattern} value={pattern}>
              {t(`patterns.${pattern}`)}
            </option>
          ))}
        </select>

        {/* Level dropdown */}
        <select
          value={levelFilter}
          onChange={(e) => {
            const val = e.target.value;
            setLevelFilter(val === 'all' ? 'all' : Number(val));
          }}
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={inputStyle}
        >
          <option value="all">{t('exercises.allLevels')}</option>
          {uniqueLevels.map((level) => (
            <option key={level} value={level}>
              {t('exercises.level')} {level}
            </option>
          ))}
        </select>

        {/* Availability dropdown */}
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value as ExerciseAvailability | 'all')}
          className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={inputStyle}
        >
          <option value="all">{t('exercises.filterByAvailability')}</option>
          <option value="available">{t('equipment.available')}</option>
          <option value="adaptation">{t('equipment.adaptation')}</option>
          <option value="unavailable">{t('equipment.unavailable')}</option>
        </select>

        {/* Clear filters button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm transition-colors hover:opacity-80"
            style={{ borderColor: 'var(--border-secondary)', color: 'var(--text-muted)' }}
          >
            <X className="h-3.5 w-3.5" />
            {t('common.clearFilters')}
          </button>
        )}
      </div>
    </div>
  );
}
