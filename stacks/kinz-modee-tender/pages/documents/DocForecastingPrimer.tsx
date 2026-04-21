import kinzIcon from '../../assets/KinzIcon.png';

/* ── PAGE 1: WHAT IS FORECASTING ── */
export function DocForecastingPrimerP1() {
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
                Forecasting Primer
              </h1>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Internal Knowledge Brief &middot; The "AI" in AI-GIS, Explained Simply
              </p>
            </div>
          </div>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>What is Time-Series Forecasting?</h3>

        <div className="text-[13px] leading-[1.7] space-y-3" style={{ color: 'var(--color-text)' }}>
          <p>
            Imagine you have a spreadsheet with monthly visitor counts for Petra over the last 5 years.
            You can see patterns: <strong>summer is always busy, winter is quiet, and every year the
            numbers grow a bit</strong>. Forecasting is simply teaching a computer to recognize those
            patterns and project them forward: "based on what happened before, here&apos;s what we expect
            for the next 12 months."
          </p>

          <p>
            That&apos;s it. No magic. The "AI" in AI-GIS is really just <strong>pattern recognition on
            historical numbers</strong>. The computer looks at the past, finds repeating trends, and
            extends them into the future.
          </p>

          <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>The analogy:</p>
            <p style={{ color: 'var(--color-text-muted)' }}>
              If you&apos;ve ever looked at your company&apos;s revenue chart and said "we usually spike in
              Q4, so I expect next Q4 will spike too, probably a bit higher than last year," you just
              did forecasting in your head. Prophet does the same thing, just more precisely and
              consistently across hundreds of data points.
            </p>
          </div>
        </div>

        <h3 className="text-sm font-bold mt-5 mb-3" style={{ color: 'var(--color-text)' }}>What Does a Forecast Actually Look Like?</h3>

        <div className="text-[13px] leading-[1.7] space-y-3" style={{ color: 'var(--color-text)' }}>
          <p>A forecast produces three things:</p>

          <div className="space-y-2">
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--color-kinz-blue)' }}>1</div>
              <div>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>The prediction</p>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  "We expect 45,000 visitors to Aqaba in July 2027." This is the best guess, the
                  single most likely number.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--color-kinz-green)' }}>2</div>
              <div>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>The range (confidence interval)</p>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  "Probably between 38,000 and 52,000." This is the honest uncertainty band. The further
                  into the future, the wider this band gets, because we&apos;re less certain.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: 'var(--color-kinz-orange)' }}>3</div>
              <div>
                <p className="font-bold" style={{ color: 'var(--color-text)' }}>The breakdown</p>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  "The 45,000 is made up of: a long-term growth trend (+5% per year) combined with a
                  seasonal summer peak (+30% in July)." This is the interpretability: you can see
                  <em> why</em> the model predicts what it predicts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 2: WHY PROPHET + HOW IT WORKS ── */
