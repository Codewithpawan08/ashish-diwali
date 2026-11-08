import { useId } from 'react'

// 3D-style diya built from layered gradients. `glow` (0..1) controls halo + flame size.
export default function Diya({ width = 160, glow = 0.4, className = '', style }) {
  const id = useId().replace(/:/g, '')
  const g = Math.max(0, Math.min(1, glow))
  const fs = 0.8 + g * 0.5
  return (
    <div className={`relative inline-block ${className}`} style={{ width, ...style }}>
      <div aria-hidden="true" className="absolute left-1/2 pointer-events-none rounded-full"
        style={{
          top: '34%', width: '240%', aspectRatio: '1',
          transform: `translate(-50%,-50%) scale(${0.5 + g * 0.75})`, opacity: 0.2 + g * 0.8,
          background: 'radial-gradient(circle, rgba(255,235,170,.6) 0%, rgba(217,164,65,.25) 26%, rgba(107,63,160,.14) 48%, transparent 68%)',
          transition: 'transform .8s ease, opacity .8s ease'
        }} />
      <svg viewBox="0 0 200 150" className="relative block w-full h-auto overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4D58D" /><stop offset=".45" stopColor="#D9A441" /><stop offset="1" stopColor="#7a4d14" />
          </linearGradient>
          <linearGradient id={`r${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#D9A441" /><stop offset=".5" stopColor="#FFF0BD" /><stop offset="1" stopColor="#C58A2A" />
          </linearGradient>
          <radialGradient id={`f${id}`} cx=".5" cy=".78" r=".65">
            <stop offset="0" stopColor="#FFFDF2" /><stop offset=".35" stopColor="#F4D58D" />
            <stop offset=".75" stopColor="#FFA63D" /><stop offset="1" stopColor="#E8721C" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="141" rx="72" ry="7" fill="#000" opacity=".4" />
        <path d="M18 76 C18 118 58 135 100 135 S182 118 182 76Z" fill={`url(#b${id})`} />
        <path d="M18 76 C8 74 2 66 0 56 C10 61 22 64 36 68Z" fill={`url(#b${id})`} />
        <path d="M34 88 Q44 112 72 122" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M42 96 Q100 122 158 96" stroke="#FFF5DC" strokeOpacity=".3" fill="none" />
        {[52, 72, 92, 112, 132, 148].map((x, i) => (
          <circle key={x} cx={x} cy={104 + (i === 0 || i === 5 ? -3 : i === 2 || i === 3 ? 4 : 0)} r="2.4" fill="#FFF5DC" opacity=".55" />
        ))}
        <ellipse cx="100" cy="76" rx="82" ry="15" fill={`url(#r${id})`} />
        <ellipse cx="100" cy="77" rx="70" ry="10" fill="#2f1707" />
        <ellipse cx="100" cy="76" rx="50" ry="6" fill="#4a2a0c" opacity=".7" />
        <rect x="98" y="62" width="4" height="15" rx="2" fill="#1f1005" />
        <g transform={`translate(100 68) scale(${fs})`}>
          <path className="flame" d="M0 -54 C10 -36 21 -20 21 -7 C21 5 11 12 0 12 C-11 12 -21 5 -21 -7 C-21 -20 -10 -36 0 -54Z" fill={`url(#f${id})`} />
          <path className="flame2" d="M0 -22 C5 -12 9 -6 9 0 C9 6 5 8 0 8 C-5 8 -9 6 -9 0 C-9 -6 -5 -12 0 -22Z" fill="#fff" opacity=".92" />
        </g>
      </svg>
    </div>
  )
}
