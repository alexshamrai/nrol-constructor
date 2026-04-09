import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { programs } from '../../data/programs';
import {
  hyp1Periodization,
  hyp2Periodization,
  hyp3Periodization,
  waveLoadingSessions,
} from '../../data/periodization';
import type { ProgramId, PeriodizationMode, LinearPhase, UndulatingWeek } from '../../types';

interface SessionPlanProps {
  programId: ProgramId;
  startDate?: string;
  periodizationMode?: PeriodizationMode;
}

// ── helpers ───────────────────────────────────────────────────

const isHypertrophy = (id: ProgramId): boolean =>
  id === 'hyp1' || id === 'hyp2' || id === 'hyp3';

const periodizationMap: Record<
  string,
  { undulating: { undulating?: { weeks: UndulatingWeek[] } }; linear: { linear?: LinearPhase[] } }
> = {
  hyp1: hyp1Periodization,
  hyp2: hyp2Periodization,
  hyp3: hyp3Periodization,
};

const phaseRowColorsDark = ['bg-blue-950/30', 'bg-green-950/30', 'bg-red-950/30'];
const phaseRowColorsLight = ['bg-blue-50', 'bg-green-50', 'bg-red-50'];

/** Mon/Wed/Fri schedule starting from a given date string (YYYY-MM-DD). */
function computeDates(startDate: string, count: number): string[] {
  const dates: string[] = [];
  const start = new Date(startDate + 'T00:00:00');
  // Mon=1, Wed=3, Fri=5
  const sessionDays = [1, 3, 5];

  let cursor = new Date(start);
  // Align to the first session day on or after start
  while (!sessionDays.includes(cursor.getDay())) {
    cursor.setDate(cursor.getDate() + 1);
  }

  for (let i = 0; i < count; i++) {
    dates.push(cursor.toISOString().slice(0, 10));
    // advance to next session day
    const currentDay = cursor.getDay();
    if (currentDay === 1) {
      // Mon -> Wed (+2)
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 2);
    } else if (currentDay === 3) {
      // Wed -> Fri (+2)
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 2);
    } else {
      // Fri -> Mon (+3)
      cursor = new Date(cursor);
      cursor.setDate(cursor.getDate() + 3);
    }
  }
  return dates;
}

interface SessionRow {
  session: number;
  workoutLabel: string;
  setsReps: string;
  restSeconds: string;
  phaseIntensity: string;
  phaseIndex: number; // 0-2 for color coding, -1 for none
  date?: string;
}

