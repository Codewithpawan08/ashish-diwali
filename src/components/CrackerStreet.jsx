import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sfx, crackle, hiss } from '../lib/sfx'

const ITEMS = [
  { id: 'phul', label: 'Phuljhadi', tip: [40, 10], base: [40, 10], fx: [40, 10], ms: 7800 },
  { id: 'anar', label: 'Anar', tip: [46, 24], base: [40, 53], fx: [40, 53], ms: 6600 },
  { id: 'chak', label: 'Chakri', tip: [74, 40], base: [74, 66], fx: [40, 70], ms: 6600 },
  { id: 'rock', label: 'Rocket', tip: [34, 124], base: [36, 104], fx: [40, 4], ms: 3200 },
  { id: 'sky', label: 'Sky Shot', tip: [66, 32], base: [66, 50], fx: [40, 50], ms: 8200 }
]
const FUSE = '#d6a56a'

function Art({ it, burn }) {
  const { id, tip, base } = it
  return (
    <svg viewBox="0 0 80 140" className="mx-auto w-full max-w-[96px]" aria-hidden="true" style={{ overflow: 'visible' }}>
      {id === 'phul' && <><rect x="38.5" y="22" width="3" height="114" fill="#9ca3af" /><rect x="37" y="12" width="6" height="34" rx="2" fill="#374151" /><rect x="37" y="30" width="6" height="2" fill="#6b7280" /></>}
      {id === 'anar' && <>
        <defs><linearGradient id="ga" x1="0" x2="1"><stop offset="0" stopColor="#7f1d1d" /><stop offset=".5" stopColor="#dc2626" /><stop offset="1" stopColor="#7f1d1d" /></linearGradient></defs>
        <path d="M12 134L22 60H58L68 134Z" fill="url(#ga)" stroke="#FFD700" strokeWidth="1.2" /><path d="M15 112H65M18 90H62" stroke="#FFD700" strokeWidth="2.2" />
        <circle cx="40" cy="101" r="11" fill="#FFF3D6" stroke="#b45309" /><text x="40" y="104" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7f1d1d">ANAR</text>
        <rect x="19" y="52" width="42" height="11" rx="3" fill="#450a0a" stroke="#FFD700" /><ellipse cx="40" cy="53" rx="20" ry="4" fill="#111" />
        <path d="M40 53q8-10 6-29" stroke={FUSE} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>}
      {id === 'chak' && <>
        <defs><radialGradient id="gc"><stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#b45309" /></radialGradient></defs>
        <circle cx="40" cy="70" r="36" fill="url(#gc)" stroke="#78350f" strokeWidth="2" />
        <path d="M40 70a3 3 0 1 1 3 3a7 7 0 1 1-7-7a11 11 0 1 1 11 11a15 15 0 1 1-15-15a19 19 0 1 1 19 19a23 23 0 1 1-23-23a27 27 0 1 1 27 27" fill="none" stroke="#7c2d12" strokeWidth="2.2" />
        <circle cx="40" cy="70" r="4" fill="#111" /><path d="M74 66q4-14 0-26" stroke={FUSE} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>}
      {id === 'rock' && <>
        <defs><linearGradient id="gr" x1="0" x2="1"><stop offset="0" stopColor="#991b1b" /><stop offset=".5" stopColor="#ef4444" /><stop offset="1" stopColor="#991b1b" /></linearGradient></defs>
        <rect x="28" y="38" width="24" height="66" fill="url(#gr)" stroke="#FFD700" /><path d="M40 4L52 38H28Z" fill="#f59e0b" stroke="#FFD700" />
        <rect x="28" y="52" width="24" height="5" fill="#FFF3D6" /><rect x="28" y="86" width="24" height="5" fill="#FFF3D6" />
        <path d="M28 104L16 120L28 114ZM52 104L64 120L52 114Z" fill="#f59e0b" /><rect x="38.5" y="104" width="3" height="34" fill="#a16207" />
        <path d="M36 104q-4 10-2 20" stroke={FUSE} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>}
      {id === 'sky' && <>
        <rect x="8" y="50" width="64" height="84" rx="6" fill="#251044" stroke="#FFD700" strokeWidth="2" /><rect x="8" y="50" width="64" height="14" fill="#FF4F91" />
        {[18, 32, 46, 60].map((x) => <ellipse key={x} cx={x} cy="50" rx="6" ry="3" fill="#111" stroke="#FFD700" />)}
        <text x="40" y="90" textAnchor="middle" fontSize="16">⭐</text><text x="40" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFD700">SKY</text><text x="40" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill="#FFD700">SHOT</text>
        <path d="M66 50q4-8 0-18" stroke={FUSE} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>}
      <g transform={`translate(${tip[0]},${tip[1]})`}>
        {burn && <><circle r="8" fill="#FF8C32" opacity=".45" className="fuse" style={{ '--dx': base[0] - tip[0] + 'px', '--dy': base[1] - tip[1] + 'px' }} /><circle r="3" fill="#FFF3D6" className="fuse" style={{ '--dx': base[0] - tip[0] + 'px', '--dy': base[1] - tip[1] + 'px' }} /></>}
      </g>
    </svg>
  )
}

