# Portfolio Refactor — "Terminal OS" Direction

**Date:** 2026-06-22
**Owner:** Hedênica
**Status:** Design — pending approval

## 1. Goal

Visually refactor the existing single-page portfolio into a dark, glassy, motion-forward
"Terminal OS / desktop app" experience, inspired by Stefano Bartoletti's portfolio. Replace
the Framer Motion animation layer with **GSAP + ScrollTrigger** for scroll-driven section
transitions, and migrate **all** `*.module.css` styling to **Tailwind v4** (already installed).

**All sections are open to a full refactor** — layout, structure, component shape, data shape, and
presentation are all free to change to best fit the Terminal OS look. We are free to delete old
styling, animation, and component code.

**Content is treated as placeholder.** The existing copy (bio, tech list, Zé Delivery + SAS project
facts) is carried over as-is so nothing renders empty, but Hedênica will update the real text later.
We do not need to preserve exact wording or data structure — only keep sensible placeholders in
place so each section is populated and the layout is real.

## 2. Non-goals

- No new content, copy rewrite, or new sections.
- No CMS, no backend, no routing changes (stays a single page, Next.js pages router).
- No three.js / WebGL. Floating glyph decor is CSS/SVG + GSAP only.
- Not migrating to the app router.

## 3. Visual Design System

### 3.1 Palette (dark + pink)

Single accent family = **pink**, kept from the current theme.

| Token              | Value                    | Use                   |
| ------------------ | ------------------------ | --------------------- |
| `--bg`             | `#1b1b1b`                | app background (kept) |
| `--surface`        | `rgba(255,255,255,0.04)` | glass window fill     |
| `--surface-border` | `rgba(255,255,255,0.10)` | glass window border   |
| `--fg`             | `#eee`                   | primary text (kept)   |
| `--fg-muted`       | `rgba(238,238,238,0.55)` | secondary/mono labels |
| `--accent`         | `#ff2c55`                | primary pink (kept)   |
| `--accent-2`       | `#e53279`                | hover pink (kept)     |

**Per-section hue shift** (the "dynamic theming"): a single `--accent` CSS variable is animated
by ScrollTrigger as each section enters, cycling within the pink/magenta/crimson family. The glow
color, window edge highlight, and `.highlight` text all read from `--accent`, so one variable
drives the whole theme shift.

- Hero → `#ff2c55` (hot pink)
- About → `#ff3d8b` (rose-pink)
- Technologies → `#e0359b` (magenta)
- Projects → `#ff2c55` (back to hot pink)

### 3.2 Typography

- **Bree Serif** (kept) → display headings (`h1`–`h3`) and the `< hedênica />` logo. The logo
  treatment is preserved exactly, including the pink `<` `/>` tag glyphs.
- **Monospace** (JetBrains Mono, loaded via Google Fonts) → all "terminal/UI" chrome: window
  title bars, status-bar text, nav labels, tech tags, the live clock. This is what sells the OS look.
- **Roboto** (kept) → body paragraphs.

### 3.3 Effects (glassmorphism)

- Glass surfaces: `backdrop-blur` + low-opacity white fill + 1px hairline border + soft inner
  highlight on the top edge. Tailwind utilities: `backdrop-blur-md bg-white/5 border border-white/10`.
- Accent glow: large, soft radial pink glow behind/around the active window, driven by `--accent`.
- Subtle film grain overlay (CSS, fixed, very low opacity) for the cinematic dark feel.
- A 1px pink "active edge" highlight on the right/top of the focused window (Stefano signature).

## 4. Layout & Information Architecture

Single scrolling page. Each section is rendered as **its own floating glassy app-window** with a
mini title bar (e.g. `home`, `about`, `tech`, `work`), stacked vertically with generous spacing
and slight horizontal offset, on a shared dark canvas. Three persistent global chrome elements
frame the page:

1. **Top title bar** — `< hedênica />` logo (Bree Serif, kept) centered; faux window controls
   (`– ▢ ✕`) on the right as decoration.
