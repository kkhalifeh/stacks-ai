# Stack — MODEE AI-GIS Tender Proposal

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


Section-based proposal for the AI-GIS PoC tender. Each section maps to a required RFP form (TECH-1 through TECH-6) with enforced page limits. Sections are A4-sized React components (794×1123px). Pages are declared in `stack.json` and rendered by the launcher.

## Stack layout

```
stacks/kinz-modee-tender/
├── stack.json           # Groups, sections, page ordering, format, theme pointer
├── CLAUDE.md            # This file — tender-specific rules
├── theme/theme.css      # Kinz brand colors
├── assets/              # Kinz logos, signatures
├── kb/                  # Knowledge base (RFP docs, briefs) — in scope when Claude runs here
├── memory/              # Stack-scoped auto-memory
└── pages/
    ├── info/Info1CCD.tsx
    ├── technical/
    │   ├── CoverPage.tsx
    │   ├── Tech1CoverLetter.tsx   # TECH-1 (1 page max)
    │   ├── Tech2JointTeam.tsx     # TECH-2 (5 pages max)
    │   ├── Tech2aCompanyExperience.tsx  # TECH-2a (5 pages max)
    │   ├── Tech3Methodology.tsx   # TECH-3 (15 pages max)
    │   ├── Tech4WorkSchedule.tsx  # TECH-4 (3 pages max)
    │   ├── Tech5Personnel.tsx     # TECH-5 (3 pages max)
    │   └── Tech6CVs.tsx           # TECH-6 (10 pages max)
    ├── financial/FinProposal.tsx  # FIN-1 + FIN-2 exports
    └── documents/                 # Internal docs — not submitted
```

To add or reorder a section, edit `stack.json` and (if needed) create a new `.tsx` under the matching group folder. Component IDs in `stack.json` must match named exports from the page file.

## Tender Sections & Page Limits

| Section | File | Max Pages | RFP Weight |
|---------|------|-----------|------------|
| TECH-1 | Tech1CoverLetter.tsx | 1 | — |
| TECH-2 | Tech2JointTeam.tsx | 5 | 15 pts (experience) |
| TECH-2a | Tech2aCompanyExperience.tsx | 5 | 15 pts (experience) |
| TECH-3 | Tech3Methodology.tsx | 15 | 50 pts (methodology) |
| TECH-4 | Tech4WorkSchedule.tsx | 3 | — |
| TECH-5 | Tech5Personnel.tsx | 3 | 35 pts (staff) |
| TECH-6 | Tech6CVs.tsx | 10 | 35 pts (staff) |

## How Sections Work

Each section is a React component. The `PageEntry` type includes a `maxPages` field:

```tsx
export interface PageEntry {
  id: PageId;
  label: string;
  component: React.FC;
  maxPages?: number;  // RFP page limit for this section
}
```

The sidebar displays the page limit badge next to each section. The cover page has no limit.

## Typography Standard

All pages MUST follow this type scale. No exceptions.

| Role | Class | Size | Example |
|------|-------|------|---------|
| **Cover title** | `text-3xl font-bold` | 30px | Cover page main title only |
| **Page title** | `text-xl font-bold` | 20px | `TECH-2: Joint Team` |
| **Section heading** | `text-base font-bold` | 16px | `A. Company Organization` |
| **Sub-heading** | `text-sm font-bold` | 14px | `Organizational Structure`, project card titles |
| **Body text** | `text-[13px]` | 13px | All paragraphs, descriptions, project writeups |
| **Table text** | `text-xs` | 12px | Table cells, form field values, labels |
| **Badge** | `text-[10px]` | 10px | Page limit badges only |
| **Footer** | `text-xs` | 12px | `Kinz — www.kinz.jo` + section/page number |

**Line heights:**
- Body text: `leading-[1.7]` or `leading-relaxed`
- Table/label text: default

**Font weight rules:**
- Page titles, section headings, sub-headings: `font-bold`
- Table headers: `font-semibold`
- Labels: `font-medium`
- Body text: normal weight (bold/strong for emphasis only)

**Do NOT:**
- Use `text-lg` for section headings (use `text-base`)
- Use `text-sm` for body paragraphs (use `text-[13px]`)
- Use `text-2xl` anywhere except the cover page
- Mix font sizes within the same content role across pages

## Writing Style

**Em dashes:** Minimize use of ` — ` (em dash). Overuse signals AI-generated content. Use commas, colons, semicolons, parentheses, or sentence restructuring instead. Reserve em dashes for rare cases where a strong parenthetical break genuinely improves readability. Target: no more than 1-2 per page, if any.

**Tone:** Professional, concise, structured, confident. No unnecessary jargon. Write like a senior consultant, not an AI.

**Avoid patterns that read as AI-generated:**
- Excessive em dashes
- Lists where a paragraph would be more natural
- Filler phrases ("It is worth noting that...", "In this context...")
- Restating what was just said in different words

## Page Layout Standard

All section pages (TECH-2 through TECH-6) MUST follow these structural rules. Tech1 is a letter format and is exempt.

**Content wrapper** (the div after the accent stripe):
```
className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden"
```

**Page title + badge** (first page of each section only):
```
className="flex items-center justify-between mb-4"
```

**Divider line** (after the title):
```
className="h-px mb-5"
```

