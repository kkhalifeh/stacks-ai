# Stack — __STACK_NAME__

16:9 slide deck using the Kinz design system, translated to landscape.

## Slide patterns

**Title slide** (`TitleSlide`)
- Dark background (`var(--color-dark)`) with two radial-gradient washes drawn from the brand palette
- 6-stripe accent bar at top
- White Kinz logo top-left (h-12)
- Uppercase tracked label in `--color-primary-light`
- `text-5xl font-bold` title
- 3-bar rainbow accent under the title (sizes 10/6/3)
- Subtitle + descriptor
- Prepared-by / date row at bottom

**Content slide** (`ContentSlide`)
- Light background
- 6-stripe accent bar at top
- Faded logo + section badge in header
- `text-3xl font-bold` heading with left accent bar (w-1.5 h-8, kinz-blue)
- 3-column card grid, each card with a differently-colored left border (red / blue / green), `var(--color-light-bg)` fill
- Footer: Kinz for Information Technology left, deck + slide number right

## Typography scale

- Title slide heading: `text-5xl font-bold`
- Content slide heading: `text-3xl font-bold`
- Body: `text-[15px]` intro, `text-[12px] leading-[1.6]` card body
- Badge / labels: `text-xs` / `text-[10px]`

## Adding a slide

1. Create a `.tsx` file under `pages/<binder-id>/`.
2. Export the slide component(s). Each returns a `div` at `w-[1280px] h-[720px]`.
3. Register in `stack.json` under the matching binder's `documents[].components` array.
4. Use `var(--color-kinz-*)` tokens and `var(--color-primary)` / `var(--color-text)` — do not hard-code hex values.

## Knowledge base

Drop references into `kb/`. When Claude Code is launched inside this stack, only this stack's `kb/`, `CLAUDE.md`, and `memory/` are in scope.
