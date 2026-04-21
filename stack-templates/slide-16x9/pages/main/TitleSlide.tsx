import { Canvas } from '@/app/components/Canvas';

export function TitleSlide() {
  return (
    <Canvas
      format="slide-16x9"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-dark)' }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 20% 30%, var(--color-primary) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 85% 85%, var(--color-accent-1) 0%, transparent 55%)',
        }}
      />

      <div className="relative flex-1 flex flex-col justify-center px-24">
        <div className="h-1 w-24 mb-8 rounded-full" style={{ background: 'var(--color-primary-light)' }} />
        <h1 className="text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          __STACK_NAME__
        </h1>
        <p className="text-xl text-white/60 max-w-xl">
          Edit <code className="px-1">pages/main/TitleSlide.tsx</code> and add more slides
          by creating new components + registering them in <code className="px-1">stack.json</code>.
        </p>
      </div>

      <div className="relative px-24 pb-10 flex justify-between items-center text-xs text-white/40">
        <span>__STACK_NAME__</span>
        <span>1 / 1</span>
      </div>
    </Canvas>
  );
}
