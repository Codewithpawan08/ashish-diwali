import { motion } from 'framer-motion'
import Divider from './Divider.jsx'

export default function SectionTitle({ eyebrow, title, sub, align = 'center', className = '' }) {
  const a = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  return (
    <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className={`flex flex-col ${a} ${className}`}>
      <span className="font-cinzel text-[.7rem] sm:text-xs tracking-[.45em] uppercase text-champagne/80">{eyebrow}</span>
      <h2 className="gold-text font-display mt-4 text-[clamp(2.2rem,7vw,4.6rem)] leading-[1.08] pb-1">{title}</h2>
      {align === 'center' ? <Divider className="mt-5" /> : <div className="mt-5 h-px w-28 bg-gradient-to-r from-champagne/80 to-transparent" />}
      {sub && <p className="font-elegant italic text-lg sm:text-xl text-ivory/75 mt-5 max-w-xl">{sub}</p>}
    </motion.div>
  )
}
