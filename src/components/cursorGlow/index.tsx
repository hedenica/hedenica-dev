import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const SIZE = 320

export const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: PointerEvent) => {
      xTo(e.clientX - SIZE / 2)
      yTo(e.clientY - SIZE / 2)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-0 hidden h-80 w-80 rounded-full opacity-50 mix-blend-screen md:block"
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,0.16), transparent 60%)',
      }}
    />
  )
}
