export const NAME = 'Ashish Gangwar'
export const FIRST = 'Ashish'

let list = []
try { list = JSON.parse(import.meta.env.VITE_MUSIC_LIST || '[]') } catch { list = [] }
// Optional music: VITE_MUSIC_URL, or any audio file dropped in public/music. Falls back to a soft generated melody.
export const MUSIC_URL = (import.meta.env.VITE_MUSIC_URL || '').trim() || list[0] || ''

export const shareLink = () =>
  (import.meta.env.VITE_SITE_URL || '').trim() || (typeof window !== 'undefined' ? window.location.origin : '')

export const whatsappUrl = () => {
  const text = `🪔 *Shubh Deepawali, ${NAME}!* ✨\n\nMay this festival of lights fill your life with happiness, success and endless prosperity. I made a little Diwali surprise just for you 👇\n\n${shareLink()}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export const burst = (x, y, opts = {}) =>
  window.dispatchEvent(new CustomEvent('diwali-burst', { detail: { x, y, ...opts } }))
