# Document Builder — AI-GIS Tender Proposal

Section-based document builder for the AI-GIS PoC tender proposal. Each section maps to a required RFP form (TECH-1 through TECH-6) with enforced page limits. Sections are A4-sized React components (794×1123px). The user browses sections via the sidebar and exports to PDF via browser print.

## Quick Start

```bash
npm install && npm run dev
```

## Architecture

```
src/
├── app/
│   ├── App.tsx                    # Section registry + app shell
│   └── components/
│       ├── Sidebar.tsx            # Navigation (with page limits) + export
│       └── pages/                 # One file per tender section
│           ├── CoverPage.tsx              # Proposal cover
│           ├── Tech1CoverLetter.tsx       # TECH-1 (1 page max)
│           ├── Tech2JointTeam.tsx         # TECH-2 (5 pages max)
│           ├── Tech2aCompanyExperience.tsx # TECH-2a (5 pages max)
│           ├── Tech3Methodology.tsx       # TECH-3 (15 pages max)
│           ├── Tech4WorkSchedule.tsx      # TECH-4 (3 pages max)
│           ├── Tech5Personnel.tsx         # TECH-5 (3 pages max)
│           └── Tech6CVs.tsx              # TECH-6 (10 pages max)
├── assets/                        # Images, logos, etc.
└── styles/
    ├── theme.css                  # Brand colors (edit these first)
    ├── print.css                  # PDF/print styles
    ├── fonts.css                  # Font imports
    ├── tailwind.css               # Tailwind config
    └── index.css                  # Imports all above
```

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

Create a new file in `src/app/components/pages/`. Every page MUST use this structure:

```tsx
import kinzIcon from '@assets/KinzIcon.png';

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

Multi-page sections export multiple components from the same file. Register all pages in the `pages` array in `App.tsx`.

## Theme (Kinz Brand)

Edit `src/styles/theme.css`:

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
