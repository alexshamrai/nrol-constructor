import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { ProgramList } from '../components/programs/ProgramList';
import { ProgramConfigurator } from '../components/programs/ProgramConfigurator';
import type { ProgramId } from '../types';

const validIds: Set<string> = new Set<string>([
  'bt1', 'bt2', 'bt3', 'bt4',
  'hyp1', 'hyp2', 'hyp3',
  'sp1', 'sp2', 'sp3',
]);

export function ProgramPage() {
  const { programId } = useParams<{ programId?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // No program selected — show the list
  if (!programId) {
    return (
      <ProgramList
        onSelectProgram={(id) => navigate(`/programs/${id}`)}
      />
    );
  }

  // Validate the id
  if (!validIds.has(programId)) {
    return (
      <div className="py-20 text-center" style={{ color: 'var(--text-muted)' }}>
        Unknown program: {programId}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/programs')}
        className="inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
        style={{ color: 'var(--text-muted)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.back')}
      </button>

      <ProgramConfigurator programId={programId as ProgramId} />
    </div>
  );
}
export default ProgramPage;
