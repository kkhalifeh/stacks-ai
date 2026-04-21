import kinzIcon from '@assets/KinzIcon.png';

/* ── Helpers ── */
type Effort = 'F' | 'P' | '-';

const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'] as const;

interface PersonRow {
  num: number;
  name: string;
  position: string;
  months: Effort[];
  total: string;
}

function EffortCell({ type }: { type: Effort }) {
  if (type === '-') return <td className="text-center py-1.5 px-1 w-[52px]" />;
  if (type === 'F')
    return (
      <td className="text-center py-1.5 px-1 w-[52px]">
        <div className="mx-auto w-9 h-4 rounded-sm" style={{ background: 'var(--color-kinz-blue)' }} />
      </td>
    );
  return (
    <td className="text-center py-1.5 px-1 w-[52px]">
      <div
        className="mx-auto w-9 h-4 rounded-sm"
        style={{
          background: `repeating-linear-gradient(
            135deg,
            var(--color-kinz-blue),
            var(--color-kinz-blue) 2px,
            white 2px,
            white 4px
          )`,
        }}
      />
    </td>
  );
}

function PersonRowComponent({ row, borderColor }: { row: PersonRow; borderColor: string }) {
  return (
    <tr className="border-t" style={{ borderColor }}>
      <td className="py-1.5 px-2 text-center w-8">{row.num}</td>
      <td className="py-1.5 px-2">
        <span className="font-semibold">{row.name}</span>
        {row.position && (
          <>
            <br />
            <span style={{ color: 'var(--color-text-muted)' }}>{row.position}</span>
          </>
        )}
      </td>
      {row.months.map((m, i) => (
        <EffortCell key={i} type={m} />
      ))}
      <td className="text-center py-1.5 px-2 font-semibold w-14">{row.total}</td>
    </tr>
  );
}

/* ── DATA ── */
const aiResearchers: PersonRow[] = [
  {
    num: 1,
    name: 'Dr. Bushra Al Hijawi',
    position: 'AI Researcher / Methodology Advisor',
    months: ['P', 'P', 'P', 'P', 'P', '-'],
    total: '2.5',
  },
];

const otherPersonnel: PersonRow[] = [
  {
    num: 1,
    name: 'Khaled M. Khalifeh',
    position: 'Project Manager / Team Lead',
    months: ['P', 'P', 'P', 'P', 'P', 'P'],
    total: '3.0',
  },
  {
    num: 2,
    name: 'Ahmad M. Abu Joudeh',
    position: 'Database Engineer',
    months: ['F', 'F', 'F', 'F', 'F', 'P'],
    total: '5.5',
  },
  {
    num: 3,
    name: 'Ahmad Q. Al-Bzour',
    position: 'Backend / Analytics Developer',
    months: ['P', 'F', 'F', 'F', 'F', 'P'],
    total: '5.0',
  },
  {
    num: 4,
    name: 'Osama Sarwar',
    position: 'Frontend / GIS Developer',
    months: ['-', 'P', 'F', 'F', 'F', 'P'],
    total: '4.0',
  },
  {
    num: 5,
    name: 'Duha Ghanayem',
    position: 'Data Operations Manager',
    months: ['F', 'F', 'P', 'P', 'P', '-'],
    total: '3.5',
  },
  {
    num: 6,
    name: 'QA Officer',
    position: 'Quality Assurance & Testing',
    months: ['-', '-', '-', 'P', 'F', 'P'],
    total: '2.0',
  },
  {
    num: 7,
    name: 'Data Officers (\u00d74)',
    position: 'Data Cleansing & Entry',
    months: ['F', 'F', 'P', '-', '-', '-'],
    total: '5.0',
  },
];

