import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import type { FC } from 'react';
import {
  applyTenantTheme,
  generateTenantTheme,
  getTenant,
  proposalToCssVars,
  tenantLogoUrl,
  updateTenant,
  uploadTenantLogo,
  type TenantBrand,
  type ThemeProposal,
} from './brand-api';
import { applyStackTheme, tenant as initialTenant, tenantTemplates } from './stacks';
import { A4TitleSample } from './preview/A4TitleSample';
import { A4ContentSample } from './preview/A4ContentSample';
import { SlideTitleSample } from './preview/SlideTitleSample';
import { SlideContentSample } from './preview/SlideContentSample';

type PreviewTab = 'a4-title' | 'a4-content' | 'slide-title' | 'slide-content';

// Map each preview tab to a tenant-template component name (used when tenant templates exist)
const TENANT_COMPONENT_BY_TAB: Record<PreviewTab, { format: 'a4' | 'slide-16x9'; name: string }> = {
  'a4-title': { format: 'a4', name: 'TitlePage' },
  'a4-content': { format: 'a4', name: 'ContentPage' },
  'slide-title': { format: 'slide-16x9', name: 'TitleSlide' },
  'slide-content': { format: 'slide-16x9', name: 'ContentSlide' },
};

// Generic fallback samples (wrapped so they accept the same brandName/logoUrl props)
const GENERIC_BY_TAB: Record<PreviewTab, FC<{ brandName: string; logoUrl?: string }>> = {
  'a4-title': A4TitleSample,
  'a4-content': A4ContentSample,
  'slide-title': SlideTitleSample,
  'slide-content': SlideContentSample,
};

interface BrandStudioProps {
  onBack: () => void;
}

const PREVIEW_SCALE_A4 = 0.5;
const PREVIEW_SCALE_SLIDE = 0.45;
const PREVIEW_SCOPE = 'brand-preview-tenant';

