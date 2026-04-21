import logo from '../../assets/logo.png';

export function ContentSlide() {
  return (
    <div className="w-[1280px] h-[720px] flex flex-col relative overflow-hidden" style={{ background: 'white' }}>
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-20 pt-10 pb-10 flex flex-col" style={{ color: 'var(--color-text)' }}>
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="w-7 h-7 object-contain opacity-20" />
            <span
              className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              Section 01
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>www.kinz.jo</p>
        </div>

        {/* Heading block with left accent bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-8 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
          <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            Slide Heading
          </h2>
        </div>
        <p className="text-[15px] max-w-3xl mb-8" style={{ color: 'var(--color-text-muted)' }}>
          One-paragraph intro that frames the point of this slide. Replace with real context.
        </p>

        {/* Three Kinz-colored cards */}
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { n: '01', title: 'First pillar', accent: 'var(--color-kinz-red)' },
            { n: '02', title: 'Second pillar', accent: 'var(--color-kinz-blue)' },
            { n: '03', title: 'Third pillar', accent: 'var(--color-kinz-green)' },
          ].map(card => (
            <div
              key={card.n}
              className="p-6 flex flex-col rounded-lg"
              style={{ background: 'var(--color-light-bg)', borderLeft: `4px solid ${card.accent}` }}
            >
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
                {card.n}
              </p>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {card.title}
              </h3>
              <p className="text-[12px] leading-[1.6] flex-1" style={{ color: 'var(--color-text-muted)' }}>
                Short supporting description written in body voice. Add concrete detail rather than generic claims.
              </p>
            </div>
          ))}
        </div>

        <div
          className="pt-3 mt-6 flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
        >
          <span>Kinz for Information Technology</span>
          <span>Deck &middot; Slide 2</span>
        </div>
      </div>
    </div>
  );
}
