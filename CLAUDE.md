# Document Builder (Launcher)

Stacks AI — a multi-tenant, multi-stack document builder. The launcher (this repo's `src/`, `vite-plugins/`, and build config) discovers **stacks** on disk and renders them. Each **stack** is a self-contained directory under `stacks/` that carries its own pages, assets, optional per-stack theme, knowledge base, auto-memory, and `CLAUDE.md`.

This file governs the **launcher** only. It is **tenant-agnostic and stack-agnostic**: no brand colors, no client names, no per-stack content belongs here. Stack-specific rules live inside each stack's own `CLAUDE.md`. Tenant-specific brand decisions live in `brand/`.

## When you (Claude) are editing from the repo root

You are working on the **app itself** — the launcher, plugins, templates, or tenant brand engine. You are **not** working on any specific stack's content. If the request is about a specific stack (pages, content, kb, stack styling), the stack owns that — launch Claude from inside the stack directory instead (or `cd` into it).

## Vocabulary

| Concept | Term | Schema key | Meaning |
|---|---|---|---|
| Organization | **Tenant** | `brand/tenant.json` | The org running this builder. One per deployment. Owns the logo and the set of named themes under `brand/themes/`. |
| Project | **Stack** | — | A directory in `stacks/`. Self-contained: pages, theme (optional), kb, memory, CLAUDE.md, `.claude/settings.json` |
| Export unit | **Binder** | `binders[]` | A logical group of documents — one PDF per binder |
| Content unit | **Document** | `binders[].documents[]` | A named piece of content — may span multiple pages |
| Canvas unit | **Page** | `documents[].components[]` | A single rendered page component. Called "slide" in UI when stack format is `slide-16x9` |

Legacy schema keys `groups` and `sections` are still accepted by the loader for backward compat; all new code uses `binders` and `documents`.

## Repo layout (authoritative)

```
document-builder/
├── CLAUDE.md                       # This file — launcher architecture only
├── index.html                      # Vite entrypoint
├── vite.config.ts                  # Build + plugin registration
├── package.json
├── .env.example                    # Documents ANTHROPIC_API_KEY
├── src/                            # Launcher React app
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx                 # Router: landing / stack viewer / brand studio
│   │   ├── Landing.tsx             # Stack grid + header
│   │   ├── BrandStudio.tsx         # Tenant brand studio
│   │   ├── stacks.ts               # Stack + tenant discovery (import.meta.glob)
│   │   ├── api.ts                  # Stack/KB/terminal client helpers
│   │   ├── brand-api.ts            # Tenant brand client helpers
│   │   ├── exportInfo1.ts          # INFO-1 PDF merge (legacy, generalizable)
│   │   ├── components/             # Sidebar, StackCard, KbPanel, NewStackModal
│   │   └── preview/                # Generic preview samples (fallback when tenant has no templates)
│   └── styles/                     # Launcher-level styles (no brand colors)
├── vite-plugins/
│   ├── stacks-api.ts               # Dev-time filesystem API (stacks CRUD, kb, terminal)
│   └── brand-api.ts                # Dev-time tenant brand API (Claude vision, themes CRUD)
├── stack-templates/                # Generic fallback templates
│   ├── a4/                         # Blank A4 starter
│   └── slide-16x9/                 # Blank slide starter
├── brand/                          # Tenant: logo + themes + branded templates
│   ├── tenant.json                 # { name, subtitle, logo, activeThemeId }
│   ├── logo.*                      # Tenant logo
│   ├── themes/<id>/theme.css       # Named theme variants
│   ├── themes/<id>/meta.json       # Theme metadata
│   └── templates/<format>/         # Tenant-branded starter templates (A4 / slide-16x9)
├── stacks/
│   └── <stack-id>/                 # One stack = one folder
│       ├── stack.json              # Manifest (binders, documents, format, theme pointer)
│       ├── CLAUDE.md               # Stack-scoped rules (Scope & Locks block enforced)
│       ├── .claude/settings.json   # Permission denies for writes outside stack
│       ├── theme/theme.css         # Optional per-stack override (snapshot if themeId was chosen at creation)
│       ├── assets/                 # Images used by the stack's pages
│       ├── kb/                     # Knowledge base (md, pdf, other) — Claude scope when running here
│       ├── memory/                 # Stack-scoped auto-memory (written by Claude Code itself)
│       └── pages/<binder-id>/*.tsx # Canvas-sized React pages
└── node_modules/, dist/            # gitignored
```

## Architecture lock — what this app is and isn't

The launcher is a **structural shell**. Stacks are **data + content**. The two responsibilities are decoupled on purpose:

1. **Launcher code** (`src/`, `vite-plugins/`, `index.html`, `vite.config.ts`, `package.json`, this `CLAUDE.md`) is the app. It changes only when the **capability** of the builder changes (e.g., adding a new route, a new API endpoint, a new feature). It should not contain anything tenant-specific.
2. **Tenant brand** (`brand/`) is edited through Brand Studio. The Brand Studio API writes `brand/themes/<id>/`, updates `brand/tenant.json.activeThemeId`, and nothing else. Direct manual edits to tenant files are allowed but rare and should preserve the schema.
3. **Stack content** (`stacks/<id>/`) is where Claude should do content work. Each stack is isolated — it has its own `CLAUDE.md` with a "Scope & Locks" block that declares what can and cannot change inside that stack.

When you (Claude) are running **inside a stack** (via the sidebar "Open Claude in Terminal" button or `cd stacks/<id> && claude`), you must stay within that stack. The stack's `.claude/settings.json` hard-denies Edit/Write to paths that escape the stack directory, and the stack's `CLAUDE.md` repeats the contract.

## Stack manifest schema (`stack.json`)

```json
{
  "id": "stack-slug",
  "name": "Human-readable name",
  "subtitle": "Optional tagline",
  "format": "a4",              // or "slide-16x9"
  "theme": "theme/theme.css",  // optional — if omitted, stack inherits tenant active theme
  "logo": "assets/logo.png",   // optional — if omitted, stack inherits tenant logo
  "binders": [
    {
      "id": "binder-slug",
      "label": "Binder name",
      "subtitle": "Optional subtitle",
      "color": "var(--color-kinz-blue)",
      "passwordProtected": false,
      "documents": [
        { "id": "doc-id", "label": "Label", "maxPages": 5, "components": ["ExportA", "ExportB"] }
      ],
      "attachments": [
        { "label": "File", "url": "/path/to.pdf" }
      ]
    }
  ]
}
```

`components` values are named exports from any `.tsx` file under `pages/<binder-id>/`. The loader flattens all exports and resolves by name, so one file can export multiple page components.

## How stacks are loaded

`src/app/stacks.ts`:
1. Eager-loads every `stacks/*/stack.json`.
2. Eager-loads every `stacks/*/pages/**/*.tsx` and flattens their named exports into one registry per stack.
3. Eager-loads every stack's theme CSS; only the active stack's vars are injected into the document at runtime.
4. Loads tenant from `brand/tenant.json` and tenant themes from `brand/themes/*/`.
5. Resolution: `stack.themeCss ?? tenant.activeTheme.css`; `stack.logoUrl ?? tenant.logoUrl`.

Adding a new stack = create a new folder under `stacks/` with a `stack.json`, page files, and optional theme. No launcher code changes required; Vite hot-reloads the new stack.

## Canvas format

A stack's `format` drives page dimensions and print CSS:
- `"a4"` — 794×1123px, portrait, `@page size: A4 portrait`
- `"slide-16x9"` — 1280×720px, landscape, `@page size: 1280px 720px landscape`

Pages are plain React components; the optional `Canvas` wrapper in `src/app/components/Canvas.tsx` enforces dimensions and a flex-column layout. Each stack is single-format.

## Launcher behavior rules

- The launcher shell is **tenant-agnostic**: no brand colors, no client names, no per-stack copy. Launcher palette lives in `src/styles/launcher.css` (neutral + one accent).
- **Brand colors, logos, page styles belong in the stack (or in `brand/` at tenant level), not in `src/`.**
- Print-time rendering filters by active stack + active binder + stack format (see `applyPrintPageSize` in `stacks.ts`).
- Stack CRUD goes through `vite-plugins/stacks-api.ts`. Brand changes go through `vite-plugins/brand-api.ts`. Both run only in dev mode.

## Brand Studio flow (tenant level)

1. User opens `?view=brand` from landing
2. Upload logo → POST `/__api/brand/logo`
3. Optional: drop PDFs or images into the **style references** panel → POST `/__api/brand/references/:filename`. Each reference is stored at `brand/references/` and attached to every generate call thereafter. Images (`.png .jpg .jpeg .gif .webp`) and PDFs (`.pdf`) only. Max 10 MB per file. Managed via `GET /__api/brand/references` (list) and `DELETE /__api/brand/references/:filename`
4. Fill brand name + optional keywords
5. Generate theme → POST `/__api/brand/generate` → Claude vision receives: the logo (first image), every reference file (image or document blocks), and the text prompt. Returns a structured `ThemeProposal`. Primary + accent colors are drawn from the logo; references inform neutrals, radii, shadows, typography pairing, and overall mood
6. Preview tabs (A4 Title/Content, Slide Title/Content) render tenant templates with the proposal scoped via `.brand-preview-tenant`
7. Save as new theme → POST `/__api/brand/themes` writes `brand/themes/<slug>/{theme.css, meta.json}`
8. Set default → POST `/__api/brand/themes/<id>/default` updates `tenant.json.activeThemeId`
9. When creating a new stack, NewStackModal can snapshot a specific saved theme into the stack's own `theme/theme.css`
