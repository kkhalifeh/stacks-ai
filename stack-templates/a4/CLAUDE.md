# Stack — __STACK_NAME__

## Scope & Locks (read this first)

You are Claude Code running **inside a stack directory**. A stack is an isolated project: pages, assets, knowledge base, memory, and a manifest. The launcher app (the parent repo) and the tenant brand engine are **out of scope** for you.

### Allowed (what you may freely do)

- Create, edit, rename, delete files under this stack: `pages/**`, `assets/**`, `kb/**`, `memory/**`
- Edit `stack.json` to add, rename, reorder, or remove binders/documents — **within the schema defined by the launcher**
- Edit this `CLAUDE.md` to refine stack-scoped rules (but do not remove the Scope & Locks block)
- Read anything in the repo (including launcher code) for context
- Run local bash: `npm run dev`, `ls`, `cat`, `grep`, etc. for inspection

### Forbidden (hard rules — the `.claude/settings.json` in this stack enforces them)

- **Do not** Edit or Write anything outside this stack directory. That means:
  - `../../src/**` (launcher React app)
  - `../../vite-plugins/**` (dev plugins)
  - `../../brand/**` (tenant brand: logo, themes, tenant templates)
  - `../../stack-templates/**` (generic starters)
  - `../../stacks/<other-stack>/**` (other stacks)
  - `../../package.json`, `../../vite.config.ts`, `../../index.html`, `../../CLAUDE.md`
- **Do not** install packages or modify build configuration
- **Do not** commit or push git from here; the human owns version control

If the user asks for something that requires crossing this boundary (e.g. "add a new API endpoint", "change the brand theme for all stacks", "edit the launcher sidebar"), stop and tell them: that work belongs at the repo root, not inside a stack. They should exit this session and run Claude from the repo root (or use Brand Studio for tenant brand changes).

### Locked patterns (do not deviate within pages)

- **Canvas dimensions** match the stack format:
  - `a4` stacks: every page is `w-[794px] h-[1123px]`
  - `slide-16x9` stacks: every page is `w-[1280px] h-[720px]`
- **Typography scale** (see the "Typography" section of this file). Do not introduce ad-hoc font sizes.
- **Colors** come from CSS variables (`var(--color-primary)`, `var(--color-text)`, `var(--color-kinz-*)` when tenant is Kinz). Do not hard-code hex values in page components — change the theme instead.
- **Page structure** (accent stripe / header / divider / footer pattern) follows the tenant's page template. If a new visual treatment is needed, the tenant template under `brand/templates/` is the right place — which is out of this stack's scope.
- **`stack.json` schema** — only fields documented in the launcher's `CLAUDE.md`. Do not invent new fields.

### Content generation

When asked to write or refine content inside pages:
- Follow the tone guidance in this file (if present)
- Preserve the existing structural pattern of the page
- When adding a new document, create a new `.tsx` under the matching `pages/<binder-id>/` and register its exports in the binder's `documents[].components` array


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
