import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { stacks } from './stacks';
import { StackCard } from './components/StackCard';
import { NewStackModal } from './components/NewStackModal';

interface LandingProps {
  onOpen: (stackId: string) => void;
}

function scopeThemeCss(css: string | undefined, scope: string): string {
  if (!css) return '';
  return css.replace(/:root\b/g, `.${scope}`);
}

export function Landing({ onOpen }: LandingProps) {
  const [showModal, setShowModal] = useState(false);

  const scopedThemes = useMemo(
    () => stacks.map(s => scopeThemeCss(s.themeCss, `theme-${s.id}`)).join('\n'),
    [],
  );

  async function handleCreated(id: string) {
    window.location.href = `/?stack=${encodeURIComponent(id)}`;
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'var(--launcher-bg, #0E1420)' }}>
      <style>{scopedThemes}</style>

      <header className="px-10 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Document Builder</h1>
            <p className="text-sm text-white/50 mt-1">
              {stacks.length} stack{stacks.length === 1 ? '' : 's'}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Plus className="w-4 h-4" />
            New stack
          </button>
        </div>
      </header>

      <main className="px-10 pb-16">
        {stacks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 p-12 text-center">
            <p className="text-sm text-white/60">No stacks yet.</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              <Plus className="w-4 h-4" />
              Create your first stack
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-5">
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
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 hover:border-white/30 text-white/40 hover:text-white/80 transition-colors"
              style={{ width: 282, minHeight: 280 }}
            >
              <Plus className="w-6 h-6 mb-1.5" />
              <span className="text-xs font-semibold">New stack</span>
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
