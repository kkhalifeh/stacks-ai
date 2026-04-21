import { useState } from 'react';
import {
  FileText, Download, Home, Mail, Users, Building2, BookOpen, CalendarDays,
  UserCheck, GraduationCap, FolderOpen, BrainCircuit, ChevronDown, ChevronRight,
  ChevronLeft, Lock, Unlock, DollarSign, Info, Paperclip, Pencil,
  Sparkles, Terminal as TerminalIcon,
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
  onOpenBrand: () => void;
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
        className="w-full flex items-center gap-2.5 px-3 py-[7px] rounded-[8px] transition-colors"
        style={
          active
            ? { background: 'var(--lx-accent-soft)', color: 'var(--lx-text)' }
            : { color: 'var(--lx-text-muted)' }
        }
        onMouseEnter={e => {
          if (!active) {
            e.currentTarget.style.background = 'var(--lx-surface-hover)';
            e.currentTarget.style.color = 'var(--lx-text)';
          }
        }}
        onMouseLeave={e => {
          if (!active) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--lx-text-muted)';
          }
        }}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
        <span
          className="text-[12px] text-left flex-1 leading-tight tracking-tight"
          style={{ fontWeight: active ? 500 : 400 }}
        >
          {label}
        </span>
        {(maxPages ?? pageCount) > 0 && (
          <span
            className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 font-medium"
            style={{
              background: active ? 'rgba(255,255,255,0.08)' : 'var(--lx-surface-hover)',
              color: 'var(--lx-text-subtle)',
            }}
          >
            {pageCount}{maxPages ? `/${maxPages}` : ''}p
          </span>
        )}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onRename(); }}
        className="absolute top-1/2 -translate-y-1/2 right-8 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: 'var(--lx-text-subtle)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
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
  const color = binder.color ?? 'var(--lx-accent)';
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
    <div className="mb-1">
      <div className="group relative">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-[8px] transition-colors"
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--lx-surface-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="w-[3px] h-7 rounded-full flex-shrink-0" style={{ background: color }} />
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className="text-[12px] font-semibold tracking-tight truncate"
                style={{ color: 'var(--lx-text)' }}
              >
                {binder.label}
              </span>
              {binder.passwordProtected ? (
                <Lock className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--lx-text-faint)' }} />
              ) : (
                <Unlock className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--lx-text-faint)' }} />
              )}
            </div>
            {binder.subtitle && (
              <p
                className="text-[10px] leading-tight mt-0.5 truncate"
                style={{ color: 'var(--lx-text-subtle)' }}
              >
                {binder.subtitle}
              </p>
            )}
          </div>
          <span className="text-[9px] mr-1 font-medium" style={{ color: 'var(--lx-text-faint)' }}>
            {totalPages}pg
          </span>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--lx-text-subtle)' }} />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--lx-text-subtle)' }} />
          )}
        </button>
        <button
          onClick={handleRenameBinder}
          className="absolute top-1/2 -translate-y-1/2 right-7 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--lx-text-subtle)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
          title="Rename binder"
        >
          <Pencil className="w-3 h-3" />
        </button>
      </div>

      {expanded && (
        <div className="ml-3 pl-2" style={{ borderLeft: '1px solid var(--lx-divider)' }}>
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
              <p
                className="text-[9px] uppercase tracking-[0.08em] font-semibold px-2 mb-1"
                style={{ color: 'var(--lx-text-faint)' }}
              >
                Attached Statements
              </p>
              <div className="space-y-0.5">
                {binder.attachments.map(att => {
                  const isActive = activePdf === att.url;
                  return (
                    <button
                      key={att.url}
                      onClick={() => onPdfPreview(isActive ? null : att.url)}
                      className="w-full flex items-center gap-2 px-3 py-[7px] rounded-[8px] transition-colors"
                      style={
                        isActive
                          ? { background: 'var(--lx-accent-soft)', color: 'var(--lx-text)' }
                          : { color: 'var(--lx-text-muted)' }
                      }
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'var(--lx-surface-hover)';
                          e.currentTarget.style.color = 'var(--lx-text)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--lx-text-muted)';
                        }
                      }}
                    >
                      <Paperclip className="w-3 h-3 flex-shrink-0" />
                      <span
                        className="text-[12px] text-left flex-1 leading-tight tracking-tight"
                        style={{ fontWeight: isActive ? 500 : 400 }}
                      >
                        {att.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {binder.passwordProtected && (
            <div className="px-2 py-2">
              <label
                className="text-[9px] uppercase tracking-[0.08em] font-semibold"
                style={{ color: 'var(--lx-text-faint)' }}
              >
                PDF Password (optional)
              </label>
              <div className="flex gap-1 mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Set after export"
                  className="lx-focus flex-1 text-[11px] px-2 py-1.5"
                  style={{
                    background: 'var(--lx-surface)',
                    border: '1px solid var(--lx-border)',
                    borderRadius: 'var(--lx-radius-sm)',
                    color: 'var(--lx-text)',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] px-2 py-1 rounded transition-colors font-medium"
                  style={{
                    background: 'var(--lx-surface)',
                    color: 'var(--lx-text-subtle)',
                    border: '1px solid var(--lx-border)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}

          <div className="px-2 py-1.5">
            <button
              onClick={() => onExport(binder.id)}
              className="lx-focus w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[10px] text-[11px] font-medium transition-colors"
              style={{
                background: 'var(--lx-surface)',
                border: '1px solid var(--lx-border)',
                color: 'var(--lx-text-muted)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--lx-surface-hover)';
                e.currentTarget.style.borderColor = 'var(--lx-border-strong)';
                e.currentTarget.style.color = 'var(--lx-text)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--lx-surface)';
                e.currentTarget.style.borderColor = 'var(--lx-border)';
                e.currentTarget.style.color = 'var(--lx-text-muted)';
              }}
            >
              <Download className="w-3 h-3" strokeWidth={2} />
              Export {binder.label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ stack, activeDocumentId, onDocumentChange, onExport, activePdf, onPdfPreview, onBack, onOpenBrand }: SidebarProps) {
  return (
    <aside
      className="lx-scroll fixed left-0 top-0 h-screen w-72 px-4 py-5 overflow-y-auto flex flex-col print:hidden"
      style={{
        background: 'var(--lx-surface)',
        borderRight: '1px solid var(--lx-border)',
        color: 'var(--lx-text)',
      }}
    >
      <button
        onClick={onBack}
        className="lx-focus flex items-center gap-1 text-[11px] mb-4 -ml-1 px-1.5 py-1 rounded transition-colors w-fit"
        style={{ color: 'var(--lx-text-subtle)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--lx-text)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--lx-text-subtle)')}
      >
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
        All stacks
      </button>
      <div className="mb-5 flex items-center gap-3 px-1">
        {stack.logoUrl && <img src={stack.logoUrl} alt={stack.name} className="w-9 h-9 rounded" />}
        <div className="min-w-0">
          <h1
            className="text-[13px] font-semibold leading-tight truncate tracking-tight"
            style={{ color: 'var(--lx-text)' }}
          >
            {stack.name}
          </h1>
          {stack.subtitle && (
            <p
              className="text-[11px] leading-tight mt-0.5 truncate"
              style={{ color: 'var(--lx-text-subtle)' }}
            >
              {stack.subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={async () => {
          try { await openTerminal(stack.id); } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to open terminal');
          }
        }}
        className="lx-focus mb-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-[12px] font-medium transition-colors"
        style={{
          background: 'var(--lx-surface-2)',
          border: '1px solid var(--lx-border)',
          color: 'var(--lx-text-muted)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--lx-surface-hover)';
          e.currentTarget.style.borderColor = 'var(--lx-border-strong)';
          e.currentTarget.style.color = 'var(--lx-text)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--lx-surface-2)';
          e.currentTarget.style.borderColor = 'var(--lx-border)';
          e.currentTarget.style.color = 'var(--lx-text-muted)';
        }}
      >
        <TerminalIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
        Open Claude in Terminal
      </button>

      <button
        onClick={onOpenBrand}
        className="lx-focus mb-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-[12px] font-medium transition-colors"
        style={{
          background: 'var(--lx-surface-2)',
          border: '1px solid var(--lx-border)',
          color: 'var(--lx-text)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--lx-surface-hover)';
          e.currentTarget.style.borderColor = 'var(--lx-border-strong)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--lx-surface-2)';
          e.currentTarget.style.borderColor = 'var(--lx-border)';
        }}
      >
        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'var(--lx-accent)' }} />
        Brand Studio
      </button>

      <div className="h-px mb-3" style={{ background: 'var(--lx-divider)' }} />

      <KbPanel stackId={stack.id} />

      <div className="h-px mb-3" style={{ background: 'var(--lx-divider)' }} />

      <nav className="flex-1 space-y-0.5">
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
