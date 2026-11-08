import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MailOpen } from 'lucide-react'
import Rangoli from './Rangoli.jsx'
import SectionTitle from './SectionTitle.jsx'
import { burst, FIRST, NAME } from '../config.js'

const line = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.9 } } }

export default function WishCard() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next && ref.current) {
      const r = ref.current.getBoundingClientRect()
      burst(r.left + r.width * 0.25, r.top + r.height * 0.2, { pal: 'gold' })
      setTimeout(() => burst(r.left + r.width * 0.78, r.top + r.height * 0.15, { pal: 'purple' }), 350)
      setTimeout(() => burst(r.left + r.width * 0.5, r.top + r.height * 0.05, { pal: 'mix', kind: 'willow' }), 700)
    }
  }

  return (
    <section id="wish" className="relative overflow-hidden py-24 sm:py-32 px-5">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, #39205F 0%, #130f38 55%, #080D25 100%)' }} />
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">
        <SectionTitle eyebrow="Chapter Four" title="A Special Wish for You" sub="A little card, folded with care. Tap it to open." />

        <div className="mt-14 w-[min(92vw,460px)]" style={{ perspective: 1600 }}>
          <div ref={ref} role="button" tabIndex={0} aria-expanded={open} aria-label={open ? 'Close greeting card' : 'Open greeting card'}
            onClick={toggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle())}
            className="relative cursor-pointer rounded-2xl focus-ring" style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,.55)) drop-shadow(0 0 40px rgba(217,164,65,.22))' }}>
            {/* inside page */}
            <div className="relative rounded-2xl px-7 sm:px-10 py-10 sm:py-12 min-h-[540px]"
              style={{ background: 'linear-gradient(160deg,#FFF5DC 0%,#F8E6B8 100%)', border: '3px solid #D9A441', boxShadow: 'inset 0 0 0 6px #FFF5DC, inset 0 0 0 7px rgba(217,164,65,.7)' }}>
              <Rangoli className="absolute right-3 top-3 w-20 opacity-60" stroke="#B9801F" fill="#D9A441" sw={0.9} />
              <motion.div variants={{ show: { transition: { staggerChildren: 0.45, delayChildren: 0.7 } } }} initial="hidden" animate={open ? 'show' : 'hidden'}
                className="relative font-hand font-medium text-[#2b1650] text-[1.4rem] sm:text-[1.6rem] leading-[1.45]">
                <motion.p variants={line} className="text-[1.9rem] sm:text-[2.2rem] font-semibold text-[#39205F]">Dear {FIRST},</motion.p>
                <motion.p variants={line} className="mt-4">May this Diwali illuminate your life with new opportunities, bring happiness to your home, success to your journey and endless beautiful moments to cherish.</motion.p>
                <motion.p variants={line} className="mt-4">May every diya bring hope, every sparkle bring joy and every celebration create unforgettable memories.</motion.p>
                <motion.p variants={line} className="mt-4 font-semibold">Wishing you and your family a very Happy Diwali!</motion.p>
                <motion.p variants={line} className="mt-6 text-[#6B3FA0]">With warm wishes,<br /><span className="font-script text-[2.3rem] sm:text-[2.7rem] text-[#9a6a14] leading-none">Your Friend</span></motion.p>
              </motion.div>
            </div>
            {/* cover */}
            <motion.div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center text-center px-6"
              initial={false} animate={open ? { rotateY: -110, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              transition={{ rotateY: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.6, delay: open ? 0.55 : 0 } }}
              style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', pointerEvents: open ? 'none' : 'auto',
                background: 'linear-gradient(145deg,#FFF0BD 0%,#F4D58D 30%,#D9A441 65%,#B9801F 100%)', border: '3px solid #FFF5DC', boxShadow: 'inset 0 0 0 8px rgba(8,13,37,.12)' }}>
              <div className="absolute inset-4 rounded-xl border border-midnight/30 pointer-events-none" />
              <Rangoli className="w-48 sm:w-56" stroke="#39205F" fill="#39205F" sw={0.9} />
              <p className="font-script text-[3.2rem] sm:text-[3.8rem] text-midnight leading-none mt-5">Happy Diwali</p>
              <p className="font-cinzel text-[.7rem] tracking-[.35em] uppercase text-imperial mt-3">For {NAME}</p>
              <p className="absolute bottom-7 font-elegant italic text-imperial/90 animate-pulse-soft">Tap to open</p>
            </motion.div>
          </div>
        </div>

        <button onClick={toggle} className="btn-gold mt-12">
          {open ? <MailOpen size={16} /> : <Mail size={16} />} {open ? 'Close the Card' : 'Reveal the Card'}
        </button>
      </div>
    </section>
  )
}
