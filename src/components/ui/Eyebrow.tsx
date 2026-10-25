// Gold rule + small caps label, used to open editorial sections.
export default function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p className={`label flex items-center gap-5 text-maroon ${className}`}>
      <span className="h-px w-14 bg-gold" aria-hidden />
      {children}
    </p>
  )
}
