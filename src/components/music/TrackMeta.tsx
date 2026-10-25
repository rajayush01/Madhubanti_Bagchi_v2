import { ExternalLink } from 'lucide-react'
import type { Track } from '../../types'

export default function TrackMeta({ t, center }: { t: Track; center?: boolean }) {
  const meta = [t.source, t.language, t.year].filter(Boolean).join(' · ')
  return (
    <>
      <p className={`font-serif font-light ${t.placeholder ? 'text-charcoal/60' : ''}`}>{t.title}</p>
      <p className="mt-1 text-sm text-charcoal/60">{meta}</p>
      {t.links.length > 0 && (
        <ul className={`mt-3 flex flex-wrap gap-x-5 gap-y-2 ${center ? 'justify-center' : ''}`}>
          {t.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1.5 text-maroon hover:text-bronze">
                {l.label} <ExternalLink size={12} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
