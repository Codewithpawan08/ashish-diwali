import { motion } from 'framer-motion'
import Rangoli from './Rangoli.jsx'
import Frame from './Frame.jsx'
import Dust from './Dust.jsx'
import { FIRST } from '../config.js'

export default function Celebration() {
  return (
    <section id="celebration" className="relative overflow-hidden py-28 sm:py-40 px-5">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#080D25 0%,#2a1850 50%,#080D25 100%)' }} />
      <Dust count={14} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Rangoli className="animate-spin-slow w-[min(150vw,980px)] opacity-[0.2]" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <Frame className="px-6 sm:px-16 py-16 sm:py-20 text-center backdrop-blur-[2px]">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 1.2 }}>
            <span className="font-cinzel text-[.7rem] sm:text-xs tracking-[.45em] uppercase text-champagne/80">Chapter Three · A Special Celebration</span>
            <p className="font-elegant italic text-2xl text-ivory/80 mt-8">This Diwali is for</p>
            <h2 className="gold-text font-script text-[clamp(3.4rem,15vw,8rem)] leading-[1.05] pb-2">{FIRST} Gangwar</h2>
            <p className="font-elegant text-[1.25rem] sm:text-[1.5rem] leading-relaxed text-ivory/90 mt-6">
              Some people make every celebration brighter just by being part of it. So I lit a little lamp for you, {FIRST} — a small digital diya carrying big wishes.
              May the year ahead be gentle with your worries, generous with your dreams, and full of moments you'll want to keep forever.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 sm:gap-8 font-cinzel text-champagne text-xs sm:text-sm tracking-[.35em] uppercase" aria-label="Light, Love, Luck">
              <span>Light</span><span className="text-warmgold">✦</span><span>Love</span><span className="text-warmgold">✦</span><span>Luck</span>
            </div>
          </motion.div>
        </Frame>
      </div>
    </section>
  )
}
