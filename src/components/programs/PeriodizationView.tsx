import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useStore } from '../../store/useStore';
import {
  hyp1Periodization,
  hyp2Periodization,
  hyp3Periodization,
} from '../../data/periodization';
import type { ProgramId, PeriodizationMode, UndulatingWeek, LinearPhase } from '../../types';

interface PeriodizationViewProps {
  programId: ProgramId;
  onModeChange?: (mode: PeriodizationMode) => void;
}

const periodizationMap: Record<
  string,
  { undulating: { undulating?: { weeks: UndulatingWeek[] } }; linear: { linear?: LinearPhase[] } }
> = {
  hyp1: hyp1Periodization,
  hyp2: hyp2Periodization,
  hyp3: hyp3Periodization,
};

const intensityColorsDark: Record<string, string> = {
  heavy: 'bg-red-900/50 text-red-400 border-red-700',
  medium: 'bg-green-900/50 text-green-400 border-green-700',
  light: 'bg-blue-900/50 text-blue-400 border-blue-700',
};

const intensityColorsLight: Record<string, string> = {
  heavy: 'bg-red-100 text-red-800 border-red-300',
  medium: 'bg-green-100 text-green-800 border-green-300',
  light: 'bg-blue-100 text-blue-800 border-blue-300',
};

const phaseColorsDark = ['border-blue-500 bg-blue-950/30', 'border-green-500 bg-green-950/30', 'border-red-500 bg-red-950/30'];
const phaseColorsLight = ['border-blue-500 bg-blue-50', 'border-green-500 bg-green-50', 'border-red-500 bg-red-50'];

export function PeriodizationView({ programId, onModeChange }: PeriodizationViewProps) {
  const { t } = useTranslation();
  const loc = useLocalizedField();
  const isLight = useStore((s) => s.theme) === 'light';
  const intensityColors = isLight ? intensityColorsLight : intensityColorsDark;
  const phaseColors = isLight ? phaseColorsLight : phaseColorsDark;
  const [mode, setModeInternal] = useState<PeriodizationMode>('undulating');

  const setMode = (m: PeriodizationMode) => {
    setModeInternal(m);
    onModeChange?.(m);
  };

  const config = periodizationMap[programId];
  if (!config) return null;

  const undulatingWeeks = config.undulating.undulating?.weeks ?? [];
  const linearPhases = config.linear.linear ?? [];

  return (
    <div className="space-y-6">
      {/* Section title */}
      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{t('programs.periodization')}</h3>

      {/* Mode toggle */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMode('undulating')}
          className={[
            'flex-1 rounded-lg border p-4 text-left transition-all',
            mode === 'undulating'
              ? 'border-blue-500 ring-1 ring-blue-500/40'
              : '',
          ].join(' ')}
          style={{
            backgroundColor: mode === 'undulating' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            borderColor: mode === 'undulating' ? undefined : 'var(--border-secondary)',
          }}
        >
          <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('programs.undulating')}
          </span>
          <span className="mt-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('programs.undulatingDescription')}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode('linear')}
          className={[
            'flex-1 rounded-lg border p-4 text-left transition-all',
            mode === 'linear'
              ? 'border-blue-500 ring-1 ring-blue-500/40'
              : '',
          ].join(' ')}
          style={{
            backgroundColor: mode === 'linear' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            borderColor: mode === 'linear' ? undefined : 'var(--border-secondary)',
          }}
        >
          <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('programs.linear')}
          </span>
          <span className="mt-1 block text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('programs.linearDescription')}
          </span>
        </button>
      </div>

      {/* Linear mode: 3 phase cards */}
      {mode === 'linear' && (
        <div className="grid gap-4 sm:grid-cols-3">
          {linearPhases.map((phase, idx) => (
            <div
              key={phase.sessions.join('-')}
              className={[
                'rounded-lg border-l-4 p-4',
                phaseColors[idx] ?? 'border-gray-500 bg-gray-900',
              ].join(' ')}
            >
              <div className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Phase {idx + 1}
              </div>
              <div className="mb-1 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                {loc.label(phase)}
              </div>
              <div className="space-y-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                <div>
                  {t('programs.session')} {phase.sessions[0]}-{phase.sessions[1]}
                </div>
                <div>
                  {phase.sets}&times;{phase.reps}
                </div>
                <div>
                  {t('programs.rest')}: {phase.restSeconds}{t('common.seconds')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Undulating mode: 6-week grid */}
      {mode === 'undulating' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wider" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}>
                <th className="px-4 py-2 w-20">Week</th>
                <th className="px-4 py-2">{t('programs.workout')} A</th>
                <th className="px-4 py-2">{t('programs.workout')} B</th>
              </tr>
            </thead>
            <tbody>
              {undulatingWeeks.map((week) => (
                <tr key={week.weekNumber} className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--text-muted)' }}>{week.weekNumber}</td>
                  <td className="px-4 py-3">
                    <UndulatingCell data={week.workoutA} t={t} />
                  </td>
                  <td className="px-4 py-3">
                    <UndulatingCell data={week.workoutB} t={t} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UndulatingCell({
  data,
  t,
}: {
  data: UndulatingWeek['workoutA'];
  t: (key: string) => string;
}) {
  const isLight = useStore((s) => s.theme) === 'light';
  const colors = isLight ? intensityColorsLight : intensityColorsDark;
  const colorClass = colors[data.intensity] ?? '';

  return (
    <div className="flex items-center gap-3">
      <span
        className={[
          'inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium',
          colorClass,
        ].join(' ')}
      >
        {t(`programs.${data.intensity}`)}
      </span>
      <span className="font-mono" style={{ color: 'var(--text-secondary)' }}>
        {data.sets}&times;{data.reps}
      </span>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {data.restSeconds}{t('common.seconds')}
      </span>
    </div>
  );
}
