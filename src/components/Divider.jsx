export default function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-14 sm:w-28 bg-gradient-to-r from-transparent to-champagne/70" />
      <svg width="26" height="26" viewBox="-13 -13 26 26" fill="none" stroke="#F4D58D" strokeWidth="1">
        <path d="M0 -11 L4 -4 L11 0 L4 4 L0 11 L-4 4 L-11 0 L-4 -4Z" /><circle r="2" fill="#D9A441" />
      </svg>
      <span className="h-px w-14 sm:w-28 bg-gradient-to-l from-transparent to-champagne/70" />
    </div>
  )
}
