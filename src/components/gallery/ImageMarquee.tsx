import { useEffect, useRef, useState } from 'react'
import {
  motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue,
} from 'framer-motion'
import { gallery } from '../../data/gallery'
import Media from '../ui/Media'
import Eyebrow from '../ui/Eyebrow'

type Item = (typeof gallery)[number]

const size = {
  portrait: 'h-[58vh] w-[min(38vh,70vw)]',
  landscape: 'h-[46vh] w-[min(72vh,88vw)]',
  square: 'h-[50vh] w-[min(50vh,78vw)]',
} as const
// stagger frames up/down so the row feels like a gallery wall
const lift = ['-translate-y-[5vh]', 'translate-y-[6vh]', 'translate-y-0', 'translate-y-[4vh]'] as const
const tones = ['sand', 'maroon', 'ivory', 'charcoal'] as const

function Frame({ g, i, p, reduce }: { g: Item; i: number; p: MotionValue<number>; reduce: boolean | null }) {
  // image drifts inside its frame as the section scrolls
  const drift = useTransform(p, [0, 1], ['-7%', '7%'])
  return (
    <li className={`shrink-0 ${reduce ? '' : lift[i % lift.length]}`}>
      <figure className="group">
        <div className={`relative overflow-hidden rounded-sm border border-ivory/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${size[g.ratio]}`}>
          <motion.div style={reduce ? undefined : { x: drift }} className="h-full w-full scale-[1.18] transition-transform duration-700 ease-out group-hover:scale-[1.26]">
            <Media src={g.src} alt={g.alt} label={g.caption} tone={tones[i % tones.length]} />
          </motion.div>
        </div>
        <figcaption className="mt-5 flex items-baseline gap-4">
          <span className="label text-[0.65rem] tracking-[0.3em] text-gold">{String(i + 1).padStart(2, '0')}</span>
          {g.caption && <span className="font-serif text-lg italic text-ivory/70">{g.caption}</span>}
        </figcaption>
      </figure>
    </li>
  )
}

export default function ImageMarquee() {
  const n = gallery.length
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [dist, setDist] = useState(0)
  const [vh, setVh] = useState(800)
  const [idx, setIdx] = useState(0)

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(p, [0, 1], [0, -dist])
  const bar = useTransform(p, [0, 1], ['0%', '100%'])
  useMotionValueEvent(p, 'change', (v) => setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n)))))

  // measure how far the track must travel
  useEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
      setVh(window.innerHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [n])

  if (n === 0) return null

  // Reduced motion: plain swipeable row, no pinning
  if (reduce) {
    return (
      <section aria-label="Image reel" className="bg-ink py-20">
        <div className="px-6 pb-10 md:px-12"><Eyebrow>Gallery</Eyebrow></div>
        <ul className="flex gap-6 overflow-x-auto px-6 pb-6 md:px-12">
          {gallery.map((g, i) => <Frame key={g.id} g={g} i={i} p={p} reduce />)}
        </ul>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      aria-label="Image reel"
      className="relative bg-ink text-ivory"
      style={{ height: dist + vh }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon/40 blur-[120px]" />

        {/* header */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-10 md:px-12 md:pt-14">
          <Eyebrow>Gallery</Eyebrow>
          <p className="label text-[0.65rem] tracking-[0.3em] text-ivory/60">
            <span className="text-gold">{String(idx + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </p>
        </div>

        {/* track */}
        <motion.ul
          ref={track}
          style={{ x }}
          className="relative flex w-max items-center gap-10 px-[10vw] md:gap-16"
        >
          {gallery.map((g, i) => <Frame key={g.id} g={g} i={i} p={p} reduce={reduce} />)}
        </motion.ul>

        {/* progress line */}
        <div className="absolute inset-x-6 bottom-10 h-px bg-ivory/15 md:inset-x-12" aria-hidden>
          <motion.div style={{ width: bar }} className="h-px bg-gold" />
        </div>
      </div>
    </section>
  )
}