/* ── PAGE 1: PERSONNEL SCHEDULE TABLE ── */
export function Tech5Personnel() {
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

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              TECH-5: Personnel Schedule
            </h1>
          </div>
          <span
            className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}
          >
            2 pages
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: borderColor }} />

        <p className="text-[13px] leading-[1.7] mb-5" style={{ color: 'var(--color-text)' }}>
          The table below presents the personnel input schedule for the 6-month PoC implementation.
          Months are counted from the start of the assignment. The AI Researcher and other key
          personnel are listed individually; supporting staff are listed by category.
        </p>

        {/* ── TABLE ── */}
        <div className="rounded-lg overflow-hidden border" style={{ borderColor }}>
          <table className="w-full text-xs" style={{ color: 'var(--color-text)' }}>
            {/* Header */}
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="py-2 px-2 font-semibold text-left w-8" style={{ color: 'var(--color-text)' }}>
                  N&deg;
                </th>
                <th className="py-2 px-2 font-semibold text-left" style={{ color: 'var(--color-text)' }}>
                  Name of Expert / Position
                </th>
                {MONTHS.map(m => (
                  <th key={m} className="py-2 px-1 font-semibold text-center w-[52px]" style={{ color: 'var(--color-text)' }}>
                    {m}
                  </th>
                ))}
                <th className="py-2 px-2 font-semibold text-center w-14" style={{ color: 'var(--color-text)' }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {/* AI Researcher Section Header */}
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <td
                  className="py-2 px-2 font-bold"
                  colSpan={9}
                  style={{ color: 'var(--color-kinz-green)' }}
                >
                  AI Researcher(S)
                </td>
              </tr>
              {aiResearchers.map(r => (
                <PersonRowComponent key={r.num} row={r} borderColor={borderColor} />
              ))}
              {/* AI Sub-Total */}
              <tr className="border-t" style={{ borderColor, background: 'var(--color-light-bg)' }}>
                <td colSpan={8} className="py-1.5 px-2 font-bold text-right" style={{ color: 'var(--color-text)' }}>
                  Sub-Total
                </td>
                <td className="py-1.5 px-2 font-bold text-center" style={{ color: 'var(--color-primary)' }}>
                  2.5
                </td>
              </tr>

              {/* Other Personnel Section Header */}
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <td
                  className="py-2 px-2 font-bold"
                  colSpan={9}
                  style={{ color: 'var(--color-kinz-blue)' }}
                >
                  Other Personnel (including Team lead and Database engineer)
                </td>
              </tr>
              {otherPersonnel.map(r => (
                <PersonRowComponent key={r.num} row={r} borderColor={borderColor} />
              ))}
              {/* Other Sub-Total */}
              <tr className="border-t" style={{ borderColor, background: 'var(--color-light-bg)' }}>
                <td colSpan={8} className="py-1.5 px-2 font-bold text-right" style={{ color: 'var(--color-text)' }}>
                  Sub-Total
                </td>
                <td className="py-1.5 px-2 font-bold text-center" style={{ color: 'var(--color-primary)' }}>
                  28.0
                </td>
              </tr>

              {/* Grand Total */}
              <tr className="border-t-2" style={{ borderColor: 'var(--color-primary)' }}>
                <td colSpan={8} className="py-2 px-2 font-bold text-right" style={{ color: 'var(--color-text)' }}>
                  Total Person-Month Input
                </td>
                <td className="py-2 px-2 font-bold text-center text-sm" style={{ color: 'var(--color-primary)' }}>
                  30.5
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-3 rounded-sm" style={{ background: 'var(--color-kinz-blue)' }} />
            Full-time input
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-3 rounded-sm"
              style={{
                background: `repeating-linear-gradient(135deg, var(--color-kinz-blue), var(--color-kinz-blue) 2px, white 2px, white 4px)`,
              }}
            />
            Part-time input
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4 space-y-1 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <p>1. Months are counted from the start of the assignment (expected commencement: May 2026).</p>
          <p>2. The AI Researcher and key engineers are listed individually; QA Officer and Data Officers are listed by category.</p>
          <p>3. Full-time input = 1.0 person-month; part-time input = 0.5 person-month.</p>
        </div>

        {/* Footer */}
        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-5 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: TEAM COMPOSITION & ROLE DESCRIPTIONS ── */
export function Tech5PersonnelP2() {
  const borderColor = 'var(--color-border)';

  const roles = [
    {
      name: 'Dr. Bushra Al Hijawi',
      title: 'AI Researcher / Methodology Advisor',
      color: 'var(--color-kinz-green)',
      desc: 'Validates the forecasting methodology (Prophet configuration, indicator formulas, simulation logic) and reviews forecast accuracy outputs. Participates in milestone reviews and contributes to the final completion report. Dr. Al Hijawi brings direct experience designing Jordan\u2019s national AI classification framework with MoDEE through her ESCWA consultancy.',
    },
    {
      name: 'Khaled M. Khalifeh',
      title: 'Project Manager / Team Lead',
      color: 'var(--color-kinz-red)',
      desc: 'Serves as the unified contact point (focal point) for the Joint Team. Manages stakeholder coordination with MoTA, JTB, MoDEE, and JDS. Responsible for bi-weekly progress reports, milestone tracking, risk escalation, and final handover. 14+ years in technology leadership with direct experience managing government data projects.',
    },
    {
      name: 'Ahmad M. Abu Joudeh',
      title: 'Database Engineer',
      color: 'var(--color-kinz-blue)',
      desc: 'Leads the design and implementation of Subsystem A (Data Integration). Responsible for PostgreSQL/PostGIS database schema, ETL pipeline development, data cleansing and harmonization logic, and geographic data processing. 18+ years in software development with specific experience in data architecture, warehouse schemas, ETL pipelines, and GIS data processing at Kinz.',
    },
    {
      name: 'Ahmad Q. Al-Bzour',
      title: 'Backend / Analytics Developer',
      color: 'var(--color-kinz-navy)',
      desc: 'Develops the FastAPI backend powering Subsystem B (Analytics & Forecasting) and the API layer serving Subsystem C (Dashboard). Implements indicator computation engine, forecast model integration, simulation endpoints, and investment scoring APIs. 9+ years in backend engineering with expertise in database optimization, API architecture, and system integration.',
    },
    {
      name: 'Osama Sarwar',
      title: 'Frontend / GIS Developer',
      color: 'var(--color-kinz-yellow)',
      desc: 'Builds the interactive GIS dashboard (Subsystem C) using Leaflet/MapLibre for geospatial visualization and Plotly.js for analytical charts. Implements the three dashboard views (national overview, regional drill-down, investment explorer) and the CSV/PDF export functionality. Joins from M2 for UI prototyping and works full-time through M5 for dashboard delivery.',
    },
    {
      name: 'Duha Ghanayem',
      title: 'Data Operations Manager',
      color: 'var(--color-kinz-orange)',
      desc: 'Manages the data cleansing team (Data Officers) during Phases 1\u20132, overseeing data entry, verification, and quality control workflows. Coordinates data validation with MoTA data owners and ensures cleansed datasets meet the schema requirements defined by the Database Engineer. 10+ years in operations management, data quality, and process optimization.',
    },
    {
      name: 'QA Officer + Data Officers (\u00d74)',
      title: 'Testing & Data Entry',
      color: 'var(--color-text-muted)',
      desc: 'The QA Officer executes structured test plans, UAT sessions with MoTA staff, and regression testing during Phases 4\u20136. Data Officers perform hands-on data cleansing, normalization, and entry under Duha\u2019s supervision during Phases 1\u20133. All are permanent Kinz employees and Jordanian nationals.',
    },
  ];

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

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
            Team Composition & Assigned Responsibilities
          </h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          The team combines academic AI research expertise with a full-stack engineering capability
          that has delivered data-intensive systems for over 15 years. Two of the seven key personnel
          are female (Dr. Al Hijawi and Ms. Ghanayem), reflecting Kinz's commitment to inclusive
          team composition. Each member's role maps directly to a subsystem or cross-cutting function:
        </p>

        <div className="space-y-3 flex-1">
          {roles.map(role => (
            <div key={role.name} className="rounded-lg p-3 border-l-4" style={{ borderColor: role.color, background: 'var(--color-light-bg)' }}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold" style={{ color: role.color }}>{role.name}</span>
                <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{role.title}</span>
              </div>
              <p className="text-[11px] leading-[1.6]" style={{ color: 'var(--color-text)' }}>{role.desc}</p>
            </div>
          ))}
        </div>

        {/* Subsystem mapping summary */}
        <div className="rounded-lg p-3 mt-3 border" style={{ borderColor, background: 'var(--color-light-bg)' }}>
          <table className="w-full text-[10px]" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr>
                <th className="text-left py-1 font-semibold" style={{ width: '35%' }}>Subsystem</th>
                <th className="text-left py-1 font-semibold">Primary</th>
                <th className="text-left py-1 font-semibold">Support</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text-muted)' }}>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 font-medium" style={{ color: 'var(--color-kinz-orange)' }}>A. Data Integration</td>
                <td className="py-1">Abu Joudeh, Ghanayem, Data Officers</td>
                <td className="py-1">Al-Bzour</td>
              </tr>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 font-medium" style={{ color: 'var(--color-kinz-green)' }}>B. Analytics &amp; Forecasting</td>
                <td className="py-1">Al-Bzour, Abu Joudeh</td>
                <td className="py-1">Dr. Al Hijawi (validation)</td>
              </tr>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 font-medium" style={{ color: 'var(--color-kinz-blue)' }}>C. GIS Dashboard</td>
                <td className="py-1">Sarwar, Abu Joudeh (GIS data)</td>
                <td className="py-1">Al-Bzour (APIs)</td>
              </tr>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 font-medium" style={{ color: 'var(--color-kinz-navy)' }}>Testing &amp; QA</td>
                <td className="py-1">QA Officer</td>
                <td className="py-1">Ghanayem (data validation)</td>
              </tr>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 font-medium" style={{ color: 'var(--color-kinz-red)' }}>Project Management</td>
                <td className="py-1">Khalifeh</td>
                <td className="py-1">Dr. Al Hijawi (advisory)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}
        >
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-5 &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}
