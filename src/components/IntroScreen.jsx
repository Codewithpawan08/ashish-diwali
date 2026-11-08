import { motion } from 'framer-motion'
import { Mandala, Diya, Sparkles } from './Decor'

export default function IntroScreen({ name, onOpen }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: 'radial-gradient(ellipse at 50% 30%,#251044,#09051D 70%)' }}
      exit={{ opacity: 0, scale: 1.25, filter: 'blur(12px)' }} transition={{ duration: 1.1, ease: 'easeInOut' }}>
      <Mandala className="spin-slow absolute w-[150vmin] max-w-none opacity-[.14]" />
      <Sparkles count={30} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2 }} className="relative z-10">
        {name && <p className="mb-3 font-display text-lg text-gold">For {name} ❤️</p>}
        <h1 className="gold-text font-script text-3xl font-semibold italic sm:text-5xl">Something magical is waiting for you...</h1>
        <motion.button onClick={onOpen} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ['0 0 20px rgba(255,215,0,.4)', '0 0 50px rgba(255,140,50,.9)', '0 0 20px rgba(255,215,0,.4)'] }} transition={{ repeat: Infinity, duration: 2.4 }} className="btn-gold mt-10">
          ✨ Open Your Diwali Surprise
        </motion.button>
      </motion.div>
      <div className="absolute bottom-6 flex items-end gap-5 sm:gap-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div key={i} initial={{ y: 140, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 + i * 0.25, duration: 1 }}>
            <Diya size={i === 2 ? 84 : 58} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
