import { useState, useCallback } from 'react';
import { exportInfo1Merged } from './exportInfo1';
import { Sidebar } from './components/Sidebar';
import { CoverPage } from './components/pages/CoverPage';
import { Tech1CoverLetter } from './components/pages/Tech1CoverLetter';
import { Tech2JointTeam, Tech2JointTeamP2, Tech2JointTeamP3 } from './components/pages/Tech2JointTeam';
import { Tech2aCompanyExperience, Tech2aCompanyExperienceP2, Tech2aCompanyExperienceP3, Tech2aCompanyExperienceP4, Tech2aCompanyExperienceP5 } from './components/pages/Tech2aCompanyExperience';
import { Tech3Methodology, Tech3P2, Tech3P3, Tech3P4, Tech3P5, Tech3P6, Tech3P7, Tech3P8, Tech3P8b, Tech3P9, Tech3P10, Tech3P11, Tech3P12, Tech3P13 } from './components/pages/Tech3Methodology';
import { Tech4WorkSchedule, Tech4WorkScheduleP2, Tech4WorkScheduleP3 } from './components/pages/Tech4WorkSchedule';
import { Tech5Personnel, Tech5PersonnelP2 } from './components/pages/Tech5Personnel';
import { Tech6CV_Bushra_P1, Tech6CV_Bushra_P2, Tech6CV_Khaled, Tech6CV_AbuJoudeh_P1, Tech6CV_AbuJoudeh_P2, Tech6CV_AlBzour, Tech6CV_Duha, Tech6CV_Osama } from './components/pages/Tech6CVs';
import { DocResearcherBrief } from './components/pages/DocResearcherBrief';
import { DocForecastingPrimerP1, DocForecastingPrimerP2, DocForecastingPrimerP3, DocForecastingPrimerP4, DocForecastingPrimerP5, DocForecastingPrimerP6, DocForecastingPrimerP7 } from './components/pages/DocForecastingPrimer';
import { DocMethodologyProposalP1, DocMethodologyProposalP2, DocMethodologyProposalP3, DocMethodologyProposalP4 } from './components/pages/DocMethodologyProposal';
import { DocAcademicAgreementP1, DocAcademicAgreementP2, DocAcademicAgreementP3 } from './components/pages/DocAcademicAgreement';
import { DocCrosswalkP1, DocCrosswalkP2, DocCrosswalkP3, DocCrosswalkP4 } from './components/pages/DocImplementationCrosswalk';
import { Info1CCD } from './components/pages/Info1CCD';

// ─── TYPES ──────────────────────────────────────────────

export type GroupId = 'info' | 'technical' | 'financial' | 'documents';

export type SectionId =
  | 'info-1'
  | 'cover' | 'tech-1' | 'tech-2' | 'tech-2a' | 'tech-3' | 'tech-4' | 'tech-5' | 'tech-6'
  | 'fin-1' | 'fin-2'
  | 'doc-researcher' | 'doc-forecasting' | 'doc-methodology' | 'doc-agreement' | 'doc-crosswalk';

export type PageId = SectionId;

export interface PageEntry {
  id: SectionId;
  label: string;
  pages: React.FC[];
  maxPages?: number;
  group: GroupId;
}

export interface StackDef {
  id: GroupId;
  label: string;
  subtitle: string;
  passwordProtected: boolean;
}

// ─── STACKS ──────────────────────────────────────────────

export const stacks: StackDef[] = [
  { id: 'info', label: 'INFO-1', subtitle: 'CCD & Financial Statements', passwordProtected: false },
  { id: 'technical', label: 'Technical Proposal', subtitle: 'TECH-1 through TECH-6', passwordProtected: true },
  { id: 'financial', label: 'Financial Proposal', subtitle: 'FIN-1 & FIN-2', passwordProtected: true },
  { id: 'documents', label: 'Internal Documents', subtitle: 'Not included in submission', passwordProtected: false },
];

// ─── PAGES ──────────────────────────────────────────────

import { Fin1Submission, Fin2Breakdown } from './components/pages/FinProposal';

