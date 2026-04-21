# Document Builder (Launcher)

A multi-stack document builder. Each **stack** is a self-contained directory under `stacks/` with its own pages, assets, theme, knowledge base, and `CLAUDE.md`. The launcher shell at `src/app/` discovers stacks at build time and renders them.

This file governs the launcher only. Stack-specific rules live inside each stack's own `CLAUDE.md`.

## Vocabulary

| Concept | Term | Schema key | Meaning |
|---|---|---|---|
| Project | **Stack** | — | A directory in `stacks/`. Self-contained: pages, theme, KB, memory, CLAUDE.md |
| Export unit | **Binder** | `binders[]` | A logical group of documents — one PDF per binder (e.g. "Technical Proposal") |
| Content unit | **Document** | `binders[].documents[]` | A named piece of content — may span multiple pages (e.g. "TECH-3: Methodology") |
| Canvas unit | **Page** | `documents[].components[]` | A single rendered page component. Called "slide" in UI when stack format is `slide-16x9` |

The legacy schema keys `groups` and `sections` are still accepted by the loader for backward compat, but all new code and docs use `binders` and `documents`.

## Repo layout

```
document-builder/
├── CLAUDE.md                       # This file (launcher)
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx                 # Launcher shell
│   │   ├── stacks.ts               # Stack discovery + component registry
│   │   ├── exportInfo1.ts          # Legacy INFO-1 export (will be generalized)
│   │   └── components/
│   │       └── Sidebar.tsx         # Stack/binder/document nav
│   └── styles/                     # Launcher-level styles (no brand colors here)
│       ├── index.css
│       ├── fonts.css
│       ├── tailwind.css
│       └── print.css
└── stacks/
    └── <stack-id>/
        ├── stack.json              # Manifest — binders, documents, format, theme
        ├── CLAUDE.md               # Stack-scoped rules for Claude Code
        ├── theme/theme.css         # Brand variables for this stack
        ├── assets/                 # Logos, signatures, images
        ├── kb/                     # Knowledge base (md, pdf) — in Claude scope when launched inside the stack
        ├── memory/                 # Stack-scoped auto-memory
        └── pages/<binder-id>/*.tsx # React pages (canvas-sized components)
```

## Stack manifest (`stack.json`)

```json
{
  "id": "stack-slug",
  "name": "Human-readable name",
  "subtitle": "Optional tagline",
  "format": "a4",              // or "slide-16x9" (Phase 1d)
  "theme": "theme/theme.css",  // path relative to stack root
  "logo": "assets/logo.png",   // used in sidebar header
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
      "attachments": [           // optional, INFO-style
        { "label": "File", "url": "/path/to.pdf" }
      ]
    }
  ]
}
```

`components` values are named exports from any `.tsx` file under `pages/<binder-id>/`. The loader flattens all exports and resolves by name, so one file can export multiple page components.

## How stacks are loaded

`src/app/stacks.ts` uses Vite's `import.meta.glob` to:
1. Eager-load every `stacks/*/stack.json`.
2. Eager-load every `stacks/*/pages/**/*.tsx` and flatten their named exports into one registry per stack.
3. Eager-load every stack's theme CSS (but inject only the active stack's variables into the document).

Adding a new stack = create a new folder under `stacks/` with a `stack.json`, page files, and a theme. No launcher code changes required.

## Canvas format (Phase 1d)

A stack's `format` drives page dimensions and print CSS:
- `"a4"` — 794×1123px, portrait, print `@page size: A4 portrait`
- `"slide-16x9"` — 1280×720px, landscape, print `@page size: 1280px 720px landscape`

Pages are authored as plain React components; the canvas wrapper enforces the dimensions. Each stack is single-format (no mixed canvases in one stack).

## Launcher behavior rules

- The launcher shell is **stack-agnostic**: no Kinz colors, no tender copy, nothing hard-coded per stack.
- Brand colors, logos, page styles belong in the stack, not in `src/`.
- Print-time rendering filters by active stack + active binder (same behavior as pre-refactor, now generalized).
- The landing page (Phase 1b) will list all stacks and offer "new stack" creation. Until that lands, the app boots straight into the first stack.

## Adding a new stack

Until the launcher UI supports it (Phase 1b), create stacks manually:
```bash
mkdir -p stacks/my-stack/{assets,kb,memory,theme,pages/main}
# Write stack.json, theme/theme.css, pages/main/*.tsx, CLAUDE.md
```
The dev server hot-reloads the new stack.
