import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { CardTech } from '../../components/cardTech'
import { Window } from '../../components/window'

const techs = [
  {
    tag: 'language',
    tech: [
      { id: 0, name: 'Javascript' },
      { id: 1, name: 'Typescript' },
    ],
  },
  {
    tag: 'frameworks',
    tech: [
      { id: 2, name: 'Next JS' },
      { id: 3, name: 'Remix' },
    ],
  },
  {
    tag: 'libraries',
    tech: [
      { id: 4, name: 'React JS' },
      { id: 5, name: 'React Native' },
    ],
  },
  {
    tag: 'styling',
    tech: [
      { id: 6, name: 'Styled Components' },
      { id: 7, name: 'CSS' },
      { id: 8, name: 'CSS Modules' },
      { id: 9, name: 'Tailwind' },
    ],
  },
  {
    tag: 'state management',
    tech: [
      { id: 10, name: 'Context API' },
      { id: 11, name: 'Redux' },
    ],
  },
  {
    tag: 'data',
    tech: [
      { id: 12, name: 'API Rest' },
      { id: 13, name: 'GraphQL' },
    ],
  },
  {
    tag: 'testing',
    tech: [
      { id: 14, name: 'Jest' },
      { id: 15, name: 'React Testing Library' },
    ],
  },
  {
    tag: 'tooling',
    tech: [
      { id: 16, name: 'ES Lint' },
      { id: 17, name: 'Husky' },
      { id: 18, name: 'Prettier' },
    ],
  },
]

function Technologies() {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const chips = gsap.utils.toArray<HTMLElement>('[data-tech-chip]')

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean }
          if (!motion) {
            gsap.set(chips, { opacity: 1, y: 0 })
            return
          }
          gsap.from(chips, {
            opacity: 0,
            y: 16,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.03,
            scrollTrigger: { trigger: scope.current, start: 'top 75%' },
          })
        }
      )
    },
    { scope }
  )

  return (
    <div ref={scope} className="w-full">
      <Window id="technologies" title="tech">
        <h1 className="mb-8 text-3xl sm:text-4xl">
          <span className="highlight">My</span> technologies
        </h1>
        <CardTech techs={techs} />
      </Window>
    </div>
  )
}

export default Technologies
