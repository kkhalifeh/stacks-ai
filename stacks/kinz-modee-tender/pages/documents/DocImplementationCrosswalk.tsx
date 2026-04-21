import kinzIcon from '../../assets/KinzIcon.png';

/* ══════════════════════════════════════════════════════════════════
   INTERNAL: AI-GIS IMPLEMENTATION CROSSWALK
   Not part of the submitted tender bundle. Purpose: one-stop reference
   that maps every commitment made in the tender back to the actual
   build plan so we can switch between pitch language and engineering
   reality without drift.
   ════════════════════════════════════════════════════════════════════ */

const AccentStripe = () => (
  <div className="flex h-1.5 flex-shrink-0">
    <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
    <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
  </div>
);

const Footer = ({ page }: { page: number }) => (
  <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
    style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
    <span>Kinz for Information Technology &middot; Internal Document</span>
    <span>Implementation Crosswalk &middot; Page {page}</span>
  </div>
);

const Header = ({ subtitle }: { subtitle: string }) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={kinzIcon} alt="" className="w-7 h-7" />
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            AI-GIS Implementation Crosswalk
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Internal reference &middot; {subtitle}
          </p>
        </div>
      </div>
    </div>
    <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />
  </>
);

/* ══════════════════════════════════════════════════════════════════
   PAGE 1 — DOCUMENT MAP & HOW TO USE THIS
   ═══════════════════════════════════════════════════════════════ */

