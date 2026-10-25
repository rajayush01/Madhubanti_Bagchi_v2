import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../utils/scroll'

gsap.registerPlugin(ScrollTrigger)

// Subtle scrubbed parallax for a single image. Skipped for reduced motion.
export default function Parallax({ children, amount = 8, className = '' }: { children: ReactNode; amount?: number; className?: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { yPercent: -amount }, {
        yPercent: amount, ease: 'none',
        scrollTrigger: { trigger: outer.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, outer)
    return () => ctx.revert()
  }, [amount])
  return (
    <div ref={outer} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-[116%] w-full -mt-[8%]">{children}</div>
    </div>
  )
}
