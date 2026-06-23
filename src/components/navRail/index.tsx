import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from '../../lib/gsap'
import { HomeIcon, UserIcon, CodeIcon, BriefcaseIcon, MailIcon } from '../icons'

type NavItem = {
  id: string
  label: string
  Icon: (props: { size?: number; className?: string }) => React.ReactElement
}

const items: NavItem[] = [
  { id: 'hero', label: 'home', Icon: HomeIcon },
  { id: 'about', label: 'about', Icon: UserIcon },
  { id: 'technologies', label: 'tech', Icon: CodeIcon },
  { id: 'projects', label: 'work', Icon: BriefcaseIcon },
  { id: 'contact', label: 'contact', Icon: MailIcon },
]

type NavRailProps = {
  onActiveChange?: (label: string) => void
}

export const NavRail = ({ onActiveChange }: NavRailProps) => {
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const scope = useRef<HTMLDivElement>(null)

  const goTo = (id: string) => {
    setMenuOpen(false)
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useGSAP(
    () => {
      const setBoth = (id: string, label: string) => {
        setActive(id)
        onActiveChange?.(label)
      }
      items.forEach(({ id, label }) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setBoth(id, label),
        })
      })
    },
    { scope, dependencies: [] }
  )

  return (
    <div ref={scope}>
      {/* desktop rail */}
      <nav
        aria-label="Sections"
        className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 px-2 md:flex"
      >
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            aria-label={label}
            aria-current={active === id ? 'true' : undefined}
            className={`grid h-11 w-11 place-items-center rounded-lg transition-colors ${
              active === id ? 'text-accent' : 'text-fg-muted hover:text-fg'
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>

      {/* mobile hamburger */}
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        className="glass fixed top-1.5 right-2 z-50 grid h-9 w-9 place-items-center rounded-lg text-fg md:hidden"
      >
        <span className="font-mono text-lg leading-none">
          {menuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* mobile full-screen menu */}
      {menuOpen && (
        <nav
          aria-label="Sections"
          className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-3 bg-bg/95 px-10 font-mono text-2xl backdrop-blur-md md:hidden"
        >
          {items.map(({ id, label }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={`flex items-baseline gap-3 lowercase ${
                active === id ? 'text-accent' : 'text-fg'
              }`}
            >
              <span className="text-sm text-fg-muted">0{i + 1}</span>
              {label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
