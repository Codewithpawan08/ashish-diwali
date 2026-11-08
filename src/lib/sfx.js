// Synthesized cracker sounds (no audio files, no copyright issues)
export const sfx = { on: true }
let ctx, nb
const ac = () => { if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ctx = new C() } if (ctx.state === 'suspended') ctx.resume(); return ctx }
const noise = (c) => { if (!nb) { nb = c.createBuffer(1, c.sampleRate * 2, c.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1 } return nb }
export function boom(p = 1) {
  if (!sfx.on) return; const c = ac(); if (!c) return; const t = c.currentTime
  const s = c.createBufferSource(); s.buffer = noise(c)
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(1200, t); lp.frequency.exponentialRampToValueAtTime(70, t + 1)
  const g = c.createGain(); g.gain.setValueAtTime(0.9 * p, t); g.gain.exponentialRampToValueAtTime(0.001, t + 1.1)
  s.connect(lp); lp.connect(g); g.connect(c.destination); s.start(t, 0, 1.2)
  const o = c.createOscillator(), og = c.createGain(); o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(30, t + 0.5)
  og.gain.setValueAtTime(0.9 * p, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.6); o.connect(og); og.connect(c.destination); o.start(t); o.stop(t + 0.7)
}
export function whoosh() {
  if (!sfx.on) return; const c = ac(); if (!c) return; const t = c.currentTime
  const s = c.createBufferSource(); s.buffer = noise(c); const b = c.createBiquadFilter(); b.type = 'bandpass'
  b.frequency.setValueAtTime(300, t); b.frequency.exponentialRampToValueAtTime(3000, t + 0.9)
  const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.18, t + 0.3); g.gain.exponentialRampToValueAtTime(0.001, t + 1)
  s.connect(b); b.connect(g); g.connect(c.destination); s.start(t, 0, 1.1)
}
export function hiss(sec = 5, freq = 2000) {
  if (!sfx.on) return; const c = ac(); if (!c) return; const t = c.currentTime
  const s = c.createBufferSource(); s.buffer = noise(c); s.loop = true; const b = c.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = freq
  const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.14, t + 0.4); g.gain.setValueAtTime(0.14, t + sec - 1); g.gain.linearRampToValueAtTime(0, t + sec)
  s.connect(b); b.connect(g); g.connect(c.destination); s.start(t); s.stop(t + sec + 0.1)
}
export function crackle(sec = 6) {
  if (!sfx.on) return; const c = ac(); if (!c) return
  for (let i = 0; i < sec * 18; i++) setTimeout(() => {
    if (!sfx.on) return; const s = c.createBufferSource(); s.buffer = noise(c); const h = c.createBiquadFilter(); h.type = 'highpass'; h.frequency.value = 3000
    const g = c.createGain(); g.gain.value = 0.04 + Math.random() * 0.1; s.connect(h); h.connect(g); g.connect(c.destination); s.start(c.currentTime, Math.random(), 0.02)
  }, Math.random() * sec * 1000)
}
