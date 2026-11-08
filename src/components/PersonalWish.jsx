import { motion } from 'framer-motion'
import { Diya, Flower, Sparkles, SectionTitle, Reveal } from './Decor'

const MSG = [
  'Dear Friends and Family,',
  'On this beautiful occasion of Diwali, I wish that your life is always filled with happiness, your home with prosperity, and your heart with endless peace and love.',
  'May every diya remove darkness from your life, every sparkle bring a new reason to smile, and every moment become a beautiful memory.',
  'May Maa Lakshmi bless you with wealth, Maa Saraswati bless you with wisdom, and may your life always shine with success, positivity, and endless opportunities.',
  'Keep smiling, keep shining, and keep spreading happiness wherever you go.',
  'Wishing you and your entire family a very Happy and Prosperous Diwali 2026!',
  'With lots of love and warm wishes,\nPawan Kumar ❤️'
]

export default function PersonalWish({ name, rel }) {
  const msg = MSG.map((t, i) => (i === 0 ? rel.greet(name) : t))
  return (
    <section id="wish" className="relative overflow-hidden px-5 py-24" style={{ background: 'linear-gradient(180deg,#3a1450,#251044 40%,#09051D)' }}>
      <Sparkles count={14} rise="-600px" />
      <SectionTitle>{name ? `A Heartfelt Wish for ${name}` : 'A Heartfelt Diwali Wish'}</SectionTitle>
      <div className="relative mx-auto max-w-3xl rounded-3xl p-[2px]" style={{ background: 'linear-gradient(135deg,#FFD700,#FF4F91,#FF8C32,#FFD700)', boxShadow: '0 0 60px rgba(255,140,50,.35)' }}>
        <div className="glass relative overflow-hidden rounded-[22px] px-6 py-14 sm:px-14" style={{ background: 'radial-gradient(circle at 50% 0%,rgba(255,140,50,.18),rgba(9,5,29,.92) 70%)' }}>
          <Flower size={80} className="absolute -left-6 -top-6 opacity-80" />
          <Flower size={80} className="absolute -right-6 -top-6 opacity-80" />
          <Flower size={64} className="absolute -bottom-5 -left-5 opacity-70" />
          <Flower size={64} className="absolute -bottom-5 -right-5 opacity-70" />
          <div className="mb-8 flex justify-center gap-6"><Diya size={52} /><Diya size={64} /><Diya size={52} /></div>
          <div className="relative space-y-5 text-center font-script text-xl leading-relaxed sm:text-2xl">
            {msg.map((t, i) => (
              <motion.p key={i} className={`whitespace-pre-line ${i === 0 ? 'font-display text-gold' : ''} ${i === MSG.length - 1 ? 'pt-3 font-semibold text-gold' : ''}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.9, delay: 0.1 }}>{t}</motion.p>
            ))}
          </div>
        </div>
      </div>
      <Reveal delay={0.2} className="glass relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl px-6 py-10 text-center">
        <Flower size={56} className="absolute -left-4 -top-4 opacity-70" />
        <Flower size={56} className="absolute -right-4 -bottom-4 opacity-70" />
        <p className="font-display text-gold">A special wish just for {name || 'you'} 💛</p>
        <p className="mt-4 font-script text-2xl italic leading-relaxed sm:text-3xl">{rel.special}</p>
      </Reveal>
    </section>
  )
}
