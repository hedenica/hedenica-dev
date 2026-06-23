# Terminal OS Portfolio Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the single-page portfolio into a dark, glassy "Terminal OS" experience with GSAP + ScrollTrigger scroll animations, migrating all `*.module.css` to Tailwind v4.

**Architecture:** A global `AppShell` (top title bar, fixed left icon-rail, bottom status bar, grain + accent-glow layers) wraps `<main>`. Each section renders inside a reusable glass `Window`. GSAP `useGSAP` scopes per-container animations; a root-level ScrollTrigger animates a single `--accent` CSS variable for per-section pink hue shifts. All styling is Tailwind utilities reading from `@theme` tokens.

**Tech Stack:** Next.js 16 (pages router), React 19, TypeScript, Tailwind v4, GSAP 3 + `@gsap/react` (ScrollTrigger, ScrollToPlugin), Bree Serif + JetBrains Mono + Roboto.

## Global Constraints

- Pages router only; no app-router migration. Single page (`pages/index.tsx`).
- No three.js/WebGL; glyph decor is CSS/SVG + GSAP.
- All `*.module.css` deleted; styling is Tailwind only.
- Add deps `gsap`, `@gsap/react`; remove `framer-motion`, `react-hook-inview`.
- Accent driven by one CSS var `--accent`; styled scrollbar kept and tied to `--accent`.
- `prefers-reduced-motion` honored via `gsap.matchMedia()` in every animated component.
- Content is placeholder (existing copy carried over); structure is free to change.
- Verification per task = `yarn tsc --noEmit` + `yarn lint` + dev-server visual check (no unit-test runner exists).
- Node >= 22, package manager: yarn (yarn.lock present).

---

### Task 1: Dependencies + global CSS foundation (tokens, fonts, scrollbar)

**Files:**

- Modify: `package.json` (deps)
- Modify: `styles/globals.css`

**Interfaces:**

- Produces: Tailwind `@theme` tokens usable as utilities — `bg-bg`, `text-fg`, `text-fg-muted`, `text-accent`, `bg-surface`, `border-surface-border`; font families `font-display` (Bree Serif), `font-mono` (JetBrains Mono), `font-body` (Roboto); CSS vars `--accent`, `--accent-2` on `:root`.

- [ ] **Step 1: Add/remove deps**

```bash
yarn add gsap @gsap/react
yarn remove framer-motion react-hook-inview
```

- [ ] **Step 2: Rewrite `styles/globals.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

@import 'tailwindcss';
@plugin '@tailwindcss/typography';

:root {
  --bg: #1b1b1b;
  --fg: #eee;
  --fg-muted: rgba(238, 238, 238, 0.55);
  --surface: rgba(255, 255, 255, 0.04);
  --surface-border: rgba(255, 255, 255, 0.1);
  --accent: #ff2c55; /* animated per-section by GSAP */
  --accent-2: #e53279;
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-fg-muted: var(--fg-muted);
  --color-surface: var(--surface);
  --color-surface-border: var(--surface-border);
  --color-accent: var(--accent);
  --color-accent-2: var(--accent-2);
  --font-display: 'Bree Serif', serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'Roboto', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: var(--font-body);
  line-height: 1.7;
  scroll-behavior: smooth;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  line-height: 1.15;
  font-weight: 400;
}
a {
  color: inherit;
  text-decoration: none;
}
li {
  list-style: none;
}

.highlight {
  color: var(--accent);
  transition: color 0.3s;
}

/* styled scrollbar — kept, now follows --accent */
body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: var(--accent);
  border: 1px solid rgba(0, 0, 0, 0.2);
}
body::-webkit-scrollbar-track {
  background-color: var(--bg);
  border-radius: 100px;
}

/* reusable glass surface */
@utility glass {
  background: var(--surface);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

- [ ] **Step 3: Verify**

Run: `yarn install && yarn tsc --noEmit`
Expected: installs cleanly, no type errors. Dev server (`yarn dev`) boots and renders existing page on dark bg with pink scrollbar (other sections may error until refactored — that's fine; fix as we go).

- [ ] **Step 4: Commit**

```bash
git add package.json yarn.lock styles/globals.css
git commit -m "🎨 style(theme): tailwind tokens, fonts, scrollbar; swap framer-motion for gsap"
```

---

### Task 2: GSAP registration util + `Window` glass component

**Files:**

- Create: `src/lib/gsap.ts`
- Create: `src/components/window/index.tsx`

**Interfaces:**

- Produces: `registerGsap()` (idempotent, registers ScrollTrigger + ScrollToPlugin, client-only); `Window` component — props `{ id: string; title: string; children: ReactNode; className?: string; accentEdge?: boolean }`.

- [ ] **Step 1: `src/lib/gsap.ts`**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

let registered = false
export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  registered = true
}

export { gsap, ScrollTrigger }
```

