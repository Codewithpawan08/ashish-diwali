const LINKS = [['wish', 'Wish'], ['blessings', 'Blessings'], ['diya', 'Diya'], ['sky', 'Crackers']]
export default function DiwaliNavbar() {
  return (
    <nav aria-label="Main" className="glass fixed inset-x-3 top-3 z-50 flex items-center justify-between rounded-full px-4 py-2 sm:inset-x-8">
      <a href="#home" className="font-display text-gold">🪔 Diwali 2026</a>
      <ul className="hidden gap-6 text-sm md:flex">
        {LINKS.map(([id, t]) => <li key={id}><a className="transition hover:text-gold" href={`#${id}`}>{t}</a></li>)}
      </ul>
      <a href="#sky" className="btn-gold !min-h-0 !px-4 !py-2 text-sm">🎆 Crackers</a>
    </nav>
  )
}
