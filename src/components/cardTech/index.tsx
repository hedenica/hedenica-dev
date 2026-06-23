interface CardTechProps {
  techs: {
    tag: string
    tech: {
      id: number
      name: string
    }[]
  }[]
}

export const CardTech = ({ techs }: CardTechProps) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {techs.map((group) => (
      <div key={group.tag} data-tech-group className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
          {group.tag}
        </p>
        <div className="flex flex-wrap gap-2">
          {group.tech.map(({ id, name }) => (
            <span
              key={id}
              data-tech-chip
              className="glass rounded-full px-3 py-1.5 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)
