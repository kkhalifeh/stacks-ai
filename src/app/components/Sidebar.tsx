import { useState } from 'react';
import {
  FileText, Download, Home, Mail, Users, Building2, BookOpen, CalendarDays,
  UserCheck, GraduationCap, FolderOpen, BrainCircuit, ChevronDown, ChevronRight,
  ChevronLeft, Lock, Unlock, DollarSign, Info, Paperclip, Pencil,
  Terminal as TerminalIcon,
} from 'lucide-react';
import type { LoadedStack, LoadedBinder } from '../stacks';
import { openTerminal, renameBinder, renameDocument } from '../api';
import { KbPanel } from './KbPanel';

interface SidebarProps {
  stack: LoadedStack;
  activeDocumentId: string;
  onDocumentChange: (id: string) => void;
  onExport: (binderId: string) => void;
  activePdf: string | null;
  onPdfPreview: (url: string | null) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  'info-1': Info,
  cover: Home,
  'tech-1': Mail,
  'tech-2': Users,
  'tech-2a': Building2,
  'tech-3': BookOpen,
  'tech-4': CalendarDays,
  'tech-5': UserCheck,
  'tech-6': GraduationCap,
  'fin-1': DollarSign,
  'fin-2': DollarSign,
  'doc-researcher': FolderOpen,
  'doc-forecasting': BrainCircuit,
  'doc-methodology': FileText,
  'doc-agreement': FileText,
};

