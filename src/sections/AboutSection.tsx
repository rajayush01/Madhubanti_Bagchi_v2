import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { artist } from '../data/artist'
import Eyebrow from '../components/ui/Eyebrow'
import Lines from '../components/ui/Lines'
import Media from '../components/ui/Media'
import { scrollToId } from '../utils/scroll'

const ease = [0.22, 1, 0.36, 1] as const

export default function AboutSection() {
  const { intro } = artist
  const reduce = useReducedMotion()

  const arch = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)

  const { scrollYProgress: pArch } = useScroll({ target: arch, offset: ['start end', 'end start'] })
  const { scrollYProgress: pStrip } = useScroll({ target: strip, offset: ['start end', 'end start'] })

  const archImgY = useTransform(pArch, [0, 1], ['-7%', '7%'])
  const insetY = useTransform(pArch, [0, 1], [30, -50])
  const stripX = useTransform(pStrip, [0, 1], ['-4%', '4%'])

  const descriptors = artist.descriptor.split(' · ')
  const [lead, ...rest] = intro.body

  return (
    <section id="about" className="relative overflow-hidden bg-ivory text-ink">
      {/* Oversized ghost word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 select-none text-center font-serif text-[clamp(8rem,26vw,26rem)] italic leading-none text-gold/10"
      >
        Music
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 pb-24 pt-28 md:px-12 md:pb-36 md:pt-40">
        <div className="grid items-start gap-20 lg:grid-cols-12 lg:gap-12">
          {/* ───────── Left: arched portrait ───────── */}
          <div className="relative lg:col-span-5 lg:sticky lg:top-24">
            <div ref={arch} className="relative mx-auto w-full max-w-[520px]">
              <motion.div
                initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.4, ease }}
                className="relative aspect-[3/4.2] w-full overflow-hidden rounded-t-[999px] rounded-b-md shadow-[0_40px_80px_-30px_rgba(16,16,18,0.55)]"
              >
                <motion.div
                  style={{ y: reduce ? 0 : archImgY }}
                  className="absolute inset-x-0 -top-[8%] h-[116%]"
                >
                  <Media
                    src={intro.collage[1]}
                    alt="Portrait of Madhubanti Bagchi"
                    label="Portrait — replace in data/artist.ts"
                    tone="sand"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </motion.div>

              {/* Gold outline arch offset behind */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-5 top-5 -z-10 h-full w-full rounded-t-[999px] rounded-b-md border border-gold/50"
              />

              {/* Small inset portrait */}
              <motion.div
                style={{ y: reduce ? 0 : insetY }}
                className="absolute -bottom-10 -left-6 z-20 w-[38%] md:-left-12"
              >
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease, delay: 0.5 }}
                  className="aspect-square overflow-hidden rounded-full border-[6px] border-ivory shadow-[0_24px_50px_-18px_rgba(16,16,18,0.5)]"
                >
                  <Media
                    src={intro.collage[0]}
                    alt="Madhubanti Bagchi on stage"
                    label="Portrait — replace in data/artist.ts"
                    tone="maroon"
                  />
                </motion.div>
              </motion.div>

              {/* Rotating circular badge */}
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
                className="absolute -right-4 top-[58%] z-20 h-28 w-28 md:-right-10 md:h-36 md:w-36"
              >
                <svg viewBox="0 0 120 120" className="h-full w-full">
                  <defs>
                    <path id="about-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                  </defs>
                  <circle cx="60" cy="60" r="58" className="fill-ink" />
                  <text className="fill-ivory" style={{ fontSize: 9.5, letterSpacing: '0.28em' }}>
                    <textPath href="#about-circle">VOCALIST · COMPOSER · STORYTELLER ·</textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-gold md:text-3xl">
                  MB
                </span>
              </motion.div>
            </div>
          </div>

          {/* ───────── Right: story ───────── */}
          <div className="lg:col-span-7 lg:pl-10 lg:pt-16">
            <Eyebrow>The Artist</Eyebrow>
            <Lines
              as="h2"
              lines={['A journey', 'shaped by music.']}
              accentLast
              className="display mt-8 text-[clamp(3rem,7vw,6.5rem)]"
            />

            <div className="mt-14 grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
              {/* Vertical gold rule */}
              <div aria-hidden className="hidden w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:block" />

              <div className="max-w-2xl">
                {lead && (
                  <motion.p
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease }}
                    className="font-serif text-2xl font-light leading-[1.5] text-ink first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-[5.2rem] first-letter:leading-[0.8] first-letter:text-bronze md:text-[1.7rem]"
                  >
                    {lead}
                  </motion.p>
                )}
                <div className="mt-8 space-y-5 text-lg font-light leading-loose text-charcoal/70">
                  {rest.map((t, i) => (
                    <motion.p
                      key={t}
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                    >
                      {t}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* Numbered descriptors */}
            <ul className="mt-16 grid border-y border-ink/15 sm:grid-cols-3">
              {descriptors.map((d, i) => (
                <motion.li
                  key={d}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                  className="group relative px-1 py-8 sm:px-6 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-ink/15"
                >
                  <span className="font-serif text-sm italic text-bronze">0{i + 1}</span>
                  <p className="label mt-3 leading-7 text-charcoal/70 transition-colors group-hover:text-ink">{d}</p>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#journey"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('journey')
              }}
              className="label group mt-14 inline-flex items-center gap-5 rounded-full bg-ink py-3 pl-8 pr-3 text-ivory transition-colors duration-500 hover:bg-bronze"
            >
              Discover Her Story
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={18} aria-hidden />
              </span>
            </a>
          </div>
        </div>

        {/* ───────── Full-width cinematic strip ───────── */}
        <div ref={strip} className="relative mt-32 overflow-hidden rounded-md md:mt-44">
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0% 50% 0% 50%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.5, ease }}
            className="relative aspect-[21/9] w-full overflow-hidden rounded-md"
          >
            <motion.div style={{ x: reduce ? 0 : stripX }} className="absolute -inset-x-[5%] inset-y-0">
              <Media
                src={intro.collage[2]}
                alt="Madhubanti Bagchi in performance"
                label="Wide portrait — replace in data/artist.ts"
                tone="charcoal"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-xs font-serif text-xl italic leading-snug text-ivory md:bottom-10 md:left-10 md:text-3xl">
              Every note, a small homecoming.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}