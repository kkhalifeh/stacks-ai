import { Canvas } from '@/app/components/Canvas';

export function TitlePage() {
  return (
    <Canvas format="a4">
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-accent-1)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-2)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-3)' }} />
        <div className="flex-1" style={{ background: 'var(--color-accent-4)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            __STACK_NAME__
          </h1>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          Welcome
        </h2>
        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          This is the first page of your new A4 stack. Edit this file at
          <code className="px-1">pages/main/TitlePage.tsx</code> and adjust the manifest at
          <code className="px-1">stack.json</code> to add more sections.
        </p>

        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>__STACK_NAME__</span>
          <span>Page 1</span>
        </div>
      </div>
    </Canvas>
  );
}
