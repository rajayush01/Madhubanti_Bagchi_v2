import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { artist } from '../data/artist'
import { tracks } from '../data/music'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import Media from '../components/ui/Media'
import AudioPreview from '../components/music/AudioPreview'
import TrackMeta from '../components/music/TrackMeta'

const ease = [0.22, 1, 0.36, 1] as const
const outline = { WebkitTextStroke: '1px rgba(182,154,98,0.45)', color: 'transparent' } as const

export default function MusicSection() {
  const n = tracks.length
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  const more = artist.streaming[0]

  if (n === 0) return null
  const go = (d: number) => setI((v) => (v + d + n) % n)
  const active = tracks[i]
  const marquee = tracks.map((t) => t.title).join('   ✦   ') + '   ✦   '

  return (
    <section
      id="music"
      aria-label="The music"
      className="relative overflow-hidden bg-sand/40 px-6 py-24 md:px-12 md:py-36"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
    >
      {/* outlined marquee of titles */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none">
        <motion.div
          className="flex w-max font-serif text-[18vw] italic leading-none"
          style={outline}
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <span className="shrink-0 whitespace-pre">{marquee}</span>
          <span className="shrink-0 whitespace-pre">{marquee}</span>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <header>
          <Eyebrow>Selected works</Eyebrow>
          <Lines as="h2" lines={['Latest Releases']} className="display mt-6 text-6xl md:text-8xl" />
        </header>

        <div className="mt-16 grid items-center gap-16 lg:mt-24 lg:grid-cols-12">
          {/* ───── Info ───── */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
              >
                <span className="block font-serif text-[8rem] font-light leading-[0.9] md:text-[12rem]" style={outline} aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="-mt-4 font-serif text-4xl font-light text-ink md:-mt-8 md:text-6xl">{active.title}</h3>
                <p className="label mt-4 text-[0.65rem] tracking-[0.3em] text-maroon">
                  {[active.source, active.language].filter(Boolean).join(' · ')}
                </p>
                <div className="mt-6 max-w-md text-charcoal/80"><TrackMeta t={active} /></div>
                {active.previewUrl && (
                  <div className="mt-6 max-w-md"><AudioPreview src={active.previewUrl} title={active.title} /></div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <button onClick={() => go(-1)} aria-label="Previous track" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-ivory"><ArrowLeft size={18} /></button>
                <button onClick={() => go(1)} aria-label="Next track" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-ivory"><ArrowRight size={18} /></button>
              </div>
              <div className="h-px w-32 bg-ink/15" aria-hidden>
                <motion.div className="h-px bg-maroon" animate={{ width: `${((i + 1) / n) * 100}%` }} transition={{ duration: 0.5, ease }} />
              </div>
              <span className="label text-[0.65rem] tracking-[0.3em] text-ink/60">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            </div>

            <div className="mt-10">
              {more ? (
                <a href={more.href} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border-b border-maroon pb-2 text-sm uppercase tracking-[0.25em] text-maroon transition-colors hover:text-ink">
                  Listen on streaming
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span title="Add an official streaming link in data/artist.ts" className="text-sm uppercase tracking-[0.25em] text-ink/40">Streaming links soon</span>
              )}
            </div>
          </div>

          {/* ───── Swipe deck ───── */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-[min(78vw,380px)]">
              {tracks.map((t, idx) => {
                const d = (idx - i + n) % n
                const top = d === 0
                return (
                  <motion.div
                    key={t.id}
                    aria-hidden={!top}
                    drag={top && n > 1 ? 'x' : false}
                    dragSnapToOrigin
                    dragElastic={0.7}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) go(info.offset.x < 0 ? 1 : -1)
                    }}
                    onClick={() => !top && setI(idx)}
                    whileDrag={{ scale: 1.03 }}
                    initial={false}
                    animate={{
                      y: Math.min(d, 3) * 26,
                      scale: 1 - Math.min(d, 3) * 0.06,
                      rotate: top ? 0 : (d % 2 ? 1 : -1) * (2 + d),
                      opacity: d > 3 ? 0 : 1,
                    }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 20 }}
                    style={{ zIndex: n - d }}
                    className={`absolute inset-0 overflow-hidden rounded-2xl border-[6px] border-ivory shadow-[0_30px_70px_-25px_rgba(16,16,18,0.55)] ${top ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${d > 3 ? 'pointer-events-none' : ''}`}
                  >
                    <Media src={t.artwork} alt={top ? `${t.title} artwork` : ''} label="Artwork placeholder" tone="maroon" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 pt-16">
                      <span className="font-serif text-2xl text-ivory">{t.title}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <p className="label mt-20 text-center text-[0.6rem] tracking-[0.3em] text-ink/50">Drag the card to browse</p>
          </div>
        </div>
      </div>
    </section>
  )
}