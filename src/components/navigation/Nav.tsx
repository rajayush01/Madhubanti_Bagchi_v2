import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { artist } from '../../data/artist'
import { getLenis, scrollToId } from '../../utils/scroll'

const items = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
   { id: 'performances', label: 'Performance' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!onHome) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!open) return
    getLenis()?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); getLenis()?.start() }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!onHome) return
    e.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-4 top-4 z-40 md:inset-x-8 md:top-6"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-md transition-all duration-500 md:px-8 ${
            scrolled ? 'border-ink/10 bg-ivory/90 shadow-[0_12px_40px_-14px_rgba(16,16,18,0.3)]' : 'border-ink/5 bg-ivory/55'
          }`}
        >
          <Link to="/" onClick={go('home')} className="font-serif text-lg tracking-[0.12em] text-ink md:text-xl">
            {artist.name.toUpperCase()}
          </Link>
          <ul className="hidden items-center gap-7 lg:flex">
            {items.map((i) => (
              <li key={i.id} className="relative">
                <Link to={`/#${i.id}`} onClick={go(i.id)} className={`label transition-colors duration-300 hover:text-maroon ${active === i.id && onHome ? 'text-maroon' : 'text-charcoal/80'}`}>
                  {i.label}
                </Link>
                {active === i.id && onHome && <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" aria-hidden />}
              </li>
            ))}
          </ul>
          <button className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ink/30 p-3 backdrop-blur-sm" onClick={() => setOpen(false)}
          >
            <div className="flex h-full flex-col rounded-3xl bg-ivory p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg tracking-[0.12em]">{artist.name.toUpperCase()}</span>
                <button className="flex h-11 w-11 items-center justify-center text-ink" aria-label="Close menu" onClick={() => setOpen(false)} autoFocus><X size={22} /></button>
              </div>
              <ul className="flex flex-1 flex-col justify-center gap-4">
                {items.map((i, n) => (
                  <motion.li key={i.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * n }}>
                    <Link to={`/#${i.id}`} onClick={(e) => { go(i.id)(e); if (!onHome) setOpen(false) }} className="font-serif text-4xl font-light text-ink hover:text-maroon">{i.label}</Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
