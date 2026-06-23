import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { Window } from '../../components/window'

import denny from '../../../public/denny.jpeg'

const About = () => {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean }
          if (!motion) {
            gsap.set(targets, { opacity: 1, y: 0 })
            return
          }
          gsap.from(targets, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: scope.current, start: 'top 75%' },
          })
        }
      )
    },
    { scope }
  )

  return (
    <div ref={scope} className="w-full">
      <Window id="about" title="about">
        {/* faint background word */}
        <h1
          aria-hidden
          className="pointer-events-none absolute -bottom-6 right-2 select-none text-7xl text-fg opacity-[0.04] md:text-9xl"
        >
          who i am
        </h1>

        <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h1 data-reveal className="text-3xl sm:text-4xl">
              <span className="highlight">Get</span> to know me a little
            </h1>
            <p data-reveal className="mt-5 max-w-xl text-fg-muted">
              I&apos;m a Frontend Software Engineer and Team Leader with
              experience in building high-quality web and mobile applications.
              Skilled in React, Next.js, React Native, and TypeScript, I focus
              on creating scalable, user-centric solutions while leading and
              mentoring teams to achieve their best.
            </p>
          </div>

          <div
            data-reveal
            className="glass relative aspect-4/5 w-full overflow-hidden rounded-xl"
          >
            <Image
              src={denny}
              alt="Portrait of Hedênica"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>
      </Window>
    </div>
  )
}

export default About
