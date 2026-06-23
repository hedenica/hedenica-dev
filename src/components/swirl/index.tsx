import { useEffect, useRef } from 'react'
import { createNoise3D } from 'simplex-noise'

// Soft flow-field particle background. Particles drift along a 3D simplex
// noise field and are drawn as soft glowing dots (blue / purple / pink),
// leaving short fluid trails.

const PROPS = 8 // x, y, vx, vy, life, ttl, speed, radius
const RANGE_Y = 130
const BAND = 0.74 // vertical origin of the particle band (0 = top, 1 = bottom)
const BASE_TTL = 80
const RANGE_TTL = 220
const BASE_SPEED = 0.06
const RANGE_SPEED = 0.9
const BASE_RADIUS = 1
const RANGE_RADIUS = 3
const NOISE_STEPS = 6
const X_OFF = 0.0014
const Y_OFF = 0.0014
const Z_OFF = 0.0006
const TAU = Math.PI * 2

const COLORS = [
  'rgba(120,150,255,0.9)', // blue
  'rgba(180,110,250,0.9)', // purple
  'rgba(255,95,165,0.9)', // pink
]

const rand = (n: number) => Math.random() * n
const randRange = (n: number) => n - rand(2 * n)
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m
  return Math.abs(((t + hm) % m) - hm) / hm
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const makeSprite = (color: string, size = 64) => {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const grd = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  grd.addColorStop(0, 'rgba(255,255,255,0.95)') // hot core for glow
  grd.addColorStop(0.18, color)
  grd.addColorStop(0.55, color)
  grd.addColorStop(1, 'transparent')
  g.fillStyle = grd
  g.beginPath()
  g.arc(size / 2, size / 2, size / 2, 0, TAU)
  g.fill()
  return c
}

export const Swirl = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const noise3D = createNoise3D()
    const sprites = COLORS.map((c) => makeSprite(c))
    const spriteIdx: number[] = []
    let w = 0
    let h = 0
    let cy = 0
    let props = new Float32Array(0)
    let tick = 0
    let raf = 0

    const initParticle = (i: number) => {
      props.set(
        [
          rand(w),
          cy + randRange(RANGE_Y),
          0,
          0,
          0,
          BASE_TTL + rand(RANGE_TTL),
          BASE_SPEED + rand(RANGE_SPEED),
          BASE_RADIUS + rand(RANGE_RADIUS),
        ],
        i
      )
      spriteIdx[i / PROPS] = Math.floor(rand(sprites.length))
    }

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 320 : 650
      props = new Float32Array(count * PROPS)
      for (let i = 0; i < props.length; i += PROPS) initParticle(i)
    }

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      cy = h * BAND
    }

    const update = (i: number) => {
      const x = props[i]
      const y = props[i + 1]
      const n = noise3D(x * X_OFF, y * Y_OFF, tick * Z_OFF) * NOISE_STEPS * TAU
      const vx = lerp(props[i + 2], Math.cos(n), 0.5)
      const vy = lerp(props[i + 3], Math.sin(n), 0.5)
      const speed = props[i + 6]
      const x2 = x + vx * speed
      const y2 = y + vy * speed
      const life = props[i + 4]
      const ttl = props[i + 5]
      const r = props[i + 7]

      const d = r * 2.6 // soft halo larger than the core for glow
      ctx.globalAlpha = fadeInOut(life, ttl) * 0.9
      ctx.drawImage(sprites[spriteIdx[i / PROPS]], x - d / 2, y - d / 2, d, d)

      props[i] = x2
      props[i + 1] = y2
      props[i + 2] = vx
      props[i + 3] = vy
      props[i + 4] = life + 1

      if (x2 > w || x2 < 0 || y2 > h || y2 < 0 || life > ttl) initParticle(i)
    }

    const draw = () => {
      tick++
      // clear fully each frame — no trails, just flowing particles
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = 0; i < props.length; i += PROPS) update(i)
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      resize()
      initParticles()
    }

    resize()
    initParticles()
    draw()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  )
}
