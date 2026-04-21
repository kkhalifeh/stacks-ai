import { useRef } from 'react';
import { useStructural } from '../useStructural';
import { AccentStripe } from '../components/brand/AccentStripe';

interface Props {
  brandName: string;
  logoUrl?: string;
}

export function A4ContentSample({ brandName, logoUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { accentStripe, contentGrid } = useStructural(ref);

  const cols = contentGrid === 'three-column-cards' ? 3 : contentGrid === 'two-column' ? 2 : 1;

  return (
    <div
      ref={ref}
      className="flex flex-col relative"
      style={{ width: 794, height: 1123, fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)', background: 'white' }}
    >
      <AccentStripe variant={accentStripe} height={6} />

      <div
        className="px-12 pt-8 pb-5 flex flex-col"
        style={{ flex: '1 1 0%', minHeight: 0, height: '100%' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {logoUrl && <img src={logoUrl} alt="" className="w-7 h-7 object-contain opacity-40" />}
            <h1
              className="text-xl font-bold"
              style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}
            >
              Section Title
            </h1>
          </div>
          <span
            className="text-[10px] px-2 py-1 font-semibold tracking-wide uppercase"
            style={{
              background: 'var(--color-primary, #1976D2)',
              color: 'white',
              borderRadius: 'var(--radius-sm, 6px)',
            }}
          >
            Section
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border, rgba(0,0,0,0.1))' }} />

        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-primary, #1976D2)' }} />
          <h2
            className="text-base font-bold"
            style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}
          >
            A. Heading
          </h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text, #1B2332)' }}>
          Body copy for the section. Replace this paragraph with the actual narrative content. Keep
          sentences tight; this page reads like senior consulting writing.
        </p>

        <div
          className="grid gap-4 mb-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {[
            { title: 'Point one', color: 'var(--color-accent-1, var(--color-primary, #1976D2))' },
            { title: 'Point two', color: 'var(--color-primary, #1976D2)' },
            { title: 'Point three', color: 'var(--color-accent-3, var(--color-primary-light, #42A5F5))' },
          ].slice(0, cols).map(card => (
            <div
              key={card.title}
              className="p-4 flex flex-col"
              style={{
                background: 'var(--color-light-bg, #F5F7FA)',
                borderLeft: `4px solid ${card.color}`,
                borderRadius: 'var(--radius-md, 10px)',
              }}
            >
              <h3
                className="text-sm font-bold mb-2"
                style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}
              >
                {card.title}
              </h3>
              <p className="text-[12px] leading-[1.6]" style={{ color: 'var(--color-text-muted, rgba(0,0,0,0.6))' }}>
                Short supporting detail that explains the point.
              </p>
            </div>
          ))}
        </div>

        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{
            color: 'var(--color-text-muted, rgba(0,0,0,0.6))',
            borderColor: 'var(--color-border, rgba(0,0,0,0.1))',
          }}
        >
          <span>{brandName}</span>
          <span>Section · Page 1</span>
        </div>
      </div>
    </div>
  );
}
