import type Lenis from 'lenis'

let instance: Lenis | null = null
export const setLenis = (l: Lenis | null) => { instance = l }
export const getLenis = () => instance

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: 0 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
}
