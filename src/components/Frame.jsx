// Ornamental gold corner frame. Wrap any content.
const Corner = ({ className }) => (
  <svg viewBox="0 0 64 64" className={`absolute w-10 h-10 sm:w-14 sm:h-14 ${className}`} fill="none" stroke="#F4D58D" strokeWidth="1.2" aria-hidden="true">
    <path d="M2 62 V18 Q2 2 18 2 H62" /><path d="M10 54 V22 Q10 10 22 10 H54" strokeOpacity=".5" />
    <circle cx="18" cy="18" r="3" fill="#D9A441" stroke="none" /><path d="M2 2 L12 12" strokeOpacity=".6" />
  </svg>
)

export default function Frame({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  )
}
