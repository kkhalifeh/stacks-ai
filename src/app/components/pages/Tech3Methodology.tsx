import kinzIcon from '@assets/KinzIcon.png';

/* ── PAGE 1: PROBLEM UNDERSTANDING ── */
export function Tech3Methodology() {
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
              TECH-3: Approach, Methodology & Work Plan
            </h1>
          </div>
          <span className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}>
            14 pages
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>A. Technical Approach & Methodology</h2>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>1. Understanding of the Problem</h3>

        <div className="text-[13px] leading-[1.7] space-y-3" style={{ color: 'var(--color-text)' }}>
          <p>
            Kinz has spent 15+ years working with Jordanian institutional data. The challenge facing MoTA
            is not that tourism data does not exist; it is that the data exists in forms that resist integration.
            Government datasets in Jordan typically contain inconsistent naming (a governorate appears
            as &ldquo;Ma&apos;an&rdquo;, &ldquo;Maan&rdquo;, &ldquo;&#1605;&#1593;&#1575;&#1606;&rdquo; across different files), mixed time granularity
            (monthly for some years, quarterly for others), and no shared geographic identifiers linking
            demand data to supply data.
          </p>

          <p>The core challenges that this PoC addresses are:</p>

          <div className="space-y-2 pl-1">
            {[
              { label: 'Data that resists integration', desc: 'Tourism demand, accommodation supply, and geographic records use different naming conventions, time granularity, and identifier schemes. No foreign keys connect a visitor count in one spreadsheet to a bed count in another.' },
              { label: 'No foundational data layer', desc: 'The real gap is not the absence of an analytics platform. It is the absence of the clean, harmonized, geospatially-aligned data layer that makes analytics possible. Without it, even the simplest indicator (visitors per bed) cannot be computed reliably.' },
              { label: 'Manual cross-referencing as the status quo', desc: 'MoTA decision-makers currently answer questions like "which governorate has the highest accommodation pressure this year" by manually comparing separate spreadsheets. The PoC eliminates this by creating a single queryable source of truth.' },
              { label: 'No forward-looking capability', desc: 'Current analysis is backward-looking. There are no forecasting tools to anticipate future demand conditions, and no systematic framework for ranking where infrastructure investment is most needed.' },
            ].map(item => (
              <div key={item.label} className="flex gap-2">
                <span className="font-bold flex-shrink-0" style={{ color: 'var(--color-primary)' }}>&bull;</span>
                <p><strong>{item.label}:</strong> {item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            These challenges play out differently across Jordan&apos;s six primary tourism clusters:
            Petra/Wadi Musa, which draws the highest international visitation yet suffers sharp demand
            seasonality; Wadi Rum, where rising eco-lodge demand must be balanced against environmental
            sensitivity; Aqaba, the coastal hub with significant hotel capacity; the Dead Sea corridor,
            dominated by resort-based tourism under tightening environmental constraints; Amman, the
            gateway city with the most diverse accommodation mix; and Karak, an emerging cultural and
            religious corridor whose tourism infrastructure is still in early stages. The PoC provides
            nationwide coverage with the ability to drill into each of these clusters individually.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: PROPOSED SOLUTION + ARCHITECTURE + DATASETS ── */
export function Tech3P2() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>2. Proposed Solution</h3>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          Our solution transforms MoTA&apos;s fragmented tourism data into a unified, geospatially-aligned
          decision-support platform through three integrated subsystems:{' '}
          <strong>Data &rarr; Analytics &rarr; Decisions</strong>.
        </p>

        {/* Architecture diagram */}
        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-dark)', color: 'white' }}>
          <p className="text-[10px] font-semibold mb-3 text-white/50 uppercase tracking-wider">System Architecture</p>
          <div className="flex gap-2">
            {[
              { id: 'A', title: 'Data Integration & Geospatial Store', color: 'var(--color-kinz-orange)', items: ['CSV ingestion from MoTA/JTB', 'Clean, normalize, harmonize', 'PostgreSQL/PostGIS database', 'Repeatable ETL pipeline'] },
              { id: 'B', title: 'AI-Assisted Analytics & Simulation', color: 'var(--color-kinz-green)', items: ['Demand-capacity indicators', 'Prophet forecasting (12mo)', 'What-if simulation', 'Investment priority scoring'] },
              { id: 'C', title: 'GIS Dashboard & User Interaction', color: 'var(--color-kinz-blue)', items: ['National overview map', 'Regional deep-dive', 'Investment explorer', 'Export (CSV, PDF)'] },
            ].map((sub, i) => (
              <div key={sub.id} className="flex items-center gap-2 flex-1">
                <div className="flex-1 rounded p-2.5 border border-white/20">
                  <p className="text-[10px] font-bold" style={{ color: sub.color }}>Subsystem {sub.id}</p>
                  <p className="text-[10px] font-semibold text-white mb-1.5">{sub.title}</p>
                  <div className="text-[9px] text-white/50 space-y-0.5">
                    {sub.items.map(item => <p key={item}>&bull; {item}</p>)}
                  </div>
                </div>
                {i < 2 && <span className="text-white/20 text-sm">&rarr;</span>}
              </div>
            ))}
          </div>
          <p className="mt-2 pt-2 border-t border-white/10 text-[9px] text-white/30 text-center">
            All outputs stored in PostgreSQL/PostGIS &middot; Open-source stack &middot; On-premise deployment at MoTA → MoDEE
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>3. Target Datasets</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          The PoC system works with three categories of datasets provided by MoTA/JTB, each requiring
          specific integration and harmonization procedures:
        </p>

        <div className="space-y-2 flex-1">
          {[
            { num: '1', title: 'Tourism Demand Data', color: 'var(--color-kinz-red)', items: 'Monthly visitor arrivals, site visit counts, visitor statistics by governorate/region. Standardized to monthly time index.' },
            { num: '2', title: 'Accommodation Supply Data', color: 'var(--color-kinz-green)', items: 'Hotels, rooms, beds by governorate. Occupancy rates (monthly). Accommodation class. Rooms/beds evolution over time.' },
            { num: '3', title: 'Geospatial & Infrastructure Data', color: 'var(--color-kinz-blue)', items: 'Administrative boundaries (governorates). Tourism site locations (point layer). Hotel coordinates. Transport network data (road network + airline routes) in GIS-ready format for accessibility rating, with versioned historical records.'},
          ].map(ds => (
            <div key={ds.num} className="rounded-lg p-3 border-l-4" style={{ borderColor: ds.color, background: 'var(--color-light-bg)' }}>
              <p className="text-[10px] font-bold" style={{ color: ds.color }}>Dataset {ds.num}</p>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{ds.title}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{ds.items}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: SUBSYSTEM A — ETL PIPELINE ── */
export function Tech3P3() {
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
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>4. Subsystem A: Data Integration & Geospatial Data Store</h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          Subsystem A is the technical foundation. It transforms fragmented tourism datasets into a
          structured, geospatially-aligned central database. Our approach leverages Kinz&apos;s 15+ years
          of experience in large-scale data collection, cleansing, and GIS-coordinate mapping, including
          a decade of delivering verified geospatial business data to Google at a 90% accuracy SLA.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.1 ETL Pipeline</h3>
        <div className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          <p>
            The ETL pipeline is a <strong>reproducible, script-based process</strong> in Python (pandas, geopandas).
            MoTA analysts can perform monthly updates by uploading CSV files through the dashboard.
          </p>
        </div>

        <div className="space-y-2.5 mb-4">
          {[
            { step: '1', title: 'Import', desc: 'CSV files uploaded through a dedicated dashboard interface. A YAML CSV-to-Schema Mapping Registry maps every CSV column to its target table and field, handling Arabic field names and text-based date formats. The UI provides separate upload buttons per dataset type and displays import results.', color: 'var(--color-kinz-red)' },
            { step: '2', title: 'Validate & Clean', desc: 'Four validation categories: missing value profiling, naming consistency (fuzzy match \u22650.9), noise detection (occupancy >100%, negative counts, invalid coordinates), and outlier detection (3-sigma on seasonal residuals). Critical errors abort the pipeline with a structured error report CSV.', color: 'var(--color-kinz-orange)' },
            { step: '3', title: 'Harmonize', desc: 'Time alignment to monthly index YYYY-MM. Geographic harmonization to standardized governorate/region IDs via master lookup. Missing data imputation per documented strategies. All corrections logged for traceability.', color: 'var(--color-kinz-green)' },
            { step: '4', title: 'Load', desc: 'Insert only new records using composite unique key (gov_id, site_id, year, month). Idempotent: re-running the same CSV inserts zero duplicates.', color: 'var(--color-kinz-blue)' },
            { step: '5', title: 'Log', desc: 'Record metadata for each ETL execution: row counts, source file identity, run status, and validation outcomes. Ensures traceability, monitoring, and reliable auditing.', color: 'var(--color-kinz-navy)' },
          ].map(item => (
            <div key={item.step} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: item.color }}>{item.step}</div>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.2 Data Quality Checks</h3>
        <p className="text-[13px] leading-[1.6] mb-2" style={{ color: 'var(--color-text)' }}>
          Each dataset undergoes automated validation upon import:
        </p>

        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Check</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Description</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>On Failure</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Missing values', 'Profile null/empty fields', 'Flag + documented imputation'],
                ['Naming consistency', 'Fuzzy match against master lookup (\u22650.9)', 'Auto-correct or flag for review'],
                ['Duplicate detection', 'Identify duplicate entries by composite key', 'Flag for review; prevent insertion'],
                ['Type & range validation', 'Numeric/date checks, occupancy 0-100%, counts \u2265 0', 'Halt import; report flagged records'],
                ['Temporal continuity', 'No unexplained gaps in monthly series', 'Flag gaps; document discontinuities'],
                ['Geographic join', 'All records link to boundary layer', 'Flag unmatched records'],
              ].map(([check, desc, action]) => (
                <tr key={check} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-0.5 px-3 font-medium">{check}</td>
                  <td className="py-0.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{desc}</td>
                  <td className="py-0.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 4: SUBSYSTEM A — DB ARCHITECTURE + TECH STACK ── */
export function Tech3P4() {
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
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.3 End-to-End Validation Tests</h3>
        <div className="text-[11px] leading-[1.5] space-y-1 mb-4" style={{ color: 'var(--color-text)' }}>
          {[
            'Upload a clean CSV to confirm all records are correctly ingested and the expected row count is achieved.',
            'Re-upload the same file to verify idempotency (zero duplicate records inserted).',
            'Upload a CSV with intentional errors to confirm error reports are generated and no invalid data is loaded.',
            'Execute a spatial join query to verify all visitor records map to valid governorate boundaries.',
            'Document all test cases and outcomes in a formal testing log for the completion report.',
          ].map((test, i) => (
            <p key={i}><strong style={{ color: 'var(--color-primary)' }}>T{i + 1}.</strong> {test}</p>
          ))}
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.4 Database Schema</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          The central data store uses <strong>PostgreSQL 16 with PostGIS 3.x</strong>. Below is the
          core schema design showing the five primary tables and their relationships.
        </p>

        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Table</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Key Columns</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['tourism_demand', 'governorate_id (FK), period_month (DATE), visitor_count, site_visits, data_source, loaded_at, is_imputed (BOOLEAN)'],
                ['accommodation_supply', 'governorate_id (FK), period_month, hotel_count, room_count, bed_count, occupancy_rate (NUMERIC), accommodation_class, data_source'],
                ['computed_indicators', 'governorate_id (FK), period_month, model_run_id (UUID), visitors_per_bed, occupancy_pressure_index, growth_pressure_index, capacity_adequacy_index, capacity_classification, priority_score'],
                ['geo_boundaries', 'governorate_id (PK), name_en, name_ar, geometry (GEOMETRY), boundary_source'],
                ['forecast_results', 'model_run_id (UUID), governorate_id (FK), forecast_month, predicted_visitors, lower_bound, upper_bound, forecast_horizon_months'],
              ].map(([table, cols]) => (
                <tr key={table} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-mono font-medium whitespace-nowrap">{table}</td>
                  <td className="py-1.5 px-3 font-mono" style={{ color: 'var(--color-text-muted)' }}>{cols}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          All tables join through <span className="font-mono">governorate_id</span>, which links to <span className="font-mono">geo_boundaries</span> for
          spatial queries. The <span className="font-mono">is_imputed</span> flag on demand records ensures analysts always know which
          values are observed versus gap-filled. Re-running the pipeline with identical inputs produces
          identical outputs, ensuring full reproducibility.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>4.5 Technology Stack Rationale</h3>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Component</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Choice</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Why</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Database', 'PostgreSQL + PostGIS', 'Proven in government GIS deployments; MoDEE already operates PostgreSQL infrastructure'],
                ['Backend API', 'Python FastAPI', 'Async support for concurrent dashboard queries; automatic OpenAPI docs for handover'],
                ['Map Engine', 'Leaflet', 'Simpler tile server setup for on-premise deployment; lower configuration overhead for MoTA IT staff'],
                ['ETL', 'Python (pandas, geopandas)', 'De facto standard for tabular + geospatial transforms; large ecosystem of validation libraries'],
                ['Forecasting', 'Facebook Prophet', 'Handles seasonality natively, robust to gaps, interpretable decomposition, no GPU required'],
                ['Containerization', 'Docker', 'All services containerized, enabling seamless migration from MoTA staging server to MoDEE data center'],
              ].map(([comp, choice, why]) => (
                <tr key={comp} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium w-24">{comp}</td>
                  <td className="py-1.5 px-3 font-medium w-40">{choice}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 4</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 5: SUBSYSTEM B — INDICATORS + CLASSIFICATION ── */
export function Tech3P5() {
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
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>5. Subsystem B: AI-Assisted Analytics & Simulation</h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          Subsystem B computes analytical indicators and generates forward-looking insights. All outputs
          are transparent, formula-based, reproducible, and stored in the database for dashboard use.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>5.1 Demand-Capacity Diagnostic Indicators</h3>

        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Indicator</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Formula</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Default Thresholds</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Beds per 1,000 visitors', '(total_beds / total_annual_visitors) \u00D7 1,000', 'Reported as-is'],
                ['Occupancy Pressure Index (OPI)', '0.6 \u00D7 (avg_occupancy_peak_3mo / 100) + 0.4 \u00D7 (avg_occupancy_annual / 100)', '>0.85 High, 0.6\u20130.85 Moderate, <0.6 Low'],
                ['Growth Pressure Index (GPI)', '(visitors_yr_N / visitors_yr_N\u22123)^(1/3) \u2212 1 (3-yr CAGR); if <3 yrs: simple YoY', '>0.10 High growth, 0\u20130.10 Moderate, <0 Declining'],
                ['Capacity Adequacy Index (CAI)', 'total_beds / (peak_monthly_visitors \u00D7 avg_stay_nights)', '<0.8 Under-capacity, 0.8\u20131.2 Balanced, >1.2 Over-capacity'],
              ].map(([name, formula, thresholds]) => (
                <tr key={name} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium w-36">{name}</td>
                  <td className="py-1.5 px-3 font-mono" style={{ color: 'var(--color-text-muted)' }}>{formula}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{thresholds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-[11px] leading-[1.5] mb-3 space-y-1 pl-3 border-l-2" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <p><strong style={{ color: 'var(--color-text)' }}>Peak 3 months:</strong> The 3 highest <em>consecutive</em> months in the calendar year, computed as a rolling 3-month window maximum. Consecutive months are required because sustained pressure, not isolated spikes, creates infrastructure investment signals.</p>
          <p><strong style={{ color: 'var(--color-text)' }}>BASE year:</strong> Defined as Y-3 if it falls outside the COVID impact window (Mar 2020 &ndash; Jun 2021); otherwise, the most recent pre-COVID year is used as the baseline.</p>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          All weights (0.6/0.4 for OPI) and thresholds are proposed defaults, configurable by MoTA analysts
          via the dashboard settings. Indicators recompute automatically
          when new data is loaded, ensuring the dashboard always reflects the latest state.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>5.2 Capacity Classification</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          A rule-based classifier uses CAI as the primary driver with OPI as a secondary confirmatory signal.
          Thresholds are configurable by MoTA analysts via the dashboard.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: 'Under-Capacity', rule: 'CAI < 0.80 OR OPI > 0.85', desc: 'Infrastructure shortage. Either signal stressed.', color: 'var(--color-kinz-red)', icon: '\u25B2' },
            { label: 'Balanced', rule: 'CAI 0.80\u20131.20 AND OPI 0.60\u20130.85', desc: 'No strong pressure signal from either indicator.', color: 'var(--color-kinz-green)', icon: '\u25A0' },
            { label: 'Over-Capacity', rule: 'CAI > 1.20 AND OPI < 0.60', desc: 'Low utilization / oversupply risk.', color: 'var(--color-kinz-blue)', icon: '\u25BC' },
            { label: 'Spatial Imbalanced', rule: 'CAI > 1.20 AND OPI > 0.85', desc: 'Beds geographically concentrated. Sub-regional analysis needed.', color: 'var(--color-kinz-orange)', icon: '\u25C6' },
          ].map(cat => (
            <div key={cat.label} className="rounded-lg p-2.5 border-l-4" style={{ borderColor: cat.color, background: 'var(--color-light-bg)' }}>
              <p className="text-xs font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>
                <span style={{ color: cat.color }}>{cat.icon}</span> {cat.label}
              </p>
              <p className="text-[10px] font-mono mb-0.5" style={{ color: cat.color }}>{cat.rule}</p>
              <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{cat.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          The Spatial Imbalanced class handles cases where a governorate has many beds (high CAI)
          but also high occupancy pressure (high OPI), a contradiction arising when accommodation
          is spatially concentrated (e.g., Wadi Musa town center has hotel capacity while surrounding
          villages are under-served). Classification feeds into investment priority scoring and is
          visualized on the national overview map.
        </p>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 5</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 6: SUBSYSTEM B — PROPHET FORECASTING ── */
export function Tech3P6() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>5.3 Demand Forecasting: Prophet Model</h3>

        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[13px] leading-[1.7]">
            The forecasting methodology has been developed in collaboration with <strong>Dr. Bushra Al Hijawi</strong>,
            Associate Professor of Data Science at Princess Sumaya University for Technology.
          </p>
        </div>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            We implement <strong>univariate time-series forecasting</strong> using Facebook Prophet,
            an additive regression model designed for business time series with strong seasonal patterns.
            Prophet is selected because it:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Handles <strong>seasonality natively</strong> (yearly cycles), which is critical for tourism</li>
            <li>Is robust to <strong>missing data and outliers</strong> common in government datasets</li>
            <li>Produces <strong>interpretable, decomposable outputs</strong> (trend + seasonality + holidays)</li>
            <li>Requires minimal tuning for acceptable baseline performance</li>
            <li>Meets the requirement for transparent, reproducible statistical models</li>
          </ul>
        </div>

        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Parameter</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Value</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Rationale</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['growth', 'linear', 'No saturation cap within 12-month horizon'],
                ['changepoint_prior_scale', '0.05', 'Tuned via grid search (0.01, 0.05, 0.10, 0.50) before model commit'],
                ['changepoint_range', '0.9', 'Extended to detect post-COVID trajectory shifts'],
                ['seasonality_mode', 'multiplicative', 'Seasonal effects scale with tourism volume'],
                ['seasonality_prior_scale', '10', 'Default; validated per-governorate during evaluation'],
                ['yearly_seasonality', 'True', 'Tourism is fundamentally seasonal'],
                ['interval_width', '0.80', '80% confidence band for decision-support'],
                ['holidays', 'Custom (Hijri + JO)', 'Ramadan, Eid al-Fitr, Eid al-Adha, Easter, Christmas + JO public'],
              ].map(([param, value, rationale]) => (
                <tr key={param} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-3 font-mono font-medium w-[150px]">{param}</td>
                  <td className="py-1 px-3 font-mono" style={{ color: 'var(--color-primary)' }}>{value}</td>
                  <td className="py-1 px-3" style={{ color: 'var(--color-text-muted)' }}>{rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] leading-[1.5] mb-3" style={{ color: 'var(--color-text)' }}>
          <strong>Holiday effects:</strong> Ramadan applies as a <em>negative</em> regressor for international leisure arrivals
          but neutral-to-positive for Arab regional visitors. Eid al-Fitr/Adha are positive domestic tourism spikes.
          Easter is positive for European and pilgrim arrivals. All holiday windows and effect directions are validated
          with Dr. Al Hijawi.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Model Strategy</h3>
        <div className="text-[13px] leading-[1.7] space-y-2" style={{ color: 'var(--color-text)' }}>
          <p>
            We train <strong>independent Prophet models per governorate</strong> plus one national model.
            Different governorates have distinct seasonality profiles. Aqaba peaks in winter (beach),
            Petra in spring/autumn (hiking), Amman is flatter (business travel). A single model cannot
            capture these divergent patterns. An <strong>experimental comparison with ARIMA/SARIMA</strong> using
            identical datasets will be conducted to validate Prophet as the superior approach; results
            are included in the Forecast Evaluation Report.
          </p>
          <p>
            <strong>COVID handling:</strong> The pandemic period (Mar 2020–Jun 2021) is masked as NaN
            when sufficient surrounding data exists, preventing the model from learning the anomalous
            trough as seasonal signal. For shorter series, explicit changepoints are added instead.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 6</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 7: FORECASTING — BACK-TESTING + DATA PREP ── */
export function Tech3P7() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>5.3.1 Data Preparation for Forecasting</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The forecasting pipeline consumes monthly time series from the cleaned database (Subsystem A).
            Before model training, each series undergoes targeted preparation:
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Issue</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Strategy</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Sporadic gaps (1-2 months)', 'Linear interpolation between neighbors'],
                ['Consecutive blocks (3-6 months)', 'Seasonal naive: same month prior year, scaled by growth rate'],
                ['Extended gaps (>6 months)', 'Do not impute. Truncate series. Flag for short-series protocol.'],
                ['COVID period (Mar 2020–Jun 2021)', 'Mask as NaN if ≥36 months non-COVID data; else add explicit changepoints'],
                ['Outliers', '3-sigma on seasonal residuals → flag for MoTA manual review'],
              ].map(([issue, strategy]) => (
                <tr key={issue} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium">{issue}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>5.3.2 Short Series Handling</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          Some governorates may have limited historical data. Our graduated response:
        </p>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Available Months</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['≥ 36 months', 'Full Prophet model with yearly seasonality'],
                ['24\u201335 months', 'Prophet with relaxed seasonality_prior_scale = 15 (default 10)'],
                ['12–23 months', 'Trend-only Prophet + national seasonal indices applied multiplicatively'],
                ['< 12 months', 'No forecast. Use national forecast × regional share factor as proxy.'],
              ].map(([months, action]) => (
                <tr key={months} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium w-36">{months}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>5.3.3 Back-Testing & Evaluation Protocol</h3>
        <div className="text-[13px] leading-[1.7] space-y-2" style={{ color: 'var(--color-text)' }}>
          <p>
            <strong>Back-test:</strong> Train on all data except last 12 months. Forecast 12 months. Compare
            predicted against actual. National MAPE target: ≤ 20%.
          </p>
          <p>
            <strong>Cross-validation:</strong> Walk-forward approach with an initial training window of 24 months
            and a sliding step of 6 months, generating 6–8 evaluation folds to ensure robustness.
          </p>
          <p>
            <strong>Model comparison:</strong> Prophet is evaluated side-by-side against ARIMA/SARIMA using identical
            datasets and preprocessing. Per-governorate metrics use MAPE for high-volume governorates (&gt;50K visitors/month),
            MAE for low-volume (&lt;5K/month), and both for mid-range, with WMAPE as an additional fairness measure.
            Results are documented in the Forecast Evaluation Report.
          </p>
        </div>

        <div className="rounded-lg overflow-hidden border mt-2" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['MAPE', 'Mean Absolute Percentage Error. Primary KPI (≤ 20% national).'],
                ['MAE', 'Mean Absolute Error. Interpretable: "off by X visitors/month".'],
                ['RMSE', 'Root Mean Squared Error. Penalizes large individual month errors.'],
                ['WMAPE', 'Weighted MAPE. Volume-weighted, fairer for low-count regions.'],
              ].map(([metric, desc]) => (
                <tr key={metric} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-bold w-20" style={{ color: 'var(--color-primary)' }}>{metric}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 7</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 8: WHAT-IF SIMULATION + INVESTMENT SCORING ── */
export function Tech3P8() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>5.4 What-If Scenario Simulation</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The simulation function allows MoTA analysts to test hypothetical changes against the
            <strong> forecasted baseline</strong>, not against current observed values. This is critical
            because investment decisions concern future conditions, not the present state alone.
          </p>
          <p>The simulation does <strong>not retrain Prophet</strong>. It applies algebraic transformations
            to stored forecast outputs and capacity parameters, keeping response times under 2 seconds.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Supported Scenario Types</h3>
        <div className="space-y-2 mb-4">
          <div className="rounded-lg p-3 border-l-4" style={{ borderColor: 'var(--color-kinz-green)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Accommodation Capacity Scenario</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              User inputs: target region, future period, change in beds, and accommodation class (3-star, 4-star, 5-star hotels, or eco-lodges where data permits).
              System recalculates: projected occupancy, visitors/bed ratio, capacity adequacy, pressure index,
              classification, and priority score.
            </p>
          </div>
          <div className="rounded-lg p-3 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Visitor Demand Scenario</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              User inputs: target region, future period, percentage or absolute change in visitors.
              System recalculates the same indicators above using modified demand against existing/planned capacity.
            </p>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>5.4.1 Simulation Calculation Logic</h3>
        <div className="space-y-2 mb-3">
          <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
            <p className="text-xs font-bold mb-1" style={{ color: 'var(--color-text)' }}>Accommodation Capacity Scenario (add N beds to region R at month T):</p>
            <div className="font-mono text-[10px] leading-[1.6] space-y-0.5" style={{ color: 'var(--color-text-muted)' }}>
              <p>new_beds = forecast_beds_R_T + N</p>
              <p>new_occupancy = (forecast_visitors_R_T &times; avg_stay_nights) / (new_beds &times; days_in_month) &times; 100</p>
              <p>new_visitors_per_bed = forecast_visitors_R_T / new_beds</p>
              <p>new_CAI = new_beds / (forecast_visitors_R_T &times; avg_stay_nights)</p>
              <p>&rarr; Reclassify using OPI/CAI thresholds &rarr; Recompute priority score</p>
            </div>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
            <p className="text-xs font-bold mb-1" style={{ color: 'var(--color-text)' }}>Visitor Demand Scenario (apply X% change to region R at month T):</p>
            <div className="font-mono text-[10px] leading-[1.6] space-y-0.5" style={{ color: 'var(--color-text-muted)' }}>
              <p>new_visitors = forecast_visitors_R_T &times; (1 + X/100)</p>
              <p>new_occupancy = (new_visitors &times; avg_stay_nights) / (forecast_beds_R_T &times; days_in_month) &times; 100</p>
              <p>new_visitors_per_bed = new_visitors / forecast_beds_R_T</p>
              <p>&rarr; Reclassify using OPI/CAI thresholds &rarr; Recompute priority score</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-2.5 border mb-3" style={{ borderColor: 'var(--color-kinz-orange)', background: 'var(--color-light-bg)' }}>
          <p className="text-[10px] font-bold mb-1" style={{ color: 'var(--color-kinz-orange)' }}>Guard Conditions</p>
          <p className="text-[10px] leading-[1.5]" style={{ color: 'var(--color-text)' }}>
            If projected occupancy exceeds 100%, the system displays &ldquo;Oversaturated: capacity insufficient for projected demand&rdquo;
            instead of an impossible percentage. If visitors per bed falls below 1, it displays
            &ldquo;Significant overcapacity: demand substantially below accommodation supply.&rdquo;
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Simulation Output Format</h3>
        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Indicator (Petra, +200 beds)</th>
                <th className="text-center py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Forecast Baseline</th>
                <th className="text-center py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Scenario Result</th>
                <th className="text-center py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Difference</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Occupancy Rate', '82%', '71%', '-11%'],
                ['Visitors per Bed', '38', '29', '-9'],
                ['Capacity Classification', 'Under-Capacity', 'Balanced', 'Improved'],
                ['Priority Score', '78', '54', '-24'],
              ].map(([ind, baseline, scenario, diff]) => (
                <tr key={ind} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium">{ind}</td>
                  <td className="text-center py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{baseline}</td>
                  <td className="text-center py-1.5 px-3" style={{ color: 'var(--color-primary)' }}>{scenario}</td>
                  <td className="text-center py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 8</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 8b: PRIORITY INVESTMENT SCORING ── */
export function Tech3P8b() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>5.5 Priority Investment Scoring</h3>
        <div className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          <p>
            Each governorate receives a composite priority score (0-100). The score determines the
            Investment Explorer ranking and triggers rule-based investment recommendations.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Composite Score Formula</h3>
        <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text)' }}>
          The system operates in two modes based on data availability. All components are min-max
          normalized across governorates to [0, 1] before weighting. Weights are configurable.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg p-3" style={{ background: 'var(--color-dark)', color: 'white' }}>
            <p className="text-[10px] font-bold mb-1.5 uppercase tracking-wider opacity-60">Three-Component (default)</p>
            <div className="font-mono text-[10px] leading-[1.6] space-y-0.5">
              <p>0.35 &times; demand_growth</p>
              <p>0.25 &times; capacity_gap</p>
              <p>0.25 &times; occupancy_pressure</p>
              <p>0.15 &times; accessibility*</p>
            </div>
            <p className="text-[9px] mt-1.5 opacity-50">* Simplified OSM-based distance metric when MoTA transport data unavailable</p>
          </div>
          <div className="rounded-lg p-3" style={{ background: 'var(--color-dark)', color: 'white' }}>
            <p className="text-[10px] font-bold mb-1.5 uppercase tracking-wider opacity-60">Four-Component (with transport data)</p>
            <div className="font-mono text-[10px] leading-[1.6] space-y-0.5">
              <p>0.30 &times; demand_growth</p>
              <p>0.25 &times; capacity_gap</p>
              <p>0.25 &times; occupancy_pressure</p>
              <p>0.20 &times; accessibility</p>
            </div>
            <p className="text-[9px] mt-1.5 opacity-50">Activated when MoTA provides validated transport network data</p>
          </div>
        </div>

        <div className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The three-component mode is the default, using a simplified distance-to-major-road metric
            computed from OpenStreetMap data. When MoTA provides validated transport network data (road
            connectivity + airline routes), the four-component mode activates with an expanded accessibility
            weight (0.20) and a composite formula: 0.6 &times; road_connectivity + 0.4 &times; air_connectivity.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Rule-Based Investment Recommendations</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          Beyond the numeric score, each governorate receives a plain-language recommendation based on its
          indicator profile:
        </p>

        <div className="space-y-2 mb-5">
          {[
            { rule: 'Under-capacity + GPI High', rec: 'Capacity expansion priority', desc: 'High demand growth with critical accommodation shortage. New bed capacity is the primary need.', color: 'var(--color-kinz-red)' },
            { rule: 'Over-capacity + GPI Low/Declining', rec: 'Demand diversification priority', desc: 'Surplus capacity with low occupancy growth. Investment should target demand generation.', color: 'var(--color-kinz-blue)' },
            { rule: 'Balanced + high seasonality', rec: 'Seasonal management priority', desc: 'Adequate annual supply but acute peak-season pressure. Invest in seasonal capacity or service quality.', color: 'var(--color-kinz-green)' },
            { rule: 'Spatial Imbalanced (CAI>1.2 + OPI>0.85)', rec: 'Sub-regional analysis required', desc: 'Conflicting signals at governorate level due to geographic concentration. Detailed sub-regional mapping needed.', color: 'var(--color-kinz-orange)' },
            { rule: 'Low accessibility + rising demand', rec: 'Infrastructure connectivity priority', desc: 'Transport linkage investment to unlock tourism potential.', color: 'var(--color-kinz-navy)' },
          ].map(item => (
            <div key={item.rule} className="rounded-lg p-3 border-l-4" style={{ borderColor: item.color, background: 'var(--color-light-bg)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.rec}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <strong style={{ color: 'var(--color-text)' }}>When:</strong> {item.rule}.{' '}
                <strong style={{ color: 'var(--color-text)' }}>Action:</strong> {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          All scoring rules are documented and adjustable. The justification text (auto-generated from
          indicator values) accompanies each recommendation in the Investment Explorer, ensuring
          decision-makers can trace every ranking back to its underlying data.
        </p>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 9</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 9: SUBSYSTEM C — DASHBOARD ── */
export function Tech3P9() {
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
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>6. Subsystem C: GIS Dashboard & User Interaction</h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          The dashboard is the primary interface for MoTA/JTB users. It is web-based, built with
          open-source tools, and designed for <strong>non-technical policy users</strong>. All
          visualizations are linked to the database, ensuring consistency and real-time data reflection.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>6.1 Dashboard Views</h3>

        <div className="space-y-3 mb-4">
          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-red)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>View 1: National Tourism Overview</p>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
              <p>&bull; Top banner renders 4 KPI cards (total visitors, total beds, weighted national occupancy, count of governorates scoring &gt;70 on priority index) with period-over-period change indicators</p>
              <p>&bull; Map uses choropleth coloring by priority score (red-yellow-green gradient), with proportional circle overlays for visitor volume. Hotel point markers shown where coordinate data confidence exceeds 90%</p>
              <p>&bull; Sidebar filters: year selector (dropdown), governorate multi-select, destination type toggles (cultural, nature, coastal, religious)</p>
            </div>
          </div>

          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-green)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>View 2: Regional Deep-Dive</p>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
              <p>&bull; Time series rendered as dual-axis chart: visitors (bar) and occupancy rate (line) on shared time axis. Forecast period distinguished by dashed line with 80% confidence band as shaded region</p>
              <p>&bull; Capacity classification badge updates dynamically as user changes the time period selector</p>
              <p>&bull; Regional map with hotels, tourism sites, and transport network overlay for accessibility context</p>
            </div>
          </div>

          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>View 3: Investment Explorer</p>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
              <p>&bull; Sortable table with priority score as default sort. Each row expandable to show justification breakdown (which sub-scores drove the ranking)</p>
              <p>&bull; Click-to-zoom: selecting a row centers the adjacent map on that governorate with indicator callout popup</p>
              <p>&bull; What-if simulation panel with scenario inputs and baseline vs. scenario comparison display</p>
              <p>&bull; PDF executive summary export with key analytical values and charts</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>6.2 Usability & Accessibility</h3>
        <div className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The dashboard is designed for non-technical policy users. Every indicator includes a clear legend,
            contextual tooltips, and an expandable &ldquo;What does this mean?&rdquo; explanation panel. Map layers include
            labeled legends with color scales. Charts display hover-state data labels. All classification labels
            (under-capacity, balanced, over-capacity, spatial imbalanced) are accompanied by plain-language descriptions of what
            they imply for investment decisions. Dashboard design will conform to MoTA&apos;s established UI/UX
            guidelines, obtained during the project kick-off, ensuring visual consistency with existing
            institutional standards.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>6.3 Technology Stack (Subsystem C)</h3>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Backend API', 'Python FastAPI (REST endpoints for data + analytics)'],
                ['Database', 'PostgreSQL/PostGIS (shared with Subsystems A & B)'],
                ['Map visualization', 'Leaflet or MapLibre GL JS (open-source)'],
                ['Charts', 'Plotly.js or ECharts (interactive, open-source)'],
                ['Export', 'CSV data tables, map snapshots (image), PDF executive summary'],
                ['Access control', 'Basic username/password authentication (PoC level)'],
                ['Deployment', 'Docker containers for seamless MoTA \u2192 MoDEE migration'],
              ].map(([comp, tech]) => (
                <tr key={comp} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium w-36">{comp}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 10</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 10: TEAM ORGANIZATION ── */
export function Tech3P10() {
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
        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>7. Team Organization & Composition</h3>

        <p className="text-[13px] leading-[1.6] mb-3" style={{ color: 'var(--color-text)' }}>
          The Joint Team is structured to deliver across all three subsystems while maintaining
          clear accountability and a single point of contact for all stakeholder communication.
        </p>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Role</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Name</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Responsibility</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Subsystem</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Project Lead / Focal Point', 'Khaled M. Khalifeh', 'Overall delivery, stakeholder communication, system design', 'All'],
                ['Academic AI Researcher', 'Dr. Bushra Al Hijawi', 'Methodology validation, forecasting approach, model evaluation', 'B'],
                ['Database Engineer', 'Ahmad M. Abu Joudeh', 'ETL pipeline, database design, analytics engine', 'A + B'],
                ['Backend / Analytics Developer', 'Ahmad Q. Al-Bzour', 'API development, simulation module, integration', 'B + C'],
                ['Frontend / GIS Developer', 'Osama Sarwar', 'Dashboard UI, map visualization, export functions', 'C'],
                ['QA Officer', 'Kinz staff', 'Functional testing, data pipeline testing, UAT support', 'All'],
                ['Data Operations Manager', 'Duha Ghanayem', 'Data cleansing coordination, quality validation', 'A'],
                ['Data Officers (×4)', 'Kinz staff', 'Data cleansing, harmonization, geographic mapping', 'A'],
              ].map(([role, name, resp, sub]) => (
                <tr key={role} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1 px-3 font-medium">{role}</td>
                  <td className="py-1 px-3">{name}</td>
                  <td className="py-1 px-3" style={{ color: 'var(--color-text-muted)' }}>{resp}</td>
                  <td className="py-1 px-3 text-center font-semibold" style={{ color: 'var(--color-primary)' }}>{sub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>B. Work Plan & Staffing</h2>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>8. Implementation Plan</h3>
        <p className="text-[13px] leading-[1.6] mb-3" style={{ color: 'var(--color-text)' }}>
          The 6-month implementation follows a phased approach with clear milestones and deliverables
          at each stage. The plan is designed for early validation: a working prototype is available
          by Month 3 for stakeholder feedback, reducing the risk of late-stage misalignment.
        </p>

        <div className="space-y-1.5 mb-3">
          {[
            { phase: 'Phase 1', months: 'M1', title: 'Kick-off & Data Assessment', items: 'Consortium kick-off meeting. Data confirmation with MoTA. Assess data quality, structure, gaps. Finalize database schema.', color: 'var(--color-kinz-red)' },
            { phase: 'Phase 2', months: 'M1–M2', title: 'Data Integration (Subsystem A)', items: 'ETL pipeline development. Data cleansing and harmonization. Load into PostgreSQL/PostGIS. Validate geographic joins.', color: 'var(--color-kinz-orange)' },
            { phase: 'Phase 3', months: 'M2–M4', title: 'Analytics & Forecasting (Subsystem B)', items: 'Indicator engine development. Prophet model training and back-testing. Simulation module. Investment scoring.', color: 'var(--color-kinz-green)' },
          ].map(item => (
            <div key={item.phase} className="rounded-lg py-2 px-3 border-l-4" style={{ borderColor: item.color, background: 'var(--color-light-bg)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.phase}</span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>({item.months})</span>
                <span className="text-sm font-bold ml-1" style={{ color: 'var(--color-text)' }}>{item.title}</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.items}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg py-2 px-3 border" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs leading-[1.5]" style={{ color: 'var(--color-text)' }}>
            <strong>Critical path:</strong> Subsystem B can be coded against synthetic data in M2-M3, but
            validated only after Subsystem A produces clean data. We scaffold analytics with synthetic data
            from day one, then swap to real MoTA data once the ETL pipeline is operational. The M3 prototype
            uses real data where available, synthetic placeholders elsewhere.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 11</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 11: WORK PLAN continued ── */
export function Tech3P11() {
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
        <div className="space-y-2 mb-5">
          {[
            { phase: 'Phase 4', months: 'M3–M5', title: 'GIS Dashboard (Subsystem C)', items: 'Dashboard UI development. Map integration (Leaflet/MapLibre). Three views: national, regional, investment explorer. Early prototype by M3 for stakeholder feedback.', color: 'var(--color-kinz-blue)' },
            { phase: 'Phase 5', months: 'M5', title: 'System Integration & Testing', items: 'Connect all three subsystems. Functional testing. Data pipeline reproducibility test. Forecast accuracy validation. Performance testing under PoC conditions.', color: 'var(--color-kinz-navy)' },
            { phase: 'Phase 6', months: 'M5–M6', title: 'UAT, Training & Handover', items: 'Structured UAT sessions with MoTA. Address critical issues. Formal training session. Deploy to MoDEE data center. Submit completion report.', color: 'var(--color-primary)' },
          ].map(item => (
            <div key={item.phase} className="rounded-lg p-3 border-l-4" style={{ borderColor: item.color, background: 'var(--color-light-bg)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.phase}</span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>({item.months})</span>
              </div>
              <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.title}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{item.items}</p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Key Milestones</h3>
        <div className="rounded-lg overflow-hidden border mb-5" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Milestone</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Deadline</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Owner</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['All input datasets ready', 'Start of PoC', 'MoTA/JTB'],
                ['Database schema finalized', 'End of M1', 'Joint Team'],
                ['All datasets cleansed and in database', 'End of M2', 'Joint Team'],
                ['Dashboard prototype for feedback', 'End of M3', 'Joint Team'],
                ['Analytics engine complete; dashboard alpha', 'End of M4', 'Joint Team'],
                ['All subsystems developed and integrated', 'End of M5', 'Joint Team'],
                ['UAT complete', 'End of M5', 'Joint Team + MoTA'],
                ['Deployment at MoDEE + final handover', 'End of M6', 'Joint Team'],
              ].map(([milestone, deadline, owner]) => (
                <tr key={milestone} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3">{milestone}</td>
                  <td className="py-1.5 px-3 font-medium" style={{ color: 'var(--color-primary)' }}>{deadline}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Deliverables by Milestone</h3>
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Milestone</th>
                <th className="text-left py-1.5 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Deliverables</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['End of M1', 'Data readiness checklist (signed off), finalized database schema, data quality assessment report'],
                ['End of M2', 'Populated PostgreSQL/PostGIS database, ETL pipeline (code + docs), bi-weekly progress reports'],
                ['End of M3', 'Dashboard prototype (3 views), initial forecasting outputs for stakeholder review'],
                ['End of M4', 'Forecasting models back-tested (MAPE/MAE/RMSE per governorate), scenario simulation module, investment priority scoring engine, dashboard alpha'],
                ['End of M5', 'Fully integrated system (all 3 subsystems), source code repository, technical documentation (architecture, schema, data dictionary, formulas)'],
                ['End of M6', 'Deployed system on dedicated server (1U/2U rack, 8+ core, 32GB DDR5, 1TB NVMe, Ubuntu Server), user manual + admin guide, formal training session, completion report with expansion recommendations'],
              ].map(([milestone, deliverables]) => (
                <tr key={milestone} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium whitespace-nowrap" style={{ color: 'var(--color-primary)' }}>{milestone}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{deliverables}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 12</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 12: SECTION C — COMMENTS ON TOR ── */
export function Tech3P12() {
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
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>C. Comments on the Terms of Reference</h2>
        </div>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          The following observations and suggestions are offered to strengthen the PoC outcome and
          reduce implementation risk. They reflect our experience delivering data intelligence
          platforms for government and international organizations.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Risk Assessment</h3>

        <div className="space-y-3 mb-5">
          {[
            { risk: 'Data Quality & Completeness', impact: 'High', desc: 'Tourism datasets from multiple sources may contain inconsistencies, missing values, naming variations, and gaps, particularly for smaller governorates and for the COVID period.', mitigation: 'Strong ETL pipeline with documented validation rules. Graduated handling for missing data and short series. Early data assessment phase (M1) to identify issues before development begins.' },
            { risk: 'Timeline Constraint (6 months)', impact: 'High', desc: 'The PoC scope is ambitious for a 6-month window, especially given dependencies on data availability from MoTA.', mitigation: 'Phased delivery with early prototype (M3). Parallel development of subsystems. Clear milestone-based progress tracking. Bi-weekly reports to flag delays early.' },
            { risk: 'Forecast Accuracy Uncertainty', impact: 'Medium', desc: 'Prophet MAPE ≤ 20% at national level may be challenging if historical data contains structural breaks, limited depth, or post-COVID volatility.', mitigation: 'Multi-tier fallback strategy (parameter tuning → data re-examination → alternative models). Transparent reporting of limitations. Volume-tiered metric selection for fairness across governorates.' },
            { risk: 'Stakeholder Coordination', impact: 'Medium', desc: 'Multiple entities (MoTA, MoDEE, JICA, JDS, AI Steering Committee) require coordinated communication.', mitigation: 'Single unified focal point (Khaled M. Khalifeh). All stakeholder communication channeled through the focal point. Bi-weekly progress reports to the AI Steering Committee.' },
          ].map(item => (
            <div key={item.risk} className="rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.risk}</p>
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold"
                  style={{ background: item.impact === 'High' ? 'var(--color-kinz-red)' : 'var(--color-kinz-orange)', color: 'white' }}>
                  {item.impact}
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              <p className="text-xs"><strong style={{ color: 'var(--color-primary)' }}>Mitigation:</strong>{' '}
                <span style={{ color: 'var(--color-text-muted)' }}>{item.mitigation}</span></p>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 13</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 13: COMMENTS ON TOR continued — SUGGESTIONS ── */
export function Tech3P13() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Suggestions for Strengthening the PoC</h3>

        <div className="space-y-3 mb-5">
          {[
            { title: '3-Stage Validation Protocol', desc: 'We propose structured validation at three points: (1) data model review with MoTA data owners at end of M1, (2) indicator logic review with Dr. Al Hijawi at M2, (3) dashboard walkthrough with MoTA policy users at M3. Each stage produces a signed-off validation memo before proceeding to the next phase.' },
            { title: 'Data Readiness Checklist', desc: 'Within the first week, we will prepare a checklist cataloging every expected CSV file, its column schema, expected row count, and known quality issues. MoTA signs off on this checklist, creating a shared baseline of what was provided and eliminating ambiguity about data scope.' },
            { title: 'KPI Clarity and Baseline Definition', desc: 'The TOR defines MAPE \u2264 20% at national level but acknowledges variability at governorate level. We suggest establishing a pre-agreed "accuracy tiers" framework (high/medium/low volume governorates) at project start, so that evaluation is fair and expectations are calibrated. This prevents disputes about what constitutes "acceptable" accuracy for small governorates.' },
            { title: 'Monthly Update Procedure as a Deliverable', desc: 'The TOR requires that MoTA can update data monthly. We will deliver a step-by-step procedure document and recorded demonstration specifically for this workflow, tested by a non-technical MoTA staff member during UAT. This ensures the system is genuinely operable post-handover.' },
            { title: 'Forecast Model Retraining Schedule', desc: 'We recommend MoTA retrains the Prophet models quarterly as new monthly data accumulates, rather than relying on stale forecasts. The admin guide will include a one-command retraining procedure that re-fits all governorate models, re-runs back-testing, and logs updated accuracy metrics.' },
          ].map(item => (
            <div key={item.title} className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>{item.title}</p>
              <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[13px] leading-[1.7]">
            We build decision systems, not dashboards. Every component of this PoC is designed to answer
            one question: <strong>where should Jordan invest next in tourism infrastructure?</strong> The
            data layer makes the question answerable. The analytics layer computes the answer. The dashboard
            makes the answer actionable.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>TECH-3 &middot; Page 14</span>
        </div>
      </div>
    </div>
  );
}
