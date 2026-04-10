import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { equipmentPresets } from '../../data/equipment';
import { EquipmentSelector } from './EquipmentSelector';
import type { EquipmentItem } from '../../types';

function arraysEqual(a: EquipmentItem[], b: EquipmentItem[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((item, idx) => item === sortedB[idx]);
}

export function CollapsibleEquipmentPanel() {
  const { t } = useTranslation();
  const equipment = useStore((s) => s.equipment);
  const [isOpen, setIsOpen] = useState(false);

  const activePreset = equipmentPresets.find((p) => arraysEqual(p.items, equipment));
  const summary = activePreset
    ? activePreset.nameEn
    : `${equipment.length} / 12`;

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
          <Wrench className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
          {t('equipment.title')}
          <span
            className="rounded px-2 py-0.5 text-xs"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
          >
            {summary}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
        ) : (
          <ChevronDown className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
        )}
      </button>

      {isOpen && (
        <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: 'var(--border-primary)' }}>
          <EquipmentSelector compact />
        </div>
      )}
    </div>
  );
}
