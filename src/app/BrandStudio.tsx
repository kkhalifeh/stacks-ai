import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import { applyTheme, generateTheme, logoUrlFor, proposalToCssVars, uploadLogo, type ThemeProposal } from './brand-api';
import { applyStackTheme, getStack } from './stacks';
import { A4TitleSample } from './preview/A4TitleSample';
import { A4ContentSample } from './preview/A4ContentSample';
import { SlideTitleSample } from './preview/SlideTitleSample';
import { SlideContentSample } from './preview/SlideContentSample';

interface BrandStudioProps {
  stackId: string;
  onBack: () => void;
}

const PREVIEW_SCALE_A4 = 0.5;
const PREVIEW_SCALE_SLIDE = 0.45;

export function BrandStudio({ stackId, onBack }: BrandStudioProps) {
  const stack = getStack(stackId);
  const [name, setName] = useState(stack?.name ?? '');
  const [keywords, setKeywords] = useState('');
  const [feedback, setFeedback] = useState('');
  const [logoVersion, setLogoVersion] = useState(0);
  const [hasLogo, setHasLogo] = useState(Boolean(stack?.logoUrl));
  const [proposal, setProposal] = useState<ThemeProposal | null>(null);
  const [generating, setGenerating] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'a4-title' | 'a4-content' | 'slide-title' | 'slide-content'>(
    stack?.format === 'slide-16x9' ? 'slide-title' : 'a4-title',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear any active stack theme while in Brand Studio so the proposal's preview isn't polluted
  useEffect(() => {
    applyStackTheme(undefined);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    try {
      await uploadLogo(stackId, file);
      setHasLogo(true);
      setLogoVersion(v => v + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }, [stackId]);

  async function handleGenerate() {
    setError(null);
    setGenerating(true);
    try {
      const { proposal } = await generateTheme(stackId, {
        name: name.trim() || stack?.name || stackId,
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
      await applyTheme(stackId, proposal);
      // Reload the whole app so stacks.ts re-reads the new theme + updated stack.json
      window.location.href = `/?stack=${encodeURIComponent(stackId)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Apply failed');
      setApplying(false);
    }
  }

  if (!stack) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm" style={{ color: 'var(--lx-text-muted)' }}>
        Stack not found.
      </div>
    );
  }

  const logoUrlForPreview = hasLogo ? logoUrlFor(stackId, logoVersion) : undefined;

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
            Back to {stack.name}
          </button>
          <h1 className="text-[17px] font-semibold tracking-tight">Brand Studio</h1>
          <p className="text-[12px] mt-1" style={{ color: 'var(--lx-text-muted)' }}>
            Upload a logo, describe the brand, let Claude propose a theme.
          </p>
        </div>

        <div className="px-6 pb-6 flex flex-col gap-5">
          {/* Logo upload */}
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
                    src={logoUrlFor(stackId, logoVersion)}
                    alt=""
                    className="w-10 h-10 object-contain flex-shrink-0"
                    style={{ background: 'white', padding: 4, borderRadius: 'var(--lx-radius-sm)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium truncate" style={{ color: 'var(--lx-text)' }}>
                      Logo uploaded
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
              placeholder={stack.name}
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
              placeholder="e.g. minimal, confident, enterprise, technical"
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
                placeholder="e.g. make it more conservative, darken the primary, use warmer accents"
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
              Upload a logo first to enable generation.
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
                {applying ? 'Applying…' : 'Apply to stack'}
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
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-10" style={{ background: 'var(--lx-bg)' }}>
          <div className={`brand-preview-scope brand-preview-${stackId}`}>
            {proposal && (
              <style>{`.brand-preview-${stackId} { ${proposalToCssVars(proposal)} }`}</style>
            )}
            <PreviewCanvas
              tab={previewTab}
              brandName={name.trim() || stack.name}
              logoUrl={logoUrlForPreview}
              scale={
                previewTab === 'a4-title' || previewTab === 'a4-content' ? PREVIEW_SCALE_A4 : PREVIEW_SCALE_SLIDE
              }
              hasProposal={Boolean(proposal)}
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
  hasProposal,
}: {
  tab: 'a4-title' | 'a4-content' | 'slide-title' | 'slide-content';
  brandName: string;
  logoUrl?: string;
  scale: number;
  hasProposal: boolean;
}) {
  const pickDims = () => {
    if (tab.startsWith('a4')) return { w: 794, h: 1123 };
    return { w: 1280, h: 720 };
  };
  const { w, h } = pickDims();
  const Sample =
    tab === 'a4-title' ? A4TitleSample
      : tab === 'a4-content' ? A4ContentSample
        : tab === 'slide-title' ? SlideTitleSample
          : SlideContentSample;

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
        <Sample brandName={brandName} logoUrl={logoUrl} />
      </div>
      {!hasProposal && (
        <div
          className="absolute inset-0 flex items-center justify-center text-center px-8"
          style={{
            background: 'rgba(10,10,11,0.78)',
            color: 'var(--lx-text-muted)',
            borderRadius: 'var(--lx-radius-lg)',
          }}
        >
          <div>
            <Sparkles className="w-5 h-5 mx-auto mb-2" style={{ color: 'var(--lx-text-subtle)' }} />
            <p className="text-[13px] font-medium mb-1" style={{ color: 'var(--lx-text)' }}>
              No proposal yet
            </p>
            <p className="text-[11.5px]">
              Upload a logo and click <strong>Generate theme</strong> to see the preview render with the proposed brand.
            </p>
          </div>
        </div>
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
