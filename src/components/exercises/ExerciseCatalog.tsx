import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Exercise } from '../../types';
import { useExerciseFilter } from '../../hooks/useExerciseFilter';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useThemeClass } from '../../hooks/useThemeClass';
import { useStore } from '../../store/useStore';
import { getExerciseAvailability, equipmentItems } from '../../data/equipment';
import { ExerciseFilter } from './ExerciseFilter';
import { ExerciseCard } from './ExerciseCard';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';

export function ExerciseCatalog() {
  const { t } = useTranslation();
  const localized = useLocalizedField();
  const tc = useThemeClass();
  const equipment = useStore((s) => s.equipment);

  const {
    filteredExercises,
    filters,
    setSearchQuery,
    setPatternFilter,
    setLevelFilter,
    setAvailabilityFilter,
  } = useExerciseFilter();

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const selectedAvailability = selectedExercise
    ? getExerciseAvailability(selectedExercise, equipment)
    : 'available';

  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar */}
      <ExerciseFilter
        searchQuery={filters.searchQuery}
        patternFilter={filters.patternFilter}
        levelFilter={filters.levelFilter}
        availabilityFilter={filters.availabilityFilter}
        setSearchQuery={setSearchQuery}
        setPatternFilter={setPatternFilter}
        setLevelFilter={setLevelFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />

      {/* Count */}
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {t('exercises.exercisesFound', { count: filteredExercises.length })}
      </p>

      {/* Grid */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => {
            const availability = getExerciseAvailability(exercise, equipment);
            return (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                availability={availability}
                onClick={() => setSelectedExercise(exercise)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">{t('common.noResults')}</p>
        </div>
      )}

      {/* Detail modal */}
      {selectedExercise && (
        <Modal
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          title={localized.name(selectedExercise)}
          size="lg"
        >
          <div className="flex flex-col gap-4">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="bt">
                L{selectedExercise.level}
              </Badge>
              <Badge variant="hyp">
                {t(`patterns.${selectedExercise.pattern}`)}
              </Badge>
              <Badge variant={selectedAvailability}>
                {selectedAvailability === 'available'
                  ? t('equipment.available')
                  : selectedAvailability === 'adaptation'
                    ? t('equipment.adaptation')
                    : t('equipment.unavailable')}
              </Badge>
              {selectedExercise.direction && (
                <Badge variant="sp">
                  {selectedExercise.direction}
                </Badge>
              )}
              {selectedExercise.coreGoal && (
                <Badge variant="sp">
                  {selectedExercise.coreGoal}
                </Badge>
              )}
            </div>

            {/* Full description */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                {t('exercises.description')}
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {localized.description(selectedExercise)}
              </p>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                {t('exercises.equipment')}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedExercise.equipment.map((eqId) => {
                  const item = equipmentItems.find((ei) => ei.id === eqId);
                  return (
                    <span
                      key={eqId}
                      className="inline-block rounded px-2 py-0.5 text-xs"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                    >
                      {item ? localized.name(item) : eqId}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Best for */}
            {selectedExercise.bestFor.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase mb-1" style={{ color: 'var(--text-muted)' }}>
                  {t('exercises.bestFor')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExercise.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-block rounded px-2 py-0.5 text-xs ${tc.blue}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Adaptation */}
            {selectedExercise.adaptationEn && (
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">
                  {t('exercises.adaptation')}
                </h4>
                <p className={`rounded border px-3 py-2 text-sm ${tc.yellow}`}>
                  {localized.description({
                    descriptionEn: selectedExercise.adaptationEn,
                    descriptionUa: selectedExercise.adaptationUa ?? selectedExercise.adaptationEn,
                  })}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
