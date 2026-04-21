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
        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-left"
      >
        {expanded ? <ChevronDown className="w-3 h-3 text-white/40" /> : <ChevronRight className="w-3 h-3 text-white/40" />}
        <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40 flex-1">
          Knowledge base
        </span>
        {files && (
          <span className="text-[9px] text-white/30">{files.length}</span>
        )}
        {expanded && (
          <>
            <span
              onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="text-white/30 hover:text-white/60 cursor-pointer"
              title="Upload"
            >
              <Upload className="w-3 h-3" />
            </span>
            <span
              onClick={e => { e.stopPropagation(); load(); }}
              className="text-white/30 hover:text-white/60 cursor-pointer"
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
        <div className={`px-2 pt-1 pb-2 text-[11px] rounded transition-colors ${dragOver ? 'bg-blue-500/10 ring-1 ring-blue-400/40' : ''}`}>
          {error && (
            <div className="text-red-300/80 px-1.5 py-1 whitespace-pre-wrap">{error}</div>
          )}

          {uploadingNames.length > 0 && (
            <ul className="mb-1">
              {uploadingNames.map(n => (
                <li key={n} className="flex items-center gap-1.5 px-1.5 py-1 text-white/50">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span className="truncate">{n}</span>
                </li>
              ))}
            </ul>
          )}

          {!error && files && files.length === 0 && uploadingNames.length === 0 && (
            <div className="text-white/30 px-1.5 py-2 leading-relaxed">
              Empty. Drop files here or click <Upload className="inline w-3 h-3 -mt-0.5" /> to upload.
              Files live at <code className="text-white/45">kb/</code> inside this stack.
            </div>
          )}

          {files && files.length > 0 && (
            <ul className="space-y-0.5">
              {files.map(f => (
                <li
                  key={f.name}
                  className="group flex items-center gap-1.5 px-1.5 py-1 rounded text-white/60 hover:bg-white/5 hover:text-white/85"
                >
                  {f.isDir ? <Folder className="w-3 h-3 flex-shrink-0" /> : <FileText className="w-3 h-3 flex-shrink-0" />}
                  <span className="truncate flex-1">{f.name}</span>
                  {!f.isDir && <span className="text-[9px] text-white/25">{formatSize(f.size)}</span>}
                  <button
                    onClick={() => handleDelete(f.name)}
                    className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {dragOver && (
            <div className="mt-2 text-center text-[10px] text-blue-300">Drop to upload</div>
          )}
        </div>
      )}
    </div>
  );
}
