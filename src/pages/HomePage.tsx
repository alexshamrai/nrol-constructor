import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dumbbell, TrendingUp, Zap, ArrowRight, Calendar } from 'lucide-react';
import { useStore } from '../store/useStore';

const phaseCards = [
  {
    titleKey: 'home.basicTraining',
    descKey: 'home.btDescription',
    borderColor: '#4CAF50',
    icon: Dumbbell,
  },
  {
    titleKey: 'home.hypertrophy',
    descKey: 'home.hypDescription',
    borderColor: '#2196F3',
    icon: TrendingUp,
  },
  {
    titleKey: 'home.strengthPower',
    descKey: 'home.spDescription',
    borderColor: '#F44336',
    icon: Zap,
  },
] as const;

export default function HomePage() {
  const { t } = useTranslation();
  const activeTrainingPlanId = useStore((s) => s.activeTrainingPlanId);
  const trainingPlans = useStore((s) => s.trainingPlans);

  const activePlan = activeTrainingPlanId
    ? trainingPlans.find((p) => p.id === activeTrainingPlanId)
    : null;

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          {t('home.description')}
        </p>
      </section>

      {/* Phase overview cards */}
      <section>
        <h2 className="text-xl font-semibold mb-6">{t('home.phases')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phaseCards.map(({ titleKey, descKey, borderColor, icon: Icon }) => (
            <div
              key={titleKey}
              className="rounded-lg p-6 border-l-4"
              style={{ backgroundColor: 'var(--bg-secondary)', borderLeftColor: borderColor }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-6 w-6" style={{ color: borderColor }} />
                <h3 className="text-lg font-semibold">{t(titleKey)}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/programs"
          className="group flex items-center justify-between rounded-lg p-6 transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-4">
            <Dumbbell className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="font-semibold text-lg">{t('nav.programs')}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('home.quickStart')}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 transition-colors" style={{ color: 'var(--text-muted)' }} />
        </Link>

        <Link
          to="/settings"
          className="group flex items-center justify-between rounded-lg p-6 transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-green-400" />
            <div>
              <h3 className="font-semibold text-lg">
                {t('equipment.title')}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('home.selectEquipment')}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 transition-colors" style={{ color: 'var(--text-muted)' }} />
        </Link>
      </section>

      {/* Active training plan summary */}
      {activePlan ? (
        <section
          className="rounded-lg p-6 border"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
        >
          <h2 className="text-lg font-semibold mb-3">
            {t('home.currentPlan')}
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>{activePlan.name}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {activePlan.programs.length} {t('programs.sessions').toLowerCase()}
                {' \u2022 '}
                {activePlan.equipment.length} {t('equipment.title').toLowerCase()}
              </p>
            </div>
            <Link
              to="/planner"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t('planner.title')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : (
        <section
          className="rounded-lg p-6 border border-dashed text-center"
          style={{ borderColor: 'var(--border-secondary)' }}
        >
          <p style={{ color: 'var(--text-muted)' }}>{t('home.noPlan')}</p>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {t('planner.createPlan')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}
    </div>
  );
}
