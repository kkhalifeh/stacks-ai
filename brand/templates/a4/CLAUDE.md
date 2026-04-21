# Stack — __STACK_NAME__

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
