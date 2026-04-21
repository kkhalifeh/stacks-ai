import { useCallback, useEffect, useRef, useState } from 'react';
import { FileText, Image as ImageIcon, RefreshCw, Trash2, Upload } from 'lucide-react';
import { deleteBrandReference, listBrandReferences, uploadBrandReference, type BrandReference } from '../../brand-api';

interface ReferencesPanelProps {
  brandId: string;
  /** Called whenever the references list changes so the parent knows to include them in the next generate. */
  onChanged?: (refs: BrandReference[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export function ReferencesPanel({ brandId, onChanged }: ReferencesPanelProps) {
  const [refs, setRefs] = useState<BrandReference[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingNames, setUploadingNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { references } = await listBrandReferences(brandId);
      setRefs(references);
      onChanged?.(references);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load references');
    } finally {
      setLoading(false);
    }
  }, [onChanged]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const upload = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    setUploadingNames(arr.map(f => f.name));
    const results = await Promise.allSettled(arr.map(f => uploadBrandReference(brandId, f)));
    setUploadingNames([]);
    const failed = results
      .map((r, i) => ({ r, name: arr[i].name }))
      .filter(({ r }) => r.status === 'rejected');
    if (failed.length) {
      setError(failed.map(f => `${f.name}: ${(f.r as PromiseRejectedResult).reason.message}`).join('\n'));
    } else {
      setError(null);
    }
    await load();
  }, [load]);

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.types.includes('Files')) setDragOver(true);
  }
  function onDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  }

  async function handleDelete(name: string) {
    const ok = window.confirm(`Remove reference "${name}"?`);
    if (!ok) return;
    try {
      await deleteBrandReference(brandId, name);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="block text-[11px] font-medium" style={{ color: 'var(--lx-text-muted)' }}>
          Style references <span style={{ color: 'var(--lx-text-faint)' }}>(optional)</span>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: 'var(--lx-text-faint)' }}>
            {refs.length}
          </span>
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload"
            style={{ color: 'var(--lx-text-subtle)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
          >
            <Upload className="w-3 h-3" />
          </button>
          <button
            onClick={load}
            title="Refresh"
            style={{ color: 'var(--lx-text-subtle)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        className="hidden"
        onChange={e => {
          if (e.target.files) upload(e.target.files);
          e.target.value = '';
        }}
      />

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="p-3 transition-colors"
        style={{
          background: dragOver ? 'var(--lx-accent-soft)' : 'var(--lx-surface)',
          border: `1px dashed ${dragOver ? 'var(--lx-accent)' : 'var(--lx-border-strong)'}`,
          borderRadius: 'var(--lx-radius-md)',
          color: 'var(--lx-text-muted)',
        }}
      >
        {refs.length === 0 && uploadingNames.length === 0 ? (
          <p className="text-[11.5px] leading-relaxed">
            Drop PDFs or images here to use as style inspiration.
            Claude will factor them into the theme alongside the logo.
          </p>
        ) : (
          <ul className="space-y-1">
            {uploadingNames.map(n => (
              <li
                key={n}
                className="flex items-center gap-2 text-[11.5px]"
                style={{ color: 'var(--lx-text-subtle)' }}
              >
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span className="truncate">{n}</span>
              </li>
            ))}
            {refs.map(r => (
              <li
                key={r.name}
                className="group flex items-center gap-2 px-1 py-1 rounded transition-colors text-[11.5px]"
                style={{ color: 'var(--lx-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-surface-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {r.kind === 'image' ? (
                  <ImageIcon className="w-3 h-3 flex-shrink-0" />
                ) : (
                  <FileText className="w-3 h-3 flex-shrink-0" />
                )}
                <span className="truncate flex-1" style={{ color: 'var(--lx-text)' }}>{r.name}</span>
                <span className="text-[10px]" style={{ color: 'var(--lx-text-faint)' }}>{formatSize(r.size)}</span>
                <button
                  onClick={() => handleDelete(r.name)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--lx-text-subtle)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-danger)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
                  title="Remove"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[11px] whitespace-pre-wrap" style={{ color: 'var(--lx-danger)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
