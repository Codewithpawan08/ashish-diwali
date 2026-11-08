import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Volume2, VolumeX } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export function MusicControl({ playing, onToggle }) {
  return (
    <button onClick={onToggle} aria-pressed={playing} aria-label={playing ? 'Mute music' : 'Play music'}
      className="fixed z-50 flex items-center gap-2 rounded-full border border-champagne/50 bg-midnight/70 backdrop-blur-md text-champagne px-4 h-11 cursor-pointer focus-ring hover:bg-imperial/70 transition-colors"
      style={{ top: 'max(1rem, env(safe-area-inset-top))', right: 'max(1rem, env(safe-area-inset-right))' }}>
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      {playing ? (
        <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
          {[0, 0.25, 0.5].map((d) => <span key={d} className="w-[3px] h-full bg-champagne rounded-full origin-bottom" style={{ animation: `bar 1s ease-in-out ${d}s infinite` }} />)}
        </span>
      ) : <span className="font-cinzel text-[.65rem] tracking-[.25em] uppercase">Music</span>}
    </button>
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let t = 0
    const on = () => { if (!t) t = requestAnimationFrame(() => { t = 0; setShow(window.scrollY > 700) }) }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(t) }
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => gsap.to(window, { duration: 1.6, scrollTo: 0, ease: 'power3.inOut' })} aria-label="Back to top"
          className="fixed z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-0 focus-ring text-midnight"
          style={{ right: 'max(1rem, env(safe-area-inset-right))', bottom: 'max(1.25rem, env(safe-area-inset-bottom))', background: 'linear-gradient(135deg,#FFF5DC,#F4D58D,#D9A441)', boxShadow: '0 8px 30px -4px rgba(217,164,65,.7)' }}>
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
