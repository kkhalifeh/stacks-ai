import logoWhite from '../../assets/logo-white.png';

export function TitleSlide() {
  return (
    <div className="w-[1280px] h-[720px] flex flex-col relative overflow-hidden" style={{ background: 'var(--color-dark)' }}>
      {/* Top accent stripe — Kinz cube colors */}
      <div className="flex h-2 flex-shrink-0 relative z-10">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      {/* Atmospheric gradients drawn from the brand palette */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          background: 'radial-gradient(circle at 18% 30%, var(--color-kinz-blue) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: 'radial-gradient(circle at 85% 80%, var(--color-kinz-red) 0%, transparent 55%)',
        }}
      />

      <div className="relative flex-1 flex flex-col px-24 pt-16 pb-12 text-white">
        <img src={logoWhite} alt="" className="h-12 w-auto object-contain self-start mb-16" />

        <p
          className="text-sm font-medium tracking-[0.3em] uppercase mb-6"
          style={{ color: 'var(--color-primary-light)' }}
        >
          Presentation
        </p>

        <h1 className="text-5xl font-bold text-white mb-5 leading-[1.05] max-w-3xl">
          Presentation Title
        </h1>

        <div className="flex gap-1.5 mb-6">
          <div className="h-1 w-10 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <div className="h-1 w-6 rounded-full" style={{ background: 'var(--color-kinz-green)' }} />
          <div className="h-1 w-3 rounded-full" style={{ background: 'var(--color-kinz-orange)' }} />
        </div>

        <p className="text-lg text-white/70 max-w-xl mb-1">Subtitle goes here</p>
        <p className="text-sm text-white/40 max-w-lg">
          One-line descriptor that sits under the subtitle.
        </p>

        <div className="mt-auto flex justify-between items-end text-xs text-white/50">
          <div>
            <p className="text-white/30 text-[10px] mb-1 uppercase tracking-wider">Presented by</p>
            <p className="text-white/80">Your organization</p>
          </div>
          <div className="text-right">
            <p className="text-white/30 text-[10px] mb-1 uppercase tracking-wider">Date</p>
            <p className="text-white/80">Month Year</p>
          </div>
        </div>
      </div>
    </div>
  );
}
