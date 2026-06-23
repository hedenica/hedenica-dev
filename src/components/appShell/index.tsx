import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, registerGsap, ScrollTrigger } from '../../lib/gsap'
import { NavRail } from '../navRail'
import { StatusBar } from '../statusBar'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

type AppShellProps = {
  children: ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  const [activeLabel, setActiveLabel] = useState('home')
  const scope = useRef<HTMLDivElement>(null)

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

      // windows slide into focus
      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const windows = gsap.utils.toArray<HTMLElement>('[data-window]')
          const { motion } = ctx.conditions as { motion: boolean }
          if (!motion) {
            gsap.set(windows, { opacity: 1, y: 0, scale: 1 })
            return
          }
          windows.forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 64,
              scale: 0.97,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            })
          })
        }
      )

      ScrollTrigger.refresh()
    },
    { scope }
  )

  return (
    <div ref={scope} className="relative min-h-dvh overflow-x-hidden">
      {/* fixed accent glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 18%, color-mix(in srgb, var(--accent) 40%, transparent), transparent 72%), radial-gradient(45% 40% at 80% 85%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)',
          transition: 'background 0.6s ease',
        }}
      />
      {/* fixed grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

      {/* top title bar */}
      <header className="glass fixed top-0 left-0 z-40 flex h-12 w-full items-center justify-center !rounded-none border-x-0 border-t-0 px-4">
        <Link href="/" aria-label="Home">
          <h2 className="font-display text-lg leading-none tracking-tight">
            <span className="text-accent">{'< '}</span>
            hedênica
            <span className="text-accent">{' />'}</span>
          </h2>
        </Link>
        <span
          aria-hidden
          className="absolute right-4 flex gap-2 font-mono text-xs text-fg-muted"
        >
          <span>–</span>
          <span>▢</span>
          <span>✕</span>
        </span>
      </header>

      <NavRail onActiveChange={setActiveLabel} />

      {/* page content */}
      <main className="relative flex flex-col items-center gap-20 px-4 pt-24 pb-28 sm:px-6 md:gap-28 md:pr-8 md:pl-24">
        {children}
      </main>

      <StatusBar activeLabel={activeLabel} />
    </div>
  )
}

export default AppShell
