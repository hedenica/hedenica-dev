import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register on first client-side import, before any component effect runs.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// Kept for explicit call sites (idempotent no-op after the import above).
export function registerGsap() {
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export { gsap, ScrollTrigger }
