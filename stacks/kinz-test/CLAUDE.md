# Stack — Kinz test

16:9 slide deck. Slides are authored as React components under `pages/<group>/`. The launcher renders each slide at 1280×720px and prints to landscape PDF.

## Adding a slide

1. Create a `.tsx` file under `pages/<binder-id>/` with one or more named exports.
2. Register the component names in `stack.json` under the matching binder's `documents[].components` array.

## Slide template

```tsx
export function MySlide() {
  return (
    <div className="w-[1280px] h-[720px] flex flex-col" style={{ background: 'var(--color-dark)' }}>
      {/* your slide content */}
    </div>
  );
}
```

## Theme

Edit `theme/theme.css` to change colors.

## Knowledge base

Drop reference materials in `kb/`. When Claude Code is launched from inside this stack, only this stack's `kb/`, `CLAUDE.md`, and `memory/` are in scope.
