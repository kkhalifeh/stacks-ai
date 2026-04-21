import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, Check, Image as ImageIcon, Sparkles, Star, Trash2, Upload } from 'lucide-react';
import {
  deleteTheme,
  ensureGoogleFonts,
  extractRootVars,
  generateTenantTheme,
  getTenant,
  googleFontsForProposal,
  proposalToCssVars,
  saveTheme,
  setDefaultTheme,
  tenantLogoUrl,
  updateTenant,
  uploadTenantLogo,
  type TenantBrand,
  type ThemeMeta,
  type ThemeProposal,
  type ThemeVariant,
} from './brand-api';
import { applyRawTheme, tenant as initialTenant, tenantTemplates, type TenantThemeInfo } from './stacks';
import { ReferencesPanel } from './components/brand/ReferencesPanel';
import { A4TitleSample } from './preview/A4TitleSample';
import { A4ContentSample } from './preview/A4ContentSample';
import { SlideTitleSample } from './preview/SlideTitleSample';
import { SlideContentSample } from './preview/SlideContentSample';

interface BrandStudioProps {
  onBack: () => void;
}

type PreviewTab = 'a4-title' | 'a4-content' | 'slide-title' | 'slide-content';

const TENANT_COMPONENT_BY_TAB: Record<PreviewTab, { format: 'a4' | 'slide-16x9'; name: string }> = {
  'a4-title': { format: 'a4', name: 'TitlePage' },
  'a4-content': { format: 'a4', name: 'ContentPage' },
  'slide-title': { format: 'slide-16x9', name: 'TitleSlide' },
  'slide-content': { format: 'slide-16x9', name: 'ContentSlide' },
};

