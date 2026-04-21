import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { slugify } from '../api';

interface Props {
  existingIds: string[];
  onClose: () => void;
  onCreate: (input: { id: string; name: string }) => Promise<void>;
}

export function NewBrandModal({ existingIds, onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);
  useEffect(() => { if (!idTouched) setId(slugify(name)); }, [name, idTouched]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !submitting) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, submitting]);

  const conflict = existingIds.includes(id);
  const canSubmit = name.trim().length > 0 && id.length > 0 && !conflict && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await onCreate({ id, name: name.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,6,8,0.72)', backdropFilter: 'blur(8px)' }}
      onClick={() => { if (!submitting) onClose(); }}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md p-7"
        style={{
          background: 'var(--lx-surface-2)',
          border: '1px solid var(--lx-border-strong)',
          borderRadius: 'var(--lx-radius-lg)',
          boxShadow: 'var(--lx-shadow-elevated)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[15px] font-semibold tracking-tight" style={{ color: 'var(--lx-text)' }}>
            New brand
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="lx-focus p-1 rounded transition-colors"
            style={{ color: 'var(--lx-text-subtle)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="block mb-5">
          <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>Name</span>
          <input
            ref={nameRef}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Acme Co."
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

        <label className="block mb-5">
          <span className="block text-[11px] font-medium mb-1.5" style={{ color: 'var(--lx-text-muted)' }}>Folder ID</span>
          <input
            value={id}
            onChange={e => { setId(slugify(e.target.value)); setIdTouched(true); }}
            placeholder="acme"
            className="lx-focus w-full text-[13px] px-3 py-2 font-mono transition-colors"
            style={{
              background: 'var(--lx-surface)',
              border: `1px solid ${conflict ? 'var(--lx-danger)' : 'var(--lx-border)'}`,
              borderRadius: 'var(--lx-radius-md)',
              color: 'var(--lx-text)',
              outline: 'none',
            }}
          />
          <span
            className="block mt-1.5 text-[11px]"
            style={{ color: conflict ? 'var(--lx-danger)' : 'var(--lx-text-subtle)' }}
          >
            {conflict
              ? `A brand named "${id}" already exists`
              : id
                ? `Files will live at brands/${id}/`
                : 'Used as the folder name'}
          </span>
        </label>

        {error && (
          <div
            className="mb-5 px-3 py-2 text-[12px]"
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

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="lx-focus text-[13px] px-3.5 py-2 rounded-[10px] transition-colors"
            style={{ color: 'var(--lx-text-muted)' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="lx-focus text-[13px] px-3.5 py-2 rounded-[10px] font-medium transition-colors"
            style={{
              background: canSubmit ? 'var(--lx-accent)' : 'var(--lx-surface-hover)',
              color: canSubmit ? 'white' : 'var(--lx-text-faint)',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            Create brand
          </button>
        </div>
      </form>
    </div>
  );
}
