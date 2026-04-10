import { useState, useMemo } from 'react';
import type { Exercise, ExerciseAvailability, MovementPattern } from '../types';
import { exercises } from '../data/exercises';
import { getExerciseAvailability } from '../data/equipment';
import { useStore } from '../store/useStore';

export interface ExerciseFilters {
  searchQuery: string;
  patternFilter: MovementPattern | 'all';
  levelFilter: number | 'all';
  availabilityFilter: ExerciseAvailability | 'all';
}

export function useExerciseFilter() {
  const equipment = useStore((s) => s.equipment);

  const [searchQuery, setSearchQuery] = useState('');
  const [patternFilter, setPatternFilter] = useState<MovementPattern | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<ExerciseAvailability | 'all'>('all');

  const resetFilters = () => {
    setSearchQuery('');
    setPatternFilter('all');
    setLevelFilter('all');
    setAvailabilityFilter('all');
  };

  const filteredExercises = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return exercises.filter((exercise: Exercise) => {
      // Search query filter
      if (query) {
        const matchesName =
          exercise.nameEn.toLowerCase().includes(query) ||
          exercise.nameUa.toLowerCase().includes(query);
        if (!matchesName) return false;
      }

      // Pattern filter
      if (patternFilter !== 'all' && exercise.pattern !== patternFilter) {
        return false;
      }

      // Level filter
      if (levelFilter !== 'all' && exercise.level !== levelFilter) {
        return false;
      }

      // Availability filter
      if (availabilityFilter !== 'all') {
        const availability = getExerciseAvailability(exercise, equipment);
        if (availability !== availabilityFilter) return false;
      }

      return true;
    });
  }, [searchQuery, patternFilter, levelFilter, availabilityFilter, equipment]);

  const filters: ExerciseFilters = {
    searchQuery,
    patternFilter,
    levelFilter,
    availabilityFilter,
  };

  return {
    filteredExercises,
    filters,
    setSearchQuery,
    setPatternFilter,
    setLevelFilter,
    setAvailabilityFilter,
    resetFilters,
  };
}
