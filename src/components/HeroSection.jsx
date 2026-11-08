import { motion, useScroll, useTransform } from 'framer-motion'
import { Mandala, Sparkles, Lantern, Diya, Rangoli, Stars, Petals, Skyline, Toran } from './Decor'

export default function HeroSection({ name, rel, onCelebrate }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, 140])
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pb-40 pt-28 text-center" style={{ background: 'linear-gradient(180deg,#09051D 0%,#251044 70%,#3a1450 100%)' }}>
      <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center">
        <Mandala className="spin-slow w-[130vmin] max-w-none opacity-[.1]" />
      </motion.div>
      <Stars count={50} />
      <div className="aurora -left-20 top-20 h-72 w-72 bg-fest" /><div className="aurora -right-16 top-1/3 h-80 w-80 bg-purple-500" style={{ animationDelay: '-6s' }} />
      <Skyline className="absolute bottom-0 left-0 h-28 w-full sm:h-40" />
      <Sparkles count={26} />
      <Petals count={14} />
      <Toran />
      {[['6%', 70, 0, '#FF4F91'], ['22%', 120, 0.6, '#FFD700'], ['74%', 100, 1.1, '#FF8C32'], ['90%', 60, 0.3, '#a855f7']].map(([x, l, d, c]) => <Lantern key={x} x={x} len={l} delay={d} color={c} />)}
      <div className="absolute bottom-24 left-2 sm:left-10"><Diya size={64} /></div>
      <div className="absolute bottom-24 right-2 sm:right-10"><Diya size={64} /></div>
      <div className="relative z-10 max-w-3xl">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 font-display text-sm tracking-[.25em] text-saffron">Pawan Kumar wishes you</motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1 }} className="gold-text font-deva mb-2 text-5xl sm:text-7xl">शुभ दीपावली</motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }} className="gold-text font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          ✨ Happy Diwali 2026 ✨
        </motion.h1>
        {name && (
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass mt-6 inline-block rounded-full px-6 py-2 font-script text-2xl font-semibold italic sm:text-3xl">
            Happy Diwali {name}{rel.suffix || ''}! ❤️
          </motion.p>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 font-script text-xl italic text-cream/90 sm:text-3xl">
          May Your Life Shine Brighter Than a Thousand Diyas!
        </motion.p>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} onClick={onCelebrate} className="btn-gold mt-10">Celebrate the Magic ✨</motion.button>
      </div>
      <Rangoli className="absolute bottom-0 left-1/2 w-[min(90vw,560px)] -translate-x-1/2 translate-y-1/2" />
    </section>
  )
}
