import { useTranslation } from 'react-i18next';
import { RotateCcw, Check, BookOpen } from 'lucide-react';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useThemeClass } from '../../hooks/useThemeClass';
import { useStore } from '../../store/useStore';
import { rampLibrary, getRampExercises } from '../../data/warmup';
import { WarmupTable } from './WarmupTable';
import type { WarmupCategory } from '../../types';

interface CategoryMeta {
  key: WarmupCategory;
  tag: string;
  titleEn: string;
  titleUa: string;
  blurbEn: string;
  blurbUa: string;
}

const categories: CategoryMeta[] = [
  {
    key: 'range_of_motion',
    tag: 'R',
    titleEn: 'Range of Motion',
    titleUa: 'Амплітуда руху',
    blurbEn: 'Joint mobility — a pre-workout check-up. Spend extra time on tight areas.',
    blurbUa: 'Мобільність суглобів — передтренувальний огляд. Більше уваги — проблемним зонам.',
  },
  {
    key: 'activation',
    tag: 'A',
    titleEn: 'Activation',
    titleUa: 'Активація',
    blurbEn: 'Wake up muscles — getting them ready for squats, hinges, pushes, pulls and lunges.',
    blurbUa: 'Розбудити м\'язи — підготувати до присідань, тяг, жимів та випадів.',
  },
  {
    key: 'movement_prep',
    tag: 'M',
    titleEn: 'Movement Preparation',
    titleUa: 'Підготовка руху',
    blurbEn: 'Coordinated, athletic movement in all directions. Ends with faster locomotion drills (jog, shuffle, high-knee, carioca) for the adrenaline burst right before lifting.',
    blurbUa: 'Скоординований, атлетичний рух в усіх напрямках. Завершується швидшими локомоторними вправами (біг, shuffle, високі коліна, каріока) — викид адреналіну перед самим підніманням.',
  },
];

export function WarmupConfig() {
  const { t, i18n } = useTranslation();
  const loc = useLocalizedField();
  const tc = useThemeClass();
  const isUa = i18n.language === 'ua';
  const selectedIds = useStore((s) => s.rampSelectedIds);
  const toggle = useStore((s) => s.toggleRampExercise);
  const reset = useStore((s) => s.resetRamp);

  const selectedSet = new Set(selectedIds);
  const selectedExercises = getRampExercises(selectedIds);

  // Validation: book rule says R + A + M.
  const hasR = selectedExercises.some((e) => e.category === 'range_of_motion');
  const hasA = selectedExercises.some((e) => e.category === 'activation');
  const hasM = selectedExercises.some((e) => e.category === 'movement_prep');
  const isValid = hasR && hasA && hasM;

  return (
    <div className="space-y-6">
      {/* Book reference */}
      <div
        className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${tc.yellow}`}
      >
        <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <div className="text-sm leading-relaxed">
          <p className="font-medium">{t('warmup.rule.title')}</p>
          <p className="mt-1 text-xs opacity-90">{t('warmup.rule.body')}</p>
        </div>
      </div>

      {/* Validation status */}
      <div
        className={`rounded-lg border px-4 py-3 ${isValid ? tc.green : tc.red}`}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          {isValid ? <Check className="h-4 w-4" /> : null}
          {isValid ? t('warmup.validValid') : t('warmup.validIncomplete')}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className={`rounded px-2 py-0.5 ${hasR ? tc.green : 'opacity-60'}`}>
            R {hasR ? '✓' : '—'}
          </span>
          <span className={`rounded px-2 py-0.5 ${hasA ? tc.green : 'opacity-60'}`}>
            A {hasA ? '✓' : '—'}
          </span>
          <span className={`rounded px-2 py-0.5 ${hasM ? tc.green : 'opacity-60'}`}>
            M {hasM ? '✓' : '—'}
          </span>
        </div>
      </div>

      {/* Categories — toggle exercises */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            {t('warmup.libraryTitle')}
          </h3>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:border-blue-600 hover:text-blue-400"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-secondary)',
              color: 'var(--text-secondary)',
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t('warmup.resetDefault')}
          </button>
        </div>

        {categories.map((cat) => {
          const exercises = rampLibrary.filter((ex) => ex.category === cat.key);
          return (
            <div
              key={cat.key}
              className="rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)',
              }}
            >
              <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded px-1.5 text-xs font-bold ${tc.blue}`}
                  >
                    {cat.tag}
                  </span>
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {isUa ? cat.titleUa : cat.titleEn}
                  </h4>
                </div>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {isUa ? cat.blurbUa : cat.blurbEn}
                </p>
              </div>

              <ul className="divide-y" style={{ borderColor: 'var(--border-primary)' }}>
                {exercises.map((ex) => {
                  const checked = selectedSet.has(ex.id);
                  return (
                    <li
                      key={ex.id}
                      className="flex items-start gap-3 px-4 py-3 transition-colors hover:opacity-90"
                    >
                      <input
                        id={`ramp-${ex.id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(ex.id)}
                        className="mt-1 h-4 w-4 cursor-pointer accent-blue-500"
                      />
                      <label
                        htmlFor={`ramp-${ex.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {loc.name(ex)}
                          </span>
                          <span
                            className="font-mono text-xs"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {ex.sets} × {ex.reps}
                          </span>
                        </div>
                        <p
                          className="mt-1 text-xs leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {loc.description(ex)}
                        </p>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Preview of current routine */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          {t('warmup.previewTitle')}
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('warmup.previewBlurb')}
        </p>
        <div
          className="overflow-hidden rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-primary)',
          }}
        >
          <WarmupTable exercises={selectedExercises} />
        </div>
      </section>
    </div>
  );
}
