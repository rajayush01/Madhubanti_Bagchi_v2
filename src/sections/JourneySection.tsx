import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { milestones } from '../data/artist'
import Lines from '../components/ui/Lines'
import { prefersReducedMotion } from '../utils/scroll'

gsap.registerPlugin(ScrollTrigger)

export default function JourneySection() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.j-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.j-list', start: 'top 70%', end: 'bottom 70%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="journey" className="bg-sand/40 px-6 py-28 text-ink md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Lines as="h2" lines={['The musical', 'journey']} className="display text-5xl md:text-7xl" />
            <p className="mt-6 max-w-xs text-charcoal/80">Milestones appear here once verified by the artist’s team.</p>
          </div>
        </div>
        <ol className="j-list relative lg:col-span-7 lg:col-start-6">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-charcoal/15" aria-hidden />
          <span className="j-fill absolute bottom-0 left-0 top-0 w-px origin-top bg-gold" aria-hidden />
          {milestones.map((m) => (
            <li key={m.id} className="relative pb-20 pl-10 last:pb-0 md:pl-14">
              <span className="absolute -left-[5px] top-3 h-[11px] w-[11px] rounded-full bg-maroon" aria-hidden />
              <p className="font-serif text-xl italic text-maroon">{m.period}</p>
              <h3 className="display mt-2 text-3xl md:text-5xl">{m.title}</h3>
              <p className={`mt-4 max-w-lg ${m.placeholder ? 'italic text-charcoal/60' : 'text-charcoal'}`}>{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
