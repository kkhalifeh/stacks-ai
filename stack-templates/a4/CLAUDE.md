# Stack — __STACK_NAME__

A4 document stack. Pages are authored as React components under `pages/<group>/`. The launcher renders each page at 794×1123px and prints to PDF.

## Adding a page

1. Create a `.tsx` file under `pages/<binder-id>/` with one or more named exports.
2. Register the component names in `stack.json` under the matching binder's `documents[].components` array.
3. Use `var(--color-primary)`, `var(--color-text)`, etc. from `theme/theme.css` for colors.

## Page template

```tsx
export function MyPage() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* your content */}
      </div>
    </div>
  );
}
```

## Theme

Edit `theme/theme.css` to change brand colors. Variables exposed to the launcher:
- `--color-primary` — accent color used by the sidebar
- `--color-text`, `--color-text-muted`, `--color-border` — typography
- `--color-light-bg`, `--color-dark`, `--color-dark-surface` — surfaces

## Knowledge base

Drop `.md`, `.pdf`, or reference files into `kb/`. When Claude Code is launched from inside this directory, only this stack's `kb/`, `CLAUDE.md`, and `memory/` are in scope.
