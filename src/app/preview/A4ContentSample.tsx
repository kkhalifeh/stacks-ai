import { Canvas } from '../components/Canvas';

interface Props {
  brandName: string;
  logoUrl?: string;
}

export function A4ContentSample({ brandName, logoUrl }: Props) {
  return (
    <Canvas format="a4">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-accent-1)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-2)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-3)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-4)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {logoUrl && <img src={logoUrl} alt="" className="w-7 h-7 opacity-50 object-contain" />}
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Overview
            </h1>
          </div>
          <span
            className="text-[10px] px-2 py-1 font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-sm)' }}
          >
            Section
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-primary)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
            Executive Summary
          </h2>
        </div>
        <p className="text-[13px] leading-[1.75] mb-4" style={{ color: 'var(--color-text)' }}>
          This is a paragraph of sample body text showing how typography and color contrast read at A4 document scale.
          Headings, subheadings, list items, and accent callouts will all follow this brand's palette when applied to
          real pages.
        </p>

        <div
          className="p-4 mb-4"
          style={{
            background: 'var(--color-light-bg)',
            borderLeft: `4px solid var(--color-primary)`,
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
            Callout
          </p>
          <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
            A subtle accent callout uses the primary color for emphasis without overwhelming the page.
          </p>
        </div>

        <div
          className="p-4 text-[13px]"
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <strong>Relevance:</strong> A bolder callout for the most important point on the page.
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>{brandName}</span>
          <span>Page 1</span>
        </div>
      </div>
    </Canvas>
  );
}
