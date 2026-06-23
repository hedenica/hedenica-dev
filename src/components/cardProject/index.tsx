import { useState } from 'react'

type Responsibility = {
  id: string
  item: string
}

export type Project = {
  id: number
  name: string
  description: string
  responsibilities: Responsibility[]
}

type CardProjectProps = {
  projects: Project[]
  startIndex?: number
}

export const CardProject = ({ projects, startIndex = 1 }: CardProjectProps) => {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project, i) => {
        const isOpen = openId === project.id
        const num = String(startIndex + i).padStart(2, '0')

        return (
          <div
            key={project.id}
            data-work-row
            className="glass overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-0.5"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : project.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="font-mono text-sm text-accent">{num}</span>
              <span className="flex-1">
                <span className="block font-display text-xl sm:text-2xl">
                  {project.name}
                </span>
                <span className="mt-1 block text-sm text-fg-muted">
                  {project.description}
                </span>
              </span>
              <span
                aria-hidden
                className={`font-mono text-fg-muted transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>

            {/* expand via grid-rows trick — no layout jump */}
            <div
              className={`grid px-5 transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <h3 className="pb-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                  responsibilities
                </h3>
                <ul className="flex flex-col gap-1.5 pb-5 text-sm text-fg-muted">
                  {project.responsibilities.map((r) => (
                    <li key={r.id}>{r.item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
