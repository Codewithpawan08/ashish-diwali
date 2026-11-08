import { useEffect, useRef, useState } from 'react'
import { Music2, VolumeX } from 'lucide-react'

// Plays your own track from public/music/diwali.mp3 (or VITE_MUSIC_URL). If the file is missing,
// it falls back to a royalty-free bell melody synthesized live with Web Audio.
// Any mp3/m4a/ogg/wav placed in src/assets/music/ is picked up automatically (any file name).
const found = Object.values(import.meta.glob('../assets/music/*.{mp3,m4a,ogg,wav,aac}', { eager: true, query: '?url', import: 'default' }))
const SRCS = [...found, ...JSON.parse(import.meta.env.VITE_MUSIC_LIST || '[]'), import.meta.env.VITE_MUSIC_URL, '/music/diwali.mp3'].filter(Boolean)
const SC = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25]

export default function MusicController() {
  const [on, setOn] = useState(false)
  const [vol, setVol] = useState(0.5)
  const [mode, setMode] = useState('')
  const a = useRef({ i: 3 })

  const bell = () => {
    const s = a.current, { ctx, master } = s
    s.i = Math.max(0, Math.min(SC.length - 1, s.i + [-2, -1, -1, 0, 1, 1, 2][Math.floor(Math.random() * 7)]))
    const f = SC[s.i], t = ctx.currentTime
    ;[[1, 0.22], [2, 0.08], [3.01, 0.03]].forEach(([m, v]) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = f * m
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4)
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 2.5)
    })
  }
  const startSynth = async () => {
    const s = a.current
    if (!s.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return
      s.ctx = new Ctx(); s.master = s.ctx.createGain(); s.master.gain.value = vol * 0.6; s.master.connect(s.ctx.destination)
      ;[130.81, 196].forEach((f) => { const o = s.ctx.createOscillator(), g = s.ctx.createGain(); o.frequency.value = f; g.gain.value = 0.07; o.connect(g); g.connect(s.master); o.start() })
    }
    await s.ctx.resume(); bell(); s.timer = setInterval(bell, 650)
  }
  const toggle = async () => {
    const s = a.current
    if (on) { s.audio?.pause(); clearInterval(s.timer); await s.ctx?.suspend(); setOn(false); return }
    if (!s.tried) {
      s.tried = true
      for (const src of SRCS) {
        const au = new Audio(src); au.loop = true; au.volume = vol
        try { await au.play(); s.audio = au; break } catch (err) { console.warn('Music source failed:', src, err?.name) }
      }
    } else if (s.audio) { try { await s.audio.play() } catch { s.audio = null } }
    if (!s.audio) await startSynth()
    setMode(s.audio ? 'song' : 'tune'); setOn(true)
  }
  useEffect(() => { const s = a.current; if (s.audio) s.audio.volume = vol; if (s.master) s.master.gain.setTargetAtTime(vol * 0.6, s.ctx.currentTime, 0.05) }, [vol])
  useEffect(() => () => { const s = a.current; clearInterval(s.timer); s.audio?.pause(); s.ctx?.close() }, [])

  return (
    <div className="glass fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-full py-2 pl-2 pr-4">
      <button onClick={toggle} aria-pressed={on} aria-label={on ? 'Pause festive music' : 'Play festive music'} className="btn-gold !min-h-0 !p-3">
        {on ? <Music2 size={20} /> : <VolumeX size={20} />}
      </button>
      {on ? (
        <>
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">{[0, 0.2, 0.4, 0.1].map((d) => <i key={d} className="bar" style={{ animationDelay: d + 's' }} />)}</span>
          <span className="text-xs">{mode === 'song' ? '🎵 Song' : import.meta.env.DEV ? 'No mp3 found' : 'Festive tune'}</span>
          <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Music volume" className="w-20 accent-[#FFD700]" />
        </>
      ) : <span className="pr-1 text-sm">Music</span>}
    </div>
  )
}
