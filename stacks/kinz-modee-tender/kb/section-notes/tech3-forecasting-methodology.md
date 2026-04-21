# TECH-3: Tourism Demand Forecasting Methodology
## Subsystem B — AI-Assisted Analytics: Prophet-Based Forecasting Component

---

## 1. Data Preparation for Forecasting

### 1.1 Source Data Extraction

The forecasting pipeline consumes monthly tourism time series extracted from the cleaned PostgreSQL/PostGIS database (Subsystem A output). Two primary series types are forecast:

- **Visitor counts** (total arrivals by governorate, by month)
- **Site visit counts** (visits to specific tourism sites, by month)

The extraction query produces a table with three columns conforming to Prophet's required schema:

| Column | Type | Description |
|--------|------|-------------|
| `ds` | DATE | First day of each month (e.g., 2018-01-01) |
| `y` | FLOAT | Visitor count or site visit count for that month |
| `governorate` | TEXT | Governorate name (or "National" for aggregated series) |

National-level series are computed as the row-wise sum of all governorate series for each month, ensuring consistency between levels.

### 1.2 Handling Missing Values

Tourism data from MoTA/JTB will contain gaps, particularly for smaller governorates. The strategy is layered:

**Step 1 -- Identify gap type:**
- **Sporadic missing months** (1-2 non-consecutive months missing): Linear interpolation between neighboring months. This is appropriate because tourism demand changes gradually month-to-month outside of shocks.
- **Consecutive missing blocks** (3+ months): If the block is <= 6 months and falls within a period where we have the same months in adjacent years, apply seasonal naive imputation: fill with the value from the same month in the prior year, scaled by the year-over-year growth rate of the nearest available months.
- **Extended gaps** (> 6 consecutive months): Do not impute. Truncate the series to begin after the gap. If this leaves fewer than 24 observations, flag the governorate for the short-series protocol (Section 5.1).

**Step 2 -- Validate imputed values:**
- Imputed values must be non-negative (visitor counts cannot be negative).
- Imputed values are capped at 2x the maximum observed value for that governorate in the same calendar month across all available years. This prevents implausible fill-ins.
- All imputed data points are flagged in a metadata column (`is_imputed = TRUE`) so downstream consumers know which values are synthetic.

### 1.3 Handling Short Series

Some governorates (e.g., Tafilah, Mafraq) may have fewer than 36 months of usable data. Prophet technically requires a minimum of two seasonal cycles to fit yearly seasonality, meaning at least 24 monthly observations. Our protocol:

| Available Months | Action |
|-----------------|--------|
| >= 36 | Full Prophet model with yearly seasonality enabled |
| 24-35 | Prophet with yearly seasonality enabled but `seasonality_prior_scale` increased to 15 (weaker regularization, allowing the model to learn from limited seasonal evidence) |
| 12-23 | Disable yearly seasonality (`yearly_seasonality=False`). Fit trend-only Prophet. Supplement with national-level seasonal indices applied multiplicatively (hierarchical borrowing). |
| < 12 | Do not forecast. Report the governorate as "Insufficient Data" in outputs. Use national-level forecast with a regional share factor as a proxy. |

### 1.4 Outlier Detection and Treatment

Tourism time series in Jordan contain legitimate extreme values (Petra during peak season, Aqaba during summer) as well as true outliers (data entry errors, reporting anomalies). The approach:

1. **Compute seasonal residuals:** For each governorate, compute a 12-month centered moving average. Subtract it from the raw series to obtain deseasonalized residuals.
2. **Flag outliers:** Any residual exceeding 3 standard deviations from the residual mean is flagged.
3. **Manual review list:** Flagged points are presented to the MoTA data validation team. Points confirmed as errors are replaced with the seasonal moving average value. Points confirmed as real events (e.g., a major festival, a temporary site closure) are retained and optionally modeled as holidays/events.

This approach avoids silently removing legitimate peaks that are characteristic of tourism data.

### 1.5 COVID / Pandemic Period Handling

The COVID-19 period (approximately March 2020 through June 2021 in Jordan, with border closures and travel restrictions) represents a structural break, not a seasonal pattern. If included naively, Prophet will treat the collapse and recovery as part of the trend, distorting future forecasts. Our strategy:

**Option A (Primary) -- Mask and model as an outlier regime:**
- Define the COVID window as 2020-03-01 to 2021-06-30 (adjustable based on data inspection).
- Set these observations as `NaN` in the training data. Prophet handles missing values natively by ignoring them during likelihood computation while still fitting the trend through the gap.
- The advantage: the model learns the pre-COVID trend and the post-COVID recovery trajectory without being biased by the anomalous trough.

**Option B (Fallback) -- Explicit COVID changepoint:**
- If removing the COVID period leaves too large a gap (especially for shorter series), keep the data but add explicit changepoints at 2020-03-01 and 2021-07-01. This allows Prophet to model the sharp drop and recovery as trend changes rather than as seasonal signal.
- Additionally, the COVID months can be modeled as a custom "holiday" window with a negative effect, preventing the model from expecting similar drops in future years.

