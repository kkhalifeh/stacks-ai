import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, Check, Image as ImageIcon, Sparkles, Star, Trash2, Upload } from 'lucide-react';
import {
  brandLogoUrl,
  deleteBrandLogoVariant,
  deleteBrandTheme,
  ensureGoogleFonts,
  extractRootVars,
  generateBrandTheme,
  getBrand as fetchBrand,
  googleFontsForProposal,
  proposalToCssVars,
  refineBrandTheme,
  saveBrandTheme,
  setDefaultBrandTheme,
  updateBrand,
  updateBrandThemeFonts,
  uploadBrandLogo,
  type LogoVariant,
  type TenantBrand,
  type ThemeMeta,
  type ThemeProposal,
  type ThemeVariant,
} from './brand-api';
import { FontSelect } from './components/brand/FontSelect';
import { findFontOption } from './fontCatalog';
import {
  applyRawTheme,
  brands as loadedBrands,
  getBrand,
  type BrandThemeInfo,
  type LoadedBrand,
} from './stacks';
import { ReferencesPanel } from './components/brand/ReferencesPanel';
import { A4TitleSample } from './preview/A4TitleSample';
import { A4ContentSample } from './preview/A4ContentSample';
import { SlideTitleSample } from './preview/SlideTitleSample';
import { SlideContentSample } from './preview/SlideContentSample';

interface BrandStudioProps {
  brandId?: string;
  onBack: () => void;
}

type PreviewTab = 'a4-title' | 'a4-content' | 'slide-title' | 'slide-content';

const TENANT_COMPONENT_BY_TAB: Record<PreviewTab, { format: 'a4' | 'slide-16x9'; name: string }> = {
  'a4-title': { format: 'a4', name: 'TitlePage' },
  'a4-content': { format: 'a4', name: 'ContentPage' },
  'slide-title': { format: 'slide-16x9', name: 'TitleSlide' },
  'slide-content': { format: 'slide-16x9', name: 'ContentSlide' },
};

const GENERIC_BY_TAB: Record<
  PreviewTab,
  FC<{ brandName: string; logoUrl?: string; logos?: { primary?: string; light?: string; mono?: string } }>
> = {
  'a4-title': A4TitleSample,
  'a4-content': A4ContentSample,
  'slide-title': SlideTitleSample,
  'slide-content': SlideContentSample,
};

const PREVIEW_SCALE_A4 = 0.5;
const PREVIEW_SCALE_SLIDE = 0.45;
const PREVIEW_SCOPE = 'brand-preview-tenant';

