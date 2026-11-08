import { useEffect, useRef } from 'react'

const P = {
  gold: ['#F4D58D', '#D9A441', '#FFF5DC', '#ffe3a1'],
  purple: ['#8e5fd0', '#b48cf0', '#6B3FA0', '#d3b8ff'],
  mix: ['#F4D58D', '#b48cf0', '#D9A441', '#8e5fd0', '#FFF5DC']
}
const pick = (a) => a[(Math.random() * a.length) | 0]

/**
 * One fixed, pointer-transparent canvas for the whole page.
 * - click anywhere (outside buttons/links) => burst
 * - mode: 'off' | 'hero' | 'final' => automatic launches
 * - window event 'diwali-burst' => programmatic burst
 * The loop sleeps whenever nothing is on screen.
 */
export default function FireworksCanvas({ mode }) {
  const ref = useRef(null)
  const modeRef = useRef(mode)
  const wake = useRef(() => {})

  useEffect(() => { modeRef.current = mode; wake.current() }, [mode])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, last = 0, running = false, nextAuto = 0
    const rockets = [], sparks = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const palFor = (key) => {
      if (key && P[key]) return P[key]
      if (modeRef.current === 'final') return Math.random() < 0.8 ? P.gold : P.mix
      const r = Math.random()
      return r < 0.4 ? P.gold : r < 0.7 ? P.purple : P.mix
    }

    function explode(x, y, pal, kind, scale = 1) {
      const small = w < 640
      const k = kind || pick(['sphere', 'sphere', 'ring', 'willow'])
      const count = Math.round((k === 'ring' ? 64 : k === 'willow' ? 56 : 84) * (small ? 0.65 : 1) * scale)
      const speed = (k === 'willow' ? 3.1 : 3.8 + Math.random() * 1.6) * (small ? 0.8 : 1) * (0.7 + scale * 0.3)
      for (let i = 0; i < count; i++) {
        const a = k === 'ring' ? (i / count) * Math.PI * 2 : Math.random() * Math.PI * 2
        const v = k === 'ring' ? speed : speed * (0.25 + Math.random() * 0.75)
        sparks.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1,
          decay: (k === 'willow' ? 0.0065 : 0.012) + Math.random() * 0.008,
          size: 1.1 + Math.random() * 1.5, color: pick(pal), g: k === 'willow' ? 0.045 : 0.03
        })
      }
      sparks.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.07, size: 70 * scale, color: '#FFF5DC', g: 0, flash: true })
      if (sparks.length > 900) sparks.splice(0, sparks.length - 900)
    }

    function launch(x, ty, pal, kind) {
      const sx = x + (Math.random() - 0.5) * 80
      const ang = Math.atan2(ty - h, x - sx)
      const sp = 9 + Math.random() * 2
      rockets.push({ x: sx, y: h + 10, ty, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, pal, kind })
    }

    const autoLaunch = (m) => {
      const x = w * (0.12 + Math.random() * 0.76)
      const ty = h * (0.12 + Math.random() * (m === 'final' ? 0.45 : 0.35))
      launch(x, ty, palFor(), null)
    }

    function tick(now) {
      raf = 0
      if (document.hidden) { running = false; return }
      const dt = Math.min(2.2, (now - last) / 16.67 || 1); last = now
      const m = modeRef.current
      const auto = m !== 'off' && !reduce
      if (auto && now >= nextAuto) {
        autoLaunch(m)
        if (m === 'final' && Math.random() < 0.5) setTimeout(() => autoLaunch(m), 160)
        nextAuto = now + (m === 'final' ? 650 + Math.random() * 650 : 1600 + Math.random() * 1700)
      }
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        const px = r.x, py = r.y
        r.x += r.vx * dt; r.y += r.vy * dt
        ctx.globalAlpha = 0.9; ctx.strokeStyle = '#FFF5DC'; ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(px - r.vx * 2, py - r.vy * 2); ctx.lineTo(r.x, r.y); ctx.stroke()
        if (r.y <= r.ty) { explode(r.x, r.y, r.pal, r.kind); rockets.splice(i, 1) }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        if (s.flash) {
          s.life -= s.decay * dt
          if (s.life <= 0) { sparks.splice(i, 1); continue }
          const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size)
          gr.addColorStop(0, 'rgba(255,245,220,.9)'); gr.addColorStop(1, 'rgba(255,245,220,0)')
          ctx.globalAlpha = s.life; ctx.fillStyle = gr
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 6.2832); ctx.fill()
          continue
        }
        const px = s.x, py = s.y
        s.vx *= 0.985; s.vy = s.vy * 0.985 + s.g * dt
        s.x += s.vx * dt; s.y += s.vy * dt; s.life -= s.decay * dt
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        ctx.globalAlpha = Math.min(1, s.life * 1.4) * Math.min(1, s.life * 1.4)
        ctx.strokeStyle = s.color; ctx.lineWidth = s.size
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(s.x, s.y); ctx.stroke()
      }
      ctx.globalAlpha = 1

      if (!rockets.length && !sparks.length && !auto) { ctx.clearRect(0, 0, w, h); running = false; return }
      raf = requestAnimationFrame(tick)
    }

    wake.current = () => {
      if (running) return
      running = true; last = performance.now(); raf = requestAnimationFrame(tick)
    }

    const fire = (x, y, opts = {}) => {
      explode(x, y, palFor(opts.pal), opts.kind, opts.scale || 1)
      wake.current()
    }
    const onClick = (e) => {
      if (e.target.closest && e.target.closest('button,a,input,textarea,[data-nofire]')) return
      fire(e.clientX, e.clientY)
    }
    const onBurst = (e) => fire(e.detail.x, e.detail.y, e.detail)
    const onVis = () => { if (!document.hidden) wake.current() }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('click', onClick)
    window.addEventListener('diwali-burst', onBurst)
    document.addEventListener('visibilitychange', onVis)
    wake.current()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
      window.removeEventListener('diwali-burst', onBurst)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-30" aria-hidden="true" />
}
