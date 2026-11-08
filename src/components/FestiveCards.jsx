import { useRef } from 'react'
import { Reveal, SectionTitle } from './Decor'

const CARDS = [
  ['🌼', 'Happiness', 'May your days be filled with endless smiles.', '#FFD700,#FF8C32'],
  ['🪙', 'Prosperity', 'May success and abundance always find you.', '#FF8C32,#FF4F91'],
  ['🏡', 'Love', 'May your home always be filled with warmth and togetherness.', '#FF4F91,#a855f7'],
  ['🌅', 'New Beginnings', 'May this Diwali bring exciting opportunities.', '#a855f7,#38bdf8']
]

function Tilt({ children, className }) {
  const r = useRef(null)
  const move = (e) => { const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; r.current.style.transform = `perspective(700px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateY(-6px)` }
  return <article ref={r} onPointerMove={move} onPointerLeave={() => { r.current.style.transform = '' }} className={className} style={{ transition: 'transform .15s ease-out' }}>{children}</article>
}

export default function FestiveCards() {
  return (
    <section id="blessings" className="px-5 py-24" style={{ background: 'linear-gradient(180deg,#09051D,#1a0b33)' }}>
      <SectionTitle>Spread Happiness, Share Blessings ❤️</SectionTitle>
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(([emoji, title, text, grad], i) => (
          <Reveal key={title} delay={i * 0.12}>
            <Tilt className="glass card-glow h-full rounded-3xl p-7 text-center">
              <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full text-5xl" style={{ background: `linear-gradient(135deg,${grad})`, boxShadow: '0 0 30px rgba(255,215,0,.35)' }} aria-hidden="true">{emoji}</div>
              <h3 className="font-display text-xl font-bold text-gold">{title}</h3>
              <p className="mt-3 text-cream/80">{text}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
