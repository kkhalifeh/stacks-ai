import kinzIcon from '../../assets/KinzIcon.png';

/* ── Gantt bar helper ── */
type BarSpan = [start: number, end: number]; // 1-based month indices

interface Activity {
  num: string;
  label: string;
  span: BarSpan;
  color: string;
  isPhaseHeader?: boolean;
  isMilestone?: boolean;
}

const MONTHS = [1, 2, 3, 4, 5, 6] as const;

function GanttRow({ act, borderColor }: { act: Activity; borderColor: string }) {
  if (act.isPhaseHeader) {
    return (
      <tr style={{ background: 'var(--color-light-bg)' }}>
        <td className="py-1.5 px-2 font-bold" style={{ color: act.color }}>{act.num}</td>
        <td className="py-1.5 px-2 font-bold" colSpan={7} style={{ color: act.color }}>{act.label}</td>
      </tr>
    );
  }

  return (
    <tr className="border-t" style={{ borderColor }}>
      <td className="py-[5px] px-2 text-center w-10 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{act.num}</td>
      <td className="py-[5px] px-2 text-[10px]" style={{ color: 'var(--color-text)' }}>{act.label}</td>
      {MONTHS.map(m => {
        const inRange = m >= act.span[0] && m <= act.span[1];
        if (act.isMilestone && inRange) {
          return (
            <td key={m} className="py-[5px] px-0.5 w-[62px]">
              <div className="mx-auto w-full h-5 flex items-center justify-center">
                <div className="w-3 h-3 rotate-45" style={{ background: act.color }} />
              </div>
            </td>
          );
        }
        return (
          <td key={m} className="py-[5px] px-0.5 w-[62px]">
            {inRange ? (
              <div className="mx-auto w-full h-5 rounded-sm" style={{ background: act.color, opacity: 0.85 }} />
            ) : null}
          </td>
        );
      })}
    </tr>
  );
}

/* ── ACTIVITY DATA ── */
const activities: Activity[] = [
  // Phase 1
  { num: '', label: 'Phase 1: Kick-off & Data Assessment', span: [1, 1], color: 'var(--color-kinz-red)', isPhaseHeader: true },
  { num: '1.1', label: 'Project kick-off & data confirmation with MoTA', span: [1, 1], color: 'var(--color-kinz-red)' },
  { num: '1.2', label: 'Data quality assessment & gap analysis', span: [1, 1], color: 'var(--color-kinz-red)' },
  { num: '1.3', label: 'Database schema design & finalization', span: [1, 1], color: 'var(--color-kinz-red)' },

  // Phase 2
  { num: '', label: 'Phase 2: Data Integration (Subsystem A)', span: [1, 2], color: 'var(--color-kinz-orange)', isPhaseHeader: true },
  { num: '2.1', label: 'ETL pipeline development', span: [1, 2], color: 'var(--color-kinz-orange)' },
  { num: '2.2', label: 'Data cleansing, harmonization & normalization', span: [1, 2], color: 'var(--color-kinz-orange)' },
  { num: '2.3', label: 'PostgreSQL/PostGIS loading & geographic validation', span: [2, 2], color: 'var(--color-kinz-orange)' },

  // Phase 3
  { num: '', label: 'Phase 3: Analytics & Forecasting (Subsystem B)', span: [2, 4], color: 'var(--color-kinz-green)', isPhaseHeader: true },
  { num: '3.1', label: 'Indicator computation engine (OPI, GPI, CAI)', span: [2, 3], color: 'var(--color-kinz-green)' },
  { num: '3.2', label: 'Prophet forecasting model training & back-testing', span: [2, 4], color: 'var(--color-kinz-green)' },
  { num: '3.3', label: 'Scenario simulation module', span: [3, 4], color: 'var(--color-kinz-green)' },
  { num: '3.4', label: 'Investment priority scoring engine', span: [3, 4], color: 'var(--color-kinz-green)' },

  // Phase 4
  { num: '', label: 'Phase 4: GIS Dashboard (Subsystem C)', span: [3, 5], color: 'var(--color-kinz-blue)', isPhaseHeader: true },
  { num: '4.1', label: 'Dashboard UI & Leaflet/MapLibre map integration', span: [3, 4], color: 'var(--color-kinz-blue)' },
  { num: '4.2', label: 'Three views: national, regional, investment explorer', span: [3, 5], color: 'var(--color-kinz-blue)' },
  { num: '4.3', label: 'CSV export, map snapshot & executive PDF', span: [4, 5], color: 'var(--color-kinz-blue)' },

  // Phase 5
  { num: '', label: 'Phase 5: System Integration & Testing', span: [5, 5], color: 'var(--color-kinz-navy)', isPhaseHeader: true },
  { num: '5.1', label: 'Subsystem integration & end-to-end testing', span: [5, 5], color: 'var(--color-kinz-navy)' },
  { num: '5.2', label: 'Forecast accuracy validation (MAPE/MAE/RMSE)', span: [5, 5], color: 'var(--color-kinz-navy)' },
  { num: '5.3', label: 'Performance & data pipeline reproducibility testing', span: [5, 5], color: 'var(--color-kinz-navy)' },

  // Phase 6
  { num: '', label: 'Phase 6: UAT, Training & Handover', span: [5, 6], color: 'var(--color-primary)', isPhaseHeader: true },
  { num: '6.1', label: 'User Acceptance Testing with MoTA/JTB', span: [5, 6], color: 'var(--color-primary)' },
  { num: '6.2', label: 'Formal training session & documentation', span: [6, 6], color: 'var(--color-primary)' },
  { num: '6.3', label: 'Deployment to MoDEE data center', span: [6, 6], color: 'var(--color-primary)' },
  { num: '6.4', label: 'Final completion report & handover', span: [6, 6], color: 'var(--color-primary)' },

  // Cross-cutting
  { num: '', label: 'Cross-cutting Activities', span: [1, 6], color: 'var(--color-text-muted)', isPhaseHeader: true },
  { num: '\u25C7', label: 'Bi-weekly progress reports to JDS', span: [1, 6], color: '#9CA3AF' },
  { num: '\u25C7', label: 'AI Researcher methodology validation', span: [1, 5], color: '#9CA3AF' },
];

