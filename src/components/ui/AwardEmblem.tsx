// Laurel-wreath medallion used as the award visual until a real trophy photo is supplied.
export default function AwardEmblem({ className = '' }: { className?: string }) {
  const leaf = (a: number, side: 1 | -1, k: number) => {
    const rad = (a * Math.PI) / 180
    const x = 100 + 66 * Math.cos(rad), y = 100 + 66 * Math.sin(rad)
    return <ellipse key={`${side}${k}`} cx={x} cy={y} rx="4.2" ry="11" transform={`rotate(${a + side * 25} ${x} ${y})`} fill="url(#ae-g)" opacity={0.95 - k * 0.04} />
  }
  const star = Array.from({ length: 10 }, (_, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? 11 : 27
    return `${100 + rr * Math.cos(ang)},${100 + rr * Math.sin(ang)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Award emblem">
      <defs>
        <linearGradient id="ae-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#D2B97F" /><stop offset="1" stopColor="#8F7036" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="#B69A62" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="44" fill="none" stroke="#B69A62" strokeWidth="0.8" />
      {Array.from({ length: 9 }, (_, k) => leaf(150 + k * 11, 1, k))}
      {Array.from({ length: 9 }, (_, k) => leaf(30 - k * 11, -1, k))}
      <polygon points={star} fill="url(#ae-g)" />
    </svg>
  )
}
