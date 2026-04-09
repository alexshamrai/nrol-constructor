import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { programs } from '../../data/programs';
import { Badge } from '../common/Badge';
import type { ProgramId, ProgramPhase } from '../../types';

interface ProgramListProps {
  onSelectProgram: (id: ProgramId) => void;
  selectedProgramId?: ProgramId;
}

const sections: {
  phase: ProgramPhase;
  titleKey: string;
  accent: string;
  badgeVariant: 'bt' | 'hyp' | 'sp';
}[] = [
  {
    phase: 'basic_training',
    titleKey: 'home.basicTraining',
    accent: 'border-green-500',
    badgeVariant: 'bt',
  },
  {
    phase: 'hypertrophy',
    titleKey: 'home.hypertrophy',
    accent: 'border-blue-500',
    badgeVariant: 'hyp',
  },
  {
    phase: 'strength_power',
    titleKey: 'home.strengthPower',
    accent: 'border-red-500',
    badgeVariant: 'sp',
  },
];

const phaseLabel: Record<ProgramPhase, string> = {
  basic_training: 'BT',
  hypertrophy: 'HYP',
  strength_power: 'S&P',
};

export function ProgramList({ onSelectProgram, selectedProgramId }: ProgramListProps) {
  const { t } = useTranslation();
  const loc = useLocalizedField();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">{t('programs.title')}</h1>
        <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{t('programs.selectProgram')}</p>
      </div>

      {sections.map((section) => {
        const sectionPrograms = programs.filter((p) => p.phase === section.phase);

        return (
          <div key={section.phase}>
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {t(section.titleKey)}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sectionPrograms.map((program) => {
                const isSelected = selectedProgramId === program.id;

                return (
                  <button
                    key={program.id}
                    type="button"
                    onClick={() => onSelectProgram(program.id)}
                    className={[
                      'group relative w-full rounded-lg border-l-4 p-4 text-left transition-all',
                      section.accent,
                      isSelected
                        ? 'ring-2 ring-blue-500'
                        : 'hover:opacity-90',
                    ].join(' ')}
                    style={{
                      backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    }}
                  >
                    {/* Header row */}
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {loc.name(program)}
                      </span>
                      <Badge variant={section.badgeVariant}>
                        {phaseLabel[program.phase]}
                      </Badge>
                    </div>

                    {/* Meta */}
                    <div className="mb-2 flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>
                        {program.sessions} {t('programs.sessions')}
                      </span>
                      <span>
                        {program.workoutsPerWeek} {t('programs.workoutsPerWeek')}
                      </span>
                      <span>
                        {program.workouts.length} {t('programs.workout').toLowerCase()}
                        {program.workouts.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {loc.description(program)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
