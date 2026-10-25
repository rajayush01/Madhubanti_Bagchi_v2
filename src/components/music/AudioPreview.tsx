import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

export default function AudioPreview({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = () => {
    const a = ref.current
    if (!a) return
    if (a.paused) {
      document.querySelectorAll('audio').forEach((o) => o !== a && o.pause())
      void a.play()
    } else a.pause()
  }
  return (
    <div className="flex items-center gap-4">
      <audio
        ref={ref} src={src} preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0) }}
        onTimeUpdate={(e) => { const a = e.currentTarget; setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0) }}
      />
      <button onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play preview of ${title}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-maroon text-maroon transition-colors hover:bg-maroon hover:text-ivory">
        {playing ? <Pause size={18} /> : <Play size={18} className="translate-x-px" />}
      </button>
      <input
        type="range" min={0} max={100} step={0.1} value={progress} aria-label={`Seek ${title}`}
        onChange={(e) => { const a = ref.current; if (a?.duration) a.currentTime = (Number(e.target.value) / 100) * a.duration }}
        className="h-1 w-full cursor-pointer accent-[#54232D]"
      />
    </div>
  )
}
