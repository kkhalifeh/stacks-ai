import logoWhite from '../../assets/logo-white.png';

export function TitlePage() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex h-2 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 flex flex-col p-12" style={{ background: 'var(--color-dark)' }}>
        <img src={logoWhite} alt="" className="h-14 w-auto object-contain self-start mb-16" />

        <p
          className="text-sm font-medium tracking-widest uppercase mb-6"
          style={{ color: 'var(--color-primary-light)' }}
        >
          Proposal
        </p>

        <h1 className="text-3xl font-bold text-white mb-3 leading-tight max-w-[600px]">
          Project Title
        </h1>

        <div className="flex gap-1 my-6">
          <div className="h-1 w-8 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <div className="h-1 w-4 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <div className="h-1 w-2 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
        </div>

        <p className="text-lg text-white/70 mb-1">Subtitle goes here</p>
        <p className="text-sm text-white/40 max-w-[500px]">
          One-line descriptor that sits under the subtitle. Replace with the real project context.
        </p>

        <div className="mt-auto rounded-lg p-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <p className="text-white/40 text-xs mb-1">Prepared for</p>
              <p className="text-white/80">Client Name</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Date</p>
              <p className="text-white/80">Month Year</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Prepared by</p>
              <p className="text-white/80">Your organization</p>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-1">Reference</p>
              <p className="text-white/80">Document reference</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="px-8 py-3 flex justify-between items-center text-xs bg-white"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <span className="font-medium" style={{ color: 'var(--color-text)' }}>Kinz</span>
        <span>www.kinz.jo</span>
        <span>Confidential</span>
      </div>
    </div>
  );
}
