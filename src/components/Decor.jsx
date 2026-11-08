import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { lowPower } from '../lib/config'

const COLS = ['#FFD700', '#FF8C32', '#FF4F91', '#FFF3D6']

export function Sparkles({ count = 24, rise = '-110vh' }) {
  const items = useMemo(() => {
    const n = lowPower() ? Math.ceil(count / 2) : count
    return Array.from({ length: n }, (_, i) => ({ id: i, left: Math.random() * 100, size: 2 + Math.random() * 4, dur: 7 + Math.random() * 9, delay: -Math.random() * 14, c: COLS[i % 4] }))
  }, [count])
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span key={p.id} className="spark" style={{ left: p.left + '%', width: p.size, height: p.size, background: p.c, boxShadow: `0 0 ${p.size * 3}px ${p.c}`, animationDuration: p.dur + 's', animationDelay: p.delay + 's', '--rise': rise }} />
      ))}
    </div>
  )
}

export function Mandala({ className = '' }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={className} fill="none" stroke="#FFD700" strokeWidth=".6">
      {[90, 70, 50, 30].map((r) => <circle key={r} r={r} strokeDasharray={r === 70 || r === 30 ? '2 3' : undefined} />)}
      {Array.from({ length: 16 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 22.5})`}>
          <path d="M0-90 Q10-72 0-55 Q-10-72 0-90Z" /><path d="M0-50 Q7-38 0-26 Q-7-38 0-50Z" /><circle cy="-96" r="2" fill="#FFD700" />
        </g>
      ))}
    </svg>
  )
}

export function Diya({ lit = true, size = 80, className = '' }) {
  return (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className} aria-hidden="true" style={{ overflow: 'visible' }}>
      <defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF8C32" /><stop offset="1" stopColor="#8a3410" /></linearGradient></defs>
      {lit && <ellipse cx="50" cy="32" rx="40" ry="34" fill="#FFD700" className="glow" />}
      <path d="M6 44 Q50 92 94 44 Q50 54 6 44Z" fill="url(#dg)" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M32 72 h36 v6 h-36z" fill="#7a2f0e" stroke="#FFD700" strokeWidth="1" />
      <path d="M20 52 Q50 62 80 52" stroke="#FFD700" strokeWidth="1" fill="none" strokeDasharray="2 3" />
      {lit && (
        <g className="flame">
          <path d="M50 12 Q64 30 50 46 Q36 30 50 12Z" fill="#FFB52E" />
          <path d="M50 26 Q57 35 50 44 Q43 35 50 26Z" fill="#FFF3D6" />
        </g>
      )}
    </svg>
  )
}

export function Flower({ size = 70, className = '' }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="0" cy="-26" rx="9" ry="20" fill={i % 2 ? '#FF8C32' : '#FFB52E'} opacity=".92" transform={`rotate(${i * 30})`} />)}
      <circle r="12" fill="#b45309" /><circle r="6" fill="#FFD700" />
    </svg>
  )
}

export function Lantern({ x, len = 90, delay = 0, color = '#FF4F91' }) {
  return (
    <div aria-hidden="true" className="sway absolute top-0 z-10" style={{ left: x, animationDelay: delay + 's', transformOrigin: 'top center' }}>
      <div style={{ width: 1, height: len, background: 'rgba(255,215,0,.6)', margin: '0 auto' }} />
      <div className="lantern" style={{ background: `linear-gradient(${color},#FF8C32)` }} />
    </div>
  )
}

export function Rangoli({ className = '' }) {
  const cols = ['#FF4F91', '#FFD700', '#FF8C32', '#a855f7']
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={className}>
      {[[88, 16, 0], [66, 12, 7], [44, 8, 14]].map(([r, n, o], k) => Array.from({ length: n }, (_, i) => (
        <ellipse key={k + '-' + i} cx="0" cy={-r} rx={k === 0 ? 9 : 7} ry={k === 0 ? 16 : 12} fill={cols[(i + k) % 4]} opacity=".85" transform={`rotate(${(i * 360) / n + o})`} />
      )))}
      <circle r="24" fill="#251044" stroke="#FFD700" strokeWidth="2" /><circle r="10" fill="#FFD700" />
    </svg>
  )
}

