import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { EquipmentSelector } from '../components/equipment/EquipmentSelector';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { useStore } from '../store/useStore';

export function SettingsPage() {
  const { t } = useTranslation();
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {t('settings.title')}
      </h1>

      {/* Equipment Setup */}
      <section
        className="rounded-lg border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          {t('equipment.title')}
        </h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          {t('equipment.description')}
        </p>
        <EquipmentSelector />
      </section>

      {/* Language */}
      <section
        className="rounded-lg border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          {t('settings.language')}
        </h2>
        <LanguageSwitcher />
      </section>

      {/* Theme */}
      <section
        className="rounded-lg border p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
          {t('settings.theme')}
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={[
              'flex flex-col items-center gap-2 rounded-lg border-2 px-6 py-4 transition-colors cursor-pointer',
              theme === 'dark' ? 'border-blue-500 ring-2 ring-blue-500/30' : '',
            ].join(' ')}
            style={{
              backgroundColor: theme === 'dark' ? 'var(--bg-tertiary)' : 'var(--bg-tertiary)',
              borderColor: theme === 'dark' ? undefined : 'var(--border-secondary)',
            }}
          >
            <Moon className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {t('settings.dark')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={[
              'flex flex-col items-center gap-2 rounded-lg border-2 px-6 py-4 transition-colors cursor-pointer',
              theme === 'light' ? 'border-blue-500 ring-2 ring-blue-500/30' : '',
            ].join(' ')}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: theme === 'light' ? undefined : 'var(--border-secondary)',
            }}
          >
            <Sun className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {t('settings.light')}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
export default SettingsPage;
