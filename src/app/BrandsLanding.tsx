import { useCallback, useEffect, useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { brands as loadedBrands } from './stacks';
import { createBrand, deleteBrand, listBrands, type BrandSummary } from './brand-api';
import { NewBrandModal } from './components/NewBrandModal';
import { LoadingOverlay } from './components/LoadingOverlay';

interface Props {
  onOpenBrand: (brandId: string) => void;
}

export function BrandsLanding({ onOpenBrand }: Props) {
  const [brands, setBrands] = useState<BrandSummary[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const { brands } = await listBrands();
      setBrands(brands);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load brands');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(input: { id: string; name: string }) {
    setCreating(input);
    setError(null);
    try {
      await createBrand(input);
      await new Promise(r => setTimeout(r, 400));
      window.location.href = `/?brand=${encodeURIComponent(input.id)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create brand');
      setCreating(null);
      throw err;
    }
  }

  async function handleDelete(brand: BrandSummary) {
    const ok = window.confirm(
      `Delete "${brand.name}" and all its logo, themes, references?\n\nStacks belonging to this brand won't be deleted, but they'll show up as orphaned until reassigned.`,
    );
    if (!ok) return;
    try {
      await deleteBrand(brand.id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const list = brands ?? loadedBrands.map(b => ({
    id: b.id,
    name: b.name,
    subtitle: b.subtitle,
    logo: null,
    activeThemeId: b.activeThemeId ?? null,
    themeCount: b.themes.length,
  }));

  return (
    <div className="min-h-screen" style={{ background: 'var(--lx-bg)', color: 'var(--lx-text)' }}>
      {creating && (
        <LoadingOverlay
          title={`Creating ${creating.name}`}
          subtitle="Setting up brand directory…"
        />
      )}

      <header className="max-w-[1280px] mx-auto px-10 pt-14 pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.12em] mb-3 font-medium"
              style={{ color: 'var(--lx-text-subtle)' }}
            >
              Stacks AI
            </p>
            <h1
              className="text-[26px] font-semibold tracking-tight"
              style={{ color: 'var(--lx-text)' }}
            >
              Brands
            </h1>
            <p className="text-[13px] mt-1" style={{ color: 'var(--lx-text-muted)' }}>
              Each brand owns its own logo, themes, templates, and stacks.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="lx-focus flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-[10px] transition-colors"
            style={{ background: 'var(--lx-accent)', color: 'white' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--lx-accent)')}
          >
            <Plus className="w-4 h-4" strokeWidth={2.25} />
            New brand
          </button>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-10 pb-20">
        {error && (
          <div
            className="mb-6 px-4 py-3 text-[12px]"
            style={{
              color: 'var(--lx-danger)',
              background: 'var(--lx-danger-soft)',
              border: '1px solid rgba(248,113,113,0.25)',
              borderRadius: 'var(--lx-radius-md)',
            }}
          >
            {error}
          </div>
        )}

        {list.length === 0 ? (
          <div
            className="rounded-[14px] p-14 text-center"
            style={{ border: '1px dashed var(--lx-border-strong)', background: 'var(--lx-surface)' }}
          >
            <p className="text-[13px]" style={{ color: 'var(--lx-text-muted)' }}>
              No brands yet.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="lx-focus mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-[10px]"
              style={{ background: 'var(--lx-accent)', color: 'white' }}
            >
              <Plus className="w-4 h-4" strokeWidth={2.25} />
              Create your first brand
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {list.map(brand => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onOpen={() => onOpenBrand(brand.id)}
                onDelete={() => handleDelete(brand)}
              />
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="lx-focus flex flex-col items-center justify-center rounded-[14px] transition-all"
              style={{
                minHeight: 200,
                background: 'transparent',
                border: '1px dashed var(--lx-border-strong)',
                color: 'var(--lx-text-subtle)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--lx-surface)';
                e.currentTarget.style.borderColor = 'var(--lx-accent)';
                e.currentTarget.style.color = 'var(--lx-text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'var(--lx-border-strong)';
                e.currentTarget.style.color = 'var(--lx-text-subtle)';
              }}
            >
              <Plus className="w-5 h-5 mb-2" strokeWidth={1.75} />
              <span className="text-[12px] font-medium tracking-tight">New brand</span>
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <NewBrandModal
          existingIds={list.map(b => b.id)}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

function BrandCard({
  brand,
  onOpen,
  onDelete,
}: {
  brand: BrandSummary;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-200"
      style={{
        minHeight: 200,
        background: 'var(--lx-surface)',
        border: `1px solid ${hovered ? 'var(--lx-border-strong)' : 'var(--lx-border)'}`,
        borderRadius: 'var(--lx-radius-lg)',
        boxShadow: hovered ? 'var(--lx-shadow-elevated)' : 'var(--lx-shadow-resting)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onOpen}
        className="relative flex-1 flex flex-col items-start p-5 text-left"
      >
        <div className="flex items-center gap-3 mb-auto">
          {brand.logo ? (
            <img
              src={`/__api/brands/${encodeURIComponent(brand.id)}/logo?t=${brand.id}`}
              alt=""
              className="w-12 h-12 object-contain"
              style={{ background: 'white', padding: 6, borderRadius: 'var(--lx-radius-md)' }}
            />
          ) : (
            <div
              className="w-12 h-12 flex items-center justify-center"
              style={{
                background: 'var(--lx-surface-2)',
                borderRadius: 'var(--lx-radius-md)',
                color: 'var(--lx-text-subtle)',
              }}
            >
              <Sparkles className="w-5 h-5" strokeWidth={1.75} />
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[14px] font-semibold tracking-tight truncate" style={{ color: 'var(--lx-text)' }}>
              {brand.name}
            </div>
            {brand.subtitle && (
              <div className="text-[11px] truncate" style={{ color: 'var(--lx-text-subtle)' }}>
                {brand.subtitle}
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 text-[11px]" style={{ color: 'var(--lx-text-faint)' }}>
          <span>{brand.themeCount} theme{brand.themeCount === 1 ? '' : 's'}</span>
          {brand.activeThemeId && (
            <span className="flex items-center gap-1">
              <span style={{ color: 'var(--lx-accent)' }}>●</span>
              <span className="font-mono">{brand.activeThemeId}</span>
            </span>
          )}
        </div>
      </button>
      <button
        onClick={onDelete}
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-[10px] px-2 py-1 rounded transition-colors"
        style={{ color: 'var(--lx-danger)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-danger-soft)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        title="Delete brand"
      >
        Delete
      </button>
    </div>
  );
}
