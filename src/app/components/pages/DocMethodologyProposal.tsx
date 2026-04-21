import kinzIcon from '@assets/KinzIcon.png';

/* ── PAGE 1: OVERVIEW + PROPHET RATIONALE ── */
export function DocMethodologyProposalP1() {
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
            <img src={kinzIcon} alt="" className="w-7 h-7" />
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                Proposed Analytical Methodology
              </h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                For Dr. Bushra Al Hijawi &middot; Review & Validation &middot; Draft v2
              </p>
            </div>
          </div>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <div className="rounded-lg p-4 mb-5" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-[13px] leading-[1.7]">
            This document contains the specific formulas, weights, thresholds, and model configurations
            we propose for the AI-GIS PoC. These are committed in the tender submission pending your
            validation. Please flag any parameters you would adjust.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>1. Demand-Capacity Indicator Formulas</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          These four indicators form the analytical backbone. Each is computed per governorate per month.
          The evaluator specifically requires "transparent, formula-based" indicators.
        </p>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Indicator</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Formula</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Thresholds</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-3 font-medium">Beds per 1,000 visitors</td>
                <td className="py-2 px-3 font-mono text-[10px]" style={{ color: 'var(--color-primary)' }}>(total_beds / annual_visitors) &times; 1000</td>
                <td className="py-2 px-3" style={{ color: 'var(--color-text-muted)' }}>Reported as-is</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-3 font-medium">Occupancy Pressure Index (OPI)</td>
                <td className="py-2 px-3 font-mono text-[10px]" style={{ color: 'var(--color-primary)' }}>0.6 &times; (peak_3mo_avg / 100) + 0.4 &times; (annual_avg / 100)</td>
                <td className="py-2 px-3" style={{ color: 'var(--color-text-muted)' }}>&gt;0.85 High, 0.6-0.85 Moderate, &lt;0.6 Low</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-3 font-medium">Growth Pressure Index (GPI)</td>
                <td className="py-2 px-3 font-mono text-[10px]" style={{ color: 'var(--color-primary)' }}>(visitors_Y / visitors_Y-3)^(1/3) - 1</td>
                <td className="py-2 px-3" style={{ color: 'var(--color-text-muted)' }}>&gt;10% High, 0-10% Moderate, &lt;0 Declining</td>
              </tr>
              <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <td className="py-2 px-3 font-medium">Capacity Adequacy Index (CAI)</td>
                <td className="py-2 px-3 font-mono text-[10px]" style={{ color: 'var(--color-primary)' }}>total_beds / (peak_mo_visitors &times; avg_stay)</td>
                <td className="py-2 px-3" style={{ color: 'var(--color-text-muted)' }}>&lt;0.8 Under, 0.8-1.2 Balanced, &gt;1.2 Over</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg p-3 mb-3" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>Open questions:</strong> (1) Are the OPI weights (0.6 peak / 0.4 annual) appropriate, or
            should we adjust for Jordan&apos;s specific seasonality patterns? (2) "Peak 3 months" uses the
            highest 3 consecutive months. Should this be highest 3 non-consecutive instead? (3) Is 3-year
            CAGR the right window for GPI, or should we use 5 years to smooth COVID effects?
          </p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Over/Under-Capacity Classification</h3>
        <div className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          <p>
            Classification uses the CAI thresholds above as the primary driver, with OPI as a secondary
            signal. A governorate is classified as Under-Capacity if CAI &lt; 0.8 OR if OPI &gt; 0.85.
            All thresholds are configurable by MoTA via the dashboard settings panel.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Methodology Proposal &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: PRIORITY SCORING + SIMULATION ALGEBRA ── */
export function DocMethodologyProposalP2() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>2. Priority Investment Score</h3>

        <div className="text-[13px] leading-[1.7] space-y-2 mb-3" style={{ color: 'var(--color-text)' }}>
          <p>Each governorate receives a composite score (0-100) computed as:</p>
        </div>

        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-dark)', color: 'white' }}>
          <p className="font-mono text-xs text-center py-1">
            Priority = 0.30 &times; norm(GPI) + 0.30 &times; norm(capacity_gap) + 0.25 &times; norm(OPI) + 0.15 &times; norm(accessibility)
          </p>
          <p className="text-[10px] text-white/50 text-center mt-2">
            Each component is min-max normalized across all governorates to [0, 1]. Weights are configurable.
          </p>
        </div>

        <div className="rounded-lg p-3 mb-5" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>Open questions:</strong> (1) Should demand growth carry equal weight to capacity gap (both 0.30)?
            Or should capacity gap be weighted higher since the PoC is focused on infrastructure investment?
            (2) Accessibility at 0.15 reflects that transport data may be incomplete. Should we increase this
            weight if MoTA provides reliable transport network data?
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>3. What-If Simulation Algebra</h3>
        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          Simulations apply algebraic transforms to stored forecast baselines. No model retraining occurs.
          Response time target: under 2 seconds.
        </p>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Capacity Scenario (user adds N beds to region R at month T):</h3>
        <div className="rounded-lg p-3 mb-3 font-mono text-[11px] space-y-1" style={{ background: 'var(--color-light-bg)', color: 'var(--color-text)' }}>
          <p>new_beds = forecast_beds_R_T + N</p>
          <p>new_occupancy = (forecast_visitors_R_T &times; avg_stay) / (new_beds &times; days_in_month) &times; 100</p>
          <p>new_visitors_per_bed = forecast_visitors_R_T / new_beds</p>
          <p>new_CAI = new_beds / (forecast_visitors_R_T &times; avg_stay)</p>
          <p>&rarr; Reclassify using CAI/OPI thresholds &rarr; Recompute priority score</p>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Demand Scenario (user applies X% change to visitors):</h3>
        <div className="rounded-lg p-3 mb-4 font-mono text-[11px] space-y-1" style={{ background: 'var(--color-light-bg)', color: 'var(--color-text)' }}>
          <p>new_visitors = forecast_visitors_R_T &times; (1 + X/100)</p>
          <p>new_occupancy = (new_visitors &times; avg_stay) / (forecast_beds_R_T &times; days_in_month) &times; 100</p>
          <p>new_visitors_per_bed = new_visitors / forecast_beds_R_T</p>
          <p>&rarr; Reclassify &rarr; Recompute priority score</p>
        </div>

        <p className="text-[13px] leading-[1.7] mb-3" style={{ color: 'var(--color-text)' }}>
          All simulations compare the scenario result against the forecast baseline for the same period,
          not against current observed values. The dashboard displays baseline, scenario, and delta side by side.
        </p>

        <div className="rounded-lg p-3" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text)' }}>
            <strong>Open question:</strong> The simulation assumes <code className="text-[10px] px-1 rounded" style={{ background: 'white' }}>avg_stay</code> (average
            length of stay in nights) is constant across scenarios. Should we allow the user to modify
            this parameter too, or keep it fixed as a simplification for the PoC?
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Methodology Proposal &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: PROPHET CONFIGURATION ── */
export function DocMethodologyProposalP3() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>4. Prophet Model Configuration</h3>

        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Parameter</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Value</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Rationale</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['growth', 'linear', 'No saturation cap within 12-month horizon'],
                ['changepoint_prior_scale', '0.05', 'Moderate flexibility. Tuned via cross-validation.'],
                ['changepoint_range', '0.9', 'Extended to detect post-COVID shifts'],
                ['seasonality_mode', 'multiplicative', 'Seasonal effects scale with tourism volume'],
                ['seasonality_prior_scale', '10', 'Default. Per-governorate validation.'],
                ['yearly_seasonality', 'True', 'Tourism is fundamentally seasonal'],
                ['weekly_seasonality', 'False', 'Not applicable at monthly granularity'],
                ['interval_width', '0.80', '80% confidence band for decision-support'],
                ['holidays', 'Custom Hijri', 'Ramadan, Eid al-Fitr, Eid al-Adha + JO public'],
              ].map(([param, value, rationale]) => (
                <tr key={param} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-mono font-medium" style={{ color: 'var(--color-primary)' }}>{param}</td>
                  <td className="py-1.5 px-3 font-mono">{value}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Data Preparation Strategy</h3>
        <div className="rounded-lg overflow-hidden border mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Scenario</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>Strategy</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['1-2 missing months', 'Linear interpolation'],
                ['3-6 consecutive gap', 'Seasonal naive (same month prior year, scaled)'],
                ['>6 month gap', 'Truncate series. Flag short-series protocol.'],
                ['COVID (Mar 2020-Jun 2021)', 'Mask as NaN if >=36mo non-COVID; else explicit changepoints'],
                ['Outliers', '3-sigma on seasonal residuals, manual review with MoTA'],
                ['>=36 months available', 'Full Prophet with yearly seasonality'],
                ['24-35 months', 'Relaxed seasonality_prior_scale = 15'],
                ['12-23 months', 'Trend-only + national seasonal overlay'],
                ['<12 months', 'No forecast. National share proxy.'],
              ].map(([scenario, strategy]) => (
                <tr key={scenario} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium">{scenario}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Evaluation Protocol</h3>
        <div className="text-[13px] leading-[1.7] space-y-2" style={{ color: 'var(--color-text)' }}>
          <p>
            <strong>Back-test:</strong> Train on all data except last 12 months. Forecast 12 months. Compare.
            National MAPE target: &le;20%.
          </p>
          <p>
            <strong>Cross-validation:</strong> Walk-forward with 24-month initial window, 6-month sliding steps.
            Produces 6-8 evaluation folds for robustness.
          </p>
          <p>
            <strong>Per-governorate metrics:</strong> MAPE for high-volume (&gt;50K/mo), MAE for low-volume (&lt;5K/mo),
            both for mid-range. WMAPE as supplementary fairness metric.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Methodology Proposal &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 4: FALLBACK + OPEN QUESTIONS ── */
export function DocMethodologyProposalP4() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>5. Fallback Strategy (If MAPE &gt; 20%)</h3>
        <div className="space-y-2 mb-5">
          {[
            { tier: '1', title: 'Parameter Tuning', desc: 'Grid search: changepoint_prior_scale [0.01, 0.05, 0.1, 0.5], toggle seasonality mode, adjust seasonality_prior_scale [1, 5, 10, 15].' },
            { tier: '2', title: 'Data Re-examination', desc: 'Switch COVID handling (mask vs changepoint). Check for reporting changes disguised as demand shifts. Re-examine imputations.' },
            { tier: '3', title: 'Model Augmentation', desc: 'Log-transform target variable. Add sub-annual seasonality (semi-annual for spring/autumn peaks).' },
            { tier: '4', title: 'Alternative Models', desc: 'Seasonal Naive as floor benchmark. Holt-Winters ETS via statsmodels. Same evaluation protocol applies.' },
          ].map(item => (
            <div key={item.tier} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--color-kinz-orange)' }}>{item.tier}</div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>6. Summary of All Open Questions</h3>
        <div className="rounded-lg p-4 flex-1" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[13px] leading-[1.8] space-y-2" style={{ color: 'var(--color-text)' }}>
            <p><strong>Indicators:</strong></p>
            <p className="pl-3">1. OPI weights: is 0.6 peak / 0.4 annual appropriate for Jordan?</p>
            <p className="pl-3">2. Peak definition: highest 3 consecutive months or highest 3 non-consecutive?</p>
            <p className="pl-3">3. GPI window: 3-year CAGR or 5-year to smooth COVID?</p>

            <p className="mt-2"><strong>Priority Score:</strong></p>
            <p className="pl-3">4. Should capacity gap weight higher than demand growth (both at 0.30)?</p>
            <p className="pl-3">5. Should accessibility weight increase if reliable transport data is available?</p>

            <p className="mt-2"><strong>Simulation:</strong></p>
            <p className="pl-3">6. Should avg_stay_nights be user-adjustable or fixed for the PoC?</p>

            <p className="mt-2"><strong>Prophet:</strong></p>
            <p className="pl-3">7. Run ARIMA/SARIMA as a benchmark alongside Prophet in the evaluation report?</p>
            <p className="pl-3">8. COVID masking window: is Mar 2020 to Jun 2021 the right boundary for Jordan?</p>
            <p className="pl-3">9. Coherence check (governorate sum vs national) sufficient, or implement hierarchical reconciliation?</p>

            <p className="mt-2"><strong>General:</strong></p>
            <p className="pl-3">10. Any Jordan-specific seasonality patterns beyond Ramadan/Eid to model?</p>
            <p className="pl-3">11. Publications of yours to reference in the proposal?</p>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Confidential</span>
          <span>Methodology Proposal &middot; Page 4</span>
        </div>
      </div>
    </div>
  );
}
