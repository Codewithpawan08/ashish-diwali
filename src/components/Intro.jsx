import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Sparkles } from 'lucide-react'
import Stars from './Stars.jsx'
import Diya from './Diya.jsx'

const split = (text, cls) =>
  text.split('').map((c, i) => (
    <span key={i} className={`${cls} inline-block`} style={{ opacity: 0 }}>{c === ' ' ? '\u00A0' : c}</span>
  ))

export default function Intro({ onEnter, onDone }) {
  const root = useRef(null)
  const exit = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.i-stars', { opacity: 0 }, { opacity: 1, duration: 1.6 })
        .fromTo('.i-glow', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4 }, 0.3)
        .fromTo('.i-diya', { scale: 0.6, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1.6 }, 0.5)
        .to('.i-l1', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.035 }, 1.6)
        .to('.i-l2', { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.06, ease: 'back.out(1.6)' }, 2.9)
        .fromTo('.i-btn', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 4.1)
      gsap.set('.i-l1', { y: 18, filter: 'blur(8px)' })
      gsap.set('.i-l2', { y: 20, scale: 0.7, filter: 'blur(10px)' })
      exit.current = () =>
        gsap.timeline({ onComplete: onDone })
          .to('.i-glow', { scale: 5, opacity: 0.0, duration: 1.4, ease: 'power2.in' }, 0)
          .to('.i-content', { scale: 1.12, opacity: 0, duration: 1, ease: 'power2.in' }, 0)
          .to(root.current, { opacity: 0, duration: 0.9, ease: 'power1.inOut' }, 0.5)
    }, root)
    return () => ctx.revert()
  }, [onDone])

  const enter = () => { onEnter(); exit.current && exit.current() }

  return (
    <div ref={root} className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 70%, #39205F 0%, #14123a 45%, #080D25 80%)', height: '100dvh' }}>
      <div className="i-stars absolute inset-0 opacity-0"><Stars count={110} /></div>
      <div className="i-glow absolute left-1/2 top-1/2 rounded-full pointer-events-none opacity-0"
        style={{ width: 'min(140vw,1000px)', aspectRatio: '1', transform: 'translate(-50%,-42%)', background: 'radial-gradient(circle, rgba(244,213,141,.38) 0%, rgba(217,164,65,.16) 25%, rgba(107,63,160,.14) 48%, transparent 68%)' }} />
      <div className="i-content relative z-10 flex flex-col items-center text-center px-5 w-full">
        <div className="i-diya opacity-0"><Diya width={190} glow={0.9} className="sm:!w-[230px]" /></div>
        <p className="font-cinzel text-[.78rem] sm:text-base tracking-[.28em] sm:tracking-[.4em] uppercase text-champagne mt-6 sm:mt-8">
          {split('A Special Diwali Celebration', 'i-l1')}
        </p>
        <h1 className="gold-text font-cinzel font-bold mt-5 text-[clamp(1.9rem,8.6vw,4.6rem)] tracking-[.12em] leading-tight">
          <span className="block sm:inline">{split('ASHISH', 'i-l2')}</span>
          <span className="hidden sm:inline">&nbsp;</span>
          <span className="block sm:inline">{split('GANGWAR', 'i-l2')}</span>
        </h1>
        <button onClick={enter} className="i-btn btn-gold mt-9 sm:mt-11 opacity-0">
          <Sparkles size={16} /> Enter Celebration
        </button>
      </div>
    </div>
  )
}
