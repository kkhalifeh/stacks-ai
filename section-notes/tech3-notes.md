# TECH-3: Approach, Methodology & Work Plan — Section Notes

## Status: DRAFTING

## Structure (RFP-mandated, 15 pages max)
- **A. Technical Approach, Methodology & Organization** (~8-9 pages)
- **B. Work Plan & Staffing** (~4-5 pages)
- **C. Comments on TOR** (~2 pages)

## Scoring
- 50 out of 100 points (most heavily weighted section)
- Evaluators look for: understanding of problem, logical system design, clear methodology, realistic work plan
- Must describe three target datasets separately
- Do NOT copy/paste from TOR

## Key Principles (from Knowledge Base)
- Position as "decision systems, not dashboards"
- AI is conservative (Prophet, not deep learning)
- Focus on clarity, structure, decision-making value

---

## A. Technical Approach & Methodology

### Problem Understanding
- Jordan's tourism sector has fragmented data across multiple spreadsheets/reports
- No unified analytical platform integrating demand + supply + geographic data
- Regional variation in demand intensity, seasonality, infrastructure capacity
- Decision-makers lack evidence-based tools for investment prioritization
- MoTA needs: clear identification of capacity stress/underutilization, demand-supply gaps, forecasts, ranked priority zones

### Proposed Solution — Three Subsystems
1. **Subsystem A: Data Integration & Geospatial Data Store**
   - Ingest MoTA/JTB CSV datasets
   - Clean, normalize, harmonize across time (monthly) and geography (governorate)
   - PostgreSQL/PostGIS central database
   - Repeatable ETL pipeline (Python/pandas/geopandas)
   - CSV upload via dashboard UI with validation

2. **Subsystem B: AI-Assisted Analytics & Simulation**
   - Demand-capacity indicators (visitors/bed, occupancy pressure, growth pressure)
   - Over/under-capacity classification (rule-based, configurable thresholds)
   - Prophet-based univariate demand forecasting (12-month horizon)
   - What-if simulation (capacity expansion + demand change scenarios)
   - Priority investment scoring

3. **Subsystem C: GIS Dashboard**
   - National overview (map + key indicators)
   - Regional deep-dive (time series + local map)
   - Investment explorer (ranked zones + justification)
   - Export: CSV, image, PDF summary
   - Open-source: FastAPI backend, Leaflet/MapLibre frontend, PostgreSQL/PostGIS

### Three Target Datasets (RFP requires separate description)
1. **Tourism Demand Data** — monthly arrivals, site visits, visitor counts by governorate
2. **Accommodation Supply Data** — hotels, rooms, beds, occupancy rates by governorate
3. **Geospatial Data** — admin boundaries, tourism site locations, hotel coordinates, transport network

### Methodology Steps
1. Data Integration — cleaning, harmonization, validation, ETL
2. Indicator Computation — demand-capacity diagnostics
3. Classification — over/under-capacity (rule-based)
4. Forecasting — Prophet, 12-month, MAPE ≤ 20%
5. Simulation — what-if scenarios comparing against forecast baseline
6. Investment Scoring — composite priority score
7. Dashboard — GIS visualization of all outputs

### Forecasting Approach (Prophet)
- Confirmed with Dr. Bushra Al Hijawi
- Detailed methodology being drafted by forecasting specialist
- Key: univariate, monthly, 12-month horizon, MAPE ≤ 20% national
- Back-testing: train on earlier data, test on last 12 months
- Per-governorate models with national aggregation

### Team Organization
- Khaled M. Khalifeh (CEO) — Project Lead / Focal Point
- Dr. Bushra Al Hijawi — Academic AI Researcher / Methodology Validator
- 2 Senior Backend Engineers — Subsystems A & B development
- 1 Frontend Engineer — Subsystem C (dashboard)
- 1 QA Engineer — Testing
- Data Operations Team — Data cleansing support

---

## B. Work Plan & Staffing
(Must be consistent with TECH-4)

### 6-Month Timeline
- Month 1: Kick-off, data confirmation, assessment, database design
- Month 2: Data cleansing, harmonization, ingestion (Subsystem A complete)
- Month 3: Forecasting module development (Subsystem B - part 1)
- Month 4: Simulation module, indicator engine (Subsystem B - part 2)
- Month 5: GIS Dashboard development, system integration (Subsystem C)
- Month 6: UAT, training, deployment at MoDEE, final report & handover

### Milestones (from RFP)
- All input datasets ready: Beginning of PoC (MoTA responsibility)
- All datasets cleansed and in database: End of Month 2
- All subsystems developed and integrated: End of Month 5
- UAT complete: End of Month 5
- Final deployment + handover: End of Month 6

---

## C. Comments on TOR

### Risks
1. **Data quality** — inconsistent datasets, missing values → mitigate with strong ETL + validation
2. **Timeline constraints** — 6 months is tight → phased delivery, early prototyping
3. **Undefined KPIs** — success criteria need clarity → propose KPIs in proposal
4. **Stakeholder complexity** — MoTA, MoDEE, JICA, JDS → single focal point (Khaled)
5. **PoC failure risk** — payment tied to success → conservative scope, clear deliverables

### Suggestions
1. Iterative validation with MoTA at each milestone
2. Early prototype dashboard by Month 3 for stakeholder feedback
3. Bi-weekly progress reports with KPI tracking
4. Clear data handover protocol with MoTA at project start

---

## Open Items
- [ ] **Forecasting methodology detail** — Expert agent drafting, to be integrated
- [ ] **Dr. Al Hijawi methodology input** — Pending confirmation of approach details
- [ ] **Tender provider answers** — Questions submitted, answers pending
- [ ] **Detailed indicator formulas** — To be specified (visitors/bed, occupancy pressure, etc.)
