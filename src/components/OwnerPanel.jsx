import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Share2, MessageCircle, Lock, X, ExternalLink } from 'lucide-react'
import { cleanName, siteUrl } from '../lib/config'
import { RELS } from '../lib/wishes'

export default function OwnerPanel() {
  const [open, setOpen] = useState(false)
  const [raw, setRaw] = useState('')
  const [rel, setRel] = useState('friend')
  const [toast, setToast] = useState('')
  const name = cleanName(raw)
  const q = new URLSearchParams()
  if (name) q.set('to', name)
  if (rel !== 'default') q.set('r', rel)
  const qs = q.toString()
  const link = siteUrl() + (qs ? '?' + qs : '')
  const msg = RELS[rel].share(name)
  const show = (t) => { setToast(t); setTimeout(() => setToast(''), 2200) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(link) } catch { const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove() }
    show('Link copied ❤️')
  }
  const share = async () => { if (navigator.share) { try { await navigator.share({ title: 'Happy Diwali 2026', text: msg, url: link }) } catch { /* cancelled */ } } else copy() }
  return (
    <>
      <button onClick={() => setOpen(!open)} aria-label="Owner tools" aria-expanded={open} className="btn-gold fixed bottom-4 right-4 z-50 !min-h-0 !p-3">{open ? <X size={20} /> : <Lock size={20} />}</button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="glass fixed inset-x-4 bottom-20 z-50 max-h-[80vh] overflow-auto rounded-3xl p-5 sm:left-auto sm:w-96" style={{ background: 'rgba(9,5,29,.92)' }}>
            <h3 className="font-display text-gold">Send a wish 🪔 (only you see this)</h3>
            <label htmlFor="to" className="mt-4 block text-sm text-cream/80">Recipient name</label>
            <input id="to" value={raw} maxLength={30} onChange={(e) => setRaw(e.target.value)} placeholder="e.g. Rahul" className="mt-1 w-full rounded-full border border-gold/50 bg-night/60 px-4 py-2 text-cream placeholder:text-cream/40" />
            <p className="mt-4 text-sm text-cream/80">Who is it for?</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {Object.entries(RELS).map(([k, r]) => (
                <button key={k} aria-pressed={rel === k} onClick={() => setRel(k)} className={`rounded-xl border px-2 py-2 text-xs ${rel === k ? 'border-gold bg-gold/20 text-gold' : 'border-gold/30'}`}>{r.label}</button>
              ))}
            </div>
            <p className="mt-3 text-xs italic text-cream/60">“{RELS[rel].special}”</p>
            <p className="mt-4 break-all rounded-xl bg-night/70 p-2 text-xs text-cream/60">{link}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={share} className="btn-gold !min-h-0 !py-2 text-sm"><Share2 size={16} /> Share</button>
              <a className="btn-glass !min-h-0 !py-2 text-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(msg + '\n' + link)}`}><MessageCircle size={16} /> WhatsApp</a>
              <button onClick={copy} className="btn-glass !min-h-0 !py-2 text-sm"><Copy size={16} /> Copy link</button>
              <a className="btn-glass !min-h-0 !py-2 text-sm" target="_blank" rel="noopener noreferrer" href={link + (qs ? '&' : '?') + 'view=guest'}><ExternalLink size={16} /> Preview</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{toast && <motion.div role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full px-5 py-2 text-sm">{toast}</motion.div>}</AnimatePresence>
    </>
  )
}
