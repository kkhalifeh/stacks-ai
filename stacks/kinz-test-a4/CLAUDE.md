# Stack — kinz test a4

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


A4 document stack using the Kinz design system.

## Structure

Every page follows this pattern:

1. **Top accent stripe** — 6 colored bars (red / orange / yellow / green / blue / navy), height 1.5 for content pages, height 2 for covers.
2. **Content wrapper** — `px-12 pt-8 pb-5 flex flex-col overflow-hidden` for content pages; full-page dark bg for covers.
3. **Page title row** (content pages, first page of section) — faded Kinz icon (w-7 h-7 opacity-20) + `text-xl font-bold` title + primary-bg badge.
4. **Divider** — `h-px mb-5` with `var(--color-border)`.
5. **Section heading** — left accent bar (w-1 h-5 rounded, kinz-blue) + `text-base font-bold`.
6. **Sub-heading** — `text-sm font-bold`.
7. **Body** — `text-[13px] leading-[1.7]`.
8. **Footer** — `pt-3 mt-auto flex justify-between border-t`, "Kinz for Information Technology · www.kinz.jo" left, "Section · Page N" right.

## Typography scale (fixed — do not vary)

- Cover title: `text-3xl font-bold` (cover only)
- Page title: `text-xl font-bold`
- Section heading: `text-base font-bold`
- Sub-heading: `text-sm font-bold`
- Body: `text-[13px]` with `leading-[1.7]`
- Table: `text-xs`
- Badge: `text-[10px]`
- Footer: `text-xs`

## Adding a page

1. Create a `.tsx` under `pages/<binder-id>/`.
2. Export one or more named page components. Every page component returns a `div` at `w-[794px] h-[1123px]`.
3. Register the export names in `stack.json` under the matching binder's `documents[].components` array.
4. Colors come from tenant theme — use `var(--color-kinz-red)`, `var(--color-primary)`, `var(--color-text)` etc. Do not hard-code hex values.

## Knowledge base

Drop `.md`, `.pdf`, or reference files into `kb/`. When Claude Code is launched inside this stack, only this stack's `kb/`, `CLAUDE.md`, and `memory/` are in scope — plus the tenant-level `brand/` inherited across stacks.
