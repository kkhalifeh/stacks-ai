import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accent?: string;
}

export function LoadingOverlay({
  title,
  subtitle,
  icon,
  accent = 'var(--lx-accent)',
}: LoadingOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{
        background: 'rgba(6, 6, 8, 0.72)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="w-full max-w-md p-8 flex flex-col items-center text-center"
        style={{
          background: 'var(--lx-surface-2)',
          border: '1px solid var(--lx-border-strong)',
          borderRadius: 'var(--lx-radius-lg)',
          boxShadow: 'var(--lx-shadow-elevated)',
        }}
      >
        <div className="relative w-14 h-14 mb-5">
          <span
            className="absolute inset-0 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'var(--lx-border)',
              borderTopColor: accent,
              animationDuration: '1.1s',
            }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: accent }}
          >
            {icon ?? <Sparkles className="w-5 h-5" strokeWidth={1.75} />}
          </span>
        </div>

        <div
          className="text-[14px] font-semibold mb-1 tracking-tight"
          style={{ color: 'var(--lx-text)' }}
        >
          {title}
        </div>

        {subtitle && (
          <div className="text-[12px]" style={{ color: 'var(--lx-text-muted)' }}>
            {subtitle}
          </div>
        )}

        <div
          className="mt-6 w-full h-1 overflow-hidden"
          style={{
            background: 'var(--lx-surface-hover)',
            borderRadius: 'var(--lx-radius-sm)',
          }}
        >
          <div
            className="h-full lx-loading-bar"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
