import { useMemo } from 'react'

// Magical golden dust: lightweight CSS-only rising particles.
export default function Dust({ count = 26 }) {
  const items = useMemo(
    () => Array.from({ length: count }, () => ({
      left: Math.random() * 100, size: 2 + Math.random() * 4,
      dur: 12 + Math.random() * 14, delay: -Math.random() * 24, dx: (Math.random() - 0.5) * 120,
      violet: Math.random() > 0.78
    })),
    [count]
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`, width: p.size, height: p.size, '--dx': `${p.dx}px`,
            background: `radial-gradient(circle, ${p.violet ? '#c7a6ff' : '#F4D58D'} 0%, rgba(217,164,65,0) 72%)`,
            animation: `rise ${p.dur}s linear ${p.delay}s infinite`, willChange: 'transform, opacity'
          }} />
      ))}
    </div>
  )
}
