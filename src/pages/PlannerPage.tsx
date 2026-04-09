import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Download, ChevronRight } from 'lucide-react';
import type { ProgramId, ProgramPhase } from '../types';

// ---------- Plan program definition ----------
interface PlanProgram {
  id: ProgramId;
  phase: ProgramPhase;
  label: string;
}

// ---------- Template definitions ----------
type TemplateKey = 'standard' | 'fatLoss' | 'mass' | 'spCycling';

const PROGRAMS: Record<ProgramId, { phase: ProgramPhase; label: string }> = {
  bt1: { phase: 'basic_training', label: 'BT I' },
  bt2: { phase: 'basic_training', label: 'BT II' },
  bt3: { phase: 'basic_training', label: 'BT III' },
  bt4: { phase: 'basic_training', label: 'BT IV' },
  hyp1: { phase: 'hypertrophy', label: 'Hyp I' },
  hyp2: { phase: 'hypertrophy', label: 'Hyp II' },
  hyp3: { phase: 'hypertrophy', label: 'Hyp III' },
  sp1: { phase: 'strength_power', label: 'S&P I' },
  sp2: { phase: 'strength_power', label: 'S&P II' },
  sp3: { phase: 'strength_power', label: 'S&P III' },
};

const TEMPLATES: Record<TemplateKey, ProgramId[]> = {
  standard: ['bt1', 'bt2', 'bt3', 'bt4', 'hyp1', 'hyp2', 'hyp3', 'sp1', 'sp2', 'sp3'],
  fatLoss: ['bt1', 'bt2', 'bt3', 'bt4', 'bt1', 'bt2', 'bt3', 'bt4', 'hyp1', 'hyp2', 'hyp3', 'sp1', 'sp2', 'sp3'],
  mass: ['hyp1', 'hyp2', 'hyp3', 'sp1', 'sp2', 'sp3', 'bt1', 'bt2', 'bt3', 'bt4'],
  spCycling: ['sp1', 'sp2', 'sp3', 'sp1', 'sp2', 'sp3'],
};

const SESSIONS_PER_PROGRAM = 12;
const SESSIONS_PER_WEEK = 3;
const WEEKS_PER_PROGRAM = SESSIONS_PER_PROGRAM / SESSIONS_PER_WEEK; // 4

const PHASE_COLORS: Record<ProgramPhase, string> = {
  basic_training: '#4CAF50',
  hypertrophy: '#2196F3',
  strength_power: '#F44336',
};

const PHASE_BG: Record<ProgramPhase, string> = {
  basic_training: 'bg-green-900/40',
  hypertrophy: 'bg-blue-900/40',
  strength_power: 'bg-red-900/40',
};

// ---------- Helpers ----------
function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface PlanEntry {
  program: PlanProgram;
  startDate: Date;
  endDate: Date;
  weekOffset: number;
}

function buildPlan(programIds: ProgramId[], startDate: Date): PlanEntry[] {
  let weekOffset = 0;
  return programIds.map((id) => {
    const info = PROGRAMS[id];
    const start = addWeeks(startDate, weekOffset);
    const end = addWeeks(startDate, weekOffset + WEEKS_PER_PROGRAM);
    const entry: PlanEntry = {
      program: { id, ...info },
      startDate: start,
      endDate: end,
      weekOffset,
    };
    weekOffset += WEEKS_PER_PROGRAM;
    return entry;
  });
}

