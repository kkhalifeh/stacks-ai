import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { LoadedStack } from '../stacks';
import { canvasSize } from '../stacks';
import { deleteStack, renameStack } from '../api';

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
    try {
      await deleteStack(stack.id);
      onMutated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
      setBusy(false);
    }
  }

  return (
    <div
      className="group relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-colors overflow-hidden"
      style={{ width: THUMB_WIDTH + 2, opacity: busy ? 0.5 : 1 }}
    >
      <button
        onClick={() => onOpen(stack.id)}
        disabled={busy}
        className={`relative overflow-hidden theme-${stack.id} text-left`}
        style={{ width: THUMB_WIDTH, height: thumbHeight, background: 'white' }}
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
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No pages yet
          </div>
        )}
      </button>

      <button
        onClick={() => onOpen(stack.id)}
        disabled={busy}
        className="text-left p-3 flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white/60">
            {stack.format === 'slide-16x9' ? '16:9' : 'A4'}
          </span>
          <span className="text-xs font-semibold text-white truncate flex-1">{stack.name}</span>
        </div>
        {stack.subtitle && (
          <p className="text-[10px] text-white/40 truncate">{stack.subtitle}</p>
        )}
        <p className="text-[10px] text-white/30">
          {totalDocuments} document{totalDocuments === 1 ? '' : 's'} · {totalPages} {unitLabel}{totalPages === 1 ? '' : 's'}
        </p>
      </button>

      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          disabled={busy}
          className="p-1 rounded-md bg-black/50 backdrop-blur-sm text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
          title="More"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-32 rounded-lg border border-white/10 bg-[#1B2332] shadow-xl py-1 text-xs z-10">
            <button
              onClick={handleRename}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/5"
            >
              <Pencil className="w-3 h-3" /> Rename
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-red-300/80 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
