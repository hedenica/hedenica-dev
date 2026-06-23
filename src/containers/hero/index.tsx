import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { Window } from '../../components/window'

const glyphs = [
  { char: '{ }', top: '12%', left: '8%', size: 'text-5xl', depth: 0.6 },
  { char: '#', top: '18%', left: '82%', size: 'text-6xl', depth: 1 },
  { char: '/', top: '68%', left: '14%', size: 'text-7xl', depth: 0.8 },
  { char: '</>', top: '72%', left: '78%', size: 'text-4xl', depth: 1.2 },
  { char: ';', top: '44%', left: '90%', size: 'text-5xl', depth: 0.5 },
]

const Hero = () => {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motion } = ctx.conditions as { motion: boolean }

          if (!motion) {
            gsap.set(lines, { opacity: 1, y: 0 })
            return
          }

          gsap.from(lines, {
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            delay: 0.35,
          })

          gsap.utils.toArray<HTMLElement>('[data-glyph]').forEach((el) => {
            const depth = Number(el.dataset.depth) || 1
            // scroll parallax
            gsap.to(el, {
              yPercent: -40 * depth,
              ease: 'none',
              scrollTrigger: {
                trigger: scope.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            })
          })

          // continuous ambient float — alive without scrolling
          gsap.utils.toArray<HTMLElement>('[data-glyph]').forEach((el, i) => {
            gsap.to(el, {
              rotation: i % 2 ? 12 : -12,
              scale: 1.12,
              duration: 4 + i * 0.7,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
          })
        }
      )
    },
    { scope }
  )

  return (
    <section
      id="hero"
      ref={scope}
      className="flex min-h-dvh w-full snap-center items-center justify-center px-4 py-16 md:pr-8 md:pl-24"
    >
      <Window title="home" className="relative">
        {/* floating glyph decor */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {glyphs.map((g) => (
            <span
              key={g.char + g.top}
              data-glyph
              data-depth={g.depth}
              className={`absolute font-mono ${g.size} text-fg opacity-[0.06]`}
              style={{ top: g.top, left: g.left }}
            >
              {g.char}
            </span>
          ))}
        </div>

        <div className="relative flex flex-col justify-center py-6">
          <p
            data-hero-line
            className="mb-4 font-mono text-xs tracking-[0.3em] text-fg-muted uppercase"
          >
            home
          </p>
          <h1
            data-hero-line
            className="text-4xl leading-tight sm:text-5xl md:text-6xl"
          >
            <span className="highlight">Howdy,</span> my name is Hedênica
          </h1>
          <h1
            data-hero-line
            className="mt-2 text-3xl leading-tight text-fg-muted sm:text-4xl md:text-5xl"
          >
            and I&apos;m a frontend engineer
          </h1>
          <blockquote
            data-hero-line
            className="mt-8 max-w-xl font-mono text-sm text-fg-muted"
          >
            &quot;with great power comes great responsibility&quot;
          </blockquote>
        </div>
      </Window>
    </section>
  )
}

export default Hero