**Footer** (every page):
```
className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
```
- Proposal pages left: `Kinz for Information Technology &middot; www.kinz.jo`
- Proposal pages right: `TECH-N &middot; Page X` (always include section name + page number)
- Document pages left: `Kinz for Information Technology &middot; Internal Document` or `&middot; Confidential`
- Document pages right: `Document Name &middot; Page X`

**Section heading with left accent bar:**
```tsx
<div className="flex items-center gap-2 mb-3">
  <div className="w-1 h-5 rounded-full" style={{ background: 'var(--color-kinz-blue)' }} />
  <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Section Title</h2>
</div>
```

**Continuation pages** (P2, P3, etc.) use the same wrapper but do NOT repeat the page title/badge/divider.

## How to Add a New Section

Create a new file under `pages/<group>/` (e.g. `pages/technical/Tech7.tsx`), then add the section + component IDs to `stack.json` under the matching group. Every page MUST use this structure:

```tsx
import kinzIcon from '../../assets/KinzIcon.png';

export function MySection() {
  return (
    <div className="w-[794px] h-[1123px] flex flex-col">
      {/* Kinz accent stripe */}
      <div className="flex h-1.5 flex-shrink-0">
        <div className="flex-1" style={{ background: 'var(--color-kinz-red)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-orange)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-yellow)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-green)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-blue)' }} />
        <div className="flex-1" style={{ background: 'var(--color-kinz-navy)' }} />
      </div>

      <div className="flex-1 px-12 pt-8 pb-5 flex flex-col overflow-hidden">
        {/* Page title + badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={kinzIcon} alt="" className="w-7 h-7 opacity-20" />
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              TECH-N: Section Title
            </h1>
          </div>
          <span className="text-[10px] px-2 py-1 rounded font-semibold tracking-wide uppercase"
            style={{ background: 'var(--color-primary)', color: 'white' }}>
            N pages
          </span>
        </div>
        <div className="h-px mb-5" style={{ background: 'var(--color-border)' }} />

        {/* Section heading */}
        <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
          A. Section Heading
        </h2>

        {/* Body text */}
        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--color-text)' }}>
          Paragraph content...
        </p>

        {/* Sub-heading */}
        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
          Sub-heading
        </h3>

        {/* Footer — always at the bottom */}
        <div className="pt-3 mt-auto flex justify-between items-center text-xs border-t"
          style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          <span>Kinz for Information Technology &mdash; www.kinz.jo</span>
          <span>TECH-N &middot; Page X</span>
        </div>
      </div>
    </div>
  );
}
```

Multi-page documents export multiple components from the same file. Register every component name in the matching document's `components` array in `stack.json` (legacy stacks may still use `sections` — both are accepted by the loader).

## Theme (Kinz Brand)

Edit `theme/theme.css`:

```css
:root {
  --color-primary: #1976D2;      /* Kinz cube blue */
  --color-primary-light: #42A5F5;
  --color-dark: #1B2332;         /* Deep navy-charcoal */
  --color-kinz-red: #E53935;
  --color-kinz-orange: #F57C00;
  --color-kinz-yellow: #FDD835;
  --color-kinz-green: #43A047;
  --color-kinz-blue: #1976D2;
  --color-kinz-navy: #0D47A1;
}
```

## Page Content Patterns

**Light section:**
```tsx
<div className="rounded-lg p-5 mb-5" style={{ background: 'var(--color-light-bg)' }}>
  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Heading</h3>
  <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Content</p>
</div>
```

**Accent callout:**
```tsx
<div className="rounded-lg p-4" style={{ background: 'var(--color-primary)', color: 'white' }}>
  <p className="text-[13px] leading-[1.7]">
    <strong>Relevance:</strong> Explanation text...
  </p>
</div>
```

**Bordered card with left accent:**
```tsx
<div className="rounded-lg p-5 border-l-4" style={{ borderColor: 'var(--color-kinz-blue)', background: 'var(--color-light-bg)' }}>
  <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Heading</h3>
  <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>Content</p>
</div>
```

**Table:**
```tsx
<table className="w-full text-xs">
  <thead>
    <tr style={{ background: 'var(--color-light-bg)' }}>
      <th className="text-left py-2 px-4 font-semibold" style={{ color: 'var(--color-text)' }}>Header</th>
    </tr>
  </thead>
  <tbody style={{ color: 'var(--color-text)' }}>
    <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
      <td className="py-2 px-4">Cell</td>
    </tr>
  </tbody>
</table>
```

## PDF Export

The "Export to PDF" button calls `window.print()`. The print CSS in `print.css`:
- Hides the sidebar
- Renders ALL pages stacked (not just the active one)
- Adds page breaks between each page
- Forces exact color reproduction

In the browser print dialog, the user should select:
- **Destination:** Save as PDF
- **Margins:** None
- **Background graphics:** ON

## Rules

- Every page component MUST be exactly `w-[794px] h-[1123px]`
- Use `overflow-hidden` on the content wrapper to prevent footer overlap
- Do not put content outside the page wrapper — it will break PDF layout
- Follow the Typography Standard above — no ad-hoc font sizes
- Use Tailwind classes for spacing/layout, CSS variables for colors
- Keep page files focused — one file per section, multiple exports for multi-page sections
- Images should be placed in `src/assets/` and imported via `@assets/` alias
