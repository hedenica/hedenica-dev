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
    data-window
    className={`glass relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1 ${className}`}
  >
    {accentEdge && (
      <span className="pointer-events-none absolute right-0 top-0 h-full w-px bg-accent shadow-[0_0_18px_4px_var(--accent)]" />
    )}
    <header className="flex items-center gap-2 border-b border-surface-border px-4 py-2.5 font-mono text-xs text-fg-muted">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <span className="ml-2 lowercase tracking-wide">{title}</span>
    </header>
    <div className="p-6 sm:p-8 md:p-12">{children}</div>
  </section>
)
