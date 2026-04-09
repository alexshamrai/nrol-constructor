import { useTranslation } from 'react-i18next';
import { ExerciseCatalog } from '../components/exercises/ExerciseCatalog';

export function ExercisesPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
        {t('exercises.title')}
      </h1>
      <ExerciseCatalog />
    </div>
  );
}
export default ExercisesPage;