**Decision rule:** Use Option A when the series has >= 36 months of non-COVID data. Use Option B when removing COVID would leave < 24 usable observations.

### 1.6 Train/Test Split for Back-Testing

The RFP requires a 12-month hold-out back-test. The split is:

- **Training set:** All available data up to and including month T-12 (where T is the last available month).
- **Test set:** The final 12 months (T-11 through T).
- The model is trained on the training set and produces a 12-month-ahead forecast. This forecast is compared point-by-point against the test set to compute accuracy metrics.

For the official back-test reported to MoTA, this is a single fixed-origin evaluation. For internal model development, we use walk-forward validation (Section 3).

---

## 2. Prophet Model Configuration

### 2.1 Recommended Parameter Settings

The following configuration is tuned for monthly tourism demand in a country with strong seasonal patterns and potential structural changes:

```python
from prophet import Prophet

model = Prophet(
    # --- Trend ---
    growth='linear',                    # Linear trend (tourism grows linearly, not logistically)
    changepoint_prior_scale=0.05,       # Default. Controls trend flexibility.
    changepoint_range=0.9,              # Allow changepoints in first 90% of training data
    n_changepoints=25,                  # Number of potential changepoint locations

    # --- Seasonality ---
    yearly_seasonality=True,            # Critical for tourism (summer peaks, Ramadan effects)
    weekly_seasonality=False,           # Not applicable at monthly granularity
    daily_seasonality=False,            # Not applicable at monthly granularity
    seasonality_mode='multiplicative',  # Tourism seasonality scales with volume (see 2.2)
    seasonality_prior_scale=10,         # Default. Controls seasonal flexibility.

    # --- Uncertainty ---
    interval_width=0.80,                # 80% prediction interval
    uncertainty_samples=1000,           # Monte Carlo samples for interval estimation

    # --- Missing data ---
    # Prophet handles NaN natively -- no special parameter needed
)
```

**Rationale for key choices:**

- **`growth='linear'`**: Tourism demand in Jordan is not approaching a saturation cap within the PoC forecast horizon. A linear trend is simpler and more robust than logistic growth, which requires specifying a carrying capacity that we do not reliably know.
- **`changepoint_prior_scale=0.05`**: The default value provides moderate trend flexibility. We start here and tune via cross-validation (see Section 3). Higher values (0.1-0.5) risk overfitting to noise; lower values (0.001-0.01) produce overly rigid trends that miss real shifts.
- **`changepoint_range=0.9`**: Extended from the default 0.8 to allow detection of recent structural breaks (post-COVID recovery).
- **`seasonality_mode='multiplicative'`**: See Section 2.2.

### 2.2 Seasonality Mode: Multiplicative vs. Additive

For tourism data, **multiplicative** seasonality is the correct default. The reasoning:

- In a governorate receiving 100,000 visitors/month at baseline, a 30% summer peak means +30,000 visitors.
- If tourism grows and the baseline becomes 200,000 visitors/month, the same summer peak should be +60,000, not +30,000.
- Multiplicative mode captures this: seasonal effects are proportional to the trend level.

**Validation check:** During model development, we fit both modes and compare hold-out MAPE. If a specific governorate's additive model outperforms multiplicative (possible for very stable, low-volume governorates), we switch that governorate to additive.

### 2.3 Holiday and Event Effects

Jordan's tourism demand is influenced by several recurring events that do not align with fixed Gregorian calendar dates. Prophet's holiday feature handles this:

**Ramadan and Eid al-Fitr:**
- Ramadan shifts approximately 11 days earlier each Gregorian year. During Ramadan, domestic tourism patterns change (reduced daytime activity, increased evening/social tourism). International arrivals may dip.
- We pre-compute Ramadan dates for 2015-2028 using the Hijri calendar and add them as a custom holiday with a `lower_window=-30` (Ramadan duration) and `upper_window=3` (Eid al-Fitr).

```python
ramadan_dates = [
    {'holiday': 'ramadan', 'ds': '2023-03-23', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2024-03-11', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2025-03-01', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2026-02-18', 'lower_window': -30, 'upper_window': 3},
    # ... additional years as needed
]
model.add_country_holidays(country_name='JO')  # Adds Jordanian public holidays
```

**Eid al-Adha:**
- Major domestic travel period. Pre-computed similarly from Hijri calendar.

**Summer peak (July-August):**
- Not modeled as a holiday -- this is captured by yearly seasonality automatically.

**Geopolitical events / one-off shocks:**
- Not modeled as recurring holidays. These are handled via changepoints (Section 2.1) or the COVID protocol (Section 1.5).

**Jordanian public holidays via `add_country_holidays`:**
- Prophet includes a built-in Jordan holiday calendar (`country_name='JO'`). This covers Independence Day (May 25), King's Birthday, and other fixed holidays. These are added as a baseline, then supplemented with the Hijri-based events above.

