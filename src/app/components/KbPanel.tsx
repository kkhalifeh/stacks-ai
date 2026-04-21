import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, RefreshCw, Trash2, Upload } from 'lucide-react';
import { deleteKb, listKb, uploadKb, type KbFile } from '../api';

interface KbPanelProps {
  stackId: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export function KbPanel({ stackId }: KbPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [files, setFiles] = useState<KbFile[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingNames, setUploadingNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { files } = await listKb(stackId);
      setFiles(files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [stackId]);

  useEffect(() => {
    if (expanded && files === null) load();
  }, [expanded, files, load]);

  useEffect(() => { setFiles(null); setError(null); }, [stackId]);

  const uploadFiles = useCallback(async (fileList: FileList | File[]) => {
    const arr = Array.from(fileList);
    if (arr.length === 0) return;
    setExpanded(true);
    setUploadingNames(arr.map(f => f.name));
    const results = await Promise.allSettled(arr.map(f => uploadKb(stackId, f)));
    setUploadingNames([]);
    const failed = results
      .map((r, i) => ({ r, name: arr[i].name }))
      .filter(({ r }) => r.status === 'rejected');
    if (failed.length) {
      const reasons = failed.map(f => `${f.name}: ${(f.r as PromiseRejectedResult).reason.message}`).join('\n');
      setError(reasons);
    }
    await load();
  }, [stackId, load]);

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
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }

  async function handleDelete(name: string) {
    const ok = window.confirm(`Delete ${name} from the knowledge base?`);
    if (!ok) return;
    try {
      await deleteKb(stackId, name);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="mb-3" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-[6px] text-left transition-colors"
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-surface-hover)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {expanded ? (
          <ChevronDown className="w-3 h-3" style={{ color: 'var(--lx-text-subtle)' }} />
        ) : (
          <ChevronRight className="w-3 h-3" style={{ color: 'var(--lx-text-subtle)' }} />
        )}
        <span
          className="text-[10px] uppercase tracking-[0.08em] font-semibold flex-1"
          style={{ color: 'var(--lx-text-subtle)' }}
        >
          Knowledge base
        </span>
        {files && (
          <span className="text-[9px] font-medium" style={{ color: 'var(--lx-text-faint)' }}>
            {files.length}
          </span>
        )}
        {expanded && (
          <>
            <span
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="cursor-pointer transition-colors"
              style={{ color: 'var(--lx-text-subtle)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
              title="Upload"
            >
              <Upload className="w-3 h-3" />
            </span>
            <span
              onClick={e => { e.stopPropagation(); load(); }}
              className="cursor-pointer transition-colors"
              style={{ color: 'var(--lx-text-subtle)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
              title="Refresh"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </span>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={e => {
          if (e.target.files) uploadFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {expanded && (
        <div
          className="px-2 pt-1 pb-2 text-[11px] rounded-[8px] transition-colors"
          style={
            dragOver
              ? {
                  background: 'var(--lx-accent-soft)',
                  boxShadow: 'inset 0 0 0 1px var(--lx-accent-ring)',
                }
              : undefined
          }
        >
          {error && (
            <div
              className="px-1.5 py-1 whitespace-pre-wrap"
              style={{ color: 'var(--lx-danger)' }}
            >
              {error}
            </div>
          )}

          {uploadingNames.length > 0 && (
            <ul className="mb-1">
              {uploadingNames.map(n => (
                <li
                  key={n}
                  className="flex items-center gap-1.5 px-1.5 py-1"
                  style={{ color: 'var(--lx-text-subtle)' }}
                >
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span className="truncate">{n}</span>
                </li>
              ))}
            </ul>
          )}

          {!error && files && files.length === 0 && uploadingNames.length === 0 && (
            <div
              className="px-1.5 py-2 leading-relaxed"
              style={{ color: 'var(--lx-text-subtle)' }}
            >
              Empty. Drop files here or click{' '}
              <Upload className="inline w-3 h-3 -mt-0.5" /> to upload. Files live at{' '}
              <code
                className="px-1 rounded"
                style={{
                  background: 'var(--lx-surface-hover)',
                  color: 'var(--lx-text-muted)',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                kb/
              </code>{' '}
              inside this stack.
            </div>
          )}

          {files && files.length > 0 && (
            <ul className="space-y-px">
              {files.map(f => (
                <li
                  key={f.name}
                  className="group flex items-center gap-1.5 px-1.5 py-1 rounded-[6px] transition-colors"
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
                  {f.isDir ? (
                    <Folder className="w-3 h-3 flex-shrink-0" strokeWidth={1.75} />
                  ) : (
                    <FileText className="w-3 h-3 flex-shrink-0" strokeWidth={1.75} />
                  )}
                  <span className="truncate flex-1">{f.name}</span>
                  {!f.isDir && (
                    <span className="text-[9px] font-medium" style={{ color: 'var(--lx-text-faint)' }}>
                      {formatSize(f.size)}
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(f.name)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded"
                    style={{ color: 'var(--lx-text-subtle)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-danger)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {dragOver && (
            <div
              className="mt-2 text-center text-[10px] font-medium"
              style={{ color: 'var(--lx-accent-hover)' }}
            >
              Drop to upload
            </div>
          )}
        </div>
      )}
    </div>
  );
}
