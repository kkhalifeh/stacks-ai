import type { CSSProperties, ReactNode } from 'react';
import type { CoverStyle } from '@/app/brand-api';

interface Props {
  variant: CoverStyle;
  children: ReactNode;
  /** When true, text is light (covers on dark). When false, text is dark (covers on light). */
  onDarkOverride?: boolean;
}

/** Background treatment for title covers / title slides. Branches on cover_style. */
export function CoverBackground({ variant, children, onDarkOverride }: Props) {
  const baseDark = onDarkOverride ?? (variant !== 'solid-light');

  let style: CSSProperties = { background: 'var(--color-dark)' };

  if (variant === 'solid-light') {
    style = { background: 'var(--color-light-bg)' };
  } else if (variant === 'gradient-radial') {
    style = {
      background: `radial-gradient(circle at 20% 25%, var(--color-primary) 0%, var(--color-dark) 55%), var(--color-dark)`,
    };
  } else if (variant === 'gradient-linear') {
    style = {
      background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-dark) 70%, var(--color-dark-surface) 100%)`,
    };
  } else if (variant === 'split') {
    style = {
      background: `linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 42%, var(--color-dark) 42%, var(--color-dark) 100%)`,
    };
  } else if (variant === 'image-led') {
    // Image-led: dark base with a subtle vignette; consumer provides imagery.
    style = {
      background: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, var(--color-dark) 70%)`,
    };
  }

  return (
    <div
      className="flex-1 min-h-0 flex flex-col relative overflow-hidden"
      style={{ ...style, flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
      data-on-dark={baseDark ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}