### 2.4 Per-Governorate vs. National Model Strategy

We train **independent Prophet models per governorate** plus one national model. This is preferred over a single hierarchical model because:

1. **Different seasonality profiles:** Aqaba peaks in winter (warm-weather beach tourism); Petra peaks in spring/autumn (comfortable hiking temperatures); Amman is flatter (business travel + year-round urban tourism). A single model cannot capture these divergent patterns.
2. **Different trend dynamics:** Amman may grow steadily while a smaller governorate like Ajloun shows step-function growth after a new eco-tourism development.
3. **Simplicity and debuggability:** Independent models are easier to explain, tune, and debug -- critical for a PoC that must be transparent.

**Coherence check:** After producing all governorate-level forecasts, we sum them and compare against the independently-produced national forecast. If the discrepancy exceeds 10%, we investigate. For the PoC, we report both the bottom-up sum and the direct national forecast, noting any difference. Full hierarchical reconciliation (e.g., MinT optimal reconciliation) is documented as a future enhancement beyond the PoC scope.

---

## 3. Back-Testing and Evaluation Protocol

### 3.1 Walk-Forward Cross-Validation

Beyond the single 12-month hold-out required by the RFP, we perform walk-forward (expanding window) cross-validation to assess model robustness:

```python
from prophet.diagnostics import cross_validation, performance_metrics

# Walk-forward CV: 12-month forecast horizon, evaluated every 6 months,
# using at least 24 months of initial training data.
df_cv = cross_validation(
    model,
    initial='730 days',    # ~24 months minimum training window
    period='180 days',     # Slide the origin forward by 6 months each fold
    horizon='365 days'     # 12-month forecast horizon
)
df_metrics = performance_metrics(df_cv, rolling_window=1)
```

This produces multiple forecast origins, giving us a distribution of MAPE/MAE/RMSE values rather than a single point estimate. For a series spanning 2015-2025 (excluding COVID), this yields approximately 6-8 evaluation folds.

### 3.2 Metric Calculation Methodology

**MAPE (Mean Absolute Percentage Error):**

```
MAPE = (1/n) * SUM(|actual_i - forecast_i| / actual_i) * 100
```

- Computed over the 12 test months.
- The RFP target is MAPE <= 20% at the national level.
- Reported per governorate with no fixed threshold (acknowledged that low-volume governorates will have higher MAPE).

**MAE (Mean Absolute Error):**

```
MAE = (1/n) * SUM(|actual_i - forecast_i|)
```

- Reported in the same units as the data (visitor counts). This is more interpretable than MAPE for stakeholders: "on average, the forecast is off by X visitors per month."

**RMSE (Root Mean Squared Error):**

```
RMSE = SQRT((1/n) * SUM((actual_i - forecast_i)^2))
```

- Penalizes large errors more heavily than MAE. Useful for detecting months where the model dramatically fails.

**Weighted MAPE (WMAPE) -- supplementary metric:**

```
WMAPE = SUM(|actual_i - forecast_i|) / SUM(actual_i) * 100
```

- This is equivalent to a volume-weighted MAPE. It naturally down-weights low-volume months where a small absolute error produces a large percentage error. We report this alongside standard MAPE for a fairer picture.

### 3.3 Handling Low-Volume Governorates

Governorates with very low visitor counts (e.g., Mafraq receiving 500 visitors/month) produce misleading MAPE values -- an error of 100 visitors is 20% MAPE for Mafraq but only 0.1% for Amman. Our protocol:

1. **Report MAE alongside MAPE for all governorates.** For low-volume governorates, MAE is the primary metric discussed with stakeholders.
2. **Classify governorates by volume tier:**
   | Tier | Monthly Avg Visitors | Primary Metric |
   |------|---------------------|----------------|
   | High | > 50,000 | MAPE |
   | Medium | 5,000 - 50,000 | MAPE + MAE |
   | Low | < 5,000 | MAE + WMAPE |
3. **Use symmetric MAPE (sMAPE) as a robustness check** for low-volume series:
   ```
   sMAPE = (2/n) * SUM(|actual_i - forecast_i| / (|actual_i| + |forecast_i|)) * 100
   ```
   sMAPE is bounded between 0% and 200% and does not explode when actuals are near zero.

### 3.4 Visual Comparison Strategy

For each governorate and the national aggregate, the following plots are generated:

1. **Forecast vs. Actual (hold-out period):** Line chart showing the 12-month forecast (with 80% prediction interval as a shaded band) overlaid on actual values. This is the primary visual for evaluator review.

2. **Full history + forecast:** The complete historical series, the fitted model values, and the forward forecast on a single time axis. The COVID period (if masked) is shown as a gray shaded region.

3. **Seasonal decomposition:** Prophet's built-in `plot_components()` showing trend, yearly seasonality, and holiday effects separately. This demonstrates interpretability -- stakeholders can see that the model "understands" summer peaks, Ramadan dips, etc.

4. **Error distribution:** Histogram of forecast errors (actual - predicted) across the cross-validation folds. Should be centered near zero with reasonable spread. Skewness indicates systematic bias.

