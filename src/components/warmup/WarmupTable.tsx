import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { useThemeClass } from '../../hooks/useThemeClass';
import type { WarmupExercise, WarmupCategory } from '../../types';

interface WarmupTableProps {
  exercises: WarmupExercise[];
  showDescriptions?: boolean;
}

const categoryLabel: Record<WarmupCategory, { en: string; ua: string; tag: string }> = {
  range_of_motion: { en: 'Range of Motion', ua: 'Амплітуда руху', tag: 'R' },
  activation: { en: 'Activation', ua: 'Активація', tag: 'A' },
  movement_prep: { en: 'Movement Prep', ua: 'Підготовка руху', tag: 'M' },
  locomotion: { en: 'Locomotion', ua: 'Локомоція', tag: 'M+' },
};

const categoryOrder: WarmupCategory[] = [
  'range_of_motion',
  'activation',
  'movement_prep',
  'locomotion',
];

export function WarmupTable({ exercises, showDescriptions = false }: WarmupTableProps) {
  const { t, i18n } = useTranslation();
  const loc = useLocalizedField();
  const tc = useThemeClass();
  const isUa = i18n.language === 'ua';

  if (exercises.length === 0) {
    return (
      <p className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
        {t('warmup.empty')}
      </p>
    );
  }

  // Group by category, preserving in-category order from the input array
  const byCategory = new Map<WarmupCategory, WarmupExercise[]>();
  for (const ex of exercises) {
    const arr = byCategory.get(ex.category) ?? [];
    arr.push(ex);
    byCategory.set(ex.category, arr);
  }

  // Precompute a global running index per exercise so React render stays pure.
  const orderedExercises: WarmupExercise[] = [];
  for (const cat of categoryOrder) {
    const list = byCategory.get(cat);
    if (list) orderedExercises.push(...list);
  }
  const indexOf = new Map(orderedExercises.map((ex, i) => [ex.id, i + 1]));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr
            className="border-b text-left text-xs uppercase tracking-wider"
            style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}
          >
            <th className="px-4 py-2 w-12">#</th>
            <th className="px-4 py-2">{t('warmup.exercise')}</th>
            <th className="px-4 py-2 w-16 text-center">{t('programs.sets')}</th>
            <th className="px-4 py-2 w-44 text-center">{t('programs.reps')}</th>
          </tr>
        </thead>
        <tbody>
          {categoryOrder.map((cat) => {
            const list = byCategory.get(cat);
            if (!list || list.length === 0) return null;
            const lbl = categoryLabel[cat];
            return (
              <Fragment key={cat}>
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                  >
                    <span className={`mr-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded px-1 text-[10px] font-bold ${tc.blue}`}>
                      {lbl.tag}
                    </span>
                    {isUa ? lbl.ua : lbl.en}
                  </td>
                </tr>
                {list.map((ex) => (
                  <tr
                    key={ex.id}
                    className="border-b transition-colors"
                    style={{ borderColor: 'var(--border-primary)' }}
                  >
                    <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                      {indexOf.get(ex.id)}
                    </td>
                    <td className="px-4 py-2" style={{ color: 'var(--text-secondary)' }}>
                      <div className="font-medium">{loc.name(ex)}</div>
                      {showDescriptions && (
                        <div className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                          {loc.description(ex)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center" style={{ color: 'var(--text-secondary)' }}>
                      {ex.sets}
                    </td>
                    <td className="px-4 py-2 text-center font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {ex.reps}
                    </td>
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