/* ── Milestones data ── */
const milestones: Activity[] = [
  { num: 'M1', label: 'Database schema signed off', span: [1, 1], color: 'var(--color-kinz-red)', isMilestone: true },
  { num: 'M2', label: 'All datasets cleansed and loaded', span: [2, 2], color: 'var(--color-kinz-orange)', isMilestone: true },
  { num: 'M3', label: 'Dashboard prototype for stakeholder feedback', span: [3, 3], color: 'var(--color-kinz-blue)', isMilestone: true },
  { num: 'M4', label: 'Analytics engine complete; dashboard alpha', span: [4, 4], color: 'var(--color-kinz-green)', isMilestone: true },
  { num: 'M5', label: 'All subsystems integrated; UAT complete', span: [5, 5], color: 'var(--color-kinz-navy)', isMilestone: true },
  { num: 'M6', label: 'Deployment at MoDEE + final handover', span: [6, 6], color: 'var(--color-primary)', isMilestone: true },
];

/* ── PAGE 1: GANTT CHART ── */
export function Tech4WorkSchedule() {
  const borderColor = 'var(--color-border)';

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-10 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              TECH-4: Work Schedule &amp; Planning for Deliverables
            </h1>
          </div>
          <span
            className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            3 pages
          </span>
        </div>
        <div className="h-px mb-4" style={{ background: borderColor }} />

        {/* Gantt Table */}
        <div className="rounded-lg overflow-hidden border flex-1" style={{ borderColor }}>
          <table className="w-full" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="py-1.5 px-2 font-semibold text-left text-[10px] w-10">N&deg;</th>
                <th className="py-1.5 px-2 font-semibold text-left text-[10px]">Activity</th>
                {MONTHS.map(m => (
                  <th key={m} className="py-1.5 px-0.5 font-semibold text-center text-[10px] w-[62px]">
                    M{m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.map((act, i) => (
                <GanttRow key={i} act={act} borderColor={borderColor} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[9px]" style={{ color: 'var(--color-text-muted)' }}>
          {[
            { label: 'Phase 1: Kick-off', color: 'var(--color-kinz-red)' },
            { label: 'Phase 2: Data Integration', color: 'var(--color-kinz-orange)' },
            { label: 'Phase 3: Analytics', color: 'var(--color-kinz-green)' },
            { label: 'Phase 4: Dashboard', color: 'var(--color-kinz-blue)' },
            { label: 'Phase 5: Testing', color: 'var(--color-kinz-navy)' },
            { label: 'Phase 6: UAT/Handover', color: 'var(--color-primary)' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1">
              <div className="w-4 h-2.5 rounded-sm" style={{ background: item.color, opacity: 0.85 }} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-4 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── Deliverables data (shared by P2 & P3) ── */
const deliverables = [
  {
    id: 'D1',
    milestone: 'End of M1',
    items: [
      'Data readiness checklist (signed off by MoTA)',
      'Finalized database schema (PostgreSQL/PostGIS)',
      'Data quality assessment report',
    ],
    color: 'var(--color-kinz-red)',
  },
  {
    id: 'D2',
    milestone: 'End of M2',
    items: [
      'Populated PostgreSQL/PostGIS database (all cleansed datasets)',
      'ETL pipeline (source code + documentation)',
      'Bi-weekly progress reports (×2)',
    ],
    color: 'var(--color-kinz-orange)',
  },
  {
    id: 'D3',
    milestone: 'End of M3',
    items: [
      'Dashboard prototype (3 views: national, regional, investment)',
      'Initial forecasting outputs for stakeholder review',
      'Bi-weekly progress reports (×2)',
    ],
    color: 'var(--color-kinz-blue)',
  },
  {
    id: 'D4',
    milestone: 'End of M4',
    items: [
      'Forecasting models back-tested (MAPE/MAE/RMSE per governorate)',
      'Scenario simulation module (parameter-driven what-if analysis)',
      'Investment priority scoring engine',
      'Dashboard alpha (all 3 views functionally complete)',
      'Bi-weekly progress reports (×2)',
    ],
    color: 'var(--color-kinz-green)',
  },
  {
    id: 'D5',
    milestone: 'End of M5',
    items: [
      'Fully integrated system (all 3 subsystems connected)',
      'Source code repository (documented)',
      'Technical documentation (architecture, schema, data dictionary, formulas)',
      'Test reports (functional, performance, forecast accuracy)',
      'Bi-weekly progress reports (×2)',
    ],
    color: 'var(--color-kinz-navy)',
  },
  {
    id: 'D6',
    milestone: 'End of M6',
    items: [
      'Deployed system on dedicated server at MoDEE',
      'User manual + administrator guide',
      'Monthly data update procedure (documented + demonstrated)',
      'Formal training session (with MoTA/JTB staff)',
      'Completion report with expansion recommendations',
      'Executive-summary PDF export functionality',
      'Bi-weekly progress reports (×2)',
    ],
    color: 'var(--color-primary)',
  },
];

function DeliverableCard({ d }: { d: typeof deliverables[number] }) {
  return (
    <div className="rounded-lg p-3 border-l-4" style={{ borderColor: d.color, background: 'var(--color-light-bg)' }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: d.color }}>
          {d.id}
        </span>
        <span className="text-xs font-bold" style={{ color: d.color }}>{d.milestone}</span>
      </div>
      <ul className="text-[10px] leading-[1.5] space-y-0.5" style={{ color: 'var(--color-text)' }}>
        {d.items.map((item, i) => (
          <li key={i} className="flex gap-1.5">
            <span className="flex-shrink-0" style={{ color: d.color }}>&bull;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── PAGE 2: KEY MILESTONES + FIRST 3 DELIVERABLES (M1–M3) ── */
export function Tech4WorkScheduleP2() {
  const borderColor = 'var(--color-border)';

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-10 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Key Milestones */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Key Milestones</h2>
        </div>

        <div className="rounded-lg overflow-hidden border mb-5" style={{ borderColor }}>
          <table className="w-full" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="py-1.5 px-2 font-semibold text-left text-[10px] w-10"></th>
                <th className="py-1.5 px-2 font-semibold text-left text-[10px]">Milestone</th>
                {MONTHS.map(m => (
                  <th key={m} className="py-1.5 px-0.5 font-semibold text-center text-[10px] w-[62px]">
                    M{m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {milestones.map((ms, i) => (
                <GanttRow key={i} act={ms} borderColor={borderColor} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Planning for Deliverables — Part 1 (M1–M3) */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Planning for Deliverables (M1&ndash;M3)</h2>
        </div>

        <div className="space-y-2.5 flex-1">
          {deliverables.slice(0, 3).map(d => <DeliverableCard key={d.id} d={d} />)}
        </div>

        {/* Footer */}
        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-4 &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: REMAINING DELIVERABLES (M4–M6) ── */
export function Tech4WorkScheduleP3() {
  const borderColor = 'var(--color-border)';

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-10 pt-8 pb-5 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Planning for Deliverables (M4&ndash;M6)</h2>
        </div>

        <p className="text-[13px] leading-[1.6] mb-4" style={{ color: 'var(--color-text-muted)' }}>
          Continued from previous page. The final three milestones cover analytics
          completion, system integration with UAT, and deployment with handover.
        </p>

        <div className="space-y-3 flex-1">
          {deliverables.slice(3).map(d => <DeliverableCard key={d.id} d={d} />)}
        </div>

        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-4 &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}
