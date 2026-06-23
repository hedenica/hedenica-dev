import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { CardProject, type Project } from '../../components/cardProject'
import { Window } from '../../components/window'

type Company = {
  name: string
  href: string
  time: string
  description: string
  projects: Project[]
}

const companies: Company[] = [
  {
    name: 'Zé Delivery | Anheuser-Busch InBev',
    href: 'https://www.ze.delivery',
    time: 'September, 2021 | Present',
    description:
      'Zé Delivery is the largest beverage delivery app in the world, with over 44 billion orders in 2021.',
    projects: [
      {
        id: 1,
        name: 'Zé Delivery App',
        description:
          'A delivery app; my squad owns the member-get-member features, acting as a growth asset that brings new users to the platform via referral discount coupons.',
        responsibilities: [
          {
            id: 'ze-1',
            item: '◉ Bring UI designs to life as realistically as possible',
          },
          {
            id: 'ze-2',
            item: '◉ Implement events to track user interactions (web and mobile app)',
          },
          {
            id: 'ze-3',
            item: '◉ Test our features through unit tests and own feature deploys',
          },
        ],
      },
    ],
  },
  {
    name: 'SAS Plataforma de Educação',
    href: 'https://saseducacao.com.br/',
    time: 'April, 2020 | September, 2021',
    description:
      'This company provides integrated solutions to private schools all over Brazil. During my time there I actively worked on 3 main projects.',
    projects: [
      {
        id: 2,
        name: 'Classroom',
        description:
          'Enables teachers and students to interact through chat and video, and to upload/download files of unlimited size.',
        responsibilities: [
          {
            id: 'sas1-1',
            item: '◉ Decide with the team the best architecture for the project',
          },
          {
            id: 'sas1-2',
            item: '◉ Bring UI designs to life as realistically as possible',
          },
          {
            id: 'sas1-3',
            item: '◉ Started the testing culture in the company',
          },
          { id: 'sas1-4', item: '◉ Worked with micro-frontends' },
        ],
      },
      {
        id: 3,
        name: 'Lesson Plan',
        description:
          "Aimed to make the teacher's life easier, making it possible to plan materials online for different classes.",
        responsibilities: [
          {
            id: 'sas2-1',
            item: '◉ Decide with the team the best architecture for the project',
          },
          {
            id: 'sas2-2',
            item: '◉ Bring UI designs to life as realistically as possible',
          },
          {
            id: 'sas2-3',
            item: '◉ Started the testing culture in the company',
          },
          { id: 'sas2-4', item: '◉ Worked with micro-frontends' },
        ],
      },
      {
        id: 4,
        name: 'SAS Adapt',
        description:
          'Aimed to make teaching more flexible — the teacher had the autonomy to change the entire content according to the rhythm of the class.',
        responsibilities: [
          {
            id: 'sas3-1',
            item: '◉ Decide with the team the best architecture for the project',
          },
          {
            id: 'sas3-2',
            item: '◉ Bring UI designs to life as realistically as possible',
          },
          {
            id: 'sas3-3',
            item: '◉ Started the testing culture in the company',
          },
          { id: 'sas3-4', item: '◉ Worked with micro-frontends' },
        ],
      },
    ],
  },
]

function Projects() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-work-row]')

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean }
          if (!motion) {
            gsap.set(rows, { opacity: 1, y: 0 })
            return
          }
          gsap.from(rows, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: { trigger: scope.current, start: 'top 70%' },
          })
        }
      )
    },
    { scope }
  )

  // running start index for each company's numbered rows
  const startIndices = companies.reduce<number[]>((acc, company, i) => {
    acc.push(i === 0 ? 1 : acc[i - 1] + companies[i - 1].projects.length)
    return acc
  }, [])

  return (
    <section
      id="projects"
      ref={scope}
      className="flex min-h-dvh w-full snap-center items-center justify-center px-4 py-16 md:pr-8 md:pl-24"
    >
      <Window title="work">
        <h1 className="mb-10 text-3xl sm:text-4xl">
          <span className="highlight">Professional</span> projects
        </h1>

        <div className="flex flex-col gap-12">
          {companies.map((company, ci) => {
            const startIndex = startIndices[ci]
            return (
              <div key={company.name}>
                <a
                  href={company.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-xl transition-colors hover:text-accent"
                >
                  {company.name}
                </a>
                <p className="mt-1 font-mono text-xs text-fg-muted">
                  {company.time}
                </p>
                <p className="mt-3 mb-5 max-w-2xl text-sm text-fg-muted">
                  {company.description}
                </p>
                <CardProject
                  projects={company.projects}
                  startIndex={startIndex}
                />
              </div>
            )
          })}
        </div>

        <h1
          aria-hidden
          className="mt-14 text-right text-5xl text-fg opacity-[0.07] select-none md:text-7xl"
        >
          what i&apos;ve done
        </h1>
      </Window>
    </section>
  )
}

export default Projects
