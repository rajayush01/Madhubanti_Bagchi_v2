import { useCallback, useRef, useState } from 'react'
import { gallery } from '../data/gallery'
import Lines from '../components/ui/Lines'
import Media from '../components/ui/Media'
import RevealImage from '../components/ui/RevealImage'
import Lightbox from '../components/gallery/Lightbox'

const ratio = { portrait: 'aspect-[3/4]', landscape: 'aspect-[3/2]', square: 'aspect-square' } as const
const tones = ['sand', 'maroon', 'ivory', 'charcoal'] as const

export default function GallerySection() {
  const [index, setIndex] = useState<number | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const close = useCallback(() => { setIndex(null); opener.current?.focus() }, [])
  return (
    <section id="gallery" className="bg-sand/40 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <Lines as="h2" lines={['Gallery']} className="display text-5xl md:text-8xl" />
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <RevealImage key={g.id} className="break-inside-avoid">
              <button
                onClick={(e) => { opener.current = e.currentTarget; setIndex(i) }}
                aria-label={`Open image: ${g.alt}`}
                className={`group relative block w-full overflow-hidden ${ratio[g.ratio]}`}
              >
                <div className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]">
                  <Media src={g.src} alt={g.alt} label={g.caption} tone={tones[i % tones.length]} />
                </div>
                {g.caption && (
                  <span className="label absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-left text-ivory opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {g.caption}
                  </span>
                )}
              </button>
            </RevealImage>
          ))}
        </div>
      </div>
      <Lightbox items={gallery} index={index} onClose={close} onChange={setIndex} />
    </section>
  )
}
