import { useId, useMemo } from 'react'

const rect = (x, y, w, h) => `M${x} ${y}h${w}v${h}h${-w}Z`
const dome = (cx, base, w, h) =>
  `M${cx - w / 2} ${base}C${cx - w / 2} ${base - h * 0.55} ${cx - w * 0.2} ${base - h * 0.9} ${cx} ${base - h}C${cx + w * 0.2} ${base - h * 0.9} ${cx + w / 2} ${base - h * 0.55} ${cx + w / 2} ${base}Z`
const arch = (x, y, w, h) => `M${x} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2}V${y + h}Z`
const finial = (cx, y) => rect(cx - 1, y - 9, 2, 9) + `M${cx - 3} ${y - 11}a3 3 0 1 0 6 0a3 3 0 1 0 -6 0`
const chhatri = (cx, base, w) => {
  let d = ''
  for (let k = 0; k < 4; k++) d += rect(cx - w / 2 + (k * (w - 3)) / 3, base - 20, 3, 20)
  d += rect(cx - w / 2 - 3, base - 23, w + 6, 4)
  d += dome(cx, base - 23, w + 4, w * 0.8) + finial(cx, base - 23 - w * 0.8)
  return d
}
const battlements = (a, b, y) => { let d = ''; for (let x = a + 4; x < b - 8; x += 14) d += rect(x, y - 8, 8, 8); return d }

export default function Palace({ className = '' }) {
  const id = useId().replace(/:/g, '')
  const { body, windows } = useMemo(() => {
    let d = ''
    d += rect(0, 300, 1440, 40)
    d += rect(0, 276, 380, 64) + battlements(0, 380, 276)
    d += rect(1060, 276, 380, 64) + battlements(1060, 1440, 276)
    d += rect(340, 236, 240, 104) + battlements(340, 580, 236)
    d += rect(860, 236, 240, 104) + battlements(860, 1100, 236)
    d += rect(560, 176, 320, 164) + battlements(560, 880, 176)
    d += rect(626, 150, 188, 30) + dome(720, 150, 176, 94) + finial(720, 56)
    d += rect(718, 8, 4, 40)
    ;[588, 852].forEach((x) => (d += chhatri(x, 176, 34)))
    ;[380, 470, 970, 1060].forEach((x) => (d += chhatri(x, 236, 28)))
    ;[330, 1110].forEach((x) => (d += rect(x - 16, 140, 32, 200) + chhatri(x, 140, 36)))
    ;[520, 920].forEach((x) => (d += rect(x - 7, 110, 14, 230) + dome(x, 110, 26, 32) + finial(x, 78)))
    const w = []
    for (let i = 0; i < 6; i++) w.push(arch(590 + i * 50, 214, 24, 56))
    for (let i = 0; i < 5; i++) { w.push(arch(366 + i * 42, 262, 20, 44)); w.push(arch(872 + i * 42, 262, 20, 44)) }
    ;[330, 1110].forEach((x) => w.push(arch(x - 6, 190, 12, 36)))
    w.push(arch(704, 262, 32, 78))
    return { body: d, windows: w }
  }, [])

  return (
    <svg viewBox="0 0 1440 340" className={className} style={{ width: 'max(100%, 1100px)' }} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241a5a" /><stop offset=".55" stopColor="#0d0f35" /><stop offset="1" stopColor="#04061a" />
        </linearGradient>
      </defs>
      <path d={body} fill={`url(#s${id})`} />
      {[0, 1, 2, 3].map((g) => (
        <g key={g} fill="#F4D58D" style={{ animation: `twinkle ${4 + g * 1.3}s ease-in-out ${g * 0.8}s infinite`, transformBox: 'fill-box', transformOrigin: 'center' }}>
          {windows.filter((_, i) => i % 4 === g).map((p, i) => <path key={i} d={p} opacity=".85" />)}
        </g>
      ))}
    </svg>
  )
}
