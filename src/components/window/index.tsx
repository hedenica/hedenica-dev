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
