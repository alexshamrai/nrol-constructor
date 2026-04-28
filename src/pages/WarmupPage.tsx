import { useTranslation } from 'react-i18next';
import { WarmupConfig } from '../components/warmup/WarmupConfig';

export function WarmupPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {t('warmup.title')}
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('warmup.subtitle')}
        </p>
      </div>
      <WarmupConfig />
    </div>
  );
}

export default WarmupPage;
