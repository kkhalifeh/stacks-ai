import { useRef } from 'react';
import { useStructural } from '../useStructural';
import { AccentStripe } from '../components/brand/AccentStripe';
import { resolveLogo, type LogoSet } from './logoAsset';

interface Props {
  brandName: string;
  logoUrl?: string;
  logos?: LogoSet;
}

export function SlideContentSample({ brandName, logoUrl, logos }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { accentStripe, contentGrid, logoContentTreatment } = useStructural(ref);
  const cols = contentGrid === 'single-column' ? 1 : contentGrid === 'two-column' ? 2 : 3;
  const logo = resolveLogo(logoContentTreatment, { primary: logoUrl, ...logos });
  const cards = [
    { n: '01', title: 'First pillar', accent: 'var(--color-accent-1, var(--color-primary, #1976D2))' },
    { n: '02', title: 'Second pillar', accent: 'var(--color-primary, #1976D2)' },
    { n: '03', title: 'Third pillar', accent: 'var(--color-accent-3, var(--color-primary-light, #42A5F5))' },
  ].slice(0, cols);

  return (
    <div
      ref={ref}
      className="flex flex-col relative overflow-hidden"
      style={{
        width: 1280,
        height: 720,
        background: 'white',
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
      }}
    >
      <AccentStripe variant={accentStripe} height={6} />

      <div className="flex-1 px-20 pt-10 pb-10 flex flex-col" style={{ color: 'var(--color-text, #1B2332)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {logo.src && (
              <img
                src={logo.src}
                alt=""
                className="w-7 h-7 object-contain opacity-40"
                style={logo.filter ? { filter: logo.filter } : undefined}
              />
            )}
            <span
              className="text-[10px] px-2 py-1 font-semibold tracking-wide uppercase"
              style={{ background: 'var(--color-primary, #1976D2)', color: 'white', borderRadius: 'var(--radius-sm, 6px)' }}
            >
              Section 01
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))' }}>{brandName}</p>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 rounded-full" style={{ background: 'var(--color-primary, #1976D2)' }} />
          <h2
            className="text-3xl font-bold"
            style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}
          >
            Slide Heading
          </h2>
        </div>
        <p className="text-[15px] max-w-3xl mb-8" style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))' }}>
          One-paragraph intro that frames the point of this slide.
        </p>

        <div className="grid gap-5 flex-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {cards.map(card => (
            <div
              key={card.n}
              className="p-6 flex flex-col"
              style={{
                background: 'var(--color-light-bg, #F5F7FA)',
                borderLeft: `4px solid ${card.accent}`,
                borderRadius: 'var(--radius-lg, 14px)',
              }}
            >
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))' }}>
                {card.n}
              </p>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}
              >
                {card.title}
              </h3>
              <p className="text-[12px] leading-[1.6] flex-1" style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))' }}>
                Short supporting description.
              </p>
            </div>
          ))}
        </div>

        <div
          className="pt-3 mt-6 flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))', borderColor: 'var(--color-border, rgba(0,0,0,0.1))' }}
        >
          <span>{brandName}</span>
          <span>Deck · Slide 2</span>
        </div>
      </div>
    </div>
  );
}
