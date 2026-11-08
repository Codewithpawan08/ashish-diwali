import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Diya, Sparkles, SectionTitle } from './Decor'

export default function DiyaLighting({ fw }) {
  const [lit, setLit] = useState(Array(5).fill(false))
  const n = lit.filter(Boolean).length
  const light = (i, e) => {
    if (lit[i]) return
    setLit((l) => l.map((v, j) => v || j === i))
    const r = e.currentTarget.getBoundingClientRect()
    fw.current?.burst(r.left + r.width / 2, r.top + 30, 'sphere', '#FFD700')
    if (n === 4) setTimeout(() => fw.current?.sequence(4), 400)
  }
  return (
    <section id="diya" className="px-5 py-24 text-center" style={{ background: 'linear-gradient(180deg,#1a0b33,#09051D)' }}>
      <SectionTitle sub={n === 0 ? 'Tap a diya to light it' : `${n} of 5 diyas lit`}>Light a Diya, Spread Happiness 🪔</SectionTitle>
      <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-center gap-4 sm:gap-8">
        {lit.map((on, i) => (
          <button key={i} onClick={(e) => light(i, e)} aria-pressed={on} aria-label={`${on ? 'Lit' : 'Light'} diya ${i + 1}`} className="relative rounded-2xl px-1 pb-2 pt-20 transition-transform hover:scale-110 active:scale-95">
            {on && <Sparkles count={8} rise="-110px" />}
            <Diya lit={on} size={on ? 96 : 84} className={on ? '' : 'opacity-80'} />
          </button>
        ))}
      </div>
      <div className="mt-10 min-h-[4.5rem]" aria-live="polite">
        <AnimatePresence>
          {n > 0 && (
            <motion.p key="m" initial={{ opacity: 0, y: 14, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="gold-text font-script text-2xl font-semibold italic sm:text-4xl">
              Every little light can make someone's world brighter.
            </motion.p>
          )}
        </AnimatePresence>
        {n === 5 && <button onClick={() => setLit(Array(5).fill(false))} className="btn-glass mt-6 !min-h-0 !py-2 text-sm">Light them again 🪔</button>}
      </div>
    </section>
  )
}
