// Golden rangoli-inspired mandala (pure SVG, rendered once, rotated with CSS).
const star = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 ? 6 : 13, a = (i * Math.PI) / 8 - Math.PI / 2
  return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`
}).join(' ')

export default function Rangoli({ className = '', stroke = '#F4D58D', fill = '#D9A441', sw = 0.6 }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" stroke={stroke} strokeWidth={sw} aria-hidden="true">
      <circle r="98" /><circle r="94.5" strokeDasharray="1 3" />
      {Array.from({ length: 32 }, (_, i) => (
        <circle key={`d${i}`} cy="-88" r="1.3" fill={fill} stroke="none" transform={`rotate(${i * 11.25})`} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={`p${i}`} d="M0 -80 C9 -70 9 -56 0 -48 C-9 -56 -9 -70 0 -80Z" transform={`rotate(${i * 22.5})`} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path key={`q${i}`} d="M0 -68 Q6 -59 0 -47 Q-6 -59 0 -68Z" fill={fill} fillOpacity=".25" transform={`rotate(${i * 22.5 + 11.25})`} />
      ))}
      <circle r="45" /><circle r="41" strokeDasharray="2 2.5" />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={`b${i}`} d="M0 -39 C14 -32 14 -18 0 -6 C-14 -18 -14 -32 0 -39Z" fill={fill} fillOpacity=".12" transform={`rotate(${i * 45})`} />
      ))}
      <circle r="15" />
      <polygon points={star} fill={fill} fillOpacity=".55" />
      <circle r="2.2" fill={stroke} stroke="none" />
    </svg>
  )
}
