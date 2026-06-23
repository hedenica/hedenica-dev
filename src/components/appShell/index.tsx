import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap, ScrollTrigger } from '../../lib/gsap'
import { NavRail } from '../navRail'
import { StatusBar } from '../statusBar'
import { Swirl } from '../swirl'
import { CursorGlow } from '../cursorGlow'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

type AppShellProps = {
  children: ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const [activeLabel, setActiveLabel] = useState('home')
  const scope = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGsap()

      // per-section accent hue shift
      const hues: Record<string, string> = {
        hero: '#ff2c55',
        about: '#ff3d8b',
        technologies: '#e0359b',
        projects: '#ff2c55',
        contact: '#ff2c55',
      }
      Object.entries(hues).forEach(([id, hue]) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              document.documentElement.style.setProperty('--accent', hue)
            }
          },
        })
      })

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const windows = gsap.utils.toArray<HTMLElement>('[data-window]')
          const { motion } = ctx.conditions as { motion: boolean }

          if (!motion) {
            gsap.set(windows, { opacity: 1, y: 0, scale: 1, rotateX: 0 })
            return
          }

          // windows fade + scale into focus as their section snaps in
          // (no vertical shift — keeps them centered during the reveal)
          windows.forEach((el) => {
            gsap.set(el, {
              transformPerspective: 1200,
              transformOrigin: 'center center',
            })
            gsap.from(el, {
              opacity: 0,
              scale: 0.93,
              rotateX: 6,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 60%', once: true },
            })
          })

          // ghost words drift on scroll for depth
          gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
            const amount = Number(el.dataset.parallax) || 12
            gsap.to(el, {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })

          // ambient life — drifting dot grid
          if (gridRef.current) {
            gsap.to(gridRef.current, {
              backgroundPosition: '44px 44px',
              duration: 6,
              ease: 'none',
              repeat: -1,
            })
          }
        }
      )

      ScrollTrigger.refresh()
    },
    { scope }
  )

  return (
    <div ref={scope} className="relative min-h-dvh overflow-x-hidden">
      {/* swirling particle field */}
      <Swirl />
      {/* soft glow following the cursor */}
      <CursorGlow />
      {/* animated dot grid */}
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* fixed grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

      {/* top title bar */}
      <header className="glass fixed top-0 left-0 z-40 flex h-12 w-full items-center justify-center rounded-none! border-x-0 border-t-0 px-4">
        <Link href="/" aria-label="Home">
          <h2 className="font-display text-lg leading-none tracking-tight">
            <span className="text-accent">{'< '}</span>
            hedênica
            <span className="text-accent">{' />'}</span>
          </h2>
        </Link>
        <span
          aria-hidden
          className="absolute right-4 hidden gap-2 font-mono text-xs text-fg-muted md:flex"
        >
          <span>–</span>
          <span>▢</span>
          <span>✕</span>
        </span>
      </header>

      <NavRail onActiveChange={setActiveLabel} />

      {/* page content — each child is a full-viewport snap panel */}
      <main className="relative">{children}</main>

      <StatusBar activeLabel={activeLabel} />
    </div>
  )
}

export default AppShell
