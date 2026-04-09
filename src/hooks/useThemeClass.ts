import { useStore } from '../store/useStore';

/**
 * Returns theme-aware CSS class strings for common accent patterns.
 */
export function useThemeClass() {
  const theme = useStore((s) => s.theme);
  const isLight = theme === 'light';

  return {
    isLight,
    // Accent tags/pills
    blue: isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-400',
    green: isLight ? 'bg-green-100 text-green-700' : 'bg-green-900/40 text-green-400',
    red: isLight ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-400',
    yellow: isLight ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
    purple: isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/40 text-purple-400',
    // Row tints
    blueRow: isLight ? 'bg-blue-50' : 'bg-blue-950/30',
    greenRow: isLight ? 'bg-green-50' : 'bg-green-950/30',
    redRow: isLight ? 'bg-red-50' : 'bg-red-950/30',
    purpleRow: isLight ? 'bg-purple-50' : 'bg-purple-950/40',
    // Highlight
    selectedRing: isLight ? 'border-blue-500 ring-2 ring-blue-300/40 bg-blue-50' : 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-950/30',
    // Green selected pill
    greenPill: isLight
      ? 'bg-green-100 border border-green-300 text-green-700'
      : 'bg-green-900/40 border border-green-800/60 text-green-400',
  };
}