function buildRows(
  programId: ProgramId,
  mode: PeriodizationMode,
  startDate?: string,
): SessionRow[] {
  const program = programs.find((p) => p.id === programId);
  if (!program) return [];

  const totalSessions = 12;
  const workoutCount = program.workouts.length;
  const dates = startDate ? computeDates(startDate, totalSessions) : [];

  const rows: SessionRow[] = [];

  // ── S&P III: wave loading ──────────────────────────
  if (programId === 'sp3') {
    // 4 workouts (A/B/C/D), each done 3 times = 12 sessions
    // Within each occurrence, the wave pattern changes: 7-5-3, 6-4-2, 5-3-1
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount; // A=0, B=1, C=2, D=3
      const occurrence = Math.floor(s / workoutCount); // 0, 1, 2
      const wave = waveLoadingSessions[occurrence];
      const waveReps = wave
        ? wave.wave1.reps.join('-') + ', ' + wave.wave2.reps.join('-')
        : '';
      rows.push({
        session: s + 1,
        workoutLabel: program.workouts[workoutIdx].label,
        setsReps: wave ? `6 x ${wave.wave1.reps.join('-')}` : 'wave',
        restSeconds: '120s',
        phaseIntensity: wave ? `Wave ${occurrence + 1}: ${waveReps}` : '',
        phaseIndex: occurrence,
        date: dates[s],
      });
    }
    return rows;
  }

  // ── S&P II: 4 workouts, A/B/C/D rotation ──────────
  if (programId === 'sp2') {
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount;
      const workout = program.workouts[workoutIdx];
      // S&P II uses 5-5-5-5-8 scheme for max exercise
      const maxSlot = workout.slots.find((sl) => sl.isMaxStrength);
      const setsReps = maxSlot ? `${maxSlot.sets} x ${maxSlot.reps}` : '-';
      const rest = maxSlot?.restSeconds ? `${maxSlot.restSeconds}s` : '-';
      rows.push({
        session: s + 1,
        workoutLabel: workout.label,
        setsReps,
        restSeconds: rest,
        phaseIntensity: 'MAX Strength',
        phaseIndex: -1,
        date: dates[s],
      });
    }
    return rows;
  }

  // ── S&P I: A/B alternation ─────────────────────────
  if (programId === 'sp1') {
    for (let s = 0; s < totalSessions; s++) {
      const workoutIdx = s % workoutCount;
      const workout = program.workouts[workoutIdx];
      const maxSlot = workout.slots.find((sl) => sl.isMaxStrength);
      const setsReps = maxSlot ? `${maxSlot.sets} x ${maxSlot.reps}` : '-';
      const rest = maxSlot?.restSeconds ? `${maxSlot.restSeconds}s` : '-';
      rows.push({
        session: s + 1,
        workoutLabel: workout.label,
        setsReps,
        restSeconds: rest,
        phaseIntensity: 'MAX Strength + Giant Set',
        phaseIndex: -1,
        date: dates[s],
      });
    }
    return rows;
  }

  // ── Hypertrophy: periodized A/B alternation ────────
  if (isHypertrophy(programId)) {
    const config = periodizationMap[programId];
    if (!config) return [];

    if (mode === 'linear') {
      const phases = config.linear.linear ?? [];
      for (let s = 0; s < totalSessions; s++) {
        const workoutIdx = s % workoutCount;
        const workout = program.workouts[workoutIdx];
        const phase = phases.find(
          (p) => s + 1 >= p.sessions[0] && s + 1 <= p.sessions[1],
        );
        const phaseIdx = phases.indexOf(phase!);
        rows.push({
          session: s + 1,
          workoutLabel: workout.label,
          setsReps: phase ? `${phase.sets} x ${phase.reps}` : '-',
          restSeconds: phase ? `${phase.restSeconds}s` : '-',
          phaseIntensity: phase
            ? `Phase ${phaseIdx + 1}`
            : '',
          phaseIndex: phaseIdx >= 0 ? phaseIdx : -1,
          date: dates[s],
        });
      }
    } else {
      // undulating
      const weeks = config.undulating.undulating?.weeks ?? [];
      for (let s = 0; s < totalSessions; s++) {
        const workoutIdx = s % workoutCount; // 0=A, 1=B
        const weekIdx = Math.floor(s / 2); // 2 sessions per week
        const week = weeks[weekIdx];
        const data = workoutIdx === 0 ? week?.workoutA : week?.workoutB;
        rows.push({
          session: s + 1,
          workoutLabel: program.workouts[workoutIdx].label,
          setsReps: data ? `${data.sets} x ${data.reps}` : '-',
          restSeconds: data ? `${data.restSeconds}s` : '-',
          phaseIntensity: data?.intensity
            ? data.intensity.charAt(0).toUpperCase() + data.intensity.slice(1)
            : '',
          phaseIndex:
            data?.intensity === 'light'
              ? 0
              : data?.intensity === 'medium'
                ? 1
                : data?.intensity === 'heavy'
                  ? 2
                  : -1,
          date: dates[s],
        });
      }
    }
    return rows;
  }

  // ── BT (basic training): simple A/B alternation ────
  for (let s = 0; s < totalSessions; s++) {
    const workoutIdx = s % workoutCount;
    const workout = program.workouts[workoutIdx];
    // BT: all slots share same sets/reps from template
    const mainSlot = workout.slots.find(
      (sl) => sl.order === '1a' || sl.order === '1',
    );
    const setsReps = mainSlot ? `${mainSlot.sets} x ${mainSlot.reps}` : '-';
    const rest = mainSlot?.restSeconds ? `${mainSlot.restSeconds}s` : '-';
    rows.push({
      session: s + 1,
      workoutLabel: workout.label,
      setsReps,
      restSeconds: rest,
      phaseIntensity: '-',
      phaseIndex: -1,
      date: dates[s],
    });
  }

  return rows;
}

// ── Component ─────────────────────────────────────────────────

export function SessionPlan({ programId, startDate, periodizationMode = 'linear' }: SessionPlanProps) {
  const { t } = useTranslation();
  const isLight = useStore((s) => s.theme) === 'light';
  const phaseRowColors = isLight ? phaseRowColorsLight : phaseRowColorsDark;

  const rows = useMemo(
    () => buildRows(programId, periodizationMode, startDate),
    [programId, periodizationMode, startDate],
  );

  if (rows.length === 0) return null;

  const showDate = !!startDate;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        {t('programs.sessionPlanTitle')}
      </h3>

      <div
        className="overflow-hidden rounded-lg border"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wider" style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}>
                <th className="px-4 py-2 w-16">{t('programs.sessionNumber')}</th>
                <th className="px-4 py-2">{t('programs.workoutLabel')}</th>
                <th className="px-4 py-2">{t('programs.setsReps')}</th>
                <th className="px-4 py-2">{t('programs.rest')}</th>
                <th className="px-4 py-2">{t('programs.phaseIntensity')}</th>
                {showDate && <th className="px-4 py-2">{t('programs.date')}</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const bgColor =
                  row.phaseIndex >= 0 && row.phaseIndex < phaseRowColors.length
                    ? phaseRowColors[row.phaseIndex]
                    : '';
                return (
                  <tr
                    key={row.session}
                    className={[
                      'border-b transition-colors',
                      bgColor,
                    ].join(' ')}
                    style={{ borderColor: 'var(--border-primary)' }}
                  >
                    <td className="px-4 py-2.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {row.session}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                      >
                        {row.workoutLabel}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono" style={{ color: 'var(--text-secondary)' }}>
                      {row.setsReps}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>
                      {row.restSeconds}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>
                      {row.phaseIntensity}
                    </td>
                    {showDate && (
                      <td className="px-4 py-2.5 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                        {row.date}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
