import { motion } from 'framer-motion'
import { Diya, Sparkles } from './Decor'

export default function DiwaliFooter() {
  return (
    <motion.footer initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
      className="relative overflow-hidden px-5 pb-28 pt-16 text-center" style={{ background: '#09051D', borderTop: '2px solid transparent', borderImage: 'linear-gradient(90deg,transparent,#FFD700,transparent) 1' }}>
      <Sparkles count={12} rise="-300px" />
      <div className="relative mb-6 flex justify-center gap-4"><Diya size={40} /><Diya size={52} /><Diya size={40} /></div>
      <p className="relative font-display text-lg text-gold">Made with ❤️, Light &amp; Happiness</p>
      <p className="relative mt-2 font-script text-2xl italic">With Warm Wishes – Pawan Kumar</p>
      <p className="gold-text relative mt-4 font-display text-xl">May Your Life Always Shine Bright! ✨</p>
    </motion.footer>
  )
}
