import { motion, useReducedMotion } from 'framer-motion'

interface Props { lines: string[]; as?: 'h1' | 'h2' | 'h3'; className?: string; accentLast?: boolean }
// Masked line-by-line headline reveal (Framer Motion; GSAP is reserved for the hero + scroll scrubs).
export default function Lines({ lines, as: Tag = 'h2', className = '', accentLast }: Props) {
  const reduce = useReducedMotion()
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className={`block ${accentLast && i === lines.length - 1 ? 'text-bronze' : ''}`}
            initial={reduce ? false : { y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
