import { useMemo } from 'react'

// Hanging fairy-light string across the top of a section.
export default function LightString({ swags = 4, className = '' }) {
  const { path, bulbs } = useMemo(() => {
    const y = (t) => 5 + 24 * Math.abs(Math.sin(t * Math.PI * swags))
    const pts = Array.from({ length: 101 }, (_, i) => `${i === 0 ? 'M' : 'L'}${i} ${y(i / 100).toFixed(2)}`).join(' ')
    const per = 5, n = swags * per + 1
    return { path: pts, bulbs: Array.from({ length: n }, (_, i) => ({ t: i / (n - 1), y: y(i / (n - 1)) })) }
  }, [swags])
  const cols = ['#F4D58D', '#c7a6ff', '#D9A441', '#FFF5DC']
  return (
    <div className={`absolute inset-x-0 top-0 h-[40px] pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="#D9A441" strokeOpacity=".6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {bulbs.map((b, i) => (
        <span key={i} className="absolute rounded-full"
          style={{
            left: `${b.t * 100}%`, top: b.y, width: 8, height: 8, marginLeft: -4,
            background: cols[i % 4], boxShadow: `0 0 10px 2px ${cols[i % 4]}99`,
            animation: `twinkle ${2.4 + (i % 4) * 0.6}s ease-in-out ${i * 0.17}s infinite`
          }} />
      ))}
    </div>
  )
}
