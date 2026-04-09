import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Dumbbell,
  ClipboardList,
  Calendar,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useStore } from '../../store/useStore';

const navItems = [
  { to: '/', labelKey: 'nav.home', icon: Home },
  { to: '/exercises', labelKey: 'nav.exercises', icon: Dumbbell },
  { to: '/programs', labelKey: 'nav.programs', icon: ClipboardList },
  { to: '/planner', labelKey: 'nav.planner', icon: Calendar },
  { to: '/settings', labelKey: 'nav.settings', icon: Settings },
] as const;

export function Header() {
  const { t } = useTranslation();
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Left: App title */}
        <span className="text-lg font-bold shrink-0" style={{ color: 'var(--text-primary)' }}>
          NROL Constructor
        </span>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, labelKey, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors',
                  isActive
                    ? 'border-b-2 border-blue-500'
                    : 'hover:opacity-80',
                ].join(' ')
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              })}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t(labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right: Theme toggle + Language switcher */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center rounded-md p-2 transition-colors hover:opacity-80"
            aria-label={theme === 'dark' ? t('settings.light') : t('settings.dark')}
          >
            {theme === 'dark' ? (
              <Moon className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            ) : (
              <Sun className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
