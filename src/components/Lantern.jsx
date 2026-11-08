import { useId } from 'react'

export default function Lantern({ left, length = 40, delay = 0, scale = 1, tone = 'gold', className = '' }) {
  const id = useId().replace(/:/g, '')
  const [c1, c2] = tone === 'violet' ? ['#8d5fd0', '#39205F'] : ['#F4D58D', '#B9801F']
  const w = 46 * scale
  return (
    <div className={`absolute top-0 ${className}`} style={{ left, animation: `sway ${5 + delay}s ease-in-out ${-delay}s infinite`, transformOrigin: 'top center', willChange: 'transform' }} aria-hidden="true">
      <div className="mx-auto" style={{ width: 1, height: length, background: 'linear-gradient(#D9A441aa,#F4D58D)' }} />
      <div className="relative" style={{ width: w, marginLeft: -w / 2 }}>
        <div className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
          style={{ width: w * 3, height: w * 3, transform: 'translate(-50%,-45%)', background: 'radial-gradient(circle, rgba(244,213,141,.38), transparent 65%)' }} />
        <svg viewBox="0 0 60 96" className="relative block w-full h-auto">
          <defs>
            <linearGradient id={`l${id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={c2} /><stop offset=".5" stopColor={c1} /><stop offset="1" stopColor={c2} />
            </linearGradient>
            <radialGradient id={`g${id}`}><stop offset="0" stopColor="#FFF5DC" /><stop offset="1" stopColor="#FFF5DC" stopOpacity="0" /></radialGradient>
          </defs>
          <circle cx="30" cy="5" r="3" fill="none" stroke="#D9A441" strokeWidth="1.2" />
          <path d="M18 18 L42 18 L36 8 L24 8Z" fill="#D9A441" />
          <path d="M16 18 C6 34 6 56 16 72 L44 72 C54 56 54 34 44 18Z" fill={`url(#l${id})`} opacity=".92" />
          <path d="M30 18 V72 M23 18 C17 36 17 54 23 72 M37 18 C43 36 43 54 37 72" stroke="#FFF5DC" strokeOpacity=".45" fill="none" />
          <ellipse cx="30" cy="45" rx="11" ry="19" fill={`url(#g${id})`} style={{ animation: 'pulse-soft 3s ease-in-out infinite', transformOrigin: '30px 45px' }} />
          <rect x="16" y="72" width="28" height="6" rx="2" fill="#D9A441" />
          <path d="M30 78 V92 M26 78 L24 93 M34 78 L36 93" stroke="#F4D58D" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
