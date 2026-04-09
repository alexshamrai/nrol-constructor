import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const setLanguage = useStore((s) => s.setLanguage);

  const currentLang = i18n.language === 'ua' ? 'ua' : 'en';

  const toggle = () => {
    const next = currentLang === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(next);
    setLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors hover:opacity-80"
    >
      <Globe className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
      <span
        className={currentLang === 'en' ? 'font-bold' : ''}
        style={{ color: currentLang === 'en' ? 'var(--text-primary)' : 'var(--text-muted)' }}
      >
        EN
      </span>
      <span style={{ color: 'var(--text-muted)' }}>|</span>
      <span
        className={currentLang === 'ua' ? 'font-bold' : ''}
        style={{ color: currentLang === 'ua' ? 'var(--text-primary)' : 'var(--text-muted)' }}
      >
        UA
      </span>
    </button>
  );
}