export const pages: PageEntry[] = [
  // ── INFO-1 (1st PDF — unprotected) ──
  { id: 'info-1', label: 'INFO-1: CCD & Financials', pages: [Info1CCD], group: 'info' },

  // ── Technical Proposal (2nd PDF — password protected) ──
  { id: 'cover', label: 'Cover', pages: [CoverPage], group: 'technical' },
  { id: 'tech-1', label: 'TECH-1: Cover Letter', pages: [Tech1CoverLetter], maxPages: 1, group: 'technical' },
  { id: 'tech-2', label: 'TECH-2: Joint Team', pages: [Tech2JointTeam, Tech2JointTeamP2, Tech2JointTeamP3], maxPages: 5, group: 'technical' },
  { id: 'tech-2a', label: 'TECH-2a: Company Experience', pages: [Tech2aCompanyExperience, Tech2aCompanyExperienceP2, Tech2aCompanyExperienceP3, Tech2aCompanyExperienceP4, Tech2aCompanyExperienceP5], maxPages: 5, group: 'technical' },
  { id: 'tech-3', label: 'TECH-3: Methodology', pages: [Tech3Methodology, Tech3P2, Tech3P3, Tech3P4, Tech3P5, Tech3P6, Tech3P7, Tech3P8, Tech3P8b, Tech3P9, Tech3P10, Tech3P11, Tech3P12, Tech3P13], maxPages: 15, group: 'technical' },
  { id: 'tech-4', label: 'TECH-4: Work Schedule', pages: [Tech4WorkSchedule, Tech4WorkScheduleP2, Tech4WorkScheduleP3], maxPages: 3, group: 'technical' },
  { id: 'tech-5', label: 'TECH-5: Personnel', pages: [Tech5Personnel, Tech5PersonnelP2], maxPages: 3, group: 'technical' },
  { id: 'tech-6', label: 'TECH-6: CVs', pages: [Tech6CV_Bushra_P1, Tech6CV_Bushra_P2, Tech6CV_Khaled, Tech6CV_AbuJoudeh_P1, Tech6CV_AbuJoudeh_P2, Tech6CV_AlBzour, Tech6CV_Duha, Tech6CV_Osama], maxPages: 10, group: 'technical' },

  // ── Financial Proposal (3rd PDF — different password) ──
  { id: 'fin-1', label: 'FIN-1: Financial Proposal', pages: [Fin1Submission], group: 'financial' },
  { id: 'fin-2', label: 'FIN-2: Price Breakdown', pages: [Fin2Breakdown], group: 'financial' },

  // ── Internal Documents (NOT submitted) ──
  { id: 'doc-researcher', label: 'Researcher Brief', pages: [DocResearcherBrief], group: 'documents' },
  { id: 'doc-forecasting', label: 'Forecasting Primer', pages: [DocForecastingPrimerP1, DocForecastingPrimerP2, DocForecastingPrimerP3, DocForecastingPrimerP4, DocForecastingPrimerP5, DocForecastingPrimerP6, DocForecastingPrimerP7], group: 'documents' },
  { id: 'doc-methodology', label: 'Methodology for Dr. Bushra', pages: [DocMethodologyProposalP1, DocMethodologyProposalP2, DocMethodologyProposalP3, DocMethodologyProposalP4], group: 'documents' },
  { id: 'doc-agreement', label: 'Academic Agreement', pages: [DocAcademicAgreementP1, DocAcademicAgreementP2, DocAcademicAgreementP3], group: 'documents' },
  { id: 'doc-crosswalk', label: 'Implementation Crosswalk', pages: [DocCrosswalkP1, DocCrosswalkP2, DocCrosswalkP3, DocCrosswalkP4], group: 'documents' },
];

// ─── APP SHELL ──────────────────────────────────────────────

// ─── PDF ATTACHMENTS (for INFO-1) ──────────────────────
export interface PdfAttachment {
  label: string;
  url: string;
}

export const infoAttachments: PdfAttachment[] = [
  { label: 'FY 2022 Financials', url: '/financials/fs-2022.pdf' },
  { label: 'FY 2023 Financials', url: '/financials/fs-2023.pdf' },
  { label: 'FY 2024 Financials', url: '/financials/fs-2024.pdf' },
];

export default function App() {
  const [activePage, setActivePage] = useState<SectionId>('cover');
  const [printGroup, setPrintGroup] = useState<GroupId>('technical');
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const handleExport = useCallback(async (group: GroupId) => {
    if (group === 'info') {
      // Ensure INFO-1 page is rendered in the DOM before capturing
      setActivePage('info-1');
      setActivePdf(null);
      // Wait for React to render
      await new Promise(r => setTimeout(r, 300));
      await exportInfo1Merged();
      return;
    }
    setPrintGroup(group);
    setTimeout(() => window.print(), 50);
  }, []);

  const handlePageChange = useCallback((page: SectionId) => {
    setActivePage(page);
    setActivePdf(null);
  }, []);

  const activeSection = pages.find(p => p.id === activePage);
  const activePages = activeSection?.pages ?? [CoverPage];

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--color-light-bg)' }}>
      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        onExport={handleExport}
        activePdf={activePdf}
        onPdfPreview={setActivePdf}
      />

      {/* Screen view: pages or PDF preview */}
      <main className="flex-1 ml-72 p-8 overflow-y-auto print:hidden" style={{ background: 'var(--color-dark-surface)' }}>
        {activePdf ? (
          <div className="flex flex-col items-center py-4 h-full">
            <iframe
              src={activePdf}
              className="w-full max-w-[900px] rounded-lg shadow-2xl"
              style={{ height: 'calc(100vh - 80px)', border: 'none' }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 py-8">
            {activePages.map((PageComponent, i) => (
              <div
                key={i}
                className="w-[794px] min-h-[1123px] bg-white shadow-2xl"
                {...(activeSection?.group === 'info' ? { 'data-info-page': '' } : {})}
              >
                <PageComponent />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Print view: renders whichever group was selected */}
      <div className="hidden print:block">
        {pages
          .filter(s => s.group === printGroup)
          .flatMap(({ id, pages: sectionPages }) =>
            sectionPages.map((PageComponent, i) => (
              <div key={`${id}-${i}`} className="print-page">
                <PageComponent />
              </div>
            ))
          )}
      </div>
    </div>
  );
}