export function DocCrosswalkP1() {
  const docs = [
    { doc: 'TECH-1 Cover Letter', audience: 'JDS / MODEE', role: 'Formal offer + 3 declarations', file: 'Tech1CoverLetter.tsx' },
    { doc: 'TECH-2 Joint Team', audience: 'Evaluators (experience, 15 pts)', role: 'Proves joint academic+IT structure, focal point', file: 'Tech2JointTeam.tsx' },
    { doc: 'TECH-2a Company Experience', audience: 'Evaluators (experience, 15 pts)', role: '5 reference projects: Google, MASE, NCSCM, GIZ, Kinz platform', file: 'Tech2aCompanyExperience.tsx' },
    { doc: 'TECH-3 Methodology', audience: 'Evaluators (methodology, 50 pts)', role: 'Public methodology + 3 subsystems + work plan + TOR comments', file: 'Tech3Methodology.tsx' },
    { doc: 'TECH-4 Work Schedule', audience: 'Evaluators', role: 'Gantt of 20 activities, 6 phases, 6 milestones (M1–M6)', file: 'Tech4WorkSchedule.tsx' },
    { doc: 'TECH-5 Personnel Schedule', audience: 'Evaluators (staff, 35 pts)', role: 'Person-months per role across 6 months', file: 'Tech5Personnel.tsx' },
    { doc: 'TECH-6 CVs', audience: 'Evaluators (staff, 35 pts)', role: 'Individual CVs in RFP format', file: 'Tech6CVs.tsx' },
    { doc: 'FIN-1 + FIN-2', audience: 'MODEE finance', role: 'US$ 93,867 total; remuneration + reimbursables + 16% GST', file: 'FinProposal.tsx' },
    { doc: 'INFO-1', audience: 'MODEE admin', role: 'CCD #637 + 3 yrs audited financials (unprotected)', file: 'Info1CCD.tsx' },
    { doc: 'Researcher Brief', audience: 'Dr. Bushra (internal)', role: 'Role framing for academic partner meetings', file: 'DocResearcherBrief.tsx' },
    { doc: 'Forecasting Primer', audience: 'Khaled (internal)', role: 'Plain-language Prophet primer for non-CS audiences', file: 'DocForecastingPrimer.tsx' },
    { doc: 'Methodology Proposal', audience: 'Dr. Bushra (internal)', role: 'Formulas, weights, thresholds for validation', file: 'DocMethodologyProposal.tsx' },
    { doc: 'Academic Agreement', audience: 'Kinz ↔ Dr. Bushra', role: 'Scope, compensation, IP, timeline for partner engagement', file: 'DocAcademicAgreement.tsx' },
    { doc: 'Implementation Crosswalk', audience: 'Kinz internal (this doc)', role: 'Bridge tender language ↔ build plan. Start here in any working session.', file: 'DocImplementationCrosswalk.tsx' },
  ];

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <Header subtitle="Document map, purpose, and how to use" />

        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[13px] leading-[1.6]">
            <strong>Purpose.</strong> This document is the bridge between what we told MODEE we would build
            and what we actually build. Every commitment in the tender has a corresponding implementation
            line here. Use it to brief new team members, answer MODEE clarifications without contradicting
            the submitted text, and keep Dr. Bushra and the engineering team pulling the same direction.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Document Inventory</h3>
        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Doc</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Audience</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>What it contains</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {docs.map(d => (
                <tr key={d.doc} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-2 font-medium">{d.doc}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{d.audience}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{d.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>When to reach for which doc</h3>
        <ul className="text-[13px] leading-[1.7] list-disc ml-5 space-y-0.5" style={{ color: 'var(--color-text)' }}>
          <li><strong>Answering MODEE questions:</strong> TECH-3 (methodology), TECH-4 (schedule), FIN-2 (money). Never contradict these in a clarification email.</li>
          <li><strong>Briefing the engineering team:</strong> Pages 2–4 of this doc. Links each commitment to code/data.</li>
          <li><strong>Briefing Dr. Bushra:</strong> Methodology Proposal + Researcher Brief.</li>
          <li><strong>Explaining to non-technical stakeholders:</strong> Forecasting Primer.</li>
        </ul>

        <Footer page={1} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE 2 — THE THREE SUBSYSTEMS AT A GLANCE
   ═══════════════════════════════════════════════════════════════ */

export function DocCrosswalkP2() {
  const subsystems = [
    {
      letter: 'A',
      name: 'Data Integration',
      color: 'var(--color-kinz-orange)',
      owner: 'Abu Joudeh (lead) + Ghanayem + Data Officers (×4)',
      inputs: 'MoTA tourism data, hotel occupancy, visitor arrivals, infrastructure rosters, governorate shapefiles',
      outputs: 'Cleansed, geocoded, harmonized PostgreSQL + PostGIS schema',
      stack: 'PostgreSQL 15, PostGIS, Python ETL (pandas, geopandas), Airflow-lite scheduler',
      tender: 'TECH-3 P4–P5 (Subsystem A scope) &middot; TECH-4 Phase 1–2',
      reality: 'Weeks 1–2: MoTA data audit meeting, gap analysis, schema finalization. Weeks 3–8: iterative ETL with Data Officers doing manual geographic matching for legacy records.',
    },
    {
      letter: 'B',
      name: 'Analytics & Forecasting',
      color: 'var(--color-kinz-green)',
      owner: 'Al-Bzour (lead) + Dr. Bushra (methodology) + Khaled (approach)',
      inputs: 'Cleansed Subsystem A data + external shocks (seasonality, events)',
      outputs: 'Four indicators (OPI, GPI, CAI, Beds/1K), 12-month visitor forecasts, scenario simulations, investment priority scores',
      stack: 'Python (Prophet, scikit-learn), FastAPI for serving, pytest for back-testing',
      tender: 'TECH-3 P6–P8 (Subsystem B) &middot; Methodology Proposal P1–P3',
      reality: 'Month 2–3: indicator engine against synthetic data. Month 3–4: Prophet model training with Dr. Bushra validating hyperparameters. Month 4–5: simulation and scoring modules.',
    },
    {
      letter: 'C',
      name: 'GIS Dashboard',
      color: 'var(--color-kinz-blue)',
      owner: 'Sarwar (lead) + Al-Bzour (API contract)',
      inputs: 'Subsystem B outputs via FastAPI + governorate boundaries',
      outputs: 'Three dashboards: national overview, regional deep-dive, investment explorer. CSV export on every table. Map snapshots. PDF summary.',
      stack: 'React + TypeScript, MapLibre GL JS (or Leaflet), Plotly.js / ECharts, Docker',
      tender: 'TECH-3 P9 (Subsystem C) &middot; Q&A answer: CSV export mandatory',
      reality: 'Month 3: early prototype for stakeholder feedback (reduces late-stage rework risk). Month 4–5: full dashboard. Month 5: UAT with MoTA.',
    },
  ];

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Three Subsystems at a Glance</h3>

        <p className="text-[13px] leading-[1.6] mb-4" style={{ color: 'var(--color-text)' }}>
          The PoC decomposes into three loosely-coupled subsystems. Each can be scaffolded in parallel
          against synthetic data; the real integration happens after Subsystem A produces clean data in
          Month 2. This is the critical path.
        </p>

        <div className="space-y-3">
          {subsystems.map(s => (
            <div key={s.letter} className="rounded-lg border-l-4 p-3"
              style={{ borderColor: s.color, background: 'var(--color-light-bg)' }}>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-base font-bold" style={{ color: s.color }}>Subsystem {s.letter}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{s.name}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-0.5 text-[11px]" style={{ color: 'var(--color-text)' }}>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Owner</div><div>{s.owner}</div>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Inputs</div><div>{s.inputs}</div>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Outputs</div><div>{s.outputs}</div>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Stack</div><div>{s.stack}</div>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Tender ref</div><div style={{ color: 'var(--color-text-muted)' }}>{s.tender}</div>
                <div className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Build plan</div><div>{s.reality}</div>
              </div>
            </div>
          ))}
        </div>

        <Footer page={2} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE 3 — METHODOLOGY COMMITMENTS CROSSWALK
   ═══════════════════════════════════════════════════════════════ */

export function DocCrosswalkP3() {
  const indicators = [
    { name: 'Beds per 1,000 visitors', formula: '(total_beds / annual_visitors) × 1000', thresholds: 'Reported as-is, no bands', tender: 'TECH-3 P7' },
    { name: 'Occupancy Pressure (OPI)', formula: '0.6 × (peak_3mo_avg / 100) + 0.4 × (annual_avg / 100)', thresholds: '>0.85 High · 0.6–0.85 Mod · <0.6 Low', tender: 'TECH-3 P7' },
    { name: 'Growth Pressure (GPI)', formula: '(visitors_Y / visitors_Y-3)^(1/3) − 1', thresholds: '>10% High · 0–10% Mod · <0 Declining', tender: 'TECH-3 P7' },
    { name: 'Capacity Adequacy (CAI)', formula: 'total_beds / (peak_mo_visitors × avg_stay)', thresholds: '<0.8 Under · 0.8–1.2 Balanced · >1.2 Over', tender: 'TECH-3 P7' },
  ];

  const commitments = [
    { what: 'Prophet forecasting for 12-month visitor demand', where: 'TECH-3 P8', how: 'Facebook Prophet with Jordan-specific holiday regressors, seasonality auto-detected, back-tested on 2018–2023 data' },
    { what: 'Configurable thresholds (MoTA can adjust)', where: 'Methodology Proposal P1', how: 'Dashboard settings panel writes to a `thresholds` table; indicator engine reads at query time' },
    { what: 'Investment scoring algorithm', where: 'TECH-3 P8 + Methodology P2', how: 'Weighted composite of CAI, GPI, and accessibility score; weights exposed in settings' },
    { what: 'Scenario simulation', where: 'TECH-3 P9', how: 'Pure-function simulator in Python; user changes sliders (e.g. +500 beds in Aqaba) → recomputes indicators for that governorate' },
    { what: 'CSV export from every table', where: 'TECH-4 P2 + Q&A answer', how: 'Dashboard export button on every chart/table; FastAPI endpoint returns RFC-4180 CSV' },
    { what: 'Partial payments up to 4 tied to milestones', where: 'TECH-3 TOR Comments', how: 'M1 kickoff (10%), M3 prototype (30%), M5 UAT (40%), M6 handover (20%) — finalize with JDS during contract negotiation' },
    { what: 'Deployment at MoDEE data center', where: 'TECH-3 P9 + P11', how: 'Docker containers, one-command migration script, `docker-compose.prod.yml`' },
    { what: 'Female participation (2 women: Dr. Bushra + Ms. Ghanayem)', where: 'TECH-5 P2', how: 'No action needed — fact of the team' },
  ];

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Methodology Commitments</h3>

        <p className="text-[13px] leading-[1.6] mb-3" style={{ color: 'var(--color-text)' }}>
          Everything we committed to in TECH-3 mapped to how we actually implement it. If a clarification
          or scope discussion ever contradicts a row here, pause and re-read the tender language first.
        </p>

        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Four Core Indicators</h4>
        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Indicator</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Formula</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Thresholds</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Ref</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {indicators.map(i => (
                <tr key={i.name} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-2 font-medium">{i.name}</td>
                  <td className="py-1 px-2 font-mono text-[9px]" style={{ color: 'var(--color-primary)' }}>{i.formula}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{i.thresholds}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{i.tender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>All Other Commitments</h4>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Commitment</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Tender ref</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Implementation</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {commitments.map(c => (
                <tr key={c.what} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-2 font-medium">{c.what}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{c.where}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{c.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer page={3} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE 4 — TIMELINE, DEPENDENCIES, OPEN QUESTIONS
   ═══════════════════════════════════════════════════════════════ */

export function DocCrosswalkP4() {
  const milestones = [
    { m: 'M1', label: 'Kick-off & Data Assessment', deliverable: 'Kick-off minutes, MoTA data audit, schema v1', payment: '10%' },
    { m: 'M2', label: 'Data Integration complete', deliverable: 'PostgreSQL + PostGIS loaded, ETL pipeline reproducible', payment: '—' },
    { m: 'M3', label: 'Analytics prototype + dashboard scaffold', deliverable: 'Indicator engine, early dashboard for stakeholder review', payment: '30%' },
    { m: 'M4', label: 'Analytics engine complete; dashboard alpha', deliverable: 'Forecasting models back-tested (MAPE/MAE/RMSE), scenario simulator, investment priority scoring, dashboard alpha', payment: '—' },
    { m: 'M5', label: 'Integration, testing, UAT', deliverable: 'End-to-end system, UAT sign-off', payment: '40%' },
    { m: 'M6', label: 'Deployment & handover', deliverable: 'Running at MoDEE data center, training delivered, final report', payment: '20%' },
  ];

  const openQs = [
    'Confirm OPI weights (0.6 peak / 0.4 annual) with Dr. Bushra before kickoff — whose call? Ours per TECH-3 but flagged in Methodology Proposal.',
    'Confirm GPI window (3-year vs 5-year CAGR). Current choice: 3-year for responsiveness; 5-year smooths COVID.',
    '"Peak 3 months" convention: consecutive or non-consecutive? Pick one before M2 indicator build.',
    'MoTA data format unknowns: are occupancy figures monthly or quarterly? If quarterly, Data Officers need to interpolate — affects Data Officer workload estimate (5 PM pool).',
    'Is the MoDEE data center ready for Docker containers, or do we need additional DevOps coordination in Phase 6?',
    'Clarify with JDS: exact payment triggers for the 4 partial payments. Use M1/M3/M5/M6 proposal above as starting point.',
    'Academic Agreement with Dr. Bushra: signed copy on file? Scope match with TECH-5 (2.5 PM at $6,768/mo = $16,920)?',
  ];

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Milestones, Payments, and the Path Ahead</h3>

        <p className="text-[13px] leading-[1.6] mb-3" style={{ color: 'var(--color-text)' }}>
          The 6-month PoC has five payment-bearing milestones (partial payments up to 4 allowed under
          Q&amp;A, so M1+M3+M5+M6 = 4 is the proposed split). Use this page to track progress and to
          frame payment conversations with JDS.
        </p>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-[11px]">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-2 font-semibold w-10" style={{ color: 'var(--color-text)' }}>Mo</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Milestone</th>
                <th className="text-left py-1.5 px-2 font-semibold" style={{ color: 'var(--color-text)' }}>Deliverable</th>
                <th className="text-right py-1.5 px-2 font-semibold w-14" style={{ color: 'var(--color-text)' }}>Pay</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {milestones.map(m => (
                <tr key={m.m} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-2 font-semibold" style={{ color: 'var(--color-primary)' }}>{m.m}</td>
                  <td className="py-1 px-2 font-medium">{m.label}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{m.deliverable}</td>
                  <td className="py-1 px-2 text-right font-semibold">{m.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Open Questions to Resolve Before Kickoff</h4>
        <ol className="text-[12px] leading-[1.6] list-decimal ml-5 space-y-1 mb-4" style={{ color: 'var(--color-text)' }}>
          {openQs.map((q, i) => <li key={i}>{q}</li>)}
        </ol>

        <div className="rounded-lg p-3" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[12px] leading-[1.6]">
            <strong>Rule of thumb.</strong> If a stakeholder asks a question that could be answered by the
            tender documents, answer from the tender. If it is not covered, bring it here. If it is not
            covered here either, flag it as an open decision rather than improvising on the spot. The
            tender is our binding contract; this crosswalk is our operational truth.
          </p>
        </div>

        <Footer page={4} />
      </div>
    </div>
  );
}
