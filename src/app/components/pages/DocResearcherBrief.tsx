import kinzIcon from '@assets/KinzIcon.png';

export function DocResearcherBrief() {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7" />
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                Academic AI Researcher: Role Brief
              </h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                AI-GIS PoC Program 5 &middot; JICA / MoDEE / MoTA &middot; Confidential
              </p>
            </div>
          </div>
        </div>
        <div className="h-px mb-4" style={{ background: 'var(--color-border)' }} />

        {/* Project summary */}
        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[13px] leading-[1.6]">
            <strong>Kinz for Information Technology</strong> is preparing a tender for a JICA-funded Proof of Concept
            to build an AI-GIS tourism analytics platform for Jordan&apos;s Ministry of Tourism (MoTA).
            The RFP <strong>mandates</strong> a Joint Team of a private IT company + an academic AI researcher.
            We are seeking a qualified academic partner.
          </p>
        </div>

        {/* Two columns: What & Requirements */}
        <div className="flex gap-4 mb-4">
          {/* Left: The PoC */}
          <div className="flex-1 rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>What the PoC Builds</h3>
            <ul className="text-xs space-y-1.5 list-disc pl-4" style={{ color: 'var(--color-text-muted)' }}>
              <li>Tourism data integration (PostgreSQL/PostGIS)</li>
              <li>Demand forecasting (Prophet / ARIMA, 12-month horizon)</li>
              <li>Over/under-capacity classification</li>
              <li>What-if scenario simulation</li>
              <li>Investment priority scoring</li>
              <li>GIS dashboard for MoTA decision-makers</li>
            </ul>
          </div>
          {/* Right: Timeline */}
          <div className="flex-1 rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Key Facts</h3>
            <div className="text-xs space-y-1.5" style={{ color: 'var(--color-text-muted)' }}>
              <p><strong style={{ color: 'var(--color-text)' }}>Duration:</strong> 6 months (May–Oct 2026)</p>
              <p><strong style={{ color: 'var(--color-text)' }}>Funder:</strong> JICA (100% funded)</p>
              <p><strong style={{ color: 'var(--color-text)' }}>Contract:</strong> Lump-sum via JDS</p>
              <p><strong style={{ color: 'var(--color-text)' }}>Deadline:</strong> April 19, 2026</p>
              <p><strong style={{ color: 'var(--color-text)' }}>Scoring:</strong> 70% technical / 30% financial</p>
              <p><strong style={{ color: 'var(--color-text)' }}>Researcher weight:</strong> 10 of 100 pts</p>
            </div>
          </div>
        </div>

        {/* Researcher requirements */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Mandatory Requirements (from RFP)</h2>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-light-bg)' }}>
          <ul className="text-[13px] space-y-1.5 list-disc pl-5" style={{ color: 'var(--color-text)' }}>
            <li>Researcher or professor at a <strong>Jordanian university or research institute</strong> in the field of AI</li>
            <li>Minimum <strong>3 years</strong> as a researcher, with <strong>2 years in academic AI research</strong></li>
            <li>Must commit to the Jordan AI Code of Ethics</li>
            <li>Must be available for the full 6-month PoC duration (part-time is acceptable)</li>
          </ul>
        </div>

        {/* Preferred expertise */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Preferred Expertise (Scored)</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          {[
            { label: 'Time-Series Forecasting', detail: 'ARIMA, Prophet, LSTM/GRU' },
            { label: 'Statistical Modeling', detail: 'Quantitative analysis methods' },
            { label: 'Data Engineering', detail: 'pandas, statsmodels, scikit-learn' },
            { label: 'Geospatial / GIS Analytics', detail: 'Spatial data, coordinate systems' },
            { label: 'Model Validation & Documentation', detail: 'Back-testing, MAPE evaluation' },
            { label: 'Public-Sector Communication', detail: 'Policy-level reporting' },
          ].map(item => (
            <div key={item.label} className="rounded p-2.5 border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</p>
              <p style={{ color: 'var(--color-text-muted)' }}>{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Expected role */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Your Role in the Joint Team</h2>
        </div>
        <div className="text-[13px] leading-[1.6] space-y-1" style={{ color: 'var(--color-text)' }}>
          <p>&bull; <strong>Methodology Validator:</strong> validate the AI/analytics approach and system design</p>
          <p>&bull; <strong>Technical Advisor:</strong> advise on forecasting models, data pipelines, and model accuracy</p>
          <p>&bull; <strong>Testing Verifier:</strong> verify forecast evaluation results and provide improvement guidance</p>
          <p>&bull; <strong>Proposal Contributor:</strong> relevant publications listed in TECH-2; signed CV in TECH-6</p>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>Researcher Brief &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}
