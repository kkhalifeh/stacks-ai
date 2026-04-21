import kinzIcon from '@assets/KinzIcon.png';

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

export function Info1CCD() {
  const borderColor = 'var(--color-border)';

  const fields = [
    { label: 'Company Name', value: 'Kinz for Information Technology (شركة كنز لتكنولوجيا المعلومات)' },
    { label: 'Previous company names (if any)', value: 'None' },
    { label: 'Company Registration Number (CCD)', value: '637' },
    { label: 'Date of Incorporation / Registration date', value: '21 May 2009' },
    { label: 'Registered Office Address', value: 'Arabia Group Complex, 260 Arrar Street, Amman, 11194, Jordan' },
    { label: 'Website URL', value: 'www.kinz.jo' },
    { label: 'Representative phone number', value: '+962 79 520 0001' },
    { label: 'Representative email address', value: 'kkhalifeh@kinz.jo' },
    { label: 'Type of business', value: 'Private Limited Shareholding Company (شركة مساهمة خاصة محدودة)' },
  ];

  const statements = [
    { year: 'FY 2022', note: 'Audited financial statements, 18 pages (attached)' },
    { year: 'FY 2023', note: 'Audited financial statements, 18 pages (attached)' },
    { year: 'FY 2024', note: 'Audited financial statements, 19 pages (attached)' },
  ];

  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <AccentStripe />
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              INFO-1: Information of CCD Number and Financial Statements
            </h1>
          </div>
        </div>
        <div className="h-px mb-6" style={{ background: borderColor }} />

        {/* Section 1 heading */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
            1. Private IT Company Name, CCD Number and Financial Statements
          </h2>
        </div>

        {/* Form fields */}
        <div className="rounded-lg overflow-hidden border mb-6" style={{ borderColor }}>
          <table className="w-full text-[13px]" style={{ color: 'var(--color-text)' }}>
            <tbody>
              {fields.map((f, i) => (
                <tr key={i} className={i > 0 ? 'border-t' : ''} style={{ borderColor }}>
                  <td className="py-2.5 px-4 font-medium w-[260px]" style={{ background: 'var(--color-light-bg)', color: 'var(--color-text-muted)' }}>
                    {f.label}
                  </td>
                  <td className="py-2.5 px-4">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial statements section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
            Audited Financial Statements for the Last 3 Years
          </h2>
        </div>

        <p className="text-[13px] mb-4 leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          Audited by <strong>Barari CPAs &amp; Business Consultants</strong> (Khaled Mustafa Al-Barari, License No. 1017).
          All statements are prepared in accordance with International Financial Reporting Standards (IFRS).
        </p>

        <div className="rounded-lg overflow-hidden border mb-5" style={{ borderColor }}>
          <table className="w-full text-[13px]" style={{ color: 'var(--color-text)' }}>
            <thead>
              <tr style={{ background: 'var(--color-light-bg)' }}>
                <th className="text-left py-2 px-4 font-semibold w-[120px]">Period</th>
                <th className="text-left py-2 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((s, i) => (
                <tr key={i} className="border-t" style={{ borderColor }}>
                  <td className="py-2 px-4 font-medium">{s.year}</td>
                  <td className="py-2 px-4" style={{ color: 'var(--color-text-muted)' }}>{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg p-4 border" style={{ borderColor, background: 'var(--color-light-bg)' }}>
          <p className="text-xs leading-[1.6]" style={{ color: 'var(--color-text-muted)' }}>
            The complete audited financial statements for FY 2022, FY 2023, and FY 2024
            are attached in the following pages of this document.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor }}>
          <span>Kinz for Information Technology &middot; www.kinz.jo</span>
          <span>INFO-1 &middot; Page 1</span>
        </div>
      </div>
    </div>
  );
}