// ---------- Component ----------
export default function PlannerPage() {
  const { t } = useTranslation();

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('standard');
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date();
    // Next Monday
    const day = d.getDay();
    const diff = day === 0 ? 1 : 8 - day;
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
  });

  const programIds = TEMPLATES[selectedTemplate];
  const plan = useMemo(
    () => buildPlan(programIds, new Date(startDate)),
    [programIds, startDate],
  );

  const totalSessions = programIds.length * SESSIONS_PER_PROGRAM;
  const totalWeeks = programIds.length * WEEKS_PER_PROGRAM;
  const estimatedEnd = plan.length > 0 ? plan[plan.length - 1].endDate : new Date();

  const templateButtons: { key: TemplateKey; labelKey: string }[] = [
    { key: 'standard', labelKey: 'planner.standard' },
    { key: 'fatLoss', labelKey: 'planner.fatLoss' },
    { key: 'mass', labelKey: 'planner.mass' },
    { key: 'spCycling', labelKey: 'planner.spCycling' },
  ];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Calendar className="h-7 w-7 text-blue-400" />
        <h1 className="text-3xl font-bold">{t('planner.title')}</h1>
      </div>

      {/* Template selector */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {t('planner.templates')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {templateButtons.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={[
                'rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors border',
                selectedTemplate === key
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : '',
              ].join(' ')}
              style={selectedTemplate === key ? undefined : {
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-secondary)',
                color: 'var(--text-muted)',
              }}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </section>

      {/* Start date picker */}
      <section className="space-y-2">
        <label htmlFor="start-date" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {t('planner.startDate')}
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-secondary)', color: 'var(--text-primary)' }}
        />
      </section>

      {/* Timeline visualization */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {t('planner.timeline')}
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Timeline bar */}
            <div className="flex rounded-lg overflow-hidden">
              {plan.map((entry, i) => {
                const widthPercent = (WEEKS_PER_PROGRAM / totalWeeks) * 100;
                return (
                  <div
                    key={`${entry.program.id}-${i}`}
                    className={`relative flex items-center justify-center py-4 text-xs font-semibold text-white ${PHASE_BG[entry.program.phase]}`}
                    style={{
                      width: `${widthPercent}%`,
                      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : undefined,
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-30"
                      style={{ backgroundColor: PHASE_COLORS[entry.program.phase] }}
                    />
                    <span className="relative z-10 truncate px-1">
                      {entry.program.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Date labels */}
            <div className="flex mt-1">
              {plan.map((entry, i) => {
                const widthPercent = (WEEKS_PER_PROGRAM / totalWeeks) * 100;
                return (
                  <div
                    key={`date-${entry.program.id}-${i}`}
                    className="text-[10px] text-gray-500 truncate"
                    style={{ width: `${widthPercent}%` }}
                  >
                    {formatDate(entry.startDate)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed list */}
        <div className="space-y-2 mt-6">
          {plan.map((entry, i) => (
            <div
              key={`row-${entry.program.id}-${i}`}
              className="flex items-center gap-4 rounded-lg px-4 py-3 border-l-4"
              style={{ backgroundColor: 'var(--bg-secondary)', borderLeftColor: PHASE_COLORS[entry.program.phase] }}
            >
              <ChevronRight
                className="h-4 w-4 shrink-0"
                style={{ color: PHASE_COLORS[entry.program.phase] }}
              />
              <span className="font-medium text-sm min-w-[60px]">
                {entry.program.label}
              </span>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {formatDate(entry.startDate)} &ndash; {formatDate(entry.endDate)}
              </span>
              <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                {SESSIONS_PER_PROGRAM} {t('programs.sessions')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Summary stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg p-5 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-3xl font-bold text-blue-400">{totalSessions}</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('planner.totalSessions')}</p>
        </div>
        <div className="rounded-lg p-5 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-3xl font-bold text-green-400">~{totalWeeks}</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {t('planner.duration')} ({t('planner.weeks')})
          </p>
        </div>
        <div className="rounded-lg p-5 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <p className="text-xl font-bold text-amber-400">
            {formatDate(estimatedEnd)}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{t('planner.estimatedEnd')}</p>
        </div>
      </section>

      {/* Export button (placeholder) */}
      <div className="flex justify-end">
        <button
          disabled
          className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium cursor-not-allowed opacity-60"
          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
        >
          <Download className="h-4 w-4" />
          {t('common.save')}
        </button>
      </div>
    </div>
  );
}
