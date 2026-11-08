import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import Stars from './Stars.jsx'
import Dust from './Dust.jsx'
import Diya from './Diya.jsx'
import Lantern from './Lantern.jsx'
import LightString from './LightString.jsx'
import ShareButton from './ShareButton.jsx'
import Divider from './Divider.jsx'
import { NAME, burst } from '../config.js'

export default function FinalWishes() {
  const again = () => {
    const w = window.innerWidth, h = window.innerHeight
    for (let i = 0; i < 7; i++)
      setTimeout(() => burst(w * (0.12 + Math.random() * 0.76), h * (0.15 + Math.random() * 0.4), { pal: 'gold', kind: i % 3 === 0 ? 'ring' : undefined }), i * 220)
  }
  return (
    <section id="final" className="relative isolate overflow-hidden flex flex-col items-center justify-center text-center px-5"
      style={{ minHeight: '100svh', paddingTop: '7rem', paddingBottom: '9rem' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, #39205F 0%, #14123a 45%, #080D25 85%)' }} />
      <Stars count={90} />
      <Dust count={24} />
      <LightString swags={5} />
      <Lantern left="10%" length={50} scale={1} delay={0.4} className="hidden sm:block" />
      <Lantern left="90%" length={70} scale={1} delay={1.2} className="hidden sm:block" />
      <Lantern left="50%" length={16} scale={0.7} delay={0.9} tone="violet" className="hidden md:block" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="font-cinzel text-[.7rem] sm:text-xs tracking-[.45em] uppercase text-champagne/80">Final Wishes</motion.span>
        <motion.h2 initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="gold-text font-display mt-5 text-[clamp(3rem,13vw,9rem)] leading-[1.02] pb-2"
          style={{ filter: 'drop-shadow(0 0 30px rgba(244,213,141,.35))' }}>
          Happy Diwali
        </motion.h2>
        <p className="gold-text font-script text-[clamp(2.6rem,9vw,5rem)] leading-tight">{NAME}</p>
        <Divider className="mt-4" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 1.1 }}
          className="font-elegant italic text-[1.25rem] sm:text-[1.6rem] text-ivory/90 max-w-2xl mt-6 leading-snug">
          May the light of a thousand diyas guide you to everything your heart desires — to you, to your family, and to a year as bright as tonight's sky.
        </motion.p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <button onClick={again} className="btn-gold"><Flame size={16} /> Light Up the Sky</button>
          <ShareButton />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 flex items-end justify-center gap-6 sm:gap-12 pb-12 pointer-events-none" aria-hidden="true">
        <Diya width={64} glow={0.8} className="hidden sm:inline-block" /><Diya width={86} glow={0.9} /><Diya width={110} glow={1} /><Diya width={86} glow={0.9} />
        <Diya width={64} glow={0.8} className="hidden sm:inline-block" />
      </div>
      <p className="absolute bottom-4 inset-x-0 font-cinzel text-[.62rem] tracking-[.35em] uppercase text-champagne/50">Made with love · Diwali 2026</p>
    </section>
  )
}