5. **Governorate comparison heatmap:** A matrix showing MAPE by governorate (rows) and forecast month (columns). This reveals whether errors are concentrated in specific months (e.g., shoulder seasons) or specific regions.

All plots are rendered using Matplotlib/Plotly and stored as static images in the reporting layer, plus interactive versions in the dashboard (Subsystem C).

---

## 4. Forecast Integration with Decision Support

### 4.1 Feeding Forecasts into Capacity Gap Indicators

The forecasting module (Subsystem B) produces the key input for the decision-support layer. The integration flow:

```
[Forecast: Visitors_next_12_months per governorate]
        |
        v
[Capacity Data: hotel_beds, site_capacity per governorate]
        |
        v
[Capacity Gap Indicator]
    = forecast_visitors / available_capacity
        |
        v
[Classification]
    Under-capacity:  ratio < 0.6  --> Opportunity for growth / marketing
    Balanced:        0.6 <= ratio <= 0.85  --> Maintain current investment
    Over-capacity:   ratio > 0.85 --> Infrastructure investment needed
```

Specific indicators computed from forecast outputs:

| Indicator | Formula | Unit |
|-----------|---------|------|
| Forecast Occupancy Pressure | `forecast_monthly_visitors / (hotel_beds * 30 * occupancy_factor)` | Ratio (0-1+) |
| Visitors-per-Bed Ratio | `forecast_annual_visitors / total_beds` | Visitors/bed/year |
| Demand Growth Rate | `(forecast_Y2 - actual_Y1) / actual_Y1` | Percentage |
| Peak-to-Trough Ratio | `max(forecast_monthly) / min(forecast_monthly)` | Ratio |
| Seasonality Intensity Index | Standard deviation of monthly forecast / mean of monthly forecast | Coefficient of variation |

These indicators are computed for each governorate and stored alongside the raw forecasts.

### 4.2 What-If Simulation Using Forecast Baselines

The dashboard (Subsystem C) provides a what-if simulation capability. The forecast serves as the **baseline scenario** against which interventions are measured:

**Scenario examples:**

1. **"What if visitor growth is 20% higher than forecast?"**
   - Apply a 1.20 multiplier to the forecast series.
   - Recompute all capacity gap indicators.
   - Show which governorates tip from "Balanced" to "Over-capacity" under this scenario.

2. **"What if a new 500-bed hotel is built in Aqaba?"**
   - Add 500 to Aqaba's `hotel_beds` capacity.
   - Recompute Aqaba's occupancy pressure and classification.
   - No change to the forecast itself -- only the capacity denominator changes.

3. **"What if we extend the forecast horizon to 24 months?"**
   - Re-run Prophet with `periods=24`.
   - Show the wider prediction intervals and caveats about increased uncertainty.

**Implementation:** The what-if layer does NOT retrain Prophet. It applies algebraic transformations to the stored forecast baseline and capacity parameters. This keeps simulation response times under 2 seconds (interactive).

### 4.3 Storage Schema for Forecast Outputs

All forecast results are persisted in PostgreSQL for consumption by the dashboard and for auditability.

**Table: `forecast_results`**

```sql
CREATE TABLE forecast_results (
    id                  SERIAL PRIMARY KEY,
    model_run_id        UUID NOT NULL,              -- Links to a specific model execution
    governorate         VARCHAR(50) NOT NULL,       -- Governorate name or 'National'
    forecast_date       DATE NOT NULL,              -- The month being forecast (ds)
    forecast_value      NUMERIC(12,2) NOT NULL,     -- Point forecast (yhat)
    forecast_lower      NUMERIC(12,2),              -- Lower bound of prediction interval
    forecast_upper      NUMERIC(12,2),              -- Upper bound of prediction interval
    forecast_horizon    INT NOT NULL,               -- Months ahead (1-24)
    created_at          TIMESTAMP DEFAULT NOW(),
    UNIQUE(model_run_id, governorate, forecast_date)
);
```

**Table: `forecast_model_runs`**

```sql
CREATE TABLE forecast_model_runs (
    model_run_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_type            VARCHAR(20) NOT NULL,       -- 'backtest' or 'production'
    training_end_date   DATE NOT NULL,              -- Last date in training data
    forecast_horizon    INT NOT NULL,               -- 6, 12, or 24 months
    prophet_config      JSONB NOT NULL,             -- Full parameter snapshot
    national_mape       NUMERIC(5,2),               -- Back-test MAPE at national level
    created_at          TIMESTAMP DEFAULT NOW(),
    created_by          VARCHAR(100) DEFAULT 'system'
);
```

**Table: `forecast_accuracy`**

