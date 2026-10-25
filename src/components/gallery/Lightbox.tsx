import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem } from '../../types'
import Media from '../ui/Media'
import { getLenis } from '../../utils/scroll'

interface Props { items: GalleryItem[]; index: number | null; onClose: () => void; onChange: (i: number) => void }

export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const open = index !== null
  const touch = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const step = useCallback((d: number) => { if (index !== null) onChange((index + d + items.length) % items.length) }, [index, items.length, onChange])

  useEffect(() => {
    if (!open) return
    getLenis()?.stop()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); getLenis()?.start() }
  }, [open, onClose, step])

  const item = index !== null ? items[index] : null
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog" aria-modal="true" aria-label="Image viewer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 md:p-12"
          onClick={onClose}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touch.current === null) return
            const dx = e.changedTouches[0].clientX - touch.current
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            touch.current = null
          }}
        >
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center text-ivory"><X size={26} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous image" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory md:left-6"><ChevronLeft size={30} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next image" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory md:right-6"><ChevronRight size={30} /></button>
          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className={`mx-auto max-h-[78vh] ${item.ratio === 'landscape' ? 'aspect-[3/2]' : item.ratio === 'portrait' ? 'aspect-[3/4] h-[78vh]' : 'aspect-square h-[78vh]'} max-w-full`}>
              <Media src={item.src} alt={item.alt} label={item.alt} />
            </div>
            {item.caption && <figcaption className="label mt-4 text-center text-ivory/70">{item.caption}</figcaption>}
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
