import { useRef, type CSSProperties } from 'react';
import { useStructural } from '../useStructural';
import { AccentStripe } from '../components/brand/AccentStripe';
import { resolveLogo, type LogoSet } from './logoAsset';

interface Props {
  brandName: string;
  logoUrl?: string;
  logos?: LogoSet;
}

export function SlideTitleSample({ brandName, logoUrl, logos }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { coverStyle, accentStripe, titleEmphasis, logoCoverTreatment } = useStructural(ref);

  const resolvedLogos: LogoSet = { primary: logoUrl, ...logos };
  const logo = resolveLogo(logoCoverTreatment, resolvedLogos);

  const DARK = 'var(--color-dark, #1B2332)';
  const DARK_SURFACE = 'var(--color-dark-surface, #232B3B)';
  const LIGHT = 'var(--color-light-bg, #F5F7FA)';
  const PRIMARY = 'var(--color-primary, #1976D2)';

  if (coverStyle === 'typographic-poster') {
    return (
      <TypographicPosterSlide
        outerRef={ref}
        brandName={brandName}
        logo={logo}
        onLight={treatmentImpliesDarkInk(logoCoverTreatment)}
      />
    );
  }
  if (coverStyle === 'editorial-spread') {
    return (
      <EditorialSpreadSlide
        outerRef={ref}
        brandName={brandName}
        logo={logo}
      />
    );
  }

  const onDark = coverStyle !== 'solid-light';
  const textColor = onDark ? '#ffffff' : 'var(--color-text, #1B2332)';
  const subtleColor = onDark ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted, rgba(27,35,50,0.65))';
  const faintColor = onDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

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
      className="flex flex-col relative overflow-hidden"
      style={{
        width: 1280,
        height: 720,
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
        background: coverBg,
      }}
    >
      <AccentStripe variant={accentStripe} height={8} />

      <div
        className="relative flex flex-col px-24 pt-16 pb-12 z-10"
        style={{ flex: '1 1 0%', minHeight: 0, height: '100%' }}
      >
        {logo.src && (
          <img
            src={logo.src}
            alt=""
            className="h-12 w-auto object-contain self-start mb-16"
            style={logo.filter ? { filter: logo.filter } : undefined}
          />
        )}

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
            <div className="h-1 w-10 rounded-full" style={{ background: PRIMARY }} />
            <div className="h-1 w-6 rounded-full" style={{ background: 'var(--color-accent-3, var(--color-primary-light, #42A5F5))' }} />
            <div className="h-1 w-3 rounded-full" style={{ background: 'var(--color-accent-2, var(--color-primary, #1976D2))' }} />
          </div>
        )}

        <p className="text-lg max-w-xl mb-1" style={{ color: subtleColor }}>Subtitle goes here</p>
        <p className="text-sm max-w-lg" style={{ color: faintColor }}>One-line descriptor.</p>

        <div className="mt-auto flex justify-between items-end text-xs">
          <div>
            <p className="text-[10px] mb-1 uppercase tracking-wider" style={{ color: faintColor }}>Presented by</p>
            <p style={{ color: subtleColor }}>{brandName}</p>
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

function treatmentImpliesDarkInk(t: string): boolean {
  return t === 'primary' || t === 'mono-dark';
}

function TypographicPosterSlide({
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
      className="relative overflow-hidden"
      style={{
        width: 1280,
        height: 720,
        background: bg,
        color: fg,
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
      }}
    >
      <div className="absolute inset-0 p-20 flex flex-col justify-between">
        <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.35em]" style={{ color: muted }}>
          <span>{brandName}</span>
          <span>Deck · 2026</span>
        </div>

        <h1
          className="text-[140px] leading-[0.9] font-bold tracking-tight"
          style={{ color: fg, fontFamily: 'var(--font-heading, inherit)' }}
        >
          Presentation<br />Title.
        </h1>

        <div className="flex items-end justify-between">
          {logo.src && (
            <img
              src={logo.src}
              alt=""
              className="h-10 w-auto object-contain"
              style={logo.filter ? { filter: logo.filter } : undefined}
            />
          )}
          <p className="text-[12px] max-w-[360px] text-right leading-relaxed" style={{ color: muted }}>
            A one-line framing caption in the body font, kept to one or two lines maximum.
          </p>
        </div>
      </div>
    </div>
  );
}

function EditorialSpreadSlide({
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
        width: 1280,
        height: 720,
        background: bg,
        gridTemplateColumns: '1.7fr 1fr',
        fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)',
      }}
    >
      <div className="p-20 flex flex-col justify-between" style={{ borderRight: `1px solid ${muted}`, color: fg }}>
        <p className="text-[11px] uppercase tracking-[0.4em]" style={{ color: muted }}>Volume I · Presentation</p>
        <div>
          <div className="h-[3px] w-32 mb-8" style={{ background: rule }} />
          <h1
            className="text-[72px] leading-[1.0] font-bold tracking-tight"
            style={{ color: fg, fontFamily: 'var(--font-heading, inherit)' }}
          >
            A deck<br />that reads like<br />a statement.
          </h1>
        </div>
        <p className="text-[13px] leading-relaxed max-w-[480px]" style={{ color: muted }}>
          Replace with a real framing sentence or two — a paragraph that opens the document the way an essay opens with its thesis.
        </p>
      </div>
      <div className="p-12 flex flex-col justify-between" style={{ color: fg }}>
        {logo.src && (
          <img
            src={logo.src}
            alt=""
            className="h-12 w-auto object-contain"
            style={logo.filter ? { filter: logo.filter } : undefined}
          />
        )}
        <dl className="flex flex-col gap-5 text-[13px]">
          <MetaRow label="Presented by" value={brandName} muted={muted} />
          <MetaRow label="Date" value="Month 2026" muted={muted} />
          <MetaRow label="Reference" value="Deck ID" muted={muted} />
        </dl>
        <p className="text-[11px] uppercase tracking-[0.35em]" style={{ color: muted }}>Confidential</p>
      </div>
    </div>
  );
}

function MetaRow({ label, value, muted }: { label: string; value: string; muted: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.3em] mb-1" style={{ color: muted }}>{label}</dt>
      <dd className="text-[15px]" style={{ color: 'var(--color-text, #1B2332)', fontFamily: 'var(--font-heading, inherit)' }}>
        {value}
      </dd>
    </div>
  );
}
