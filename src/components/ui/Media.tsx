type Tone = 'ink' | 'maroon' | 'sand' | 'charcoal' | 'ivory'
interface Props {
  src?: string; alt: string; label?: string; tone?: Tone; className?: string; eager?: boolean
}
const tones: Record<Tone, string> = {
  ink: 'from-charcoal to-black text-ivory',
  maroon: 'from-maroon to-[#220d12] text-ivory',
  sand: 'from-sand to-[#a89a84] text-ink',
  charcoal: 'from-[#3a363a] to-ink text-ivory',
  ivory: 'from-ivory to-sand text-ink',
}
// Renders the real asset when supplied, otherwise a clearly labelled placeholder.
export default function Media({ src, alt, label, tone = 'charcoal', className = '', eager }: Props) {
  if (src) {
    return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div role="img" aria-label={alt} className={`relative h-full w-full bg-gradient-to-br ${tones[tone]} ${className}`}>
      <span className="label absolute bottom-3 left-3 text-[0.6rem] opacity-60">{label ?? 'Placeholder image'}</span>
    </div>
  )
}
