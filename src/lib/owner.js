// Owner mode: the share panel only appears on devices where Pawan has unlocked it with his private key.
const KEY = 'dw_owner'
const sha = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('')
export async function detectOwner() {
  const H = (import.meta.env.VITE_OWNER_HASH || '').toLowerCase()
  try {
    const p = new URLSearchParams(window.location.search)
    if (p.get('view') === 'guest') return false
    if (import.meta.env.DEV) return true // local testing: panel always visible
    if (!H) return false
    const k = p.get('owner')
    if (k && (await sha(k)) === H) {
      localStorage.setItem(KEY, H); p.delete('owner')
      history.replaceState(null, '', window.location.pathname + (p.toString() ? '?' + p : '') + window.location.hash)
    }
    return localStorage.getItem(KEY) === H
  } catch { return false }
}
