import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { artist } from '../data/artist'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import ContactForm from '../components/contact/ContactForm'

const kinds = [
  ['Professional', 'Brand, film and music-industry enquiries.'],
  ['Live performance', 'Concerts, festivals and private events.'],
  ['Music & collaboration', 'Sessions, features and creative projects.'],
  ['Press', 'Interviews, features and media requests.'],
]

export default function ContactSection() {
  const { contact } = artist
  const reduce = useReducedMotion()
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8% 0px' },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="contact" className="relative overflow-hidden bg-sand/40 px-6 py-28 text-ink md:px-12 md:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-[560px] w-[560px] rounded-full bg-gold/20 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 aspect-square w-[34rem] rounded-full border border-gold/30" />

      <div className="relative mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Eyebrow>Contact</Eyebrow>
          <Lines as="h2" lines={['Let’s create', 'something', 'memorable.']} accentLast className="display mt-8 text-5xl md:text-8xl" />

          <dl className="mt-16 grid max-w-2xl gap-px overflow-hidden rounded-xl border border-charcoal/15 bg-charcoal/15 sm:grid-cols-2">
            {kinds.map(([t, d], idx) => (
              <motion.div key={t} {...reveal(idx * 0.08)} className="group bg-ivory p-7 transition-colors duration-500 hover:bg-maroon">
                <div className="flex items-start justify-between">
                  <span className="label text-[0.65rem] tracking-[0.3em] text-maroon transition-colors group-hover:text-gold">{String(idx + 1).padStart(2, '0')}</span>
                  <ArrowUpRight size={16} className="text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
                </div>
                <dt className="mt-8 font-serif text-2xl font-light transition-colors group-hover:text-ivory">{t}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-charcoal/70 transition-colors group-hover:text-ivory/75">{d}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div {...reveal(0.1)} className="mt-14">
            {contact.management || contact.email ? (
              <>
                {contact.management && <p className="label text-[0.65rem] tracking-[0.3em] text-charcoal/60">{contact.management}</p>}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="group mt-4 inline-flex items-center gap-4 break-all border-b border-maroon/60 pb-2 font-serif text-3xl font-light text-maroon transition-colors hover:border-gold hover:text-bronze md:text-5xl"
                  >
                    {contact.email}
                    <ArrowUpRight size={28} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                  </a>
                )}
              </>
            ) : (
              <p className="text-charcoal/70">Official management details will appear here once supplied.</p>
            )}
          </motion.div>
        </div>

        <motion.div {...reveal(0.15)} className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div className="relative">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border border-gold/70" />
            <div className="relative rounded-md bg-ivory p-8 shadow-[0_30px_70px_-30px_rgba(16,16,18,0.35)] md:p-12">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}