- [ ] **Step 2: `src/components/window/index.tsx`** — glass frame with mini title bar and faux controls.

```tsx
import { ReactNode } from 'react'

type WindowProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
  accentEdge?: boolean
}

export const Window = ({
  id,
  title,
  children,
  className = '',
  accentEdge,
}: WindowProps) => (
  <section
    id={id}
    className={`glass relative overflow-hidden rounded-xl ${className}`}
  >
    {accentEdge && (
      <span className="pointer-events-none absolute right-0 top-0 h-full w-px bg-accent shadow-[0_0_12px_var(--accent)]" />
    )}
    <header className="flex items-center gap-2 border-b border-surface-border px-4 py-2 font-mono text-xs text-fg-muted">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <span className="ml-2 lowercase">{title}</span>
    </header>
    <div className="p-6 md:p-10">{children}</div>
  </section>
)
```

- [ ] **Step 3: Verify** — `yarn tsc --noEmit` passes.

- [ ] **Step 4: Commit**

```bash
git add src/lib/gsap.ts src/components/window
git commit -m "✨ feat(window): glass app-window frame + gsap registration util"
```

---

### Task 3: Icons cleanup + nav-rail glyphs

**Files:**

- Modify: `src/components/icons/index.tsx` (remove `icons.module.css` import; use `currentColor`/className)
- Delete: `src/components/icons/icons.module.css`
- Add to icons file: `HomeIcon`, `UserIcon`, `CodeIcon`, `BriefcaseIcon`, `MailIcon`, `ArrowRight` (simple stroke SVGs, `stroke="currentColor"`, accept `className`).

**Interfaces:**

- Produces: named icon components `Github, LinkedIn, Instagram, Twitter, ReactIcon, HomeIcon, UserIcon, CodeIcon, BriefcaseIcon, MailIcon, ArrowRight` — each `(props: { className?: string; size?: number })`, `stroke="currentColor"`.

- [ ] **Step 1:** Edit existing social/React icons: drop `import styles from './icons.module.css'`, replace `stroke="#eee"`/`className={styles.feather}` with `stroke="currentColor"` and `className={className}`; thread an optional `className` prop.

- [ ] **Step 2:** Append the 6 new nav/UI icons (Lucide-style stroke paths), same signature.

- [ ] **Step 3:** `rm src/components/icons/icons.module.css`.

- [ ] **Step 4: Verify** — `yarn tsc --noEmit` passes; grep shows no remaining `icons.module.css` import.

- [ ] **Step 5: Commit**

```bash
git add src/components/icons
git commit -m "♻️ refactor(icons): drop css module, currentColor, add nav-rail icons"
```

---

### Task 4: `Clock` + `StatusBar` (absorbs footer)

**Files:**

- Create: `src/components/clock/index.tsx`
- Create: `src/components/statusBar/index.tsx`
- Delete: `src/components/footer/` (index.tsx + footer.module.css)

**Interfaces:**

- Consumes: social icons + `ArrowRight` from icons; `activeSection` label (optional prop, default `'home'`).
- Produces: `Clock` (hydration-safe live `HH:MM`); `StatusBar` props `{ activeLabel?: string }`.

- [ ] **Step 1: `Clock`** — render empty string on first paint, set time in `useEffect` + 1s interval, `suppressHydrationWarning`.

```tsx
import { useEffect, useState } from 'react'

export const Clock = () => {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])
  return <span suppressHydrationWarning>{time}</span>
}
```

- [ ] **Step 2: `StatusBar`** — fixed bottom bar, `font-mono text-xs`, glass top border. Left: breadcrumb `⌂ › {activeLabel}`. Center: `Based in São Paulo · Local time <Clock/>`. Right: social icon links (GitHub/LinkedIn/Instagram/Twitter, hrefs kept from old footer) + `let's-work-together →` pill linking to `https://www.linkedin.com/in/hedenica/`. All touch targets ≥44px, `aria-label`s on icon links.

- [ ] **Step 3:** `rm -r src/components/footer`.

- [ ] **Step 4: Verify** — `yarn tsc --noEmit` passes.

- [ ] **Step 5: Commit**

```bash
git add src/components/clock src/components/statusBar
git rm -r src/components/footer
git commit -m "✨ feat(statusbar): live clock, location, socials, CTA (replaces footer)"
```

