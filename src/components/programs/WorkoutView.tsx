import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeftRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useThemeClass } from '../../hooks/useThemeClass';
import { exercises } from '../../data/exercises';
import type { WorkoutTemplate, ProgramId, WorkoutSlot } from '../../types';

interface WorkoutViewProps {
  workout: WorkoutTemplate;
  programId: ProgramId;
  exerciseSelections?: Record<string, string>; // slotOrder -> exerciseId
  onSlotClick?: (slot: WorkoutSlot) => void;
}

function slotRowBg(slot: WorkoutSlot, isLight: boolean): string {
  if (slot.isMaxStrength) return isLight ? 'bg-red-50' : 'bg-red-950/40';
  if (slot.isGiantSet) return isLight ? 'bg-purple-50' : 'bg-purple-950/40';
  if (slot.pattern === 'core_stability' || slot.pattern === 'core_dynamic')
    return isLight ? 'bg-gray-100/50' : 'bg-gray-800/50';
  return '';
}

function directionBadge(slot: WorkoutSlot): string | null {
  if (!slot.direction) return null;
  return slot.direction === 'horizontal' ? 'H' : 'V';
}

function formatRest(seconds: number | undefined): string {
  if (!seconds) return '-';
  return seconds >= 60 ? `${seconds / 60}m` : `${seconds}s`;
}

export function WorkoutView({ workout, programId: _programId, exerciseSelections, onSlotClick }: WorkoutViewProps) {
  const { t } = useTranslation();
  const loc = useLocalizedField();
  const tc = useThemeClass();
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
    >
      {/* Workout header */}
      <div className="border-b px-4 py-3" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t('programs.workout')} {workout.label}
        </h3>
      </div>

      {/* RAMP warm-up note (Chapter 17) */}
      <div
        className={`flex items-start gap-2 border-b border-l-4 px-4 py-2 text-xs ${tc.yellow}`}
      >
        <Flame className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <div className="flex-1 leading-relaxed">
          <span className="font-semibold">{t('warmup.workoutNoteShort')}</span>{' '}
          {t('warmup.workoutNote')}{' '}
          <Link to="/warmup" className="underline hover:opacity-80">
            {t('warmup.configure')}
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase tracking-wider" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}>
              <th className="px-4 py-2 w-20">#</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">{t('programs.pattern')}</th>
              <th className="px-4 py-2 w-20 text-center">{t('programs.sets')}</th>
              <th className="px-4 py-2 w-24 text-center">{t('programs.reps')}</th>
              <th className="px-4 py-2 w-20 text-center">{t('programs.rest')}</th>
            </tr>
          </thead>
          <tbody>
            {workout.slots.map((slot) => {
              const dir = directionBadge(slot);
              const isHovered = hoveredSlot === slot.order;
              const selectedExId = exerciseSelections?.[slot.order];
              const selectedExercise = selectedExId
                ? exercises.find((ex) => ex.id === selectedExId)
                : undefined;
              const isClickable = !!onSlotClick;

              return (
                <tr
                  key={slot.order}
                  className={[
                    'border-b border-gray-800/50 transition-colors',
                    isClickable ? 'cursor-pointer' : '',
                    slotRowBg(slot, tc.isLight),
                    isHovered ? `ring-1 ring-inset ring-blue-500/50 ${tc.isLight ? 'bg-blue-50' : 'bg-blue-950/20'}` : '',
                  ].join(' ')}
                  onMouseEnter={() => setHoveredSlot(slot.order)}
                  onMouseLeave={() => setHoveredSlot(null)}
                  onClick={() => onSlotClick?.(slot)}
                >
                  {/* Order */}
                  <td className="px-4 py-2.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {slot.order}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span style={{ color: 'var(--text-secondary)' }}>{slot.category}</span>
                      {slot.isMaxStrength && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${tc.red}`}>
                          {t('programs.maxStrength')}
                        </span>
                      )}
                      {slot.isGiantSet && (
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${tc.purple}`}>
                          {t('programs.giantSet')}
                        </span>
                      )}
                      {selectedExercise && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tc.greenPill}`}>
                          {loc.name(selectedExercise)}
                        </span>
                      )}
                      {isClickable && isHovered && (
                        <ArrowLeftRight className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                      )}
                    </div>
                  </td>

                  {/* Pattern + direction */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span style={{ color: 'var(--text-secondary)' }}>{t(`patterns.${slot.pattern}`)}</span>
                      {dir && (
                        <span
                          className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold"
                          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                        >
                          {dir}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Sets */}
                  <td className="px-4 py-2.5 text-center" style={{ color: 'var(--text-secondary)' }}>
                    {slot.sets}
                  </td>

                  {/* Reps */}
                  <td className="px-4 py-2.5 text-center font-mono" style={{ color: 'var(--text-secondary)' }}>
                    {slot.reps}
                  </td>

                  {/* Rest */}
                  <td className="px-4 py-2.5 text-center" style={{ color: 'var(--text-muted)' }}>
                    {formatRest(slot.restSeconds)}
                  </td>
                </tr>
              );
              // Note is shown below if present — using a fragment approach below
            })}
          </tbody>
        </table>
      </div>

      {/* Notes section */}
      {workout.slots.some((s) => s.noteEn) && (
        <div className="border-t px-4 py-2 space-y-1" style={{ borderColor: 'var(--border-primary)' }}>
          {workout.slots
            .filter((s) => s.noteEn)
            .map((slot) => (
              <p key={slot.order} className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="font-mono" style={{ opacity: 0.7 }}>{slot.order}:</span>{' '}
                {loc.label({ labelEn: slot.noteEn, labelUa: slot.noteUa })}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
