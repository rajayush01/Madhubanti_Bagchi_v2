import { useState } from 'react'
import { Play } from 'lucide-react'
import { artist } from '../data/artist'
import Media from '../components/ui/Media'

export default function FeaturedVideoSection() {
  const { featuredVideo: v } = artist
  const [playing, setPlaying] = useState(false)
  const canPlay = Boolean(v.youtubeId || v.src)
  const thumb = v.poster ?? (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg` : undefined)
  return (
    <section id="videos" className="bg-ivory px-6 py-28 md:px-12 md:py-40" aria-label="Featured film">
      <div className="mx-auto max-w-[1500px]">
        <div className="relative aspect-video overflow-hidden bg-ink">
          {playing && !v.youtubeId && v.src ? (
            <video className="absolute inset-0 h-full w-full" src={v.src} poster={v.poster} controls autoPlay playsInline />
          ) : playing && v.youtubeId ? (
            <iframe
              className="absolute inset-0 h-full w-full" title={v.title}
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
            />
          ) : (
            <>
              <Media src={thumb} alt={`${v.title} thumbnail`} label="Video thumbnail placeholder" tone="ink" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-12">
                <div>
                  <h2 className="display text-4xl text-ivory md:text-7xl">{v.title}</h2>
                  <p className="mt-3 text-sm text-ivory/70">
                    {v.credits ?? (canPlay ? 'Placeholder film — replace in data/artist.ts' : 'Official film to be added.')}
                  </p>
                </div>
                <button
                  onClick={() => setPlaying(true)} disabled={!canPlay}
                  aria-label={canPlay ? `Play ${v.title}` : 'Video not yet available'}
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold text-gold backdrop-blur-sm transition-colors enabled:hover:bg-gold enabled:hover:text-ink disabled:opacity-40 md:h-28 md:w-28"
                >
                  <Play size={28} className="translate-x-0.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