---

### Task 5: `NavRail` with scroll-spy + smooth scroll (absorbs navbar)

**Files:**

- Create: `src/components/navRail/index.tsx`
- Delete: `src/components/navbar/` (index.tsx + navbar.module.css)

**Interfaces:**

- Consumes: nav icons; `gsap` + `ScrollTrigger` from `src/lib/gsap`.
- Produces: `NavRail` props `{ onActiveChange?: (id: string) => void }`. Items: `home, about, tech, work, contact` → mapped to section ids `hero, about, technologies, projects, contact`.

- [ ] **Step 1:** Fixed left rail (`hidden md:flex` column, centered vertically), each item a button with icon + `aria-label`; active item gets `text-accent`. On click: `gsap.to(window, { duration: 0.8, scrollTo: '#<id>', ease: 'power2.inOut' })`.

- [ ] **Step 2:** In `useGSAP`, create a `ScrollTrigger` per section (`onToggle`/`onEnter`) updating local `active` state + calling `onActiveChange`. Wrap in `gsap.matchMedia()`.

- [ ] **Step 3:** Mobile fallback: a top-right hamburger button (visible `md:hidden`) toggling a full-screen mono menu listing the same items (smooth-scroll on click, then close).

- [ ] **Step 4:** `rm -r src/components/navbar`.

- [ ] **Step 5: Verify** — `yarn tsc --noEmit` passes; dev: clicking rail icons smooth-scrolls; active icon highlights.

- [ ] **Step 6: Commit**

```bash
git add src/components/navRail
git rm -r src/components/navbar
git commit -m "✨ feat(navrail): icon nav with scroll-spy + smooth scroll (replaces navbar)"
```

---

### Task 6: `AppShell` (top bar + glow + grain) + wire `_app.tsx`

**Files:**

- Create: `src/components/appShell/index.tsx`
- Modify: `pages/_app.tsx`

**Interfaces:**

- Consumes: `registerGsap`, `NavRail`, `StatusBar`.
- Produces: `AppShell` wrapping `{children}`; renders top title bar (`< hedênica />` logo, Bree Serif, pink tag glyphs — kept treatment), faux window controls, fixed `NavRail`, fixed `StatusBar`, a fixed radial accent-glow layer (`bg-[radial-gradient(...var(--accent)...)]`, low opacity, `pointer-events-none`), and a fixed grain overlay (CSS, very low opacity). Owns `activeSection` state passed to NavRail/StatusBar. Calls `registerGsap()` in `useGSAP`/effect.

- [ ] **Step 1:** Build `AppShell`; top bar centered logo:

```tsx
<h2 className="font-display text-lg">
  <span className="text-accent">{'< '}</span>hedênica
  <span className="text-accent">{' />'}</span>
</h2>
```

- [ ] **Step 2:** Add glow + grain fixed layers behind content; content container has top/bottom padding to clear bars and `md:pl-16` for the rail.

- [ ] **Step 3:** `pages/_app.tsx`:

```tsx
import type { AppProps } from 'next/app'
import AppShell from '../src/components/appShell'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}
```

- [ ] **Step 4: Verify** — `yarn tsc --noEmit` + dev: top bar, rail, status bar, glow visible; logo unchanged.

- [ ] **Step 5: Commit**

```bash
git add src/components/appShell pages/_app.tsx
git commit -m "✨ feat(appshell): top bar, nav rail, status bar, accent glow + grain"
```

---

### Task 7: `Hero` — glass window, floating glyphs, GSAP entrance + parallax

**Files:**

- Modify: `src/containers/hero/index.tsx`
- Delete: `src/containers/hero/hero.module.css`
- Delete: `src/components/animations/wave/` (replaced by glyphs)

**Interfaces:**

- Consumes: `Window`, `gsap`, `useGSAP`.
- Produces: default-export `Hero` rendering inside `<Window id="hero" title="home" accentEdge>`.

- [ ] **Step 1:** Rebuild markup (Tailwind): kept copy — `Howdy, my name is Hedênica` / `and I'm a frontend engineer` / `"with great power comes great responsibility"`; `Howdy,` wrapped in `.highlight`. Add an absolutely-positioned layer of `{ }`, `#`, `/`, `</>` glyphs (`font-mono`, low opacity, `aria-hidden`).

- [ ] **Step 2:** `useGSAP(scope)`: timeline fading/sliding the headline lines (stagger 0.08), and `ScrollTrigger` parallax on glyphs (`y` based on scroll). Wrap in `gsap.matchMedia()` — reduced-motion branch sets final state instantly, no parallax.