```sql
CREATE TABLE forecast_accuracy (
    id                  SERIAL PRIMARY KEY,
    model_run_id        UUID NOT NULL REFERENCES forecast_model_runs(model_run_id),
    governorate         VARCHAR(50) NOT NULL,
    mape                NUMERIC(6,2),               -- Percentage
    mae                 NUMERIC(12,2),              -- Absolute units
    rmse                NUMERIC(12,2),              -- Absolute units
    wmape               NUMERIC(6,2),               -- Weighted MAPE
    evaluation_type     VARCHAR(20) NOT NULL,       -- 'holdout' or 'cv_fold_N'
    created_at          TIMESTAMP DEFAULT NOW()
);
```

**Table: `capacity_gap_indicators`**

```sql
CREATE TABLE capacity_gap_indicators (
    id                      SERIAL PRIMARY KEY,
    model_run_id            UUID NOT NULL REFERENCES forecast_model_runs(model_run_id),
    governorate             VARCHAR(50) NOT NULL,
    forecast_month          DATE NOT NULL,
    occupancy_pressure      NUMERIC(6,4),
    visitors_per_bed        NUMERIC(10,2),
    demand_growth_rate      NUMERIC(6,4),
    capacity_classification VARCHAR(20),            -- 'under', 'balanced', 'over'
    created_at              TIMESTAMP DEFAULT NOW()
);
```

**Indexing strategy:**
- B-tree index on `(model_run_id, governorate)` for all tables.
- B-tree index on `forecast_date` for time-range queries.
- The `model_run_id` as UUID enables full traceability: any forecast displayed in the dashboard can be traced back to the exact model configuration and training data that produced it.

---

## 5. Risk Mitigation

### 5.1 Insufficient Data for a Governorate

**Trigger:** Fewer than 24 months of non-missing, non-COVID data after cleaning.

**Graduated response:**

| Data Available | Strategy |
|----------------|----------|
| 12-23 months | Trend-only Prophet (no yearly seasonality). Apply national seasonal pattern as a multiplicative overlay. Report with "Limited Data" warning. |
| < 12 months | No governorate-level forecast. Use national forecast multiplied by the governorate's historical share of national visitors (e.g., if Tafilah historically accounts for 2.1% of national visitors, its proxy forecast = national_forecast * 0.021). Report with "Proxy Estimate" warning. |
| No data | Report "No Data Available." Display the governorate on the map with a distinct visual indicator (gray/hatched). |

All proxy estimates and limited-data forecasts are clearly labeled in both the database (`forecast_model_runs.prophet_config` includes a `data_sufficiency` flag) and the dashboard UI.

### 5.2 Communicating Forecast Uncertainty to Non-Technical Users

The dashboard presents uncertainty in three accessible ways:

1. **Traffic-light confidence indicator:**
   - Green: Model MAPE < 15% on back-test, long training series, stable patterns.
   - Yellow: MAPE 15-25%, or short training series, or post-COVID recovery still volatile.
   - Red: MAPE > 25%, or proxy estimate, or known data quality issues.

   Displayed as a colored badge next to each governorate's forecast on the map and in tables.

2. **Plain-language range:**
   Instead of "80% prediction interval [45,000 - 62,000]", display:
   > "We expect approximately 53,000 visitors, likely between 45,000 and 62,000."

3. **Scenario framing:**
   The what-if panel lets users intuitively explore "what if actual demand is higher/lower than forecast" without needing to understand statistical intervals.

**What we explicitly avoid:** Showing p-values, confidence level percentages, or statistical jargon in the default dashboard view. A "Technical Details" expandable panel is available for data-literate users.

### 5.3 Fallback Strategies if Prophet Underperforms

If Prophet's back-test MAPE exceeds 20% at the national level or produces clearly implausible forecasts for key governorates:

**Tier 1 -- Parameter tuning (first response):**
- Grid search over `changepoint_prior_scale` in [0.01, 0.05, 0.1, 0.5].
- Toggle `seasonality_mode` between additive and multiplicative.
- Adjust `seasonality_prior_scale` in [1, 5, 10, 15].
- Test removing Ramadan/Eid holidays if their effect is ambiguous.

**Tier 2 -- Data re-examination:**
- Re-inspect the COVID handling. Try switching between Option A and Option B.
- Check for data quality issues that survived the cleaning pipeline (sudden level shifts suggesting a reporting change, not a real demand change).
- Re-examine the imputation of missing values.

**Tier 3 -- Model augmentation (within RFP constraints):**
- Apply a log transformation to the target variable before fitting Prophet. This can stabilize variance in multiplicative series and sometimes improves MAPE.
- Use Prophet's built-in `add_seasonality()` to model sub-annual patterns (e.g., a semi-annual component if Petra has distinct spring and autumn peaks).

**Tier 4 -- Alternative baseline models (if Prophet fundamentally fails):**
- **Seasonal Naive:** Forecast = same month last year. This is the simplest possible seasonal model and serves as a floor -- if Prophet cannot beat seasonal naive, there is likely a data problem, not a model problem.
- **Exponential Smoothing (ETS):** The `statsmodels` implementation of Holt-Winters exponential smoothing is a well-understood univariate method. It satisfies the RFP constraints (no deep learning, no multivariate, interpretable).
- Note: Any alternative model must still go through the same back-test and evaluation protocol.