2. **Left icon rail** (fixed) — vertical nav: Home / About / Tech / Work / Contact. Monospace/SVG
   icons (Lucide-style, hand-rolled SVG to avoid new deps, matching existing icon approach).
   Scroll-spy highlights the active section in pink; click smooth-scrolls (GSAP ScrollTo).
3. **Bottom status bar** (fixed) — left: section breadcrumb (`⌂ › about`); center: `Based in
São Paulo · Local time HH:MM` (live client clock); right: social icons (GitHub, LinkedIn,
   Instagram, Twitter — kept) + a `let's-work-together →` pill CTA linking to
   `https://www.linkedin.com/in/hedenica/`.

Section order is unchanged: **Hero → About → Technologies → Projects**, plus the global
Navbar (top bar + rail) and Footer (folded into the status bar).

### Projects ("work") — full rework

Free to redesign. Target presentation: each company (Zé Delivery, SAS) as a glass sub-window, with
its projects as a clean list/grid of rows — project name + description, expandable (or always-on)
responsibilities — styled like Stefano's numbered "work" list (`01 …`, tech tags, year). The
existing nested `zeProjects` / `sasProjects` data is preserved in content but may be reshaped into
a single normalized list grouped by company.

## 5. Component Architecture

New/changed components under the existing structure (`src/components`, `src/containers`):

- `components/appShell/` — **new**. Renders top title bar, left icon rail, bottom status bar, the
  grain overlay, and the accent-glow layer. Wraps `<main>` in `_app.tsx`. Owns the `--accent`
  variable and the scroll-spy state.
- `components/window/` — **new**. Reusable glass "app-window" frame: mini title bar + body slot.
  Every container renders inside one. Props: `title`, `id`, `accentEdge?`.
- `components/clock/` — **new**. Live HH:MM client clock (hydration-safe).
- `components/navRail/` — **new**. Icon nav + scroll-spy.
- `components/statusBar/` — **new** (absorbs current `footer`).
- `components/iconRail icons` — extend existing `components/icons` with the rail glyphs + arrow.
- `components/button/` — restyle to Tailwind (the CTA pill).
- `components/cardProject/` — **open to full rework** (see §4 Projects). Project facts preserved;
  card structure, layout, and interaction (e.g. the expand-to-responsibilities accordion) may be
  redesigned for the window aesthetic. Framer `motion`/`AnimatePresence` replaced by GSAP.
- `components/cardTech/` — **full rework**. Replace the Framer drag-carousel with a tagged glass
  grid of tech chips grouped by tag (GSAP staggered reveal), or a GSAP marquee — designer's choice.
  Tech names carried over as placeholder; drop the all-React-icon placeholder.
- `components/animations/wave/` — **delete** (Framer SVG wave) or rebuild as a GSAP-drawn line if
  we want to keep a hero flourish. Default: delete in favor of floating glyphs + glow.
- `containers/{hero,about,technologies,projects}/` — restyle to Tailwind, wrap in `Window`,
  GSAP entrance + scrub animations. Delete every `*.module.css`.

### Hero specifics

Headline `Howdy, my name is Hedênica / and I'm a frontend engineer / "with great power…"` kept.
Background: floating CSS/SVG code glyphs (`{ }`, `#`, `/`, `</>`) with GSAP parallax, plus the
pink radial glow. Replaces the wave SVG.

## 6. Animation System (GSAP + ScrollTrigger)

- Add `gsap` and `@gsap/react` (the `useGSAP` hook) as deps. GSAP + ScrollTrigger are fully free.
- Register `ScrollTrigger` and `ScrollToPlugin` once in `appShell`.
- Use `useGSAP(() => {...}, { scope })` per container for scoped, auto-cleaned animations.
- **Entrance**: each window fades/slides up + slight scale as it enters (`ScrollTrigger` with
  `start: 'top 80%'`), staggering inner elements (title → body → cards) 40ms each.
- **Scrub transitions**: parallax on the floating glyphs and the glow; a subtle pin/scale handoff
  between sections so scrolling feels like windows sliding into focus.
