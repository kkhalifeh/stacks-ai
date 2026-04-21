import { Canvas } from '../components/Canvas';

interface Props {
  brandName: string;
  logoUrl?: string;
}

export function SlideContentSample({ brandName, logoUrl }: Props) {
  return (
    <Canvas
      format="slide-16x9"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-light-bg)', fontFamily: 'var(--font-body)' }}
    >
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-accent-1)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-2)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-3)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-4)' }} />
      </div>

      <div className="flex-1 flex flex-col px-20 py-12" style={{ color: 'var(--color-text)' }}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {logoUrl && <img src={logoUrl} alt="" className="h-6 object-contain opacity-70" style={{ width: 'auto' }} />}
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              Section 02
            </p>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{brandName}</p>
        </div>

        <h2 className="text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Value Pillars
        </h2>
        <p className="text-base mb-10 max-w-3xl" style={{ color: 'var(--color-text-muted)' }}>
          A content slide with three columns shows how the palette plays across a layout with multiple accents.
        </p>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {[
            { n: '01', title: 'Brand clarity', accent: 'var(--color-primary)' },
            { n: '02', title: 'Consistent tone', accent: 'var(--color-accent-2)' },
            { n: '03', title: 'Fast output', accent: 'var(--color-accent-3)' },
          ].map(p => (
            <div
              key={p.n}
              className="p-6 flex flex-col"
              style={{
                background: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-resting)',
              }}
            >
              <div className="h-1 w-10 mb-6 rounded-full" style={{ background: p.accent }} />
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                {p.n}
              </p>
              <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {p.title}
              </h3>
              <p className="text-sm flex-1" style={{ color: 'var(--color-text-muted)' }}>
                Short supporting description rendered in body text.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}