**Escalation path:** If no univariate model achieves MAPE <= 20% at the national level, this is documented as a finding and discussed with MoTA. Possible causes (e.g., post-COVID demand has no established seasonal pattern yet) are presented transparently. The PoC recommendation would then include a plan for re-evaluation once 24+ months of post-COVID data are available.

---

## 6. Recommended Prophet Pipeline (Pseudocode)

```python
"""
Tourism Demand Forecasting Pipeline
====================================
End-to-end: data extraction --> model training --> back-test --> production forecast --> storage

Dependencies: prophet, pandas, sqlalchemy, numpy
"""

import pandas as pd
import numpy as np
from prophet import Prophet
from prophet.diagnostics import cross_validation, performance_metrics
from sqlalchemy import create_engine
import uuid
from datetime import datetime

# ─────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────

DB_URI = "postgresql://user:pass@host:5432/aigis"
FORECAST_HORIZON = 12       # months (user-configurable: 6, 12, 24)
COVID_START = "2020-03-01"
COVID_END   = "2021-06-30"
MIN_OBSERVATIONS = 24       # minimum usable months for full Prophet model
MAPE_TARGET = 20.0          # RFP requirement (national level)

PROPHET_PARAMS = {
    'growth': 'linear',
    'changepoint_prior_scale': 0.05,
    'changepoint_range': 0.9,
    'n_changepoints': 25,
    'yearly_seasonality': True,
    'weekly_seasonality': False,
    'daily_seasonality': False,
    'seasonality_mode': 'multiplicative',
    'seasonality_prior_scale': 10,
    'interval_width': 0.80,
    'uncertainty_samples': 1000,
}

JORDAN_HOLIDAYS = pd.DataFrame([
    # Ramadan (approximate start dates -- Hijri-derived)
    {'holiday': 'ramadan', 'ds': '2018-05-16', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2019-05-06', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2022-04-02', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2023-03-23', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2024-03-11', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2025-03-01', 'lower_window': -30, 'upper_window': 3},
    {'holiday': 'ramadan', 'ds': '2026-02-18', 'lower_window': -30, 'upper_window': 3},
    # Eid al-Adha
    {'holiday': 'eid_al_adha', 'ds': '2023-06-28', 'lower_window': 0, 'upper_window': 4},
    {'holiday': 'eid_al_adha', 'ds': '2024-06-17', 'lower_window': 0, 'upper_window': 4},
    {'holiday': 'eid_al_adha', 'ds': '2025-06-07', 'lower_window': 0, 'upper_window': 4},
    {'holiday': 'eid_al_adha', 'ds': '2026-05-27', 'lower_window': 0, 'upper_window': 4},
])


# ─────────────────────────────────────────────
# STEP 1: DATA EXTRACTION
# ─────────────────────────────────────────────

def extract_time_series(engine):
    """
    Pull monthly visitor counts per governorate from the cleaned database.
    Returns dict: {governorate_name: pd.DataFrame with columns [ds, y]}
    """
    query = """
        SELECT
            date_trunc('month', visit_date)::date AS ds,
            governorate,
            SUM(visitor_count) AS y
        FROM tourism_visits_cleaned
        GROUP BY 1, 2
        ORDER BY 2, 1
    """
    df = pd.read_sql(query, engine)

    series_dict = {}
    for gov in df['governorate'].unique():
        gov_df = df[df['governorate'] == gov][['ds', 'y']].copy()
        gov_df = gov_df.sort_values('ds').reset_index(drop=True)
        series_dict[gov] = gov_df

    # National aggregate
    national = df.groupby('ds')['y'].sum().reset_index()
    series_dict['National'] = national

    return series_dict


# ─────────────────────────────────────────────
# STEP 2: DATA CLEANING & PREPARATION
# ─────────────────────────────────────────────

def prepare_series(df, governorate_name):
    """
    Handle missing values, COVID masking, and outlier treatment.
    Returns cleaned DataFrame and a metadata dict.
    """
    metadata = {
        'governorate': governorate_name,
        'raw_observations': len(df),
        'covid_handling': None,
        'data_sufficiency': 'full',
    }

    # Ensure complete monthly index (fill implicit gaps)
    full_idx = pd.date_range(df['ds'].min(), df['ds'].max(), freq='MS')
    df = df.set_index('ds').reindex(full_idx).rename_axis('ds').reset_index()

    # Mark COVID period
    covid_mask = (df['ds'] >= COVID_START) & (df['ds'] <= COVID_END)
    non_covid_count = df[~covid_mask]['y'].notna().sum()

    # COVID handling decision
    if non_covid_count >= MIN_OBSERVATIONS:
        # Option A: mask COVID as NaN
        df.loc[covid_mask, 'y'] = np.nan
        metadata['covid_handling'] = 'masked'
    else:
        # Option B: keep COVID data, rely on changepoints
        metadata['covid_handling'] = 'changepoint'

    # Interpolate sporadic gaps (1-2 months)
    df['y'] = df['y'].interpolate(method='linear', limit=2)

    # Flag remaining NaN count for sufficiency check
    usable = df['y'].notna().sum()
    if usable < 12:
        metadata['data_sufficiency'] = 'insufficient'
    elif usable < MIN_OBSERVATIONS:
        metadata['data_sufficiency'] = 'limited'

    # Outlier detection (3-sigma on seasonal residuals)
    if usable >= 12:
        rolling_mean = df['y'].rolling(12, center=True, min_periods=6).mean()
        residuals = df['y'] - rolling_mean
        std = residuals.std()
        outlier_mask = residuals.abs() > 3 * std
        # Flag but do not auto-remove (logged for manual review)
        metadata['outlier_months'] = df.loc[outlier_mask, 'ds'].tolist()

    return df, metadata


# ─────────────────────────────────────────────
# STEP 3: MODEL TRAINING
# ─────────────────────────────────────────────

def build_model(df, metadata):
    """
    Configure and fit Prophet model based on data sufficiency.
    """
    params = PROPHET_PARAMS.copy()

    # Adjust for limited data
    if metadata['data_sufficiency'] == 'limited':
        params['yearly_seasonality'] = False
        params['seasonality_prior_scale'] = 15

    # Add explicit COVID changepoints if using Option B
    if metadata['covid_handling'] == 'changepoint':
        params['changepoints'] = [COVID_START, COVID_END]

    model = Prophet(
        holidays=JORDAN_HOLIDAYS,
        **params
    )

    # Add Jordan country holidays
    model.add_country_holidays(country_name='JO')

    # Fit on non-NaN data (Prophet handles NaN internally)
    train_df = df[['ds', 'y']].copy()
    model.fit(train_df)

    return model


# ─────────────────────────────────────────────
# STEP 4: BACK-TEST EVALUATION
# ─────────────────────────────────────────────

def backtest(model, df, horizon_months=12):
    """
    Hold-out back-test: train on all-but-last-N, forecast N months, compute metrics.
    """
    cutoff = df['ds'].max() - pd.DateOffset(months=horizon_months)
    train = df[df['ds'] <= cutoff].copy()
    test = df[df['ds'] > cutoff].dropna(subset=['y']).copy()

    # Retrain on truncated data
    model_bt = build_model(train, {'data_sufficiency': 'full', 'covid_handling': 'masked'})

    future = model_bt.make_future_dataframe(periods=horizon_months, freq='MS')
    forecast = model_bt.predict(future)

    # Merge forecast with actuals
    merged = test.merge(
        forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']],
        on='ds', how='inner'
    )

    if len(merged) == 0:
        return None

    # Compute metrics
    actual = merged['y'].values
    predicted = merged['yhat'].values

    mape = np.mean(np.abs((actual - predicted) / actual)) * 100
    mae = np.mean(np.abs(actual - predicted))
    rmse = np.sqrt(np.mean((actual - predicted) ** 2))
    wmape = np.sum(np.abs(actual - predicted)) / np.sum(actual) * 100

    return {
        'mape': round(mape, 2),
        'mae': round(mae, 2),
        'rmse': round(rmse, 2),
        'wmape': round(wmape, 2),
        'forecast_vs_actual': merged,
    }


# ─────────────────────────────────────────────
# STEP 5: WALK-FORWARD CROSS-VALIDATION
# ─────────────────────────────────────────────

def walk_forward_cv(model):
    """
    Prophet's built-in cross-validation for robustness assessment.
    """
    df_cv = cross_validation(
        model,
        initial='730 days',
        period='180 days',
        horizon='365 days'
    )
    df_metrics = performance_metrics(df_cv, rolling_window=1)
    return df_cv, df_metrics


# ─────────────────────────────────────────────
# STEP 6: PRODUCTION FORECAST
# ─────────────────────────────────────────────

def generate_forecast(model, horizon_months):
    """
    Produce forward-looking forecast from the fully trained model.
    """
    future = model.make_future_dataframe(periods=horizon_months, freq='MS')
    forecast = model.predict(future)

    # Extract only future periods
    last_training_date = model.history['ds'].max()
    forecast_only = forecast[forecast['ds'] > last_training_date].copy()

    return forecast_only[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]


# ─────────────────────────────────────────────
# STEP 7: STORE RESULTS
# ─────────────────────────────────────────────

def store_results(engine, governorate, forecast_df, metrics, model_run_id, run_type):
    """
    Persist forecast and accuracy metrics to PostgreSQL.
    """
    # Store forecast values
    for i, row in forecast_df.iterrows():
        engine.execute("""
            INSERT INTO forecast_results
                (model_run_id, governorate, forecast_date, forecast_value,
                 forecast_lower, forecast_upper, forecast_horizon)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            model_run_id, governorate, row['ds'],
            row['yhat'], row['yhat_lower'], row['yhat_upper'],
            i + 1
        ))

    # Store accuracy metrics
    if metrics:
        engine.execute("""
            INSERT INTO forecast_accuracy
                (model_run_id, governorate, mape, mae, rmse, wmape, evaluation_type)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            model_run_id, governorate,
            metrics['mape'], metrics['mae'], metrics['rmse'], metrics['wmape'],
            'holdout'
        ))


# ─────────────────────────────────────────────
# STEP 8: ORCHESTRATOR (MAIN PIPELINE)
# ─────────────────────────────────────────────

def run_pipeline():
    """
    End-to-end execution: extract -> clean -> train -> evaluate -> forecast -> store.
    """
    engine = create_engine(DB_URI)
    model_run_id = str(uuid.uuid4())

    # Extract all series
    series_dict = extract_time_series(engine)

    results_summary = {}

    for gov_name, raw_df in series_dict.items():
        print(f"\n{'='*50}")
        print(f"Processing: {gov_name}")
        print(f"{'='*50}")

        # Step 2: Clean and prepare
        clean_df, metadata = prepare_series(raw_df, gov_name)

        if metadata['data_sufficiency'] == 'insufficient':
            print(f"  SKIP: Insufficient data ({clean_df['y'].notna().sum()} months)")
            results_summary[gov_name] = {'status': 'insufficient_data'}
            continue

        # Step 3: Train
        model = build_model(clean_df, metadata)

        # Step 4: Back-test
        metrics = backtest(model, clean_df, horizon_months=FORECAST_HORIZON)
        if metrics:
            print(f"  Back-test MAPE: {metrics['mape']}%")
            print(f"  Back-test MAE:  {metrics['mae']}")
            print(f"  Back-test RMSE: {metrics['rmse']}")

        # Step 6: Production forecast
        forecast_df = generate_forecast(model, FORECAST_HORIZON)

        # Step 7: Store
        store_results(engine, gov_name, forecast_df, metrics, model_run_id, 'production')

        results_summary[gov_name] = {
            'status': 'ok',
            'data_sufficiency': metadata['data_sufficiency'],
            'covid_handling': metadata['covid_handling'],
            'mape': metrics['mape'] if metrics else None,
        }

    # ── NATIONAL-LEVEL CHECK ──
    national_metrics = results_summary.get('National', {})
    national_mape = national_metrics.get('mape')

    if national_mape and national_mape <= MAPE_TARGET:
        print(f"\n  PASS: National MAPE = {national_mape}% (<= {MAPE_TARGET}%)")
    elif national_mape:
        print(f"\n  WARNING: National MAPE = {national_mape}% (> {MAPE_TARGET}%)")
        print("  --> Initiating parameter tuning protocol (Tier 1)...")

    # Store model run metadata
    engine.execute("""
        INSERT INTO forecast_model_runs
            (model_run_id, run_type, training_end_date, forecast_horizon,
             prophet_config, national_mape)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        model_run_id, 'production',
        clean_df['ds'].max(),
        FORECAST_HORIZON,
        str(PROPHET_PARAMS),
        national_mape
    ))

    # ── SUMMARY REPORT ──
    print("\n" + "="*60)
    print("PIPELINE COMPLETE")
    print("="*60)
    print(f"Model Run ID:  {model_run_id}")
    print(f"Governorates:  {len(results_summary)}")
    print(f"National MAPE: {national_mape}%")

    ok_count = sum(1 for v in results_summary.values() if v['status'] == 'ok')
    skip_count = sum(1 for v in results_summary.values() if v['status'] == 'insufficient_data')
    print(f"Forecasted:    {ok_count}")
    print(f"Skipped:       {skip_count}")

    return results_summary


# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────

if __name__ == '__main__':
    run_pipeline()
```