- **Accent shift**: a ScrollTrigger per section tweens `--accent` on `:root` via
  `gsap.to(documentElement, { '--accent': hue })` (using GSAP's CSS var support).
- **Scroll-spy**: ScrollTrigger `onToggle` updates the active nav-rail item and breadcrumb.
- **Nav click**: `gsap.to(window, { scrollTo: '#section' })`.
- **Reduced motion**: wrap all of the above in `gsap.matchMedia()` with a
  `(prefers-reduced-motion: reduce)` branch that disables scrub/parallax and shows content
  statically (entrance becomes instant fade). Required.

## 7. Styling Migration (module.css → Tailwind v4)

- Tailwind v4 is already wired (`@import 'tailwindcss'` in `styles/globals.css`).
- `globals.css` keeps: font imports (add JetBrains Mono), the `:root` design tokens (rewritten per
  §3.1), base resets, scrollbar styling (recolored to `--accent`), and `@theme` mappings so tokens
  are usable as Tailwind utilities (e.g. `bg-bg`, `text-accent`).
- Every `*.module.css` and `*.module.css` import is **deleted**; styling moves inline to Tailwind
  classes on the JSX. `declarations.d.ts` CSS-module typing can be removed if unused.
- Shared, repeated patterns (glass surface, glow) expressed as small `@utility` definitions or a
  reused className constant — not copied ad hoc.

## 8. Dependency Changes

- **Add:** `gsap`, `@gsap/react`.
- **Remove:** `framer-motion`, `react-hook-inview` (replaced by GSAP + ScrollTrigger).
- No other dependency changes.

## 9. Accessibility & Responsive

- Contrast: `#eee` on `#1b1b1b` passes AA; pink `#ff2c55` used for accents/large text, verified
  ≥3:1 against bg; never the only signal (active nav item also bolds + shows label).
- `prefers-reduced-motion` honored via `gsap.matchMedia` (§6).
- Nav rail items have `aria-label`; the live clock is `aria-hidden` decorative or politely labeled.
- Keyboard: nav rail is real links/buttons, focus-visible rings in pink, logical tab order.
- Responsive breakpoints 375 / 768 / 1024 / 1440:
  - Mobile: left icon rail collapses into a top hamburger → full-screen mono menu (Stefano mobile).
    Windows go full-width stacked, reduced offsets, status bar simplifies (clock + CTA).
  - Desktop: floating offset windows, full rail + status bar.
- Touch targets ≥44px on rail icons, CTA, social icons, project cards.

## 10. File Change Map

| Path                                                  | Action                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| `pages/_app.tsx`                                      | Wrap app in `AppShell`; register GSAP; drop Navbar/Footer imports |
| `pages/index.tsx`                                     | Keep section order; wrap each in `Window`                         |
| `styles/globals.css`                                  | Rewrite tokens, add `@theme`, mono font, recolor scrollbar        |
| `src/components/appShell/*`                           | new                                                               |
| `src/components/window/*`                             | new                                                               |
| `src/components/navRail/*`                            | new (from navbar)                                                 |
| `src/components/statusBar/*`                          | new (from footer)                                                 |
| `src/components/clock/*`                              | new                                                               |
| `src/components/navbar/*`                             | delete                                                            |
| `src/components/footer/*`                             | delete                                                            |
| `src/components/animations/wave/*`                    | delete                                                            |
| `src/components/button/*`                             | restyle → Tailwind                                                |
| `src/components/cardProject/*`                        | full rework → glass work-list + GSAP (facts preserved)            |
| `src/components/cardTech/*`                           | rebuild as glass tag-grid, GSAP                                   |
| `src/components/icons/*`                              | keep SVGs, drop module.css, add rail glyphs                       |
| `src/containers/{hero,about,technologies,projects}/*` | restyle → Tailwind + GSAP, delete `.module.css`                   |
| all `*.module.css`                                    | delete                                                            |

## 11. Risks / Notes

- GSAP scrub + per-section accent tween must stay performant (transform/opacity + CSS var only,
  no layout-animating). Watch CLS on the floating windows — reserve space.
- Hydration: live clock and any `Date`-based output must render a stable placeholder on the server
  to avoid mismatch.
- The floating-window offset layout is the trickiest responsive piece; mobile falls back to a
  simple full-width stack.
