import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface FlipCardProps {
  title: string
  desc: string
  agentName: string
  agentDesc: string
  accentColor: string
}

export default function FlipCard({ title, desc, agentName, agentDesc, accentColor }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="flip-card"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>

        {/* Front */}
        <div
          className="flip-card-face flip-card-front p-5 flex flex-col"
          style={{ borderColor: `${accentColor}25`, background: 'rgba(17,17,17,0.6)' }}
        >
          <div
            className="w-6 h-6 border mb-3 flex items-center justify-center shrink-0"
            style={{ borderColor: `${accentColor}40` }}
          >
            <div className="w-2 h-2" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
          </div>
          <h3 className="font-display font-700 text-xs text-light mb-1">{title}</h3>
          <p className="font-body text-xs text-muted/70 leading-relaxed flex-1">{desc}</p>
          <p className="font-mono text-xs mt-3 opacity-40" style={{ color: accentColor }}>hover to see agent →</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-face flip-card-back p-5 flex flex-col justify-between"
          style={{ borderColor: `${accentColor}40`, background: `linear-gradient(135deg, ${accentColor}08, rgba(13,13,13,0.95))` }}
        >
          <div>
            <p className="font-mono text-xs tracking-[0.15em] uppercase mb-1" style={{ color: accentColor }}>
              Powered by
            </p>
            <h3 className="font-display font-700 text-sm text-light mb-2">{agentName}</h3>
            <p className="font-body text-xs text-muted/80 leading-relaxed">{agentDesc}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/supporter') }}
            className="mt-4 px-4 py-2 text-xs font-display font-700 tracking-[0.1em] uppercase text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Book a Consultation →
          </button>
        </div>

      </div>
    </div>
  )
}