export default function CrackerStreet({ fw, rel, name }) {
  const [st, setSt] = useState({})
  const [last, setLast] = useState(null)
  const [snd, setSnd] = useState(true)
  const done = Object.values(st).filter((v) => v === 'done').length
  const fire = (i, e) => {
    const it = ITEMS[i]
    if (st[it.id]) return
    const svg = e.currentTarget.querySelector('svg')
    const pt = ([px, py]) => { const r = svg.getBoundingClientRect(); return [r.left + (px / 80) * r.width, r.top + (py / 140) * r.height] }
    setSt((s) => ({ ...s, [it.id]: 'burn' }))
    setTimeout(() => {
      const f = fw.current, [x, y] = pt(it.fx)
      if (it.id === 'phul') { f?.sparkler(x, y); crackle(7) }
      else if (it.id === 'anar') { f?.anar(x, y); hiss(6, 1800) }
      else if (it.id === 'chak') { f?.chakri(x, y); hiss(6, 2600) }
      else if (it.id === 'rock') f?.rocket(x, null, 'grand', y)
      else f?.skyshot(x, y)
      setSt((s) => ({ ...s, [it.id]: 'live' })); setLast(i)
      setTimeout(() => setSt((s) => ({ ...s, [it.id]: 'done' })), it.ms)
    }, 1100)
  }
  return (
    <div className="glass mx-auto max-w-4xl rounded-3xl p-5 sm:p-8" style={{ background: 'linear-gradient(180deg,rgba(9,5,29,.85),rgba(58,20,80,.6))' }}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-left text-cream/70">Fuse jalao 🔥 Har cracker ke saath ek khaas wish khulegi{name ? `, ${name} ke liye` : ''}</p>
        <button onClick={() => { sfx.on = !sfx.on; setSnd(sfx.on) }} aria-pressed={snd} className="btn-glass !min-h-0 shrink-0 !px-3 !py-2 text-sm">{snd ? '🔊' : '🔇'}</button>
      </div>
      <div className="grid grid-cols-3 items-end gap-3 sm:grid-cols-5 sm:gap-6">
        {ITEMS.map((it, i) => (
          <button key={it.id} onClick={(e) => fire(i, e)} disabled={!!st[it.id]} aria-label={`Light ${it.label}`} className={`rounded-2xl pb-2 pt-4 text-center transition ${st[it.id] === 'live' ? 'live' : ''} ${st[it.id] === 'done' ? 'opacity-40' : !st[it.id] ? 'hover:-translate-y-2 hover:bg-gold/10 active:scale-95' : ''}`}>
            <Art it={it} burn={st[it.id] === 'burn'} />
            <span className="mt-2 block text-xs sm:text-sm">{st[it.id] === 'done' ? '✓ ' : st[it.id] === 'live' ? '🔥 ' : ''}{it.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 min-h-[7rem] text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p key={last ?? 'idle'} initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className={last === null ? 'text-cream/50' : 'gold-text font-script text-2xl font-semibold italic sm:text-4xl'}>
            {last === null ? 'Pehla cracker jalao...' : rel.crackers[last]}
          </motion.p>
        </AnimatePresence>
        <p className="mt-3 text-sm text-cream/60">{done}/5 wishes unlocked</p>
        {done === 5 && (
          <div className="mt-3">
            <p className="font-display text-gold">🎆 Sabhi crackers jal gaye! Happy Diwali{name ? ' ' + name : ''}! 🎆</p>
            <button className="btn-glass mt-3 !min-h-0 !py-2 text-sm" onClick={() => { setSt({}); setLast(null) }}>Phir se jalao 🔥</button>
          </div>
        )}
      </div>
    </div>
  )
}
