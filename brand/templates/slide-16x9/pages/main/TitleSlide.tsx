import { useRef, type CSSProperties } from 'react';
import { useStructural } from '@/app/useStructural';
import logoWhite from '../../assets/logo-white.png';
import logoDark from '../../assets/logo.png';
import { AccentStripe } from '../../../a4/pages/main/_AccentStripe';

export function TitleSlide() {
  const ref = useRef<HTMLDivElement>(null);
  const { coverStyle, accentStripe, titleEmphasis } = useStructural(ref);

  const DARK = 'var(--color-dark, #1B2332)';
  const DARK_SURFACE = 'var(--color-dark-surface, #232B3B)';
  const LIGHT = 'var(--color-light-bg, #F5F7FA)';
  const PRIMARY = 'var(--color-primary, #1976D2)';

  const onDark = coverStyle !== 'solid-light';
  const textColor = onDark ? '#ffffff' : 'var(--color-text, #1B2332)';
  const subtleColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted, rgba(27,35,50,0.65))';
  const faintColor = onDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const logo = onDark ? logoWhite : logoDark;

  let coverBg: CSSProperties['background'] = DARK;
  if (coverStyle === 'solid-light') coverBg = LIGHT;
  else if (coverStyle === 'gradient-radial')
    coverBg = `radial-gradient(circle at 18% 30%, ${PRIMARY} 0%, ${DARK} 55%), ${DARK}`;
  else if (coverStyle === 'gradient-linear')
    coverBg = `linear-gradient(135deg, ${PRIMARY} 0%, ${DARK} 70%, ${DARK_SURFACE} 100%)`;
  else if (coverStyle === 'split')
    coverBg = `linear-gradient(90deg, ${PRIMARY} 0%, ${PRIMARY} 42%, ${DARK} 42%, ${DARK} 100%)`;
  else if (coverStyle === 'image-led')
    coverBg = `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, ${DARK} 70%)`;

  const titleClass =
    titleEmphasis === 'display-eyebrow'
      ? 'text-6xl font-bold leading-[1.02] max-w-3xl'
      : titleEmphasis === 'stacked-labels'
        ? 'text-4xl font-bold leading-[1.05] max-w-3xl'
        : 'text-5xl font-bold leading-[1.05] max-w-3xl';

  return (
    <div
      ref={ref}
      className="w-[1280px] h-[720px] flex flex-col relative overflow-hidden"
      style={{
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
        background: coverBg,
      }}
    >
      <AccentStripe variant={accentStripe} height={8} />

      <div className="relative flex flex-col px-24 pt-16 pb-12 z-10" style={{ flex: '1 1 auto' }}>
        <img src={logo} alt="" className="h-12 w-auto object-contain self-start mb-16" />

        <p
          className="text-sm font-medium tracking-[0.3em] uppercase mb-6"
          style={{
            color: onDark ? 'var(--color-primary-light, #42A5F5)' : 'var(--color-primary, #1976D2)',
            fontFamily: 'var(--font-body, inherit)',
          }}
        >
          {titleEmphasis === 'stacked-labels' ? 'Presentation · Brand · Overview' : 'Presentation'}
        </p>

        <h1
          className={titleClass}
          style={{ color: textColor, fontFamily: 'var(--font-heading, inherit)' }}
        >
          Presentation Title
        </h1>

        {accentStripe !== 'none' && (
          <div className="flex gap-1.5 my-6">
            <div className="h-1 w-10 rounded-full" style={{ background: 'var(--color-primary, #1976D2)' }} />
            <div className="h-1 w-6 rounded-full" style={{ background: 'var(--color-accent-3, var(--color-primary-light, #42A5F5))' }} />
            <div className="h-1 w-3 rounded-full" style={{ background: 'var(--color-accent-2, var(--color-primary, #1976D2))' }} />
          </div>
        )}

        <p className="text-lg max-w-xl mb-1" style={{ color: subtleColor }}>Subtitle goes here</p>
        <p className="text-sm max-w-lg" style={{ color: faintColor }}>
          One-line descriptor that sits under the subtitle.
        </p>

        <div className="mt-auto flex justify-between items-end text-xs">
          <div>
            <p className="text-[10px] mb-1 uppercase tracking-wider" style={{ color: faintColor }}>Presented by</p>
            <p style={{ color: subtleColor }}>Your organization</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] mb-1 uppercase tracking-wider" style={{ color: faintColor }}>Date</p>
            <p style={{ color: subtleColor }}>Month Year</p>
          </div>
        </div>
      </div>
    </div>
  );
}