function NavButton({ id, label, maxPages, pageCount, active, onClick, onRename }: {
  id: string;
  label: string;
  maxPages?: number;
  pageCount: number;
  active: boolean;
  onClick: () => void;
  onRename: () => void;
}) {
  const Icon = iconMap[id] ?? FileText;
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
          active ? 'text-white font-semibold' : 'text-white/60 hover:bg-white/5 hover:text-white'
        }`}
        style={active ? { background: 'var(--color-primary)' } : undefined}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-[11px] text-left flex-1 leading-tight">{label}</span>
        {(maxPages ?? pageCount) > 0 && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/40 flex-shrink-0">
            {pageCount}{maxPages ? `/${maxPages}` : ''}p
          </span>
        )}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onRename(); }}
        className="absolute top-1/2 -translate-y-1/2 right-8 p-1 rounded text-white/40 hover:text-white opacity-0 group-hover:opacity-100"
        title="Rename document"
      >
        <Pencil className="w-3 h-3" />
      </button>
    </div>
  );
}

function BinderSection({ binder, stackId, activeDocumentId, onDocumentChange, onExport, activePdf, onPdfPreview, defaultOpen }: {
  binder: LoadedBinder;
  stackId: string;
  activeDocumentId: string;
  onDocumentChange: (id: string) => void;
  onExport: (binderId: string) => void;
  activePdf: string | null;
  onPdfPreview: (url: string | null) => void;
  defaultOpen: boolean;
}) {
  const hasActive = binder.documents.some(d => d.id === activeDocumentId);
  const [expanded, setExpanded] = useState(hasActive || defaultOpen);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const color = binder.color ?? 'var(--color-primary)';
  const totalPages = binder.documents.reduce((sum, d) => sum + d.pages.length, 0);

  async function handleRenameBinder(e: React.MouseEvent) {
    e.stopPropagation();
    const next = window.prompt('Rename binder', binder.label);
    if (!next || next.trim() === binder.label) return;
    try {
      await renameBinder(stackId, binder.id, next.trim());
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rename failed');
    }
  }

  async function handleRenameDocument(docId: string, currentLabel: string) {
    const next = window.prompt('Rename document', currentLabel);
    if (!next || next.trim() === currentLabel) return;
    try {
      await renameDocument(stackId, binder.id, docId, next.trim());
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rename failed');
    }
  }

  return (
    <div className="mb-2">
      <div className="group relative">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: color }} />
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{binder.label}</span>
              {binder.passwordProtected ? (
                <Lock className="w-3 h-3 text-white/30" />
              ) : (
                <Unlock className="w-3 h-3 text-white/20" />
              )}
            </div>
            {binder.subtitle && <p className="text-[9px] text-white/35 leading-tight">{binder.subtitle}</p>}
          </div>
          <span className="text-[9px] text-white/25 mr-1">{totalPages}pg</span>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/30" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          )}
        </button>
        <button
          onClick={handleRenameBinder}
          className="absolute top-1/2 -translate-y-1/2 right-7 p-1 rounded text-white/40 hover:text-white opacity-0 group-hover:opacity-100"
          title="Rename binder"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>

      {expanded && (
        <div className="ml-3 pl-2 border-l border-white/8">
          <div className="space-y-0.5 py-1">
            {binder.documents.map(doc => (
              <NavButton
                key={doc.id}
                id={doc.id}
                label={doc.label}
                maxPages={doc.maxPages}
                pageCount={doc.pages.length}
                active={activeDocumentId === doc.id}
                onClick={() => onDocumentChange(doc.id)}
                onRename={() => handleRenameDocument(doc.id, doc.label)}
              />
            ))}
          </div>

          {binder.attachments && binder.attachments.length > 0 && (
            <div className="px-1 py-1.5">
              <p className="text-[9px] text-white/30 uppercase tracking-wider font-semibold px-2 mb-1">
                Attached Statements
              </p>
              <div className="space-y-0.5">
                {binder.attachments.map(att => (
                  <button
                    key={att.url}
                    onClick={() => onPdfPreview(activePdf === att.url ? null : att.url)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activePdf === att.url
                        ? 'text-white font-semibold'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                    style={activePdf === att.url ? { background: color } : undefined}
                  >
                    <Paperclip className="w-3 h-3 flex-shrink-0" />
                    <span className="text-[11px] text-left flex-1 leading-tight">{att.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {binder.passwordProtected && (
            <div className="px-2 py-2">
              <label className="text-[9px] text-white/30 uppercase tracking-wider font-semibold">
                PDF Password (optional)
              </label>
              <div className="flex gap-1 mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Set after export"
                  className="flex-1 text-[10px] px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white/70 placeholder:text-white/20 focus:outline-none focus:border-white/30"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[9px] px-1.5 py-1 rounded bg-white/5 text-white/40 hover:text-white/60"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          <div className="px-2 py-1.5">
            <button
              onClick={() => onExport(binder.id)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
              style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
            >
              <Download className="w-3 h-3" />
              Export {binder.label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ stack, activeDocumentId, onDocumentChange, onExport, activePdf, onPdfPreview, onBack }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-72 text-white p-5 overflow-y-auto flex flex-col print:hidden"
      style={{ background: 'var(--color-dark)' }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40 hover:text-white mb-3 -ml-1"
      >
        <ChevronLeft className="w-3 h-3" />
        All stacks
      </button>
      <div className="mb-4 flex items-center gap-3">
        {stack.logoUrl && <img src={stack.logoUrl} alt={stack.name} className="w-9 h-9" />}
        <div>
          <h1 className="text-sm font-semibold leading-tight">{stack.name}</h1>
          {stack.subtitle && <p className="text-[10px] text-white/40">{stack.subtitle}</p>}
        </div>
      </div>

      <button
        onClick={async () => {
          try { await openTerminal(stack.id); } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to open terminal');
          }
        }}
        className="mb-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-white/85 hover:text-white border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08] transition-colors"
      >
        <TerminalIcon className="w-3.5 h-3.5" />
        Open Claude in Terminal
      </button>

      <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <KbPanel stackId={stack.id} />

      <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <nav className="flex-1 space-y-1">
        {stack.binders.map(binder => (
          <BinderSection
            key={binder.id}
            binder={binder}
            stackId={stack.id}
            activeDocumentId={activeDocumentId}
            onDocumentChange={onDocumentChange}
            onExport={onExport}
            activePdf={activePdf}
            onPdfPreview={onPdfPreview}
            defaultOpen={binder.id === 'technical'}
          />
        ))}
      </nav>
    </aside>
  );
}
