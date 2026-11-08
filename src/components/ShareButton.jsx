import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../config.js'

export default function ShareButton({ className = 'btn-ghost' }) {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle size={16} /> Share on WhatsApp
    </a>
  )
}
