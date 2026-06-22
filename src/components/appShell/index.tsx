import { ReactNode, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { registerGsap } from '../../lib/gsap'
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
    },
    { scope }
  )

  return (
    <div ref={scope} className="relative min-h-dvh">
      {/* fixed accent glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 25%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)',
          transition: 'background 0.6s ease',
        }}
      />
      {/* fixed grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] mix-blend-soft-light"
        style={{ backgroundImage: GRAIN }}
      />

      {/* top title bar */}
      <header className="glass fixed top-0 left-0 z-40 flex h-12 w-full items-center justify-center border-b px-4">
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
      <main className="mx-auto w-full max-w-5xl px-4 pt-20 pb-24 md:pl-20">
        {children}
      </main>

      <StatusBar activeLabel={activeLabel} />
    </div>
  )
}

export default AppShell
