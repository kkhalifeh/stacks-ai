import { useEffect, useRef, useState } from 'react';
import { FileText, Monitor, X } from 'lucide-react';
import { createStack, slugify } from '../api';

interface NewStackModalProps {
  existingIds: string[];
  onClose: () => void;
  onCreated: (id: string) => void;
}

export function NewStackModal({ existingIds, onClose, onCreated }: NewStackModalProps) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [format, setFormat] = useState<'a4' | 'slide-16x9'>('a4');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!idTouched) setId(slugify(name));
  }, [name, idTouched]);

  const idConflict = existingIds.includes(id);
  const canSubmit = name.trim().length > 0 && id.length > 0 && !idConflict && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await createStack({ id, name: name.trim(), template: format });
      onCreated(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create stack');
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <form
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 p-6"
        style={{ background: '#1B2332' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-white">New stack</h2>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="block mb-4">
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-1.5">
            Name
          </span>
          <input
            ref={nameInputRef}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="MODEE AI-GIS Tender"
            className="w-full text-sm px-3 py-2 rounded bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-1.5">
            Folder ID
          </span>
          <input
            value={id}
            onChange={e => { setId(slugify(e.target.value)); setIdTouched(true); }}
            placeholder="modee-ai-gis-tender"
            className={`w-full text-sm px-3 py-2 rounded bg-white/5 border text-white placeholder:text-white/25 focus:outline-none ${
              idConflict ? 'border-red-500/60' : 'border-white/10 focus:border-white/40'
            }`}
          />
          <span className={`block mt-1 text-[10px] ${idConflict ? 'text-red-400' : 'text-white/30'}`}>
            {idConflict
              ? `A stack named "${id}" already exists`
              : id
                ? `Files will live at stacks/${id}/`
                : 'Used as the folder name'}
          </span>
        </label>

        <div className="mb-5">
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-white/40 mb-1.5">
            Format
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormat('a4')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors ${
                format === 'a4'
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs font-semibold">A4</div>
                <div className="text-[10px] text-white/40">Portrait document</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setFormat('slide-16x9')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors ${
                format === 'slide-16x9'
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs font-semibold">16:9</div>
                <div className="text-[10px] text-white/40">Landscape slides</div>
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded p-2 text-[11px] text-red-300 border border-red-500/30 bg-red-500/10">
            {error}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-3 py-2 rounded text-white/60 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="text-xs px-3 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating…' : 'Create stack'}
          </button>
        </div>
      </form>
    </div>
  );
}
