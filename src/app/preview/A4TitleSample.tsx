import { Canvas } from '../components/Canvas';

interface Props {
  brandName: string;
  logoUrl?: string;
}

export function A4TitleSample({ brandName, logoUrl }: Props) {
  return (
    <Canvas format="a4">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-accent-1)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-2)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-3)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-4)' }} />
        <div className="flex-1" style={{ background: 'var(--color-primary)' }} />
        <div className="flex-1" style={{ background: 'var(--color-dark)' }} />
      </div>

      <div className="flex-1 px-14 pt-16 pb-10 flex flex-col justify-between"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          background: 'var(--color-light-bg)',
        }}>
        <div>
          {logoUrl && (
            <img src={logoUrl} alt="" className="h-14 mb-12 object-contain" style={{ width: 'auto' }} />
          )}
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
            Proposal
          </p>
          <h1
            className="mt-6 text-5xl font-bold leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {brandName}
          </h1>
          <p className="mt-4 text-base max-w-md leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            A4 title sample — shows how a cover page reads with this brand's palette and typography.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="h-1 w-20 rounded-full" style={{ background: 'var(--color-primary)' }} />
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Prepared by {brandName}
          </div>
        </div>
      </div>
    </Canvas>
  );
}
