import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useLocalizedField } from '../../hooks/useLocalizedField';
import { equipmentItems, equipmentPresets } from '../../data/equipment';
import type { EquipmentItem } from '../../types';

interface EquipmentSelectorProps {
  compact?: boolean;
}

function arraysEqual(a: EquipmentItem[], b: EquipmentItem[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((item, idx) => item === sortedB[idx]);
}

export function EquipmentSelector({ compact = false }: EquipmentSelectorProps) {
  const { t } = useTranslation();
  const localized = useLocalizedField();
  const equipment = useStore((s) => s.equipment);
  const setEquipment = useStore((s) => s.setEquipment);
  const toggleEquipment = useStore((s) => s.toggleEquipment);

  const activePresetId = equipmentPresets.find((preset) =>
    arraysEqual(preset.items, equipment),
  )?.id ?? null;

  return (
    <div className={`flex flex-col ${compact ? 'gap-3' : 'gap-6'}`}>
      {/* Presets */}
      <div>
        <h3 className="text-sm font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
          {t('equipment.presets')}
        </h3>
        <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-2`}>
          {equipmentPresets.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setEquipment([...preset.items])}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                    : ''
                }`}
                style={isActive ? undefined : {
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-secondary)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="font-medium">{localized.name(preset)}</span>
                <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {preset.items.length} {t('exercises.equipment').toLowerCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checklist */}
      <div>
        <h3 className="text-sm font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
          {t('exercises.equipment')}
        </h3>
        <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'} gap-1`}>
          {equipmentItems.map((item) => {
            const isChecked = equipment.includes(item.id);
            return (
              <label
                key={item.id}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition hover:opacity-80"
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                    isChecked
                      ? 'border-blue-500 bg-blue-600'
                      : ''
                  }`}
                  style={isChecked ? undefined : {
                    borderColor: 'var(--border-secondary)',
                    backgroundColor: 'var(--bg-tertiary)',
                  }}
                >
                  {isChecked && <Check className="h-3 w-3 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleEquipment(item.id)}
                  className="sr-only"
                />
                <span style={{ color: isChecked ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                  {localized.name(item)}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
