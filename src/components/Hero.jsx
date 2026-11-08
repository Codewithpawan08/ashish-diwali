import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Stars from './Stars.jsx'
import Dust from './Dust.jsx'
import Diya from './Diya.jsx'
import Rangoli from './Rangoli.jsx'
import Lantern from './Lantern.jsx'
import LightString from './LightString.jsx'
import Palace from './Palace.jsx'
import Divider from './Divider.jsx'
import { NAME, burst } from '../config.js'

const floaters = [
  { cls: 'left-[4%] bottom-[30%] hidden md:block', w: 96, d: 0 },
  { cls: 'right-[5%] bottom-[34%] hidden md:block', w: 120, d: 1.4 },
  { cls: 'left-[14%] bottom-[16%] hidden lg:block', w: 70, d: 2.4 },
  { cls: 'right-[16%] bottom-[18%] hidden lg:block', w: 78, d: 0.8 },
  { cls: 'left-[5%] bottom-[15%] md:hidden', w: 62, d: 0.6 },
  { cls: 'right-[5%] bottom-[16%] md:hidden', w: 70, d: 1.8 }
]

export default function Hero() {
  const go = (e) => {
    burst(e.clientX, e.clientY, { pal: 'gold', kind: 'ring' })
    document.getElementById('lights')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section id="hero" className="relative isolate overflow-hidden" style={{ minHeight: '100svh' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#080D25 0%,#12123a 42%,#39205F 100%)' }} />
      <div data-speed="0.25" className="absolute -top-28 inset-x-0 bottom-0"><Stars count={90} /></div>
      <div data-speed="-0.1" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Rangoli className="animate-spin-slow w-[min(140vw,940px)] opacity-[0.13]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(217,164,65,.38), rgba(107,63,160,.18) 40%, transparent 70%)' }} />
      <Dust count={26} />

      <div data-speed="0.15" className="absolute inset-x-0 top-0 h-[55vh] pointer-events-none">
        <LightString swags={4} />
        <Lantern left="5%" length={36} scale={0.9} delay={0.2} tone="violet" className="hidden sm:block" />
        <Lantern left="14%" length={90} scale={1.1} delay={1.1} />
        <Lantern left="26%" length={30} scale={0.8} delay={2} tone="violet" className="hidden md:block" />
        <Lantern left="74%" length={34} scale={0.8} delay={0.6} tone="violet" className="hidden md:block" />
        <Lantern left="86%" length={100} scale={1.15} delay={1.7} />
        <Lantern left="95%" length={40} scale={0.9} delay={0.9} tone="violet" className="hidden sm:block" />
        <Lantern left="8%" length={28} scale={0.7} delay={1.4} className="sm:hidden" />
        <Lantern left="92%" length={60} scale={0.75} delay={0.3} tone="violet" className="sm:hidden" />
      </div>

      <div data-speed="0.4" className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden pointer-events-none">
        <Palace className="shrink-0 h-auto" style={{}} />
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ perspective: 900 }}>
        {floaters.map((f, i) => (
          <div key={i} className={`absolute ${f.cls}`} style={{ animation: `float3d ${7 + i}s ease-in-out ${-f.d}s infinite`, transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <Diya width={f.w} glow={0.75} />
          </div>
        ))}
      </div>

      <div data-speed="-0.12" className="relative z-10 flex flex-col items-center justify-center text-center px-5"
        style={{ minHeight: '100svh', paddingTop: '8rem', paddingBottom: '28vh' }}>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}
          className="font-display text-champagne/90 text-lg sm:text-2xl tracking-[.2em]">शुभ दीपावली</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 34, filter: 'blur(14px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="gold-text font-display mt-3 text-[clamp(3.1rem,13vw,9rem)] leading-[1.02] pb-2"
          style={{ filter: 'drop-shadow(0 0 28px rgba(244,213,141,.35))' }}>
          Shubh Deepawali
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}><Divider className="mt-3" /></motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 1.2 }}
          className="font-elegant italic text-[1.2rem] sm:text-[1.6rem] text-ivory/90 max-w-2xl mt-6 leading-snug">
          Wishing <span className="not-italic font-semibold text-champagne">{NAME}</span> a Diwali filled with happiness, success and endless prosperity.
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 1 }}
          onClick={go} className="btn-gold mt-9">
          <Sparkles size={16} /> Celebrate the Magic
        </motion.button>
      </div>
    </section>
  )
}
