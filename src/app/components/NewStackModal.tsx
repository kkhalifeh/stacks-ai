import { useEffect, useRef, useState } from 'react';
import { FileText, Monitor, X } from 'lucide-react';
import { createStack, slugify } from '../api';
import { tenant } from '../stacks';
import { LoadingOverlay } from './LoadingOverlay';

interface NewStackModalProps {
  existingIds: string[];
  onClose: () => void;
  onCreated: (id: string) => void;
}

type Phase = 'idle' | 'creating' | 'opening';

export function NewStackModal({ existingIds, onClose, onCreated }: NewStackModalProps) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [format, setFormat] = useState<'a4' | 'slide-16x9'>('a4');
  const [themeId, setThemeId] = useState<string>('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const availableThemes = tenant?.themes ?? [];

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!idTouched) setId(slugify(name));
  }, [name, idTouched]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase === 'idle') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, phase]);

  const idConflict = existingIds.includes(id);
  const busy = phase !== 'idle';
  const canSubmit = name.trim().length > 0 && id.length > 0 && !idConflict && !busy;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setPhase('creating');
    setError(null);
    try {
      await createStack({
        id,
        name: name.trim(),
        template: format,
        themeId: themeId || undefined,
      });
      setPhase('opening');
      // Give Vite's filesystem watcher + glob a beat to register the new files
      // before we hard-reload into the stack route.
      await new Promise(r => setTimeout(r, 500));
      onCreated(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create stack');
      setPhase('idle');
    }
  }

  const formatOptionStyle = (active: boolean) =>
    ({
      background: active ? 'var(--lx-accent-soft)' : 'var(--lx-surface)',
      border: `1px solid ${active ? 'var(--lx-accent)' : 'var(--lx-border)'}`,
      color: active ? 'var(--lx-text)' : 'var(--lx-text-muted)',
    } as React.CSSProperties);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(6, 6, 8, 0.72)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={() => { if (!busy) onClose(); }}
    >
      {busy && (
        <LoadingOverlay
          title={phase === 'creating' ? `Creating ${name.trim() || 'stack'}` : 'Opening stack'}
          subtitle={
            phase === 'creating'
              ? (format === 'slide-16x9' ? 'Setting up a new 16:9 slide deck…' : 'Setting up a new A4 document…')
              : 'Applying theme and loading pages…'
          }
        />
      )}
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md p-7"
        style={{
          background: 'var(--lx-surface-2)',
          border: '1px solid var(--lx-border-strong)',
          borderRadius: 'var(--lx-radius-lg)',
          display: busy ? 'none' : undefined,
          boxShadow: 'var(--lx-shadow-elevated)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-[15px] font-semibold tracking-tight"
            style={{ color: 'var(--lx-text)' }}
          >
            New stack
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
          <span
            className="block text-[11px] font-medium mb-1.5"
            style={{ color: 'var(--lx-text-muted)' }}
          >
            Name
          </span>
          <input
            ref={nameInputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="MODEE AI-GIS Tender"
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
          <span
            className="block text-[11px] font-medium mb-1.5"
            style={{ color: 'var(--lx-text-muted)' }}
          >
            Folder ID
          </span>
          <input
            value={id}
            onChange={e => { setId(slugify(e.target.value)); setIdTouched(true); }}
            placeholder="modee-ai-gis-tender"
            className="lx-focus w-full text-[13px] px-3 py-2 font-mono transition-colors"
            style={{
              background: 'var(--lx-surface)',
              border: `1px solid ${idConflict ? 'var(--lx-danger)' : 'var(--lx-border)'}`,
              borderRadius: 'var(--lx-radius-md)',
              color: 'var(--lx-text)',
              outline: 'none',
            }}
          />
          <span
            className="block mt-1.5 text-[11px]"
            style={{ color: idConflict ? 'var(--lx-danger)' : 'var(--lx-text-subtle)' }}
          >
            {idConflict
              ? `A stack named "${id}" already exists`
              : id
                ? `Files will live at stacks/${id}/`
                : 'Used as the folder name'}
          </span>
        </label>

        <div className="mb-6">
          <span
            className="block text-[11px] font-medium mb-2"
            style={{ color: 'var(--lx-text-muted)' }}
          >
            Format
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormat('a4')}
              className="lx-focus flex items-center gap-2.5 px-3 py-2.5 transition-colors"
              style={{ ...formatOptionStyle(format === 'a4'), borderRadius: 'var(--lx-radius-md)' }}
            >
              <FileText className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <div className="text-left">
                <div className="text-[13px] font-medium">A4</div>
                <div className="text-[11px]" style={{ color: 'var(--lx-text-subtle)' }}>
                  Portrait document
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setFormat('slide-16x9')}
              className="lx-focus flex items-center gap-2.5 px-3 py-2.5 transition-colors"
              style={{ ...formatOptionStyle(format === 'slide-16x9'), borderRadius: 'var(--lx-radius-md)' }}
            >
              <Monitor className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <div className="text-left">
                <div className="text-[13px] font-medium">16:9</div>
                <div className="text-[11px]" style={{ color: 'var(--lx-text-subtle)' }}>
                  Landscape slides
                </div>
              </div>
            </button>
          </div>
        </div>

        {availableThemes.length > 0 && (
          <div className="mb-6">
            <span
              className="block text-[11px] font-medium mb-2"
              style={{ color: 'var(--lx-text-muted)' }}
            >
              Theme
            </span>
            <select
              value={themeId}
              onChange={e => setThemeId(e.target.value)}
              className="lx-focus w-full text-[13px] px-3 py-2 transition-colors"
              style={{
                background: 'var(--lx-surface)',
                border: '1px solid var(--lx-border)',
                borderRadius: 'var(--lx-radius-md)',
                color: 'var(--lx-text)',
                outline: 'none',
              }}
            >
              <option value="">Inherit tenant default (live)</option>
              {availableThemes.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                  {t.id === tenant?.activeThemeId ? ' — default' : ''}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-[11px]" style={{ color: 'var(--lx-text-subtle)' }}>
              {themeId
                ? 'A snapshot of this theme is copied into the stack. Future changes to the tenant theme will not affect it.'
                : 'The stack inherits whichever theme is the tenant default, now and in the future.'}
            </p>
          </div>
        )}

        {error && (
          <div
            className="mb-5 px-3 py-2 text-[12px]"
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

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="lx-focus text-[13px] px-3.5 py-2 rounded-[10px] transition-colors"
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
            onMouseEnter={e => {
              if (canSubmit) e.currentTarget.style.background = 'var(--lx-accent-hover)';
            }}
            onMouseLeave={e => {
              if (canSubmit) e.currentTarget.style.background = 'var(--lx-accent)';
            }}
          >
            Create stack
          </button>
        </div>
      </form>
    </div>
  );
}

