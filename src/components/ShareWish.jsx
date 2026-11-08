import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Share2, MessageCircle } from 'lucide-react'
import { cleanName, shareLink, FROM } from '../lib/config'
import { Reveal, SectionTitle } from './Decor'

export default function ShareWish() {
  const [raw, setRaw] = useState('')
  const [toast, setToast] = useState('')
  const name = cleanName(raw)
  const link = shareLink(name)
  const msg = `🪔✨ Happy Diwali 2026${name ? ', ' + name : ''}! May your life sparkle with happiness, prosperity, and endless blessings. Sending lots of love and warm wishes from ${FROM}! ❤️🎆`
  const show = (t) => { setToast(t); setTimeout(() => setToast(''), 2400) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(link) } catch {
      const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove()
    }
    show('Link copied! Share the happiness ❤️')
  }
  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: 'Happy Diwali 2026', text: msg, url: link }) } catch { /* cancelled */ } } else copy()
  }
  return (
    <section id="share" className="px-5 py-24" style={{ background: 'linear-gradient(180deg,#09051D,#251044)' }}>
      <SectionTitle sub="Add a name to make the greeting personal">Share Your Diwali Wish</SectionTitle>
      <Reveal className="glass mx-auto max-w-xl rounded-3xl p-6 text-center sm:p-10">
        <label htmlFor="to" className="mb-2 block text-sm text-cream/80">Who is this wish for? (optional)</label>
        <input id="to" value={raw} maxLength={30} onChange={(e) => setRaw(e.target.value)} placeholder="e.g. Rahul" className="w-full rounded-full border border-gold/50 bg-night/60 px-5 py-3 text-center text-cream placeholder:text-cream/40" />
        <p className="mt-3 break-all text-xs text-cream/50">{link}</p>
        <div className="mt-6 flex flex-col gap-3">
          <button onClick={share} className="btn-gold"><Share2 size={18} /> Share Diwali Happiness ❤️</button>
          <div className="grid grid-cols-2 gap-3">
            <a className="btn-glass" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(msg + '\n' + link)}`}><MessageCircle size={18} /> WhatsApp</a>
            <button onClick={copy} className="btn-glass"><Copy size={18} /> Copy link</button>
          </div>
        </div>
      </Reveal>
      <AnimatePresence>
        {toast && <motion.div role="status" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="glass fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 text-sm">{toast}</motion.div>}
      </AnimatePresence>
    </section>
  )
}
