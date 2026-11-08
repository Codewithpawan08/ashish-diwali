import { useMemo } from 'react'

export default function Stars({ count = 80 }) {
  const stars = useMemo(
    () => Array.from({ length: count }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      s: Math.random() * 2 + 0.8, d: Math.random() * 6, t: 2.5 + Math.random() * 4
    })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="absolute rounded-full bg-ivory"
          style={{
            left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s,
            animation: `twinkle ${s.t}s ease-in-out ${s.d}s infinite`,
            boxShadow: s.s > 2.3 ? '0 0 6px #F4D58D' : 'none'
          }} />
      ))}
    </div>
  )
}
