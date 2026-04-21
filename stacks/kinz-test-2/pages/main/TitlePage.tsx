import { useRef, type CSSProperties } from 'react';
import { useStructural } from '@/app/useStructural';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo.png';
import { AccentStripe } from '@/app/components/brand/AccentStripe';

export function TitlePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { coverStyle, accentStripe, titleEmphasis } = useStructural(ref);

  const DARK = 'var(--color-dark, #1B2332)';
  const DARK_SURFACE = 'var(--color-dark-surface, #232B3B)';
  const LIGHT = 'var(--color-light-bg, #F5F7FA)';
  const PRIMARY = 'var(--color-primary, #1976D2)';

  const onDark = coverStyle !== 'solid-light';
  const textColor = onDark ? '#ffffff' : 'var(--color-text, #1B2332)';
  const subtleColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted, rgba(27,35,50,0.65))';
  const faintColor = onDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';
  const panelBg = onDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
  const logo = onDark ? logoWhite : logoDark;

  let coverBg: CSSProperties['background'] = DARK;
  if (coverStyle === 'solid-light') coverBg = LIGHT;
  else if (coverStyle === 'gradient-radial')
    coverBg = `radial-gradient(circle at 20% 25%, ${PRIMARY} 0%, ${DARK} 55%), ${DARK}`;
  else if (coverStyle === 'gradient-linear')
    coverBg = `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK} 70%, ${DARK_SURFACE} 100%)`;
  else if (coverStyle === 'split')
    coverBg = `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY} 42%, ${DARK} 42%, ${DARK} 100%)`;
  else if (coverStyle === 'image-led')
    coverBg = `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, ${DARK} 70%)`;

  const titleClass =
    titleEmphasis === 'display-eyebrow'
      ? 'text-4xl font-bold leading-tight max-w-[640px]'
      : titleEmphasis === 'stacked-labels'
        ? 'text-2xl font-bold leading-tight max-w-[600px]'
        : 'text-3xl font-bold leading-tight max-w-[600px]';

  return (
    <div
      ref={ref}
      className="w-[794px] h-[1123px] flex flex-col"
      style={{ fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)' }}
    >
      <AccentStripe variant={accentStripe} height={8} />

      <div className="flex flex-col p-12 relative" style={{ flex: '1 1 auto', background: coverBg }}>
        <img src={logo} alt="" className="h-14 w-auto object-contain self-start mb-16" />

        <p
          className="text-sm font-medium tracking-widest uppercase mb-6"
          style={{
            color: onDark ? 'var(--color-primary-light, #42A5F5)' : 'var(--color-primary, #1976D2)',
            fontFamily: 'var(--font-body, inherit)',
          }}
        >
          {titleEmphasis === 'stacked-labels' ? 'Proposal · Technical · Document' : 'Proposal'}
        </p>

        <h1
          className={titleClass}
          style={{ color: textColor, fontFamily: 'var(--font-heading, inherit)' }}
        >
          Project Title
        </h1>

        {accentStripe !== 'none' && (
          <div className="flex gap-1 my-6">
            <div className="h-1 w-8 rounded-full" style={{ background: 'var(--color-primary, #1976D2)' }} />
            <div className="h-1 w-4 rounded-full" style={{ background: 'var(--color-accent-3, var(--color-primary-light, #42A5F5))' }} />
            <div className="h-1 w-2 rounded-full" style={{ background: 'var(--color-accent-2, var(--color-primary, #1976D2))' }} />
          </div>
        )}

        <p className="text-lg mb-1" style={{ color: subtleColor }}>Subtitle goes here</p>
        <p className="text-sm max-w-[500px]" style={{ color: faintColor }}>
          One-line descriptor that sits under the subtitle. Replace with the real project context.
        </p>

        <div
          className="mt-auto rounded-lg p-6"
          style={{ background: panelBg, borderRadius: 'var(--radius-lg, 14px)' }}
        >
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <p className="text-xs mb-1" style={{ color: faintColor }}>Prepared for</p>
              <p style={{ color: subtleColor }}>Client Name</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: faintColor }}>Date</p>
              <p style={{ color: subtleColor }}>Month Year</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: faintColor }}>Prepared by</p>
              <p style={{ color: subtleColor }}>Your organization</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: faintColor }}>Reference</p>
              <p style={{ color: subtleColor }}>Document reference</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="px-8 py-3 flex justify-between items-center text-xs bg-white"
        style={{ color: 'var(--color-text-muted, rgba(27,35,50,0.65))' }}
      >
        <span className="font-medium" style={{ color: 'var(--color-text, #1B2332)' }}>Kinz</span>
        <span>www.kinz.jo</span>
        <span>Confidential</span>
      </div>
    </div>
  );
}
