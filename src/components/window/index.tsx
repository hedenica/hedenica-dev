import { ReactNode } from 'react'

type WindowProps = {
  title: string
  children: ReactNode
  className?: string
}

export const Window = ({ title, children, className = '' }: WindowProps) => (
  <section
    data-window
    className={`glass relative flex max-h-[calc(100dvh-8rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl ${className}`}
  >
    <header className="flex shrink-0 items-center gap-2 border-b border-surface-border px-4 py-2.5 font-mono text-xs text-fg-muted">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </span>
      <span className="ml-2 lowercase tracking-wide">{title}</span>
    </header>
    <div className="min-h-0 overflow-y-auto p-6 sm:p-8 md:p-12">{children}</div>
  </section>
)
