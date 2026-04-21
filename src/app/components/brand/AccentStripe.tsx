import type { AccentStripe } from '@/app/brand-api';

interface Props {
  variant: AccentStripe;
  height?: number;
}

/** Renders the top accent according to the active accent_stripe structural token. */
export function AccentStripe({ variant, height = 6 }: Props) {
  if (variant === 'none') return null;

  if (variant === 'corner-mark') {
    return (
      <div
        className="absolute top-0 left-0 flex-shrink-0 z-10"
        style={{
          width: height * 10,
          height,
          background: 'var(--color-primary)',
        }}
      />
    );
  }

  if (variant === 'single-bar') {
    return (
      <div
        className="flex-shrink-0"
        style={{ height, background: 'var(--color-primary)' }}
      />
    );
  }

  if (variant === 'triplet') {
    return (
      <div className="flex flex-shrink-0" style={{ height }}>
        <div style={{ flex: 2, background: 'var(--color-accent-1)' }} />
        <div style={{ flex: 1, background: 'var(--color-accent-2)' }} />
        <div style={{ flex: 3, background: 'var(--color-primary)' }} />
      </div>
    );
  }

  // rainbow-6
  return (
    <div className="flex flex-shrink-0" style={{ height }}>
      <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
      <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
      <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
      <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
      <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
      <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
    </div>
  );
}