export function BrandStudio({ onBack }: BrandStudioProps) {
  const [tenantData, setTenantData] = useState<TenantBrand | null>(null);
  const [name, setName] = useState(initialTenant?.name ?? '');
  const [keywords, setKeywords] = useState('');
  const [feedback, setFeedback] = useState('');
  const [logoVersion, setLogoVersion] = useState(0);
  const [hasLogo, setHasLogo] = useState(Boolean(initialTenant?.logoUrl));
  const [proposal, setProposal] = useState<ThemeProposal | null>(null);
  const [generating, setGenerating] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'a4-title' | 'a4-content' | 'slide-title' | 'slide-content'>('a4-title');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear any active stack theme while in Brand Studio so preview isn't polluted
  useEffect(() => { applyStackTheme(undefined); }, []);

  // Initial load: pull tenant metadata from server
  useEffect(() => {
    (async () => {
      try {
        const t = await getTenant();
        setTenantData(t);
        setName(t.name);
        setHasLogo(Boolean(t.logo));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tenant brand');
      }
    })();
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    try {
      await uploadTenantLogo(file);
      setHasLogo(true);
      setLogoVersion(v => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }, []);

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      // Persist name first if changed
      if (tenantData && name !== tenantData.name) {
        await updateTenant({ name: name.trim() });
      }
      const { proposal } = await generateTenantTheme({
        name: name.trim() || 'Brand',
        keywords: keywords.trim() || undefined,
        feedback: feedback.trim() || undefined,
      });
      setProposal(proposal);
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }

  async function handleApply() {
    if (!proposal) return;
    setApplying(true);
    try {
      await applyTenantTheme(proposal);
      // Full reload to re-read brand/theme.css via the Vite glob
      window.location.href = `/`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Apply failed');
      setApplying(false);
    }
  }

  const logoUrlForPreview = hasLogo ? tenantLogoUrl(logoVersion) : initialTenant?.logoUrl;

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--lx-bg)', color: 'var(--lx-text)' }}>
      {/* LEFT: controls */}
      <aside
        className="w-[380px] flex-shrink-0 flex flex-col border-r overflow-y-auto"
        style={{ borderColor: 'var(--lx-border)' }}
      >
        <div className="px-6 pt-6 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] mb-4 transition-colors"
            style={{ color: 'var(--lx-text-subtle)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
          >
            <ChevronLeft className="w-3 h-3" />
            All stacks
          </button>
          <h1 className="text-[17px] font-semibold tracking-tight">Brand Studio</h1>
          <p className="text-[12px] mt-1" style={{ color: 'var(--lx-text-muted)' }}>
            Tenant-wide brand. Applies to every stack unless a stack overrides it.
          </p>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-5">
          {/* Logo */}
          <div>
            <label className="block text-[11px] font-medium mb-2" style={{ color: 'var(--lx-text-muted)' }}>
              Logo
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                e.target.value = '';
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-3.5 py-3 transition-colors text-left"
              style={{
                background: 'var(--lx-surface)',
                border: '1px dashed var(--lx-border-strong)',
                borderRadius: 'var(--lx-radius-md)',
                color: 'var(--lx-text-muted)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lx-accent)'; e.currentTarget.style.color = 'var(--lx-text)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--lx-border-strong)'; e.currentTarget.style.color = 'var(--lx-text-muted)'; }}
            >
              {hasLogo ? (
                <>
                  <img
                    src={tenantLogoUrl(logoVersion)}
                    alt=""
                    className="w-10 h-10 object-contain flex-shrink-0"
                    style={{ background: 'white', padding: 4, borderRadius: 'var(--lx-radius-sm)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium truncate" style={{ color: 'var(--lx-text)' }}>
                      Logo set
                    </div>
                    <div className="text-[10px]" style={{ color: 'var(--lx-text-subtle)' }}>
                      Click to replace
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span className="text-[12px]">Upload a PNG, JPG, or SVG</span>
                </>
              )}
            </button>
          </div>

          {/* Name */}
          <label className="block">
            <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>
              Brand name
            </span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Kinz"
              className="lx-focus w-full text-[13px] px-3 py-2 transition-colors"
              style={{
                background: 'var(--lx-surface)',
                border: '1px solid var(--lx-border)',
                borderRadius: 'var(--lx-radius-md)',
                color: 'var(--lx-text)',
                outline: 'none',
              }}
            />
          </label>

          {/* Keywords */}
          <label className="block">
            <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>
              Keywords / tone <span style={{ color: 'var(--lx-text-faint)' }}>(optional)</span>
            </span>
            <textarea
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="e.g. confident, technical, enterprise"
              rows={2}
              className="lx-focus w-full text-[13px] px-3 py-2 transition-colors resize-none"
              style={{
                background: 'var(--lx-surface)',
                border: '1px solid var(--lx-border)',
                borderRadius: 'var(--lx-radius-md)',
                color: 'var(--lx-text)',
                outline: 'none',
              }}
            />
          </label>

          {proposal && (
            <label className="block">
              <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>
                Feedback for regeneration
              </span>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="e.g. darker primary, warmer accents, more neutral"
                rows={2}
                className="lx-focus w-full text-[13px] px-3 py-2 transition-colors resize-none"
                style={{
                  background: 'var(--lx-surface)',
                  border: '1px solid var(--lx-border)',
                  borderRadius: 'var(--lx-radius-md)',
                  color: 'var(--lx-text)',
                  outline: 'none',
                }}
              />
            </label>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating || !hasLogo}
            className="lx-focus flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
            style={{
              background: generating || !hasLogo ? 'var(--lx-surface-hover)' : 'var(--lx-accent)',
              color: generating || !hasLogo ? 'var(--lx-text-muted)' : 'white',
              borderRadius: 'var(--lx-radius-md)',
              cursor: generating || !hasLogo ? 'not-allowed' : 'pointer',
            }}
          >
            <Sparkles className="w-4 h-4" />
            {generating ? 'Generating…' : proposal ? 'Regenerate' : 'Generate theme'}
          </button>

          {!hasLogo && (
            <p className="text-[11px]" style={{ color: 'var(--lx-text-subtle)' }}>
              Upload a logo to enable generation. Existing palette still shows in preview.
            </p>
          )}

          {error && (
            <div
              className="px-3 py-2 text-[12px]"
              style={{
                color: 'var(--lx-danger)',
                background: 'var(--lx-danger-soft)',
                border: '1px solid rgba(248, 113, 113, 0.25)',
                borderRadius: 'var(--lx-radius-md)',
              }}
            >
              {error}
            </div>
          )}

          {proposal && (
            <>
              <div
                className="px-3.5 py-3 text-[11.5px] leading-relaxed"
                style={{
                  background: 'var(--lx-surface)',
                  border: '1px solid var(--lx-border)',
                  borderRadius: 'var(--lx-radius-md)',
                  color: 'var(--lx-text-muted)',
                }}
              >
                {proposal.description}
              </div>

              <PaletteSwatches proposal={proposal} />

              <button
                onClick={handleApply}
                disabled={applying}
                className="lx-focus flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold transition-colors"
                style={{
                  background: 'var(--lx-accent)',
                  color: 'white',
                  borderRadius: 'var(--lx-radius-md)',
                  opacity: applying ? 0.5 : 1,
                }}
              >
                {applying ? 'Applying…' : 'Apply to all stacks'}
              </button>
            </>
          )}
        </div>
      </aside>

      {/* RIGHT: preview */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div
          className="px-8 py-4 flex items-center gap-2 border-b flex-shrink-0"
          style={{ borderColor: 'var(--lx-border)' }}
        >
          <ImageIcon className="w-3.5 h-3.5" style={{ color: 'var(--lx-text-subtle)' }} />
          <span className="text-[12px] mr-2" style={{ color: 'var(--lx-text-subtle)' }}>
            Preview
          </span>
          <div className="flex items-center gap-0.5">
            <TabBtn label="A4 Title" active={previewTab === 'a4-title'} onClick={() => setPreviewTab('a4-title')} />
            <TabBtn label="A4 Content" active={previewTab === 'a4-content'} onClick={() => setPreviewTab('a4-content')} />
            <TabBtn label="Slide Title" active={previewTab === 'slide-title'} onClick={() => setPreviewTab('slide-title')} />
            <TabBtn label="Slide Content" active={previewTab === 'slide-content'} onClick={() => setPreviewTab('slide-content')} />
          </div>

          <span className="ml-auto text-[11px]" style={{ color: 'var(--lx-text-faint)' }}>
            {proposal ? 'Showing proposal' : tenantData?.hasTheme ? 'Showing current tenant brand' : 'No brand set yet'}
          </span>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-10" style={{ background: 'var(--lx-bg)' }}>
          <div className={PREVIEW_SCOPE}>
            {proposal && (
              <style>{`.${PREVIEW_SCOPE} { ${proposalToCssVars(proposal)} }`}</style>
            )}
            <PreviewCanvas
              tab={previewTab}
              brandName={name.trim() || tenantData?.name || 'Brand'}
              logoUrl={logoUrlForPreview}
              scale={previewTab.startsWith('a4') ? PREVIEW_SCALE_A4 : PREVIEW_SCALE_SLIDE}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[11.5px] px-2.5 py-1 transition-colors"
      style={{
        background: active ? 'var(--lx-accent-soft)' : 'transparent',
        color: active ? 'var(--lx-text)' : 'var(--lx-text-muted)',
        borderRadius: 'var(--lx-radius-sm)',
      }}
    >
      {label}
    </button>
  );
}

function PreviewCanvas({
  tab,
  brandName,
  logoUrl,
  scale,
}: {
  tab: PreviewTab;
  brandName: string;
  logoUrl?: string;
  scale: number;
}) {
  const { w, h } = tab.startsWith('a4') ? { w: 794, h: 1123 } : { w: 1280, h: 720 };

  // Prefer the tenant template for this tab if it exists; fall back to the generic sample.
  const tenantMapping = TENANT_COMPONENT_BY_TAB[tab];
  const tenantComponent = tenantTemplates[tenantMapping.format]?.components[tenantMapping.name];
  const usingTenant = Boolean(tenantComponent);
  const Generic = GENERIC_BY_TAB[tab];

  return (
    <div className="relative" style={{ width: w * scale, height: h * scale }}>
      <div
        className="absolute top-0 left-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: w,
          height: h,
        }}
      >
        {usingTenant ? (() => {
          const TenantComponent = tenantComponent as FC;
          return <TenantComponent />;
        })() : (
          <Generic brandName={brandName} logoUrl={logoUrl} />
        )}
      </div>
    </div>
  );
}

function PaletteSwatches({ proposal }: { proposal: ThemeProposal }) {
  const p = proposal.palette;
  const chips: Array<{ label: string; value: string }> = [
    { label: 'Primary', value: p.primary },
    { label: 'Light', value: p.primary_light },
    { label: 'Dark', value: p.dark },
    { label: 'Surface', value: p.dark_surface },
    { label: 'BG', value: p.light_bg },
    ...p.accents.slice(0, 4).map((c, i) => ({ label: `A${i + 1}`, value: c })),
  ];
  return (
    <div
      className="p-3 grid grid-cols-3 gap-2"
      style={{
        background: 'var(--lx-surface)',
        border: '1px solid var(--lx-border)',
        borderRadius: 'var(--lx-radius-md)',
      }}
    >
      {chips.map(c => (
        <div key={c.label} className="flex items-center gap-2">
          <div
            className="w-6 h-6 flex-shrink-0"
            style={{ background: c.value, borderRadius: 'var(--lx-radius-sm)', border: '1px solid var(--lx-border)' }}
          />
          <div className="min-w-0">
            <div className="text-[10px] font-semibold" style={{ color: 'var(--lx-text)' }}>{c.label}</div>
            <div className="text-[9px] font-mono truncate" style={{ color: 'var(--lx-text-subtle)' }}>{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