export function DocForecastingPrimerP2() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>What is Prophet?</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            Prophet is an open-source forecasting tool built by Facebook (Meta). Think of it as a
            <strong> smart calculator</strong> that takes a column of dates and a column of numbers,
            and figures out the pattern automatically. It was designed for exactly the kind of data
            we have: monthly business metrics with seasonal patterns.
          </p>

          <p>Prophet breaks every time series into <strong>three ingredients</strong>:</p>
        </div>

        <div className="space-y-3 mb-5">
          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>1. Trend: "Where is the line going?"</p>
            <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
              Is tourism in Jordan growing, flat, or declining overall? The trend captures the
              long-term direction. Think of drawing a best-fit line through your data; that&apos;s the
              trend. Prophet can also detect <strong>changepoints</strong>: moments where the trend
              shifted (e.g., tourism dropped in 2020 due to COVID, then recovered on a new trajectory).
            </p>
          </div>

          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-green)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>2. Seasonality: "What repeats every year?"</p>
            <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
              Petra is busy in April and October, quiet in January. Aqaba peaks in summer. These
              yearly patterns repeat reliably. Prophet learns them automatically from the historical data.
              <strong> This is the most important ingredient for tourism data</strong>, because tourism is
              inherently seasonal.
            </p>
          </div>

          <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-orange)', background: 'var(--color-light-bg)' }}>
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>3. Holidays/Events: "What special days cause spikes or dips?"</p>
            <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
              Ramadan shifts ~11 days earlier each year. Eid al-Adha causes domestic travel surges.
              These don&apos;t fall on the same date every year, so Prophet handles them separately from
              regular seasonality. We pre-program the Hijri calendar dates so the model knows when
              Ramadan occurs each year.
            </p>
          </div>
        </div>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-dark)', color: 'white' }}>
          <p className="text-sm font-bold mb-2">The formula (simplified):</p>
          <p className="text-[13px] font-mono text-center py-2 text-white/80">
            Forecast = Trend × Seasonality × Holiday Effect
          </p>
          <p className="text-xs text-white/50 text-center mt-1">
            (We use multiplicative mode: seasonal effects scale with the trend level)
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 2</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 3: WHY PROPHET OVER ALTERNATIVES + WHAT COULD GO WRONG ── */
export function DocForecastingPrimerP3() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Why Prophet and Not Something Else?</h3>

        <div className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          <p>The RFP allows Prophet or ARIMA. Here&apos;s the comparison in plain terms:</p>
        </div>

        <div className="rounded-lg overflow-hidden border mb-5" style={{ borderColor: 'var(--color-border)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}></th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-primary)' }}>Prophet</th>
                <th className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--color-text)' }}>ARIMA</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--color-text)' }}>
              {[
                ['Handles missing data', 'Yes, natively', 'No; needs complete series'],
                ['Handles Ramadan (moving dates)', 'Yes, built-in holiday feature', 'Manual workaround needed'],
                ['Setup complexity', 'Minimal tuning needed', 'Requires careful parameter selection (p,d,q)'],
                ['Explainability', 'Shows trend + season + holidays separately', 'Less intuitive decomposition'],
                ['Accuracy', 'Very good for monthly data', 'Similar, sometimes slightly better'],
                ['Best for', 'Business data with strong seasonality', 'Stationary or simple data'],
              ].map(([aspect, prophet, arima]) => (
                <tr key={aspect} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="py-1.5 px-3 font-medium">{aspect}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-primary)' }}>{prophet}</td>
                  <td className="py-1.5 px-3" style={{ color: 'var(--color-text-muted)' }}>{arima}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg p-4 mb-5" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
            <strong>Bottom line:</strong> Prophet wins for our use case because tourism data has strong
            seasonality, moving Islamic holidays, and likely missing data in some governorates. Prophet
            handles all three natively. ARIMA would require more manual engineering for the same result.
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>How Do We Know If the Forecast Is Good?</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            We use <strong>back-testing</strong>. Think of it like this: we pretend it&apos;s 12 months ago.
            We hide the last 12 months of real data, ask the model to predict them, then compare the
            predictions against what actually happened.
          </p>

          <p>The main accuracy metric is <strong>MAPE</strong> (Mean Absolute Percentage Error):</p>
        </div>

        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-dark)', color: 'white' }}>
          <p className="text-[13px] text-center py-1">
            If actual visitors = 50,000 and we predicted 45,000
          </p>
          <p className="text-[13px] text-center py-1">
            Error = |50,000 - 45,000| / 50,000 = <strong>10%</strong>
          </p>
          <p className="text-[13px] text-center py-1 text-white/50">
            MAPE averages this across all 12 test months. The RFP requires MAPE ≤ 20%.
          </p>
        </div>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
            <strong>In plain terms:</strong> a MAPE of 15% means "on average, our monthly predictions
            are off by about 15% from reality." For tourism forecasting with monthly data, anything
            under 20% is considered good. Under 10% is excellent.
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 3</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 4: WHAT CAN GO WRONG + KEY TERMS ── */
export function DocForecastingPrimerP4() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>What Can Go Wrong? (And What We Do About It)</h3>

        <div className="space-y-3 mb-5">
          {[
            { problem: 'Not enough history for a governorate', example: 'Mafraq has only 18 months of data', solution: 'We use a simplified model for that region, or borrow patterns from the national trend and scale them down. The dashboard clearly labels these as "limited data" forecasts.' },
            { problem: 'COVID broke the pattern', example: 'Tourism crashed in 2020-2021, making the historical data messy', solution: 'We mask the COVID period by telling the model to ignore it. This way it learns the normal pattern, not the pandemic anomaly. For regions with very short pre-COVID data, we use a different technique (explicit changepoints).' },
            { problem: 'A small governorate has wild MAPE', example: 'Tafilah gets 500 visitors/month, so being off by 100 visitors is 20% MAPE', solution: 'For small regions, we switch to MAE (Mean Absolute Error) which tells you "off by 100 visitors" instead of a misleading percentage. We classify governorates into volume tiers and use the right metric for each.' },
            { problem: 'Prophet just doesn\'t work well for a region', example: 'MAPE exceeds 20% even after tuning', solution: 'We have a 4-tier fallback: (1) tune parameters, (2) re-examine data quality, (3) try log-transforming the data, (4) switch to an alternative model like Exponential Smoothing. If nothing works, we document why and recommend waiting for more data.' },
          ].map(item => (
            <div key={item.problem} className="rounded-lg p-4 border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--color-kinz-red)' }}>{item.problem}</p>
              <p className="text-xs italic mt-1 mb-2" style={{ color: 'var(--color-text-muted)' }}>Example: {item.example}</p>
              <p className="text-[13px]" style={{ color: 'var(--color-text)' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Our response:</strong> {item.solution}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>What Forecasting Does NOT Do</h3>

        <div className="rounded-lg p-4" style={{ background: 'var(--color-light-bg)' }}>
          <div className="text-[13px] leading-[1.7] space-y-2" style={{ color: 'var(--color-text)' }}>
            <p>&bull; It does <strong>not</strong> predict unexpected events (wars, pandemics, political crises)</p>
            <p>&bull; It does <strong>not</strong> factor in external data (airline routes, marketing campaigns, new attractions)</p>
            <p>&bull; It does <strong>not</strong> guarantee accuracy; it gives the best statistical estimate based on past patterns</p>
            <p>&bull; It <strong>does</strong> give you a structured, consistent, reproducible baseline that is far better than gut feeling or no forecast at all</p>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 4</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 5: GLOSSARY ── */
export function DocForecastingPrimerP5() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Key Terms: Quick Reference</h3>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          These terms will come up in meetings with Dr. Al Hijawi and in the tender evaluation.
          Here&apos;s what each one means in plain language:
        </p>

        <div className="space-y-2 flex-1">
          {[
            { term: 'Prophet', def: 'An open-source forecasting tool by Facebook. Takes dates + numbers, finds patterns, projects forward. Our chosen method.' },
            { term: 'ARIMA', def: 'An older forecasting method. More manual setup, less tolerant of messy data. The alternative we could have used but didn\'t.' },
            { term: 'Univariate', def: 'Forecasting using only one variable (e.g., visitor count). We don\'t use weather, economic data, etc.; just the historical visitor numbers themselves.' },
            { term: 'Time series', def: 'A sequence of numbers measured over time. Monthly visitor counts from 2015-2025 is a time series.' },
            { term: 'Seasonality', def: 'A pattern that repeats every year. Tourism always peaks in summer and dips in winter; that\'s seasonality.' },
            { term: 'Trend', def: 'The long-term direction. "Tourism in Jordan is growing 5% per year" is a trend.' },
            { term: 'Changepoint', def: 'A moment where the trend shifts. COVID in March 2020 was a changepoint: the growth line suddenly dropped.' },
            { term: 'Horizon', def: 'How far ahead we forecast. "12-month horizon" means we predict the next 12 months.' },
            { term: 'MAPE', def: 'Mean Absolute Percentage Error. Measures how far off our predictions are, as a percentage. Lower is better. Target: ≤ 20%.' },
            { term: 'MAE', def: 'Mean Absolute Error. Same idea as MAPE but in real units ("off by 2,000 visitors"). Better metric for small regions.' },
            { term: 'Back-test', def: 'Testing the model on data it hasn\'t seen. We hide the last 12 months, predict them, then check how close we got.' },
            { term: 'Confidence interval', def: 'The range around a prediction. "Expect 45,000 visitors, probably between 38,000 and 52,000." The wider the range, the less certain we are.' },
            { term: 'Multiplicative seasonality', def: 'Seasonal effects scale with volume. If baseline doubles, the summer peak also doubles. This is how tourism works in reality.' },
            { term: 'Imputation', def: 'Filling in missing data points using a documented rule (e.g., average of neighbors). We mark imputed values so everyone knows they\'re synthetic.' },
            { term: 'Walk-forward validation', def: 'Testing the model multiple times at different historical points. More robust than a single back-test. Like asking "would this have worked in 2022? 2023? 2024?"' },
          ].map(item => (
            <div key={item.term} className="flex gap-3 items-start">
              <span className="text-xs font-bold w-36 flex-shrink-0 pt-0.5" style={{ color: 'var(--color-primary)' }}>{item.term}</span>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.def}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 5</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 6: OUR INDICATOR FORMULAS EXPLAINED ── */
export function DocForecastingPrimerP6() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Our Indicator Formulas, Explained</h3>

        <p className="text-[13px] leading-[1.7] mb-4" style={{ color: 'var(--color-text)' }}>
          We proposed 4 indicators in the tender. Each one answers a specific question about a
          governorate&apos;s tourism situation. Here&apos;s what each does, with a worked example.
        </p>

        {/* Indicator 1 */}
        <div className="rounded-lg p-4 mb-3 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>1. Beds per 1,000 Visitors</p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text)' }}>
            <strong>Question it answers:</strong> "How many hotel beds exist for every 1,000 tourists?"
          </p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text-muted)' }}>
            <strong>Formula:</strong> (total beds in the governorate / total annual visitors) &times; 1,000
          </p>
          <div className="rounded p-3" style={{ background: 'white' }}>
            <p className="text-xs" style={{ color: 'var(--color-text)' }}>
              <strong>Example:</strong> Aqaba has 12,000 beds and 800,000 visitors per year.
              (12,000 / 800,000) &times; 1,000 = <strong>15 beds per 1,000 visitors</strong>.
              Amman has 20,000 beds and 2,000,000 visitors: (20,000 / 2,000,000) &times; 1,000 = <strong>10</strong>.
              Lower number = more pressure on accommodation.
            </p>
          </div>
        </div>

        {/* Indicator 2 */}
        <div className="rounded-lg p-4 mb-3 border-l-4" style={{ borderColor: 'var(--color-kinz-green)', background: 'var(--color-light-bg)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>2. Occupancy Pressure Index (OPI)</p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text)' }}>
            <strong>Question it answers:</strong> "How full are the hotels, especially during peak season?"
          </p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text-muted)' }}>
            <strong>Formula:</strong> 60% weight on the peak 3 months&apos; average occupancy + 40% weight on the full year average.
            We weight peak season heavier because that&apos;s when capacity pressure actually matters.
          </p>
          <div className="rounded p-3" style={{ background: 'white' }}>
            <p className="text-xs" style={{ color: 'var(--color-text)' }}>
              <strong>Example:</strong> Petra&apos;s peak 3 months average 92% occupancy, annual average is 65%.
              OPI = (0.6 &times; 0.92) + (0.4 &times; 0.65) = 0.552 + 0.260 = <strong>0.81 (Moderate)</strong>.
              Above 0.85 = High pressure. Below 0.60 = Low pressure.
            </p>
          </div>
        </div>

        {/* Indicator 3 */}
        <div className="rounded-lg p-4 mb-3 border-l-4" style={{ borderColor: 'var(--color-kinz-orange)', background: 'var(--color-light-bg)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>3. Growth Pressure Index (GPI)</p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text)' }}>
            <strong>Question it answers:</strong> "Is demand growing, flat, or declining over time?"
          </p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text-muted)' }}>
            <strong>Formula:</strong> The compound annual growth rate (CAGR) of visitors over the last 3 years.
            Think of it as: "what steady annual growth rate would get us from 3 years ago to today?"
          </p>
          <div className="rounded p-3" style={{ background: 'white' }}>
            <p className="text-xs" style={{ color: 'var(--color-text)' }}>
              <strong>Example:</strong> Wadi Rum had 50,000 visitors 3 years ago, 72,000 now.
              GPI = (72,000 / 50,000)^(1/3) - 1 = 1.44^0.333 - 1 = <strong>12.9% per year (High growth)</strong>.
              Above 10% = High. 0-10% = Moderate. Below 0% = Declining.
            </p>
          </div>
        </div>

        {/* Indicator 4 */}
        <div className="rounded-lg p-4 border-l-4" style={{ borderColor: 'var(--color-kinz-red)', background: 'var(--color-light-bg)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>4. Capacity Adequacy Index (CAI)</p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text)' }}>
            <strong>Question it answers:</strong> "Does this governorate have enough beds for its busiest month?"
          </p>
          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: 'var(--color-text-muted)' }}>
            <strong>Formula:</strong> total beds / (peak month visitors &times; average nights stayed).
            This tells you if the infrastructure can handle the worst-case month.
          </p>
          <div className="rounded p-3" style={{ background: 'white' }}>
            <p className="text-xs" style={{ color: 'var(--color-text)' }}>
              <strong>Example:</strong> A governorate has 5,000 beds, peak month sees 80,000 visitors staying an average 2 nights.
              CAI = 5,000 / (80,000 &times; 2) = 5,000 / 160,000 = <strong>0.03</strong>... That&apos;s very low, meaning
              severe under-capacity. Below 0.8 = Under-capacity. 0.8-1.2 = Balanced. Above 1.2 = Over-capacity.
            </p>
          </div>
        </div>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 6</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE 7: PRIORITY SCORE + SIMULATION LOGIC EXPLAINED ── */
export function DocForecastingPrimerP7() {
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
        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>Priority Score: How We Rank Governorates</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The whole point of this system is to answer: <strong>"Where should Jordan invest next in
            tourism infrastructure?"</strong> The priority score combines the 4 indicators above into a
            single number (0-100) for each governorate. Higher score = more urgent need for investment.
          </p>

          <p>The formula:</p>
        </div>

        <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--color-dark)', color: 'white' }}>
          <div className="text-xs space-y-2">
            <p>30% &times; <strong>Demand Growth</strong> (is tourism growing here?)</p>
            <p>30% &times; <strong>Capacity Gap</strong> (are there enough beds?)</p>
            <p>25% &times; <strong>Occupancy Pressure</strong> (how full are existing hotels?)</p>
            <p>15% &times; <strong>Accessibility</strong> (can tourists easily get here?)</p>
          </div>
          <p className="text-[10px] text-white/50 mt-3">
            Each component is scaled so all governorates are compared on the same 0-to-1 range. MoTA can adjust the weights.
          </p>
        </div>

        <div className="rounded-lg p-4 mb-5" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
            <strong>In plain terms:</strong> A governorate with fast-growing tourism, not enough beds,
            hotels nearly full, and decent road access will score highest. A governorate with declining
            visitors, empty hotels, and plenty of beds will score lowest. The system then labels each
            governorate with a recommendation: "build more hotels here" vs. "attract more tourists to
            what you already have."
          </p>
        </div>

        <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text)' }}>What-If Simulation: How It Works</h3>

        <div className="text-[13px] leading-[1.7] space-y-3 mb-4" style={{ color: 'var(--color-text)' }}>
          <p>
            The simulation lets MoTA ask "what if?" questions. For example: "If we build a new 200-bed
            hotel in Petra, what happens to the occupancy pressure and capacity classification?"
          </p>

          <p>
            The key thing to understand: the simulation compares against the <strong>forecasted future</strong>,
            not against today. Because if you&apos;re planning a hotel that opens in 12 months, you need to
            know what demand will look like in 12 months, not what it looks like right now.
          </p>
        </div>

        <div className="rounded-lg p-4 mb-3" style={{ background: 'var(--color-light-bg)' }}>
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>Example walkthrough:</p>
          <div className="text-xs space-y-2" style={{ color: 'var(--color-text)' }}>
            <p>1. Prophet predicts Petra will have <strong>120,000 visitors</strong> and <strong>4,000 beds</strong> in 12 months</p>
            <p>2. User says: "What if we add 200 beds?"</p>
            <p>3. System recalculates: new beds = 4,200. New occupancy = (120,000 &times; avg stay) / (4,200 &times; 30 days)</p>
            <p>4. System shows: occupancy drops from 82% to 71%, classification changes from Under-Capacity to Balanced</p>
            <p>5. Decision-maker sees: "200 beds would relieve the pressure. Worth the investment."</p>
          </div>
        </div>

        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          The simulation runs instantly (under 2 seconds) because it uses simple arithmetic on stored
          forecast numbers. It does not re-run the forecasting model. You change one input, the system
          recalculates everything downstream, and shows you the before-and-after comparison.
        </p>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &middot; Internal Document</span>
          <span>Forecasting Primer &middot; Page 7</span>
        </div>
      </div>
    </div>
  );
}
