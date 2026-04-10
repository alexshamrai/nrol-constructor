import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Wand2, FileDown, FileSpreadsheet, Calendar } from 'lucide-react';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useProgramBuilder } from '../../hooks/useProgramBuilder';
import { programs } from '../../data/programs';
import { WorkoutView } from './WorkoutView';
import { PeriodizationView } from './PeriodizationView';
import { SessionPlan } from './SessionPlan';
import { ExerciseSwapModal } from '../exercises/ExerciseSwapModal';
import { CollapsibleEquipmentPanel } from '../equipment/CollapsibleEquipmentPanel';
// Lazy import exports to avoid bundling jspdf+xlsx into main chunk
const exportProgramPdf = (...args: Parameters<typeof import('../../utils/exportProgram').exportProgramPdf>) =>
  import('../../utils/exportProgram').then((m) => m.exportProgramPdf(...args));
const exportProgramXlsx = (...args: Parameters<typeof import('../../utils/exportProgram').exportProgramXlsx>) =>
  import('../../utils/exportProgram').then((m) => m.exportProgramXlsx(...args));
import type { ProgramId, PeriodizationMode, WorkoutSlot } from '../../types';

interface ProgramConfiguratorProps {
  programId: ProgramId;
}

const isHypertrophy = (id: ProgramId): boolean =>
  id === 'hyp1' || id === 'hyp2' || id === 'hyp3';

export function ProgramConfigurator({ programId }: ProgramConfiguratorProps) {
  const { t } = useTranslation();
  const loc = useLocalizedField();

  const program = programs.find((p) => p.id === programId);
  if (!program) {
    return (
      <div className="py-20 text-center" style={{ color: 'var(--text-muted)' }}>
        Program not found: {programId}
      </div>
    );
  }

  const [activeWorkoutIdx, setActiveWorkoutIdx] = useState(0);
  const [periodizationMode, setPeriodizationMode] = useState<PeriodizationMode>('undulating');
  const [startDate, setStartDate] = useState<string>('');

  const builder = useProgramBuilder(programId);

  // Swap modal state
  const [swapSlot, setSwapSlot] = useState<{
    workoutId: string;
    slot: WorkoutSlot;
  } | null>(null);

  // Build exercise selections map for export: { workoutId: { slotOrder: exerciseId } }
  const buildExerciseSelectionsMap = useCallback(() => {
    const result: Record<string, Record<string, string>> = {};
    for (const cw of builder.workouts) {
      result[cw.templateId] = { ...cw.exerciseSelections };
    }
    return result;
  }, [builder.workouts]);

  const handleExportPdf = useCallback(() => {
    exportProgramPdf(
      programId,
      buildExerciseSelectionsMap(),
      isHypertrophy(programId) ? periodizationMode : undefined,
    );
  }, [programId, buildExerciseSelectionsMap, periodizationMode]);

  const handleExportXlsx = useCallback(() => {
    exportProgramXlsx(
      programId,
      buildExerciseSelectionsMap(),
      isHypertrophy(programId) ? periodizationMode : undefined,
    );
  }, [programId, buildExerciseSelectionsMap, periodizationMode]);

  const metabolicLabel = loc.label({
    labelEn: program.metabolic.detailsEn,
    labelUa: program.metabolic.detailsUa,
  });

  const changesText = loc.label({
    labelEn: program.changesFromPrevEn,
    labelUa: program.changesFromPrevUa,
  });

  return (
    <div className="space-y-8">
      {/* Program overview */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{loc.name(program)}</h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{loc.description(program)}</p>

        {/* Meta cards */}
        <div className="flex flex-wrap gap-3">
          <div className="rounded-lg border px-4 py-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('programs.sessions')}</div>
            <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{program.sessions}</div>
          </div>
          <div className="rounded-lg border px-4 py-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('programs.workoutsPerWeek')}</div>
            <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{program.workoutsPerWeek}</div>
          </div>
          <div className="rounded-lg border px-4 py-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Metabolic</div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{metabolicLabel}</div>
          </div>
        </div>

        {/* Changes from previous */}
        {changesText && (
          <div className="rounded-lg border px-4 py-3" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {t('programs.changesFromPrev')}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{changesText}</p>
          </div>
        )}
      </section>

      {/* Periodization (hypertrophy only) */}
      {isHypertrophy(programId) && (
        <section>
          <PeriodizationView
            programId={programId}
            onModeChange={setPeriodizationMode}
          />
        </section>
      )}

      {/* Equipment */}
      <CollapsibleEquipmentPanel />

      {/* Workout tabs */}
      <section className="space-y-4">
        {/* Tab bar + auto-populate */}
        <div className="flex items-center justify-between">
          {program.workouts.length > 1 && (
            <div className="flex gap-1 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              {program.workouts.map((w, idx) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setActiveWorkoutIdx(idx)}
                  className={[
                    'px-4 py-2 text-sm font-medium transition-colors',
                    idx === activeWorkoutIdx
                      ? 'border-b-2 border-blue-500'
                      : '',
                  ].join(' ')}
                  style={{
                    color: idx === activeWorkoutIdx ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  {t('programs.workout')} {w.label}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={builder.autoPopulate}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-blue-600 hover:text-blue-400"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
          >
            <Wand2 className="h-4 w-4" />
            {t('programs.autoPopulate')}
          </button>
        </div>

        {/* Active workout */}
        {program.workouts[activeWorkoutIdx] && (
          <WorkoutView
            workout={program.workouts[activeWorkoutIdx]}
            programId={programId}
            exerciseSelections={
              builder.workouts.find(
                (cw) => cw.templateId === program.workouts[activeWorkoutIdx].id,
              )?.exerciseSelections
            }
            onSlotClick={(slot) =>
              setSwapSlot({
                workoutId: program.workouts[activeWorkoutIdx].id,
                slot,
              })
            }
          />
        )}
      </section>

      {/* Start date & Export */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          {/* Date picker */}
          <div>
            <label
              htmlFor="start-date"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              <Calendar className="mr-1 inline-block h-3.5 w-3.5" />
              {t('programs.startDate')}
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-lg border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
            />
          </div>

          {/* Export buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-blue-600 hover:text-blue-400"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
            >
              <FileDown className="h-4 w-4" />
              {t('programs.exportPdf')}
            </button>
            <button
              type="button"
              onClick={handleExportXlsx}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:border-green-600 hover:text-green-400"
              style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
            >
              <FileSpreadsheet className="h-4 w-4" />
              {t('programs.exportXlsx')}
            </button>
          </div>
        </div>
      </section>

      {/* Session Plan */}
      <section>
        <SessionPlan
          programId={programId}
          startDate={startDate || undefined}
          periodizationMode={isHypertrophy(programId) ? periodizationMode : undefined}
        />
      </section>

      {/* Exercise swap modal */}
      {swapSlot && (
        <ExerciseSwapModal
          isOpen={!!swapSlot}
          onClose={() => setSwapSlot(null)}
          slot={swapSlot.slot}
          currentExerciseId={builder.getExerciseForSlot(
            swapSlot.workoutId,
            swapSlot.slot.order,
          )}
          phase={program.phase}
          onSelect={(exerciseId) =>
            builder.setExercise(swapSlot.workoutId, swapSlot.slot.order, exerciseId)
          }
        />
      )}
    </div>
  );
}
