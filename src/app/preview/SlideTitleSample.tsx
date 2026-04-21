import { Canvas } from '../components/Canvas';

interface Props {
  brandName: string;
  logoUrl?: string;
}

export function SlideTitleSample({ brandName, logoUrl }: Props) {
  return (
    <Canvas
      format="slide-16x9"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-dark)', fontFamily: 'var(--font-body)' }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at 18% 30%, var(--color-primary) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: 'radial-gradient(circle at 88% 85%, var(--color-accent-1) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex-1 flex flex-col justify-center px-24 text-white">
        {logoUrl && <img src={logoUrl} alt="" className="h-12 mb-10 object-contain opacity-90" style={{ width: 'auto' }} />}
        <div className="h-1 w-20 mb-8 rounded-full" style={{ background: 'var(--color-primary-light)' }} />
        <h1
          className="text-6xl font-bold tracking-tight mb-5 leading-[1.05]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {brandName}
        </h1>
        <p className="text-xl text-white/60 max-w-2xl" style={{ fontFamily: 'var(--font-body)' }}>
          16:9 title slide sample — shows the cover treatment at landscape scale.
        </p>
      </div>

      <div className="relative px-24 pb-10 flex justify-between items-center text-xs text-white/45">
        <span>{brandName}</span>
        <span>1 / 1</span>
      </div>
    </Canvas>
  );
}
