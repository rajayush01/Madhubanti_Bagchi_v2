import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'
import { artist } from '../../data/artist'
import { prefersReducedMotion } from '../../utils/scroll'
import Media from '../ui/Media'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const [video, setVideo] = useState(false)
  const { hero } = artist

  // Video only on larger screens, only when motion is welcome; otherwise the still is used.
  useEffect(() => {
    setVideo(Boolean(hero.video) && !prefersReducedMotion() && window.matchMedia('(min-width: 768px)').matches)
  }, [hero.video])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-media', { opacity: 0, duration: 1.8, ease: 'power2.inOut' })
        .from('.hero-line', { yPercent: 110, duration: 1.3, stagger: 0.14 }, '-=1')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.6')
        .from('.hero-scroll', { opacity: 0, duration: 1 }, '-=0.3')
      gsap.to('.hero-parallax', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const still = hero.image
  return (
    <section ref={root} id="home" className="grain relative h-[100svh] min-h-[560px] overflow-hidden bg-ivory">
      <div className="hero-media absolute inset-0">
        <div className="hero-parallax absolute inset-x-0 -top-[6%] h-[112%]">
          {video && hero.video ? (
            <video className="h-full w-full object-cover" src={hero.video} poster={hero.poster ?? still} autoPlay muted loop playsInline preload="metadata" />
          ) : still ? (
            <picture>
              {hero.mobileImage && <source media="(max-width: 767px)" srcSet={hero.mobileImage} />}
              <img src={still} alt="Madhubanti Bagchi" className="h-full w-full object-cover" fetchPriority="high" />
            </picture>
          ) : (
            <Media alt="Hero portrait placeholder" label="Hero portrait — replace in data/artist.ts" tone="ivory" eager />
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/50 to-transparent" aria-hidden />

      {/* <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-12 md:pb-20">
        <p className="hero-sub label mb-5 text-maroon">{artist.descriptor}</p>
        <h1 className="display text-[clamp(2.75rem,13.5vw,13rem)] text-ink" aria-label={artist.name}>
          {artist.name.split(' ').map((w) => (
            <span key={w} className="block overflow-hidden pb-[0.06em]" aria-hidden>
              <span className="hero-line block">{w.toUpperCase()}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-sub max-w-md font-serif text-3xl font-light italic text-charcoal md:text-4xl">{artist.tagline}</p>
          <div className="hero-sub flex flex-col gap-3 sm:flex-row">
            <a href="#music" onClick={(e) => { e.preventDefault(); scrollToId('music') }} className="btn bg-ink text-ivory hover:bg-maroon">Explore the music</a>
            <a href="#videos" onClick={(e) => { e.preventDefault(); scrollToId('videos') }} className="btn border border-ink/30 text-ink hover:border-maroon hover:text-maroon">Watch films</a>
          </div>
        </div>
      </div> */}
      <div className="hero-scroll absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink/60 md:block" aria-hidden>
        <ArrowDown className="drift" size={20} />
      </div>
    </section>
  )
}
