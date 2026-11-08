import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Diya from './Diya.jsx'
import Rangoli from './Rangoli.jsx'
import SectionTitle from './SectionTitle.jsx'
import { burst } from '../config.js'

const shelf = [58, 76, 96, 118, 96, 76, 58]
const BASE = 0.3

export default function Lights() {
  const [glow, setGlow] = useState(BASE)
  const [rings, setRings] = useState([])
  const btn = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setGlow((g) => (g > BASE ? Math.max(BASE, g - 0.05) : g)), 500)
    return () => clearInterval(id)
  }, [])

  const light = () => {
    setGlow((g) => Math.min(1, g + 0.22))
    const key = Date.now()
    setRings((r) => [...r.slice(-3), key])
    setTimeout(() => setRings((r) => r.filter((k) => k !== key)), 1400)
    const b = btn.current?.getBoundingClientRect()
    if (b) burst(b.left + b.width / 2, b.top + b.height * 0.25, { pal: 'gold', kind: 'ring', scale: 0.55 })
  }

  return (
    <section id="lights" className="relative overflow-hidden py-24 sm:py-32 px-5">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#39205F 0%,#1a1245 22%,#0c1030 60%,#080D25 100%)' }} />
      <div className="absolute left-1/2 top-[48%] rounded-full pointer-events-none"
        style={{
          width: 'min(160vw,1100px)', aspectRatio: '1', transform: `translate(-50%,-50%) scale(${0.6 + glow * 0.6})`, opacity: 0.25 + glow * 0.7,
          background: 'radial-gradient(circle, rgba(244,213,141,.28), rgba(217,164,65,.1) 35%, transparent 65%)', transition: 'all 1s ease'
        }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
          <div className="order-2 lg:order-1">
            <SectionTitle align="left" eyebrow="Chapter One" title="The Magic of Lights"
              sub="Long ago, a single lamp turned the darkest night into a celebration. Light one yourself — and watch the whole sky answer." />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}
              className="mt-8 text-sm sm:text-base text-ivory/65 leading-relaxed max-w-md">
              Every diya is a small promise: that hope outlasts the dark, that joy is meant to be shared, and that a little light goes a very long way.
            </motion.p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-1.5 w-40 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
                <div className="h-full rounded-full bg-gradient-to-r from-warmgold to-champagne" style={{ width: `${((glow - BASE) / (1 - BASE)) * 100}%`, transition: 'width .5s ease' }} />
              </div>
              <span className="font-cinzel text-[.68rem] tracking-[.3em] uppercase text-champagne/80">Tap the diya to brighten</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.1 }}
              className="relative w-[min(80vw,360px)] aspect-[3/4] rounded-t-[999px] rounded-b-3xl border border-champagne/35 flex items-end justify-center overflow-hidden"
              style={{ background: 'linear-gradient(180deg, rgba(107,63,160,.35), rgba(8,13,37,.8))', boxShadow: `0 0 ${30 + glow * 90}px rgba(244,213,141,${0.1 + glow * 0.25})`, transition: 'box-shadow 1s' }}>
              <div className="absolute inset-3 rounded-t-[999px] rounded-b-2xl border border-champagne/15 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Rangoli className="w-[120%] animate-spin-slower opacity-[0.16]" />
              </div>
              <button ref={btn} onClick={light} aria-label="Light the diya" className="relative mb-[16%] focus-ring rounded-full cursor-pointer bg-transparent border-0 p-2">
                <Diya width={190} glow={glow} className="!block" />
                <AnimatePresence>
                  {rings.map((k) => (
                    <motion.span key={k} initial={{ scale: 0.3, opacity: 0.8 }} animate={{ scale: 3, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.3, ease: 'easeOut' }}
                      className="absolute left-1/2 top-[34%] w-24 h-24 -ml-12 -mt-12 rounded-full border border-champagne pointer-events-none" />
                  ))}
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 sm:mt-28 flex items-end justify-center gap-1 sm:gap-5" aria-hidden="true">
          {shelf.map((w, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.9 }}
              className={i === 0 || i === 6 ? 'hidden sm:block' : ''}>
              <Diya width={`clamp(${Math.round(w * 0.5)}px, ${(w / 12).toFixed(1)}vw, ${w}px)`} glow={Math.min(1, glow * 0.9 + 0.05)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