const GENERIC_BY_TAB: Record<PreviewTab, FC<{ brandName: string; logoUrl?: string }>> = {
  'a4-title': A4TitleSample,
  'a4-content': A4ContentSample,
  'slide-title': SlideTitleSample,
  'slide-content': SlideContentSample,
};

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
  const [variants, setVariants] = useState<ThemeVariant[] | null>(null);
  const [activeVariantIdx, setActiveVariantIdx] = useState<number>(0);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(initialTenant?.activeThemeId ?? null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<PreviewTab>('a4-title');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialThemesFromLoader = useMemo<TenantThemeInfo[]>(() => initialTenant?.themes ?? [], []);
  const selectedThemeCssFromLoader = useMemo(() => {
    return initialThemesFromLoader.find(t => t.id === selectedThemeId)?.themeCss;
  }, [initialThemesFromLoader, selectedThemeId]);

  // Make sure the right theme CSS is applied while we're in Brand Studio so the preview renders.
  useEffect(() => {
    if (proposal) {
      // Proposal is active — clear the global theme; .brand-preview-tenant scope holds the proposal vars.
      applyRawTheme(undefined);
    } else {
      applyRawTheme(selectedThemeCssFromLoader);
    }
  }, [proposal, selectedThemeCssFromLoader]);

  // Initial fetch of server-side tenant state (for up-to-date themes list after saves/deletes elsewhere)
  const refreshTenant = useCallback(async () => {
    try {
      const t = await getTenant();
      setTenantData(t);
      if (!name) setName(t.name);
      setHasLogo(Boolean(t.logo));
      if (!selectedThemeId && t.activeThemeId) setSelectedThemeId(t.activeThemeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tenant brand');
    }
  }, [name, selectedThemeId]);

  useEffect(() => { refreshTenant(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      if (tenantData && name && name !== tenantData.name) {
        await updateTenant({ name: name.trim() });
      }
      const { variants } = await generateTenantTheme({
        name: name.trim() || 'Brand',
        keywords: keywords.trim() || undefined,
        feedback: feedback.trim() || undefined,
        count: 3,
      });
      setVariants(variants);
      setActiveVariantIdx(0);
      const firstProposal = variants[0]?.proposal ?? null;
      setProposal(firstProposal);
      if (firstProposal) ensureGoogleFonts(googleFontsForProposal(firstProposal));
      // Preload fonts for all variants so thumbnails render correctly
      variants.forEach(v => ensureGoogleFonts(googleFontsForProposal(v.proposal)));
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }

  async function handleSaveTheme(setAsDefault: boolean) {
    if (!proposal) return;
    const defaultName = `${tenantData?.name ?? 'Brand'} v${(tenantData?.themes.length ?? 0) + 1}`;
    const name = window.prompt('Save theme as', defaultName);
    if (!name) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await saveTheme({ name: name.trim(), proposal, setDefault: setAsDefault });
      // Reload to pick up the new theme through the Vite glob
      window.location.href = `/?view=brand&theme=${encodeURIComponent(saved.id)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  }

  async function handleSetDefault(id: string) {
    try {
      await setDefaultTheme(id);
      await refreshTenant();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not set default');
    }
  }

  async function handleDeleteTheme(id: string, themeName: string) {
    const ok = window.confirm(`Delete theme "${themeName}"?`);
    if (!ok) return;
    try {
      await deleteTheme(id);
      window.location.href = '/?view=brand';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const logoUrlForPreview = hasLogo ? tenantLogoUrl(logoVersion) : initialTenant?.logoUrl;
  const themes = tenantData?.themes ?? initialThemesFromLoader.map(t => ({
    id: t.id, name: t.name, description: t.description, createdAt: t.createdAt,
  }));

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--lx-bg)', color: 'var(--lx-text)' }}>
      {/* LEFT: tenant controls + themes list */}
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
            Tenant-wide brand. Saved themes become options when creating new stacks.
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

          {/* Brand name */}
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

          {/* Saved themes list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block text-[11px] font-medium" style={{ color: 'var(--lx-text-muted)' }}>
                Saved themes
              </span>
              <span className="text-[10px]" style={{ color: 'var(--lx-text-faint)' }}>
                {themes.length}
              </span>
            </div>
            {themes.length === 0 ? (
              <div
                className="text-[11.5px] leading-relaxed px-3 py-2.5"
                style={{
                  background: 'var(--lx-surface)',
                  border: '1px dashed var(--lx-border)',
                  borderRadius: 'var(--lx-radius-md)',
                  color: 'var(--lx-text-muted)',
                }}
              >
                No themes yet. Upload a logo and generate your first.
              </div>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {themes.map(t => {
                  const isActive = t.id === (tenantData?.activeThemeId ?? initialTenant?.activeThemeId);
                  const isSelected = t.id === selectedThemeId && !proposal;
                  return (
                    <li
                      key={t.id}
                      onClick={() => { setSelectedThemeId(t.id); setProposal(null); }}
                      className="group relative px-3 py-2 cursor-pointer transition-colors"
                      style={{
                        background: isSelected ? 'var(--lx-surface-hover)' : 'var(--lx-surface)',
                        border: `1px solid ${isSelected ? 'var(--lx-border-strong)' : 'var(--lx-border)'}`,
                        borderRadius: 'var(--lx-radius-md)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-medium flex-1 truncate" style={{ color: 'var(--lx-text)' }}>
                          {t.name}
                        </span>
                        {isActive && (
                          <Star className="w-3 h-3" style={{ color: 'var(--lx-accent)', fill: 'var(--lx-accent)' }} />
                        )}
                      </div>
                      {t.description && (
                        <p className="text-[10.5px] mt-1 line-clamp-2" style={{ color: 'var(--lx-text-subtle)' }}>
                          {t.description}
                        </p>
                      )}
                      <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!isActive && (
                          <button
                            onClick={e => { e.stopPropagation(); handleSetDefault(t.id); }}
                            className="text-[10px] px-2 py-1 rounded-[6px] transition-colors"
                            style={{ background: 'var(--lx-surface-2)', color: 'var(--lx-text-muted)' }}
                          >
                            Set default
                          </button>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); handleDeleteTheme(t.id, t.name); }}
                          className="text-[10px] px-2 py-1 rounded-[6px] transition-colors flex items-center gap-1"
                          style={{ color: 'var(--lx-danger)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-danger-soft)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <ReferencesPanel />

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
                placeholder="e.g. darker primary, warmer accents"
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
            {generating ? 'Generating…' : proposal ? 'Regenerate' : 'Generate new theme'}
          </button>

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

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSaveTheme(false)}
                  disabled={saving}
                  className="lx-focus flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold transition-colors"
                  style={{
                    background: 'var(--lx-accent)',
                    color: 'white',
                    borderRadius: 'var(--lx-radius-md)',
                    opacity: saving ? 0.5 : 1,
                  }}
                >
                  <Check className="w-4 h-4" /> Save as new theme
                </button>
                <button
                  onClick={() => handleSaveTheme(true)}
                  disabled={saving}
                  className="lx-focus flex items-center justify-center gap-2 px-4 py-2 text-[12px] transition-colors"
                  style={{
                    background: 'transparent',
                    color: 'var(--lx-text-muted)',
                    border: '1px solid var(--lx-border)',
                    borderRadius: 'var(--lx-radius-md)',
                    opacity: saving ? 0.5 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!saving) {
                      e.currentTarget.style.background = 'var(--lx-surface-hover)';
                      e.currentTarget.style.color = 'var(--lx-text)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!saving) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--lx-text-muted)';
                    }
                  }}
                >
                  Save &amp; set as default
                </button>
                <button
                  onClick={() => { setProposal(null); setVariants(null); setActiveVariantIdx(0); }}
                  className="text-[11px] py-1.5 transition-colors"
                  style={{ color: 'var(--lx-text-subtle)' }}
                >
                  Discard proposal
                </button>
              </div>
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
            {variants && variants.length > 0
              ? `Variant ${activeVariantIdx + 1} of ${variants.length} — ${variants[activeVariantIdx]?.direction}`
              : proposal
                ? 'Showing unsaved proposal'
                : selectedThemeId
                  ? `Showing ${initialThemesFromLoader.find(t => t.id === selectedThemeId)?.name ?? selectedThemeId}`
                  : 'No theme selected'}
          </span>
        </div>

        {variants && variants.length > 1 && (
          <div
            className="px-8 py-3 flex items-center gap-2 border-b flex-shrink-0 overflow-x-auto"
            style={{ borderColor: 'var(--lx-border)', background: 'var(--lx-surface)' }}
          >
            <span className="text-[10px] uppercase tracking-[0.1em] font-semibold mr-2" style={{ color: 'var(--lx-text-faint)' }}>
              Variants
            </span>
            {variants.map((v, i) => {
              const active = i === activeVariantIdx;
              const p = v.proposal.palette;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveVariantIdx(i);
                    setProposal(v.proposal);
                    ensureGoogleFonts(googleFontsForProposal(v.proposal));
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 transition-colors"
                  style={{
                    background: active ? 'var(--lx-accent-soft)' : 'var(--lx-surface-2)',
                    border: `1px solid ${active ? 'var(--lx-accent)' : 'var(--lx-border)'}`,
                    borderRadius: 'var(--lx-radius-sm)',
                    color: active ? 'var(--lx-text)' : 'var(--lx-text-muted)',
                  }}
                >
                  <div className="flex gap-0.5">
                    <span className="block w-3 h-3 rounded-[2px]" style={{ background: p.primary, border: '1px solid var(--lx-border)' }} />
                    {p.accents.slice(0, 3).map((c, j) => (
                      <span
                        key={j}
                        className="block w-3 h-3 rounded-[2px]"
                        style={{ background: c, border: '1px solid var(--lx-border)' }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium">{v.direction}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex-1 overflow-auto p-10" style={{ background: 'var(--lx-bg)' }}>
          <div className={`${PREVIEW_SCOPE} min-h-full flex items-center justify-center`}>
            {proposal ? (
              <style>{`.${PREVIEW_SCOPE} { ${proposalToCssVars(proposal)} }`}</style>
            ) : selectedThemeCssFromLoader ? (
              <style>{`.${PREVIEW_SCOPE} { ${extractRootVars(selectedThemeCssFromLoader)} }`}</style>
            ) : null}
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
  const tenantMapping = TENANT_COMPONENT_BY_TAB[tab];
  const tenantComponent = tenantTemplates[tenantMapping.format]?.components[tenantMapping.name];
  const Generic = GENERIC_BY_TAB[tab];

  return (
    <div
      className="relative"
      style={{
        width: w * scale,
        height: h * scale,
        background: 'white',
        boxShadow: 'var(--lx-shadow-elevated)',
        borderRadius: 2,
      }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: w,
          height: h,
          background: 'white',
        }}
      >
        {tenantComponent ? (() => {
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
