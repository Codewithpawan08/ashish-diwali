import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import Lights from './components/Lights.jsx'
import Happiness from './components/Happiness.jsx'
import Celebration from './components/Celebration.jsx'
import WishCard from './components/WishCard.jsx'
import FinalWishes from './components/FinalWishes.jsx'
import FireworksCanvas from './components/FireworksCanvas.jsx'
import { MusicControl, BackToTop } from './components/Controls.jsx'
import useMusic from './useMusic.js'

gsap.registerPlugin(ScrollTrigger)

function Main({ onMode }) {
  const root = useRef(null)

  // GSAP: parallax layers + scroll progress bar
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      gsap.fromTo('#progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
      if (reduce) return
      gsap.utils.toArray('[data-speed]').forEach((el) => {
        const sp = parseFloat(el.dataset.speed)
        gsap.to(el, { y: sp * 220, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true } })
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    return () => ctx.revert()
  }, [])

  // Auto fireworks only while the hero / final sections are in view
  useEffect(() => {
    const vis = { hero: false, final: false }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { vis[e.target.id] = e.isIntersecting })
      onMode(vis.final ? 'final' : vis.hero ? 'hero' : 'off')
    }, { threshold: 0.3 })
    ;['hero', 'final'].forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [onMode])

  return (
    <main ref={root} className="relative">
      <div id="progress" className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left pointer-events-none" style={{ background: 'linear-gradient(90deg,#6B3FA0,#D9A441,#F4D58D)', transform: 'scaleX(0)' }} />
      <Hero />
      <Lights />
      <Happiness />
      <Celebration />
      <WishCard />
      <FinalWishes />
    </main>
  )
}

export default function App() {
  const [entered, setEntered] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [mode, setMode] = useState('off')
  const music = useMusic()

  const onEnter = useCallback(() => { music.start(); setEntered(true) }, [music])
  const onDone = useCallback(() => setIntroDone(true), [])

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    if (!introDone) window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [introDone])

  return (
    <>
      {entered && (
        <>
          <Main onMode={setMode} />
          <FireworksCanvas mode={mode} />
          <MusicControl playing={music.playing} onToggle={music.toggle} />
          <BackToTop />
        </>
      )}
      {!introDone && <Intro onEnter={onEnter} onDone={onDone} />}
    </>
  )
}