export const Reveal = ({ children, delay = 0, className = '', y = 36 }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: 'easeOut' }}>{children}</motion.div>
)

export const SectionTitle = ({ children, sub }) => (
  <Reveal className="mb-12 text-center">
    <h2 className="gold-text font-display text-3xl font-bold sm:text-5xl">{children}</h2>
    {sub && <p className="mt-3 text-cream/70">{sub}</p>}
  </Reveal>
)

export function Stars({ count = 40 }) {
  const s = useMemo(() => Array.from({ length: lowPower() ? Math.ceil(count / 2) : count }, (_, i) => ({ i, l: Math.random() * 100, t: Math.random() * 70, z: 1 + Math.random() * 2, d: Math.random() * 3 })), [count])
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{s.map((p) => <span key={p.i} className="star" style={{ left: p.l + '%', top: p.t + '%', width: p.z, height: p.z, animationDelay: p.d + 's' }} />)}</div>
}

export function Petals({ count = 12 }) {
  const s = useMemo(() => Array.from({ length: lowPower() ? Math.ceil(count / 2) : count }, (_, i) => ({ i, l: Math.random() * 100, d: 9 + Math.random() * 8, dl: -Math.random() * 14 })), [count])
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{s.map((p) => <span key={p.i} className="petal" style={{ left: p.l + '%', animationDuration: p.d + 's', animationDelay: p.dl + 's' }} />)}</div>
}

export function Skyline({ className = '' }) {
  const B = [[0, 70, 60], [70, 50, 90], [120, 80, 70], [200, 60, 110], [260, 90, 75], [350, 50, 95], [400, 110, 65], [510, 60, 120], [570, 80, 80], [650, 70, 100], [720, 90, 70], [810, 60, 115], [870, 80, 85], [950, 70, 95], [1020, 90, 65], [1110, 90, 100]]
  return (
    <svg viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {B.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={160 - h} width={w} height={h} fill="#0e0626" />
          {i % 3 === 0 && <path d={`M${x + w / 2 - 14} ${160 - h}a14 14 0 0 1 28 0z`} fill="#0e0626" />}
          {Array.from({ length: Math.floor(h / 22) }, (_, k) => <rect key={k} x={x + 10 + (k % 2) * (w / 2.4)} y={160 - h + 12 + k * 18} width="6" height="8" fill="#FFD700" opacity={(i + k) % 3 ? 0.75 : 0.2} />)}
        </g>
      ))}
    </svg>
  )
}

export function Toran() {
  return (
    <svg viewBox="0 0 1200 60" preserveAspectRatio="xMidYMin slice" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 w-full sm:h-14">
      {Array.from({ length: 24 }, (_, i) => { const x = 25 + i * 50, y = 10 + Math.abs(Math.sin((i * Math.PI) / 4)) * 14; return <g key={i}><circle cx={x} cy={y} r="9" fill={i % 2 ? '#FF8C32' : '#FFB52E'} /><circle cx={x} cy={y} r="3" fill="#b45309" /><path d={`M${x} ${y + 9}l-4 14h8z`} fill="#FFD700" /></g> })}
    </svg>
  )
}

const WORDS = ['शुभ दीपावली', 'Happy Diwali', 'দীপাবলির শুভেচ্ছা', 'ਦੀਵਾਲੀ ਦੀਆਂ ਵਧਾਈਆਂ', 'દિવાળીની શુભેચ્છાઓ', 'दिवाळीच्या शुभेच्छा', 'Subho Deepavali']
export function Ribbon() {
  const row = WORDS.map((w, i) => <span key={i} className="font-deva mx-6 whitespace-nowrap text-xl text-gold sm:text-2xl">{w} <span className="text-saffron">✦</span></span>)
  return <div aria-hidden="true" className="overflow-hidden border-y border-gold/30 bg-royal/60 py-3"><div className="marquee">{row}{row}</div></div>
}
