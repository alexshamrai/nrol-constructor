import type { ReactNode } from 'react';
import { useStore } from '../../store/useStore';

type BadgeVariant = 'available' | 'adaptation' | 'unavailable' | 'bt' | 'hyp' | 'sp';

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const darkStyles: Record<BadgeVariant, string> = {
  available: 'bg-green-900/50 text-green-400 border-green-700',
  adaptation: 'bg-yellow-900/50 text-yellow-400 border-yellow-700',
  unavailable: 'bg-red-900/50 text-red-400 border-red-700',
  bt: 'bg-green-900/50 text-green-400 border-green-700',
  hyp: 'bg-blue-900/50 text-blue-400 border-blue-700',
  sp: 'bg-red-900/50 text-red-400 border-red-700',
};

const lightStyles: Record<BadgeVariant, string> = {
  available: 'bg-green-100 text-green-800 border-green-300',
  adaptation: 'bg-amber-100 text-amber-800 border-amber-300',
  unavailable: 'bg-red-100 text-red-800 border-red-300',
  bt: 'bg-green-100 text-green-800 border-green-300',
  hyp: 'bg-blue-100 text-blue-800 border-blue-300',
  sp: 'bg-red-100 text-red-800 border-red-300',
};

export function Badge({ variant, children, className = '' }: BadgeProps) {
  const theme = useStore((s) => s.theme);
  const styles = theme === 'light' ? lightStyles[variant] : darkStyles[variant];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