export function BrandStudio({ brandId = 'kinz', onBack }: BrandStudioProps) {
  const loadedBrand: LoadedBrand | undefined = getBrand(brandId) ?? loadedBrands[0];
  const [tenantData, setTenantData] = useState<TenantBrand | null>(null);
  const [name, setName] = useState(loadedBrand?.name ?? brandId);
  const [keywords, setKeywords] = useState('');
  const [feedback, setFeedback] = useState('');
  const [logoVersion, setLogoVersion] = useState(0);
  const [hasLogo, setHasLogo] = useState(Boolean(loadedBrand?.logoUrl));
  const [logoVariantState, setLogoVariantState] = useState<{ light: boolean; mono: boolean }>({
    light: false,
    mono: false,
  });
  const [proposal, setProposal] = useState<ThemeProposal | null>(null);
  const [variants, setVariants] = useState<ThemeVariant[] | null>(null);
  const [activeVariantIdx, setActiveVariantIdx] = useState<number>(0);
  /** Pending font overrides when editing a SAVED theme (no proposal active). */
  const [savedFontOverride, setSavedFontOverride] = useState<{ heading?: string; body?: string } | null>(null);
  const [savingFonts, setSavingFonts] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(() => {
    // Priority: ?theme=<id> URL param (right after save) → brand active → first saved theme → null
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('theme');
      if (q && loadedBrand?.themes.some(t => t.id === q)) return q;
    }
    return loadedBrand?.activeThemeId ?? loadedBrand?.themes[0]?.id ?? null;
  });
  const [generating, setGenerating] = useState(false);
  const [refining, setRefining] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<PreviewTab>('a4-title');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lightLogoInputRef = useRef<HTMLInputElement>(null);
  const monoLogoInputRef = useRef<HTMLInputElement>(null);

  const initialThemesFromLoader = useMemo<BrandThemeInfo[]>(() => loadedBrand?.themes ?? [], [loadedBrand]);
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

  // Initial fetch of server-side brand state
  const refreshTenant = useCallback(async () => {
    try {
      const t = await fetchBrand(brandId);
      setTenantData(t);
      if (!name) setName(t.name);
      setHasLogo(Boolean(t.logo));
      setLogoVariantState({
        light: Boolean(t.logoVariants?.light),
        mono: Boolean(t.logoVariants?.mono),
      });
      if (!selectedThemeId && t.activeThemeId) setSelectedThemeId(t.activeThemeId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load brand');
    }
  }, [brandId, name, selectedThemeId]);

  useEffect(() => { refreshTenant(); }, [brandId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpload = useCallback(async (file: File, variant: LogoVariant = 'primary') => {
    setError(null);
    try {
      await uploadBrandLogo(brandId, file, variant);
      if (variant === 'primary') setHasLogo(true);
      else setLogoVariantState(s => ({ ...s, [variant]: true }));
      setLogoVersion(v => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }, [brandId]);

  const handleRemoveVariant = useCallback(async (variant: 'light' | 'mono') => {
    setError(null);
    try {
      await deleteBrandLogoVariant(brandId, variant);
      setLogoVariantState(s => ({ ...s, [variant]: false }));
      setLogoVersion(v => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }, [brandId]);

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      if (tenantData && name && name !== tenantData.name) {
        await updateBrand(brandId, { name: name.trim() });
      }
      const { variants } = await generateBrandTheme(brandId, {
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
      variants.forEach(v => ensureGoogleFonts(googleFontsForProposal(v.proposal)));
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }

  async function handleRefine() {
    if (!proposal) return;
    const fb = feedback.trim();
    if (!fb) {
      setError('Enter feedback to refine the current proposal.');
      return;
    }
    setError(null);
    setRefining(true);
    try {
      const { proposal: next } = await refineBrandTheme(brandId, {
        previous: proposal,
        feedback: fb,
        name: name.trim() || undefined,
        keywords: keywords.trim() || undefined,
      });
      setProposal(next);
      ensureGoogleFonts(googleFontsForProposal(next));
      // Replace the variant list with the single refined proposal so the
      // preview key changes and the variant rail no longer shows the old set.
      setVariants([{ direction: 'Refined', proposal: next }]);
      setActiveVariantIdx(0);
      setFeedback('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Refinement failed');
    } finally {
      setRefining(false);
    }
  }

  async function handleSaveTheme(setAsDefault: boolean) {
    if (!proposal) return;
    const defaultName = `${tenantData?.name ?? loadedBrand?.name ?? 'Brand'} v${(tenantData?.themes.length ?? 0) + 1}`;
    const name = window.prompt('Save theme as', defaultName);
    if (!name) return;
    setSaving(true);
    setError(null);
    try {
      const saved = await saveBrandTheme(brandId, { name: name.trim(), proposal, setDefault: setAsDefault });
      window.location.href = `/?brand=${encodeURIComponent(brandId)}&view=brand&theme=${encodeURIComponent(saved.id)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  }

  async function handleSetDefault(id: string) {
    try {
      await setDefaultBrandTheme(brandId, id);
      await refreshTenant();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not set default');
    }
  }

  async function handleDeleteTheme(id: string, themeName: string) {
    const ok = window.confirm(`Delete theme "${themeName}"?`);
    if (!ok) return;
    try {
      await deleteBrandTheme(brandId, id);
      window.location.href = `/?brand=${encodeURIComponent(brandId)}&view=brand`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const logoUrlForPreview = hasLogo ? brandLogoUrl(brandId, logoVersion) : loadedBrand?.logoUrl;
  const logoSetForPreview = {
    primary: logoUrlForPreview,
    light: logoVariantState.light ? brandLogoUrl(brandId, logoVersion, 'light') : undefined,
    mono: logoVariantState.mono ? brandLogoUrl(brandId, logoVersion, 'mono') : undefined,
  };
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
                if (e.target.files?.[0]) handleUpload(e.target.files[0], 'primary');
                e.target.value = '';
              }}
            />
            <input
              ref={lightLogoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0], 'light');
                e.target.value = '';
              }}
            />
            <input
              ref={monoLogoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0], 'mono');
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
                    src={brandLogoUrl(brandId, logoVersion)}
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
            {hasLogo && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <LogoVariantSlot
                  label="Light variant"
                  hint="For dark surfaces"
                  present={logoVariantState.light}
                  imgUrl={logoVariantState.light ? brandLogoUrl(brandId, logoVersion, 'light') : undefined}
                  onUpload={() => lightLogoInputRef.current?.click()}
                  onRemove={() => handleRemoveVariant('light')}
                />
                <LogoVariantSlot
                  label="Mono variant"
                  hint="Single-ink, optional"
                  present={logoVariantState.mono}
                  imgUrl={logoVariantState.mono ? brandLogoUrl(brandId, logoVersion, 'mono') : undefined}
                  onUpload={() => monoLogoInputRef.current?.click()}
                  onRemove={() => handleRemoveVariant('mono')}
                />
              </div>
            )}
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
                  const isActive = t.id === (tenantData?.activeThemeId ?? loadedBrand?.activeThemeId);
                  const isSelected = t.id === selectedThemeId && !proposal;
                  return (
                    <li
                      key={t.id}
                      onClick={() => { setSelectedThemeId(t.id); setProposal(null); setSavedFontOverride(null); }}
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

          <ReferencesPanel brandId={brandId} />

          {/* Typography overrides — always visible. Controls either the live proposal or the selected saved theme. */}
          <TypographyPanel
            proposal={proposal}
            onProposalFontChange={(which, family) => {
              setProposal(p => {
                if (!p) return p;
                const next: ThemeProposal = {
                  ...p,
                  typography: {
                    ...p.typography,
                    ...(which === 'heading' ? { heading_font: family } : { body_font: family }),
                  },
                };
                ensureGoogleFonts(googleFontsForProposal(next));
                return next;
              });
            }}
            savedThemeFonts={!proposal && selectedThemeCssFromLoader
              ? (() => {
                  const themeFonts = savedFontOverride ?? {};
                  const fromCss = selectedThemeCssFromLoader
                    ? (() => {
                        const h = selectedThemeCssFromLoader.match(/--font-heading:\s*([^;]+);/)?.[1]?.trim();
                        const b = selectedThemeCssFromLoader.match(/--font-body:\s*([^;]+);/)?.[1]?.trim();
                        return { heading: h, body: b };
                      })()
                    : { heading: undefined as string | undefined, body: undefined as string | undefined };
                  return {
                    heading: themeFonts.heading ?? fromCss.heading ?? 'Inter',
                    body: themeFonts.body ?? fromCss.body ?? 'Inter',
                    hasPendingChanges: Boolean(savedFontOverride?.heading || savedFontOverride?.body),
                    saving: savingFonts,
                  };
                })()
              : undefined}
            onSavedFontChange={(which, family) => {
              setSavedFontOverride(prev => ({
                ...prev,
                [which]: family,
              }));
              ensureGoogleFonts([family].filter(f => !findFontOption(f)?.system));
            }}
            onSavedSave={async () => {
              if (!selectedThemeId || !savedFontOverride) return;
              setSavingFonts(true);
              try {
                await updateBrandThemeFonts(brandId, selectedThemeId, {
                  heading_font: savedFontOverride.heading,
                  body_font: savedFontOverride.body,
                });
                // Reload to pick up the new theme CSS via the Vite glob
                window.location.href = `/?view=brand`;
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to save fonts');
                setSavingFonts(false);
              }
            }}
            onSavedReset={() => setSavedFontOverride(null)}
          />

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

          <div className="flex flex-col gap-2">
            <button
              onClick={handleGenerate}
              disabled={generating || refining || !hasLogo}
              className="lx-focus flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors"
              style={{
                background: generating || refining || !hasLogo ? 'var(--lx-surface-hover)' : 'var(--lx-accent)',
                color: generating || refining || !hasLogo ? 'var(--lx-text-muted)' : 'white',
                borderRadius: 'var(--lx-radius-md)',
                cursor: generating || refining || !hasLogo ? 'not-allowed' : 'pointer',
              }}
            >
              <Sparkles className="w-4 h-4" />
              {generating ? 'Generating…' : proposal ? 'Regenerate (fresh)' : 'Generate new theme'}
            </button>

            {proposal && (
              <button
                onClick={handleRefine}
                disabled={refining || generating || !feedback.trim()}
                className="lx-focus flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-medium transition-colors"
                style={{
                  background: refining || generating || !feedback.trim() ? 'transparent' : 'var(--lx-surface-hover)',
                  color: refining || generating || !feedback.trim() ? 'var(--lx-text-subtle)' : 'var(--lx-text)',
                  border: '1px solid var(--lx-border)',
                  borderRadius: 'var(--lx-radius-md)',
                  cursor: refining || generating || !feedback.trim() ? 'not-allowed' : 'pointer',
                }}
                title={!feedback.trim() ? 'Enter feedback above to refine' : 'Apply feedback as a minimal-delta revision'}
              >
                {refining ? 'Refining…' : 'Refine with feedback'}
              </button>
            )}
          </div>

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
              <style>{`.${PREVIEW_SCOPE} { ${extractRootVars(selectedThemeCssFromLoader)} ${
                savedFontOverride?.heading ? `--font-heading: ${savedFontOverride.heading};` : ''
              } ${
                savedFontOverride?.body ? `--font-body: ${savedFontOverride.body};` : ''
              } }`}</style>
            ) : null}
            <PreviewCanvas
              key={proposal
                ? `p-${activeVariantIdx}-${proposal.structural?.cover_style ?? ''}-${proposal.structural?.accent_stripe ?? ''}-${proposal.structural?.content_grid ?? ''}-${proposal.structural?.title_emphasis ?? ''}-${proposal.logo_treatment?.cover ?? ''}-${proposal.logo_treatment?.content ?? ''}-${proposal.typography.heading_font}-${proposal.typography.body_font}`
                : `${brandId}-${selectedThemeId ?? 'none'}-${savedFontOverride?.heading ?? ''}-${savedFontOverride?.body ?? ''}`}
              tab={previewTab}
              brandName={name.trim() || tenantData?.name || 'Brand'}
              logoUrl={logoUrlForPreview}
              logos={logoSetForPreview}
              scale={previewTab.startsWith('a4') ? PREVIEW_SCALE_A4 : PREVIEW_SCALE_SLIDE}
              templates={loadedBrand?.templates ?? {}}
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
  logos,
  scale,
  templates,
}: {
  tab: PreviewTab;
  brandName: string;
  logoUrl?: string;
  logos?: { primary?: string; light?: string; mono?: string };
  scale: number;
  templates: LoadedBrand['templates'];
}) {
  const { w, h } = tab.startsWith('a4') ? { w: 794, h: 1123 } : { w: 1280, h: 720 };
  const tenantMapping = TENANT_COMPONENT_BY_TAB[tab];
  const tenantComponent = templates[tenantMapping.format]?.components[tenantMapping.name];
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
          <Generic brandName={brandName} logoUrl={logoUrl} logos={logos} />
        )}
      </div>
    </div>
  );
}

function TypographyPanel({
  proposal,
  onProposalFontChange,
  savedThemeFonts,
  onSavedFontChange,
  onSavedSave,
  onSavedReset,
}: {
  proposal: ThemeProposal | null;
  onProposalFontChange: (which: 'heading' | 'body', family: string) => void;
  savedThemeFonts?: {
    heading: string;
    body: string;
    hasPendingChanges: boolean;
    saving: boolean;
  };
  onSavedFontChange: (which: 'heading' | 'body', family: string) => void;
  onSavedSave: () => void;
  onSavedReset: () => void;
}) {
  if (!proposal && !savedThemeFonts) return null;

  const heading = proposal?.typography.heading_font ?? savedThemeFonts?.heading ?? 'Inter';
  const body = proposal?.typography.body_font ?? savedThemeFonts?.body ?? 'Inter';
  const editingSaved = !proposal && !!savedThemeFonts;

  return (
    <div
      className="p-3.5 flex flex-col gap-3"
      style={{
        background: 'var(--lx-surface)',
        border: '1px solid var(--lx-border)',
        borderRadius: 'var(--lx-radius-md)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium" style={{ color: 'var(--lx-text-muted)' }}>
          Typography
        </span>
        {editingSaved && savedThemeFonts?.hasPendingChanges && (
          <span className="text-[10px]" style={{ color: 'var(--lx-accent)' }}>unsaved</span>
        )}
      </div>

      <FontSelect
        label="Heading"
        value={heading}
        onChange={family => {
          if (proposal) onProposalFontChange('heading', family);
          else onSavedFontChange('heading', family);
        }}
      />
      <FontSelect
        label="Body"
        value={body}
        onChange={family => {
          if (proposal) onProposalFontChange('body', family);
          else onSavedFontChange('body', family);
        }}
      />

      {editingSaved && savedThemeFonts?.hasPendingChanges && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSavedSave}
            disabled={savedThemeFonts.saving}
            className="lx-focus flex-1 text-[12px] font-medium py-2 rounded-[8px] transition-colors"
            style={{
              background: 'var(--lx-accent)',
              color: 'white',
              opacity: savedThemeFonts.saving ? 0.5 : 1,
            }}
          >
            {savedThemeFonts.saving ? 'Saving…' : 'Save fonts'}
          </button>
          <button
            type="button"
            onClick={onSavedReset}
            disabled={savedThemeFonts.saving}
            className="lx-focus text-[12px] py-2 px-3 rounded-[8px] transition-colors"
            style={{
              color: 'var(--lx-text-muted)',
              border: '1px solid var(--lx-border)',
            }}
          >
            Reset
          </button>
        </div>
      )}

      {!editingSaved && proposal && (
        <p className="text-[10.5px]" style={{ color: 'var(--lx-text-subtle)' }}>
          Claude picked these. Override anytime — your choice is saved with the theme.
        </p>
      )}
    </div>
  );
}

function LogoVariantSlot({
  label,
  hint,
  present,
  imgUrl,
  onUpload,
  onRemove,
}: {
  label: string;
  hint: string;
  present: boolean;
  imgUrl?: string;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className="flex flex-col p-2 gap-1.5"
      style={{
        background: 'var(--lx-surface)',
        border: '1px dashed var(--lx-border)',
        borderRadius: 'var(--lx-radius-sm)',
      }}
    >
      <button
        type="button"
        onClick={onUpload}
        className="flex items-center gap-2 text-left"
      >
        {present && imgUrl ? (
          <img
            src={imgUrl}
            alt=""
            className="w-6 h-6 object-contain flex-shrink-0"
            style={{
              background: label === 'Light variant' ? 'var(--color-dark, #1B2332)' : 'white',
              padding: 2,
              borderRadius: 'var(--lx-radius-sm)',
            }}
          />
        ) : (
          <div
            className="w-6 h-6 flex-shrink-0 flex items-center justify-center"
            style={{
              background: 'var(--lx-surface-hover)',
              borderRadius: 'var(--lx-radius-sm)',
              color: 'var(--lx-text-subtle)',
            }}
          >
            <Upload className="w-3 h-3" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] font-medium truncate" style={{ color: 'var(--lx-text)' }}>
            {present ? label : `Add ${label.toLowerCase()}`}
          </div>
          <div className="text-[9px] truncate" style={{ color: 'var(--lx-text-subtle)' }}>
            {hint}
          </div>
        </div>
      </button>
      {present && (
        <button
          type="button"
          onClick={onRemove}
          className="self-end text-[9px] transition-colors"
          style={{ color: 'var(--lx-text-subtle)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-danger)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
        >
          Remove
        </button>
      )}
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
