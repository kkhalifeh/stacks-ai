import kinzIcon from '../../assets/KinzIcon.png';
import sigKhaled from '../../assets/signatures/sig-khaled.png';

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

/* ═══════════════════════════════════════════════════════════════
   FIN-1: FINANCIAL PROPOSAL SUBMISSION FORM
   ═══════════════════════════════════════════════════════════════ */

export function Fin1Submission() {
  const borderColor = 'var(--color-border)';
  const totalUSD = '93,867';
  const totalWords = 'Ninety-Three Thousand Eight Hundred and Sixty-Seven';

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              FIN-1: Financial Proposal Submission Form
            </h1>
          </div>
        </div>
        <div className="h-px mb-6" style={{ background: borderColor }} />

        {/* Location & Date */}
        <p className="text-[13px] text-right mb-6" style={{ color: 'var(--color-text)' }}>
          Amman, Jordan &mdash; April 19, 2026
        </p>

        {/* Addressee */}
        <p className="text-[13px] mb-6" style={{ color: 'var(--color-text)' }}>
          To: Japan Development Service Co., Ltd. (JDS)
        </p>

        <p className="text-[13px] mb-5" style={{ color: 'var(--color-text)' }}>Dear Sirs:</p>

        {/* Body */}
        <div className="text-[13px] leading-[1.8] space-y-4" style={{ color: 'var(--color-text)' }}>
          <p>
            We, the undersigned, offer to provide the services for Proof of Concept (PoC)
            Program 5: AI-Enabled Geo-Analytics (AI-GIS) Baseline for Tourism Demand,
            Infrastructure Optimization, and Investment Prioritization in Jordan in accordance
            with your Request for Proposal dated March 25, 2026 and our Technical Proposal.
          </p>

          <p>
            Our attached Financial Proposal is for the amount of{' '}
            <strong>United States Dollars (USD) {totalWords} (US${totalUSD})</strong>,
            inclusive of all indirect local taxes.
          </p>

          <p>
            Our Financial Proposal shall be binding upon us subject to the modifications
            resulting from Contract negotiations, up to expiration of the validity period
            of the Proposal.
          </p>

          <p>We understand that you are not bound to accept any Proposal that you receive.</p>
        </div>

        <p className="text-[13px] mt-6 mb-2" style={{ color: 'var(--color-text)' }}>We remain,</p>
        <p className="text-[13px] mb-8" style={{ color: 'var(--color-text)' }}>Yours sincerely,</p>

        {/* Signature block */}
        <div className="space-y-5 text-[12px]" style={{ color: 'var(--color-text)' }}>
          <div>
            <img src={sigKhaled} alt="" className="h-10 object-contain object-left" />
            <div className="border-b w-72 mb-1" style={{ borderColor }} />
            <p className="font-medium">Authorized Signature</p>
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <p style={{ color: 'var(--color-text-muted)' }}>Name and Title of Signatory:</p>
              <p className="font-medium mt-1">Khaled M. Khalifeh, CEO</p>
            </div>
          </div>
          <div>
            <p style={{ color: 'var(--color-text-muted)' }}>Name of Firm:</p>
            <p className="font-medium mt-1">Kinz for Information Technology</p>
          </div>
          <div>
            <p style={{ color: 'var(--color-text-muted)' }}>Address:</p>
            <p className="font-medium mt-1">Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan</p>
          </div>
          <div>
            <p style={{ color: 'var(--color-text-muted)' }}>Contact information:</p>
            <p className="font-medium mt-1">+962 79 520 0001 &middot; kkhalifeh@kinz.jo</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>FIN-1 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FIN-2: BREAKDOWN OF REMUNERATION, REIMBURSABLES & TAX
   ═══════════════════════════════════════════════════════════════ */

export function Fin2Breakdown() {
  const borderColor = 'var(--color-border)';

  // ── Remuneration data ──
  const aiResearcher = [
    { num: 1, name: 'Dr. Bushra Al Hijawi', position: 'AI Researcher / Methodology Advisor', rate: 6768, pm: 2.5, cost: 16920 },
  ];

  const otherPersonnel = [
    { num: 1, name: 'Khaled M. Khalifeh', position: 'Project Manager / Team Lead', rate: 4000, pm: 3.0, cost: 12000 },
    { num: 2, name: 'Ahmad M. Abu Joudeh', position: 'Database Engineer', rate: 3600, pm: 5.5, cost: 19800 },
    { num: 3, name: 'Ahmad Q. Al-Bzour', position: 'Backend / Analytics Developer', rate: 2200, pm: 5.0, cost: 11000 },
    { num: 4, name: 'Osama Sarwar', position: 'Frontend / GIS Developer', rate: 1500, pm: 4.0, cost: 6000 },
    { num: 5, name: 'Duha Ghanayem', position: 'Data Operations Manager', rate: 1200, pm: 3.5, cost: 4200 },
    { num: 6, name: 'QA Officer', position: 'Quality Assurance & Testing', rate: 1200, pm: 2.0, cost: 2400 },
    { num: 7, name: 'Data Officers (4 staff)', position: 'Data Cleansing & Entry', rate: 900, pm: 5.0, cost: 4500 },
  ];

  const remunerationTotal = aiResearcher.reduce((s, r) => s + r.cost, 0) + otherPersonnel.reduce((s, r) => s + r.cost, 0);

  // ── Reimbursables ──
  const reimbursables = [
    { num: 1, type: 'Dedicated server (1U/2U rack, 8-core, 32GB DDR5, 1TB NVMe, Ubuntu Server)', unit: 'Unit', unitCost: 3500, qty: 1, cost: 3500 },
    { num: 2, type: 'Cloud development/staging environment', unit: 'Months', unitCost: 100, qty: 6, cost: 600 },
  ];

  const reimbursableTotal = reimbursables.reduce((s, r) => s + r.cost, 0);

  // ── Tax ──
  const subtotal = remunerationTotal + reimbursableTotal;
  const gst = Math.round(subtotal * 0.16);
  const grandTotal = subtotal + gst;

  const fmt = (n: number) => n.toLocaleString('en-US');

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-10 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex items-center gap-3 mb-3">
          <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            FIN-2: Breakdown of Remuneration, Reimbursable Expenses and Indirect Local Tax Estimates
          </h1>
        </div>
        <div className="h-px mb-3" style={{ background: borderColor }} />

        {/* Grand total header */}
        <div className="rounded-lg p-3 mb-4 text-center" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <p className="text-xs font-semibold tracking-wide uppercase mb-1">Total Costs of (1), (2) and (3)</p>
          <p className="text-xl font-bold">US$ {fmt(grandTotal)}</p>
        </div>

        {/* ── (1) Remuneration ── */}
        <h3 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>Remuneration</h3>
        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor }}>
          <table className="w-full text-[9px]" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="py-1.5 px-2 text-left font-semibold w-6">No.</th>
                <th className="py-1.5 px-2 text-left font-semibold">Name</th>
                <th className="py-1.5 px-2 text-left font-semibold">Position</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[75px]">Rate (US$/Mo)</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[50px]">PM</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[70px]">Cost (US$)</th>
              </tr>
            </thead>
            <tbody>
              {/* AI Researcher header */}
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <td colSpan={6} className="py-1 px-2 font-bold" style={{ color: 'var(--color-kinz-green)' }}>1) Academic AI Researcher</td>
              </tr>
              {aiResearcher.map(r => (
                <tr key={r.num} className="border-t" style={{ borderColor }}>
                  <td className="py-1 px-2 text-center">{r.num}</td>
                  <td className="py-1 px-2 font-medium">{r.name}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{r.position}</td>
                  <td className="py-1 px-2 text-right">{fmt(r.rate)}</td>
                  <td className="py-1 px-2 text-right">{r.pm}</td>
                  <td className="py-1 px-2 text-right font-medium">{fmt(r.cost)}</td>
                </tr>
              ))}
              {/* Other Personnel header */}
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <td colSpan={6} className="py-1 px-2 font-bold" style={{ color: 'var(--color-kinz-blue)' }}>2) Other Personnel</td>
              </tr>
              {otherPersonnel.map(r => (
                <tr key={r.num} className="border-t" style={{ borderColor }}>
                  <td className="py-1 px-2 text-center">{r.num}</td>
                  <td className="py-1 px-2 font-medium">{r.name}</td>
                  <td className="py-1 px-2" style={{ color: 'var(--color-text-muted)' }}>{r.position}</td>
                  <td className="py-1 px-2 text-right">{fmt(r.rate)}</td>
                  <td className="py-1 px-2 text-right">{r.pm}</td>
                  <td className="py-1 px-2 text-right font-medium">{fmt(r.cost)}</td>
                </tr>
              ))}
              {/* Total */}
              <tr className="border-t-2 font-bold" style={{ borderColor: 'var(--color-primary)' }}>
                <td colSpan={5} className="py-1.5 px-2 text-right">Total of (1)</td>
                <td className="py-1.5 px-2 text-right" style={{ color: 'var(--color-primary)' }}>{fmt(remunerationTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── (2) Reimbursable Items ── */}
        <h3 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>Reimbursable Items</h3>
        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor }}>
          <table className="w-full text-[9px]" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="py-1.5 px-2 text-left font-semibold w-6">No.</th>
                <th className="py-1.5 px-2 text-left font-semibold">Type of Reimbursable Expenses</th>
                <th className="py-1.5 px-2 text-left font-semibold w-[55px]">Unit</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[70px]">Unit Cost</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[40px]">Qty</th>
                <th className="py-1.5 px-2 text-right font-semibold w-[70px]">Cost (US$)</th>
              </tr>
            </thead>
            <tbody>
              {reimbursables.map(r => (
                <tr key={r.num} className="border-t" style={{ borderColor }}>
                  <td className="py-1 px-2 text-center">{r.num}</td>
                  <td className="py-1 px-2">{r.type}</td>
                  <td className="py-1 px-2">{r.unit}</td>
                  <td className="py-1 px-2 text-right">{fmt(r.unitCost)}</td>
                  <td className="py-1 px-2 text-right">{r.qty}</td>
                  <td className="py-1 px-2 text-right font-medium">{fmt(r.cost)}</td>
                </tr>
              ))}
              <tr className="border-t-2 font-bold" style={{ borderColor: 'var(--color-primary)' }}>
                <td colSpan={5} className="py-1.5 px-2 text-right">Total of (2)</td>
                <td className="py-1.5 px-2 text-right" style={{ color: 'var(--color-primary)' }}>{fmt(reimbursableTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Subtotal (1)+(2) ── */}
        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor }}>
          <table className="w-full text-[10px] font-bold" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <td className="py-2 px-3 text-right">Total Costs of (1)+(2)</td>
                <td className="py-2 px-3 text-right w-[80px]" style={{ color: 'var(--color-primary)' }}>US$ {fmt(subtotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── (3) Indirect Local Tax ── */}
        <h3 className="text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>Indirect Local Tax Estimates</h3>
        <div className="rounded-lg overflow-hidden border mb-3" style={{ borderColor }}>
          <table className="w-full text-[9px]" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr className="border-t" style={{ borderColor }}>
                <td className="py-1 px-2 text-center w-6">1</td>
                <td className="py-1 px-2">General Sales Tax (GST)</td>
                <td className="py-1 px-2 text-right w-[50px]">16%</td>
                <td className="py-1 px-2 text-right font-medium w-[80px]">{fmt(gst)}</td>
              </tr>
              <tr className="border-t-2 font-bold" style={{ borderColor: 'var(--color-primary)' }}>
                <td colSpan={3} className="py-1.5 px-2 text-right">Total Estimate for Indirect Local Tax (3)</td>
                <td className="py-1.5 px-2 text-right" style={{ color: 'var(--color-primary)' }}>{fmt(gst)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Grand Total ── */}
        <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-primary)' }}>
          <table className="w-full text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            <tbody>
              <tr style={{ background: 'var(--color-primary)', color: 'white' }}>
                <td className="py-2.5 px-3 text-right">Total Costs of (1)+(2)+(3)</td>
                <td className="py-2.5 px-3 text-right w-[100px]">US$ {fmt(grandTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>FIN-2 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}
