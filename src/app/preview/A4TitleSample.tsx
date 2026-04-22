import { useRef, type CSSProperties } from 'react';
import { useStructural } from '../useStructural';
import { AccentStripe } from '../components/brand/AccentStripe';
import { resolveLogo, type LogoSet } from './logoAsset';

interface Props {
  brandName: string;
  logoUrl?: string;
  logos?: LogoSet;
}

export function A4TitleSample({ brandName, logoUrl, logos }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { coverStyle, accentStripe, titleEmphasis, logoCoverTreatment } = useStructural(ref);

  const resolvedLogos: LogoSet = { primary: logoUrl, ...logos };
  const logo = resolveLogo(logoCoverTreatment, resolvedLogos);

  const DARK = 'var(--color-dark, #1B2332)';
  const DARK_SURFACE = 'var(--color-dark-surface, #232B3B)';
  const LIGHT = 'var(--color-light-bg, #F5F7FA)';
  const PRIMARY = 'var(--color-primary, #1976D2)';
  const TEXT = 'var(--color-text, #1B2332)';

  if (coverStyle === 'typographic-poster') {
    // Surface follows the logo ink: a dark-ink logo goes on a light poster,
    // a light-ink logo (forced via light / mono-light / auto-invert) goes on dark.
    return (
      <TypographicPosterA4
        outerRef={ref}
        brandName={brandName}
        logo={logo}
        onLight={treatmentImpliesDarkInk(logoCoverTreatment)}
      />
    );
  }
  if (coverStyle === 'editorial-spread') {
    return (
      <EditorialSpreadA4
        outerRef={ref}
        brandName={brandName}
        logo={logo}
      />
    );
  }

  const onDark = coverStyle !== 'solid-light';
  const textColor = onDark ? '#ffffff' : TEXT;
  const subtleColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted, rgba(27,35,50,0.65))';
  const faintColor = onDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
  const panelBg = onDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';

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
      className="flex flex-col"
      style={{ width: 794, height: 1123, fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)' }}
    >
      <AccentStripe variant={accentStripe} height={8} />
      <div
        className="flex flex-col p-12 relative"
        style={{ flex: '1 1 0%', minHeight: 0, height: '100%', background: coverBg }}
      >
        {logo.src && (
          <img
            src={logo.src}
            alt=""
            className="h-14 w-auto object-contain self-start mb-16"
            style={logo.filter ? { filter: logo.filter } : undefined}
          />
        )}

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
            <div className="h-1 w-8 rounded-full" style={{ background: PRIMARY }} />
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
              <p style={{ color: subtleColor }}>{brandName}</p>
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
        <span className="font-medium" style={{ color: 'var(--color-text, #1B2332)' }}>{brandName}</span>
        <span>Confidential</span>
      </div>
    </div>
  );
}

function treatmentImpliesDarkInk(t: string): boolean {
  // 'primary' leaves the logo as uploaded — the model's job is to only pick it
  // when the uploaded logo is already dark ink. 'mono-dark' force-blackens.
  return t === 'primary' || t === 'mono-dark';
}

function TypographicPosterA4({
  outerRef,
  brandName,
  logo,
  onLight,
}: {
  outerRef: React.RefObject<HTMLDivElement>;
  brandName: string;
  logo: { src?: string; filter?: string };
  onLight: boolean;
}) {
  const bg = onLight ? 'var(--color-light-bg, #F5F7FA)' : 'var(--color-dark, #1B2332)';
  const fg = onLight ? 'var(--color-text, #1B2332)' : '#ffffff';
  const muted = onLight ? 'var(--color-text-muted, rgba(27,35,50,0.55))' : 'rgba(255,255,255,0.55)';
  return (
    <div
      ref={outerRef}
      className="flex flex-col"
      style={{
        width: 794,
        height: 1123,
        background: bg,
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
      }}
    >
      <div
        className="flex-1 flex flex-col justify-between p-16 relative"
        style={{ color: fg }}
      >
        <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.3em]" style={{ color: muted }}>
          <span>{brandName}</span>
          <span>Proposal · 2026</span>
        </div>

        <h1
          className="text-[96px] leading-[0.95] font-bold tracking-tight"
          style={{ color: fg, fontFamily: 'var(--font-heading, inherit)' }}
        >
          Project<br />Title.
        </h1>

        <div className="flex items-end justify-between">
          {logo.src && (
            <img
              src={logo.src}
              alt=""
              className="h-8 w-auto object-contain"
              style={logo.filter ? { filter: logo.filter } : undefined}
            />
          )}
          <p className="text-[11px] max-w-[280px] text-right leading-relaxed" style={{ color: muted }}>
            A one-line descriptor that frames the document, set in the body font.
          </p>
        </div>
      </div>
    </div>
  );
}

function EditorialSpreadA4({
  outerRef,
  brandName,
  logo,
}: {
  outerRef: React.RefObject<HTMLDivElement>;
  brandName: string;
  logo: { src?: string; filter?: string };
}) {
  const bg = 'var(--color-light-bg, #FAFAF7)';
  const fg = 'var(--color-text, #1B2332)';
  const rule = 'var(--color-primary, #1976D2)';
  const muted = 'var(--color-text-muted, rgba(27,35,50,0.6))';
  return (
    <div
      ref={outerRef}
      className="grid"
      style={{
        width: 794,
        height: 1123,
        background: bg,
        gridTemplateColumns: '1.6fr 1fr',
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
      }}
    >
      <div className="p-16 flex flex-col justify-between" style={{ borderRight: `1px solid ${muted}`, color: fg }}>
        <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: muted }}>Volume I · Proposal</p>
        <div>
          <div className="h-[3px] w-24 mb-6" style={{ background: rule }} />
          <h1
            className="text-[56px] leading-[1.02] font-bold tracking-tight"
            style={{ color: fg, fontFamily: 'var(--font-heading, inherit)' }}
          >
            A project<br />title set as<br />an editorial<br />statement.
          </h1>
        </div>
        <p className="text-[12px] leading-relaxed max-w-[340px]" style={{ color: muted }}>
          A deck that reads like a piece of writing. Replace this with the real context paragraph — two or three lines that set up the document.
        </p>
      </div>
      <div className="p-12 flex flex-col justify-between" style={{ color: fg }}>
        {logo.src && (
          <img
            src={logo.src}
            alt=""
            className="h-10 w-auto object-contain"
            style={logo.filter ? { filter: logo.filter } : undefined}
          />
        )}
        <dl className="flex flex-col gap-5 text-[12px]">
          <MetaRow label="Prepared for" value="Client Name" muted={muted} />
          <MetaRow label="Prepared by" value={brandName} muted={muted} />
          <MetaRow label="Date" value="Month 2026" muted={muted} />
          <MetaRow label="Reference" value="Document ID" muted={muted} />
          <MetaRow label="Classification" value="Confidential" muted={muted} />
        </dl>
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: muted }}>{brandName}</p>
      </div>
    </div>
  );
}

function MetaRow({ label, value, muted }: { label: string; value: string; muted: string }) {
  return (
    <div>
      <dt className="text-[9px] uppercase tracking-[0.25em] mb-1" style={{ color: muted }}>{label}</dt>
      <dd className="text-[13px]" style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}>
        {value}
      </dd>
    </div>
  );
}
