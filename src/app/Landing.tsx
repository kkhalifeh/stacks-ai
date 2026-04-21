import { useMemo, useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { stacks, tenant } from './stacks';
import { StackCard } from './components/StackCard';
import { NewStackModal } from './components/NewStackModal';

interface LandingProps {
  onOpen: (stackId: string) => void;
  onOpenBrand: () => void;
}

function scopeThemeCss(css: string | undefined, scope: string): string {
  if (!css) return '';
  return css.replace(/:root\b/g, `.${scope}`);
}

export function Landing({ onOpen, onOpenBrand }: LandingProps) {
  const [showModal, setShowModal] = useState(false);

  const scopedThemes = useMemo(
    () => stacks.map(s => scopeThemeCss(s.themeCss, `theme-${s.id}`)).join('\n'),
    [],
  );

  async function handleCreated(id: string) {
    window.location.href = `/?stack=${encodeURIComponent(id)}`;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--lx-bg)', color: 'var(--lx-text)' }}
    >
      <style>{scopedThemes}</style>

      <header className="max-w-[1280px] mx-auto px-10 pt-14 pb-10">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            {tenant?.logoUrl && (
              <img
                src={tenant.logoUrl}
                alt=""
                className="w-10 h-10 object-contain"
                style={{ borderRadius: 'var(--lx-radius-sm)' }}
              />
            )}
            <div>
              <h1
                className="text-[22px] font-semibold tracking-tight"
                style={{ color: 'var(--lx-text)' }}
              >
                {tenant?.name ?? 'Document Builder'}
              </h1>
              <p
                className="text-[13px] mt-1"
                style={{ color: 'var(--lx-text-muted)' }}
              >
                {stacks.length} stack{stacks.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBrand}
              className="lx-focus flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-[10px] transition-colors"
              style={{
                background: 'var(--lx-surface-2)',
                border: '1px solid var(--lx-border)',
                color: 'var(--lx-text)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--lx-surface-hover)';
                e.currentTarget.style.borderColor = 'var(--lx-border-strong)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--lx-surface-2)';
                e.currentTarget.style.borderColor = 'var(--lx-border)';
              }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.75} style={{ color: 'var(--lx-accent)' }} />
              Brand Studio
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="lx-focus flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-[10px] transition-colors"
              style={{
                background: 'var(--lx-accent)',
                color: 'white',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-accent-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--lx-accent)')}
            >
              <Plus className="w-4 h-4" strokeWidth={2.25} />
              New stack
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-10 pb-20">
        {stacks.length === 0 ? (
          <div
            className="rounded-[14px] p-14 text-center"
            style={{
              border: '1px dashed var(--lx-border-strong)',
              background: 'var(--lx-surface)',
            }}
          >
            <p className="text-[13px]" style={{ color: 'var(--lx-text-muted)' }}>
              No stacks yet.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="lx-focus mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-[10px]"
              style={{ background: 'var(--lx-accent)', color: 'white' }}
            >
              <Plus className="w-4 h-4" strokeWidth={2.25} />
              Create your first stack
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {stacks.map(stack => (
              <StackCard
                key={stack.id}
                stack={stack}
                onOpen={onOpen}
                onMutated={() => window.location.reload()}
              />
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="lx-focus group flex flex-col items-center justify-center rounded-[14px] transition-all"
              style={{
                width: 282,
                minHeight: 280,
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
              <span className="text-[12px] font-medium tracking-tight">New stack</span>
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <NewStackModal
          existingIds={stacks.map(s => s.id)}
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
