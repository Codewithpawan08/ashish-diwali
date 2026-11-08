import { motion } from 'framer-motion'
import { Coins, Heart, Smile, Trophy } from 'lucide-react'
import Rangoli from './Rangoli.jsx'
import SectionTitle from './SectionTitle.jsx'

const items = [
  { n: 'I', icon: Smile, title: 'Joy', text: 'Laughter that echoes through every room, and a heart as bright as a thousand diyas.' },
  { n: 'II', icon: Coins, title: 'Prosperity', text: 'Abundance in your home, growth in your work, and blessings that never run dry.' },
  { n: 'III', icon: Heart, title: 'Love', text: 'Family around you, friends beside you, and a warmth that outshines every winter night.' },
  { n: 'IV', icon: Trophy, title: 'Success', text: 'New doors, bold dreams and the courage to chase them — may this year crown your efforts.' }
]

export default function Happiness() {
  return (
    <section id="happiness" className="relative overflow-hidden py-24 sm:py-32 px-5">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, #39205F 0%, #130f38 40%, #080D25 80%)' }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Rangoli className="w-[min(150vw,1100px)] opacity-[0.07] animate-spin-slower" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle eyebrow="Chapter Two" title="Festival of Happiness" sub="Four blessings, one wish — carried to you on the light of every diya." />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start max-w-md sm:max-w-none mx-auto">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.article key={it.title} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -8 }}
                className={`relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-champagne/30 px-7 pt-20 pb-9 text-center ${i % 2 ? 'lg:mt-14' : ''}`}
                style={{ background: 'linear-gradient(180deg, rgba(107,63,160,.42) 0%, rgba(57,32,95,.28) 45%, rgba(8,13,37,.75) 100%)' }}>
                <div className="absolute inset-2 rounded-t-[999px] rounded-b-2xl border border-champagne/10 pointer-events-none" />
                <Rangoli className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 opacity-[0.12]" />
                <span className="absolute top-8 left-1/2 -translate-x-1/2 font-cinzel text-[.7rem] tracking-[.4em] text-champagne/60">{it.n}</span>
                <div className="relative mx-auto -mt-1 mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, rgba(244,213,141,.3), rgba(244,213,141,.05) 70%)', boxShadow: '0 0 0 1px rgba(244,213,141,.45), 0 0 28px rgba(217,164,65,.3)' }}>
                  <Icon size={24} className="text-champagne" strokeWidth={1.5} />
                </div>
                <h3 className="relative gold-text font-display text-3xl">{it.title}</h3>
                <p className="relative mt-4 font-elegant text-[1.1rem] leading-snug text-ivory/80">{it.text}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
