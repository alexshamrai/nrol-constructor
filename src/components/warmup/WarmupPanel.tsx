import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Flame, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useThemeClass } from '../../hooks/useThemeClass';
import { getRampExercises } from '../../data/warmup';
import { WarmupTable } from './WarmupTable';

interface WarmupPanelProps {
  /** When true, panel starts open. */
  defaultOpen?: boolean;
}

export function WarmupPanel({ defaultOpen = false }: WarmupPanelProps) {
  const { t } = useTranslation();
  const tc = useThemeClass();
  const selectedIds = useStore((s) => s.rampSelectedIds);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const exercises = getRampExercises(selectedIds);

  return (
    <div
      className="rounded-lg border"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
        style={{ color: 'var(--text-secondary)' }}
      >
        <span className="flex items-center gap-2">
          <Flame className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${tc.blue}`}>RAMP</span>
          {t('warmup.panelTitle')}
          <span
            className="rounded px-2 py-0.5 text-xs"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
          >
            {exercises.length} {t('warmup.exercisesShort')}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
        ) : (
          <ChevronDown className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
        )}
      </button>

      {isOpen && (
        <div className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <p className="px-4 py-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {t('warmup.workoutNote')}
          </p>
          <WarmupTable exercises={exercises} />
          <div
            className="flex items-center justify-end border-t px-4 py-2"
            style={{ borderColor: 'var(--border-primary)' }}
          >
            <Link
              to="/warmup"
              className="inline-flex items-center gap-1 text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('warmup.configure')}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
