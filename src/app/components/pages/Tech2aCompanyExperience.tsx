import kinzIcon from '@assets/KinzIcon.png';

/* ── PAGE 1: COMPANY ORGANIZATION ── */
export function Tech2aCompanyExperience() {
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              TECH-2a: Company Organization & Experience
            </h1>
          </div>
          <span className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}>
            5 pages
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        {/* ── A. ORGANIZATION ── */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>A. Company Organization</h2>
        </div>

        <div className="text-[13px] leading-[1.6] space-y-2.5" style={{ color: 'var(--color-text)' }}>
          <p>
            <strong>Kinz for Information Technology</strong> is a Jordanian private limited shareholding company
            established in 2009 and headquartered in Amman. The company specializes in building structured
            data platforms that transform fragmented corporate and institutional datasets into actionable,
            searchable intelligence for decision-making.
          </p>
          <p>
            Kinz operates at the intersection of <strong>corporate data platforms</strong>,{' '}
            <strong>CRM systems</strong>, and <strong>market intelligence tools</strong>. The company
            maintains a verified database of over <strong>200,000 Jordanian business entities</strong> with
            structured fields including GIS coordinates, industry classification (ISIC 4), contact
            information, and operational details.
          </p>
          <p>
            Over 15+ years, Kinz has delivered data-driven intelligence solutions to international
            technology companies, donor-funded development organizations, and Jordanian government
            ministries. Core competencies in <strong>data collection, cleansing, harmonization,
            geospatial mapping, and platform development</strong> are directly aligned with the
            AI-GIS PoC program requirements.
          </p>
        </div>

        {/* Org Structure */}
        <h3 className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>Organizational Structure</h3>
        <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
          <div className="flex flex-col items-center gap-2">
            {/* Board */}
            <div className="rounded-lg px-4 py-2 text-center border w-full max-w-md" style={{ borderColor: 'var(--color-border)', background: 'white' }}>
              <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Board of Directors</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Muhannad M. Khalifeh <span className="opacity-50">(Chairman)</span> &middot; Zaid S. Jum&apos;a <span className="opacity-50">(Vice Chairman)</span> &middot; Tariq M. Khalifeh <span className="opacity-50">(Member)</span></p>
            </div>
            <div className="w-px h-2" style={{ background: 'var(--color-border)' }} />
            {/* CEO */}
            <div className="rounded-lg px-4 py-2 text-center text-xs font-semibold text-white" style={{ background: 'var(--color-primary)' }}>
              Khaled M. Khalifeh, Chief Executive Officer
            </div>
            <div className="w-px h-2" style={{ background: 'var(--color-border)' }} />
            {/* Teams */}
            <div className="flex gap-3 w-full">
              <div className="flex-1 rounded-lg px-3 py-2 text-center border" style={{ borderColor: 'var(--color-border)', background: 'white' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Engineering Team</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>2 Sr. Backend &middot; 1 Frontend &middot; 1 QA</p>
              </div>
              <div className="flex-1 rounded-lg px-3 py-2 text-center border" style={{ borderColor: 'var(--color-border)', background: 'white' }}>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Data Operations Team</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>1 Manager &middot; 4 Data Officers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shareholders */}
        <h3 className="text-sm font-bold mt-4 mb-2" style={{ color: 'var(--color-text)' }}>Beneficial Ownership</h3>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Shareholder</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Type</th>
                <th className="text-right py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Share</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-1.5 px-3">Arabia Trading &amp; Consulting Co.</td>
                <td className="py-1.5 px-3">Founder</td>
                <td className="text-right py-1.5 px-3">60%</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-1.5 px-3">Marwan Salah Mohammad Jum&apos;a</td>
                <td className="py-1.5 px-3">Shareholder</td>
                <td className="text-right py-1.5 px-3">40%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2a &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: EXPERIENCE INTRO + GOOGLE PROJECT ── */
export function Tech2aCompanyExperienceP2() {
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
        {/* ── B. EXPERIENCE INTRO ── */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>B. Relevant Experience</h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-6" style={{ color: 'var(--color-text)' }}>
          The following projects represent Kinz&apos;s most relevant engagements over the past 10 years.
          Each project involved structured data operations (collection, cleansing, harmonization, and
          delivery) in service of decision-support objectives. Projects are ordered by relevance to the
          AI-GIS PoC program requirements.
        </p>

        {/* Project 1: Google */}
        <div className="rounded-lg border overflow-hidden flex-1" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--color-primary)', color: 'white' }}>
            <span className="text-sm font-bold">1. Geospatial Business Data Platform for Google Maps</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/20">HIGHEST RELEVANCE</span>
          </div>
          <div className="p-5 text-[13px] space-y-3" style={{ color: 'var(--color-text)' }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Client:</span> Google Ireland Limited</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Country:</span> Jordan</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration:</span> 2013–2023 (10 years)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Total Value:</span> ~EUR 300,000</div>
              <div className="col-span-2"><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Role:</span> Sole data licensor and contractor</div>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Assignment Description &amp; Deliverables:</p>
              <p className="leading-[1.7]">
                Kinz designed, built, and continuously maintained a structured national business database
                covering <strong>over 200,000 verified business entities</strong> across Jordan. Under a
                10-year content licence agreement with Google Ireland Limited, Kinz served as Google&apos;s
                exclusive data licensor for Jordanian business listings integrated into Google Maps and
                Google Search products.
              </p>
            </div>

            <p className="leading-[1.7]">
              Each entity record included: business name, full postal address, telephone and fax numbers,
              email address, website URL, business type and industry classification, and{' '}
              <strong>geospatial coordinates (latitude and longitude)</strong>. All content was delivered in
              both Arabic and English via automated XML feed, with <strong>monthly updates</strong> provided
              no less than once per calendar month.
            </p>

            <p className="leading-[1.7]">
              The agreement mandated a <strong>90% accuracy SLA</strong> across all data fields, verified
              through randomized quality sampling by Google. This required Kinz to maintain rigorous data
              collection, validation, and cleansing processes at national scale over the full duration of
              the engagement.
            </p>

            <div className="rounded-lg p-4 mt-1" style={{ background: 'var(--color-primary)', color: 'white' }}>
              <p className="leading-[1.7]">
                <strong>Relevance to AI-GIS PoC:</strong> This engagement demonstrates Kinz&apos;s proven capability
                in large-scale data collection, cleansing, geospatial coordinate mapping, structured data
                delivery pipelines, and sustained data quality management, all capabilities directly required
                for Subsystem A (Data Integration &amp; Geospatial Data Store) of the AI-GIS PoC.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2a &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: GOOGLE RELEVANCE + MOE PROJECT ── */
export function Tech2aCompanyExperienceP3() {
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
        {/* Project 2: MASE */}
        <div className="rounded-lg border overflow-hidden flex-1" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--color-kinz-green)', color: 'white' }}>
            <span className="text-sm font-bold">2. Solar Energy Forecasting & GIS Monitoring Platform</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/20">FORECASTING + GIS</span>
          </div>
          <div className="p-5 text-[13px] space-y-3" style={{ color: 'var(--color-text)' }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Client:</span> Modern Arabia for Solar Energy (MASE)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Country:</span> Jordan (operations across Middle East)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration:</span> 2024</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Value:</span> USD 80,000</div>
              <div className="col-span-2"><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Role:</span> Sole developer and contractor</div>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Assignment Description &amp; Deliverables:</p>
              <p className="leading-[1.7]">
                Kinz designed and built a <strong>predictive analytics and monitoring platform</strong> for
                MASE, a solar energy operations &amp; maintenance company managing photovoltaic plants across
                multiple sites in the Middle East. The platform integrates real-time SCADA (Supervisory Control
                and Data Acquisition) data streams from distributed solar installations into a centralized
                intelligence system.
              </p>
            </div>

            <p className="leading-[1.7]">
              The core of the platform is a <strong>time-series forecasting model</strong> for solar energy
              yield prediction, built on historical performance data including solar irradiance levels,
              inverter output, panel temperature, degradation rates, and grid feed-in metrics. The model
              generates forecasts for expected energy production and flags deviations that indicate
              maintenance requirements, including panel soiling alerts, inverter anomalies, and
              performance ratio degradation.
            </p>

            <p className="leading-[1.7]">
              The system includes <strong>GIS mapping of all plant locations</strong> with real-time status
              overlays, a maintenance log with automated alert triggers, and a dashboard for operations
              managers to monitor portfolio-wide performance across geographically distributed sites.
            </p>

            <div className="rounded-lg p-4 mt-1" style={{ background: 'var(--color-primary)', color: 'white' }}>
              <p className="leading-[1.7]">
                <strong>Relevance to AI-GIS PoC:</strong> This is the most directly comparable engagement.
                It combines <strong>time-series forecasting, real-time data integration, GIS mapping, and
                a decision-support dashboard</strong> in a single platform. The forecasting methodology
                (predictive models on historical time-series data) and the GIS visualization layer mirror
                the exact capabilities required for Subsystems B and C of the AI-GIS PoC.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2a &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 4: NCSM ── */
export function Tech2aCompanyExperienceP4() {
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
        {/* Project 3: NCSM */}
        <div className="rounded-lg border overflow-hidden flex-1" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'var(--color-kinz-orange)', color: 'white' }}>
            <span className="text-sm font-bold">3. National Crisis Decision-Support Systems</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/20">GOVERNMENT + CAPACITY TRACKING</span>
          </div>
          <div className="p-5 text-[13px] space-y-3" style={{ color: 'var(--color-text)' }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Client:</span> National Center for Security and Crises Management (NCSCM)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Country:</span> Jordan</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration:</span> 2019–2022</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Value:</span> National service contribution</div>
              <div className="col-span-2"><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Role:</span> Sole system developer</div>
            </div>

            <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Assignment Description &amp; Deliverables:</p>
              <p className="leading-[1.7]">
                During the COVID-19 pandemic, Kinz built two critical decision-support systems for
                Jordan&apos;s National Center for Security and Crises Management, providing the government
                with real-time, evidence-based intelligence at a time when data-driven decisions directly
                impacted public safety.
              </p>
            </div>

            <div className="rounded-lg p-3 border-l-4" style={{ borderColor: 'var(--color-kinz-red)', background: 'var(--color-light-bg)' }}>
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>System 1: National Health Capacity Tracker</p>
              <p className="text-xs leading-[1.6]" style={{ color: 'var(--color-text-muted)' }}>
                Tracked COVID indicators across all public, private, and Royal Medical Services hospitals
                nationwide. Monitored incoming patients, status during regular stay and ICU admission, with
                detailed daily reporting. Produced analysis of deceased patients including co-morbidities and
                contributing factors. Generated <strong>perpetual reports on bed occupancy with focus on ICU
                wards</strong>, enabling civil defense authorities to rapidly move patients to available rooms.
              </p>
            </div>

            <div className="rounded-lg p-3 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>System 2: National Food Supply Intelligence</p>
              <p className="text-xs leading-[1.6]" style={{ color: 'var(--color-text-muted)' }}>
                Tracked availability of key food items by linking directly with Jordan&apos;s Customs
                Department. Cleansed and properly classified customs data to generate live perpetual reports
                on item availability, import sources, costs, and other critical supply chain indicators.
              </p>
            </div>

            <p className="leading-[1.7]">
              Both systems enabled the government to shift from reactive crisis management to
              <strong> intelligent, evidence-based decision making</strong>. The health capacity tracker&apos;s
              bed occupancy reporting directly contributed to patient redistribution decisions that saved lives.
            </p>

            <div className="rounded-lg p-4 mt-1" style={{ background: 'var(--color-primary)', color: 'white' }}>
              <p className="leading-[1.7]">
                <strong>Relevance to AI-GIS PoC:</strong> The closest conceptual parallel to the AI-GIS PoC.
                Hospital bed occupancy tracking mirrors tourism accommodation capacity tracking. Real-time
                government reporting dashboards mirror the MoTA dashboard. Data cleansing of external sources
                (customs data) mirrors tourism data harmonization. Both projects demonstrate Kinz&apos;s ability
                to build decision-support systems for government under demanding conditions.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2a &middot; Page 4</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 5: GIZ + KINZ PLATFORM ── */
export function Tech2aCompanyExperienceP5() {
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
        {/* Project 4: GIZ */}
        <div className="rounded-lg border overflow-hidden mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-5 py-2.5" style={{ background: 'var(--color-kinz-navy)', color: 'white' }}>
            <span className="text-sm font-bold">4. Corporate Data Analytics for Policy Decision-Support</span>
          </div>
          <div className="p-4 text-[13px] space-y-2" style={{ color: 'var(--color-text)' }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Client:</span> GIZ (Deutsche Gesellschaft f&uuml;r Internationale Zusammenarbeit)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Project:</span> Employment in Jordan 2030 (EJ2030)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration:</span> February 2024</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Value:</span> ~EUR 6,000</div>
              <div className="col-span-2"><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Role:</span> Sole contractor</div>
            </div>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="leading-[1.6]">
                Delivered a comprehensive <strong>quantitative data analysis</strong> of women&apos;s
                participation in business leadership and ownership across Jordan for GIZ&apos;s Employment
                in Jordan 2030 program. Multi-dimensional data segmentation by ownership share, signatory
                authority, board representation, and management positions. Produced <strong>structured
                statistical outputs</strong> serving as an evidence base for policy recommendations.
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
              <p className="text-xs leading-[1.6]" style={{ color: 'var(--color-primary)' }}>
                <strong>Relevance:</strong> International donor-funded project (GIZ model parallels JICA).
                Data mining, quantitative analysis, and decision-support outputs for policy use.
              </p>
            </div>
          </div>
        </div>

        {/* Project 5: Kinz Platform */}
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
          <div className="px-5 py-2.5" style={{ background: 'var(--color-kinz-green)', color: 'white' }}>
            <span className="text-sm font-bold">5. Kinz Corporate Intelligence Platform (kinz.jo)</span>
          </div>
          <div className="p-4 text-[13px] space-y-2" style={{ color: 'var(--color-text)' }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Clients:</span> 200+ organizations (incl. 20 enterprise)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Country:</span> Jordan</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Duration:</span> 2011–Present (14+ years)</div>
              <div><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Value:</span> Ongoing SaaS subscription</div>
              <div className="col-span-2"><span className="font-medium" style={{ color: 'var(--color-text-muted)' }}>Role:</span> Product owner, developer, and operator</div>
            </div>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <p className="leading-[1.6]">
                Kinz&apos;s flagship <strong>corporate intelligence and CRM platform</strong>, serving
                over 200 active subscribers including <strong>Arab Bank</strong>, <strong>Zain Jordan</strong>,
                and <strong>Jordan Insurance</strong>. Provides structured, verified corporate data on over
                200,000 Jordanian businesses with <strong>GIS visualization</strong>, industry classification
                (ISIC 4), CRM workflows, and performance analytics dashboards. Monthly data updates maintained
                over 14 years of continuous operation.
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
              <p className="text-xs leading-[1.6]" style={{ color: 'var(--color-primary)' }}>
                <strong>Relevance:</strong> Production-grade data intelligence platform with GIS visualization
                and analytics dashboards. 14-year track record with institutional clients validates sustained
                delivery capability for Subsystem C.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-2a &middot; Page 5</span>
        </div>
      </div>
    </div>
  );
}
