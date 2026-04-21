import { useState } from 'react';
import { FileText, Download, Home, Mail, Users, Building2, BookOpen, CalendarDays, UserCheck, GraduationCap, FolderOpen, BrainCircuit, ChevronDown, ChevronRight, Lock, Unlock, DollarSign, Info, Paperclip } from 'lucide-react';
import { pages, stacks, infoAttachments } from '../App';
import type { PageId, GroupId } from '../App';
import kinzIcon from '@assets/KinzIcon.png';

interface SidebarProps {
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  onExport: (group: GroupId) => void;
  activePdf: string | null;
  onPdfPreview: (url: string | null) => void;
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

const stackColors: Record<GroupId, string> = {
  info: 'var(--color-kinz-orange)',
  technical: 'var(--color-kinz-blue)',
  financial: 'var(--color-kinz-green)',
  documents: 'var(--color-text-muted)',
};

function NavButton({ id, label, maxPages, activePage, onPageChange }: {
  id: string; label: string; maxPages?: number; activePage: string; onPageChange: (page: PageId) => void;
}) {
  const Icon = iconMap[id] ?? FileText;
  return (
    <button
      onClick={() => onPageChange(id as PageId)}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
        activePage === id
          ? 'text-white font-semibold'
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
      style={activePage === id ? { background: 'var(--color-primary)' } : undefined}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="text-[11px] text-left flex-1 leading-tight">{label}</span>
      {maxPages && (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/40 flex-shrink-0">
          {maxPages}p
        </span>
      )}
    </button>
  );
}

function StackSection({ stackId, activePage, onPageChange, onExport, activePdf, onPdfPreview }: {
  stackId: GroupId;
  activePage: PageId;
  onPageChange: (page: PageId) => void;
  onExport: (group: GroupId) => void;
  activePdf: string | null;
  onPdfPreview: (url: string | null) => void;
}) {
  const stack = stacks.find(s => s.id === stackId)!;
  const stackPages = pages.filter(p => p.group === stackId);
  const isActiveInStack = stackPages.some(p => p.id === activePage);
  const [expanded, setExpanded] = useState(isActiveInStack || stackId === 'technical');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const color = stackColors[stackId];
  const totalPages = stackPages.reduce((sum, p) => sum + p.pages.length, 0);

  return (
    <div className="mb-2">
      {/* Stack Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors group"
      >
        <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: color }} />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">{stack.label}</span>
            {stack.passwordProtected ? (
              <Lock className="w-3 h-3 text-white/30" />
            ) : (
              <Unlock className="w-3 h-3 text-white/20" />
            )}
          </div>
          <p className="text-[9px] text-white/35 leading-tight">{stack.subtitle}</p>
        </div>
        <span className="text-[9px] text-white/25 mr-1">{totalPages}pg</span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-white/30" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="ml-3 pl-2 border-l border-white/8">
          {/* Section nav buttons */}
          <div className="space-y-0.5 py-1">
            {stackPages.map(({ id, label, maxPages }) => (
              <NavButton key={id} id={id} label={label} maxPages={maxPages} activePage={activePage} onPageChange={onPageChange} />
            ))}
          </div>

          {/* PDF attachments (info stack only) */}
          {stackId === 'info' && infoAttachments.length > 0 && (
            <div className="px-1 py-1.5">
              <p className="text-[9px] text-white/30 uppercase tracking-wider font-semibold px-2 mb-1">
                Attached Statements
              </p>
              <div className="space-y-0.5">
                {infoAttachments.map(att => (
                  <button
                    key={att.url}
                    onClick={() => onPdfPreview(activePdf === att.url ? null : att.url)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activePdf === att.url
                        ? 'text-white font-semibold'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                    style={activePdf === att.url ? { background: 'var(--color-kinz-orange)' } : undefined}
                  >
                    <Paperclip className="w-3 h-3 flex-shrink-0" />
                    <span className="text-[11px] text-left flex-1 leading-tight">{att.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Password field (only for password-protected stacks) */}
          {stack.passwordProtected && (
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

          {/* Export button */}
          <div className="px-2 py-1.5">
            <button
              onClick={() => onExport(stackId)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
              style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}
            >
              <Download className="w-3 h-3" />
              Export {stack.label}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ activePage, onPageChange, onExport, activePdf, onPdfPreview }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-72 text-white p-5 overflow-y-auto flex flex-col print:hidden"
      style={{ background: 'var(--color-dark)' }}
    >
      {/* Logo */}
      <div className="mb-5 flex items-center gap-3">
        <img src={kinzIcon} alt="Kinz" className="w-9 h-9" />
        <div>
          <h1 className="text-sm font-semibold leading-tight">AI-GIS PoC</h1>
          <p className="text-[10px] text-white/40">Proposal Builder</p>
        </div>
      </div>
      <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Submission structure note */}
      <div className="rounded-lg p-2.5 mb-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <p className="text-[9px] leading-[1.5] text-white/30">
          <strong className="text-white/50">Submission:</strong> 3 separate PDFs.
          INFO-1 unprotected. Technical &amp; Financial each with a different password.
        </p>
      </div>

      {/* Stacks */}
      <nav className="flex-1 space-y-1">
        {stacks.map(stack => (
          <StackSection
            key={stack.id}
            stackId={stack.id}
            activePage={activePage}
            onPageChange={onPageChange}
            onExport={onExport}
            activePdf={activePdf}
            onPdfPreview={onPdfPreview}
          />
        ))}
      </nav>
    </aside>
  );
}
