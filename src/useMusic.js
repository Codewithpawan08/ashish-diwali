import { useCallback, useEffect, useRef, useState } from 'react'
import { MUSIC_URL } from './config.js'

// Plays a supplied audio file if one exists; otherwise a soft generated diya-bell melody (Web Audio).
export default function useMusic() {
  const [playing, setPlaying] = useState(false)
  const s = useRef({ started: false, mode: null, audio: null, ctx: null, master: null, timer: 0 })

  const synthStart = useCallback(() => {
    const st = s.current
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    const ctx = new AC(); st.ctx = ctx; st.mode = 'synth'
    const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); st.master = master
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.5)
    const delay = ctx.createDelay(); delay.delayTime.value = 0.42
    const fb = ctx.createGain(); fb.gain.value = 0.38
    delay.connect(fb); fb.connect(delay); delay.connect(master)
    const bus = ctx.createGain(); bus.connect(master); bus.connect(delay)
    ;[73.42, 110, 146.83].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f
      const g = ctx.createGain(); g.gain.value = i === 0 ? 0.06 : 0.025
      o.connect(g); g.connect(master); o.start()
    })
    const scale = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99]
    let idx = 3
    const note = () => {
      idx = Math.max(0, Math.min(scale.length - 1, idx + [-2, -1, -1, 0, 1, 1, 2][(Math.random() * 7) | 0]))
      const t = ctx.currentTime, f = scale[idx]
      ;[['triangle', f, 0.11], ['sine', f * 2, 0.05]].forEach(([type, fr, peak]) => {
        const o = ctx.createOscillator(); o.type = type; o.frequency.value = fr
        const g = ctx.createGain()
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6)
        o.connect(g); g.connect(bus); o.start(t); o.stop(t + 2.7)
      })
      st.timer = setTimeout(note, 650 + Math.random() * 900)
    }
    st.note = note
    note()
  }, [])

  const start = useCallback(() => {
    const st = s.current
    if (st.started) return
    st.started = true
    if (!MUSIC_URL) { synthStart(); setPlaying(true); return }
    const a = new Audio(MUSIC_URL); a.loop = true; a.volume = 0.55; st.audio = a; st.mode = 'file'
    const fallback = () => { st.audio = null; synthStart(); setPlaying(true) }
    a.addEventListener('error', fallback, { once: true })
    a.play().then(() => setPlaying(true)).catch(fallback)
  }, [synthStart])

  const toggle = useCallback(() => {
    const st = s.current
    if (!st.started) { start(); return }
    if (playing) {
      if (st.mode === 'file') st.audio.pause()
      else if (st.ctx) { clearTimeout(st.timer); st.master.gain.cancelScheduledValues(0); st.master.gain.setTargetAtTime(0, st.ctx.currentTime, 0.2); setTimeout(() => st.ctx.suspend(), 700) }
      setPlaying(false)
    } else {
      if (st.mode === 'file') st.audio.play()
      else if (st.ctx) {
        st.ctx.resume(); st.master.gain.setTargetAtTime(0.5, st.ctx.currentTime, 0.4)
        // restart the melody loop
        clearTimeout(st.timer); st.note && st.note()
      }
      setPlaying(true)
    }
  }, [playing, start])

  useEffect(() => () => { const st = s.current; clearTimeout(st.timer); st.audio && st.audio.pause(); st.ctx && st.ctx.close() }, [])
  return { playing, start, toggle }
}