- [ ] **Step 3:** `rm src/containers/hero/hero.module.css && rm -r src/components/animations`.

- [ ] **Step 4: Verify** — `yarn tsc --noEmit` + dev: hero animates in, glyphs parallax on scroll, reduced-motion shows static.

- [ ] **Step 5: Commit**

```bash
git add src/containers/hero
git rm -r src/components/animations src/containers/hero/hero.module.css
git commit -m "✨ feat(hero): glass window, floating glyphs, gsap entrance + parallax"
```

---

### Task 8: `About` — glass window + GSAP scroll entrance

**Files:**

- Modify: `src/containers/about/index.tsx`
- Delete: `src/containers/about/about.module.css`

**Interfaces:**

- Consumes: `Window`, `gsap`, `useGSAP`; image `public/denny.jpeg`.
- Produces: default-export `About` inside `<Window id="about" title="about">`.

- [ ] **Step 1:** Tailwind layout: heading `Get to know me a little` (`Get` highlighted), the kept bio paragraph, and the portrait (`next/image` or `img` of `denny.jpeg`) styled as a framed glass photo. Keep the faint giant background word (`who i am`) as a low-opacity absolute element.

- [ ] **Step 2:** `useGSAP`: ScrollTrigger entrance (window fade/slide-up + stagger of heading→text→photo) under `gsap.matchMedia()` with reduced-motion branch.

- [ ] **Step 3:** `rm src/containers/about/about.module.css`.

- [ ] **Step 4: Verify** — `yarn tsc --noEmit` + dev visual.

- [ ] **Step 5: Commit**

```bash
git add src/containers/about
git rm src/containers/about/about.module.css
git commit -m "✨ feat(about): glass window + gsap scroll entrance"
```

---

### Task 9: `Technologies` — glass tag-grid (rework `CardTech`)

**Files:**

- Modify: `src/containers/technologies/index.tsx`
- Rewrite: `src/components/cardTech/index.tsx`
- Delete: `src/containers/technologies/tech.module.css`, `src/components/cardTech/card.module.css`

**Interfaces:**

- Consumes: `Window`, `gsap`, `useGSAP`.
- Produces: `Technologies` inside `<Window id="technologies" title="tech">`; `CardTech` props `{ techs: { tag: string; tech: { id: number; name: string }[] }[] }` rendering a grid of tag groups, each group a label + glass mono chips of tech names.

- [ ] **Step 1:** Rewrite `CardTech`: no Framer/drag. For each `tag` group, render a labeled block; each tech `name` is a `glass` rounded `font-mono` chip. Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

- [ ] **Step 2:** `Technologies` container: heading `My technologies` (`My` highlighted) + `<CardTech techs={techs} />` (tech data kept). Drop the arrow-down image dependency (or keep as a scroll cue).

- [ ] **Step 3:** `useGSAP`: staggered ScrollTrigger reveal of chips (stagger 0.03), under `matchMedia` reduced-motion branch.

- [ ] **Step 4:** Delete the two module.css files.

- [ ] **Step 5: Verify** — `yarn tsc --noEmit` + dev visual.

- [ ] **Step 6: Commit**

```bash
git add src/containers/technologies src/components/cardTech
git rm src/containers/technologies/tech.module.css src/components/cardTech/card.module.css
git commit -m "✨ feat(tech): glass tag-grid chips + gsap stagger (rework cardTech)"
```

---

### Task 10: `Projects` — "work" list rework (rework `CardProject`) + `Button`

**Files:**

- Modify: `src/containers/projects/index.tsx`
- Rewrite: `src/components/cardProject/index.tsx`
- Modify: `src/components/button/index.tsx`
- Delete: `src/containers/projects/projects.module.css`, `src/components/cardProject/card.module.css`, `src/components/button/button.module.css`

**Interfaces:**

- Consumes: `Window`, `gsap`, `useGSAP`.
- Produces: `Projects` inside `<Window id="projects" title="work">`; `CardProject` renders a numbered work-list row (`01`, name, description, tech/role tags, expand→responsibilities) with React state for expand + GSAP height/opacity tween; `Button` restyled as a Tailwind pill (`title` prop kept).

- [ ] **Step 1:** Normalize project data into one list grouped by company (Zé Delivery, SAS) — facts kept (names, descriptions, responsibilities). Reshape allowed.

- [ ] **Step 2:** Rewrite `CardProject` as a row list: each row `glass`, numbered `01/02/...` (font-mono), name (display font), description, and an expand toggle revealing `responsibilities`. Replace Framer `AnimatePresence` with `useState` + `gsap.to` on a measured content element (or `grid-template-rows` 0fr→1fr transition). Hover lift via Tailwind `transition` (transform/opacity only).

