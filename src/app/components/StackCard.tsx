import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { LoadedStack } from '../stacks';
import { canvasSize } from '../stacks';
import { deleteStack, renameStack } from '../api';
import { LoadingOverlay } from './LoadingOverlay';

interface StackCardProps {
  stack: LoadedStack;
  onOpen: (id: string) => void;
  onMutated: () => void;
}

const THUMB_WIDTH = 280;

export function StackCard({ stack, onOpen, onMutated }: StackCardProps) {
  const { w, h } = canvasSize(stack.format);
  const scale = THUMB_WIDTH / w;
  const thumbHeight = h * scale;

  const firstPage = stack.binders.flatMap(b => b.documents).find(d => d.pages.length > 0)?.pages[0];
  const totalPages = stack.binders.reduce(
    (sum, b) => sum + b.documents.reduce((s, d) => s + d.pages.length, 0),
    0,
  );
  const totalDocuments = stack.binders.reduce((sum, b) => sum + b.documents.length, 0);
  const unitLabel = stack.format === 'slide-16x9' ? 'slide' : 'page';

  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deletePhase, setDeletePhase] = useState<'idle' | 'deleting' | 'refreshing'>('idle');
  const [hovered, setHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  async function handleRename() {
    setMenuOpen(false);
    const next = window.prompt('Rename stack', stack.name);
    if (!next || next.trim() === stack.name) return;
    setBusy(true);
    try {
      await renameStack(stack.id, next.trim());
      onMutated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rename failed');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setMenuOpen(false);
    const ok = window.confirm(
      `Delete "${stack.name}" and all its files?\n\nThis removes stacks/${stack.id}/ from disk. It cannot be undone from the UI (but git init gives you a safety net).`,
    );
    if (!ok) return;
    setBusy(true);
    setDeletePhase('deleting');
    try {
      await deleteStack(stack.id);
      setDeletePhase('refreshing');
      // Let Vite's filesystem watcher register the removal before the page reloads.
      await new Promise(r => setTimeout(r, 400));
      onMutated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setBusy(false);
      setDeletePhase('idle');
    }
  }

  return (
    <>
    {deletePhase !== 'idle' && (
      <LoadingOverlay
        title={deletePhase === 'deleting' ? `Deleting ${stack.name}` : 'Refreshing stack list'}
        subtitle={
          deletePhase === 'deleting'
            ? `Removing stacks/${stack.id}/ from disk…`
            : 'Almost there…'
        }
        accent="var(--lx-danger)"
        icon={<Trash2 className="w-5 h-5" strokeWidth={1.75} />}
      />
    )}
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-200"
      style={{
        width: THUMB_WIDTH,
        opacity: busy ? 0.5 : 1,
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
        onClick={() => onOpen(stack.id)}
        disabled={busy}
        className={`relative overflow-hidden theme-${stack.id} text-left`}
        style={{
          width: THUMB_WIDTH,
          height: thumbHeight,
          background: 'white',
          borderBottom: '1px solid var(--lx-border)',
        }}
      >
        {firstPage ? (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: w,
              height: h,
              pointerEvents: 'none',
            }}
          >
            {(() => {
              const Page = firstPage;
              return <Page />;
            })()}
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs"
            style={{ color: 'var(--lx-text-subtle)', background: 'var(--lx-surface-2)' }}
          >
            No pages yet
          </div>
        )}
      </button>

      <button
        onClick={() => onOpen(stack.id)}
        disabled={busy}
        className="text-left px-4 py-3.5 flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] uppercase tracking-[0.08em] font-semibold px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--lx-surface-hover)',
              color: 'var(--lx-text-muted)',
            }}
          >
            {stack.format === 'slide-16x9' ? '16:9' : 'A4'}
          </span>
          <span
            className="text-[13px] font-medium truncate flex-1 tracking-tight"
            style={{ color: 'var(--lx-text)' }}
          >
            {stack.name}
          </span>
        </div>
        {stack.subtitle && (
          <p className="text-[11px] truncate" style={{ color: 'var(--lx-text-subtle)' }}>
            {stack.subtitle}
          </p>
        )}
        <p className="text-[11px]" style={{ color: 'var(--lx-text-faint)' }}>
          {totalDocuments} document{totalDocuments === 1 ? '' : 's'} &middot; {totalPages} {unitLabel}{totalPages === 1 ? '' : 's'}
        </p>
      </button>

      <div className="absolute top-2.5 right-2.5" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          disabled={busy}
          className="lx-focus p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'rgba(10, 10, 11, 0.78)',
            backdropFilter: 'blur(6px)',
            color: 'var(--lx-text-muted)',
            border: '1px solid var(--lx-border)',
          }}
          title="More"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 mt-1.5 w-36 py-1 text-[12px] z-10"
            style={{
              background: 'var(--lx-surface-2)',
              border: '1px solid var(--lx-border-strong)',
              borderRadius: 'var(--lx-radius-md)',
              boxShadow: 'var(--lx-shadow-elevated)',
            }}
          >
            <button
              onClick={handleRename}
              className="w-full flex items-center gap-2 px-3 py-1.5 transition-colors"
              style={{ color: 'var(--lx-text-muted)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--lx-surface-hover)';
                e.currentTarget.style.color = 'var(--lx-text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--lx-text-muted)';
              }}
            >
              <Pencil className="w-3 h-3" /> Rename
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-1.5 transition-colors"
              style={{ color: 'var(--lx-danger)' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--lx-danger-soft)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
