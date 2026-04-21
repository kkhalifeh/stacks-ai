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

  // Fallback hex values match Kinz v1 so an unthemed first-paint still looks right.
  const DARK = 'var(--color-dark, #1B2332)';
  const DARK_SURFACE = 'var(--color-dark-surface, #232B3B)';
  const LIGHT = 'var(--color-light-bg, #F5F7FA)';
  const PRIMARY = 'var(--color-primary, #1976D2)';

  let style: CSSProperties = { background: DARK };

  if (variant === 'solid-light') {
    style = { background: LIGHT };
  } else if (variant === 'gradient-radial') {
    style = {
      background: `radial-gradient(circle at 20% 25%, ${PRIMARY} 0%, ${DARK} 55%), ${DARK}`,
    };
  } else if (variant === 'gradient-linear') {
    style = {
      background: `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK} 70%, ${DARK_SURFACE} 100%)`,
    };
  } else if (variant === 'split') {
    style = {
      background: `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY} 42%, ${DARK} 42%, ${DARK} 100%)`,
    };
  } else if (variant === 'image-led') {
    style = {
      background: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, ${DARK} 70%)`,
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
