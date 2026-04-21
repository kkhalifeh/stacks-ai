import { useRef } from 'react';
import { useStructural } from '@/app/useStructural';
import logo from '../../assets/logo.png';
import { AccentStripe } from '@/app/components/brand/AccentStripe';

export function ContentPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { accentStripe } = useStructural(ref);

  return (
    <div
      ref={ref}
      className="w-[794px] h-[1123px] flex flex-col relative"
      style={{ fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)' }}
    >
      <AccentStripe variant={accentStripe} height={6} />

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading, inherit)' }}>
              Section Title
            </h1>
          </div>
          <span
            className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            Section
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading, inherit)' }}>
            A. Heading
          </h2>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading, inherit)' }}>
          1. Sub-heading
        </h3>

        <div className="text-[13px] leading-[1.7] space-y-3" style={{ color: 'var(--color-text)' }}>
          <p>
            Body copy for the section. Replace this paragraph with the actual narrative content. Keep
            sentences tight; this page is meant to read like senior consulting writing, not marketing
            copy.
          </p>

          <p>The key points covered in this section are:</p>

          <div className="space-y-2 pl-1">
            {[
              { label: 'First point', desc: 'Brief supporting detail that explains why this point matters and what evidence supports it.' },
              { label: 'Second point', desc: 'Another supporting detail written in the same structured, concise voice.' },
              { label: 'Third point', desc: 'Short supporting detail. Avoid filler. Lead with the insight.' },
            ].map(item => (
              <div key={item.label} className="flex gap-2">
                <span className="font-bold flex-shrink-0" style={{ color: 'var(--color-primary)' }}>&bull;</span>
                <p><strong>{item.label}:</strong> {item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-lg p-4 mt-4 border-l-4"
          style={{
            background: 'var(--color-light-bg)',
            borderColor: 'var(--color-kinz-blue)',
          }}
        >
          <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
            Callout
          </p>
          <p className="text-[12px] leading-[1.7]" style={{ color: 'var(--color-text-muted)' }}>
            A subtle light-background callout uses the primary brand color for the left border, drawing
            attention without overwhelming the page.
          </p>
        </div>

        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>Section &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}
