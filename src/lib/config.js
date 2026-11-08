import { RELS } from './wishes'
export const FROM = 'Pawan Kumar'
export const DIWALI_DATE = new Date(import.meta.env.VITE_DIWALI_DATE || '2026-11-08T00:00:00+05:30')
// Keep only letters (any language), spaces, . ' - ; max 30 chars. Safe for ?to=Name
export const cleanName = (s = '') => s.replace(/[^\p{L}\p{M}\s.'-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 30)
export const getRecipient = () => cleanName(new URLSearchParams(window.location.search).get('to') || '')
export const siteUrl = () => import.meta.env.VITE_SITE_URL || window.location.origin + window.location.pathname
export const shareLink = (n) => (n ? `${siteUrl()}?to=${encodeURIComponent(n)}` : siteUrl())
export const lowPower = () => window.innerWidth < 640 || (navigator.hardwareConcurrency || 8) <= 4
export const getRelation = () => { const r = new URLSearchParams(window.location.search).get('r'); return RELS[r] ? r : 'default' }
