import { Clock } from '../clock'
import {
  Github,
  LinkedIn,
  Instagram,
  Twitter,
  ArrowRight,
} from '../icons'

type StatusBarProps = {
  activeLabel?: string
}

const socials = [
  { href: 'https://github.com/hedenica', label: 'GitHub', Icon: Github },
  {
    href: 'https://www.linkedin.com/in/hedenica/',
    label: 'LinkedIn',
    Icon: LinkedIn,
  },
  {
    href: 'https://www.instagram.com/_hedenica',
    label: 'Instagram',
    Icon: Instagram,
  },
  { href: 'https://twitter.com/hedenica', label: 'Twitter', Icon: Twitter },
]

export const StatusBar = ({ activeLabel = 'home' }: StatusBarProps) => (
  <footer className="glass fixed bottom-0 left-0 z-40 flex w-full items-center justify-between gap-3 border-t px-3 py-2 font-mono text-[11px] text-fg-muted sm:px-5">
    {/* breadcrumb */}
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="text-accent">⌂</span>
      <span className="opacity-50">›</span>
      <span className="truncate lowercase">{activeLabel}</span>
    </div>

    {/* location + clock (hidden on the smallest screens) */}
    <div className="hidden items-center gap-2 sm:flex">
      <span>Based in São Paulo</span>
      <span className="opacity-30">·</span>
      <span>
        Local time <Clock />
      </span>
    </div>

    {/* socials + CTA */}
    <div className="flex items-center gap-1">
      <div className="hidden items-center sm:flex">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid h-9 w-9 place-items-center text-fg-muted transition-colors hover:text-accent"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
      <a
        href="https://www.linkedin.com/in/hedenica/"
        target="_blank"
        rel="noreferrer"
        className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-fg transition-colors hover:text-accent"
      >
        let&apos;s-work-together
        <ArrowRight size={14} />
      </a>
    </div>
  </footer>
)