---

## 7. Summary: Why This Approach Fits the PoC

| Requirement | How We Address It |
|-------------|-------------------|
| Univariate only | Prophet with no external regressors. Single input: monthly visitor counts. |
| Prophet required | Prophet is the primary model, configured specifically for Jordan tourism. |
| 12-month horizon | Default pipeline output. User can toggle to 6 or 24 months via dashboard. |
| MAPE <= 20% national | Back-test protocol validates this before production deployment. Tuning tiers if not met. |
| Governorate-level reporting | Independent model per governorate with per-region accuracy metrics. |
| No deep learning | No LSTM, no neural networks. Prophet uses decomposable additive/multiplicative components. |
| Interpretable | Prophet's component plots show trend, seasonality, and holiday effects separately. |
| Reproducible | Full parameter snapshot stored with every model run. UUID-based traceability. |
| PostgreSQL/PostGIS | All outputs stored in normalized PostgreSQL tables with spatial join capability. |
| COVID handling | Dual strategy (mask or changepoint) based on data availability. |
| Limited data handling | Graduated response from full model to trend-only to national-share proxy. |
| Uncertainty communication | Traffic-light badges, plain-language ranges, what-if scenarios. |
| 6-month PoC timeline | Pipeline is implementable in 3-4 weeks of the analytics phase. No over-engineering. |
