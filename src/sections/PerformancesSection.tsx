import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { events } from '../data/events'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import { scrollToId } from '../utils/scroll'

type Ev = (typeof events)[number]

const parts = (iso: string, placeholder?: boolean) => {
  if (placeholder) return { day: '00', mon: 'Month', year: '20XX' }
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-IN', { month: 'short' }),
    year: String(d.getFullYear()),
  }
}

const daysTo = (iso: string, placeholder?: boolean) => {
  if (placeholder) return null
  const n = Math.round((new Date(iso).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5)
  return Number.isNaN(n) || n < 0 ? null : n
}

const enquire = (e: React.MouseEvent) => { e.preventDefault(); scrollToId('contact') }

function Ticket({ e, featured, idx }: { e: Ev; featured?: boolean; idx: number }) {
  const reduce = useReducedMotion()
  const p = parts(e.date, e.placeholder)
  const left = featured ? daysTo(e.date, e.placeholder) : null
  const info = [
    e.venue || e.city ? { Icon: MapPin, text: [e.venue, e.city].filter(Boolean).join(' · ') } : null,
    e.time ? { Icon: Clock, text: e.time } : null,
  ].filter(Boolean) as { Icon: typeof MapPin; text: string }[]

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative grid rounded-2xl transition-transform duration-500 hover:-translate-y-1 ${
        featured
          ? 'bg-ink text-ivory md:grid-cols-[minmax(0,1fr)_18rem] lg:col-span-2'
          : 'border border-charcoal/10 bg-sand/50 text-ink grid-cols-[minmax(0,1fr)_8rem]'
      }`}
    >
      {/* main */}
      <div className={`relative flex flex-col justify-between overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none ${featured ? 'min-h-[22rem] p-8 md:p-12' : 'rounded-r-none p-6'}`}>
        {featured && (
          <>
            {e.poster ? (
              <img src={e.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#54232D,transparent_70%)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          </>
        )}

        <div className="relative">
          {featured && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="label rounded-full border border-gold/60 px-4 py-1.5 text-[0.6rem] tracking-[0.3em] text-gold">Next up</span>
              {left !== null && (
                <span className="label text-[0.6rem] tracking-[0.25em] text-ivory/70">
                  {left === 0 ? 'Today' : `${left} day${left === 1 ? '' : 's'} to go`}
                </span>
              )}
            </div>
          )}
          <h3 className={`font-serif font-light leading-tight ${featured ? 'mt-8 text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>{e.title}</h3>
        </div>

        <div className={`relative ${featured ? 'mt-10' : 'mt-6'}`}>
          <ul className={`space-y-2 text-sm ${featured ? 'text-ivory/75' : 'text-charcoal/65'}`}>
            {info.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-2"><Icon size={14} className="shrink-0 text-gold" aria-hidden />{text}</li>
            ))}
          </ul>
          {e.placeholder && (
            <p className={`label mt-4 text-[0.55rem] ${featured ? 'text-gold' : 'text-maroon/70'}`}>Placeholder — replace in data/events.ts</p>
          )}
        </div>
      </div>

      {/* perforated stub */}
      <div
        className={`relative flex flex-col items-center justify-center gap-3 p-6 text-center ${
          featured
            ? 'border-t-2 border-dashed border-ivory/30 md:border-l-2 md:border-t-0'
            : 'border-l-2 border-dashed border-charcoal/25'
        }`}
      >
        <span aria-hidden className="absolute -left-3 -top-3 z-10 h-6 w-6 rounded-full bg-ivory" />
        <span
          aria-hidden
          className={`absolute z-10 h-6 w-6 rounded-full bg-ivory ${
            featured ? '-right-3 -top-3 md:-bottom-3 md:-left-3 md:right-auto md:top-auto' : '-bottom-3 -left-3'
          }`}
        />

        <p className={`font-serif font-light leading-none ${featured ? 'text-7xl' : 'text-5xl'} ${featured ? 'text-gold' : 'text-maroon'}`}>{p.day}</p>
        <p className={`label text-[0.65rem] tracking-[0.25em] ${featured ? 'text-ivory/70' : 'text-charcoal/60'}`}>{p.mon} {p.year}</p>

        {e.ticketUrl ? (
          <a
            href={e.ticketUrl} target="_blank" rel="noopener noreferrer"
            className={`btn mt-2 border ${featured ? 'border-gold text-gold hover:bg-gold hover:text-ink' : 'border-maroon text-maroon hover:bg-maroon hover:text-ivory'}`}
          >
            Tickets
          </a>
        ) : (
          <span className={`label mt-2 text-[0.6rem] ${featured ? 'text-ivory/45' : 'text-charcoal/40'}`}>Details soon</span>
        )}
      </div>
    </motion.li>
  )
}

export default function PerformancesSection() {
  const [next, ...rest] = events

  return (
    <section id="performances" className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40">
      <div className="pointer-events-none absolute -right-48 top-8 aspect-square w-[44rem] rounded-full border border-gold/30" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-32 aspect-square w-[30rem] rounded-full border border-gold/30" aria-hidden />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Live</Eyebrow>
            <Lines as="h2" lines={['Performances &', 'appearances']} accentLast className="display mt-8 text-[clamp(3rem,7vw,6.5rem)]" />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            {/* <p className="font-light leading-loose text-charcoal/70">Confirmed concerts, festivals and appearances. Only verified engagements are listed.</p> */}
            <a href="#contact" onClick={enquire} className="label group mt-8 inline-flex items-center gap-5 border-b border-maroon pb-3 text-maroon hover:border-gold hover:text-bronze">
              Live-performance enquiries <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="mt-20 flex flex-col items-center rounded-md border border-charcoal/15 bg-sand/30 px-6 py-20 text-center">
            <CalendarDays className="text-maroon" size={28} aria-hidden />
            <p className="mt-6 font-serif text-3xl font-light italic md:text-5xl">No dates announced yet.</p>
            <p className="mt-4 max-w-md text-charcoal/60">New dates will appear here as soon as they’re confirmed.</p>
          </div>
        ) : (
          <ul className="mt-20 grid gap-8 lg:grid-cols-2">
            <Ticket e={next} featured idx={0} />
            {rest.map((e, k) => <Ticket key={e.id} e={e} idx={k + 1} />)}
          </ul>
        )}
      </div>
    </section>
  )
}