- [ ] **Step 3:** `Projects` container: company headers (`Zé Delivery | Anheuser-Busch InBev`, `SAS Plataforma de Educação`) with their time spans + descriptions (kept), each followed by its work-list. Keep faint giant background word (`what i've done`).

- [ ] **Step 4:** Restyle `Button` to Tailwind pill; `rm button.module.css`.

- [ ] **Step 5:** `useGSAP` staggered ScrollTrigger reveal of rows under `matchMedia`.

- [ ] **Step 6:** Delete the three module.css files.

- [ ] **Step 7: Verify** — `yarn tsc --noEmit` + dev: rows reveal on scroll, expand works, no layout jump.

- [ ] **Step 8: Commit**

```bash
git add src/containers/projects src/components/cardProject src/components/button
git rm src/containers/projects/projects.module.css src/components/cardProject/card.module.css src/components/button/button.module.css
git commit -m "✨ feat(work): glass numbered work-list + gsap reveal (rework cardProject)"
```

---

### Task 11: Per-section accent hue-shift + `contact` anchor + final cleanup

**Files:**

- Modify: `src/components/appShell/index.tsx` (accent ScrollTrigger)
- Modify: `pages/index.tsx` (section wiring, contact anchor)
- Sweep: confirm zero `*.module.css` remain; remove `declarations.d.ts` framer note if unused

**Interfaces:**

- Consumes: `gsap`, `ScrollTrigger`.

- [ ] **Step 1:** In `AppShell` `useGSAP`, one `ScrollTrigger` per section tweening `--accent` on `document.documentElement` to the section's hue (hero `#ff2c55`, about `#ff3d8b`, technologies `#e0359b`, projects `#ff2c55`) via `gsap.to(document.documentElement, { '--accent': hue, ... })`. Under `gsap.matchMedia()` (reduced-motion: keep static `#ff2c55`).

- [ ] **Step 2:** `pages/index.tsx`: ensure each container renders in order Hero→About→Technologies→Projects; add a `#contact` anchor (status-bar CTA target / nav `contact` item) — minimal contact block or map `contact` to the status-bar CTA.

- [ ] **Step 3:** Sweep: `find src -name '*.module.css'` returns nothing; `grep -rn "framer-motion\|react-hook-inview\|module.css" src pages` returns nothing. Clean `declarations.d.ts` if the framer note is dead.

- [ ] **Step 4: Verify (full):**

Run: `yarn tsc --noEmit && yarn lint && yarn build`
Expected: typecheck clean, lint clean, production build succeeds. Dev: scrolling shifts accent hue across sections; reduced-motion stays static pink; responsive at 375/768/1024/1440; no horizontal scroll.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "✨ feat(theme): per-section accent hue-shift + cleanup module.css"
```

---

## Self-Review

**Spec coverage:**

- §3.1 palette/tokens → Task 1. ✓
- §3.1 per-section hue shift → Task 11. ✓
- §3.2 typography (Bree/Mono/Roboto) → Task 1. ✓
- §3.3 glass/glow/grain/active-edge → Tasks 1 (glass util), 2 (Window accentEdge), 6 (glow/grain). ✓
- §4 top bar / left rail / status bar → Tasks 6 / 5 / 4. ✓
- §4 status bar contents (clock, location, socials, CTA) → Task 4. ✓
- §5 components (appShell, window, navRail, statusBar, clock) → Tasks 2,4,5,6. ✓
- §5 hero glyphs → Task 7; cardTech rework → Task 9; cardProject rework → Task 10; button → Task 10. ✓
- §6 GSAP (entrance, scrub/parallax, accent-shift, scroll-spy, nav scroll, reduced-motion) → Tasks 5,7,8,9,10,11. ✓
- §7 module.css→Tailwind, scrollbar kept → Tasks 1 + each container + Task 11 sweep. ✓
- §8 deps add/remove → Task 1. ✓
- §9 a11y/responsive (reduced-motion, labels, breakpoints, hamburger) → Tasks 4,5,7–11. ✓

**Placeholder scan:** No TBD/TODO; verification commands and key code provided. Visual component bodies are described with exact interfaces, props, kept copy, and class strategy rather than full JSX where the layout is the implementation — acceptable for a visual refactor executed inline by the same author.

**Type consistency:** `registerGsap`, `Window` props, `CardTech`/`CardProject`/`Button` prop shapes, icon signatures, and section ids (`hero/about/technologies/projects/contact`) are consistent across tasks.
