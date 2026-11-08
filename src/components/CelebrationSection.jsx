import { useEffect, useRef, useState } from 'react'
import { DIWALI_DATE } from '../lib/config'
import { Reveal, SectionTitle, Sparkles } from './Decor'
import CrackerStreet from './CrackerStreet'

export default function CelebrationSection({ fw, rel, name }) {
  const t = DIWALI_DATE.getTime()
  const [now, setNow] = useState(Date.now())
  const over = Number.isNaN(t) || now >= t
  const area = useRef(null)
  useEffect(() => {
    if (over) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [over])
  const left = Math.max(0, t - now)
  const parts = [['Days', left / 864e5], ['Hours', (left / 36e5) % 24], ['Mins', (left / 6e4) % 60], ['Secs', (left / 1e3) % 60]]
  const spot = () => { const r = area.current.getBoundingClientRect(); return [r.left + r.width / 2, r.bottom - 24, r.top + r.height / 2] }

  return (
    <section id="sky" className="relative overflow-hidden px-5 py-24 text-center" style={{ background: 'linear-gradient(180deg,#09051D,#150a30 60%,#09051D)' }}>
      <Sparkles count={16} rise="-700px" />
      <SectionTitle>Light Up the Sky!</SectionTitle>
      <Reveal className="relative mx-auto mb-10 max-w-2xl">
        <div className="glass rounded-3xl px-6 py-6">
          {over ? (
            <p className="gold-text font-display text-2xl font-bold sm:text-4xl">The Festival of Lights Is Here! ✨</p>
          ) : (
            <div className="grid grid-cols-4 gap-3" role="timer" aria-label="Countdown to Diwali">
              {parts.map(([l, v]) => (
                <div key={l}><p className="font-display text-3xl font-bold text-gold sm:text-5xl">{String(Math.floor(v)).padStart(2, '0')}</p><p className="text-xs text-cream/70 sm:text-sm">{l}</p></div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
      <Reveal className="mb-12"><CrackerStreet fw={fw} rel={rel} name={name} /></Reveal>
      <p className="mb-4 font-display text-gold">Freestyle sky</p>
      <div ref={area} role="button" tabIndex={0} aria-label="Tap anywhere in the sky to launch fireworks"
        onPointerDown={(e) => fw.current?.burst(e.clientX, e.clientY)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const [x, , y] = spot(); fw.current?.burst(x, y) } }}
        className="glass relative mx-auto flex h-56 max-w-4xl cursor-pointer select-none items-center justify-center rounded-3xl"
        style={{ touchAction: 'manipulation', background: 'radial-gradient(ellipse at 50% 100%,rgba(255,79,145,.18),rgba(9,5,29,.7) 70%)' }}>
        <p className="font-script text-2xl italic text-cream/80 sm:text-3xl">Tap anywhere in the sky ✨</p>
      </div>
      <div className="mt-8 flex justify-center"><button className="btn-gold" onClick={() => fw.current?.sequence(7)}>🎆 Let's Celebrate!</button></div>
      <p className="mt-4 text-sm text-cream/50">All crackers are digital, safe and sound-free 💛</p>
    </section>
  )
}
